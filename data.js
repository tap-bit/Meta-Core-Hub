const colors = ["red", "blue", "yellow", "orange", "green", "purple", "pink", "white", "black"];
const auraColors = ["Red", "Blue", "Yellow", "Orange", "Green", "Purple", "Pink", "White", "Black"];
const hexMap = { Red: "#ff4444", Blue: "#4444ff", Yellow: "#ffff44", Orange: "#ffaa00", Green: "#44ff44", Purple: "#aa44ff", Pink: "#ff88ff", White: "#ffffff", Black: "#555555" };

const DATA = {
items: [
    {
        id: "ability:super_strength",
        name: "Super Strength",
        desc: "Passive strength tag that adds extra melee damage equal to the ability level.",
        scaling: { damage: "+level melee damage", knockback: "level 15+ adds forward impulse" },
        type: ["passive", "combat"],
        tags: ["ability:super_strength_<level>"]
    },
    {
        id: "ability:super_speed",
        name: "Super Speed",
        desc: "Cycle speed gears and move at extreme speeds.",
        scaling: { max_gear: "ability:super_speed_<level>", fall_damage: "cancelled" },
        visuals: {
            default_particle: "particle:wind_stripe",
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
        type: ["active", "movement"],
        tips: "Color trails appear while moving at gear 8 or above."
    },
    {
        id: "ability:size_manipulation",
        name: "Size Manipulation",
        desc: "Alter your size between 0.1x and 10x.",
        scaling: { scale_multiplier: "0.1x, 0.2x, 0.5x, 1x, 2x, 5x, 10x" },
        type: ["active", "movement"]
    },
    {
        id: "ability:flight",
        name: "Flight",
        desc: "Powered flight with gear-based movement control.",
        scaling: { max_gear: "ability:flight_<level>", suit_only: "ability:flight_when_suit_on_<level>" },
        tags: ["ability:flight_<level>", "ability:flight_when_suit_on_<level>", "ability:gliding", "ability:gliding_when_suit_on"],
        type: ["active", "movement"]
    },
    {
        id: "ability:web_swing",
        name: "Web Swing",
        desc: "Swing, zip, slingshot, pull, and ground slam using web physics.",
        mechanics: { max_range: 100, ground_slam_damage: 10, ground_slam_range: 6 },
        visuals: { web_tags: ["web:black", "web:white_to_black", "web:black_to_white"] },
        type: ["active", "movement", "combat"]
    },
    {
        id: "ability:phase",
        name: "Phase",
        desc: "Enter spectator phasing for 10 seconds, then return to survival.",
        mechanics: { duration_seconds: 10, cooldown_seconds: 20 },
        type: ["active", "movement"]
    },
    {
        id: "ability:heat_vision",
        name: "Heat Vision",
        desc: "Continuous fire-tick beam fired from the eyes.",
        scaling: { damage: "1 + level", range: 40, tag_requirement: "ability:heat_vision_<level>" },
        visuals: {
            ids: [
                "ability:heat_vision_red",
                "ability:heat_vision_blue",
                "ability:heat_vision_yellow",
                "ability:heat_vision_orange",
                "ability:heat_vision_green",
                "ability:heat_vision_purple",
                "ability:heat_vision_pink",
                "ability:heat_vision_white",
                "ability:heat_vision_black"
            ]
        },
        type: ["active", "combat", "ranged"]
    },
    {
        id: "ability:energy_beams",
        name: "Energy Beams",
        desc: "Colorable energy beam items. Standard beam uses normal damage; double/chest/head variants are separate item variants.",
        scaling: { damage: "standard: 1 + level", double_beam_script_damage: "(1 + level) * 2", tag_requirement: "ability:energy_beam_<level>" },
        type: ["active", "combat", "ranged"],
        variants: {
            standard: [
                "ability:energy_beam_red",
                "ability:energy_beam_blue",
                "ability:energy_beam_yellow",
                "ability:energy_beam_orange",
                "ability:energy_beam_green",
                "ability:energy_beam_purple",
                "ability:energy_beam_pink",
                "ability:energy_beam_white",
                "ability:energy_beam_black"
            ],
            double: [
                "ability:double_energy_beam_red",
                "ability:double_energy_beam_blue",
                "ability:double_energy_beam_yellow",
                "ability:double_energy_beam_orange",
                "ability:double_energy_beam_green",
                "ability:double_energy_beam_purple",
                "ability:double_energy_beam_pink",
                "ability:double_energy_beam_white",
                "ability:double_energy_beam_black"
            ],
            head: [
                "ability:head_energy_beam_red",
                "ability:head_energy_beam_blue",
                "ability:head_energy_beam_yellow",
                "ability:head_energy_beam_orange",
                "ability:head_energy_beam_green",
                "ability:head_energy_beam_purple",
                "ability:head_energy_beam_pink",
                "ability:head_energy_beam_white",
                "ability:head_energy_beam_black"
            ],
            chest: [
                "ability:chest_energy_beam_red",
                "ability:chest_energy_beam_blue",
                "ability:chest_energy_beam_yellow",
                "ability:chest_energy_beam_orange",
                "ability:chest_energy_beam_green",
                "ability:chest_energy_beam_purple",
                "ability:chest_energy_beam_pink",
                "ability:chest_energy_beam_white",
                "ability:chest_energy_beam_black"
            ]
        }
    },
    {
        id: "ability:forcefields",
        name: "Forcefields",
        desc: "Colorable forcefield bubble and armor items.",
        type: ["active", "defense"],
        variants: {
            bubble: [
                "ability:forcefield_red",
                "ability:forcefield_blue",
                "ability:forcefield_yellow",
                "ability:forcefield_orange",
                "ability:forcefield_green",
                "ability:forcefield_purple",
                "ability:forcefield_pink",
                "ability:forcefield_white",
                "ability:forcefield_black"
            ],
            armor: [
                "ability:forcefield_armor_red",
                "ability:forcefield_armor_blue",
                "ability:forcefield_armor_yellow",
                "ability:forcefield_armor_orange",
                "ability:forcefield_armor_green",
                "ability:forcefield_armor_purple",
                "ability:forcefield_armor_pink",
                "ability:forcefield_armor_white",
                "ability:forcefield_armor_black"
            ]
        }
    },
    {
        id: "ability:lightning_beams",
        name: "Lightning Beams",
        desc: "Continuous lightning beam with explosion particles on hit.",
        scaling: { damage: "2 + (level * 1.5)", range: 40, tag_requirement: "ability:lightning_beam_<level>" },
        type: ["active", "combat", "ranged"],
        ids: [
            "ability:lightning_beam_red",
            "ability:lightning_beam_blue",
            "ability:lightning_beam_yellow",
            "ability:lightning_beam_orange",
            "ability:lightning_beam_green",
            "ability:lightning_beam_purple",
            "ability:lightning_beam_pink",
            "ability:lightning_beam_white",
            "ability:lightning_beam_black"
        ]
    },
    {
        id: "ability:portals",
        name: "Portals & Teleportation",
        desc: "Colorable portals plus area teleport.",
        type: ["active", "movement"],
        ids: [
            "ability:portal_red",
            "ability:portal_blue",
            "ability:portal_yellow",
            "ability:portal_orange",
            "ability:portal_green",
            "ability:portal_purple",
            "ability:portal_white",
            "ability:portal_black",
            "ability:area_teleport"
        ],
        tags: [
            "ability:area_teleport_red",
            "ability:area_teleport_blue",
            "ability:area_teleport_yellow",
            "ability:area_teleport_orange",
            "ability:area_teleport_green",
            "ability:area_teleport_purple",
            "ability:area_teleport_white",
            "ability:area_teleport_black",
            "ability:area_teleport_lightning"
        ]
    },
    {
        id: "ability:power_blast",
        name: "Power Blast",
        desc: "Projectile blast. Below level 50 it deals radius damage; level 50+ creates an explosion.",
        scaling: { damage: "5 + (level * 1.5)", explosion_power: "level / 5, capped at 20", tag_requirement: "ability:power_blast_<level>" },
        visuals: {
            color_tags: [
                "ability:power_blast_red",
                "ability:power_blast_blue",
                "ability:power_blast_yellow",
                "ability:power_blast_orange",
                "ability:power_blast_green",
                "ability:power_blast_purple",
                "ability:power_blast_white",
                "ability:power_blast_black"
            ]
        },
        type: ["active", "combat", "ranged"]
    },
    {
        id: "ability:energy_bomb",
        name: "Energy Bomb",
        desc: "Explosive unstable energy projectile.",
        scaling: { explosion_power: "level / 5, capped at 20", tag_requirement: "ability:energy_bomb_<level>" },
        visuals: {
            color_tags: [
                "ability:energy_bomb_red",
                "ability:energy_bomb_blue",
                "ability:energy_bomb_yellow",
                "ability:energy_bomb_orange",
                "ability:energy_bomb_green",
                "ability:energy_bomb_purple",
                "ability:energy_bomb_white",
                "ability:energy_bomb_black"
            ]
        },
        type: ["active", "combat", "ranged"]
    },
    {
        id: "ability:prism_shot",
        name: "Prism Shot",
        desc: "Fires a bolt that splits into tracking beams against nearby targets.",
        scaling: { split_damage: "8 + (level * 1.5)", max_targets: 5, tag_requirement: "ability:prism_shot_<level>" },
        visuals: {
            color_tags: [
                "ability:prism_shot_red",
                "ability:prism_shot_blue",
                "ability:prism_shot_yellow",
                "ability:prism_shot_orange",
                "ability:prism_shot_green",
                "ability:prism_shot_purple",
                "ability:prism_shot_white",
                "ability:prism_shot_black"
            ]
        },
        type: ["active", "combat", "ranged"]
    },
    {
        id: "ability:ground_smash",
        name: "Ground Smash",
        desc: "Ground impact explosion with level-scaling explosion power.",
        scaling: { explosion_power: "2.5 + (level * 0.5)", sonic_particle: "level >= 7" },
        type: ["active", "combat"]
    },
    {
        id: "ability:super_punch",
        name: "Super Punch",
        desc: "Toggleable explosive melee impact.",
        scaling: { explosion_power: "1.5 + (level * 0.35)" },
        type: ["active", "combat", "melee"]
    },
    {
        id: "ability:thunderclap",
        name: "Thunderclap",
        desc: "Area soundwave that damages, knocks back, and breaks fragile blocks.",
        scaling: { damage: "5 + (level * 1.5)", radius: "6 + (level * 0.5)", knockback: "2 + (level * 0.4)" },
        type: ["active", "combat"]
    },
    {
        id: "ability:lightning_strike",
        name: "Lightning Strike",
        desc: "Summons lightning bolts onto up to 5 nearby non-player targets.",
        mechanics: { range: 20, max_targets: 5, cooldown_seconds: 5 },
        type: ["active", "combat"]
    },
    {
        id: "ability:fire_breath",
        name: "Fire Breath",
        desc: "Continuous flame breath that damages, ignites, and alters blocks.",
        scaling: { damage: "2 + (level * 1.5)", tag_requirement: "ability:fire_breath_<level>" },
        type: ["active", "combat", "ranged"]
    },
    {
        id: "ability:ice_breath",
        name: "Ice Breath",
        desc: "Continuous frost breath that damages, slows, and freezes blocks.",
        scaling: { damage: "2 + (level * 1.5)", tag_requirement: "ability:ice_breath_<level>" },
        type: ["active", "combat", "ranged"]
    },
    {
        id: "ability:gravity_flip",
        name: "Gravity Flip",
        desc: "Applies levitation and gravity-flip particles in a radius.",
        mechanics: { radius: 20, duration_seconds: 4, cooldown_seconds: 10 },
        counters: ["immune:levitation"],
        type: ["active", "control"]
    },
    {
        id: "ability:frostbite_wave",
        name: "Frostbite Wave",
        desc: "Cone wave that slows and pushes targets without direct damage.",
        mechanics: { slowness_ticks: 80, slowness_amplifier: 4, cooldown_seconds: 12 },
        type: ["active", "control"]
    },
    {
        id: "ability:kinetic_pulse",
        name: "Kinetic Pulse",
        desc: "Radial kinetic blast with knockback.",
        mechanics: { damage: 4, radius: 8, cooldown_ticks: 180 },
        type: ["active", "combat"]
    },
    {
        id: "ability:rocket_slam",
        name: "Rocket Slam",
        desc: "Launch upward, then crash into the ground for massive area damage.",
        scaling: { damage: "15 + (level * 5)", radius: "6 + (level * 1.2)", explosion: "level > 10" },
        type: ["active", "combat", "movement"]
    },
    {
        id: "ability:web_spin",
        name: "Web Spin",
        desc: "Area web spin that repeatedly damages and webs nearby targets.",
        mechanics: { damage_per_tick: 1, max_damage_ticks: 10, radius: 7, web_after_hits: 3 },
        visuals: { web_tags: ["web:black", "web:white_to_black", "web:black_to_white"] },
        type: ["active", "combat"]
    },
    {
        id: "ability:sound_blast",
        name: "Sound Blast",
        desc: "Mode-swapping sonic tool: beam damage or propulsion movement.",
        mechanics: { beam_damage: 2, beam_range: 25, max_charge: 100 },
        tags: ["weakness:sound"],
        type: ["active", "combat", "movement"]
    },
    {
        id: "ability:healing_aura",
        name: "Healing Aura",
        desc: "Regenerates nearby entities.",
        mechanics: { radius: 5, regeneration_ticks: 100, regeneration_amplifier: 1, cooldown_seconds: 120 },
        type: ["active", "support"]
    },
    {
        id: "ability:telekinesis",
        name: "Telekinesis",
        desc: "Holds entities in front of the player.",
        mechanics: { grab_distance: 15, hold_distance: 4.5 },
        counters: ["immune:telekinesis"],
        type: ["active", "support", "control"]
    },
    {
        id: "ability:mind_tricks",
        name: "Mind Tricks",
        desc: "Fake entities, sounds, hallucinated fire, and mind push.",
        mechanics: { cooldown_ticks: 100 },
        modes: ["fake_creeper", "fake_herobrine", "cave_noise", "fake_fire", "mind_push"],
        type: ["active", "support", "control"]
    },
    {
        id: "ability:tentacles",
        name: "Tentacles",
        desc: "Symbiote tentacle offense and defense tools.",
        ids: ["ability:tentacles_defense", "ability:tentacles_offense"],
        mechanics: { defense_damage: 4, offense_damage: 8, offense_range: 10, grab_range: 8 },
        visuals: {
            color_tags: [
                "ability:tentacles_red",
                "ability:tentacles_blue",
                "ability:tentacles_yellow",
                "ability:tentacles_orange",
                "ability:tentacles_green",
                "ability:tentacles_purple",
                "ability:tentacles_pink",
                "ability:tentacles_white",
                "ability:tentacles_black"
            ]
        },
        type: ["active", "combat", "control"]
    },

    {
        id: "ability:passives",
        name: "Passive Ability Tags",
        desc: "Non-item abilities controlled by tags.",
        type: ["passive"],
        tags: [
            "ability:extra_life_<level>",
            "ability:undying",
            "ability:photo_healing",
            "ability:vampire",
            "ability:passive_dodge_<level>",
            "ability:blocking_<level>",
            "dmg_reduction:percent_<level>",
            "ability:echolocation_red"
        ]
    },
    {
        id: "ability:immunities",
        name: "Immunities",
        desc: "Damage and effect immunity tags.",
        type: ["passive", "defense"],
        tags: [
            "immune:fire",
            "immune:lava",
            "immune:fall",
            "immune:explosion",
            "immune:lightning",
            "immune:drowning",
            "immune:suffocation",
            "immune:magic",
            "immune:void",
            "immune:poison",
            "immune:wither",
            "immune:nausea",
            "immune:blindness",
            "immune:hunger",
            "immune:weakness",
            "immune:fatigue",
            "immune:slowness",
            "immune:levitation",
            "immune:telekinesis"
        ]
    },
    {
        id: "ability:web_tags",
        name: "Web Passive Tags",
        desc: "Tags that change web color or web-fluid regeneration.",
        type: ["passive", "utility"],
        tags: ["web:black", "web:white_to_black", "web:black_to_white", "web:natural", "web:increased", "web:major"]
    },

    {
        id: "shield:shields",
        name: "Defensive Relic Shields",
        desc: "Deploy specific solid energy geometric barriers.",
        type: ["defense", "weapon"],
        ids: ["shield:holo_shield", "shield:strange_shield", "shield:wanda_shield"]
    },
    {
        id: "suit:cosmetics",
        name: "Suit Adjustments & Cosmetics",
        desc: "Manage integrated aesthetic outputs, menus, and configurations.",
        type: ["cosmetic", "utility"],
        ids: ["suit:visuals_item", "toggle:nano_offense", "item:camera_menu"]
    },
    {
        id: "weapon:beetle_arm_cannon",
        name: "Beetle Arm Cannon",
        desc: "Colorable cybernetic arm cannon weapons.",
        type: ["weapon", "combat", "ranged"],
        ids: [
            "weapon:silver_beetle_arm_cannon",
            "weapon:black_beetle_arm_cannon",
            "weapon:red_beetle_arm_cannon",
            "weapon:blue_beetle_arm_cannon",
            "weapon:yellow_beetle_arm_cannon",
            "weapon:green_beetle_arm_cannon",
            "weapon:purple_beetle_arm_cannon",
            "weapon:orange_beetle_arm_cannon",
            "weapon:pink_beetle_arm_cannon"
        ]
    },
    {
        id: "weapon:web_shooters",
        name: "Web Shooters",
        desc: "Wrist-mounted or natural web deployment weapons.",
        type: ["weapon", "combat", "utility"],
        ids: ["weapon:web_shooter", "weapon:natural_web_shooter", "consumable:web_cartridge"],
        mechanics: {
            normal_damage: 2,
            electric_damage: 3,
            impact_damage: 5,
            fire_damage: 4
        }
    },
    {
        id: "gun:ak47",
        name: "AK47",
        desc: "Fully automatic high-caliber combat assault rifle.",
        type: ["weapon", "gun"],
        magazine_id: "gun:ak47_mag"
    },
    {
        id: "gun:colt_m1911",
        name: "Colt M1911",
        desc: "Semi-automatic heavy service pistol.",
        type: ["weapon", "gun"],
        magazine_id: "gun:colt_m1911_mag"
    },
    {
        id: "gun:mp5",
        name: "MP5",
        desc: "Tactical close-quarters submachine gun.",
        type: ["weapon", "gun"],
        magazine_id: "gun:mp5_mag"
    },
    {
        id: "ammo:light",
        name: "Light Ammunition",
        desc: "Rounds for rapid firing weapons or sidearms.",
        type: ["ammo"],
        ids: ["ammo:light_normal", "ammo:light_hv", "ammo:light_impact", "ammo:light_incendiary", "ammo:light_explosive"]
    },
    {
        id: "ammo:medium",
        name: "Medium Ammunition",
        desc: "Standard rifle-class ammunition.",
        type: ["ammo"],
        ids: ["ammo:medium_normal", "ammo:medium_hv", "ammo:medium_impact", "ammo:medium_incendiary", "ammo:medium_explosive"]
    },
    {
        id: "throwable:batarang",
        name: "Batarang",
        desc: "Balanced tactical throwing weapon variants.",
        type: ["throwable", "weapon"],
        ids: ["throwable:batarang_item", "throwable:batarang_electric_item", "throwable:batarang_explosive_item", "throwable:batarang_knockback_item", "throwable:batarang_kryptonite_item"]
    },
    {
        id: "throwable:beyond_batarang",
        name: "Beyond Batarang",
        desc: "Advanced futuristic throwing weapon variants.",
        type: ["throwable", "weapon"],
        ids: ["throwable:beyond_batarang_item", "throwable:beyond_batarang_electric_item", "throwable:beyond_batarang_explosive_item", "throwable:beyond_batarang_knockback_item", "throwable:beyond_batarang_kryptonite_item"]
    },
    {
        id: "throwable:birdarang",
        name: "Birdarang",
        desc: "Avian-themed throwing weapon variants.",
        type: ["throwable", "weapon"],
        ids: ["throwable:birdarang_item", "throwable:birdarang_electric_item", "throwable:birdarang_explosive_item", "throwable:birdarang_knockback_item", "throwable:birdarang_kryptonite_item"]
    },
    {
        id: "throwable:classic_batarang",
        name: "Classic Batarang",
        desc: "Traditional retro throwing weapon variants.",
        type: ["throwable", "weapon"],
        ids: ["throwable:classic_batarang_item", "throwable:classic_batarang_electric_item", "throwable:classic_batarang_explosive_item", "throwable:classic_batarang_knockback_item", "throwable:classic_batarang_kryptonite_item"]
    },
    {
        id: "throwable:crescent_dart",
        name: "Crescent Dart",
        desc: "Moon-shaped throwing blade.",
        type: ["throwable", "weapon"],
        ids: ["throwable:crescent_dart_item"]
    }
],
    ores: [
        { 
            id: "ore:taptanium", 
            name: "Taptanium Ore", 
            desc: "A versatile underground mineral.", 
            spawn: { dimension: "overworld", y: "-60 to 50", rarity: "common" }, 
            drops: ["taptanium"] 
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
