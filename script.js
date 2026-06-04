function switchTab(tab, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    if (tab === 'fabricator') {
        document.getElementById('fabricator-view').classList.add('active');
    } else if (tab === 'registry') {
        document.getElementById('registry-view').classList.add('active');
    } else {
        document.getElementById('explorer-view').classList.add('active');
        renderExplorer(tab);
    }
}

function buildSection(title, data) {
    if (!data) return "";
    let html = `<div class="section-title">${title}</div><div class="tags-container">`;
    
    if (Array.isArray(data)) {
        data.forEach(val => { html += `<div class="tag">${val}</div>`; });
    } else if (typeof data === 'object' && data !== null) {
        Object.entries(data).forEach(([k, v]) => {
            if (Array.isArray(v)) {
                html += `<div class="tag"><strong>${k}:</strong> ${v.join(', ')}</div>`;
            } else {
                html += `<div class="tag"><strong>${k}:</strong> ${v}</div>`;
            }
        });
    } else {
        html += `<div class="tag">${data}</div>`;
    }
    
    html += `</div><br>`;
    return html;
}

function renderExplorer(tab) {
    const container = document.getElementById("content");
    container.innerHTML = "";
    if (!DATA[tab]) return;

    DATA[tab].forEach((item, index) => {
        let extra = "";
        
        const keys = [
            "scaling", "mechanics", "visuals", "variants", "ids", 
            "magazine_id", "spawn", "contains", "drops", "abilities", 
            "tags", "biome", "dimension", "light_level"
        ];
        
        keys.forEach(key => { if (item[key]) extra += buildSection(key.replace('_', ' '), item[key]); });

        // Grab the item ID no matter how it's named in your DATA file
        const inGameId = item.id || item.item_id || item.itemId || (item.ids ? item.ids[0] : null);

        // Create a highly visible badge for the Item ID if it exists
        const idBadge = inGameId 
            ? `<div class="tag" style="margin-bottom: 8px; display: inline-block; background: rgba(255, 255, 255, 0.1); border: 1px dashed #ccc; padding: 4px 8px;"><strong>Item ID:</strong> <code>${inGameId}</code></div>` 
            : "";

        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${index * 0.05}s`;
        
        // Inject the ID badge right between the name and the description
        card.innerHTML = `<div class="name">${item.name}</div>${idBadge}<div class="desc">${item.desc}</div>${extra}`;
        container.appendChild(card);
    });
}

function generateAttachable(config) {
    const suitId = config.id;
    const isNano = config.isNano;
    let textures = { "enchanted": "textures/misc/enchanted_item_glint" };
    
    if (isNano) {
        for (let i = 0; i <= 7; i++) { 
            textures[`nano_${i}`] = `textures/entity/suits/templates/suits/example_nano/${suitId}_${i}`; 
        }
    } else {
        textures["default"] = `textures/entity/suits/templates/suits/${suitId}`;
    }

    // --- INDEPENDENT LOGIC CORE ---
    // This allows Mask/Hood/Hide to run on one property and Nano to run on another.
    let preAnimation = [
        "variable.visuals = query.property('suit:visuals');",
        "variable.nano_state = query.property('suit:nano_state');", 
        
        // Map visual states (mutually exclusive)
        `variable.mask = (variable.visuals == 1 && ${config.allowMask ? "1" : "0"}) ? 1 : 0;`,
        `variable.hood = (variable.visuals == 2 && ${config.allowHood ? "1" : "0"}) ? 1 : 0;`,
        `variable.hidden = (variable.visuals == 3 && ${config.allowSuitOff ? "1" : "0"}) ? 1 : 0;`
    ];

    if (isNano) {
        preAnimation.push(
            // Nano Logic: Only reacts to the nano_state property
            "variable.nano_timer = math.clamp((variable.nano_timer ?? 0) + (variable.nano_state ? query.delta_time * 12 : -query.delta_time * 12), 0, 7.9);",
            "variable.nano_tex_index = math.floor(variable.nano_timer);"
        );
    }

    const json = {
        "format_version": "1.21.0",
        "minecraft:attachable": {
            "description": {
                "identifier": `suit:${suitId}`,
                "materials": { "default": "entity_emissive_alpha", "enchanted": "armor_enchanted" },
                "textures": textures,
                "geometry": { "default": `geometry.${suitId}` },
                "animations": {
                    "suit_logic": `controller.animation.${suitId}`,
                    "mask_off": "animation.suit.mask_off",
                    "hood_down": "animation.suit.hood_down",
                    "suit_off": "animation.suit.suit_off",
                    "cape": "animation.suit.cape"
                },
                "scripts": {
                    "pre_animation": preAnimation,
                    "animate": [
                        "suit_logic",
                        config.hasCape ? { "cape": "variable.last_g = (query.is_on_ground ? query.life_time : (variable.last_g ?? query.life_time)); return query.modified_move_speed > 0.01 && (query.life_time - variable.last_g < 0.6 || !query.is_sprinting);" } : null
                    ].filter(Boolean)
                },
                "render_controllers": [isNano ? "controller.render.nano_suit_template" : "controller.render.suit_template"]
            }
        }
    };
    return JSON.stringify(json, null, 2);
}

function downloadFiles() {
    const suitName = document.getElementById('fab-suitId').value || 'template_suit';
    const config = {
        id: suitName,
        isNano: document.getElementById('isNano').checked,
        hasCape: document.getElementById('hasCape').checked,
        allowMask: document.getElementById('allowMask').checked,
        allowHood: document.getElementById('allowHood').checked,
        allowSuitOff: document.getElementById('allowSuitOff').checked
    };

    const blob = new Blob([generateAttachable(config)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${suitName}.json`;
    link.click();
}

function initRegistryUI() {
    const abContainer = document.getElementById('abilitiesContainer');
    abContainer.innerHTML = ""; // Clear container

    REGISTRY_ABILITIES.forEach((ab, i) => {
        let controlsHtml = "";
        
        // Render optional Scale/Color controls if they belong to the main card
        if (ab.scale || ab.colors) {
            controlsHtml = `
            <div class="ability-controls" style="margin-top: 8px;">
                ${ab.scale ? `<input type="number" id="ab_lv_${i}" placeholder="Scale" value="100" style="width: 40%; padding: 8px;">` : ''}
                ${ab.colors ? `
                <select id="ab_col_${i}" style="width: 60%; padding: 8px;">
                    <option value="" disabled selected>Color</option>
                    ${colors.map(c => `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join('')}
                </select>` : ''}
            </div>`;
        }

        // Check if this is a Multi-Option Matrix Card (like Energy Beams or Suit Adjustments)
        if (ab.options && ab.options.length > 0) {
            let optionsHtml = `<div class="nested-options" style="margin-top: 10px; padding-left: 10px; display: flex; flex-direction: column; gap: 6px;">`;
            
            ab.options.forEach((opt, optIndex) => {
                optionsHtml += `
                <label class="opt-row" style="display: flex; align-items: center; gap: 8px; font-size: 0.9em; cursor: pointer;">
                    <input type="${ab.multi ? 'checkbox' : 'radio'}" name="ab_matrix_${i}" class="ab_opt_check_${i}" data-index="${optIndex}">
                    <span>${opt.label}</span>
                </label>`;
            });
            optionsHtml += `</div>`;

            abContainer.innerHTML += `
                <div class="ability-card complex-card" id="card_${i}">
                    <div class="ability-header" style="font-weight: bold; display: flex; align-items: center; gap: 8px;">
                        <span>${ab.name}</span>
                    </div>
                    ${controlsHtml}
                    ${optionsHtml}
                </div>`;
        } else {
            // Standard Single Ability Card
            abContainer.innerHTML += `
                <div class="ability-card" id="card_${i}">
                    <label class="ability-header" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" id="ab_check_${i}" onchange="document.getElementById('card_${i}').classList.toggle('active', this.checked)">
                        <span>${ab.name}</span>
                    </label>
                    ${controlsHtml}
                </div>`;
        }
    });

    const auraContainer = document.getElementById('auraContainer');
    auraContainer.innerHTML = `
        <div class="input-group">
            <label>Select Lightning Aura Colors</label>
            <div class="options-grid">
                ${auraColors.map(color => `
                    <label class="opt" style="color:${hexMap[color]}">
                        <input type="checkbox" class="aura-check" value="${color}">
                        <span style="display:flex; align-items:center; gap:8px;">
                            <span class="aura-indicator" style="background-color:${hexMap[color]}"></span>
                            ${color}
                        </span>
                    </label>
                `).join('')}
            </div>
        </div>`;
}

function addEffectRow() {
    const div = document.createElement('div');
    div.className = 'dynamic-row';
    div.innerHTML = `<input type="text" placeholder="minecraft:effect_id" class="eff-id" style="flex:2; padding: 8px;"> <input type="number" value="1" placeholder="Lvl" class="eff-lv" style="flex:1; padding: 8px;"> <button class="btn-del" onclick="this.parentElement.remove()">X</button>`;
    document.getElementById('effectContainer').appendChild(div);
}

function generateRegistry() {
    const suitId = document.getElementById('reg-suitId').value;
    const res = {
        suitItem: document.getElementById('suitItem').value,
        tag: document.getElementById('masterTag').value,
        dnaTag: document.getElementById('dnaTag').value,
        powerTags: [], effects: [], abilities: [], auras: []
    };

    if(document.getElementById('useInjections').checked) {
        res.injectionItem = document.getElementById('injItem').value;
        res.emptyItem = document.getElementById('emptyItem').value;
    }

    document.querySelectorAll('#effectContainer .dynamic-row').forEach(row => {
        const id = row.querySelector('.eff-id').value;
        if(id) res.effects.push({ id: id, level: parseInt(row.querySelector('.eff-lv').value) });
    });

    // Parse configuration fields from the Registry Items array
    REGISTRY_ABILITIES.forEach((ab, i) => {
        const scaleEl = document.getElementById(`ab_lv_${i}`);
        const colEl = document.getElementById(`ab_col_${i}`);
        const lv = scaleEl ? scaleEl.value : null;
        const col = (colEl && colEl.value) ? colEl.value : 'red'; // Defaults to red if no color choice is selected
        const suffix = lv ? `_${lv}` : '';

        // Case A: Matrix Style Group Selector Card
        if (ab.options && ab.options.length > 0) {
            const selectedOptions = document.querySelectorAll(`.ab_opt_check_${i}:checked`);
            
            selectedOptions.forEach(chk => {
                const optIdx = parseInt(chk.getAttribute('data-index'));
                const optionData = ab.options[optIdx];

                // Compile executable Action Item
                if (optionData.itemId) {
                    const parsedItemId = optionData.itemId.replace('<color>', col);
                    res.abilities.push({
                        name: optionData.label,
                        itemId: parsedItemId,
                        icon: `textures/items/abilities/${ab.icon}`
                    });
                }

                // Compile associated Tracking Tags
                if (optionData.tags) {
                    optionData.tags.forEach(t => {
                        res.powerTags.push(`${t.replace('<color>', col)}${suffix}`);
                    });
                } else if (optionData.itemId) {
                    // Fallback to tracking tags via sanitation if explicit tags array doesn't exist
                    const cleanTag = optionData.itemId.replace('<color>', col);
                    res.powerTags.push(`${cleanTag}${suffix}`);
                }
            });
        } 
        // Case B: Standard Standalone Selection Card
        else {
            const mainCheck = document.getElementById(`ab_check_${i}`);
            if (!mainCheck || !mainCheck.checked) return;

            // Generate Active Items array entries
            if (ab.items) {
                ab.items.forEach(itemId => {
                    const parsedItemId = itemId.replace('<color>', col);
                    res.abilities.push({
                        name: ab.name,
                        itemId: parsedItemId,
                        icon: `textures/items/abilities/${ab.icon || 'default'}`
                    });
                });
            }

            // Generate Active System Tracking Tags
            if (ab.tags) {
                ab.tags.forEach(tagId => {
                    const parsedTag = tagId.replace('<color>', col);
                    res.powerTags.push(`${parsedTag}${suffix}`);
                });
            }
        }
    });

    const custom = document.getElementById('customTags').value;
    if(custom) custom.split(',').forEach(t => { if(t.trim()) res.powerTags.push(t.trim()) });

    const selectedAuras = Array.from(document.querySelectorAll('.aura-check:checked')).map(el => el.value);
    
    selectedAuras.forEach((color, index) => {
        res.auras.push({
            name: `${color} Lightning Aura`,
            value: index + 1,
            icon: `textures/entity/lightning/lightning_${color.toLowerCase()}`
        });
    });

    let json = JSON.stringify(res, null, 4);
    json = json.replace(/\{\s+"name": "(.*?)",\s+"itemId": "(.*?)",\s+"icon": "(.*?)"\s+\}/g, '{ name: "$1", itemId: "$2", icon: "$3" }');
    json = json.replace(/\{\s+"name": "(.*?)",\s+"value": (\d+),\s+"icon": "(.*?)"\s+\}/g, '{ name: "$1", value: $2, icon: "$3" }');
    json = json.replace(/\{\s+"id": "(.*?)",\s+"level": (\d+)\s+\}/g, '{ id: "$1", level: $2 }');

    document.getElementById('output').textContent = `"${suitId}": ${json},`;
}

renderExplorer("abilities");
initRegistryUI();
addEffectRow();
