var GetNPC = function(communityStatus, communityPrejudices, isRural=true) {
	var race = GetNPCRace();
	var background = GetNPCBackground(race, isRural);
	var name = GetNPCName(race, background.Gender);
	var cls = GetNPCClass(background, race);
	var personality = GetNPCPersonality(communityStatus, isRural);
	var disposition = GetNPCDisposition(race, cls, background, communityPrejudices);
	var description = "<p>"+ GetNPCDescription(background.Gender, background.AgeCategory, race) + "</p>"+ background.Description;
	var stats = GetNPCStats(race, cls, background, disposition.Religion);
	var languages = GetNPCLanguages(race, cls, background);
	var proficiencies = GetNPCProficiencies(race, cls, background);
	var NPC = {
		Name: name,
		Personality: personality,
		Race: race,
		Class: cls,
		Background: background,
		Disposition: disposition,
		Description: description,
		Stats: stats,
		Languages: languages,
		Proficiencies: proficiencies
	};
	return NPC;
};

var GetNPCRace = function() {
	var rand = Roll(1,100);
	var race;
	if (rand <= 23) {
		race = "Human";
	} else if (rand <= 35) {
		race = "Half-Elf";
	} else if (rand <= 47) {
		race = "Halfling";
	} else if (rand <= 59) {
		race = "Dwarf";
	} else if (rand <= 65) {
		race = "Tiefling";
	} else if (rand <= 71) {
		race = "Dragonborn";
	} else if (rand <= 77) {
		race = "Elf";
	} else if (rand <= 83) {
		race = "Half-Orc";
	} else if (rand <= 86) {
		race = "Gnome";
	} else if (rand <= 89) {
		race = "Lizardfolk";
	} else if (rand <= 92) {
		race = "Tabaxi";
	} else if (rand <= 95) {
		race = "Triton";
	} else if (rand <= 96) {
		race = "Kenku";
	} else if (rand <= 97) {
		race = "Aasimar";
	} else if (rand <= 98) {
		race = "Firbolg";
	} else if (rand <= 99) {
		race = "Gith";
	} else {
		race = "Goliath";
	}
	return GetRandomizedRace(race);
};

var GetNPCClass = function(background, race) {
	if (background.Occupation.Secondary == "Cleric") {
		return GetRandomizedClass("Cleric", race, background);
	} else if (background.Occupation.Secondary == "Adventurer") {
		cls = GetClass();
		while (!background.Alignment.startsWith('L') && cls.Name === 'Paladin') {
			cls = GetClass();
		}
		return GetRandomizedClass(cls, race, background);
	} else {
		return GetRandomizedClass("NPC", race, background);
	}
};

var GetRandomizedRace = function(raceName) {
	var subrace = "";
	var speed = 0;
	var features = [];
	var statModifiers = {
		Strength: 0,
		Dexterity: 0,
		Constitution: 0,
		Intelligence: 0,
		Wisdom: 0,
		Charisma: 0
	};
	var languages = [];
	var skillProficiencies = [];
	var toolProficiencies = [];
	var statExtras = 0;
	var numLanguages = 0;
	var naturalArmor = 10;
	var size = "Medium";
	switch (raceName) {
	case "Human":
		statModifiers.Strength += 1;
		statModifiers.Dexterity += 1;
		statModifiers.Constitution += 1;
		statModifiers.Intelligence += 1;
		statModifiers.Wisdom += 1;
		statModifiers.Charisma += 1;
		speed = 30;
		languages = ['Common'];
		numLanguages = 1;
		break;
	case "Half-Elf":
		statModifiers.Charisma += 2;
		statExtras += 2;
		speed = 30;
		features.push("Darkvision");
		features.push("Fey Ancestry");
		features.push("Excellent Timekeepers");
		skillProficiencies = [randomChoice(Object.keys(SkillMap))];
		sp = randomChoice(Object.keys(SkillMap));
		while (skillProficiencies.includes(sp)) {
			sp = randomChoice(Object.keys(SkillMap));
		}
		skillProficiencies.push(sp);
		languages = ['Common', 'Elvish'];
		numLanguages = 1;
		break;
	case "Halfling":
		statModifiers.Dexterity += 2;
		speed = 25;
		size = "Small";
		features.push("Lucky");
		features.push("Brave");
		features.push("Halfling Nimbleness");
		languages = ["Common", "Halfling"];
		if (Math.random() < 0.5) {
			subrace = "Lightfoot";
			statModifiers.Charisma += 1;
			features.push("Naturally Stealthy");
		} else {
			subrace = "Stout";
			statModifiers.Constitution += 1;
			features.push("Stout Resilience");
		}
		break;
	case "Dwarf":
		statModifiers.Constitution += 2;
		speed = 25;
		features.push("Darkvision");
		features.push("Dwarven Resilience");
		features.push("Dwarven Combat Training");
		toolProficiencies = [randomChoice(["Smith's Tools", "Brewer's Supplies", "Mason's Tools"])];
		features.push("Stonecunning");
		languages = ["Common", "Dwarvish"];
		rand = Roll(1, 20);
		if (rand <= 9) {
			subrace = "Mountain";
			statModifiers.Wisdom += 1;
			features.push("Dwarven Toughness");
		} else if (rand <= 18) {
			subrace = "Hill";
			statModifiers.Strength += 1;
			features.push("Dwarven Armor Training");
		} else {
			subrace = "Duergar";
			statModifiers.Strength += 1;
			features.push("Superior Darkvision");
			features.push("Duergar Resilience");
			features.push("Duergar Magic");
			features.push("Sunlight Sensitivity");
			languages.push("Undercommon");
		}
		break;
	case "Tiefling":
		statModifiers.Charisma += 2;
		statModifiers.Wisdom += 1;
		speed = 30;
		features.push("Darkvision");
		features.push("Hellish Resiliance");
		features.push("Infernal Legacy");
		languages = ["Common", "Infernal"];
		break;
	case "Dragonborn":
		statModifiers.Strength += 2;
		statModifiers.Charisma += 1;
		speed = 30;
		features.push("Breath Weapon");
		features.push("Damage Resistance");
		features.push("Draconic Ancestry");
		languages = ["Common", "Draconic"];
		break;
	case "Elf":
		statModifiers.Dexterity += 2;
		speed = 30;
		features.push("Darkvision");
		features.push("Keen Senses");
		features.push("Fey Ancestry");
		features.push("Trance");
		languages = ["Common", "Elvish"];
		rand = Roll(1, 20);
		if (rand <= 9) {
			subrace = "High";
			statModifiers.Intelligence += 1;
			features.push("Elf Weapon Training");
			features.push("Cantrip");
			numLanguages += 1;
		} else if (rand <= 18) {
			subrace = "Wood";
			statModifiers.Wisdom += 1;
			features.push("Elf Weapon Training");
			features.push("Fleet of Foot");
			features.push("Mask of the Wild");
		} else {
			subrace = "Drow";
			statModifiers.Charisma += 1;
			features.push("Superior Darkvision");
			features.push("Drow Magic");
			features.push("Sunlight Sensitivity");
			features.push("Drow Weapon Training");
		}
		break;
	case "Half-Orc":
		statModifiers.Strength += 2;
		statModifiers.Constitution += 1;
		speed = 30;
		features.push("Darkvision");
		features.push("Menacing");
		features.push("Relentless Endurance");
		features.push("Savage Attacks");
		features.push("Grudging Acceptance");
		languages = ["Common", "Orc"];
		break;
	case "Gnome":
		statModifiers.Intelligence += 2;
		speed = 25;
		size = "Small";
		features.push("Darkvision");
		features.push("Gnome Cunning");
		languages = ["Common", "Gnomish"];
		rand = Roll(1, 20);
		if (rand <= 9) {
			subrace = "Forest";
			statModifiers.Dexterity += 1;
			features.push("Natural Illusionist");
			features.push("Speak with Small Beasts");
		} else if (rand <= 18) {
			subrace = "Rock";
			statModifiers.Constitution += 1;
			features.push("Artificer's Lore");
			features.push("Tinker");
		} else {
			subrace = "Svirfneblin";
			statModifiers.Dexterity += 1;
			features.push("Superior Darkvision");
			features.push("Stone Camouflage");
			languages.push("Undercommon");
		}
		break;
	case "Lizardfolk":
		statModifiers.Constitution += 2;
		statModifiers.Wisdom += 1;
		speed = 30;
		features.push("Swim");
		features.push("Bite");
		features.push("Cunning Artisan");
		features.push("Hold Breath");
		features.push("Hungry Jaws");
		features.push("Bite");
		naturalArmor = 13;
		languages = ["Common", "Draconic"];
		skillChoices = ["Animal Handling", "Nature", "Perception", "Stealth", "Survival"];
		skillProficiencies.push(randomChoice(skillChoices));
		sp = randomChoice(skillChoices);
		while (skillProficiencies.includes(sp)) {
			sp = randomChoice(skillChoices);
		}
		skillProficiencies.push(sp);
		break;
	case "Tabaxi":
		statModifiers.Dexterity += 2;
		statModifiers.Charisma += 1;
		speed = 30;
		features.push("Darkvision");
		features.push("Feline Agility");
		features.push("Cat's Claws");
		Languages = ["Common"];
		numLanguages += 1;
		skillProficiencies.push("Perception");
		skillProficiencies.push("Stealth");
		break;
	case "Triton":
		statModifiers.Strength += 1;
		statModifiers.Constitution += 1;
		statModifiers.Charisma += 1;
		speed = 30;
		features.push("Swim");
		features.push("Amphibious");
		features.push("Control Air and Water");
		features.push("Emissary of the Sea");
		features.push("Guardians of the Depth");
		languages = ["Common", "Primordial"];
		break;
	case "Kenku":
		statModifiers.Dexterity += 2;
		statModifiers.Wisdom += 1;
		speed = 30;
		features.push("Expert Forgery");
		features.push("Mimicry");
		languages = ["Common", "Auran"];
		skillChoices = ["Acrobatics", "Deception", "Stealth", "Sleight of Hand"];
		skillProficiencies.push(randomChoice(skillChoices));
		sp = randomChoice(skillChoices);
		while (skillProficiencies.includes(sp)) {
			sp = randomChoice(skillChoices);
		}
		skillProficiencies.push(sp);
		break;
	case "Aasimar":
		statModifiers.Charisma += 2;
		speed = 30;
		features.push("Darkvision");
		features.push("Celestial Resistance");
		features.push("Healing Hands");
		features.push("Light Bearer");
		languages = ["Common", "Celestial"];
		rand = Roll(1,20);
		if (rand <= 9) {
			subrace = "Protector";
			statModifiers.Wisdom += 1;
			features.push("Radiant Soul");
		} else if (rand <= 18) {
			subrace = "Scource";
			statModifiers.Constitution += 1;
			features.push("Radiant Consumption");
		} else {
			subrace = "Fallen";
			statModifiers.Strength += 1;
			features.push("Necrotic Shroud");
		}
		break;
	case "Firbolg":
		statModifiers.Wisdom += 2;
		statModifiers.Strength += 1;
		speed = 30;
		features.push("Firbolg Magic");
		features.push("Hidden Step");
		features.push("Powerful Build");
		features.push("Speech of Beast and Leaf");
		languages = ["Common", "Elvish", "Giant"];
		break;
	case "Gith":
		statModifiers.Intelligence += 1;
		speed = 30;
		languages = ["Common", "Gith"];
		rand = Roll(1,20);
		if (rand <= 10) {
			subrace = "Githyanki";
			statModifiers.Strength += 2;
			features.push("Decadent Mastery");
			features.push("Martial Prodigy");
			features.push("Githyanki Psionics");
		} else {
			subrace = "Githzerai";
			statModifiers.Wisdom += 2;
			features.push("Mental Discipline");
			features.push("Githzerai Psionics");
		}
		break;
	case "Goliath":
		statModifiers.Strength += 2;
		statModifiers.Constitution += 1;
		speed = 30;
		features.push("Natural Athlete");
		features.push("Stone's Endurance");
		features.push("Powerful Build");
		features.push("Mountain Born");
		languages = ["Common", "Giant"];
		break;
	}
	return {
		Name: raceName,
		Subrace: subrace,
		Speed: speed,
		Features: features,
		StatModifiers: statModifiers,
		StatExtras: statExtras,
		Languages: languages,
		NumLanguages: numLanguages,
		SkillProficiencies: skillProficiencies,
		ToolProficiencies: toolProficiencies,
		NaturalArmor: naturalArmor,
		Size: size
	};
};

var RaceNames = {
	"Human":{
		"Male": ["Aseir", "Bardeid", "Haseid", "Khemed", "Mehmen", "Sudeiman", "Zasheir", "Darvin", "Dorn", "Evendur", "Gorstag", "Grim", "Helm", "Malark", "Morn", "Randal", "Stedd", "Bor", "Fodel", "Glar", "Grigor", "Igan", "Ivor", "Kosef", "Mival", "Orel", "Pavel", "Sergor", "Ander", "Blath", "Bran", "Frath", "Geth", "Lander", "Luth", "Malcer", "Stor", "Taman", "Urth", "Aoth", "Bareris", "Ehput-Ki", "Kethoth", "Mumed", "Ramas", "So-Kehur", "Thazar-De", "Urhur", "Borivik", "Faurgar", "Jandar", "Kanithar", "Madislak", "Ralmevik", "Shaumar", "Vladislak", "An", "Chen", "Chi", "Fai", "Jiang", "Jun", "Lian", "Long", "Meng", "On", "Shan", "Shui", "Wen", "Anton", "Diero", "Marcon", "Pieron", "Rimardo", "Romero", "Salazar", "Umbero"],
		"Female": ["Atala", "Ceidil", "Hama", "Jasmal", "Meilil", "Seipora", "Yasheira", "Zasheida", "Arveene", "Esvele", "Jhessail", "Kerri", "Lureene", "Miri", "Rowan", "Shandri", "Tessele", "Alethra", "Kara", "Katernin", "Mara", "Natali", "Olma", "Tana", "Zora", "Amafrey", "Betha", "Cefrey", "Kethra", "Mara", "Olga", "Silifrey", "Westra", "Arizima", "Chathi", "Nephis", "Nulara", "Murithi", "Sefris", "Thola", "Umara", "Zolis", "Fyevarra", "Hulmarra", "Immith", "Imzel", "Navarra", "Shevarra", "Tammith", "Yuldra", "Bai", "Chao", "Jia", "Lei", "Mei", "Qiao", "Shui", "Tai", "Balama", "Dona", "Faila", "Jalana", "Luisa", "Marta", "Quara", "Selise", "Vonda"]
	},
	"Half-Elf":{
		"Male": ["Adran", "Aelar", "Aramil", "Arannis", "Aust", "Beiro", "Berrian", "Carric", "Enialis", "Erdan", "Erevan", "Galinndan", "Hadarai", "Heian", "Himo", "Immeral", "Ivellios", "Laucian", "Mindartis", "Paelias", "Peren", "Quarion", "Riardon", "Rolen", "Soveliss", "Thamior", "Tharivol", "Theren", "Varis", "Aseir", "Bardeid", "Haseid", "Khemed", "Mehmen", "Sudeiman", "Zasheir", "Darvin", "Dorn", "Evendur", "Gorstag", "Grim", "Helm", "Malark", "Morn", "Randal", "Stedd", "Bor", "Fodel", "Glar", "Grigor", "Igan", "Ivor", "Kosef", "Mival", "Orel", "Pavel", "Sergor", "Ander", "Blath", "Bran", "Frath", "Geth", "Lander", "Luth", "Malcer", "Stor", "Taman", "Urth", "Aoth", "Bareris", "Ehput-Ki", "Kethoth", "Mumed", "Ramas", "So-Kehur", "Thazar-De", "Urhur", "Borivik", "Faurgar", "Jandar", "Kanithar", "Madislak", "Ralmevik", "Shaumar", "Vladislak", "An", "Chen", "Chi", "Fai", "Jiang", "Jun", "Lian", "Long", "Meng", "On", "Shan", "Shui", "Wen", "Anton", "Diero", "Marcon", "Pieron", "Rimardo", "Romero", "Salazar", "Umbero"],
		"Female": ["Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua", "Bethrynna", "Birel", "Caelynn", "Drusilia", "Enna", "Felosial", "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna", "Quillathe", "Sariel", "Shanairra", "Shava", "Silaqui", "Theirastra", "Thia", "Vadania", "Valanthe", "Xanaphia" ,"Atala", "Ceidil", "Hama", "Jasmal", "Meilil", "Seipora", "Yasheira", "Zasheida", "Arveene", "Esvele", "Jhessail", "Kerri", "Lureene", "Miri", "Rowan", "Shandri", "Tessele", "Alethra", "Kara", "Katernin", "Mara", "Natali", "Olma", "Tana", "Zora", "Amafrey", "Betha", "Cefrey", "Kethra", "Mara", "Olga", "Silifrey", "Westra", "Arizima", "Chathi", "Nephis", "Nulara", "Murithi", "Sefris", "Thola", "Umara", "Zolis", "Fyevarra", "Hulmarra", "Immith", "Imzel", "Navarra", "Shevarra", "Tammith", "Yuldra", "Bai", "Chao", "Jia", "Lei", "Mei", "Qiao", "Shui", "Tai", "Balama", "Dona", "Faila", "Jalana", "Luisa", "Marta", "Quara", "Selise", "Vonda"]
	},
	"Halfling":{
		"Male": ["Alton", "Ander", "Cade", "Corrin", "Eldon", "Errich", "Finnan", "Garret", "Lindal", "Lyle", "Merric", "Milo", "Osborn", "Perrin", "Reed", "Roscoe", "Wellby"],
		"Female": ["Andry", "Bree", "Callie", "Cora", "Euphemia", "Jillian", "Kithri", "Lavinia", "Lidda", "Merla", "Nedda", "Paela", "Portia", "Seraphina", "Shaena", "Trym", "Vani", "Verna"]
	},
	"Dwarf":{
		"Male": ["Adrik", "Alberich", "Baern", "Barendd", "Brottor", "Bruenor", "Dain", "Darrak", "Delg", "Eberk", "Einkil", "Fargrim", "Flint", "Gardain", "Harbek", "Kildrak", "Morgran", "Orsik", "Oskar", "Rangrim", "Rurik", "Taklinn", "Thoradin", "Thorin", "Tordek", "Traubon", "Travok", "Ulfgar", "Veit", "Vondal"],
		"Female": ["Amber", "Artin", "Audhild", "Bardryn", "Dagnal", "Diesa", "Eldeth", "Falkrunn", "Finellen", "Gunnloda", "Gurdis", "Helja", "Hlin", "Kathra", "Kristryd", "Ilde", "Liftrasa", "Mardred", "Riswynn", "Sannl", "Torbera", "Torgga", "Vistra"]
	},
	"Tiefling":{
		"Male": ["Akmenos", "Amnon", "Barakas", "Damakos", "Ekemon", "Iados", "Kairon", "Leucis", "Melech", "Mordai", "Morthos", "Pelaios", "Skamos", "Therai"],
		"Female": ["Akta", "Anakis", "Bryseis", "Criella", "Damaia", "Ea", "Kallista", "Lerissa", "Makaria", "Nemeia", "Orianna", "Phelaia", "Rieta"]
	},
	"Dragonborn":{
		"Male": ["Arjhan", "Balasar", "Bharash", "Donaar", "Ghesh", "Heskan", "Kriv", "Medrash", "Mehen", "Nadarr", "Pandjed", "Patrin", "Rhogar", "Shamash", "Shedinn", "Tarhun", "Torinn"],
		"Female": ["Akra", "Biri", "Daar", "Farideh", "Harann", "Havilar", "Jheri", "Kava", "Korinn", "Mishann", "Nala", "Perra", "Raiann", "Sora", "Surina", "Thava", "Uadjit"]
	},
	"Elf":{
		"Male": ["Adran", "Aelar", "Aramil", "Arannis", "Aust", "Beiro", "Berrian", "Carric", "Enialis", "Erdan", "Erevan", "Galinndan", "Hadarai", "Heian", "Himo", "Immeral", "Ivellios", "Laucian", "Mindartis", "Paelias", "Peren", "Quarion", "Riardon", "Rolen", "Soveliss", "Thamior", "Tharivol", "Theren", "Varis"],
		"Female": ["Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua", "Bethrynna", "Birel", "Caelynn", "Drusilia", "Enna", "Felosial", "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna", "Quillathe", "Sariel", "Shanairra", "Shava", "Silaqui", "Theirastra", "Thia", "Vadania", "Valanthe", "Xanaphia"]
	},
	"Half-Orc":{
		"Male": ["Dench", "Feng", "Gell", "Henk", "Holg", "Imsh", "Keth", "Krusk", "Mhurren", "Ront", "Shump", "Thokk"],
		"Female": ["Baggi", "Emen", "Engong", "Kansif", "Myev", "Neega", "Ovak", "Ownka", "Shautha", "Sutha", "Vola", "Volen", "Yevelda"]
	},
	"Gnome":{
		"Male": ["Alston", "Alvyn", "Boddynock", "Brocc", "Burgell", "Dimble", "Eldon", "Erky", "Fonkin", "Frug", "Gerbo", "Gimble", "Glim", "Jebeddo", "Kellen", "Namfoodle", "Orryn", "Roondar", "Seebo", "Sindri", "Warryn", "Wrenn", "Zook"],
		"Female": ["Bimpnottin", "Breena", "Caramip", "Carlin", "Donella", "Duvamil", "Ella", "Ellyjobell", "Ellywick", "Lilli", "Loopmottin", "Lorilla", "Mardnab", "Nissa", "Nyx", "Oda", "Orla", "Roywyn", "Shamil", "Tana", "Waywocket", "Zanna"]
	},
	"Lizardfolk":{
		"Male": ["Achuak", "Aryte", "Baeshra", "Darastrix", "Garurt", "Irhtos", "Jhank", "Kepesk", "Kethend", "Korth", "Kosj", "Kothar", "Litrix", "Mirik", "Othokent", "Sauriv", "Throden", "Thurkear", "Usk", "Valignat", "Vargach", "Verthica", "Vutha", "Vyth"],
		"Female": ["Achuak", "Aryte", "Baeshra", "Darastrix", "Garurt", "Irhtos", "Jhank", "Kepesk", "Kethend", "Korth", "Kosj", "Kothar", "Litrix", "Mirik", "Othokent", "Sauriv", "Throden", "Thurkear", "Usk", "Valignat", "Vargach", "Verthica", "Vutha", "Vyth"]
	},
	"Tabaxi":{
		"Male": ["Cloud", "Timber", "Jade", "Bird", "Thunder", "Snake", "Smoke"],
		"Female": ["Cloud", "Timber", "Jade", "Bird", "Thunder", "Snake", "Smoke"]
	},
	"Triton":{
		"Male": ["Corus", "Delnis", "Jhimas", "Keros", "Molos", "Nalos", "Vodos", "Zunis"],
		"Female": ["Aryn", "Belthyn", "Duthyn", "Feloren", "Otanyn", "Shalryn", "Vlaryn", "Wolyn"]
	},
	"Kenku":{
		"Male": ["Boiler", "Clawer", "Knocker", "Hammer", "Hooter", "Horse Neigh", "Parrot Call", "Hatchet Split", "Hide Smack", "Kettle Bubble", "Mauler", "Biter", "Cobbler", "Singer", "Horse Snort", "Seal Flop", "Beaver Chew", "Crate Creak", "Hatchet Cut", "Hide Flick", "Lasher", "Slammer", "Roaster", "Giraffe Smash", "Parrot Squawk", "Bear Stomp", "Furnace Door", "Chisel Cut"],
		"Female": ["Boiler", "Clawer", "Knocker", "Hammer", "Hooter", "Horse Neigh", "Parrot Call", "Hatchet Split", "Hide Smack", "Kettle Bubble", "Mauler", "Biter", "Cobbler", "Singer", "Horse Snort", "Seal Flop", "Beaver Chew", "Crate Creak", "Hatchet Cut", "Hide Flick", "Lasher", "Slammer", "Roaster", "Giraffe Smash", "Parrot Squawk", "Bear Stomp", "Furnace Door", "Chisel Cut"]
	},
	"Aasimar":{
		"Male": ["Aseir", "Bardeid", "Haseid", "Khemed", "Mehmen", "Sudeiman", "Zasheir", "Darvin", "Dorn", "Evendur", "Gorstag", "Grim", "Helm", "Malark", "Morn", "Randal", "Stedd", "Bor", "Fodel", "Glar", "Grigor", "Igan", "Ivor", "Kosef", "Mival", "Orel", "Pavel", "Sergor", "Ander", "Blath", "Bran", "Frath", "Geth", "Lander", "Luth", "Malcer", "Stor", "Taman", "Urth", "Aoth", "Bareris", "Ehput-Ki", "Kethoth", "Mumed", "Ramas", "So-Kehur", "Thazar-De", "Urhur", "Borivik", "Faurgar", "Jandar", "Kanithar", "Madislak", "Ralmevik", "Shaumar", "Vladislak", "An", "Chen", "Chi", "Fai", "Jiang", "Jun", "Lian", "Long", "Meng", "On", "Shan", "Shui", "Wen", "Anton", "Diero", "Marcon", "Pieron", "Rimardo", "Romero", "Salazar", "Umbero"],
		"Female": ["Atala", "Ceidil", "Hama", "Jasmal", "Meilil", "Seipora", "Yasheira", "Zasheida", "Arveene", "Esvele", "Jhessail", "Kerri", "Lureene", "Miri", "Rowan", "Shandri", "Tessele", "Alethra", "Kara", "Katernin", "Mara", "Natali", "Olma", "Tana", "Zora", "Amafrey", "Betha", "Cefrey", "Kethra", "Mara", "Olga", "Silifrey", "Westra", "Arizima", "Chathi", "Nephis", "Nulara", "Murithi", "Sefris", "Thola", "Umara", "Zolis", "Fyevarra", "Hulmarra", "Immith", "Imzel", "Navarra", "Shevarra", "Tammith", "Yuldra", "Bai", "Chao", "Jia", "Lei", "Mei", "Qiao", "Shui", "Tai", "Balama", "Dona", "Faila", "Jalana", "Luisa", "Marta", "Quara", "Selise", "Vonda"]
	},
	"Firbolg":{
		"Male": ["Adran", "Aelar", "Aramil", "Arannis", "Aust", "Beiro", "Berrian", "Carric", "Enialis", "Erdan", "Erevan", "Galinndan", "Hadarai", "Heian", "Himo", "Immeral", "Ivellios", "Laucian", "Mindartis", "Paelias", "Peren", "Quarion", "Riardon", "Rolen", "Soveliss", "Thamior", "Tharivol", "Theren", "Varis"],
		"Female": ["Adrie", "Althaea", "Anastrianna", "Andraste", "Antinua", "Bethrynna", "Birel", "Caelynn", "Drusilia", "Enna", "Felosial", "Ielenia", "Jelenneth", "Keyleth", "Leshanna", "Lia", "Meriele", "Mialee", "Naivara", "Quelenna", "Quillathe", "Sariel", "Shanairra", "Shava", "Silaqui", "Theirastra", "Thia", "Vadania", "Valanthe", "Xanaphia"]
	},
	"Gith":{
		"Male": ["Amak", "Arja'rok", "Dak'kon", "Djakh", "Djelekh", "D'keth", "Fri'hi", "Hailcii'n", "Hifek", "Karan", "Karath", "Kars'ten", "Keluk", "Menyar-Ag-Gith", "M'narr", "Parakk", "Ra'as", "Retholien", "Rivek", "Rrek", "Rr'ka", "Selqant", "Toryg", "Try'ig'or", "Vilquar", "Zerchai", "Zerthimon"],
		"Female": ["Ach'ali", "Devorxa", "Elezpah", "Harana'ii", "Ji'li'kai", "K'atzn'ii", "Kii'na", "Lar'il", "Moraan", "Rashka – Protector of Nath'kt'lan", "Ro'jhi", "T'cha", "Treena", "T'shaa", "Torpel'lin"]
	},
	"Goliath":{
		"Male": ["Aukan", "Eglath", "Gae-Al", "Gauthak", "Ilikan", "Keothi", "Kuori", "Lo-Kag", "Manneo", "Maveith", "Nalla", "Orilo", "Paavu", "Pethani", "Thalai", "Thotham", "Uthal", "Vaunea", "Vimak"],
		"Female": ["Aukan", "Eglath", "Gae-Al", "Gauthak", "Ilikan", "Keothi", "Kuori", "Lo-Kag", "Manneo", "Maveith", "Nalla", "Orilo", "Paavu", "Pethani", "Thalai", "Thotham", "Uthal", "Vaunea", "Vimak"]
	}
};

var GetNPCName = function(race, gender) {
	var name = randomChoice(RaceNames[race.Name][gender]);
	return name;
};

var MusicalInstruments = [
	"Bagpipes",
	"Drum",
	"Dulcimer",
	"Flute",
	"Lute",
	"Lyre",
	"Horn",
	"Pan",
	"Shawm",
	"Viol"
];

var ArtisanTools = [
	"Alchemist's supplies",
	"Brewer's supplies",
	"Calligrapher's supplies",
	"Carpenter's tools",
	"Cartographer's Tools",
	"Cobbler's tools",
	"Cook's utensils",
	"Glassblower's tools",
	"Jeweler's tools",
	"Leatherworker's tools",
	"Mason's Tools",
	"Painter's supplies",
	"Potter's tools",
	"Smith's Tools",
	"Tinker's Tools",
	"Weaver's tools",
	"Woodcarver's tools"
];

var GetRandomizedClass = function(className, race, background) {
	var level = Math.min(Math.floor(new Random().exponential(0.5) + 1), 20);
	var hitDice = 8;
	var statWeights = {
		Strength: 0,
		Dexterity: 0,
		Constitution: 0,
		Intelligence: 0,
		Wisdom: 0,
		Charisma: 0
	};
	var statExtras = 0;
	var languages = [];
	var skillProficiencies = [];
	var toolProficiencies = [];
	var savingThrowProficiencies = [];
	var features = [];
	switch (className) {
		case "Barbarian":
			skillChoices = ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 12;
			savingThrowProficiencies = ['Strength', 'Constitution'];
			toolProficiencies = [];
			statWeights = {
				Strength: 2,
				Dexterity: 0,
				Constitution: 1,
				Intelligence: -2,
				Wisdom: 0,
				Charisma: 0
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Bard":
			skillProficiencies.push(randomChoice(Object.keys(SkillMap)));
			sp = randomChoice(Object.keys(SkillMap));
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(Object.keys(SkillMap));
			}
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(Object.keys(SkillMap));
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(Object.keys(SkillMap));
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 8;
			savingThrowProficiencies = ['Dexterity', 'Charisma'];
			toolProficiencies = [];
			tp = chooseRandom(MusicalInstruments);
			while (toolProficiencies.length < 3) {
				if (!toolProficiencies.includes(tp)) {
					toolProficiencies.push(tp);
				}
				tp = chooseRandom(MusicalInstruments);
			}
			statWeights = {
				Strength: -2,
				Dexterity: 1,
				Constitution: 1,
				Intelligence: 0,
				Wisdom: 0,
				Charisma: 2
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Cleric":
			skillChoices = ["History", "Insight", "Medicine", "Persuasion", "Religion"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 8;
			savingThrowProficiencies = ['Wisdom', 'Charisma'];
			toolProficiencies = [];
			statWeights = {
				Strength: 0,
				Dexterity: 0,
				Constitution: 1,
				Intelligence: -1,
				Wisdom: 2,
				Charisma: 0
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Druid":
			skillChoices = ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 8;
			savingThrowProficiencies = ['Intelligence', 'Wisdom'];
			toolProficiencies = ['Herbalism Kit'];
			statWeights = {
				Strength: -2,
				Dexterity: 1,
				Constitution: 1,
				Intelligence: 0,
				Wisdom: 2,
				Charisma: -2
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			languages.push("Druidic");
			break;
		case "Fighter":
			skillChoices = ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 10;
			savingThrowProficiencies = ['Strength', 'Constitution'];
			toolProficiencies = [];
			var strBased = Math.random() < 0.5 ? true : false;
			statWeights = {
				Strength: strBased ? 2 : -2,
				Dexterity: strBased ? -2 : 2,
				Constitution: 1,
				Intelligence: 0,
				Wisdom: 0,
				Charisma: -1
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 6) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 14) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Monk":
			skillChoices = ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 8;
			savingThrowProficiencies = ['Strength', 'Dexterity'];
			toolProficiencies = [];
			if (Math.random() < 0.33) {
				toolProficiencies.push(randomChoice(MusicalInstruments));
			} else {
				toolProficiencies.push(randomChoice(ArtisanTools));
			}
			statWeights = {
				Strength: -1,
				Dexterity: 2,
				Constitution: 1,
				Intelligence: -2,
				Wisdom: 1,
				Charisma: -2
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Paladin":
			skillChoices = ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 10;
			savingThrowProficiencies = ['Wisdom', 'Charisma'];
			toolProficiencies = [];
			strBased = Math.random() < 0.5 ? true : false;
			statWeights = {
				Strength: strBased ? 2 : -2,
				Dexterity: strBased ? -1 : 2,
				Constitution: 1,
				Intelligence: -2,
				Wisdom: -2,
				Charisma: 2
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Ranger":
			skillChoices = ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth⁠", "Survival"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 10;
			savingThrowProficiencies = ['Strength', 'Dexterity'];
			toolProficiencies = [];
			statWeights = {
				Strength: -2,
				Dexterity: 2,
				Constitution: 1,
				Intelligence: 0,
				Wisdom: 1,
				Charisma: -2
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Rogue":
			skillChoices = ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth⁠"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 8;
			savingThrowProficiencies = ['Dexterity', 'Intelligence'];
			toolProficiencies = ["Thieves' Tools"];
			var trickster = Math.random() < 0.33 ? true : false;
			statWeights = {
				Strength: -2,
				Dexterity: 2,
				Constitution: 1,
				Intelligence: trickster ? 1 : 0,
				Wisdom: 0,
				Charisma: 1
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 10) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Sorcerer":
			skillChoices = ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 6;
			savingThrowProficiencies = ['Constitution', 'Charisma'];
			toolProficiencies = [];
			statWeights = {
				Strength: -2,
				Dexterity: 1,
				Constitution: 1,
				Intelligence: 0,
				Wisdom: 0,
				Charisma: 2
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Warlock":
			skillChoices = ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			skillProficiencies.push(randomChoice(skillChoices));
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(sp);
			hitDice = 8;
			savingThrowProficiencies = ['Wisdom', 'Charisma'];
			toolProficiencies = [];
			statWeights = {
				Strength: -2,
				Dexterity: 1,
				Constitution: 1,
				Intelligence: 0,
				Wisdom: -1,
				Charisma: 2
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "Wizard":
			skillChoices = ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"];
			skillProficiencies.push(randomChoice(skillChoices));
			sp = randomChoice(skillChoices);
			while (skillProficiencies.includes(sp)) {
				sp = randomChoice(skillChoices);
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[0])) {
				background.Occupation.SkillProficiencies[0] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[0]));
			}
			if (skillProficiencies.includes(background.Occupation.SkillProficiencies[1])) {
				background.Occupation.SkillProficiencies[1] = randomChoice(background.Occupation.ExtraChoices);
				background.Occupation.ExtraChoices.splice(background.Occupation.ExtraChoices.indexOf(background.Occupation.SkillProficiencies[1]));
			}
			skillProficiencies.push(randomChoice(skillChoices));
			skillProficiencies.push(sp);
			hitDice = 6;
			savingThrowProficiencies = [];
			toolProficiencies = ['Intelligence', 'Wisdom'];
			statWeights = {
				Strength: -2,
				Dexterity: 1,
				Constitution: 1,
				Intelligence: 2,
				Wisdom: 0,
				Charisma: -2
			};
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}
			break;
		case "NPC":
			skillProficiencies = background.Occupation.ExtraChoices;
			while (skillProficiencies.length < 2) {
				sp = randomChoice(Object.keys(SkillMap));
				if (!skillProficiencies.includes(sp)) {
					skillProficiencies.push(sp);
				}
			}
			hitDice = race.Size === "Medium"? 8 : 6;
			savingThrowProficiencies = [];
			sp = randomChoice(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']);
			while (savingThrowProficiencies.length < 2) {
				if (!savingThrowProficiencies.includes(sp)) {
					savingThrowProficiencies.push(sp);
				}
				sp = randomChoice(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']);
			}
			toolProficiencies = [];
			if (level >= 4) {
				statExtras += 2;
			}
			if (level >= 8) {
				statExtras += 2;
			}
			if (level >= 12) {
				statExtras += 2;
			}
			if (level >= 16) {
				statExtras += 2;
			}
			if (level >= 19) {
				statExtras += 2;
			}

			break;
	}
	return {
		Name: className,
		Level: level,
		HitDice: hitDice,
		StatWeights: statWeights,
		StatExtras: statExtras,
		Languages: languages,
		SkillProficiencies: skillProficiencies,
		ToolProficiencies: toolProficiencies,
		SavingThrowProficiencies: savingThrowProficiencies,
		Features: features
	};
};

var GetNPCBackground = function(race, isRural) {
	var alignment = GetAlignment(race);
	var occupation = GetOccupation(isRural);
	var gender = GetGender();
	var parents = GetParents(race, gender);
	var birthplace = GetBirthplace(gender);
	var a = GetAge(race);
	var age = a[0];
	var ageCategory = a[1];
	var siblings = GetSiblings(race, age, gender);
	var childhood = GetChildhood(parents, gender);
	var sexuality = GetSexuality(race);
	var romance = GetRomance(ageCategory, sexuality);
	var kids = GetKids(ageCategory, romance, sexuality, race);

	var description = "<p>"+ birthplace + " "+ parents + " "+ childhood + "</p><p>"+ siblings.Description + "</p>";

	return {
		Alignment: alignment,
		Occupation: occupation,
		Parents: parents,
		Birthplace: birthplace,
		Siblings: siblings,
		Childhood: childhood,
		Age: age,
		AgeCategory: ageCategory,
		Gender: gender,
		Sexuality: sexuality,
		Romance: romance,
		Kids: kids,
		Description: description
	};
};

var GetAlignment = function(race) {
	// rand = Roll(3,6);
	// if (rand <= 3) {
	// 	if (Math.random() < 0.5) {
	// 		return "CE";
	// 	} else {
	// 		return "CN";
	// 	}
	// } else if (rand <= 5) {
	// 	return "LE";
	// } else if (rand <= 8) {
	// 	return "NE";
	// } else if (rand <= 12) {
	// 	return "NN";
	// } else if (rand <= 15) {
	// 	return "NG";
	// } else if (rand <= 17) {
	// 	if (Math.random() < 0.5) {
	// 		return "LG";
	// 	} else {
	// 		return "LN";
	// 	}
	// } else {
	// 	if (Math.random() < 0.5) {
	// 		return "CG";
	// 	} else {
	// 		return "CN";
	// 	}
	// }
	var rand = Roll(1,20);
	switch (race.Name) {
	case 'Aasimar':
		switch (race.Subrace) {
		case 'Protector':
		case 'Scource':
			if (rand <= 2) {
				return 'LN';
			} else if (rand <= 4) {
				return 'NN';
			} else if (rand <= 5) {
				return 'CN';
			} else if (rand <= 10) {
				return 'LG';
			} else if (rand <= 15) {
				return 'NG';
			} else {
				return 'CG';
			}
			/* falls through */
		case 'Fallen':
			if (rand <= 4) {
				return 'LN';
			} else if (rand <= 8) {
				return 'NN';
			} else if (rand <= 13) {
				return 'CN';
			} else if (rand <= 15) {
				return 'LE';
			} else if (rand <= 17) {
				return 'NE';
			} else {
				return 'CE';
			}
		}
		/* falls through */
	case 'Dragonborn':
		if (rand <= 3) {
			return 'LG';
		} else if (rand <= 7) {
			return 'NG';
		} else if (rand <= 10) {
			return 'CG';
		} else if (rand <= 11) {
			return 'LN';
		} else if (rand <= 12) {
			return 'NN';
		} else if (rand <= 13) {
			return 'CN';
		} else if (rand <= 15) {
			return 'LE';
		} else if (rand <= 18) {
			return 'NE';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Dwarf':
		if (rand <= 5) {
			return 'LG';
		} else if (rand <= 8) {
			return 'NG';
		} else if (rand <= 10) {
			return 'CG';
		} else if (rand <= 13) {
			return 'LN';
		} else if (rand <= 15) {
			return 'NN';
		} else if (rand <= 16) {
			return 'CN';
		} else if (rand <= 18) {
			return 'LE';
		} else if (rand <= 19) {
			return 'NE';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Elf':
		switch (race.Subrace) {
		case 'Drow':
			if (rand <= 1) {
				return 'CG';
			} else if (rand <= 2) {
				return 'LN';
			} else if (rand <= 4) {
				return 'NN';
			} else if (rand <= 7) {
				return 'CN';
			} else if (rand <= 9) {
				return 'LE';
			} else if (rand <= 13) {
				return 'NE';
			} else {
				return 'CE';
			}
			/* falls through */
		default:
			if (rand <= 2) {
				return 'LG';
			} else if (rand <= 5) {
				return 'NG';
			} else if (rand <= 10) {
				return 'CG';
			} else if (rand <= 11) {
				return 'LN';
			} else if (rand <= 13) {
				return 'NN';
			} else if (rand <= 16) {
				return 'CN';
			} else if (rand <= 17) {
				return 'LE';
			} else if (rand <= 18) {
				return 'NE';
			} else {
				return 'CE';
			}
		}
		/* falls through */
	case 'Firbolg':
		if (rand <= 4) {
			return 'LG';
		} else if (rand <= 11) {
			return 'NG';
		} else if (rand <= 15) {
			return 'CG';
		} else if (rand <= 16) {
			return 'LN';
		} else if (rand <= 18) {
			return 'NN';
		} else if (rand <= 19) {
			return 'CN';
		} else {
			return 'NE';
		}
		/* falls through */
	case 'Gith':
		switch (race.Subrace) {
		case 'Githyanki':
			if (rand <= 1) {
				return 'LG';
			} else if (rand <= 3) {
				return 'LN';
			} else if (rand <= 5) {
				return 'NN';
			} else if (rand <= 6) {
				return 'CN';
			} else if (rand <= 13) {
				return 'LE';
			} else if (rand <= 17) {
				return 'NE';
			} else {
				return 'CE';
			}
			/* fall through */
		case 'Githzerai':
			if (rand <= 2) {
				return 'LG';
			} else if (rand <= 4) {
				return 'NG';
			} else if (rand <= 5) {
				return 'CG';
			} else if (rand <= 11) {
				return 'LN';
			} else if (rand <= 14) {
				return 'NN';
			} else if (rand <= 15) {
				return 'CN';
			} else if (rand <= 17) {
				return 'LE';
			} else if (rand <= 19) {
				return 'NE';
			} else {
				return 'CE';
			}
		}
		/* falls through */
	case 'Gnome':
		switch (race.Subrace) {
		case 'Svirfneble':
			if (rand <= 5) {
				return 'LG';
			} else if (rand <= 7) {
				return 'NG';
			} else if (rand <= 12) {
				return 'CG';
			} else if (rand <= 14) {
				return 'LN';
			} else if (rand <= 15) {
				return 'NN';
			} else if (rand <= 17) {
				return 'CN';
			} else if (rand <= 18) {
				return 'LE';
			} else if (rand <= 19) {
				return 'NE';
			} else {
				return 'CE';
			}
			/* falls through */
		default:
			if (rand <= 2) {
				return 'LG';
			} else if (rand <= 4) {
				return 'NG';
			} else if (rand <= 5) {
				return 'CG';
			} else if (rand <= 11) {
				return 'LN';
			} else if (rand <= 14) {
				return 'NN';
			} else if (rand <= 15) {
				return 'CN';
			} else if (rand <= 17) {
				return 'LE';
			} else if (rand <= 19) {
				return 'NE';
			} else {
				return 'CE';
			}
		}
		/* falls through */
	case 'Goliath':
		if (rand <= 3) {
			return 'LG';
		} else if (rand <= 4) {
			return 'NG';
		} else if (rand <= 5) {
			return 'CG';
		} else if (rand <= 11) {
			return 'LN';
		} else if (rand <= 14) {
			return 'NN';
		} else if (rand <= 15) {
			return 'CN';
		} else if (rand <= 18) {
			return 'LE';
		} else if (rand <= 19) {
			return 'NE';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Half-Elf':
		if (rand <= 1) {
			return 'LG';
		} else if (rand <= 4) {
			return 'NG';
		} else if (rand <= 9) {
			return 'CG';
		} else if (rand <= 10) {
			return 'LN';
		} else if (rand <= 12) {
			return 'NN';
		} else if (rand <= 15) {
			return 'CN';
		} else if (rand <= 16) {
			return 'LE';
		} else if (rand <= 17) {
			return 'LN';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Half-Orc':
		if (rand <= 1) {
			return 'LG';
		} else if (rand <= 2) {
			return 'NG';
		} else if (rand <= 5) {
			return 'CG';
		} else if (rand <= 6) {
			return 'LN';
		} else if (rand <= 8) {
			return 'NN';
		} else if (rand <= 13) {
			return 'CN';
		} else if (rand <= 14) {
			return 'LE';
		} else if (rand <= 16) {
			return 'LN';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Halfling':
		if (rand <= 8) {
			return 'LG';
		} else if (rand <= 12) {
			return 'NG';
		} else if (rand <= 13) {
			return 'CG';
		} else if (rand <= 15) {
			return 'LN';
		} else if (rand <= 17) {
			return 'NN';
		} else if (rand <= 18) {
			return 'CN';
		} else if (rand <= 19) {
			return 'LE';
		} else {
			return 'NE';
		}
		/* falls through */
	case 'Human':
		if (rand <= 3) {
			return 'LG';
		} else if (rand <= 6) {
			return 'NG';
		} else if (rand <= 9) {
			return 'CG';
		} else if (rand <= 11) {
			return 'LN';
		} else if (rand <= 12) {
			return 'NN';
		} else if (rand <= 14) {
			return 'CN';
		} else if (rand <= 16) {
			return 'LE';
		} else if (rand <= 18) {
			return 'NE';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Kenku':
		if (rand <= 1) {
			return 'LG';
		} else if (rand <= 2) {
			return 'NG';
		} else if (rand <= 5) {
			return 'CG';
		} else if (rand <= 6) {
			return 'LN';
		} else if (rand <= 9) {
			return 'NN';
		} else if (rand <= 15) {
			return 'CN';
		} else if (rand <= 16) {
			return 'LE';
		} else if (rand <= 17) {
			return 'NE';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Lizardfolk':
		if (rand <= 1) {
			return 'LG';
		} else if (rand <= 2) {
			return 'NG';
		} else if (rand <= 3) {
			return 'CG';
		} else if (rand <= 4) {
			return 'LN';
		} else if (rand <= 16) {
			return 'NN';
		} else if (rand <= 17) {
			return 'CN';
		} else if (rand <= 18) {
			return 'LE';
		} else if (rand <= 19) {
			return 'NE';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Tabaxi':
		if (rand <= 1) {
			return 'LG';
		} else if (rand <= 4) {
			return 'NG';
		} else if (rand <= 12) {
			return 'CG';
		} else if (rand <= 13) {
			return 'LN';
		} else if (rand <= 15) {
			return 'NN';
		} else if (rand <= 18) {
			return 'CN';
		} else if (rand <= 19) {
			return 'NE';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Tiefling':
		if (rand <= 1) {
			return 'LG';
		} else if (rand <= 2) {
			return 'NG';
		} else if (rand <= 6) {
			return 'CG';
		} else if (rand <= 7) {
			return 'LN';
		} else if (rand <= 8) {
			return 'NN';
		} else if (rand <= 13) {
			return 'CN';
		} else if (rand <= 14) {
			return 'LE';
		} else if (rand <= 15) {
			return 'NE';
		} else {
			return 'CE';
		}
		/* falls through */
	case 'Triton':
		if (rand <= 7) {
			return 'LG';
		} else if (rand <= 10) {
			return 'NG';
		} else if (rand <= 11) {
			return 'CG';
		} else if (rand <= 14) {
			return 'LN';
		} else if (rand <= 15) {
			return 'NN';
		} else if (rand <= 16) {
			return 'CN';
		} else if (rand <= 18) {
			return 'LE';
		} else if (rand <= 19) {
			return 'NE';
		} else {
			return 'CE';
		}
	}
};

var GetOccupation = function(isRural) {
	var rand = Roll(1,20);
	var occupation = [];
	if (rand <= 1) {
		occupation.Primary = "Lesser Nobility";
		rand2 = Roll(1,8);
		if (rand2 <= 1) {
			occupation.Secondary = "Adventurer";
			occupation.Description = capitalizeFirstLetter("a minor scion of a noble house who's chosen to wander the world");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 2) {
			occupation.Secondary = "Dilettante";
			occupation.Description = capitalizeFirstLetter("a minor scion of a noble house who dabbles in various interests");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 3) {
			occupation.Secondary = "Diplomat";
			occupation.Description = capitalizeFirstLetter("a representative of his house in dealings with other noble houses");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 4) {
			occupation.Secondary = "Knight";
			occupation.Description = capitalizeFirstLetter("a well-trained warrior, skilled with sword and lanc");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 5) {
			occupation.Secondary = "Minister";
			occupation.Description = capitalizeFirstLetter("a political figure appointed by the ruler to govern a specific area or to oversee a domain; also lesser but important officials, such as a reeve or judge");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 6) {
			occupation.Secondary = "Nobleman";
			occupation.Description = capitalizeFirstLetter("A member of a well-known, perhaps powerful family");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 7) {
			occupation.Secondary = "Page";
			occupation.Description = capitalizeFirstLetter("a very young noble beginning his training to be a knight");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Secondary = "Squire";
			occupation.Description = capitalizeFirstLetter("a young noble progressing on the path to knighthood, perhaps himself a capable warrior");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
	} else if ((rand <= 3 && !isRural) || (rand <= 2 && isRural)) {
		occupation.Primary = "Religious";
		rand2 = Roll(1,20);
		if (rand2 <= 1) {
			occupation.Secondary = "Beadle";
			occupation.Description = capitalizeFirstLetter("subordinate with menial duties");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 2) {
			occupation.Secondary = "Curate";
			occupation.Description = capitalizeFirstLetter("clergy assistant to the rector");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 3) {
			occupation.Secondary = "Reeve";
			occupation.Description = capitalizeFirstLetter("time keeper charged with beginning and ending services");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 4) {
			occupation.Secondary = "Sexton";
			occupation.Description = capitalizeFirstLetter("custodian for church property");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 5) {
			occupation.Secondary = "Theologian";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 6) {
			occupation.Secondary = "Acolyte";
			occupation.Description = capitalizeFirstLetter("entry level priest");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 7) {
			occupation.Secondary = "Ward";
			occupation.Description = capitalizeFirstLetter("a child who is under the care of the church, oftentimes an orphan");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Secondary = "Cleric";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
	} else if ((rand <= 4 && !isRural) || (rand <= 3 && isRural)) {
		occupation.Primary = "Legal/Judicial";
		rand2 = Roll(1,8);
		if (rand2 <= 1) {
			occupation.Secondary = "Bailiff";
			occupation.Description = capitalizeFirstLetter("presides over arrests and executions");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 2) {
			occupation.Secondary = "Chamberlain";
			occupation.Description = capitalizeFirstLetter("custodian of a royal or high noble residence");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 3) {
			occupation.Secondary = "Chancellor";
			occupation.Description = capitalizeFirstLetter("secretary to a king or noble");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 4) {
			occupation.Secondary = "Constable";
			occupation.Description = capitalizeFirstLetter("head of peace-keeping law enforcement");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 5) {
			occupation.Secondary = "Diplomat";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 6) {
			occupation.Secondary = "Exchequer";
			occupation.Description = capitalizeFirstLetter("administrator of royal funds");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 7) {
			occupation.Secondary = "Jailer";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Secondary = "Judge";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
	} else if ((rand <= 7 && !isRural) || (rand <= 6 && isRural)) {
		occupation.Primary = "Military";
		rand2 = Roll(1,20);
		if (rand2 <= 1) {
			occupation.Secondary = "Aid-de-camp";
			occupation.Description = capitalizeFirstLetter("assistant to a superior officer");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 2) {
			occupation.Secondary = "Archer";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 3) {
			occupation.Secondary = "Bodyguard";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 4) {
			occupation.Secondary = "Bounty Hunter";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 5) {
			occupation.Secondary = "Cavalry";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 6) {
			occupation.Secondary = "Engineer";
			occupation.Description = capitalizeFirstLetter("designs and builds war machines, such as catapults, and ballistae");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 7) {
			occupation.Secondary = "Forester";
			occupation.Description = capitalizeFirstLetter("a ranger or game warden, often empowered to act as law enforcement within the forest");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 8) {
			occupation.Secondary = "Gatekeeper or Toll Keeper";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 9) {
			occupation.Secondary = "Jailer";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 10) {
			occupation.Secondary = "Mariner";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 11) {
			occupation.Secondary = "Mercenary";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 12) {
			occupation.Secondary = "Navigator";
			occupation.Description = capitalizeFirstLetter("special class of mariner");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 13) {
			occupation.Secondary = "Scout";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 18) {
			occupation.Secondary = "Soldier";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 19) {
			occupation.Secondary = "Torturer";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Secondary = "Watchman";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
	} else if ((rand <= 8 && !isRural) || (rand <= 7 && isRural)) {
		occupation.Primary = "Academic";
		rand2 = Roll(1,20);
		if (rand2 <= 1) {
			occupation.Secondary = "Alchemist";
			occupation.Description = capitalizeFirstLetter("chemist");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 2) {
			occupation.Secondary = "Architect";
			occupation.Description = capitalizeFirstLetter("a master builder");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 3) {
			occupation.Secondary = "Ascetic";
			occupation.Description = capitalizeFirstLetter("a hermit or wandering monk");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 4) {
			occupation.Secondary = "Astrologer";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 5) {
			occupation.Secondary = "Barber";
			occupation.Description = capitalizeFirstLetter("a doctor, surgeon, bloodletter, dentist, and haircutter");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 6) {
			occupation.Secondary = "Barrister";
			occupation.Description = capitalizeFirstLetter("a lawyer");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 7) {
			occupation.Secondary = "Bureaucrat";
			occupation.Description = capitalizeFirstLetter("a local functionary, servant to some more powerful political figure");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 8) {
			occupation.Secondary = "Cartographer";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 9) {
			occupation.Secondary = "Engineer";
			occupation.Description = capitalizeFirstLetter("a builder of roads, bridges, castles, fortifications, and siege engines");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 10) {
			occupation.Secondary = "Herald";
			occupation.Description = capitalizeFirstLetter("an announcer and deliverer of news on behalf of a lord");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 11) {
			occupation.Secondary = "Historian";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 12) {
			occupation.Secondary = "Illuminator";
			occupation.Description = capitalizeFirstLetter("paint manuscripts");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 13) {
			occupation.Secondary = "Librarian";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 14) {
			occupation.Secondary = "Mathematician";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 15) {
			occupation.Secondary = "Monk";
			occupation.Description = capitalizeFirstLetter("/Nun an academic devoted to prayer and spirituality");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 16) {
			occupation.Secondary = "Philosopher";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 17) {
			occupation.Secondary = "Sage";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 18) {
			occupation.Secondary = "Scholar";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 19) {
			occupation.Secondary = "Scrivener";
			occupation.Description = capitalizeFirstLetter("scribe skilled in taking dictation or copying documents");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Secondary = "Tutor";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
	} else if ((rand <= 15 && !isRural) || (rand <= 9 && isRural)) {
		occupation.Primary = "Merchant/Servicer";
		rand2 = Roll(1,89);
		if (rand2 <= 1) {
			occupation.Secondary = "Apothecary";
			occupation.Description = capitalizeFirstLetter("seller of herbal remedies");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 2) {
			occupation.Secondary = "Architect";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 3) {
			occupation.Secondary = "Armorer";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 4) {
			occupation.Secondary = "Artist";
			occupation.Description = capitalizeFirstLetter("a painter of portraits");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 5) {
			occupation.Secondary = "Baker";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 6) {
			occupation.Secondary = "Banker";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 7) {
			occupation.Secondary = "Barber";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 8) {
			occupation.Secondary = "Beadle";
			occupation.Description = capitalizeFirstLetter("subordinate with menial duties");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 9) {
			occupation.Secondary = "Blacksmith";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 10) {
			occupation.Secondary = "Boatman";
			occupation.Description = capitalizeFirstLetter("travel by lake or river");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 11) {
			occupation.Secondary = "Bookbinder";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 12) {
			occupation.Secondary = "Bowyer";
			occupation.Description = capitalizeFirstLetter("bow craftsman");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 13) {
			occupation.Secondary = "Brazier";
			occupation.Description = capitalizeFirstLetter("brass worker");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 14) {
			occupation.Secondary = "Brewer";
			occupation.Description = capitalizeFirstLetter("a maker of beer and ale");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 15) {
			occupation.Secondary = "Bricklayer";
			occupation.Description = capitalizeFirstLetter("a laborer skilled in the building of walls and ducts");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 16) {
			occupation.Secondary = "Butcher";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 17) {
			occupation.Secondary = "Carpenter";
			occupation.Description = capitalizeFirstLetter("an elite tradesman, skilled in math as well as woodworking");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 18) {
			occupation.Secondary = "Cartographer";
			occupation.Description = capitalizeFirstLetter("map maker");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 19) {
			occupation.Secondary = "Cartwright";
			occupation.Description = capitalizeFirstLetter("a maker and repairer of carts and wagons");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 20) {
			occupation.Secondary = "Chandler";
			occupation.Description = capitalizeFirstLetter("candle maker, sometimes soap maker");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 21) {
			occupation.Secondary = "Chapman";
			occupation.Description = capitalizeFirstLetter("a travelling peddler");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 22) {
			occupation.Secondary = "Clerk";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 23) {
			occupation.Secondary = "Clothier";
			occupation.Description = capitalizeFirstLetter("a garment-maker");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 24) {
			occupation.Secondary = "Coachman";
			occupation.Description = capitalizeFirstLetter("driver of a coach");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 25) {
			occupation.Secondary = "Cobbler or Shoemaker";
			occupation.Description = capitalizeFirstLetter("makes and mends shoes");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 26) {
			occupation.Secondary = "Cook";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 27) {
			occupation.Secondary = "Cooper";
			occupation.Description = capitalizeFirstLetter("barrel maker");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 28) {
			occupation.Secondary = "Curate";
			occupation.Description = capitalizeFirstLetter("clergy assistant to the rector");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 29) {
			occupation.Secondary = "Draper";
			occupation.Description = capitalizeFirstLetter("cloth merchant");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 30) {
			occupation.Secondary = "Dyer";
			occupation.Description = capitalizeFirstLetter("a maker of inks, paints, dyes, and stains");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 31) {
			occupation.Secondary = "Engraver";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 32) {
			occupation.Secondary = "Farmer";
			occupation.Description = capitalizeFirstLetter("local, small yield");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 33) {
			occupation.Secondary = "Farmer";
			occupation.Description = capitalizeFirstLetter("regional, large yield");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 34) {
			occupation.Secondary = "Fisherman";
			occupation.Description = capitalizeFirstLetter("netman");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 35) {
			occupation.Secondary = "Fisherman";
			occupation.Description = capitalizeFirstLetter("specialist (shellfish, lineman, craber)");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 36) {
			occupation.Secondary = "Fishmonger";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 37) {
			occupation.Secondary = "Forester";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 38) {
			occupation.Secondary = "Fortune Teller";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 39) {
			occupation.Secondary = "Furrier";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 40) {
			occupation.Secondary = "Gardener";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 41) {
			occupation.Secondary = "Glassblower";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 42) {
			occupation.Secondary = "Glazier";
			occupation.Description = capitalizeFirstLetter("glass worker, including windows");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 43) {
			occupation.Secondary = "Goldsmith or Silversmith";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 44) {
			occupation.Secondary = "Gravedigger";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 45) {
			occupation.Secondary = "Grocer";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 46) {
			occupation.Secondary = "Groom";
			occupation.Description = capitalizeFirstLetter("one who tends animals");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 47) {
			occupation.Secondary = "Hatter";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 48) {
			occupation.Secondary = "Herdsman";
			occupation.Description = capitalizeFirstLetter("a keeper of livestock");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 49) {
			occupation.Secondary = "Hunter";
			occupation.Description = capitalizeFirstLetter("large game");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 50) {
			occupation.Secondary = "Hunter";
			occupation.Description = capitalizeFirstLetter("/Trapper small game");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 51) {
			occupation.Secondary = "Innkeeper or Tavern-keeper";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 52) {
			occupation.Secondary = "Jeweler";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 53) {
			occupation.Secondary = "Joiner";
			occupation.Description = capitalizeFirstLetter("a maker of furniture");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 54) {
			occupation.Secondary = "Laundress";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 55) {
			occupation.Secondary = "Leatherworker";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 56) {
			occupation.Secondary = "Link Boy";
			occupation.Description = capitalizeFirstLetter("carries lamps at night");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 57) {
			occupation.Secondary = "Locksmith";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 58) {
			occupation.Secondary = "Maid";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 59) {
			occupation.Secondary = "Mason";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 60) {
			occupation.Secondary = "Mercer";
			occupation.Description = capitalizeFirstLetter("textile merchant");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 61) {
			occupation.Secondary = "Merchant";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 62) {
			occupation.Secondary = "Messenger";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 63) {
			occupation.Secondary = "Miller";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 64) {
			occupation.Secondary = "Miner";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 65) {
			occupation.Secondary = "Moneylender";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 66) {
			occupation.Secondary = "Ostler";
			occupation.Description = capitalizeFirstLetter("cares for horses");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 67) {
			occupation.Secondary = "Painter or Limner";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 68) {
			occupation.Secondary = "Peddler";
			occupation.Description = capitalizeFirstLetter("an itinerant merchant of goods");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 69) {
			occupation.Secondary = "Porter";
			occupation.Description = capitalizeFirstLetter("carries baggage");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 70) {
			occupation.Secondary = "Ratcatcher";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 71) {
			occupation.Secondary = "Reeve";
			occupation.Description = capitalizeFirstLetter("time keeper charged with beginning and ending services");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 72) {
			occupation.Secondary = "Sailor";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 73) {
			occupation.Secondary = "Scribe";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 74) {
			occupation.Secondary = "Seamstress";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 75) {
			occupation.Secondary = "Servant";
			occupation.Description = capitalizeFirstLetter("maid, butler, attendant, steward, etc.");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 76) {
			occupation.Secondary = "Sexton";
			occupation.Description = capitalizeFirstLetter("custodian for church property");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 77) {
			occupation.Secondary = "Shipwright";
			occupation.Description = capitalizeFirstLetter("a builder of ships");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 78) {
			occupation.Secondary = "Spinster-yarn and cord maker";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 79) {
			occupation.Secondary = "Stevedore";
			occupation.Description = capitalizeFirstLetter("one who loads and unloads goods from sailing ships or caravan");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 80) {
			occupation.Secondary = "Tailor";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 81) {
			occupation.Secondary = "Tanner";
			occupation.Description = capitalizeFirstLetter("leather maker");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 82) {
			occupation.Secondary = "Tax Collector";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 83) {
			occupation.Secondary = "Thatcher";
			occupation.Description = capitalizeFirstLetter("roof repairs");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 84) {
			occupation.Secondary = "Tinker";
			occupation.Description = capitalizeFirstLetter("a traveling craftsman who repairs tin pots and other small items");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 85) {
			occupation.Secondary = "Torturer";
			occupation.Description = capitalizeFirstLetter("/Interrogator");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 86) {
			occupation.Secondary = "Trader";
			occupation.Description = capitalizeFirstLetter("by land or by sea");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 87) {
			occupation.Secondary = "Usurer";
			occupation.Description = capitalizeFirstLetter("a moneylender with excessive interest rates, different from banker");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 88) {
			occupation.Secondary = "Vintner";
			occupation.Description = capitalizeFirstLetter("a maker of wines");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Secondary = "Weaver";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
	} else if (rand <= 18) {
		occupation.Primary = "Agriculture";
		rand2 = Roll(1,10);
		if (rand2 <= 1) {
			occupation.Secondary = "Cooper";
			occupation.Description = capitalizeFirstLetter("a keeper of poultry and fowl");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 2) {
			occupation.Secondary = "Farmer";
			occupation.Description = capitalizeFirstLetter("a worker of the fields");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 3) {
			occupation.Secondary = "Falconer";
			occupation.Description = capitalizeFirstLetter("a hunter who uses trained birds of prey*");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 4) {
			occupation.Secondary = "Fisherman";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 5) {
			occupation.Secondary = "Forester";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 6) {
			occupation.Secondary = "Herdsman";
			occupation.Description = capitalizeFirstLetter("a keeper of livestock");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 7) {
			occupation.Secondary = "Houndsman";
			occupation.Description = capitalizeFirstLetter("a keeper of dogs");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 8) {
			occupation.Secondary = "Hunter";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 9) {
			occupation.Secondary = "Ostler";
			occupation.Description = capitalizeFirstLetter("cares for horses");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Secondary = "Woodsman";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
	} else if (rand <= 19) {
		occupation.Primary = "Entertainer";
		rand2 = Roll(1,10);
		if (rand2 <= 1) {
			occupation.Secondary = "Acrobat";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 2) {
			occupation.Secondary = "Actor";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 3) {
			occupation.Secondary = "Clown";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 4) {
			occupation.Secondary = "Dancer";
			occupation.Description = capitalizeFirstLetter("/Acrobat");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 5) {
			occupation.Secondary = "Fortune-teller";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 6) {
			occupation.Secondary = "Juggler";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 7) {
			occupation.Secondary = "Musician";
			occupation.Description = capitalizeFirstLetter("/Minstrel/Poet (a ‘bard' without the good stuff)");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 8) {
			occupation.Secondary = "Player";
			occupation.Description = capitalizeFirstLetter("actor");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 9) {
			occupation.Secondary = "Prestidigitator";
			occupation.Description = capitalizeFirstLetter("stage magician");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Secondary = "Storyteller";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
	} else {
		occupation.Primary = "Scoundrel/Underclass";
		rand2 = Roll(1,12);
		if (rand2 <= 1) {
			occupation.Secondary = "Bandit";
			occupation.Description = capitalizeFirstLetter(", Mugger, or Thug steals by force; often part of a gang of thieves");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 2) {
			occupation.Secondary = "Beggar";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 3) {
			occupation.Secondary = "Burglar";
			occupation.Description = capitalizeFirstLetter("steals by breaking and entering");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 4) {
			occupation.Secondary = "Fence";
			occupation.Description = capitalizeFirstLetter("finds buyers for stolen goods, may serve as a pawnbroker");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 5) {
			occupation.Secondary = "Gambler";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 6) {
			occupation.Secondary = "Pickpocket or Cutpurse";
			occupation.Description = capitalizeFirstLetter("steals by stealth");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 7) {
			occupation.Secondary = "Procurer";
			occupation.Description = capitalizeFirstLetter("streetwise specialists in finding whatever their client might be seeking");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 8) {
			occupation.Secondary = "Prostitute";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 9) {
			occupation.Secondary = "Slaver";
			occupation.Description = capitalizeFirstLetter("");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 10) {
			occupation.Secondary = "Smuggler";
			occupation.Description = capitalizeFirstLetter("moves stolen or illegal goods");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else if (rand2 <= 11) {
			occupation.Secondary = "Usurer";
			occupation.Description = capitalizeFirstLetter("a 'loan shark'");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Secondary = "Wanderer";
			occupation.Description = capitalizeFirstLetter("a 'barbarian' nomad, drifter, or rover");
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
		var secondary = GetOccupation(isRural);
		if (secondary.Secondary == "Scoundrel/Underclass") {
			occupation.Description += ". An infamous suspected criminal, but somehow still free.";
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		} else {
			occupation.Description += ". Alter ego is a "+ secondary.Primary + " "+ secondary.Secondary + "- "+ secondary.Description;
			occupation.Classes = LookupOccupation(occupation.Primary, occupation.Secondary).Classes;
			occupation.ExtraChoices = LookupOccupation(occupation.Primary, occupation.Secondary).SkillProficiencies;
			occupation.SkillProficiencies = [];
			for (i=0; i < 2; i++) {
				occupation.SkillProficiencies.push(randomChoice(occupation.ExtraChoices));
				occupation.ExtraChoices.splice(occupation.ExtraChoices.indexOf(occupation.SkillProficiencies[i]));
			}
			occupation.ToolProficiencies = LookupOccupation(occupation.Primary, occupation.Secondary).ToolProficiencies;
			occupation.NumLanguages = LookupOccupation(occupation.Primary, occupation.Secondary).NumLanguages;
			occupation.StatWeights = LookupOccupation(occupation.Primary, occupation.Secondary).SuggestedAbilities;
		}
	}
	if (occupation.SkillProficiencies.length == 0) {
		occupation.SkillProficiencies = [randomChoice(Object.keys(SkillMap))];
		sp = randomChoice(Object.keys(SkillMap));
		while (occupation.SkillProficiencies.includes(sp)) {
			sp = randomChoice(Object.keys(SkillMap));
		}
		occupation.SkillProficiencies.push(sp);
	}
	if (occupation.NumLanguages + occupation.ToolProficiencies.length < 2) {
		occupation.NumLanguages = 2 - occupation.NumLanguages - occupation.ToolProficiencies.length;
	}
	return occupation;
};

var LookupOccupation = function(primary, secondary) {
	return BackgroundMap[primary][secondary];
};


var GetParents = function(race, gender) {
	var genderPronoun = GetGenderPronoun(gender);
	var genderPossessivePronoun = GetGenderPossessivePronoun(gender);
	var rand = Roll(1,100);
	var parents = capitalizeFirstLetter(genderPronoun);
	if (rand <= 95) {
		parents += " knows who "+ genderPossessivePronoun + " parents are or were.";
	} else {
		parents += " does not know who "+ genderPossessivePronoun + " parents were.";
	}
	if (race.Name == "Half-Elf") {
		rand = Roll(1,8);
		if (rand <= 5) {
			parents += " One parent was an elf and the other was a human.";
		} else if (rand <= 6) {
			parents += " One parent was an elf and the other was a half-elf.";
		} else if (rand <= 7) {
			parents += " One parent was a human and the other was a half-elf.";
		} else {
			parents += " Both parents were half-elves.";
		}
	} else if (race.Name == "Half-Orc") {
		rand = Roll(1,8);
		if (rand <= 5) {
			parents += " One parent was an orc and the other was a human.";
		} else if (rand <= 6) {
			parents += " One parent was an orc and the other was a half-orc.";
		} else if (rand <= 7) {
			parents += " One parent was a human and the other was a half-orc.";
		} else {
			parents += " Both parents were half-orcs.";
		}
	} else if (race.Name == "Tiefling") {
		rand = Roll(1,8);
		if (rand <= 5) {
			parents += " Both parents were humans, their Infernal heritage dormant until you came along.";
		} else if (rand <= 6) {
			parents += " One parent was a Tiefling and the other was a human.";
		} else if (rand <= 7) {
			parents += " One parent was a Tiefling and the other was a devil.";
		} else {
			parents += " One parent was a human and the other was a devil.";
		}
	}
	return parents;
};

var GetBirthplace = function(gender) {
	var genderPronoun = GetGenderPronoun(gender);
	var b = capitalizeFirstLetter(genderPronoun) + " ";
	var rand = Roll(1,100);
	if (rand <= 50) {
		return b + "was born at home.";
	} else if (rand <= 55) {
		return b + "was born at the home of a family friend.";
	} else if (rand <= 63) {
		return b + "was born at the home of a Healer or midwife.";
	} else if (rand <= 65) {
		return b + "was born in a carriage, cart, or wagon.";
	} else if (rand <= 68) {
		return b + "was born in a barn, shed, or other outbuilding.";
	} else if (rand <= 70) {
		return b + "was born in a cave.";
	} else if (rand <= 72) {
		return b + "was born in a field.";
	} else if (rand <= 74) {
		return b + "was born in a forest.";
	} else if (rand <= 77) {
		return b + "was born in a temple.";
	} else if (rand <= 78) {
		return b + "was born on a battlefield.";
	} else if (rand <= 80) {
		return b + "was born in an alley or street.";
	} else if (rand <= 82) {
		return b + "was born in a brothel, tavern, or inn.";
	} else if (rand <= 84) {
		return b + "was born in a castle, keep, tower, or palace.";
	} else if (rand <= 85) {
		return b + "was born in a sewer or rubbish heap.";
	} else if (rand <= 88) {
		return b + "was born among people of a different race.";
	} else if (rand <= 91) {
		return b + "was born on board a boat or a ship.";
	} else if (rand <= 93) {
		return b + "was born in a prison or in the headquarters of a Secret organization.";
	} else if (rand <= 95) {
		return b + "was born in a sage's laboratory.";
	} else if (rand <= 96) {
		return b + "was born in the Feywild.";
	} else if (rand <= 97) {
		return b + "was born in the Shadowfell.";
	} else if (rand <= 98) {
		return b + "was born on the Astral Plane or the Ethereal Plane.";
	} else if (rand <= 99) {
		return b + "was born on an Inner Plane of your choice.";
	} else {
		return b + "was born on an Outer Plane of your choice.";
	}
};

var getOrdinalWord = function(i) {
	switch (i) {
	case 1:
		return "first";
	case 2:
		return "second";
	case 3:
		return "third";
	case 4:
		return "fourth";
	case 5:
		return "fifth";
	case 6:
		return "sixth";
	case 7:
		return "seventh";
	case 8:
		return "eighth";
	case 9:
		return "ninth";
	case 10:
		return "tenth";
	case 11:
		return "eleventh";
	case 12:
		return "twelfth";
	case 13:
		return "thirteenth";
	case 14:
		return "fourteenth";
	case 15:
		return "fifteenth";
	}
};

var GetAlignmentWords = function(a) {
	var alignment = "";
	if (a.startsWith("L")) {
		alignment += "lawful ";
	} else if (a.startsWith("N")) {
		alignment += "neutral ";
	} else {
		alignment += "chaotic ";
	}
	if (a.endsWith("G")) {
		alignment += "good";
	} else if (a.endsWith("N")) {
		if (alignment === "neutral ") {
			alignment = "true neutral";
		} else {
			alignment += "neutral";
		}
	} else {
		alignment += "evil";
	}
	return alignment;
};

var GetSiblings = function(race, age, characterGender) {
	var genderPronoun = GetGenderPronoun(characterGender);
	var genderPossessivePronoun = GetGenderPossessivePronoun(characterGender);
	var rand = Roll(1,10) - (race.Name == "Dwarf"|| race.Name == "Elf"? 2 : 0);
	var num = 0;
	if (rand >= 9) {
		num = Roll(1,8) + 3;
	} else if (rand >= 7) {
		num = Roll(1,6) + 2;
	} else if (rand >= 5) {
		num = Roll(1,4) + 1;
	} else if (rand >= 3) {
		num = Roll(1,3);
	}
	var siblings = [];
	for (var i=0; i<num; i++) {
		var ageRelation = "";
		rand = Roll(2,6);
		if (rand <= 2) {
			ageRelation = "twin";
		} else if (rand <= 7) {
			ageRelation = "older";
		} else {
			ageRelation = "younger";
		}
		var siblingAge = age;
		if (ageRelation == "older") {
			siblingAge += Math.abs(Roll(2,6) + Roll(2,4) - 10);
			if (siblingAge == age) {
				siblingAge = age + Roll(1,4);
			}
		} else if (ageRelation == "younger") {
			siblingAge += Math.abs(Roll(2,6) + Roll(2,4) - 10);
			if (siblingAge == age) {
				siblingAge = age - Roll(1,4);
			}
		}
		var alignment = GetAlignment(race);
		var occupation = GetOccupation(Math.random() < 0.5);
		var gender = GetGender();
		var relationship = GetRelationship(gender);
		var lifeStatus = GetLifeStatus(gender);

		siblingGenderPronoun = GetGenderPronoun(gender);

		description = genderPossessivePronoun + " "+ siblingAge + " year-old "+ ageRelation + " "+ (gender === "Male"? "brother": "sister") + " is a "+ occupation.Secondary.toLowerCase();
		description += status + " and is "+ GetAlignmentWords(alignment) + ". "+ lifeStatus + " " + relationship;

		siblings.push({
			AgeRelation: ageRelation,
			Age: siblingAge,
			Alignment: alignment,
			Occupation: occupation,
			Gender: gender,
			Relationship: relationship,
			lifeStatus: lifeStatus,
			Description: description
		});
	}

	description = capitalizeFirstLetter(genderPronoun) + " has "+ siblings.length + " sibling"+ (siblings.length !== 1 ? "s": "") + ".<ul>";
	for (i in siblings) {
		description += "<li>The "+ getOrdinalWord(parseInt(i)+1) + " is "+ siblings[i].Description + "</li>";
	}
	description += "</ul>";
	return {
		Siblings: siblings,
		Description: description
	};
};

var GetLifeStatus = function(gender) {
	var genderPronoun = GetGenderPronoun(gender);
	var ls = capitalizeFirstLetter(genderPronoun) + " ";
	var rand = Roll(3,6);
	if (rand <= 3) {
		return ls + GetCauseOfDeath();
	} else if (rand <= 5) {
		return ls + "is missing.";
	} else if (rand <= 8) {
		return ls + "is alive, but doing poorly due to injury, financial trouble, or relationship difficulties.";
	} else if (rand <= 12) {
		return ls + "is alive and well.";
	} else if (rand <= 15) {
		return ls + "is alive and quite successful.";
	} else if (rand <= 17) {
		return ls + "is alive and infamous.";
	} else {
		return ls + "is alive and famous.";
	}
};

var GetCauseOfDeath = function() {
	var rand = Roll(1,12);
	if (rand <= 1) {
		return "is dead because of an unknown reason.";
	} else if (rand <= 2) {
		return "was murdered.";
	} else if (rand <= 3) {
		return "was killed in battle.";
	} else if (rand <= 4) {
		return "was killed in an accident related to class or occupation.";
	} else if (rand <= 5) {
		return "was killed in an accident unrelated to class or occupation.";
	} else if (rand <= 7) {
		return "died from natural causes, such as disease or old age.";
	} else if (rand <= 8) {
		return "died from an apparent suicide.";
	} else if (rand <= 9) {
		return "died being torn apart by an animal or a natural disaster.";
	} else if (rand <= 10) {
		return "was consumed by a monster.";
	} else if (rand <= 11) {
		return "was executed for a crime or tortured to death.";
	} else {
		return "was killed by a bizarre event, such as being hit by a meteorite, struck down by an angry god, or killed by a hatching slaad egg.";
	}
};

var GetRelationship = function(gender) {
	var genderPronoun = GetGenderPronoun(gender);
	var rand = Roll(3,4);
	var r = capitalizeFirstLetter(genderPronoun) + " ";
	if (rand <= 4) {
		return r + "has a hostile relationship with the character.";
	} else if (rand <= 4) {
		return r + "has a friendly relationship with the character.";
	} else {
		return r + "is indifferent towards the character.";
	}
};

var GetChildhood = function(parents, gender) {
	var genderPronoun = GetGenderPronoun(gender);
	var genderPossessivePronoun = GetGenderPossessivePronoun(gender);
	var genderObjectPronoun = GetGenderObjectPronoun(gender);
	var rand = Roll(1,100);
	var family = capitalizeFirstLetter(genderPronoun) + " lived ";
	if (rand <= 1) {
		family += "with nobody";
	} else if (rand <= 2) {
		family += "in institution, such as an asylum.";
	} else if (rand <= 3) {
		family += "in a temple.";
	} else if (rand <= 5) {
		family += "in an orphanage.";
	} else if (rand <= 7) {
		family += "with a guardian";
	} else if (rand <= 15) {
		family += "with "+ genderPossessivePronoun + " paternal or maternal aunt, uncle, or both; or extended family such as a tribe or clan.";
	} else if (rand <= 25) {
		family += "with "+ genderPossessivePronoun + " paternal or maternal grandparent(s).";
	} else if (rand <= 35) {
		family += "with an adoptive family (same or different race).";
	} else if (rand <= 55) {
		family += "with "+ genderPossessivePronoun + " single father or stepfather.";
	} else if (rand <= 75) {
		family += "with "+ genderPossessivePronoun + " single mother or stepmother.";
	} else {
		family += "with "+ genderPossessivePronoun + " mother and father.";
	}
	if (parents.startsWith(capitalizeFirstLetter(genderPronoun) + " knows who your parents are or were.") && rand <= 75) {
		if (rand <= 55) {
			rand2 = Roll(1,4);
			family += " "+ capitalizeFirstLetter(genderPossessivePronoun) + " mother ";
			if (rand2 <= 1) {
				family += "died. "+ GetCauseOfDeath();
			} else if (rand2 <= 2) {
				family += "was imprisoned, enslaved, or otherwise taken away.";
			} else if (rand2 <= 4) {
				family += "abandoned "+ genderObjectPronoun + ".";
			} else {
				family += "disappeared to an unknown fate.";
			}
		}
		if (rand <= 35 || rand > 55) {
			rand2 = Roll(1,4);
			family += " "+ capitalizeFirstLetter(genderPossessivePronoun) + " father ";
			if (rand2 <= 1) {
				family += "died. "+ GetCauseOfDeath();
			} else if (rand2 <= 2) {
				family += "was imprisoned, enslaved, or otherwise taken away.";
			} else if (rand2 <= 4) {
				family += "abandoned "+ genderObjectPronoun + ".";
			} else {
				family += "disappeared to an unknown fate.";
			}
		}
	}
	family += " "+ capitalizeFirstLetter(genderPossessivePronoun) + " childhood lifestyle was ";
	var lifestyleModifier = 0;
	rand2 = Roll(3,6);
	if (rand2 <= 3) {
		family += "wretched.";
		lifestyleModifier = -40;
	} else if (rand2 <= 5) {
		family += "squalid.";
		lifestyleModifier = -20;
	} else if (rand2 <= 8) {
		family += "poor.";
		lifestyleModifier = -10;
	} else if (rand2 <= 12) {
		family += "modest.";
		lifestyleModifier = 0;
	} else if (rand2 <= 15) {
		family += "comfortable.";
		lifestyleModifier = 10;
	} else if (rand2 <= 17) {
		family += "wealthy.";
		lifestyleModifier = 20;
	} else {
		family += "aristocratic.";
		lifestyleModifier = 40;
	}
	family += " "+ capitalizeFirstLetter(genderPronoun) + " lived ";
	rand2 = Roll(1,100) + lifestyleModifier;
	if (rand2 <= 0) {
		family += "on the streets.";
	} else if (rand2 <= 20) {
		family += "in a rundown shack.";
	} else if (rand2 <= 30) {
		family += "in no permanent residence; they moved around a lot.";
	} else if (rand2 <= 40) {
		family += "in an encampment or village in the wilderness.";
	} else if (rand2 <= 50) {
		family += "in an apartment in a rundown neighborhood.";
	} else if (rand2 <= 70) {
		family += "in a small house.";
	} else if (rand2 <= 90) {
		family += "in a large house.";
	} else if (rand2 <= 110) {
		family += "in a mansion.";
	} else {
		family += "in a palace or castle.";
	}
	return family;
};

var GetAge = function(race) {
	var age = [];
	var rand = new Random();
	switch (race.Name) {
	case 'Dragonborn':
		age.push(Math.floor(rand.triangular(10, 90, 35)));
		if (age < 15) {
			age.push('Child');
		} else if (age < 35) {
			age.push('Young Adult');
		} else if (age < 53) {
			age.push('Middle Aged');
		} else if (age < 70) {
			age.push('Old');
		} else {
			age.push('Venerable');
		}
		return age;
	case 'Dwarf':
		age.push(Math.floor(rand.triangular(10, 450, 188)));
		if (age < 45) {
			age.push('Child');
		} else if (age < 125) {
			age.push('Young Adult');
		} else if (age < 188) {
			age.push('Middle Aged');
		} else if (age < 250) {
			age.push('Old');
		} else {
			age.push('Venerable');
		}
		return age;
	case 'Elf':
		age.push(Math.floor(rand.triangular(10, 750, 263)));
		if (age < 110) {
			age.push('Child');
		} else if (age < 175) {
			age.push('Young Adult');
		} else if (age < 263) {
			age.push('Middle Aged');
		} else if (age < 350) {
			age.push('Old');
		} else {
			age.push('Venerable');
		}
		return age;
	case 'Gnome':
		age.push(Math.floor(rand.triangular(10, 500, 150)));
		if (age < 40) {
			age.push('Child');
		} else if (age < 100) {
			age.push('Young Adult');
		} else if (age < 150) {
			age.push('Middle Aged');
		} else if (age < 200) {
			age.push('Old');
		} else {
			age.push('Venerable');
		}
		return age;
	case 'Half Elf':
		age.push(Math.floor(rand.triangular(10, 185, 62)));
		if (age < 18) {
			age.push('Child');
		} else if (age < 62) {
			age.push('Young Adult');
		} else if (age < 93) {
			age.push('Middle Aged');
		} else if (age < 125) {
			age.push('Old');
		} else {
			age.push('Venerable');
		}
		return age;
	case 'Half Orc':
		age.push(Math.floor(rand.triangular(10, 80, 45)));
		if (age < 14) {
			age.push('Child');
		} else if (age < 30) {
			age.push('Young Adult');
		} else if (age < 45) {
			age.push('Middle Aged');
		} else if (age < 60) {
			age.push('Old');
		} else {
			age.push('Venerable');
		}
		return age;
	case 'Halfling':
		age.push(Math.floor(rand.triangular(10, 200, 50)));
		if (age < 20) {
			age.push('Child');
		} else if (age < 50) {
			age.push('Young Adult');
		} else if (age < 75) {
			age.push('Middle Aged');
		} else if (age < 100) {
			age.push('Old');
		} else {
			age.push('Venerable');
		}
		return age;
	case 'Tiefling':
		age.push(Math.floor(rand.triangular(10, 120, 35)));
		if (age < 15) {
			age.push('Child');
		} else if (age < 35) {
			age.push('Young Adult');
		} else if (age < 53) {
			age.push('Middle Aged');
		} else if (age < 70) {
			age.push('Old');
		} else {
			age.push('Venerable');
		}
		return age;
	case 'Human':
	default:
		age.push(Math.floor(rand.triangular(10, 110, 35)));
		if (age < 15) {
			age.push('Child');
		} else if (age < 35) {
			age.push('Young Adult');
		} else if (age < 53) {
			age.push('Middle Aged');
		} else if (age < 70) {
			age.push('Old');
		} else {
			age.push('Venerable');
		}
		return age;
	}
};

var RandomThreshold = function() {
	return Math.random() * 0.2 + 0.9;
};

// var GetHeight = function(race) {
// 	switch (race.Name) {
// 	case 'Dragonborn':
// 		return Math.floor((Roll(2,8) + 66) * RandomThreshold());
// 	case 'Dwarf':
// 		return Math.floor((Roll(2,4) + 44) * RandomThreshold());
// 	case 'Elf':
// 		return Math.floor((Roll(2,10) + 54) * RandomThreshold());
// 	case 'Gnome':
// 		return Math.floor((Roll(2,4) + 35) * RandomThreshold());
// 	case 'Half Elf':
// 		return Math.floor((Roll(2,8) + 57) * RandomThreshold());
// 	case 'Half Orc':
// 		return Math.floor((Roll(2,10) + 58) * RandomThreshold());
// 	case 'Halfling':
// 		return Math.floor((Roll(2,4) + 31) * RandomThreshold());
// 	case 'Human':
// 		return Math.floor((Roll(2,10) + 56) * RandomThreshold());
// 	case 'Tiefling':
// 		return Math.floor((Roll(2,8) + 56) * RandomThreshold());
// 	}
// };

// var GetWeight = function(race) {
// 	switch (race.Name) {
// 	case 'Dragonborn':
// 		return Math.floor(Roll(2,6) * 175 * RandomThreshold());
// 	case 'Dwarf':
// 		return Math.floor(Roll(2,6) * 115 * RandomThreshold());
// 	case 'Elf':
// 		return Math.floor(Roll(1,4) * 90 * RandomThreshold());
// 	case 'Gnome':
// 		return Math.floor(Roll(1,1) * 35 * RandomThreshold());
// 	case 'Half Elf':
// 		return Math.floor(Roll(2,4) * 110 * RandomThreshold());
// 	case 'Half Orc':
// 		return Math.floor(Roll(2,6) * 140 * RandomThreshold());
// 	case 'Halfling':
// 		return Math.floor(Roll(1,1) * 35 * RandomThreshold());
// 	case 'Human':
// 		return Math.floor(Roll(2,4) * 110 * RandomThreshold());
// 	case 'Tiefling':
// 		return Math.floor(Roll(2,4) * 110 * RandomThreshold());
// 	}
// };

var GetGender = function() {
	return Math.random() < 0.5 ? "Male": "Female";
};

var GetSexuality = function() {
	rand = Roll(1,20);
	if (rand <= 2) {
		return "Homosexual";
	} else if (rand <= 3) {
		return "Bisexual";
	} else {
		return "Heterosexual";
	}
};

var GetRomance = function(ageCategory, sexuality) {
	sexualityChance = sexuality == "Homomosexual"? 0.8 : 1;
	rand = Roll(1,100) * sexualityChance;
	switch (ageCategory) {
	case "Child":
		if (rand <= 80) {
			return "Never married/Not in a relationship";
		} else {
			return "Dating";
		}
		/* falls through */
	case "Young Adult":
		if (rand <= 25) {
			return "Never married/Not in a relationship";
		} else if (rand <= 70) {
			return "Dating";
		} else if (rand <= 94) {
			return "Married";
		} else if (rand <= 97) {
			return "Widowed";
		} else {
			return "Divorced";
		}
		/* falls through */
	case "Middle Aged":
		if (rand <= 7) {
			return "Never married/Not in a relationship";
		} else if (rand <= 20) {
			return "Dating";
		} else if (rand <= 85) {
			return "Married";
		} else if (rand <= 93) {
			return "Widowed";
		} else {
			return "Divorced";
		}
		/* falls through */
	case "Old":
		if (rand <= 4) {
			return "Never married/Not in a relationship";
		} else if (rand <= 6) {
			return "Dating";
		} else if (rand <= 50) {
			return "Married";
		} else if (rand <= 95) {
			return "Widowed";
		} else {
			return "Divorced";
		}
		/* falls through */
	case "Venerable":
		if (rand <= 4) {
			return "Never married/Not in a relationship";
		} else if (rand <= 5) {
			return "Dating";
		} else if (rand <= 40) {
			return "Married";
		} else if (rand <= 95) {
			return "Widowed";
		} else {
			return "Divorced";
		}
		/* falls through */
	}
};

var GetKids = function(ageCategory, romance, sexuality, race) {
	sexualityChance = sexuality == "Homosexual"? 0.3 : 1;
	ageChance = 1;
	switch (ageCategory) {
	case "Child":
		ageChance = 0;
		break;
	case "Young Adult":
		ageChance = 0.7;
		break;
	case "Middle Aged":
		ageChance = 1;
		break;
	case "Old":
		ageChance = 1.1;
		break;
	case "Venerable":
		ageChance = 1.1;
		break;
	}
	romanceChance = 1;
	switch (romance) {
	case "Never married/Not in a relationship":
		romanceChance = 0.1;
		break;
	case "Dating":
		romanceChance = 0.2;
		break;
	case "Married":
		romanceChance = 1;
		break;
	case "Widowed":
		romanceChance = 1;
		break;
	case "Divorced":
		romanceChance = 1;
		break;
	}
	raceChance = 1;
	switch (race) {
		case 'Dwarf':
		case 'Elf':
			raceChance = 0.8;
			break;
		default:
			raceChance = 1;
			break;
	}
	var rand = Roll(1,12) * ageChance * romanceChance * raceChance;
	if (rand <= 1) {
		return 0;
	} else if (rand <= 2) {
		return 1;
	} else if (rand <= 4) {
		return Roll(1,3) + 1;
	} else if (rand <= 6) {
		return Roll(1,4) + 2;
	} else if (rand <= 8) {
		return Roll(1,6) + 3;
	} else {
		return Roll(1,8) + 4;
	}
};

var GetNPCPersonality = function(communityStatus) {
	var primaryMotivator = GetPrimaryMotivator();
	var emotionalDisposition = GetEmotionalDisposition(communityStatus);
	var moodiness = GetMoodiness();
	var coreTraits = GetCoreTraits();
	var humor = GetHumor();
	var quirks = GetQuirks();
	var hobbies = GetHobbies();
	var mentalDisorders = GetMentalDisorders();
	return {
		PrimaryMotivator: primaryMotivator,
		EmotionalDisposition: emotionalDisposition,
		Moodiness: moodiness,
		CoreTraits: coreTraits,
		Humor: humor,
		Quirks: quirks,
		Hobbies: hobbies,
		MentalDisorders: mentalDisorders
	};
};

var GetNPCDisposition = function(race, cls, background, communityPrejudices, isRural) {
	var prejudices = GetPrejudices(race, cls, background, communityPrejudices);
	var religion = GetReligion(race, cls, background, prejudices, isRural);
	var affinities = GetAffinities(prejudices);
	return {
		Prejudices: prejudices,
		Religion: religion,
		Affinities: affinities
	};
};

var GetPrimaryMotivator = function() {
	var rand = Roll(1,100);
	if (rand <=3) {
		return "Achievement - To overcome obstacles and succeed; to become the best";
	} else if (rand <= 6) {
		return "Acquisition - To obtain possessions/wealth";
	} else if (rand <= 9) {
		return "Adoration - To be cherished, admired, and wanted by others";
	} else if (rand <= 12) {
		return "Balance/Peace - To bring all things into harmony and equilibrium";
	} else if (rand <= 15) {
		return "Beneficence - To protect the helpless, heal the sick, feed the hungry, etc.";
	} else if (rand <= 18) {
		return "Chaos - To disrupt, to cause confusion and discord";
	} else if (rand <= 21) {
		return "Competition - To seek out or create rule-based win/lose scenarios; to defeat others in contests";
	} else if (rand <= 24) {
		return "Conflict - To seek out or create rivalry, fighting, or animosity";
	} else if (rand <= 27) {
		return "Conquest - To conquer other peoples, to bring them into one's own culture/rule";
	} else if (rand <= 30) {
		return "Corruption - To despoil, ruin, humiliate, or make depraved";
	} else if (rand <= 33) {
		return "Creation - To build or make new, such as art, culture, invention, design,etc.";
	} else if (rand <= 36) {
		return "Destruction - To annihilate, exterminate, and unmake";
	} else if (rand <= 39) {
		return "Discovery/Adventure - To explore, uncover mysteries, and pioneer";
	} else if (rand <= 42) {
		return "Domesticity - To get married, have children, and live a family life";
	} else if (rand <= 45) {
		return "Education - To provide information, teach, enlighten, or train";
	} else if (rand <= 48) {
		return "Entertainment - To entertain, amuse, and delight others";
	} else if (rand <= 51) {
		return "Enslavement - To force others into servitude";
	} else if (rand <= 54) {
		return "Hedonism - To enjoy all things sensuous";
	} else if (rand <= 57) {
		return "Heroism - To find valor and honor through battle or self-sacrifice";
	} else if (rand <= 61) {
		return "Liberation - To free the self and/or others from perceived captivity or enslavement";
	} else if (rand <= 64) {
		return "Love - To experience/share affection and emotional commitment, whether romantic or platonic";
	} else if (rand <= 67) {
		return "Nobility/Honor - To exalt ideals such as generosity, honesty, bravery, and courtliness";
	} else if (rand <= 70) {
		return "Order - To arrange, organize, and reduce chaos";
	} else if (rand <= 73) {
		return "Play - To have fun, to enjoy life";
	} else if (rand <= 76) {
		return "Power - To control and lead others";
	} else if (rand <= 79) {
		return "Proselytization - To spread a belief system; indoctrinate others";
	} else if (rand <= 82) {
		return "Purity - To achieve a state of moral or spiritual perfection, of self and/or others";
	} else if (rand <= 85) {
		return "Rebellion - To fight against power structures; to undermine authority";
	} else if (rand <= 88) {
		return "Recognition - To gain approval, social status, or fame";
	} else if (rand <= 91) {
		return "Service - To follow a person, government, order, religion, etc.";
	} else if (rand <= 94) {
		return "Torment - To inflict pain and suffering, on others and/or the self";
	} else if (rand <= 97) {
		return "Understanding - To seek knowledge or wisdom (spiritual, scientific, magical,etc)";
	} else {
		return "Vice - To enable or engage in self-destructive behavior";
	}
};

var CommunityStatuses = [
	"Utopian",
	"Prosperous",
	"Average",
	"Poor",
	"Recent Tragedy",
	"Long Term Oppression"
];

var GetEmotionalDisposition = function(communityStatus) {
	var deepEmotion = "";
	switch (communityStatus) {
	case "Utopian":
		rand = Roll(1,12);
		if (rand <= 7) {
			deepEmotion = "Happiness";
		} else if (rand <= 8) {
			deepEmotion = "Surprise";
		} else if (rand <= 9) {
			deepEmotion = "Sadness";
		} else if (rand <= 10) {
			deepEmotion = "Anger";
		} else if (rand <= 11) {
			deepEmotion = "Fear";
		} else {
			deepEmotion = "Disgust";
		}
		break;
	case "Prosperous":
		rand = Roll(1,10);
		if (rand <= 5) {
			deepEmotion = "Happiness";
		} else if (rand <= 6) {
			deepEmotion = "Surprise";
		} else if (rand <= 7) {
			deepEmotion = "Sadness";
		} else if (rand <= 8) {
			deepEmotion = "Anger";
		} else if (rand <= 9) {
			deepEmotion = "Fear";
		} else {
			deepEmotion = "Disgust";
		}
		break;
	case "Average":
		rand = Roll(1,8);
		if (rand <= 3) {
			deepEmotion = "Happiness";
		} else if (rand <= 4) {
			deepEmotion = "Surprise";
		} else if (rand <= 5) {
			deepEmotion = "Sadness";
		} else if (rand <= 6) {
			deepEmotion = "Anger";
		} else if (rand <= 7) {
			deepEmotion = "Fear";
		} else {
			deepEmotion = "Disgust";
		}
		break;
	case "Poor":
		rand = Roll(1,6);
		if (rand <= 1) {
			deepEmotion = "Happiness";
		} else if (rand <= 2) {
			deepEmotion = "Surprise";
		} else if (rand <= 3) {
			deepEmotion = "Sadness";
		} else if (rand <= 4) {
			deepEmotion = "Anger";
		} else if (rand <= 5) {
			deepEmotion = "Fear";
		} else {
			deepEmotion = "Disgust";
		}
		break;
	case "Recent Tragedy":
		rand = Roll(1,12);
		if (rand <= 1) {
			deepEmotion = "Happiness";
		} else if (rand <= 4) {
			deepEmotion = "Surprise";
		} else if (rand <= 6) {
			deepEmotion = "Sadness";
		} else if (rand <= 8) {
			deepEmotion = "Anger";
		} else if (rand <= 10) {
			deepEmotion = "Fear";
		} else {
			deepEmotion = "Disgust";
		}
		break;
	case "Long Term Oppression":
		rand = Roll(1,12);
		if (rand <= 1) {
			deepEmotion = "Happiness";
		} else if (rand <= 2) {
			deepEmotion = "Surprise";
		} else if (rand <= 4) {
			deepEmotion = "Sadness";
		} else if (rand <= 7) {
			deepEmotion = "Anger";
		} else if (rand <= 10) {
			deepEmotion = "Fear";
		} else {
			deepEmotion = "Disgust";
		}
		break;
	}
	var underlyingEmotion = "";
	var stressedEmotion = "";
	var expression = "";
	var externalExpression = "";
	var internalExpression = "";
	switch (deepEmotion) {
	case "Happiness":
		rand = Roll(2,12) + Roll(1,10) - 2;
		switch (rand) {
			case 1:
			case 2:
				externalExpression = "Disinhibited";
				internalExpression = "Content";
				expression = "Liberated";
				underlyingEmotion = "Joy";
				stressedEmotion = "Oppressed";
				break;
			case 3:
			case 4:
				externalExpression = "Hedonistic";
				internalExpression = "Blissful";
				expression = "Ecstatic";
				underlyingEmotion = "Joy";
				stressedEmotion = "Miserable";
				break;
			case 5:
			case 6:
				externalExpression = "Playful";
				internalExpression = "Bemused";
				expression = "Interested";
				underlyingEmotion = "Interest";
				stressedEmotion = "Serious";
				break;
			case 7:
			case 8:
				externalExpression = "Curious";
				internalExpression = "Evaluate";
				expression = "Inquisitive";
				underlyingEmotion = "Interest";
				stressedEmotion = "Serious";
				break;
			case 9:
			case 10:
				externalExpression = "Condescending";
				internalExpression = "Prideful";
				expression = "Proud";
				underlyingEmotion = "Pride";
				stressedEmotion = "Resentful";
				break;
			case 11:
			case 12:
				externalExpression = "Boastful";
				internalExpression = "Content";
				expression = "Confident";
				underlyingEmotion = "Pride";
				stressedEmotion = "Resentful";
				break;
			case 13:
			case 14:
				externalExpression = "Outgoing";
				internalExpression = "Content";
				expression = "Accepted";
				underlyingEmotion = "Acceptedness";
				stressedEmotion = "Worried";
				break;
			case 15:
			case 16:
				externalExpression = "Generous";
				internalExpression = "Blissful";
				expression = "Fulfilled";
				underlyingEmotion = "Acceptedness";
				stressedEmotion = "Worried";
				break;
			case 17:
			case 18:
				externalExpression = "Challenging";
				internalExpression = "Scheming";
				expression = "Powerful";
				underlyingEmotion = "Power";
				stressedEmotion = "Quiet";
				break;
			case 19:
			case 20:
				externalExpression = "Brave";
				internalExpression = "Brave";
				expression = "Courageous";
				underlyingEmotion = "Power";
				stressedEmotion = "Quiet";
				break;
			case 21:
			case 22:
				externalExpression = "Dreamer";
				internalExpression = "Daydreamer";
				expression = "Peaceful";
				underlyingEmotion = "Peace";
				stressedEmotion = "Depressed";
				break;
			case 23:
			case 24:
				externalExpression = "Parental";
				internalExpression = "Dutiful";
				expression = "Loving";
				underlyingEmotion = "Peace";
				stressedEmotion = "Depressed";
				break;
			case 25:
			case 26:
				externalExpression = "Flirtatious";
				internalExpression = "Sensual";
				expression = "Intimate";
				underlyingEmotion = "Intimacy";
				stressedEmotion = "Withdrawn";
				break;
			case 27:
			case 28:
				externalExpression = "Conscientious";
				internalExpression = "Intuitive";
				expression = "Sensitive";
				underlyingEmotion = "Intimacy";
				stressedEmotion = "Withdrawn";
				break;
			case 29:
			case 30:
				externalExpression = "Excited";
				internalExpression = "Driven";
				expression = "Optimistic";
				underlyingEmotion = "Optimism";
				stressedEmotion = "Sad";
				break;
			case 31:
			case 32:
				externalExpression = "Talkative";
				internalExpression = "Receptive";
				expression = "Open";
				underlyingEmotion = "Optimism";
				stressedEmotion = "Sad";
				break;
		}
		break;
	case "Surprise":
		rand = Roll(3,6) - 2;
		switch (rand) {
			case 1:
			case 2:
				externalExpression = "Questioning";
				internalExpression = "Stunned";
				expression = "Startled";
				underlyingEmotion = "Startle";
				stressedEmotion = "Shocked";
				break;
			case 3:
			case 4:
				externalExpression = "Pessimistic";
				internalExpression = "Unsure";
				expression = "Dismayed";
				underlyingEmotion = "Startle";
				stressedEmotion = "Shocked";
				break;
			case 5:
			case 6:
				externalExpression = "Jaded";
				internalExpression = "Saddened";
				expression = "Confused";
				underlyingEmotion = "Confusion";
				stressedEmotion = "Disillusioned";
				break;
			case 7:
			case 8:
				externalExpression = "Questioning";
				internalExpression = "Contemplative";
				expression = "Perplexed";
				underlyingEmotion = "Confusion";
				stressedEmotion = "Disillusioned";
				break;
			case 9:
			case 10:
				externalExpression = "Talkative";
				internalExpression = "Stunned";
				expression = "Amazed";
				underlyingEmotion = "Amazement";
				stressedEmotion = "Disappointed";
				break;
			case 11:
			case 12:
				externalExpression = "Fixated";
				internalExpression = "Stunned";
				expression = "Awed";
				underlyingEmotion = "Amazement";
				stressedEmotion = "Disappointed";
				break;
			case 13:
			case 14:
				externalExpression = "Optimistic";
				internalExpression = "Awaiting";
				expression = "Excited";
				underlyingEmotion = "Excitement";
				stressedEmotion = "Disappointed";
				break;
			case 15:
			case 16:
				externalExpression = "Neurotic";
				internalExpression = "Nervous";
				expression = "Energetic";
				underlyingEmotion = "Excitement";
				stressedEmotion = "Disappointed";
				break;
		}
		break;
	case "Sadness":
		rand = Roll(2,10) + Roll(1,6) - 2;
		switch (rand) {
			case 1:
			case 2:
				externalExpression = "Hostile";
				internalExpression = "Ashamed";
				expression = "Fear";
				underlyingEmotion = "Guilt";
				stressedEmotion = "Defensive";
				break;
			case 3:
			case 4:
				externalExpression = "Defensive";
				internalExpression = "Untrusting";
				expression = "Disrespected";
				underlyingEmotion = "Guilt";
				stressedEmotion = "Defensive";
				break;
			case 5:
			case 6:
				externalExpression = "Desperate";
				internalExpression = "Lonely";
				expression = "Rejected";
				underlyingEmotion = "Abandonment";
				stressedEmotion = "Desperate";
				break;
			case 7:
			case 8:
				externalExpression = "Defensive";
				internalExpression = "Nervous";
				expression = "Inadequate";
				underlyingEmotion = "Abandonment";
				stressedEmotion = "Desperate";
				break;
			case 9:
			case 10:
				externalExpression = "Motivated";
				internalExpression = "Meek";
				expression = "Submissive";
				underlyingEmotion = "Despair";
				stressedEmotion = "Defeated";
				break;
			case 11:
			case 12:
				externalExpression = "Needy";
				internalExpression = "Meek";
				expression = "Worthless";
				underlyingEmotion = "Despair";
				stressedEmotion = "Defeated";
				break;
			case 13:
			case 14:
				externalExpression = "Motivated";
				internalExpression = "Subservient";
				expression = "Insecure";
				underlyingEmotion = "Depression";
				stressedEmotion = "Obedient";
				break;
			case 15:
			case 16:
				externalExpression = "Defensive";
				internalExpression = "Nervous";
				expression = "Inadequate";
				underlyingEmotion = "Depression";
				stressedEmotion = "Obedient";
				break;
			case 17:
			case 18:
				externalExpression = "Worried";
				internalExpression = "Nervous";
				expression = "Anxious";
				underlyingEmotion = "Loneliness";
				stressedEmotion = "Frightened";
				break;
			case 19:
			case 20:
				externalExpression = "Frazzled";
				internalExpression = "Lost";
				expression = "Overwhelmed";
				underlyingEmotion = "Loneliness";
				stressedEmotion = "Frightened";
				break;
			case 21:
			case 22:
				externalExpression = "Frightened";
				internalExpression = "Jumpy";
				expression = "Scared";
				underlyingEmotion = "Boredom";
				stressedEmotion = "Frightened";
				break;
			case 23:
			case 24:
				externalExpression = "Hysterical";
				internalExpression = "Jumpy";
				expression = "Terrified";
				underlyingEmotion = "Boredom";
				stressedEmotion = "Frightened";
				break;
		}
		break;
	case "Anger":
		rand = Roll(2,12) + Roll(1,10) - 2;
		switch (rand) {
			case 1:
			case 2:
				externalExpression = "Tearful";
				internalExpression = "Withdrawn";
				expression = "Hurt";
				underlyingEmotion = "Hurt";
				stressedEmotion = "Tearful";
				break;
			case 3:
			case 4:
				externalExpression = "Defensive";
				internalExpression = "Embarrassed";
				expression = "Embarrassed";
				underlyingEmotion = "Hurt";
				stressedEmotion = "Tearful";
				break;
			case 5:
			case 6:
				externalExpression = "Jealous";
				internalExpression = "Seething";
				expression = "Threatened";
				underlyingEmotion = "Threatened";
				stressedEmotion = "Argumentative";
				break;
			case 7:
			case 8:
				externalExpression = "Hostile";
				internalExpression = "Worried";
				expression = "Insecure";
				underlyingEmotion = "Threatened";
				stressedEmotion = "Argumentative";
				break;
			case 9:
			case 10:
				externalExpression = "Hostile";
				internalExpression = "Worried";
				expression = "Hateful";
				underlyingEmotion = "Hatefulness";
				stressedEmotion = "Tearful";
				break;
			case 11:
			case 12:
				externalExpression = "Resentful";
				internalExpression = "Seething";
				expression = "Resentful";
				underlyingEmotion = "Hatefulness";
				stressedEmotion = "Tearful";
				break;
			case 13:
			case 14:
				externalExpression = "Enraged";
				internalExpression = "Seething";
				expression = "Mad";
				underlyingEmotion = "Mad";
				stressedEmotion = "Violent";
				break;
			case 15:
			case 16:
				externalExpression = "Furious";
				internalExpression = "Seething";
				expression = "Furious";
				underlyingEmotion = "Mad";
				stressedEmotion = "Violent";
				break;
			case 17:
			case 18:
				externalExpression = "Confrontational";
				internalExpression = "Wary";
				expression = "Aggressive";
				underlyingEmotion = "Agression";
				stressedEmotion = "Aggressive";
				break;
			case 19:
			case 20:
				externalExpression = "Aggressive";
				internalExpression = "Seething";
				expression = "Hostile";
				underlyingEmotion = "Agression";
				stressedEmotion = "Aggressive";
				break;
			case 21:
			case 22:
				externalExpression = "Furious";
				internalExpression = "Edgy";
				expression = "Frustrated";
				underlyingEmotion = "Frustration";
				stressedEmotion = "Violent";
				break;
			case 23:
			case 24:
				externalExpression = "Irritated";
				internalExpression = "Edgy";
				expression = "Irritated";
				underlyingEmotion = "Frustration";
				stressedEmotion = "Violent";
				break;
			case 25:
			case 26:
				externalExpression = "Rejecting";
				internalExpression = "Withdrawn";
				expression = "Distant";
				underlyingEmotion = "Distance";
				stressedEmotion = "Snappy";
				break;
			case 27:
			case 28:
				externalExpression = "Suspicious";
				internalExpression = "Edgy";
				expression = "Suspicious";
				underlyingEmotion = "Distance";
				stressedEmotion = "Snappy";
				break;
			case 29:
			case 30:
				externalExpression = "Interrogating";
				internalExpression = "Skeptical";
				expression = "Critical";
				underlyingEmotion = "Critical";
				stressedEmotion = "Angry";
				break;
			case 31:
			case 32:
				externalExpression = "Sarcastic";
				internalExpression = "Wry";
				expression = "Sarcastic";
				underlyingEmotion = "Critical";
				stressedEmotion = "Angry";
				break;
		}
		break;
	case "Fear":
		rand = Roll(2,10) + Roll(1,6) - 2;
		switch (rand) {
			case 1:
			case 2:
				externalExpression = "Hostile";
				internalExpression = "Ashamed";
				expression = "Fear";
				underlyingEmotion = "Humiliation";
				stressedEmotion = "Defensive";
				break;
			case 3:
			case 4:
				externalExpression = "Defensive";
				internalExpression = "Untrusting";
				expression = "Disrespected";
				underlyingEmotion = "Humiliation";
				stressedEmotion = "Defensive";
				break;
			case 5:
			case 6:
				externalExpression = "Desperate";
				internalExpression = "Lonely";
				expression = "Rejected";
				underlyingEmotion = "Rejection";
				stressedEmotion = "Desperate";
				break;
			case 7:
			case 8:
				externalExpression = "Defensive";
				internalExpression = "Nervous";
				expression = "Inadequate";
				underlyingEmotion = "Rejection";
				stressedEmotion = "Desperate";
				break;
			case 9:
			case 10:
				externalExpression = "Motivated";
				internalExpression = "Meek";
				expression = "Submissive";
				underlyingEmotion = "Submission";
				stressedEmotion = "Defeated";
				break;
			case 11:
			case 12:
				externalExpression = "Needy";
				internalExpression = "Meek";
				expression = "Worthless";
				underlyingEmotion = "Submission";
				stressedEmotion = "Defeated";
				break;
			case 13:
			case 14:
				externalExpression = "Motivated";
				internalExpression = "Subservient";
				expression = "Insecure";
				underlyingEmotion = "Insecure";
				stressedEmotion = "Obedient";
				break;
			case 15:
			case 16:
				externalExpression = "Defensive";
				internalExpression = "Nervous";
				expression = "Inadequate";
				underlyingEmotion = "Insecure";
				stressedEmotion = "Obedient";
				break;
			case 17:
			case 18:
				externalExpression = "Worried";
				internalExpression = "Nervous";
				expression = "Anxious";
				underlyingEmotion = "Anxiety";
				stressedEmotion = "Frightened";
				break;
			case 19:
			case 20:
				externalExpression = "Frazzled";
				internalExpression = "Lost";
				expression = "Overwhelmed";
				underlyingEmotion = "Anxiety";
				stressedEmotion = "Frightened";
				break;
			case 21:
			case 22:
				externalExpression = "Frightened";
				internalExpression = "Jumpy";
				expression = "Scared";
				underlyingEmotion = "Scared";
				stressedEmotion = "Frightened";
				break;
			case 23:
			case 24:
				externalExpression = "Hysterical";
				internalExpression = "Jumpy";
				expression = "Terrified";
				underlyingEmotion = "Scared";
				stressedEmotion = "Frightened";
				break;
		}
		break;
	case "Disgust":
		rand = Roll(3,6) - 2;
		switch (rand) {
			case 1:
			case 2:
				externalExpression = "Critical";
				internalExpression = "Disapproval";
				expression = "Disapproval";
				underlyingEmotion = "Disapproval";
				stressedEmotion = "Withdrawn";
				break;
			case 3:
			case 4:
				externalExpression = "Argumentative";
				internalExpression = "Seething";
				expression = "Loathing";
				underlyingEmotion = "Disapproval";
				stressedEmotion = "Withdrawn";
				break;
			case 5:
			case 6:
				externalExpression = "Disgusted";
				internalExpression = "Disapproving";
				expression = "Disappointment";
				underlyingEmotion = "Disappointment";
				stressedEmotion = "Withdrawn";
				break;
			case 7:
			case 8:
				externalExpression = "Revolted";
				internalExpression = "Disapproving";
				expression = "Revolted";
				underlyingEmotion = "Disappointment";
				stressedEmotion = "Withdrawn";
				break;
			case 9:
			case 10:
				externalExpression = "Revolted";
				internalExpression = "Avoidant";
				expression = "Awful";
				underlyingEmotion = "Awful";
				stressedEmotion = "Leave";
				break;
			case 11:
			case 12:
				externalExpression = "Critical";
				internalExpression = "Avoidant";
				expression = "Detestable";
				underlyingEmotion = "Awful";
				stressedEmotion = "Leave";
				break;
			case 13:
			case 14:
				externalExpression = "Critical";
				internalExpression = "Avoidant";
				expression = "Avoidance";
				underlyingEmotion = "Avoidance";
				stressedEmotion = "Leave";
				break;
			case 15:
			case 16:
				externalExpression = "Unsure";
				internalExpression = "Hesitant";
				expression = "Hesitance";
				underlyingEmotion = "Avoidance";
				stressedEmotion = "Leave";
				break;
		}
		break;
	}
	return {
		DeepEmotion: deepEmotion,
		UnderlyingEmotion: underlyingEmotion,
		StressedEmotion: stressedEmotion,
		Expression: expression,
		ExternalExpression: externalExpression,
		InternalExpression: internalExpression
	};
};

var GetMoodiness = function() {
	var rand = Roll(1,100);
	if (rand <= 33) {
		return "Labile - quick to experience strong emotions";
	} else if (rand <= 66) {
		return "Even-tempered";
	} else {
		return "Phlegmatic - emotionally steady and low-key";
	}
};

var GetCoreTraits = function() {
	var traits = [];
	var v = {
		Type: "Outlook",
		TypeDescription: "Outlook is one's basic worldview, interpreting the world as being essentially good or bad.",
		Value: "",
		ValueDescription: ""
	};
	var rand = Math.floor((Roll(1,8) + Roll(1,12))/2);
	if (rand <= 3) {
		v.Value = "Very Optimistic";
		v.ValueDescription = "Idealistic, confident, trusting, hopeful, upbeat";
	} else if (rand <= 7) {
		v.Value = "Slightly Optimistic";
		v.ValueDescription = "Idealistic, confident, trusting, hopeful, upbeat";
	} else if (rand <= 11) {
		v.Value = "Slightly Pessimistic";
		v.ValueDescription = "Cynical, bleak, distrustful, foreboding, resigned";
	} else {
		v.Value = "Very Pessimistic";
		v.ValueDescription = "Cynical, bleak, distrustful, foreboding, resigned";
	}
	traits.push(v);
	v = {
		Type: "Integrity",
		TypeDescription: "Basic values regarding work and social interactions.",
		Value: "",
		ValueDescription: ""
	};
	rand = Math.floor((Roll(1,8) + Roll(1,12))/2);
	if (rand <= 3) {
		v.Value = "Very Conscientious";
		v.ValueDescription = "Industrious, honest, responsible, meticulous, pragmatic";
	} else if (rand <= 7) {
		v.Value = "Slightly Conscientious";
		v.ValueDescription = "Industrious, honest, responsible, meticulous, pragmatic";
	} else if (rand <= 11) {
		v.Value = "Slightly Unscrupulous";
		v.ValueDescription = "Lazy, deceitful, unreliable, manipulative, slipshod, impractical";
	} else {
		v.Value = "Very Unscrupulous";
		v.ValueDescription = "Lazy, deceitful, unreliable, manipulative, slipshod, impractical";
	}
	traits.push(v);
	v = {
		Type: "Impulsiveness",
		TypeDescription: "The ability to regulate one's thoughts and actions.",
		Value: "",
		ValueDescription: ""
	};
	rand = Math.floor((Roll(1,8) + Roll(1,12))/2);
	if (rand <= 3) {
		v.Value = "Very Controlled";
		v.ValueDescription = "Deliberate, focused, steady, thoughtful";
	} else if (rand <= 7) {
		v.Value = "Slightly Controlled";
		v.ValueDescription = "Deliberate, focused, steady, thoughtful";
	} else if (rand <= 11) {
		v.Value = "Slightly Spontaneous";
		v.ValueDescription = "Capricious, flighty, hyperactive, rash";
	} else {
		v.Value = "Very Spontaneous";
		v.ValueDescription = "Capricious, flighty, hyperactive, rash";
	}
	traits.push(v);
	v = {
		Type: "Boldness",
		TypeDescription: "Willingness to face danger and enter into battle.",
		Value: "",
		ValueDescription: ""
	};
	rand = Math.floor((Roll(1,8) + Roll(1,12))/2);
	if (rand <= 3) {
		v.Value = "Very Intrepid";
		v.ValueDescription = "Daring, reckless, valorous, dauntless, audacious, confident";
	} else if (rand <= 7) {
		v.Value = "Slightly Intrepid";
		v.ValueDescription = "Daring, reckless, valorous, dauntless, audacious, confident";
	} else if (rand <= 11) {
		v.Value = "Slightly Cautious";
		v.ValueDescription = "Timid, paranoid, vigilant, nervous, tentative";
	} else {
		v.Value = "Very Cautious";
		v.ValueDescription = "Timid, paranoid, vigilant, nervous, tentative";
	}
	traits.push(v);
	v = {
		Type: "Agreeableness",
		TypeDescription: "General attitude towards people and the ability to handle new situations, tough choices, and interpersonal conflicts.",
		Value: "",
		ValueDescription: ""
	};
	rand = Math.floor((Roll(1,8) + Roll(1,12))/2);
	if (rand <= 3) {
		v.Value = "Very Agreeable";
		v.ValueDescription = "Warm, empathic, tolerant, forgiving, open-minded, adaptable, altruistic";
	} else if (rand <= 7) {
		v.Value = "Slightly Agreeable";
		v.ValueDescription = "Warm, empathic, tolerant, forgiving, open-minded, adaptable, altruistic";
	} else if (rand <= 11) {
		v.Value = "Slightly Disagreeable";
		v.ValueDescription = "Cold, rigid, tense, intractable, narrow-minded, cantankerous, stingy";
	} else {
		v.Value = "Very Disagreeable";
		v.ValueDescription = "Cold, rigid, tense, intractable, narrow-minded, cantankerous, stingy";
	}
	traits.push(v);
	v = {
		Type: "Interactivity",
		TypeDescription: "Style and degree to which your character interacts with others.",
		Value: "",
		ValueDescription: ""
	};
	rand = Math.floor((Roll(1,8) + Roll(1,12))/2);
	if (rand <= 3) {
		v.Value = "Very Engaging";
		v.ValueDescription = "Talkative, candid, entertaining, touchy";
	} else if (rand <= 7) {
		v.Value = "Slightly Engaging";
		v.ValueDescription = "Talkative, candid, entertaining, touchy";
	} else if (rand <= 11) {
		v.Value = "Slightly Reserved";
		v.ValueDescription = "Shy, loner, taciturn, evasive, cryptic";
	} else {
		v.Value = "Very Reserved";
		v.ValueDescription = "Shy, loner, taciturn, evasive, cryptic";
	}
	traits.push(v);
	v = {
		Type: "Conformity",
		TypeDescription: "Basic relationship with cultural norms.",
		Value: "",
		ValueDescription: ""
	};
	rand = Math.floor((Roll(1,8) + Roll(1,12))/2);
	if (rand <= 3) {
		v.Value = "Very Conventional";
		v.ValueDescription = "Orthodox, formal, down-to-earth, mainstream, traditional";
	} else if (rand <= 7) {
		v.Value = "Slightly Conventional";
		v.ValueDescription = "Orthodox, formal, down-to-earth, mainstream, traditional";
	} else if (rand <= 11) {
		v.Value = "Slightly Heterodox";
		v.ValueDescription = "Rebellious, arty, shocking, freethinking, exotic";
	} else {
		v.Value = "Very Heterodox";
		v.ValueDescription = "Rebellious, arty, shocking, freethinking, exotic";
	}
	traits.push(v);
	return traits;
};

var GetHumor = function() {
	var rand = Roll(1,10);
	switch (rand) {
	case 1:
		return "Crude";
	case 2:
		return "Dry";
	case 3:
		return "Slapstick";
	case 4:
		return "Jokey";
	case 5:
		return "Cynical";
	case 6:
		return "Prankster";
	case 7:
		return "Mean-spirited";
	case 8:
		return "Gleeful";
	case 9:
		return "Surreal";
	case 10:
		return "None";
	}
};

var Quirks = [
	"Humming",
	"Dancing",
	"Sleepwalking",
	"Facial tics",
	"Exhibitionism",
	"Fingernail biting",
	"Eavesdropping",
	"Daydreaming",
	"Talking in sleep",
	"Stuttering",
	"Compulsive lying",
	"Whistling",
	"Name dropping",
	"Self-inflict pain/injury",
	"Mumbling",
	"Constant grooming",
	"Foot tapping",
	"Lip biting/licking",
	"Coin flipping",
	"Chewing (e.g. sticks, small bones)",
	"Knuckle cracking",
	"Collects odd things",
	"Singing",
	"Snacking (nuts, seeds, etc.)",
	"Reciting poetry",
	"Constant eating",
	"Pacing",
	"Blade sharpening",
	"Counting",
	"Hair pulling",
	"Snoring",
	"Walking backwards",
	"Teeth sucking",
	"Excessively touching others",
	"Substance use (non-addicted)",
	"Hair pulling",
	"Animal hater",
	"Insomnia",
	"Beard/hair stroking",
	"Nose picking",
	"Needless apologizing",
	"Exaggeration",
	"Superstitious (omens, luck, etc.)",
	"Belching",
	"Sleeping in odd places",
	"Repeating others",
	"Smelling things",
	"Teeth picking",
	"Stealing",
	"Tree climbing"
];

var Hobbies = [
	"Acrobatics",
	"Acting",
	"Astrology",
	"Music appreciation",
	"Theatre",
	"Gaming (e.g. chess)",
	"Boating/Sailing",
	"Collecting",
	"Calligraphy",
	"Cards",
	"Carving",
	"Combat competition",
	"Cooking",
	"Dancing",
	"Dicing",
	"Animal fighting",
	"Eating",
	"Drinking",
	"Embroidery",
	"Falconry",
	"Fishing",
	"Fortune-telling",
	"Singing",
	"Gambling",
	"Gardening",
	"Glassmaking",
	"Animal racing",
	"Horse riding",
	"Hunting",
	"Invention",
	"Jewelry making",
	"Jousting",
	"Juggling",
	"Metalwork",
	"Painting",
	"Philosophizing",
	"Reading",
	"Research",
	"Riddles",
	"Sewing",
	"Sports (Wrestling, racing, etc)",
	"Storytelling",
	"Swimming",
	"Art appreciation",
	"Weaving",
	"Woodworking",
	"Writing",
	"Playing an instrument",
	"Pipe smoking",
	"Bird watching"
];

var MentalDisorders = [
	"Addiction - Chronic, compulsive drug/activity indulgence, despite harmful consequences. Can decide if it is mild, moderate, or severe.",
	"Amnesia - Severe memory loss; can be loss before a certain point (retrograde) or after (anterograde).",
	"Bipolar Disorder - Erratic swings from periods of mania to major depression.",
	"PTSD - Anxiety disorder developed after exposure to a terrifying event or ordeal resulting in potential re-experiencing of the ordeal, nightmares, hypervigilance, trouble sleeping, being easily startled, and avoidance of anything that is a reminder of the event.",
	"Major Depression - Impaired physical functions (e.g., sleep, appetite); loss of interest and pleasure; low energy & motivation; possibly accompanied by severe pessimism, hopelessness, guilt, and suicidal thoughts/intent.",
	"Fugue - Abrupt travel away from home, an inability to remember important aspects of one's life, and the partial or complete adoption of a new identity.",
	"Hypochondria - Preoccupation with fears of having a serious disease or physical problem based on little or no real evidence.",
	"Schizophrenia - Delusions (unreal beliefs, e.g. savior complex or assigning unusual significance or meaning to normal events); hallucinations (unreal sensations, usually auditory, i.e. 'voices'); disorganized speech; grossly disorganized or catatonic behavior; paranoia.",
	"OCD - Obsessive-Compulsive Disorder described the existence of both regular compulsions (overwhelming need to engage in a ritualized behavior) and obsessions (persistent, often irrational, and seemingly uncontrollable thoughts).",
	"Phobia - Extreme anxiety and fear associated with an object or situation. Can include anything, for instance: specific monsters/animals, fire/water, heights, magic, open/enclosed spaces, heights, or darkness."
];

var GetQuirks = function() {
	var quirks = [];
	quirks.push(randomChoice(Quirks));
	while (Math.random() < 0.2) {
		q = randomChoice(Quirks);
		if (!quirks.includes(q)) {
			quirks.push(q);
		}
	}
	return quirks;
};

var GetHobbies = function() {
var hobbies = [];
	hobbies.push(randomChoice(Hobbies));
	while (Math.random() < 0.2) {
		q = randomChoice(Hobbies);
		if (!hobbies.includes(q)) {
			hobbies.push(q);
		}
	}
	return hobbies;
};

var GetMentalDisorders = function() {
	mentalDisorders = [];
	if (Math.random() < 0.05) {
		mentalDisorders.push(randomChoice(MentalDisorders));
		while (Math.random() < 0.1) {
			q = randomChoice(MentalDisorders);
			if (!mentalDisorders.includes(q)) {
				mentalDisorders.push(q);
			}
		}
	}
	return mentalDisorders;
};

var AllPrejudices = [
	"Males",
	"Females",
	"The Lower Class",
	"The Middle Class",
	"The Upper Class",
	"Babies",
	"Children",
	"Teenagers",
	"Young Adults",
	"Middle Aged People",
	"The Elderly",
	"Homosexuals",
	"Bisexuals",
	"Magic Users",
	"Dragonborn",
	"Dwarfs",
	"Elfs",
	"Gnomes",
	"Half-Elfs",
	"Half-Orcs",
	"Halflings",
	"Humans",
	"Tieflings",
	"Aarakocras",
	"Aasimars",
	"Bug Bears",
	"Firbolgs",
	"Goblins",
	"Grungs",
	"Hobgoblins",
	"Kenkus",
	"Kobolds",
	"Lizardfolks",
	"Orcs",
	"Tabaxis",
	"Tritons",
	"Yuan-Ti Purebloods",
	"Giths",
	"Changelings",
	"Eladrins",
	"Genasis",
	"Goliaths",
	"Minotaurs",
	"Shifters",
	"Warforged Creatures",
	"Fighters",
	"Rangers",
	"Clerics",
	"Rogues",
	"Wizards",
	"Bards",
	"Monks",
	"Sorcerers",
	"Warlocks",
	"Barbarians",
	"Paladins",
	"Druids",
	"Followers of Auril",
	"Followers of Azuth",
	"Followers of Bane",
	"Followers of Beshaba",
	"Followers of Bhaal",
	"Followers of Chauntea",
	"Followers of Cyric",
	"Followers of Deneir",
	"Followers of Eldath",
	"Followers of Gond",
	"Followers of Helm",
	"Followers of Ilmater",
	"Followers of Kelemvor",
	"Followers of Lathander",
	"Followers of Leira",
	"Followers of Lliira",
	"Followers of Loviatar",
	"Followers of Malar",
	"Followers of Mask",
	"Followers of Mielikki",
	"Followers of Milil",
	"Followers of Myrkul",
	"Followers of Mystra",
	"Followers of Oghma",
	"Followers of Savras",
	"Followers of Selûne",
	"Followers of Shar",
	"Followers of Silvanus",
	"Followers of Sune",
	"Followers of Talona",
	"Followers of Talos",
	"Followers of Tempus",
	"Followers of Torm",
	"Followers of Tymora",
	"Followers of Tyr",
	"Followers of Umberlee",
	"Followers of Waukeen",
	"Atheists",
	"Agnostics",
	"People with Careers with the Lesser Nobility",
	"People with Religious Careers",
	"People who work in the Legal/Judicial",
	"People with Careers in the Military",
	"People with Careers in Academics",
	"People work in the Merchant/Servicer industry",
	"People who work in the Agriculture industry",
	"People who work as Entertainers",
	"People who are known as a Scoundrel/Underclass",
];
var anyInclude = function(arr, str) {
	for (var i in arr) {
		if (arr[i].includes(str)) {
			return true;
		}
	}
	return false;
};

var GetPrejudices = function(race, cls, background, communityPrejudices) {
	var rand = Roll(1,12);
	var prejudices = [];
	var neededPredjudices = 0;
	if (rand <= 1) {
		neededPredjudices = Roll(1,2)-1;
	} else if (rand <= 3) {
		neededPredjudices = Roll(1,2)+1;
	} else if (rand <= 9) {
		neededPredjudices = Roll(1,2)+3;
	} else if (rand <= 11) {
		neededPredjudices = Roll(1,2)+5;
	} else {
		neededPredjudices = Roll(1,2)+7;
	}
	var i = 0;
	while (i < neededPredjudices) {
		if (i >= communityPrejudices.length) {
			pred = randomChoice(AllPrejudices);
		} else {
			pred = randomChoice(communityPrejudices);
		}
		if (!prejudices.includes(pred)) {
			prejudices.push(pred);
			i++;
		}
	}
	for (i=prejudices.length-1; i >= 0; i--) {
		if (prejudices[i].includes(race.Name) ||
			prejudices[i].includes(cls.Name) ||
			prejudices[i].includes(background.Occupation.Primary) ||
			prejudices[i].includes(background.Occupation.SocialClass) ||
			prejudices[i].includes(background.Gender) ||
			prejudices[i].includes(background.Sexuality) ||
			prejudices[i].includes(background.AgeGroup) ||
			(prejudices[i].includes("Magic Users") && cls.usesMagic)) {
				prejudices.splice(i, 1);
		}
	}
	return prejudices;
};

var gods = [
	"Auril",
	"Azuth",
	"Bane",
	"Beshaba",
	"Bhaal",
	"Chauntea",
	"Cyric",
	"Deneir",
	"Eldath",
	"Gond",
	"Helm",
	"Ilmater",
	"Kelemvor",
	"Lathander",
	"Leira",
	"Lliira",
	"Loviatar",
	"Malar",
	"Mask",
	"Mielikki",
	"Milil",
	"Myrkul",
	"Mystra",
	"Oghma",
	"Savras",
	"Selûne",
	"Shar",
	"Silvanus",
	"Sune",
	"Talona",
	"Talos",
	"Tempus",
	"Torm",
	"Tymora",
	"Tyr",
	"Umberlee",
	"Waukeen"
];

var GetReligion = function(race, cls, background, prejudices, isRural) {
	var rand = Roll(1, 20);
	var beliefSystem = "";
	if (rand <= 1) {
		beliefSystem = "Atheist";
	} else if (rand <= 2) {
		beliefSystem = "Animist";
	} else if (rand <= 4) {
		beliefSystem = "Monotheist -";
		god = randomChoice(gods);
		while (anyInclude(prejudices, god)) {
			god = randomChoice(gods);
		}
		beliefSystem += god;
	} else if (rand <= 17) {
		beliefSystem = "Polytheist - Emphesis in following - ";
		god = randomChoice(gods);
		while (anyInclude(prejudices, god)) {
			god = randomChoice(gods);
		}
		beliefSystem += god;
	} else if (rand <= 18) {
		beliefSystem = "Humanist";
	} else {
		beliefSystem = "Agnostic";
	}

	var tolerance = "";
	rand = Roll(1,100);
	if (rand <= 40) {
		tolerance = "Inclusive";
	} else if (rand <= 85) {
		tolerance = "Tolerant";
	} else {
		tolerance = "Intolerant";
	}

	var expression = "";
	rand = Roll(1,100);
	if (rand <= 55) {
		expression = "None";
	} else if (rand <= 94) {
		expression = "Occasional";
	} else {
		expression = "Constant";
	}

	var proselytization = "";
	rand = Roll(1,100);
	if (rand <= 65) {
		proselytization = "Never";
	} else if (rand <= 97) {
		proselytization = "Casual";
	} else {
		proselytization = "Aggressive";
	}

	var attitudeAbout = "";
	rand = Roll(1,100);
	if (rand <= 10) {
		attitudeAbout = "Irreverant";
	} else if (rand <= 45) {
		attitudeAbout = "Fearful";
	} else if (rand <= 55) {
		attitudeAbout = "Judgemental";
	} else  if (rand <= 90) {
		attitudeAbout = "Humble";
	} else {
		attitudeAbout = "Ecstatic";
	}

	var association = "";
	if (beliefSystem !== "Atheist"&& beliefSystem !== "Agnostic") {
		rand = Roll(1,100);
		if (rand <= 40) {
			association = "Church/Temple - Generally an established, hierarchical organization";
		} else if (rand <= 50) {
			association = "Cult - A large or small group usually attached to a single charismatic leader";
		} else if (rand <= 65) {
			association = "Fellowship - Small group(s) that lack formal organization and a charismatic leader";
		} else if (rand <= 85) {
			association = "Solitary - When a character either has unique beliefs or chooses not to affiliate religiously with others";
		} else {
			association = "Indigenous - Religious traditions within a cultural group, such as a family or village";
		}
	}
	if (beliefSystem === "Atheist"|| beliefSystem === "Agnostic"|| association.startsWith("Solitary")) {
		while (background.Occupation.Primary == "Religious") {
			background.Occupation = GetOccupation(isRural);
		}
	}

	var statWeights = {
		Strength: 0,
		Dexterity: 0,
		Constitution: 0,
		Intelligence: 0,
		Wisdom: 0,
		Charisma: 0
	};

	var religiousRole = "";
	var religiousRoleDescription = "";
	if (!association.startsWith("Solitary")) {
		if (background.Occupation.Primary == "Religious") {
			religiousRole = background.Occupation.Secondary;
		} else {
			if (Roll(1,100) <= 5) {
				if (rand < 7) {
					religiousRole = "Abbot/Abbess";
					religiousRoleDescription = "Leader of a monastery or convent.";
				} else if (rand < 13) {
					religiousRole = "Cult Leader";
					religiousRoleDescription = "Usually a charismatic head of a small group of highly devoted followers";
					statWeights.Charisma += 2;
				} else if (rand < 20) {
					religiousRole = "Disciple";
					religiousRoleDescription = "Dedicated follower of a religious teacher or leader";
				} else if (rand < 26) {
					religiousRole = "Guru";
					religiousRoleDescription = "Spiritual teacher";
				} else if (rand < 33) {
					religiousRole = "Hermit";
					religiousRoleDescription = "One who follows a solitary and isolated spiritual path";
				} else if (rand < 40) {
					religiousRole = "Inquisitor";
					religiousRoleDescription = "An official tasked with finding and 'correcting' people who have broken religious rules";
				} else if (rand < 46) {
					religiousRole = "Jihadist";
					religiousRoleDescription = "A religious warrior";
				} else if (rand < 53) {
					religiousRole = "Missionary";
					religiousRoleDescription = "Dedicated to converting others, usually in distant geographic areas";
				} else if (rand < 59) {
					religiousRole = "Monk/Nun";
					religiousRoleDescription = "Belongs to a monastery or convent";
				} else if (rand < 66) {
					religiousRole = "Patriarch/Matriarch";
					religiousRoleDescription = "Leader of an organized religion, such as a pope";
				} else if (rand < 73) {
					religiousRole = "Pilgrim";
					religiousRoleDescription = "One traveling to a holy site or landmark";
				} else if (rand < 79) {
					religiousRole = "Priest/Priestess";
					religiousRoleDescription = "Someone authorized to administer sacraments as an ordained member of a church";
				} else if (rand < 86) {
					religiousRole = "Prophet";
					religiousRoleDescription = "One inspired to utter revelations or predictions, often in service to a specific deity";
				} else if (rand < 93) {
					religiousRole = "Sacred Courtesan";
					religiousRoleDescription = "Has sex, often with strangers, in service to a religion and for a symbolic price";
				} else {
					religiousRole = "Shaman";
					religiousRoleDescription = "A medium between the material and spirit world who practices healing and divination";
				}
			} else {
				religiousRole = "Follower";
				religiousRoleDescription = "A generic follower of the religion";
			}
		}
	}

	return {
		BeliefSystem: beliefSystem,
		Tolerance: tolerance,
		Expression: expression,
		Proselytization: proselytization,
		AttitudeAbout: attitudeAbout,
		Association: association,
		ReligiousRole: religiousRole,
		ReligiousRoleDescription: religiousRoleDescription,
		StatWeights: statWeights
	};
};

var GetAffinity = function() {
	rand = Roll(1,8);
	console.log(rand);
	switch (rand) {
	case 1:
		rand2 = Roll(1,8);
		switch(rand2) {
		case 1:
		case 2:
			return {
				Category: "Attribute",
				Feature: "Strong",
				PositiveShift: "High Strength",
				NegativeShift: "Low Strength"
			};
		case 3:
			return {
				Category: "Attribute",
				Feature: "Agile",
				PositiveShift: "High Dexterity",
				NegativeShift: "Low Dexterity"
			};
		case 4:
			return {
				Category: "Attribute",
				Feature: "Healthy",
				PositiveShift: "High Constitution",
				NegativeShift: "Low Constitution"
			};
		case 5:
			return {
				Category: "Attribute",
				Feature: "Smart",
				PositiveShift: "High Intelligence",
				NegativeShift: "Low Intelligence"
			};
		case 6:
			return {
				Category: "Attribute",
				Feature: "Wise",
				PositiveShift: "High Wisdom",
				NegativeShift: "Low Wisdom"
			};
		case 7:
		case 8:
			return {
				Category: "Attribute",
				Feature: "Charismatic",
				PositiveShift: "High Charisma",
				NegativeShift: "Low Charisma"
			};
		}
		/* falls through */
	case 2:
		rand2 = Roll(1,10);
		switch(rand2) {
		case 1:
		case 2:
			return {
				Category: "Class",
				Feature: "Warrior",
				PositiveShift: "Fighter/Barbarian",
				NegativeShift: "None"
			};
		case 3:
			return {
				Category: "Class",
				Feature: "Holy Warrior",
				PositiveShift: "Cleric/Paladin",
				NegativeShift: "None"
			};
		case 4:
			return {
				Category: "Class",
				Feature: "Wild",
				PositiveShift: "Druid/Ranger",
				NegativeShift: "None"
			};
		case 5:
		case 6:
		case 7:
			return {
				Category: "Class",
				Feature: "Magical",
				PositiveShift: "Wizard/Sorcerer",
				NegativeShift: "None"
			};
		case 8:
			return {
				Category: "Class",
				Feature: "Rogue",
				PositiveShift: "Rogue",
				NegativeShift: "None"
			};
		case 9:
		case 10:
			return {
				Category: "Class",
				Feature: "Bard",
				PositiveShift: "Bard",
				NegativeShift: "None"
			};
		}
		/* falls through */
	case 3:
		rand2 = Roll(1,4);
		switch(rand2) {
		case 1:
			return {
				Category: "Fighting Type",
				Feature: "Warrior",
				PositiveShift: "Medium/Heavy Armor, Melee Primary Weapon",
				NegativeShift: "Unarmored, No Martial Weapons"
			};
		case 2:
			return {
				Category: "Fighting Type",
				Feature: "Holy Warrior",
				PositiveShift: "Medium/Heavy Armor, Holy Symbol",
				NegativeShift: "Warlocks, Druids, Barbarians"
			};
		case 3:
			return {
				Category: "Fighting Type",
				Feature: "Ranged Warrior",
				PositiveShift: "Ranged Primary Weapon",
				NegativeShift: "Unarmored, No Marial Weapons"
			};
		case 4:
			return {
				Category: "Fighting Type",
				Feature: "Spellcaster",
				PositiveShift: "No Martial Weapons, Wands, Component Pouch, Spell Focus",
				NegativeShift: "Medium/Heavy Armor, Martial Weapons"
			};
		}
		/* falls through */
	case 4:
		rand2 = Roll(1,10);
		switch(rand2) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			return {
				Category: "Social Class",
				Feature: "Upper Class",
				PositiveShift: "Fine Clothes, Jewelry, Signet",
				NegativeShift: "Ragged Clothes, Alms Box"
			};
		case 8:
			return {
				Category: "Social Class",
				Feature: "Middle Class",
				PositiveShift: "Trade goods, craftsman tools",
				NegativeShift: "Ragged Clothes, alms box"
			};
		case 9:
		case 10:
			return {
				Category: "Social Class",
				Feature: "Lower Class",
				PositiveShift: "Common clothes",
				NegativeShift: "Fine clothes, jewelery, signet"
			};
		}
		/* falls through */
	case 5:
		rand2 = Roll(1,8);
		switch(rand2) {
		case 1:
		case 2:
			return {
				Category: "Attribute Combination",
				Feature: "Physically Fit",
				PositiveShift: "High Strength, Constitution, and Dexterity",
				NegativeShift: "Low Strength"
			};
		case 3:
			return {
				Category: "Attribute Combination",
				Feature: "Intellectual",
				PositiveShift: "High Intelligence and Wisdom",
				NegativeShift: "Low Intelligence"
			};
		case 4:
		case 5:
			return {
				Category: "Attribute Combination",
				Feature: "Charming",
				PositiveShift: "High Charisma and Intelligence",
				NegativeShift: "Low Charisma"
			};
		case 6:
		case 7:
		case 8:
			return {
				Category: "Attribute Combination",
				Feature: "Physique",
				PositiveShift: "High Strength and Charisma",
				NegativeShift: "Low Strength or Charisma"
			};
		}
		/* falls through */
	case 6:
		rand2 = Roll(1,6);
		switch(rand2) {
		case 1:
			return {
				Category: "Background",
				Feature: "Common Upbringing",
				PositiveShift: "Background of farmer, laborer, etc",
				NegativeShift: "Noble background, fine clothes, jewelery, signet"
			};
		case 2:
			return {
				Category: "Background",
				Feature: "Scholar",
				PositiveShift: "Background of sage, scholar, scribe, etc",
				NegativeShift: "Common or traveler's garb, tools, medium/heavy armor"
			};
		case 3:
			return {
				Category: "Background",
				Feature: "Far Traveller",
				PositiveShift: "Uncommon race (unless regional prejudice), unusual clothes, unique equipment",
				NegativeShift: "None"
			};
		case 4:
			return {
				Category: "Background",
				Feature: "Crooked Past",
				PositiveShift: "Background of criminal, etc. Rogue class",
				NegativeShift: "Noble background, fine clothes, signet"
			};
		case 5:
			return {
				Category: "Background",
				Feature: "Victim",
				PositiveShift: "Background of afflicted, feral, etc. Prominent scars",
				NegativeShift: "Fine clothes, noble"
			};
		case 6:
			return {
				Category: "Background",
				Feature: "Savage",
				PositiveShift: "Tribal background or similar, druid, clothing unique to tribe",
				NegativeShift: "Noble, fine clothes"
			};
		}
		/* falls through */
	case 7:
		rand2 = Roll(1,4);
		switch(rand2) {
		case 1:
			return {
				Category: "Skills",
				Feature: "Linguist",
				PositiveShift: "Speaks more than 3 languages, including a langauge the NPC knows that is not common",
				NegativeShift: "Does not speak a language the NPC knows aside from common"
			};
		case 2:
			return {
				Category: "Skills",
				Feature: "Craftsman",
				PositiveShift: "Artisan's tools, high quality items",
				NegativeShift: "None"
			};
		case 3:
			return {
				Category: "Skills",
				Feature: "Literate",
				PositiveShift: "Books, scrolls, writing supplies",
				NegativeShift: "Illiterate"
			};
		case 4:
			return {
				Category: "Skills",
				Feature: "Mage",
				PositiveShift: "Spellcasting ability",
				NegativeShift: "No spellcasting ability"
			};
		}
		/* falls through */
	case 8:
		rand2 = Roll(1,10);
		switch(rand2) {
		case 1:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Driven",
				PositiveShift: "Charges into battle, does not retreat or hesitate",
				NegativeShift: "Plans actions accordingly, watches battle cautiously"
			};
		case 2:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Healthy",
				PositiveShift: "High Constitution, no exhaustion",
				NegativeShift: "Has a disease, exhaustion, low Constitution"
			};
		case 3:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Learned",
				PositiveShift: "High intelligence, scribe, Acolyte, scholar, etc",
				NegativeShift: "Medium/Heavy armor, martial weapons"
			};
		case 4:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Roll Model",
				PositiveShift: "High Charisma, Lawful alignment",
				NegativeShift: "Warlock, Chaotic alignment"
			};
		case 5:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Wild Protector",
				PositiveShift: "Druid, Ranger",
				NegativeShift: "Fine clothes, metal armor"
			};
		case 6:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Ruthless",
				PositiveShift: "Evil alignment",
				NegativeShift: "Good alignment, Virtuous ideal"
			};
		case 7:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Pure",
				PositiveShift: "Good alignment, virtuous ideal",
				NegativeShift: "Evil alignment, ideal that is a vice"
			};
		case 8:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Tactition",
				PositiveShift: "Plans actions accordingly, watches battle cautiously",
				NegativeShift: "Charges into battle, does not retreat or hesitate"
			};
		case 9:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Clever Conniver",
				PositiveShift: "Successfully fool npc or pc, high intelligence, high deception",
				NegativeShift: "Paladin, Cleric, virtuous ideals"
			};
		case 10:
			return {
				Category: "Characteristic/Behavior",
				Feature: "Weathly",
				PositiveShift: "Wealth, Noble background, jewelery",
				NegativeShift: "Common clothing, worn armor/equipment"
			};
		}
	}
};

var isValidAffinity = function(affinity, prejudices) {
	return true;
};

var GetAffinities = function(prejudices) {
	var affinity = GetAffinity();
	while (!isValidAffinity(affinity, prejudices)) {
		affinity = GetAffinity();
	}
	return affinity;
};

var capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

var GetComplextion = function() {
	var rand = Roll(1,20);
	if (rand <= 1) {
		return "very dark";
	} else if (rand <= 5) {
		return "dark";
	} else if (rand <= 6) {
		return "";
	} else if (rand <= 16) {
		return "pale";
	} else {
		return "very pale";
	}
};

var GetHairColor = function(complextion) {
	var rand = Roll(1,20);
	if (complextion.includes("dark") || (complextion === ""&& Math.random() < 0.5)) {
		if (rand <= 1) {
			return "white";
		} else if (rand <= 2) {
			return "blonde";
		} else if (rand <= 4) {
			return "light brown";
		} else if (rand <= 8) {
			return "medium brown";
		} else if (rand <= 14) {
			return "dark brown";
		} else {
			return "black";
		}
	} else {
		if (rand <= 2) {
			return "white";
		} else if (rand <= 8) {
			return "blonde";
		} else if (rand <= 12) {
			return "light brown";
		} else if (rand <= 15) {
			return "medium brown";
		} else if (rand <= 17) {
			return "dark brown";
		} else if (rand <= 18) {
			return "black";
		} else if (rand <= 19) {
			return "dark red";
		} else {
			return "light red";
		}
	}
};

var GetHairStyle = function(gender) {
	if (gender === "Male") {
		rand = Roll(1,10);
		if (rand <= 1) {
			return "shaved";
		} else if (rand <= 5) {
			return "short";
		} else if (rand <= 8) {
			return "medium";
		} else {
			return "long";
		}
	} else {
		rand = Roll(1,20);
		if (rand <= 1) {
			return "shaved";
		} else if (rand <= 5) {
			return "short";
		} else if (rand <= 11) {
			return "medium";
		} else if (rand <= 19) {
			return "long";
		} else {
			return "very long";
		}
	}
};

var GetFacialHair = function() {
	rand = Roll(1,20);
	if (rand <= 1) {
		return "bushy beard";
	} else if (rand <= 2) {
		return "bushy mustashe";
	} else if (rand <= 9) {
		return "clean-shaven face";
	} else if (rand <= 11) {
		return "goatee";
	} else if (rand <= 13) {
		return "thin mustache";
	} else if (rand <= 18) {
		return "scraggly beard";
	} else {
		return "well-maintained beard";
	}
};

var GetFeature = function(gender) {
	if (gender === "Male") {
		rand = Roll(1,100);
		if (rand <= 4) {
			return "a bald spot";
		} else if (rand <= 6) {
			return "beautiful eyes";
		} else if (rand <= 10) {
			return "a birthmark";
		} else if (rand <= 23) {
			return "clear skin";
		} else if (rand <= 27) {
			return "crooked teeth";
		} else if (rand <= 31) {
			return "freckles";
		} else if (rand <= 34) {
			return "a limp";
		} else if (rand <= 35) {
			return "a missing eye";
		} else if (rand <= 48) {
			return "nice hair";
		} else if (rand <= 50) {
			return "one or more missing teeth";
		} else if (rand <= 63) {
			return "perfect teeth";
		} else if (rand <= 75) {
			return "pox marks";
		} else if (rand <= 87) {
			return "scars";
		} else {
			return "a strong jaw";
		}
	} else {
		rand = Roll(1,100);
		if (rand <= 1) {
			return "a bald spot";
		} else if (rand <= 6) {
			return "beautiful eyes";
		} else if (rand <= 13) {
			return "a birthmark";
		} else if (rand <= 23) {
			return "clear skin";
		} else if (rand <= 27) {
			return "crooked teeth";
		} else if (rand <= 31) {
			return "freckles";
		} else if (rand <= 34) {
			return "a limp";
		} else if (rand <= 35) {
			return "a missing eye";
		} else if (rand <= 48) {
			return "nice hair";
		} else if (rand <= 49) {
			return "one or more missing teeth";
		} else if (rand <= 63) {
			return "perfect teeth";
		} else if (rand <= 75) {
			return "pox marks";
		} else if (rand <= 87) {
			return "scars";
		} else {
			return "a strong jaw";
		}
	}
};

var GetFeatures = function(gender) {
	var features = [];
	if (Math.random() < 0.6) {
		feature = GetFeature(gender);
		features.push(feature);
		while (Math.random() < 0.2) {
			feature = GetFeature(gender);
			if (!features.includes(feature)) {
				features.push(feature);
			}
		}
	}
	return features;
};

var GetBuild = function() {
	rand = Roll(1,20);
	if (rand <= 1) {
		return "a sickly and frail";
	} else if (rand <= 5) {
		return "a thin";
	} else if (rand <= 13) {
		return "an averagely built";
	} else if (rand <= 17) {
		return "a stocky";
	} else if (rand <= 19) {
		return "an overweight";
	} else {
		return "an obese";
	}
};

var GetDress = function(genderPossessivePronoun) {
	rand = Roll(1,100);
	if (rand <= 4) {
		return "above "+ genderPossessivePronoun + " station";
	} else if (rand <= 13) {
		return "below "+ genderPossessivePronoun + " station";
	} else if (rand <= 22) {
		return "conservatively";
	} else if (rand <= 73) {
		return "in average garments for "+ genderPossessivePronoun + " station and the local fashion";
	} else if (rand <= 82) {
		return "in fine but outdated clothes";
	} else if (rand <= 86) {
		return "in the latest fashion";
	} else if (rand <= 95) {
		return "in worn and outdated clothes";
	} else if (rand <= 96) {
		return "oddly";
	} else {
		return "salaciously";
	}
};

var GetGenderPronoun = function(gender) {
	 return gender === "Male"? "he": "she";
};
var GetGenderPossessivePronoun = function(gender) {
	return gender === "Male"? "his": "her";
};
var GetGenderObjectPronoun = function(gender) {
	return gender === "Male"? "him": "her";
};

var GetNPCDescription = function(gender, ageCategory, race) {
	var ageDescriptor = "";
	if (ageCategory == "Child") {
		ageCategory = race.Name + " "+ (gender === "Male"? "boy": "girl");
	} else if (ageCategory == "Young Adult") {
		ageCategory = "young "+ race.Name + " "+ (gender === "Male"? "man": "woman");
	} else if (ageCategory == "Middle Aged") {
		ageCategory = race.Name + " "+ (gender === "Male"? "man": "woman");
	} else if (ageCategory == "Old") {
		ageCategory = "old "+ race.Name + " "+ (gender === "Male"? "man": "woman");
	} else if (ageCategory == "Venerable") {
		ageCategory = "very old "+ race.Name + " "+ (gender === "Male"? "man": "woman");
	}
	var genderPronoun = GetGenderPronoun(gender);
	var genderPossessivePronoun = GetGenderPossessivePronoun(gender);
	var complextion = GetComplextion();
	var hairColor = GetHairColor(complextion);
	var hairStyle = GetHairStyle(gender);
	var hair = "";
	if (hairStyle === "shaved") {
		hair = "a "+ hairStyle + " head";
	} else {
		hair = hairStyle + " "+ hairColor;
		hair += " hair";
	}
	if (gender === "Male") {
		hair += " and a "+ GetFacialHair();
	}
	var features = GetFeatures(gender);
	var build = GetBuild();
	var dress = GetDress(genderPossessivePronoun);
	return capitalizeFirstLetter(build) + (complextion !== ""? ", "+ complextion : "") + " "+ ageCategory + ". "+ capitalizeFirstLetter(genderPronoun) + " has "+ hair + ". "+ (features.length > 0 ? ""+ capitalizeFirstLetter(genderPronoun) + " has "+ features.join(" and ") + ". ": "") + ""+ capitalizeFirstLetter(genderPronoun) + " is dressed "+ dress + ".";
};

var SkillMap = {
	"Athletics": "Strength",
	"Acrobatics": "Dexterity",
	"Sleight of Hand": "Dexterity",
	"Stealth": "Dexterity",
	"Arcana": "Intelligence",
	"History": "Intelligence",
	"Investigation": "Intelligence",
	"Nature": "Intelligence",
	"Religion": "Intelligence",
	"Animal Handling": "Wisdom",
	"Insight": "Wisdom",
	"Medicine": "Wisdom",
	"Perception": "Wisdom",
	"Survival": "Wisdom",
	"Deception": "Charisma",
	"Intimidation": "Charisma",
	"Performance": "Charisma",
	"Persuasion": "Charisma"
};

var GetNPCStats = function(race, cls, background, religion) {
	var statWeights = {
		Strength: 0,
		Dexterity: 0,
		Constitution: 0,
		Intelligence: 0,
		Wisdom: 0,
		Charisma: 0
	};
	var statModifiers = {
		Strength: 0,
		Dexterity: 0,
		Constitution: 0,
		Intelligence: 0,
		Wisdom: 0,
		Charisma: 0
	};
	switch (background.AgeCategory) {
		case "Old":
			statModifiers.Strength -= 1;
			statModifiers.Dexterity -= 1;
			statModifiers.Constitution -= 1;
			statModifiers.Intelligence += 1;
			statModifiers.Wisdom += 1;
			statModifiers.Charisma += 1;
			break;
		case "Venerable":
			statModifiers.Strength -= 2;
			statModifiers.Dexterity -= 2;
			statModifiers.Constitution -= 2;
			statModifiers.Intelligence += 2;
			statModifiers.Wisdom += 2;
			statModifiers.Charisma += 2;
			break;
	}
	for (var key in race.StatModifiers) {
		statModifiers[key] += race.StatModifiers[key];
	}
	for (key in cls.StatWeights) {
		statWeights[key] += cls.StatWeights[key];
	}
	for (key in background.Occupation.StatWeights) {
		statWeights[key] += background.Occupation.StatWeights;
	}
	for (key in religion.StatWeights) {
		statWeights[key] += religion.StatWeights;
	}
	skillProficiencies = new Set();
	for (var i in race.SkillProficiencies) {
		skillProficiencies.add(race.SkillProficiencies[i]);
	}
	for (i in cls.SkillProficiencies) {
		skillProficiencies.add(cls.SkillProficiencies[i]);
	}
	for (i in background.SkillProficiencies) {
		skillProficiencies.add(background.SkillProficiencies[i]);
	}
	skillProficiencies.forEach(function(i) {
		statWeights[SkillMap[i]] += 0.25;
	});

	for (key in statWeights) {
		statWeights[key] += Roll(1,3) - 1;
	}

	var rolls = [
		[Roll(1,6),Roll(1,6),Roll(1,6),Roll(1,6)],
		[Roll(1,6),Roll(1,6),Roll(1,6),Roll(1,6)],
		[Roll(1,6),Roll(1,6),Roll(1,6),Roll(1,6)],
		[Roll(1,6),Roll(1,6),Roll(1,6),Roll(1,6)],
		[Roll(1,6),Roll(1,6),Roll(1,6),Roll(1,6)],
		[Roll(1,6),Roll(1,6),Roll(1,6),Roll(1,6)]
	];
	for (i in rolls) {
		rolls[i].sort();
		rolls[i].splice(0,1);
		rolls[i] = rolls[i][0] + rolls[i][1] + rolls[i][2];
	}
	rolls.sort();
	rolls[0] += race.StatExtras + cls.StatExtras;
	if (rolls[0] > 20) {
		rolls[1] += rolls[0] - 20;
		rolls[0] = 20;
	}
	if (rolls[1] > 20) {
		rolls[2] += rolls[1] - 20;
		rolls[1] = 20;
	}
	if (rolls[2] > 20) {
		rolls[3] += rolls[2] - 20;
		rolls[2] = 20;
	}
	if (rolls[3] > 20) {
		rolls[4] += rolls[3] - 20;
		rolls[3] = 20;
	}
	if (rolls[4] > 20) {
		rolls[5] += rolls[4] - 20;
		rolls[4] = 20;
	}


	statWeights = [["Strength", statWeights.Strength], ["Dexterity", statWeights.Dexterity], ["Constitution", statWeights.Constitution], ["Intelligence", statWeights.Intelligence], ["Wisdom", statWeights.Wisdom], ["Charisma", statWeights.Charisma]].sort(function(a, b) {
		if (a[1] != b[1]) {
			return a[1] - b[1];
		} else {
			return 0.5 - Math.random();
		}
	});

	stats = {};
	for (i in statWeights) {
		stats[statWeights[i][0]] = rolls[i];
	}

	var modifiers = {
		Strength: Math.floor((stats.Strength-10)/2),
		Dexterity: Math.floor((stats.Dexterity-10)/2),
		Constitution: Math.floor((stats.Constitution-10)/2),
		Intelligence: Math.floor((stats.Intelligence-10)/2),
		Wisdom: Math.floor((stats.Wisdom-10)/2),
		Charisma: Math.floor((stats.Charisma-10)/2),
	};

	var ac = Math.max(race.NaturalArmor, 10) + modifiers.Dexterity;
	var hp = 0;
	for (i = 0; i < cls.Level; i++) {
		hp += Math.max(1, Roll(1, cls.HitDice) + modifiers.Constitution);
	}

	for (i in modifiers) {
		if (modifiers[i] >= 0) {
			modifiers[i] = "+" + modifiers[i];
		}
	}

	return {
		Stats: stats,
		Modifiers: modifiers,
		Level: cls.Level,
		AC: ac,
		HitPoints: hp,
		Speed: race.Speed,
		ProficiencyBonus: "+" + (Math.floor(cls.Level/4) + 2),
		Features: new Set(race.Features.concat(cls.Features))
	};
};

var Languages = [
	"Common",
	"Dwarvish",
	"Elvish",
	"Giant",
	"Gnomish",
	"Goblin",
	"Halfling",
	"Orc",
	"Abyssal",
	"Celestial",
	"Draconic",
	"Deep Speech",
	"Infernal",
	"Primodial",
	"Sylvan",
	"Undercommon"
];

var GetNPCLanguages = function(race, cls, background) {
	var languages = new Set(race.Languages.concat(cls.Languages));
	var numToLearn = background.Occupation.NumLanguages + race.NumLanguages + languages.size;
	while (languages.size < numToLearn) {
		q = randomChoice(Languages);
		if (!languages.has(q)) {
			languages.add(q);
		}
	}
	return Array.from(languages);
};

var GetNPCProficiencies = function(race, cls, background) {
	var skillProficiencies = new Set(race.SkillProficiencies.concat(cls.SkillProficiencies).concat(background.Occupation.SkillProficiencies));
	var toolProficiencies = new Set(race.ToolProficiencies.concat(cls.ToolProficiencies).concat(background.Occupation.ToolProficiencies));
	return {
		SkillProficiencies: Array.from(skillProficiencies),
		ToolProficiencies: Array.from(toolProficiencies),
		SavingThrowProficiencies: cls.SavingThrowProficiencies
	};
};
