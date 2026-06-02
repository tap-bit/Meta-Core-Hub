const colors = ["blue", "pink", "yellow", "green", "purple", "orange", "red", "black", "silver"];

const hexMap = {
    "blue": "#00e5ff", "pink": "#ff66cc", "yellow": "#ffff33", 
    "green": "#33cc33", "purple": "#9933ff", "orange": "#ff9900", 
    "red": "#ff3333", "black": "#1a1a1a", "silver": "#cccccc"
};

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
    {
        id: "super_strength",
        name: "Super Strength",
        type: "standard",
        inputType: "number",
        prefix: "ability:",
        hasScale: true,
        defaultScale: 8
    },
    {
        id: "energy_beam",
        name: "Energy Beam Blast",
        type: "standard",
        inputType: "number",
        prefix: "ability:",
        hasScale: true,
        defaultScale: 9
    },
    {
        id: "flight_mechanics",
        name: "Flight & Navigation Model",
        type: "select",
        options: [
            { label: "No Flight", value: "none" },
            { 
                label: "Flight (When Suit On)", 
                value: "flight_when_suit_on", 
                powerTags: ["ability:flight_when_suit_on_8"],
                item: { name: "Flight", itemId: "ability:flight", icon: "flight" }
            },
            { 
                label: "Standard Unrestricted Flight", 
                value: "flight_standard", 
                powerTags: ["ability:flight_standard_1"],
                item: { name: "Flight", itemId: "ability:flight", icon: "flight" }
            }
        ]
    },
    {
        id: "energy_bomb_variants",
        name: "Energy Bomb Configurations",
        type: "select",
        options: [
            { label: "No Energy Bomb Installed", value: "none" },
            ...colors.map(color => ({
                label: `${color.toUpperCase()} Energy Bomb Mode`,
                value: `bomb_${color}`,
                powerTags: ["ability:energy_bomb_10", `ability:energy_bomb_${color}`],
                item: { name: "Energy Bomb", itemId: "ability:energy_bomb", icon: "energy_bomb" }
            }))
        ]
    },
    {
        id: "arm_cannon_variants",
        name: "Arm Cannon Weapon Modules",
        type: "select",
        options: [
            { label: "No Heavy Weapons Mounted", value: "none" },
            ...colors.map(color => ({
                label: `${color.toUpperCase()} Beetle Arm Cannon`,
                value: `cannon_${color}`,
                powerTags: [],
                item: { name: "Arm Cannon", itemId: `weapon:${color}_beetle_arm_cannon`, icon: "arm_cannon" }
            }))
        ]
    },
    {
        id: "forcefield_variants",
        name: "Defensive Forcefield Systems",
        type: "select",
        options: [
            { label: "No Shield Generative Matrix", value: "none" },
            ...colors.map(color => ({
                label: `${color.toUpperCase()} Holographic Shield`,
                value: `shield_${color}`,
                powerTags: [],
                item: { name: "Forcefield", itemId: `ability:forcefield_${color}`, icon: "forcefield" }
            }))
        ]
    },
    {
        id: "nanotech_configurations",
        name: "Nanotech Infrastructure Protocol",
        type: "select",
        options: [
            { label: "No Active Micro-Infrastructures", value: "none" },
            { label: "Offense Mode Level 1", value: "off_1", powerTags: ["nano:offense_1"] },
            { label: "Offense Mode Level 2", value: "off_2", powerTags: ["nano:offense_2"] },
            { label: "Offense Mode Level 3", value: "off_3", powerTags: ["nano:offense_3"] },
            { label: "Offense Mode Level 4", value: "off_4", powerTags: ["nano:offense_4"] },
            { label: "Offense Mode Level 5", value: "off_5", powerTags: ["nano:offense_5"] },
            { label: "Offense Mode Level 6", value: "off_6", powerTags: ["nano:offense_6"] },
            { label: "Offense Mode Level 7", value: "off_7", powerTags: ["nano:offense_7"] },
            { label: "Offense Mode Level 8", value: "off_8", powerTags: ["nano:offense_8"] },
            { label: "Offense Mode Level 9", value: "off_9", powerTags: ["nano:offense_9"] }
        ]
    },
    {
        id: "spider_webbing_variants",
        name: "Tactical Web-Dispenser Modules",
        type: "select",
        options: [
            { label: "No Web Dispenser Mechanisms", value: "none" },
            { 
                label: "Natural Alien Symbiote Dispenser", 
                value: "symbiote_web", 
                powerTags: ["web:white_to_black", "web:increased"],
                item: { name: "Web Shooter", itemId: "weapon:natural_web_shooter", icon: "web_shooter" }
            },
            { 
                label: "Mechanical Cartridge Web Shooter", 
                value: "classic_web", 
                powerTags: [],
                item: { name: "Web Shooter", itemId: "weapon:web_shooter", icon: "web_shooter" }
            }
        ]
    },
    {
        id: "spider_mobility",
        name: "Spider Traversal Frameworks",
        type: "multiselect",
        options: [
            { label: "Web Swing Framework", value: "swing", powerTags: [], item: { name: "Web Swing", itemId: "ability:web_swing", icon: "web_swing" } },
            { label: "Web Spin Trappable Strands", value: "spin", powerTags: [], item: { name: "Web Spin", itemId: "ability:web_spin", icon: "web_spin" } }
        ]
    },
    {
        id: "damage_mitigation",
        name: "Structural Defensive Scaling",
        type: "select",
        options: [
            { label: "Standard Baseline Kinetic Absorption", value: "none" },
            { label: "Heavy Armored Matrix (85% Mitigation)", value: "85", powerTags: ["dmg_reduction:percent_85"] },
            { label: "Symbiotic Flexible Adaptation (83% Mitigation)", value: "83", powerTags: ["dmg_reduction:percent_83"] },
            { label: "Standard Reinforced Fabric (79% Mitigation)", value: "79", powerTags: ["dmg_reduction:percent_79"] }
        ]
    },
    {
        id: "environmental_immunities",
        name: "Environmental Hazard Countermeasures",
        type: "multiselect",
        options: [
            { label: "Poison Biological Cleanse", value: "poison", powerTags: ["immune:poison"] },
            { label: "Wither Decay Shielding", value: "wither", powerTags: ["immune:wither"] },
            { label: "Lightning Overcharge Grounding", value: "lightning", powerTags: ["immune:lightning"] },
            { label: "Lava Extreme Thermal Immunity", value: "lava", powerTags: ["immune:lava"] },
            { label: "Fall Kinetic Dispersion Matrix", value: "fall", powerTags: ["immune:fall"] }
        ]
    },
    {
        id: "tactical_maneuvers",
        name: "Tactical Response Frameworks",
        type: "multiselect",
        options: [
            { label: "Passive Dodge System (Lvl 1)", value: "dodge_1", powerTags: ["ability:passive_dodge_1"] },
            { label: "Passive Dodge System (Lvl 3)", value: "dodge_3", powerTags: ["ability:passive_dodge_3"] },
            { label: "Passive Dodge System (Lvl 5)", value: "dodge_5", powerTags: ["ability:passive_dodge_5"] },
            { label: "Reactive Blocking Shielding (Lvl 5)", value: "blocking_5", powerTags: ["ability:blocking_5"] }
        ]
    },
    {
        id: "suit_visuals_common",
        name: "Visual Utility Controls",
        type: "multiselect",
        options: [
            { label: "Register Visual Override Toggle Item", value: "visual_item", powerTags: [], item: { name: "Suit Visuals Item", itemId: "suit:visuals_item", icon: "visual_item" } }
        ]
    }
];

window.DATA = DATA;
window.REGISTRY_ABILITIES = REGISTRY_ABILITIES;
window.hexMap = hexMap;
window.colors = colors;
