const colors = ["red", "blue", "yellow", "orange", "green", "purple", "pink", "white", "black"];
const auraColors = ["Red", "Blue", "Yellow", "Orange", "Green", "Purple", "Pink", "White", "Black"];
const hexMap = { Red: "#ff4444", Blue: "#4444ff", Yellow: "#ffff44", Orange: "#ffaa00", Green: "#44ff44", Purple: "#aa44ff", Pink: "#ff88ff", White: "#ffffff", Black: "#555555" };

const DATA = {
    items: [
        { 
            id: "ability:super_strength",
            name: "Super Strength", 
            desc: "Increases melee damage massively.", 
            scaling: { damage: "base * (level / 10)", knockback: "level * 0.2" }, 
            visuals: { aura: "red", particles: "impact_shockwave" }, 
            type: ["passive", "combat"] 
        },
        { 
            id: "ability:super_speed",
            name: "Super Speed", 
            desc: "Move at extreme speeds.", 
            scaling: { 
                speed: "base + (level * 0.5)",
                tag_requirement: "ability:super_speed_<level>"
            }, 
            visuals: { 
                trailColor: "yellow", 
                lightning: true,
                color_tags: [
                    "ability:super_speed_white",
                    "ability:super_speed_black",
                    "ability:super_speed_red",
                    "ability:super_speed_yellow",
                    "ability:super_speed_blue",
                    "ability:super_speed_green",
                    "ability:super_speed_orange",
                    "ability:super_speed_purple"
                ]
            }, 
            type: "movement",
            tips: "Speed trails only appear if the player's speed level is 8 or above."
        },
        { 
            id: "ability:size_manipulation",
            name: "Size Manipulation",
            desc: "Alter your physical dimensions to become a giant or microscopic.",
            scaling: { scale_multiplier: "0.1x to 10x" },
            type: "movement"
        },
        { 
            id: "ability:flight",
            name: "Flight",
            desc: "Defy gravity and fly freely through the air.",
            scaling: { speed: "base_flight_speed * level" },
            type: "movement"
        },
        { 
            id: "ability:web_swing",
            name: "Web Swing", 
            desc: "Swing using web physics.", 
            mechanics: { range: 40, velocity: 2 }, 
            type: "movement" 
        },
        {
            id: "ability:phase",
            name: "Phase",
            desc: "Vibrate your molecules to pass cleanly through solid walls and obstacles.",
            type: "movement"
        },
        {
            id: "ability:heat_vision",
            name: "Heat Vision",
            desc: "Fires intense energy laser beams from your eyes.",
            scaling: { damage: "level * 1.5", range: "30" },
            visuals: { 
                colors: colors, 
                particles: "heat_vision_laser",
                ids: [
                    "ability:heat_vision_white", "ability:heat_vision_black", "ability:heat_vision_red",
                    "ability:heat_vision_blue", "ability:heat_vision_yellow", "ability:heat_vision_green",
                    "ability:heat_vision_purple", "ability:heat_vision_orange", "ability:heat_vision_pink"
                ]
            },
            type: ["active", "combat", "ranged"]
        },
        {
            id: "ability:energy_beams",
            name: "Energy Beams",
            desc: "Channeled structural offensive laser weapon systems built into the power core.",
            type: ["active", "combat"],
            variants: {
                single: ["ability:energy_beam_white", "ability:energy_beam_black", "ability:energy_beam_red", "ability:energy_beam_blue", "ability:energy_beam_yellow", "ability:energy_beam_green", "ability:energy_beam_purple", "ability:energy_beam_orange", "ability:energy_beam_pink"],
                double: ["ability:double_energy_beam_white", "ability:double_energy_beam_black", "ability:double_energy_beam_red", "ability:double_energy_beam_blue", "ability:double_energy_beam_yellow", "ability:double_energy_beam_green", "ability:double_energy_beam_purple", "ability:double_energy_beam_orange", "ability:double_energy_beam_pink"],
                head: ["ability:head_energy_beam_white", "ability:head_energy_beam_black", "ability:head_energy_beam_red", "ability:head_energy_beam_blue", "ability:head_energy_beam_yellow", "ability:head_energy_beam_green", "ability:head_energy_beam_purple", "ability:head_energy_beam_orange", "ability:head_energy_beam_pink"],
                chest: ["ability:chest_energy_beam_white", "ability:chest_energy_beam_black", "ability:chest_energy_beam_red", "ability:chest_energy_beam_blue", "ability:chest_energy_beam_yellow", "ability:chest_energy_beam_green", "ability:chest_energy_beam_purple", "ability:chest_energy_beam_orange", "ability:chest_energy_beam_pink"]
            }
        },
        {
            id: "ability:forcefields",
            name: "Forcefields",
            desc: "Deploys a protective energy boundary or defensive armor coating.",
            type: ["active", "defense"],
            variants: {
                bubble: ["ability:forcefield_white", "ability:forcefield_black", "ability:forcefield_red", "ability:forcefield_blue", "ability:forcefield_yellow", "ability:forcefield_green", "ability:forcefield_purple", "ability:forcefield_orange", "ability:forcefield_pink"],
                armor: ["ability:forcefield_armor_white", "ability:forcefield_armor_black", "ability:forcefield_armor_red", "ability:forcefield_armor_blue", "ability:forcefield_armor_yellow", "ability:forcefield_armor_green", "ability:forcefield_armor_purple", "ability:forcefield_armor_orange", "ability:forcefield_armor_pink"]
            }
        },
        {
            id: "ability:lightning_beams",
            name: "Lightning Beams",
            desc: "Fires focused elemental bolt channels of concentrated electricity.",
            type: ["active", "combat"],
            ids: ["ability:lightning_beam_white", "ability:lightning_beam_black", "ability:lightning_beam_red", "ability:lightning_beam_blue", "ability:lightning_beam_yellow", "ability:lightning_beam_green", "ability:lightning_beam_purple", "ability:lightning_beam_orange", "ability:lightning_beam_pink"]
        },
        {
            id: "ability:portals",
            name: "Portals & Teleportation",
            desc: "Spatial manipulation systems for instantaneous long-distance displacement.",
            type: "movement",
            ids: ["ability:portal_white", "ability:portal_black", "ability:portal_red", "ability:portal_blue", "ability:portal_yellow", "ability:portal_green", "ability:portal_purple", "ability:portal_orange", "ability:area_teleport"]
        },
        {
            id: "ability:power_blast",
            name: "Power Blast",
            desc: "Fires a swift concussive pulse projectile.",
            type: "combat"
        },
        {
            id: "ability:energy_bomb",
            name: "Energy Bomb",
            desc: "Launches an explosive unstable projectile sphere.",
            type: "combat"
        },
        {
            id: "ability:prism_shot",
            name: "Prism Shot",
            desc: "Splits an energy beam outwards into multiple breaking directions.",
            type: "combat"
        },
        {
            id: "ability:ground_smash",
            name: "Ground Smash",
            desc: "Impact the earth to discharge a local radius shockwave.",
            type: "combat"
        },
        {
            id: "ability:super_punch",
            name: "Super Punch",
            desc: "Delivers a heavy localized kinetic point impact melee strike.",
            type: "combat"
        },
        {
            id: "ability:thunderclap",
            name: "Thunderclap",
            desc: "Slam hands together creating a concussive soundwave barrier.",
            type: "combat"
        },
        {
            id: "ability:lightning_strike",
            name: "Lightning Strike",
            desc: "Call down a massive singular electrical discharge from above.",
            type: "combat"
        },
        {
            id: "ability:fire_breath",
            name: "Fire Breath",
            desc: "Exhale continuous superheated streams of flame.",
            type: "combat"
        },
        {
            id: "ability:ice_breath",
            name: "Ice Breath",
            desc: "Exhale subzero streams of frost freezing targets.",
            type: "combat"
        },
        {
            id: "ability:gravity_flip",
            name: "Gravity Flip",
            desc: "Invert standard gravitational pulls for targeted entities.",
            type: "combat"
        },
        {
            id: "ability:frostbite_wave",
            name: "Frostbite Wave",
            desc: "Send an expanding ground flash freeze layer outward.",
            type: "combat"
        },
        {
            id: "ability:kinetic_pulse",
            name: "Kinetic Pulse",
            desc: "Release stored mechanical impact damage as a protective pulse.",
            type: "combat"
        },
        {
            id: "ability:rocket_slam",
            name: "Rocket Slam",
            desc: "Propel upwards quickly and drop down at maximum velocity.",
            type: "combat"
        },
        {
            id: "ability:web_spin",
            name: "Web Spin",
            desc: "Rapidly wrap nearby surrounding entities inside heavy web nodes.",
            type: "combat"
        },
        {
            id: "ability:sound_blast",
            name: "Sound Blast",
            desc: "High-frequency sonic output emitter to disorient and damage.",
            type: "combat"
        },
        {
            id: "ability:healing_aura",
            name: "Healing Aura",
            desc: "Emit an aura regenerating standard health resources over time.",
            type: "support"
        },
        {
            id: "ability:telekinesis",
            name: "Telekinesis",
            desc: "Manipulate and move regional physical elements remotely.",
            type: "support"
        },
        {
            id: "shield:shields",
            name: "Defensive Relic Shields",
            desc: "Deploy specific solid energy geometric barriers.",
            type: "defense",
            ids: ["shield:holo_shield", "shield:strange_shield", "shield:wanda_shield"]
        },
        {
            id: "suit:cosmetics",
            name: "Suit Adjustments & Cosmetics",
            desc: "Manage integrated aesthetic outputs, menus, and configurations.",
            type: "cosmetic",
            ids: ["suit:visuals_item", "toggle:nano_offense", "item:camera_menu"]
        },
        {
            id: "weapon:beetle_arm_cannon",
            name: "Beetle Arm Cannon",
            desc: "High-powered cybernetic limb artillery blasters.",
            type: "weapon",
            ids: [
                "weapon:silver_beetle_arm_cannon", "weapon:black_beetle_arm_cannon", "weapon:red_beetle_arm_cannon",
                "weapon:blue_beetle_arm_cannon", "weapon:yellow_beetle_arm_cannon", "weapon:green_beetle_arm_cannon",
                "weapon:purple_beetle_arm_cannon", "weapon:orange_beetle_arm_cannon", "weapon:pink_beetle_arm_cannon"
            ]
        },
        {
            id: "weapon:web_shooters",
            name: "Web Shooters",
            desc: "Wrist-mounted or bio-organic structural fluid web deployment mechanics.",
            type: "weapon",
            ids: ["weapon:web_shooter", "weapon:natural_web_shooter"]
        },
        {
            id: "gun:ak47",
            name: "AK47",
            desc: "Fully automatic high-caliber combat assault rifle.",
            type: "weapon",
            magazine_id: "gun:ak47_mag"
        },
        {
            id: "gun:colt_m1911",
            name: "Colt M1911",
            desc: "Semi-automatic heavy standard reliable service pistol.",
            type: "weapon",
            magazine_id: "gun:colt_m1911_mag"
        },
        {
            id: "gun:mp5",
            name: "MP5",
            desc: "Tactical high rate of fire close-quarters submachine gun.",
            type: "weapon",
            magazine_id: "gun:mp5_mag"
        },
        {
            id: "ammo:light",
            name: "Light Ammunition",
            desc: "Calibrated rounds for rapid firing or sidearms.",
            type: "ammo",
            ids: ["ammo:light_normal", "ammo:light_hv", "ammo:light_impact", "ammo:light_incendiary", "ammo:light_explosive"]
        },
        {
            id: "ammo:medium",
            name: "Medium Ammunition",
            desc: "Standard high-velocity ballistic rounds for mainline rifles.",
            type: "ammo",
            ids: ["ammo:medium_normal", "ammo:medium_hv", "ammo:medium_impact", "ammo:medium_incendiary", "ammo:medium_explosive"]
        },
        {
            id: "throwable:batarang",
            name: "Batarang",
            desc: "Custom balanced aerodynamic throwing utilities.",
            type: "throwable",
            ids: ["throwable:batarang_item", "throwable:batarang_electric_item", "throwable:batarang_explosive_item", "throwable:batarang_knockback_item", "throwable:batarang_kryptonite_item"]
        },
        {
            id: "throwable:beyond_batarang",
            name: "Beyond Batarang",
            desc: "High-tech advanced sleek tactical variants.",
            type: "throwable",
            ids: ["throwable:beyond_batarang_item", "throwable:beyond_batarang_electric_item", "throwable:beyond_batarang_explosive_item", "throwable:beyond_batarang_knockback_item", "throwable:beyond_batarang_kryptonite_item"]
        },
        {
            id: "throwable:birdarang",
            name: "Birdarang",
            desc: "Serrated stylized aerodynamic avian defensive throwables.",
            type: "throwable",
            ids: ["throwable:birdarang_item", "throwable:birdarang_electric_item", "throwable:birdarang_explosive_item", "throwable:birdarang_knockback_item", "throwable:birdarang_kryptonite_item"]
        },
        {
            id: "throwable:classic_batarang",
            name: "Classic Batarang",
            desc: "Traditional standard profile retro throwing implements.",
            type: "throwable",
            ids: ["throwable:classic_batarang_item", "throwable:classic_batarang_electric_item", "throwable:classic_batarang_explosive_item", "throwable:classic_batarang_knockback_item", "throwable:classic_batarang_kryptonite_item"]
        },
        {
            id: "throwable:crescent_dart",
            name: "Crescent Dart",
            desc: "Moon-shaped solid throwing blades sharp enough to pierce armor matrix components.",
            type: "throwable"
        }
    ],
    ores: [
        { 
            id: "ore:taptanium", 
            name: "Taptanium Ore", 
            desc: "A versatile underground mineral.", 
            spawn: { dimension: "overworld", y: "-60 to 50", rarity: "common" }, 
            drops: ["taptanium_shard"] 
        },
        { 
            id: "ore:titanium", 
            name: "Titanium Ore", 
            desc: "Main crafting material found underground.", 
            spawn: { dimension: "overworld", y: "-60 to 50", rarity: "common" }, 
            drops: ["titanium_ingot"] 
        },
        { 
            id: "ore:vibranium", 
            name: "Vibranium Ore", 
            desc: "A powerful, rare ore found specifically in savanna biomes.", 
            spawn: { dimension: "overworld", biome: "savanna", y: "-60 to 150", rarity: "rare" }, 
            drops: ["vibranium_fragment"] 
        },
        { 
            id: "ore:kryptonite", 
            name: "Kryptonite", 
            desc: "Radioactive mineral found in fallen meteors.", 
            spawn: { structure: "Kryptonite Meteor", rarity: "very rare" }, 
            drops: ["kryptonite"] 
        },
        { 
            id: "ore:blue_kryptonite", 
            name: "Blue Kryptonite", 
            desc: "A unique, highly unstable isotopic variation.", 
            spawn: { structure: "Blue Kryptonite Meteor", rarity: "very rare" }, 
            drops: ["blue_kryptonite"] 
        }
    ],
    structures: [
        { 
            id: "structure:science_lab", 
            name: "Science Lab", 
            desc: "High-tech facility generating in open plains.", 
            spawn: { dimension: "overworld", biome: "plains" }, 
            contains: ["experimental_data", "advanced_components"] 
        },
        { 
            id: "structure:kryptonite_meteor", 
            name: "Kryptonite Meteor", 
            desc: "A fallen radioactive rock from space.", 
            spawn: { dimension: "overworld", biome: "any" }, 
            contains: ["kryptonite"] 
        },
        { 
            id: "structure:blue_kryptonite_meteor", 
            name: "Blue Kryptonite Meteor", 
            desc: "A rare variant of fallen space debris.", 
            spawn: { dimension: "overworld", biome: "any" }, 
            contains: ["blue_kryptonite"] 
        }
    ],
    entities: [
        { id: "entity:radioactive_spider", name: "Radioactive Spider", desc: "A glowing arachnid with mutating venom.", spawn: { biome: "forest", light_level: "low" }, drops: ["Radioactive DNA"] }
    ]
};

const REGISTRY_ABILITIES = [
    // --- COMPOUND GROUP CARDS ---
    {
        name: "Energy Beams",
        icon: "energy_beam",
        colors: true,
        multi: true,
        options: [
            { label: "Standard Beam", itemId: "ability:energy_beam_<color>", tags: [] },
            { label: "Chest Beam", itemId: "ability:chest_energy_beam_<color>", tags: [] },
            { label: "Double Beam", itemId: "ability:double_energy_beam_<color>", tags: [] },
            { label: "Head Beam", itemId: "ability:head_energy_beam_<color>", tags: [] }
        ]
    },

    // --- ACTIVE ABILITIES ---
    { name: "Area Teleport", icon: "portal", items: ["ability:area_teleport"], tags: ["ability:area_teleport_<color>", "ability:area_teleport_lightning"], colors: true },
    { name: "Energy Bomb", icon: "energy_bomb", items: ["ability:energy_bomb"], tags: ["ability:energy_bomb", "ability:energy_bomb_<color>"], scale: true, colors: true },
    { name: "Fire Breath", icon: "fire_breath", items: ["ability:fire_breath"], tags: ["ability:fire_breath"], scale: true },
    { name: "Flight", icon: "flight", items: ["ability:flight"], tags: ["ability:flight"], scale: true },
    { name: "Flight When Suit On", icon: "flight", items: ["ability:flight"], tags: ["ability:flight_when_suit_on"], scale: true },
    { name: "Forcefield", icon: "forcefield", items: ["ability:forcefield_<color>"], colors: true },
    { name: "Frostbite Wave", icon: "frostbite_wave", items: ["ability:frostbite_wave"] },
    { name: "Gravity Flip", icon: "gravity_flip", items: ["ability:gravity_flip"] },
    { name: "Ground Smash", icon: "ground_smash", items: ["ability:ground_smash"], tags: ["ability:ground_smash"], scale: true },
    { name: "Healing Aura", icon: "healing_aura", items: ["ability:healing_aura"] },
    { name: "Heat Vision", icon: "heat_vision", items: ["ability:heat_vision_<color>"], tags: ["ability:heat_vision"], scale: true, colors: true },
    { name: "Ice Breath", icon: "ice_breath", items: ["ability:ice_breath"], tags: ["ability:ice_breath"], scale: true },
    { name: "Kinetic Pulse", icon: "kinetic_pulse", items: ["ability:kinetic_pulse"] },
    { name: "Lightning Beam", icon: "lightning_beam", items: ["ability:lightning_beam_<color>"], tags: ["ability:lightning_beam"], scale: true, colors: true },
    { name: "Lightning Strike", icon: "lightning_strike", items: ["ability:lightning_strike"] },
    { name: "Mind Tricks", icon: "mind_tricks", items: ["ability:mind_tricks"] },
    { name: "Phase", icon: "phase", items: ["ability:phase"] },
    { name: "Portal", icon: "portal", items: ["ability:portal_<color>"], colors: true },
    { name: "Power Blast", icon: "power_blast", items: ["ability:power_blast"], tags: ["ability:power_blast", "ability:power_blast_<color>"], scale: true, colors: true },
    { name: "Prism Shot", icon: "prism_shot", items: ["ability:prism_shot"], tags: ["ability:prism_shot", "ability:prism_shot_<color>"], scale: true, colors: true },
    { name: "Rocket Slam", icon: "rocket_slam", items: ["ability:rocket_slam"], tags: ["ability:rocket_slam"], scale: true },
    { name: "Size Manipulation", icon: "size_manipulation", items: ["ability:size_manipulation"] },
    { name: "Sound Blast", icon: "sound_blast", items: ["ability:sound_blast"] },
    { name: "Super Breath", icon: "super_breath", items: ["ability:fire_breath", "ability:ice_breath"] },
    { name: "Super Punch", icon: "super_punch", items: ["ability:super_punch"], tags: ["ability:super_punch"], scale: true },
    { name: "Super Speed", icon: "super_speed", items: ["ability:super_speed"], tags: ["ability:super_speed", "ability:super_speed_<color>"], scale: true, colors: true },
    { name: "Super Strength", icon: "super_strength", tags: ["ability:super_strength"], scale: true },
    { name: "Telekinesis", icon: "telekinesis", items: ["ability:telekinesis"] },
    { name: "Tentacles Defense", icon: "tentacles", items: ["ability:tentacles_defense"], tags: ["ability:tentacles_<color>"], colors: true },
    { name: "Tentacles Offense", icon: "tentacles", items: ["ability:tentacles_offense"], tags: ["ability:tentacles_<color>"], colors: true },
    { name: "Thunderclap", icon: "thunderclap", items: ["ability:thunderclap"], tags: ["ability:thunderclap"], scale: true },
    { name: "Web Shooter", icon: "web_shooter", items: ["weapon:web_shooter", "weapon:natural_web_shooter"] },
    { name: "Web Spin", icon: "web_spin", items: ["ability:web_spin"] },
    { name: "Web Swing", icon: "web_swing", items: ["ability:web_swing"] },

    // --- PASSIVE / TAG ABILITIES ---
    { name: "Blocking", icon: "forcefield", tags: ["ability:blocking"], scale: true },
    { name: "Damage Reduction", icon: "dmg_reduction", tags: ["dmg_reduction:percent"], scale: true },
    { name: "Extra Life", icon: "extra_life", tags: ["ability:extra_life"], scale: true },
    { name: "Gliding", icon: "flight", tags: ["ability:gliding"] },
    { name: "Gliding When Suit On", icon: "flight", tags: ["ability:gliding_when_suit_on"] },
    { name: "Passive Dodge", icon: "passive_dodge", tags: ["ability:passive_dodge"], scale: true },
    { name: "Photo Healing", icon: "photo_healing", tags: ["ability:photo_healing"] },
    { name: "Undying", icon: "undying", tags: ["ability:undying"] },
    { name: "Vampire", icon: "vampire", tags: ["ability:vampire"] },
    { name: "Echolocation", icon: "xray", tags: ["ability:echolocation_red"] },

    // --- IMMUNITIES ---
    { name: "Immune: Fire", icon: "immunity", tags: ["immune:fire"] },
    { name: "Immune: Lava", icon: "immunity", tags: ["immune:lava"] },
    { name: "Immune: Fall", icon: "immunity", tags: ["immune:fall"] },
    { name: "Immune: Explosion", icon: "immunity", tags: ["immune:explosion"] },
    { name: "Immune: Lightning", icon: "immunity", tags: ["immune:lightning"] },
    { name: "Immune: Drowning", icon: "immunity", tags: ["immune:drowning"] },
    { name: "Immune: Suffocation", icon: "immunity", tags: ["immune:suffocation"] },
    { name: "Immune: Magic", icon: "immunity", tags: ["immune:magic"] },
    { name: "Immune: Void", icon: "immunity", tags: ["immune:void"] },
    { name: "Immune: Poison", icon: "immunity", tags: ["immune:poison"] },
    { name: "Immune: Wither", icon: "immunity", tags: ["immune:wither"] },
    { name: "Immune: Nausea", icon: "immunity", tags: ["immune:nausea"] },
    { name: "Immune: Blindness", icon: "immunity", tags: ["immune:blindness"] },
    { name: "Immune: Hunger", icon: "immunity", tags: ["immune:hunger"] },
    { name: "Immune: Weakness", icon: "immunity", tags: ["immune:weakness"] },
    { name: "Immune: Fatigue", icon: "immunity", tags: ["immune:fatigue"] },
    { name: "Immune: Slowness", icon: "immunity", tags: ["immune:slowness"] },
    { name: "Immune: Levitation", icon: "immunity", tags: ["immune:levitation"] },
    { name: "Immune: Telekinesis", icon: "immunity", tags: ["immune:telekinesis"] },

    // --- VISUAL / EFFECT TAGS ---
    { name: "Black Webs", icon: "web_shooter", tags: ["web:black"] },
    { name: "White To Black Webs", icon: "web_shooter", tags: ["web:white_to_black"] },
    { name: "Black To White Webs", icon: "web_shooter", tags: ["web:black_to_white"] },
    { name: "Natural Webs", icon: "web_shooter", tags: ["web:natural"] },
    { name: "Increased Web Regen", icon: "web_shooter", tags: ["web:increased"] },
    { name: "Major Web Regen", icon: "web_shooter", tags: ["web:major"] },
    { name: "Metal Skeleton Hit Sound", icon: "hit_sounds", tags: ["sound:metal_skeleton"] },
    { name: "Vampire Hiss Hit Sound", icon: "hit_sounds", tags: ["sound:vampire_hiss"] },
    { name: "Sound Weakness", icon: "sound_blast", tags: ["weakness:sound"] }
];
