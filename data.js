const DATA = {
    abilities: [
        { name: "Super Strength", desc: "Increases melee damage massively.", scaling: { damage: "base * (level / 10)", knockback: "level * 0.2" }, visuals: { aura: "red", particles: "impact_shockwave" }, tags: ["passive", "combat"] },
        { name: "Super Speed", desc: "Move at extreme speeds.", scaling: { speed: "base + (level * 0.5)" }, visuals: { trailColor: "yellow", lightning: true }, tags: ["movement"] },
        { name: "Web Swing", desc: "Swing using web physics.", mechanics: { range: 40, velocity: 2 }, tags: ["movement"] }
    ],
    ores: [
        { name: "Titanium Ore", desc: "High-tier crafting material.", spawn: { dimension: "overworld", y: "-40 to 20", rarity: "uncommon" }, drops: ["titanium_ingot"] },
        { name: "Kryptonite", desc: "Radioactive mineral from crashed meteors.", spawn: { structure: "Kryptonite Meteor", rarity: "rare" }, drops: ["kryptonite"] },
        { name: "Blue Kryptonite", desc: "A unique isotopic variation of kryptonite.", spawn: { structure: "Blue Kryptonite Meteor", rarity: "very rare" }, drops: ["blue kryptonite"] }
    ],
    structures: [
        { name: "Kryptonite Meteor", desc: "A fallen radioactive rock from space.", spawn: { dimension: "overworld", biome: "plains" }, contains: ["kryptonite"] },
        { name: "Blue Kryptonite Meteor", desc: "A rare variant of fallen space debris.", spawn: { dimension: "overworld", biome: "plains" }, contains: ["blue kryptonite"] }
    ],
    entities: [
        { name: "Radioactive Spider", desc: "A glowing arachnid with mutating venom.", spawn: { biome: "forest", light_level: "low" }, drops: ["radioactive dna"] }
    ]
};

const colors = ["red", "blue", "yellow", "orange", "green", "purple", "pink", "white", "black"];
const auraColors = ["Red", "Blue", "Yellow", "Orange", "Green", "Purple", "Pink", "White", "Black"];
const hexMap = { Red: "#ff4444", Blue: "#4444ff", Yellow: "#ffff44", Orange: "#ffaa00", Green: "#44ff44", Purple: "#aa44ff", Pink: "#ff88ff", White: "#ffffff", Black: "#555555" };

const REGISTRY_ABILITIES = [
    { name: "Area Teleport", id: "ability:area_teleport", type: "item_tag", color: true, icon: "portal" },
    { name: "Chest Energy Beam", id: "ability:chest_energy_beam_<color>", type: "item_only", color: true, icon: "chest_energy_beam" },
    { name: "Double Energy Beam", id: "ability:double_energy_beam_<color>", type: "item_only", color: true, icon: "double_energy_beam" },
    { name: "Energy Beam", id: "ability:energy_beam_<color>", type: "item_only", color: true, icon: "energy_beam" },
    { name: "Energy Bomb", id: "ability:energy_bomb", type: "item_tag", scale: true, color: true, icon: "energy_bomb" },
    { name: "Extra Life", id: "ability:extra_life", type: "tag_only", scale: true },
    { name: "Fire Breath", id: "ability:fire_breath", type: "item_tag", scale: true, icon: "fire_breath" },
    { name: "Flight", id: "ability:flight", type: "item_tag", scale: true, icon: "flight" },
    { name: "Forcefield", id: "ability:forcefield_<color>", type: "item_only", color: true, icon: "forcefield" },
    { name: "Frostbite Wave", id: "ability:frostbite_wave", type: "item_only", icon: "frostbite_wave" },
    { name: "Gravity Flip", id: "ability:gravity_flip", type: "item_only", icon: "gravity_flip" },
    { name: "Ground Smash", id: "ability:ground_smash", type: "item_tag", scale: true, icon: "ground_smash" },
    { name: "Head Energy Beam", id: "ability:head_energy_beam_<color>", type: "item_only", color: true, icon: "head_energy_beam" },
    { name: "Healing Aura", id: "ability:healing_aura", type: "item_only", icon: "healing_aura" },
    { name: "Heat Vision", id: "ability:heat_vision", type: "item_tag", scale: true, color: true, icon: "heat_vision" },
    { name: "Ice Breath", id: "ability:ice_breath", type: "item_tag", scale: true, icon: "ice_breath" },
    { name: "Kinetic Pulse", id: "ability:kinetic_pulse", type: "item_only", icon: "kinetic_pulse" },
    { name: "Lightning Beam", id: "ability:lightning_beam_<color>", type: "item_only", color: true, icon: "lightning_beam" },
    { name: "Lightning Strike", id: "ability:lightning_strike", type: "item_only", icon: "lightning_strike" },
    { name: "Phase", id: "ability:phase", type: "item_only", icon: "phase" },
    { name: "Photo Healing", id: "ability:photo_healing", type: "tag_only" },
    { name: "Power Blast", id: "ability:power_blast", type: "item_tag", scale: true, color: true, icon: "power_blast" },
    { name: "Prism Shot", id: "ability:prism_shot", type: "item_tag", scale: true, color: true, icon: "prism_shot" },
    { name: "Rocket Slam", id: "ability:rocket_slam", type: "item_tag", scale: true, icon: "rocket_slam" },
    { name: "Super Speed", id: "ability:super_speed", type: "item_tag", scale: true, color: true, icon: "super_speed" },
    { name: "Super Strength", id: "ability:super_strength", type: "tag_only", scale: true },
    { name: "Telekinesis", id: "ability:telekinesis", type: "item_only", icon: "telekinesis" },
    { name: "Thunderclap", id: "ability:thunderclap", type: "item_tag", scale: true, icon: "thunderclap" },
    { name: "Undying", id: "ability:undying", type: "tag_only" },
    { name: "Mask Off", id: "animation.suit.mask_off", type: "item_only", icon: "mask_off" },
    { name: "Hood Down", id: "animation.suit.hood_down", type: "item_only", icon: "hood_down" },
    { name: "Suit Off", id: "animation.suit.suit_off", type: "item_only", icon: "suit_off" },
    { name: "Nano Toggle", id: "ability:toggle_anim_suit", type: "item_only", icon: "toggle_anim_suit" }
];
