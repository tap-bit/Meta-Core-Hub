const DATA = {
    "abilities": [
        { "name": "Super Strength", "desc": "Increases melee damage and allows breaking heavy blocks easily.", "id": "ability:super_strength" },
        { "name": "Flight", "desc": "Allows full 3D celestial flight control and navigation parameters.", "id": "ability:flight" },
        { "name": "Energy Bomb", "desc": "Charges and releases an explosive energy mass projectile.", "id": "ability:energy_bomb" },
        { "name": "Web Shooters", "desc": "Deploys synthetic or biological cohesive strands for mobility.", "id": "weapon:web_shooter" }
    ],
    "suits": [
        { "name": "Beetle Exosuit", "desc": "High-tech alien scarab armor infrastructure.", "id": "suit:blue_beetle_suit" },
        { "name": "Symbiote Infrastructure", "desc": "Amorphous bio-reactive alien parasitic protective bond.", "id": "suit:symbiote_spiderman_suit" }
    ]
};

const colors = ["blue", "pink", "yellow", "green", "purple", "orange", "red", "black", "silver"];
const auraColors = ["Blue", "Pink", "Yellow", "Green", "Purple", "Orange", "Red", "Black", "Silver"];

const hexMap = {
    "Blue": "#00e5ff", "Pink": "#ff66cc", "Yellow": "#ffff33", 
    "Green": "#33cc33", "Purple": "#9933ff", "Orange": "#ff9900", 
    "Red": "#ff3333", "Black": "#1a1a1a", "Silver": "#cccccc"
};

// COMPREHENSIVE REGISTRY CONTROL SCHEMAS
const REGISTRY_ABILITIES = [
    {
        id: "super_strength",
        name: "Super Strength",
        type: "standard",
        prefix: "ability:",
        hasScale: true,
        defaultScale: 8
    },
    {
        id: "energy_beam",
        name: "Energy Beam Blast",
        type: "standard",
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
