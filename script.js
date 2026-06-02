let activeTab = "abilities";

document.addEventListener("DOMContentLoaded", () => {
    switchTab("abilities", document.querySelector(".tab"));
    initRegistryEngine();
});

function switchTab(tabId, element) {
    activeTab = tabId;
    
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    
    element.classList.add("active");
    
    if (tabId === "abilities" || tabId === "suits") {
        document.getElementById("explorer-view").classList.add("active");
        renderExplorer(tabId);
    } else {
        document.getElementById(`${tabId}-view`).classList.add("active");
    }
}

function renderExplorer(type) {
    const container = document.getElementById("content");
    container.innerHTML = "";
    
    if (type === "abilities") {
        DATA.items.forEach(item => {
            const card = document.createElement("div");
            card.className = "section";
            card.style.borderLeft = "4px solid var(--accent, #00ffcc)";
            
            let badging = Array.isArray(item.type) ? item.type.join(" | ") : item.type;
            
            card.innerHTML = `
                <div class="section-title" style="margin-bottom: 4px;">${item.name}</div>
                <div style="font-size: 0.8rem; color: #00ffcc; text-transform: uppercase; margin-bottom: 12px; font-family: 'JetBrains Mono';">${badging}</div>
                <p style="margin: 0 0 12px 0; color: #a0aec0; font-size: 0.9rem; line-height: 1.5;">${item.desc}</p>
                <div style="font-size: 0.75rem; color: #718096; font-family: 'JetBrains Mono';">ID: ${item.id}</div>
            `;
            container.appendChild(card);
        });
    } else {
        DATA.ores.forEach(ore => {
            const card = document.createElement("div");
            card.className = "section";
            card.style.borderLeft = "4px solid #ff0055";
            card.innerHTML = `
                <div class="section-title" style="margin-bottom: 4px;">${ore.name}</div>
                <div style="font-size: 0.8rem; color: #ff0055; text-transform: uppercase; margin-bottom: 12px; font-family: 'JetBrains Mono';">Ore Node</div>
                <p style="margin: 0 0 12px 0; color: #a0aec0; font-size: 0.9rem;">${ore.desc}</p>
                <div style="font-size: 0.75rem; color: #718096; font-family: 'JetBrains Mono';">Drops: ${ore.drops.join(", ")}</div>
            `;
            container.appendChild(card);
        });
    }
}

function initRegistryEngine() {
    const auraBox = document.getElementById("auraContainer");
    auraBox.innerHTML = "";
    
    auraColors.forEach(color => {
        const hex = hexMap[color] || "#ffffff";
        const label = document.createElement("label");
        label.className = "opt";
        label.style.marginBottom = "6px";
        label.innerHTML = `
            <input type="radio" name="reg-aura" value="${color.toLowerCase()}"> 
            <span style="color: ${hex}; font-weight: bold;">■</span> ${color} Matrix Channel
        `;
        auraBox.appendChild(label);
    });
    
    const defaultAura = document.createElement("label");
    defaultAura.className = "opt";
    defaultAura.innerHTML = `<input type="radio" name="reg-aura" value="none" checked> Nullified Aura Field`;
    auraBox.appendChild(defaultAura);

    const abilitiesBox = document.getElementById("abilitiesContainer");
    abilitiesBox.innerHTML = "";
    abilitiesBox.style.display = "flex";
    abilitiesBox.style.flexDirection = "column";
    abilitiesBox.style.gap = "16px";
    abilitiesBox.style.maxHeight = "none";
    abilitiesBox.style.background = "transparent";
    abilitiesBox.style.border = "none";
    abilitiesBox.style.padding = "0";

    REGISTRY_ABILITIES.forEach(ab => {
        const fieldWrapper = document.createElement("div");
        fieldWrapper.className = "input-group";
        fieldWrapper.style.padding = "14px";
        fieldWrapper.style.background = "var(--bg-input)";
        fieldWrapper.style.border = "1px solid var(--border-color)";
        fieldWrapper.style.borderRadius = "6px";

        const title = document.createElement("label");
        title.style.color = "var(--accent)";
        title.style.marginBottom = "8px";
        title.style.display = "block";
        title.textContent = ab.name;
        fieldWrapper.appendChild(title);

        if (ab.type === "standard") {
            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.gap = "14px";
            
            let scaleInputHtml = "";
            if (ab.hasScale) {
                scaleInputHtml = `
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-size:0.8rem; color:#718096; font-family:'JetBrains Mono';">MAGNITUDE:</span>
                        <input type="number" class="ab-scale" value="${ab.defaultScale}" style="width: 60px; padding: 6px; text-align: center;">
                    </div>
                `;
            }
            
            row.innerHTML = `
                <label class="opt" style="flex: 1;">
                    <input type="checkbox" class="ab-trigger" data-id="${ab.id}" data-type="standard" data-prefix="${ab.prefix || ''}"> Activate Capabilities
                </label>
                ${scaleInputHtml}
            `;
            fieldWrapper.appendChild(row);
        } 
        else if (ab.type === "select") {
            const select = document.createElement("select");
            select.className = "ab-select-node";
            select.setAttribute("data-id", ab.id);
            select.setAttribute("data-type", "select");
            select.style.width = "100%";
            select.style.padding = "10px";
            select.style.background = "var(--bg-main)";
            select.style.border = "1px solid var(--border-color)";
            select.style.color = "var(--text-primary)";
            select.style.fontFamily = "'JetBrains Mono'";
            select.style.borderRadius = "4px";

            ab.options.forEach(opt => {
                const o = document.createElement("option");
                o.value = opt.value;
                o.textContent = opt.label;
                select.appendChild(o);
            });
            fieldWrapper.appendChild(select);
        } 
        else if (ab.type === "multiselect") {
            const subGrid = document.createElement("div");
            subGrid.style.display = "grid";
            subGrid.style.gridTemplateColumns = "1fr 1fr";
            subGrid.style.gap = "8px";
            subGrid.setAttribute("data-id", ab.id);
            subGrid.setAttribute("data-type", "multiselect");

            ab.options.forEach(opt => {
                const lbl = document.createElement("label");
                lbl.className = "opt";
                lbl.innerHTML = `
                    <input type="checkbox" class="ab-multi-opt" value="${opt.value}"> ${opt.label}
                `;
                subGrid.appendChild(lbl);
            });
            fieldWrapper.appendChild(subGrid);
        }

        abilitiesBox.appendChild(fieldWrapper);
    });
}

function addEffectRow() {
    const container = document.getElementById("effectContainer");
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.gap = "10px";
    row.style.marginBottom = "10px";
    
    row.innerHTML = `
        <input type="text" placeholder="minecraft:speed" style="flex: 2;" class="eff-id">
        <input type="number" placeholder="Amp" style="flex: 1;" class="eff-amp" value="1">
        <button class="btn-add" style="background: #ff0055; margin: 0; padding: 0 12px; width: auto; color: white;" onclick="this.parentElement.remove()">X</button>
    `;
    container.appendChild(row);
}

function generateRegistry() {
    const suitId = document.getElementById("reg-suitId").value || "custom_hero";
    const itemNamespace = document.getElementById("suitItem").value;
    const hoverStyle = parseInt(document.getElementById("hoverStyle").value) || 0;
    const boostStyle = parseInt(document.getElementById("boostStyle").value) || 0;
    const masterTag = document.getElementById("masterTag").value;
    const dnaTag = document.getElementById("dnaTag").value;
    
    const computedTags = [];
    if (masterTag) computedTags.push(masterTag);
    if (dnaTag) computedTags.push(dnaTag);
    
    const customTagsRaw = document.getElementById("customTags").value;
    if (customTagsRaw) {
        customTagsRaw.split(",").forEach(t => {
            const clean = t.trim();
            if (clean) computedTags.push(clean);
        });
    }

    const injectionEnabled = document.getElementById("useInjections").checked;
    const injectionSystem = {
        enabled: injectionEnabled,
        vector_item: injectionEnabled ? document.getElementById("injItem").value : "",
        empty_housing: injectionEnabled ? document.getElementById("emptyItem").value : ""
    };

    const passiveEffects = [];
    document.querySelectorAll("#effectContainer > div").forEach(row => {
        const id = row.querySelector(".eff-id").value.trim();
        const amp = parseInt(row.querySelector(".eff-amp").value) || 1;
        if (id) {
            passiveEffects.push({ effect: id, amplifier: amp });
        }
    });

    const activeAura = document.querySelector('input[name="reg-aura"]:checked').value;
    
    const runtimeAbilitiesList = [];

    document.querySelectorAll("#abilitiesContainer .ab-trigger").forEach(cb => {
        if (cb.checked) {
            const id = cb.getAttribute("data-id");
            const prefix = cb.getAttribute("data-prefix");
            const parent = cb.closest(".input-group");
            const scaleInput = parent.querySelector(".ab-scale");
            
            if (scaleInput) {
                computedTags.push(`${prefix}${id}_${scaleInput.value}`);
            } else {
                computedTags.push(`${prefix}${id}`);
            }
            
            const nativeItem = DATA.items.find(i => i.id === `${prefix}${id}`);
            if (nativeItem) runtimeAbilitiesList.push(nativeItem.id);
        }
    });

    document.querySelectorAll("#abilitiesContainer .ab-select-node").forEach(sel => {
        const abId = sel.getAttribute("data-id");
        const val = sel.value;
        if (val === "none") return;

        const spec = REGISTRY_ABILITIES.find(a => a.id === abId);
        if (!spec) return;

        const optData = spec.options.find(o => o.value === val);
        if (optData) {
            if (optData.powerTags) {
                optData.powerTags.forEach(t => computedTags.push(t));
            }
            if (optData.item && optData.item.itemId) {
                runtimeAbilitiesList.push(optData.item.itemId);
            }
        }
    });

    document.querySelectorAll("#abilitiesContainer [data-type='multiselect']").forEach(container => {
        const abId = container.getAttribute("data-id");
        const spec = REGISTRY_ABILITIES.find(a => a.id === abId);
        if (!spec) return;

        container.querySelectorAll(".ab-multi-opt").forEach(cb => {
            if (cb.checked) {
                const optData = spec.options.find(o => o.value === cb.value);
                if (optData) {
                    if (optData.powerTags) {
                        optData.powerTags.forEach(t => computedTags.push(t));
                    }
                    if (optData.item && optData.item.itemId) {
                        runtimeAbilitiesList.push(optData.item.itemId);
                    }
                }
            }
        });
    });

    const outputNode = {
        format_version: "1.4.0",
        [`meta_core:suit_${suitId}`]: {
            registry: {
                identifier: suitId,
                item: itemNamespace,
                properties: {
                    hover_index: hoverStyle,
                    boost_index: boostStyle
                },
                tags: computedTags
            },
            injection_system: injectionSystem,
            passive_effects: passiveEffects,
            aura_matrix: {
                active_aura: activeAura
            },
            runtime_abilities: [...new Set(runtimeAbilitiesList)]
        }
    };

    document.getElementById("output").textContent = JSON.stringify(outputNode, null, 4);
}

function downloadFiles() {
    const fabId = document.getElementById("fab-suitId").value || "custom_suit";
    
    const attachableJson = {
        format_version: "1.10.0",
        "minecraft:attachable": {
            description: {
                identifier: `meta_core:${fabId}_attachable`,
                materials: {
                    default: "entity_alphatest",
                    enchanted: "entity_alphatest_glint"
                },
                textures: {
                    default: `textures/models/meta_core/${fabId}`,
                    enchanted: "textures/misc/enchanted_item_glint"
                },
                geometry: {
                    default: `geometry.meta_core.${fabId}`
                },
                scripts: {
                    initialize: [
                        `v.is_nano = ${document.getElementById("isNano").checked ? 1.0 : 0.0};`,
                        `v.render_cape = ${document.getElementById("hasCape").checked ? 1.0 : 0.0};`
                    ],
                    animate: [
                        "base_controller"
                    ]
                },
                animations: {
                    base_controller: "controller.animation.meta_core.attachable_root"
                },
                render_controllers: [
                    "controller.render.item_default"
                ],
                query_overrides: {
                    allow_mask: document.getElementById("allowMask").checked,
                    allow_hood: document.getElementById("allowHood").checked,
                    allow_depower: document.getElementById("allowSuitOff").checked
                }
            }
        }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(attachableJson, null, 4));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `${fabId}.attachable.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
}
