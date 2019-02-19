var getBaseSkills = function() {
    return {
        "Corym": {
            "Armor Class": 17,
            "Speed": 35,
            "Strength": 12,
            "Dexterity": 15,
            "Constitution": 14,
            "Intelligence": 10,
            "Wisdom": 16,
            "Charisma": 8,
            "Proficiency Bonus": 2,
            "Skill Proficiencies": ["Insight", "Medicine", "Perception", "Persuasion", "Persuasion", "Religion"],
            "Skill Expertises": [],
            "Tool Proficiencies": [],
            "Tool Expertises": [],
            "Weight": 170,
            "Size": "Medium",
            "Languages": ["Common", "Celestial", "Elvish", "Infernal"]
        },
        "Etherya": {
            "Armor Class": 13,
            "Speed": 30,
            "Strength": 8,
            "Dexterity": 15,
            "Constitution": 14,
            "Intelligence": 10,
            "Wisdom": 13,
            "Charisma": 15,
            "Proficiency Bonus": 2,
            "Skill Proficiencies": ["Acrobatics", "Deception", "Insight", "Persuasion", "Religion", "Stealth"],
            "Skill Expertises": ["Deception", "Stealth"],
            "Tool Proficiencies": ["Thieves' Tools"],
            "Tool Expertises": [],
            "Weight": 120,
            "Size": "Medium",
            "Languages": ["Common", "Celestial", "Draconic", "Dwarvish", "Thieves' Cant"]
        },
        "Nyx": {
            "Armor Class": 12,
            "Speed": 25,
            "Strength": 8,
            "Dexterity": 14,
            "Constitution": 14,
            "Intelligence": 17,
            "Wisdom": 12,
            "Charisma": 10,
            "Proficiency Bonus": 2,
            "Skill Proficiencies": ["Arcana", "History", "Investigation", "Religion"],
            "Skill Expertises": [],
            "Tool Proficiencies": [],
            "Tool Expertises": [],
            "Weight": 23,
            "Size": "Tiny",
            "Languages": ["Common", "Gnomish", "Primordial", "Abyssal"]
        },
        "Roscoe": {
            "Armor Class": 14,
            "Speed": 25,
            "Strength": 12,
            "Dexterity": 17,
            "Constitution": 14,
            "Intelligence": 10,
            "Wisdom": 14,
            "Charisma": 8,
            "Proficiency Bonus": 2,
            "Skill Proficiencies": ["Insight", "Perception", "Sleight of Hand", "Stealth", "Survival"],
            "Skill Expertises": [],
            "Tool Proficiencies": ["Thieves' Tools", "Disguise Kit"],
            "Tool Expertises": [],
            "Weight": 40,
            "Size": "Small",
            "Languages": ["Common", "Abyssal", "Halfling"]
        },
        "Viryl": {
            "Armor Class": 18,
            "Speed": "30W/30S",
            "Strength": 15,
            "Dexterity": 8,
            "Constitution": 14,
            "Intelligence": 10,
            "Wisdom": 12,
            "Charisma": 16,
            "Proficiency Bonus": 2,
            "Skill Proficiencies": ["Athletics", "History", "Persuasion", "Religion"],
            "Skill Expertises": [],
            "Tool Proficiencies": [],
            "Tool Expertises": [],
            "Weight": 145,
            "Size": "Medium",
            "Languages": ["Common", "Elvish", "Primordial"]
        }
    }
};
var getSkills = function() {
    return [
        "Armor Class",
        "Initiative",
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma",
        "Acrobatics",
        "Animal Handling",
        "Arcana",
        "Athletics",
        "Deception",
        "History",
        "Insight",
        "Intimidation",
        "Investigation",
        "Medicine",
        "Nature",
        "Perception",
        "Performance",
        "Persuasion",
        "Religion",
        "Sleight of Hand",
        "Stealth",
        "Survival",
        "Artisan's Tool",
        "Cartographer",
        "Disguise Kit",
        "Forgery Kit",
        "Gaming Set",
        "Healer's Kit",
        "Herbalism Kit",
        "Mus. Instrument",
        "Navigator's Tools",
        "Poisoner's Kit",
        "Thieves' Tools",
        "Vehicles",
        "Weight",
        "Encumberance Limit",
        "Languages"
    ]
};
var getCharacters = function() {
    return [
        {
            "Name": "Corym",
            "Armor Class": 17,
            "Speed": 35,
            "Initiative": 0,
            "Strength": 0,
            "Dexterity": 0,
            "Constitution": 0,
            "Intelligence": 0,
            "Wisdom": 0,
            "Charisma": 0,
            "Acrobatics": 0,
            "Animal Handling": 0,
            "Arcana": 0,
            "Athletics": 0,
            "Deception": 0,
            "History": 0,
            "Insight": 0,
            "Intimidation": 0,
            "Investigation": 0,
            "Medicine": 0,
            "Nature": 0,
            "Perception": 0,
            "Performance": 0,
            "Persuasion": 0,
            "Religion": 0,
            "Sleight of Hand": 0,
            "Stealth": 0,
            "Survival": 0,
            "Artisan's Tool": 0,
            "Cartographer": 0,
            "Disguise Kit": 0,
            "Forgery Kit": 0,
            "Gaming Set": 0,
            "Healer's Kit": 0,
            "Herbalism Kit": 0,
            "Mus. Instrument": 0,
            "Navigator's Tools": 0,
            "Poisoner's Kit": 0,
            "Thieves' Tools": 0,
            "Vehicles": 0,
            "Weight": 0,
            "Encumberance Limit": 0,
            "Languages": ""
        }, {
            "Name": "Etherya",
            "Speed": 30,
            "Armor Class": 0,
            "Initiative": 0,
            "Strength": 0,
            "Dexterity": 0,
            "Constitution": 0,
            "Intelligence": 0,
            "Wisdom": 0,
            "Charisma": 0,
            "Acrobatics": 0,
            "Animal Handling": 0,
            "Arcana": 0,
            "Athletics": 0,
            "Deception": 0,
            "History": 0,
            "Insight": 0,
            "Intimidation": 0,
            "Investigation": 0,
            "Medicine": 0,
            "Nature": 0,
            "Perception": 0,
            "Performance": 0,
            "Persuasion": 0,
            "Religion": 0,
            "Sleight of Hand": 0,
            "Stealth": 0,
            "Survival": 0,
            "Artisan's Tool": 0,
            "Cartographer": 0,
            "Disguise Kit": 0,
            "Forgery Kit": 0,
            "Gaming Set": 0,
            "Healer's Kit": 0,
            "Herbalism Kit": 0,
            "Mus. Instrument": 0,
            "Navigator's Tools": 0,
            "Poisoner's Kit": 0,
            "Thieves' Tools": 0,
            "Vehicles": 0,
            "Weight": 0,
            "Encumberance Limit": 0,
            "Languages": ""
        }, {
            "Name": "Nyx",
            "Speed": 25,
            "Armor Class": 0,
            "Initiative": 0,
            "Strength": 0,
            "Dexterity": 0,
            "Constitution": 0,
            "Intelligence": 0,
            "Wisdom": 0,
            "Charisma": 0,
            "Acrobatics": 0,
            "Animal Handling": 0,
            "Arcana": 0,
            "Athletics": 0,
            "Deception": 0,
            "History": 0,
            "Insight": 0,
            "Intimidation": 0,
            "Investigation": 0,
            "Medicine": 0,
            "Nature": 0,
            "Perception": 0,
            "Performance": 0,
            "Persuasion": 0,
            "Religion": 0,
            "Sleight of Hand": 0,
            "Stealth": 0,
            "Survival": 0,
            "Artisan's Tool": 0,
            "Cartographer": 0,
            "Disguise Kit": 0,
            "Forgery Kit": 0,
            "Gaming Set": 0,
            "Healer's Kit": 0,
            "Herbalism Kit": 0,
            "Mus. Instrument": 0,
            "Navigator's Tools": 0,
            "Poisoner's Kit": 0,
            "Thieves' Tools": 0,
            "Vehicles": 0,
            "Weight": 0,
            "Encumberance Limit": 0,
            "Languages": ""
        }, {
            "Name": "Roscoe",
            "Speed": 30,
            "Armor Class": 0,
            "Initiative": 0,
            "Strength": 0,
            "Dexterity": 0,
            "Constitution": 0,
            "Intelligence": 0,
            "Wisdom": 0,
            "Charisma": 0,
            "Acrobatics": 0,
            "Animal Handling": 0,
            "Arcana": 0,
            "Athletics": 0,
            "Deception": 0,
            "History": 0,
            "Insight": 0,
            "Intimidation": 0,
            "Investigation": 0,
            "Medicine": 0,
            "Nature": 0,
            "Perception": 0,
            "Performance": 0,
            "Persuasion": 0,
            "Religion": 0,
            "Sleight of Hand": 0,
            "Stealth": 0,
            "Survival": 0,
            "Artisan's Tool": 0,
            "Cartographer": 0,
            "Disguise Kit": 0,
            "Forgery Kit": 0,
            "Gaming Set": 0,
            "Healer's Kit": 0,
            "Herbalism Kit": 0,
            "Mus. Instrument": 0,
            "Navigator's Tools": 0,
            "Poisoner's Kit": 0,
            "Thieves' Tools": 0,
            "Vehicles": 0,
            "Weight": 0,
            "Encumberance Limit": 0,
            "Languages": ""
        }, {
            "Name": "Viryl",
            "Speed": 30,
            "Armor Class": 0,
            "Initiative": 0,
            "Strength": 0,
            "Dexterity": 0,
            "Constitution": 0,
            "Intelligence": 0,
            "Wisdom": 0,
            "Charisma": 0,
            "Acrobatics": 0,
            "Animal Handling": 0,
            "Arcana": 0,
            "Athletics": 0,
            "Deception": 0,
            "History": 0,
            "Insight": 0,
            "Intimidation": 0,
            "Investigation": 0,
            "Medicine": 0,
            "Nature": 0,
            "Perception": 0,
            "Performance": 0,
            "Persuasion": 0,
            "Religion": 0,
            "Sleight of Hand": 0,
            "Stealth": 0,
            "Survival": 0,
            "Artisan's Tool": 0,
            "Cartographer": 0,
            "Disguise Kit": 0,
            "Forgery Kit": 0,
            "Gaming Set": 0,
            "Healer's Kit": 0,
            "Herbalism Kit": 0,
            "Mus. Instrument": 0,
            "Navigator's Tools": 0,
            "Poisoner's Kit": 0,
            "Thieves' Tools": 0,
            "Vehicles": 0,
            "Weight": 0,
            "Encumberance Limit": 0,
            "Languages": ""
        }
    ]
};

var calculateCharacter = function(name, character) {
    bs = getBaseSkills()[name];
    character["Armor Class"] = bs["Armor Class"];
    character["Strength"] = Math.floor((bs["Strength"] - 10) / 2) + 10;
    character["Dexterity"] = Math.floor((bs["Dexterity"] - 10) / 2) + 10;
    character["Constitution"] = Math.floor((bs["Constitution"] - 10) / 2) + 10;
    character["Intelligence"] = Math.floor((bs["Intelligence"] - 10) / 2) + 10;
    character["Wisdom"] = Math.floor((bs["Wisdom"] - 10) / 2) + 10;
    character["Charisma"] = Math.floor((bs["Charisma"] - 10) / 2) + 10;
    character["Initiative"] = character["Dexterity"] - 10;
    character["Acrobatics"] = character["Dexterity"] + (bs["Skill Proficiencies"].includes("Acrobatics") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Acrobatics") ? bs["Proficiency Bonus"] : 0);
    character["Animal Handling"] = character["Wisdom"] + (bs["Skill Proficiencies"].includes("Animal Handling") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Animal Handling") ? bs["Proficiency Bonus"] : 0);
    character["Arcana"] = character["Intelligence"] + (bs["Skill Proficiencies"].includes("Arcana") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Arcana") ? bs["Proficiency Bonus"] : 0);
    character["Athletics"] = character["Strength"] + (bs["Skill Proficiencies"].includes("Athletics") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Athletics") ? bs["Proficiency Bonus"] : 0);
    character["Deception"] = character["Charisma"] + (bs["Skill Proficiencies"].includes("Deception") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Deception") ? bs["Proficiency Bonus"] : 0);
    character["History"] = character["Intelligence"] + (bs["Skill Proficiencies"].includes("History") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("History") ? bs["Proficiency Bonus"] : 0);
    character["Insight"] = character["Wisdom"] + (bs["Skill Proficiencies"].includes("Insight") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Insight") ? bs["Proficiency Bonus"] : 0);
    character["Intimidation"] = character["Charisma"] + (bs["Skill Proficiencies"].includes("Intimidation") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Intimidation") ? bs["Proficiency Bonus"] : 0);
    character["Investigation"] = character["Intelligence"] + (bs["Skill Proficiencies"].includes("Investigation") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Investigation") ? bs["Proficiency Bonus"] : 0);
    character["Medicine"] = character["Wisdom"] + (bs["Skill Proficiencies"].includes("Medicine") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Medicine") ? bs["Proficiency Bonus"] : 0);
    character["Nature"] = character["Intelligence"] + (bs["Skill Proficiencies"].includes("Nature") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Nature") ? bs["Proficiency Bonus"] : 0);
    character["Perception"] = character["Wisdom"] + (bs["Skill Proficiencies"].includes("Perception") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Perception") ? bs["Proficiency Bonus"] : 0);
    character["Performance"] = character["Charisma"] + (bs["Skill Proficiencies"].includes("Performance") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Performance") ? bs["Proficiency Bonus"] : 0);
    character["Persuasion"] = character["Charisma"] + (bs["Skill Proficiencies"].includes("Persuasion") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Persuasion") ? bs["Proficiency Bonus"] : 0);
    character["Religion"] = character["Intelligence"] + (bs["Skill Proficiencies"].includes("Religion") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Religion") ? bs["Proficiency Bonus"] : 0);
    character["Sleight of Hand"] = character["Dexterity"] + (bs["Skill Proficiencies"].includes("Sleight of Hand") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Sleight of Hand") ? bs["Proficiency Bonus"] : 0);
    character["Stealth"] = character["Dexterity"] + (bs["Skill Proficiencies"].includes("Stealth") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Stealth") ? bs["Proficiency Bonus"] : 0);
    character["Survival"] = character["Wisdom"] + (bs["Skill Proficiencies"].includes("Survival") ? bs["Proficiency Bonus"] : 0) + (bs["Skill Expertises"].includes("Survival") ? bs["Proficiency Bonus"] : 0);
    character["Artisan's Tool"] = (bs["Tool Proficiencies"].includes("Artisan's Tool") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Artisan's Tool") ? bs["Proficiency Bonus"] : 0);
    if (character["Artisan's Tool"] != 0) {
        character["Artisan's Tool"] += 10;
    }
    character["Cartographer"] = (bs["Tool Proficiencies"].includes("Cartographer") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Cartographer") ? bs["Proficiency Bonus"] : 0);
    if (character["Cartographer"] != 0) {
        character["Cartographer"] += 10;
    }
    character["Disguise Kit"] = (bs["Tool Proficiencies"].includes("Disguise Kit") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Disguise Kit") ? bs["Proficiency Bonus"] : 0);
    if (character["Disguise Kit"] != 0) {
        character["Disguise Kit"] += 10;
    }
    character["Forgery Kit"] = (bs["Tool Proficiencies"].includes("Forgery Kit") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Forgery Kit") ? bs["Proficiency Bonus"] : 0);
    if (character["Forgery Kit"] != 0) {
        character["Forgery Kit"] += 10;
    }
    character["Gaming Set"] = (bs["Tool Proficiencies"].includes("Gaming Set") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Gaming Set") ? bs["Proficiency Bonus"] : 0);
    if (character["Gaming Set"] != 0) {
        character["Gaming Set"] += 10;
    }
    character["Healer's Kit"] = (bs["Tool Proficiencies"].includes("Healer's Kit") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Healer's Kit") ? bs["Proficiency Bonus"] : 0);
    if (character["Healer's Kit"] != 0) {
        character["Healer's Kit"] += 10;
    }
    character["Herbalism Kit"] = (bs["Tool Proficiencies"].includes("Herbalism Kit") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Herbalism Kit") ? bs["Proficiency Bonus"] : 0);
    if (character["Herbalism Kit"] != 0) {
        character["Herbalism Kit"] += 10;
    }
    character["Mus. Instrument"] = (bs["Tool Proficiencies"].includes("Mus. Instrument") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Mus. Instrument") ? bs["Proficiency Bonus"] : 0);
    if (character["Mus. Instrument"] != 0) {
        character["Mus. Instrument"] += 10;
    }
    character["Navigator's Tools"] = (bs["Tool Proficiencies"].includes("Navigator's Tools") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Navigator's Tools") ? bs["Proficiency Bonus"] : 0);
    if (character["Navigator's Tools"] != 0) {
        character["Navigator's Tools"] += 10;
    }
    character["Poisoner's Kit"] = (bs["Tool Proficiencies"].includes("Poisoner's Kit") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Poisoner's Kit") ? bs["Proficiency Bonus"] : 0);
    if (character["Poisoner's Kit"] != 0) {
        character["Poisoner's Kit"] += 10;
    }
    character["Thieves' Tools"] = (bs["Tool Proficiencies"].includes("Thieves' Tools") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes("Thieves' Tools") ? bs["Proficiency Bonus"] : 0);
    if (character["Thieves' Tools"] != 0) {
        character["Thieves' Tools"] += 10;
    }
    character["Vehicles"] = (bs["Tool Proficiencies"].includes("Vehicles") ? bs["Proficiency Bonus"] : 0) + (bs["Tool Expertises"].includes() ? bs["Proficiency Bonus"] : 0);
    if (character["Vehicles"] != 0) {
        character["Vehicles"] += 10;
    }
    character["Weight"] = bs["Weight"];
    character["Encumberance Limit"] = bs["Strength"] * 15 / (bs["Size"] == "Tiny" ? 2 : 1);
    character["Languages"] = bs["Languages"].join(", ");
};