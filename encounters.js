var GetRace = function(forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	if (rand <= 29) {
		return "Human";
	} else if (rand <= 44) {
		return "Dwarf";
	} else if (rand <= 59) {
		return "Elf";
	} else if (rand <= 64) {
		return "Half-Elf";
	} else if (rand <= 79) {
		return "Halfling";
	} else if (rand <= 84) {
		return "Gnome";
	} else if (rand <= 89) {
		return "Half-Orc";
	} else if (rand <= 94) {
		return "Dragonborn";
	} else {
		return "Tiefling";
	}
};

var GetClass = function(forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	if (rand <= 14) {
		return "Fighter";
	} else if (rand <= 29) {
		return "Ranger";
	} else if (rand <= 39) {
		return "Cleric";
	} else if (rand <= 49) {
		return "Rogue";
	} else if (rand <= 59) {
		return "Wizard";
	} else if (rand <= 64) {
		return "Bard";
	} else if (rand <= 69) {
		return "Monk";
	} else if (rand <= 74) {
		return "Sorcerer";
	} else if (rand <= 79) {
		return "Warlock";
	} else if (rand <= 89) {
		return "Barbarian";
	} else if (rand <= 94) {
		return "Paladin";
	} else {
		return "Druid";
	}
};

var GetAlignment = function(alignment = [null, null]) {
	var rand1 = Roll(1, 100) - 1;
	rand2 = Roll(1, 100) - 1;
	lc = "";
	ge = "";
	if (alignment[0]) {
		lc = alignment[0];
	}
	if (alignment[1]) {
		ge = alignment[1];
	}
	if (lc === "") {
		if (rand1 <= 19) {
			lc = "L";
		} else if (rand1 <= 59) {
			lc = "N";
		} else {
			lc = "C";
		}
	}
	if (ge === "") {
		if (rand1 <= 59) {
			ge = "G";
		} else if (rand1 <= 84) {
			ge = "N";
		} else {
			ge = "E";
		}
	}
	return lc + ge;
};

var GetLevel = function(forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	if (rand <= 0) {
		return "1";
	} else if (rand <= 4) {
		return "2";
	} else if (rand <= 14) {
		return "3";
	} else if (rand <= 34) {
		return "4";
	} else if (rand <= 64) {
		return "5";
	} else if (rand <= 84) {
		return "6";
	} else if (rand <= 94) {
		return "7";
	} else if (rand <= 98) {
		return "8";
	} else {
		return "9";
	}
};

var GetCharacter = function(race = null, thisClass = null, alignment = [null, null], level = null) {
	return (race ? race : GetRace()) + " " + (thisClass ? thisClass : GetClass()) + " [" + GetAlignment(alignment) + " - Lv." + (level ? level : GetLevel()) + "]";
};

var GetRitualSpell = function(level=-1) {
	if (level == -1) {
		return randomChoice(RitualSpells).Name;
	} else {
		var choices = [];
		RitualSpells.forEach(function(spell) {
			if (spell.Level == level) {
				choices.push(spell);
			}
		});
		return randomChoice(choices).Name;
	}
	return "";
};

var GetTerrains = function() {
	return [
		"Borderlands",
		"Farmlands",
		"PatrolledWilderness",
		"Plains",
		"PrimalForests",
		"ForestsAndWoodlands",
		"Swamps",
		"Desert",
		"Mountains",
		"Hills",
		"Coast",
		"FrozenLands",
		"Urban",
		"SeaVoyages",
		"Water",
		"Underdark"
	];
};

var GetWilderness = function(terrain, onRoad, averagePartyLevel, forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	if (rand <= 14) {
		return GetWildernessNPC(onRoad);
	} else if (rand <= 29) {
		return GetWildernessAnimalHerd();
	} else if (rand <= 66) {
		return GetMonsterEncounter(terrain, averagePartyLevel);
	} else if (rand <= 81) {
		return GetWildernessPastEvent(terrain);
	} else if (rand <= 96) {
		return GetWildernessCurrentEvent(terrain, onRoad, averagePartyLevel);
	} else if (rand <= 97) {
		return GetWildernessLostItem();
	} else {
		return GetWildernessRemarkableEventOrFeature(terrain);
	}
};

var GetWildernessNPC = function(onRoad, forceTopRoll = false) {
	var evt = "You find ";
	var rand;
	var party;
	while (evt === "You find ") {
		if (forceTopRoll) {
			rand = forceTopRoll;
		} else {
			rand = Roll(1, 100) - 1;
		}
		if (rand <= 9) {
			evt += "a travelling merchant wagon";
			if (Math.random() < 0.5) {
				var guards = Roll(1, 2);
				evt += " with " + guards + " guard" + (guards > 1 ? "s" : "");
			}
		} else if (rand <= 15) {
			evt += "a hunting Party:";
			party = [];
			for (i = 0; i < Roll(1, 4); i++) {
				party.push(GetCharacter());
			}
			evt += "<ul><li>" + party.join("</li><li>") + "</li></ul>";
		} else if (rand <= 18) {
			evt += "a " + GetCharacter(null, "Druid");
		} else if (rand <= 21) {
			evt += "explorers:";
			party = [];
			for (i = 0; i < Roll(1, 3); i++) {
				party.push(GetCharacter() + (Math.random() < 0.5 ? " (Mounted)" : ""));
			}
			evt += "<ul><li>" + party.join("</li><li>") + "</li></ul>";
		} else if (rand <= 27) {
			evt += "adventurers:";
			party = [];
			for (i = 0; i < Roll(3, 2); i++) {
				party.push(GetCharacter() + (Math.random() < 0.8 ? " (Mounted)" : ""));
			}
			evt += "<ul><li>" + party.join("</li><li>") + "</li></ul>";
		} else if (rand <= 33) {
			evt += "a " + GetCharacter(null, "Bard") + (Math.random() < 0.8 ? " (Mounted)" : "");
		} else if (rand <= 44) {
			if (onRoad) {
				evt += "a goods wagon train with " + Roll(3, 2) + " guards";
			}
		} else if (rand <= 49) {
			var pilgrims = Roll(1, 3);
			evt += pilgrims + " pilgrim" + (pilgrims > 1 ? "s" : "") + ". Can offer healing (Acolyte).";
		} else if (rand <= 53) {
			evt += "a suspicious Character" + (Math.random() < 0.5 ? " (Mounted)" : "");
		} else if (rand <= 56) {
			evt += "a tied-up and unconsious ";
			rand2 = Roll(1, 100) - 1;
			if (rand2 < 9) {
				evt += "adventurer (" + GetCharacter() + ")";
			} else if (rand2 < 49) {
				evt += "merchant";
			} else if (rand2 < 89) {
				evt += "commoner";
			} else {
				evt += "evil " + GetCharacter(null, null, [null, "E"]);
			}
		} else if (rand <= 58) {
			evt += "a seated wizard, reading a book (" + GetCharacter(null, "Wizard") + ")";
		} else if (rand <= 63) {
			evt += Roll(4, 2) + " travelling gypsies on a wagon";
		} else if (rand <= 66) {
			evt += "a lost caravan guard. Caravan got attacked - they are now separated";
		} else if (rand <= 70) {
			evt += "a shunned ";
			rand2 = Roll(1, 100) - 1;
			if (rand2 < 29) {
				evt += "diseased humanoid covered in skin sores";
			} else if (rand2 < 59) {
				evt += "lunatic shouting random sentences";
			} else {
				evt += "beggar asking for food or coin";
			}
		} else if (rand <= 76) {
			evt += "a " + GetCharacter(null, "Barbarian");
		} else if (rand <= 84) {
			evt += "a " + GetCharacter(null, "Ranger");
		} else if (rand <= 86) {
			evt += "a naked man laying on the ground, confused with scratched (Werewolf)";
		} else if (rand <= 88) {
			evt += "a naked woman swimming in water";
		} else if (rand <= 89) {
			evt += "a naked woman swimming in water (Succubus)";
		} else {
			evt += "a mounted watch patrol, ";
			rand2 = Roll(1, 100) - 1;
			if (rand2 < 49) {
				evt += "generally patrolling";
			} else if (rand2 < 74) {
				evt += "looking for an escaped prisoner";
			} else {
				evt += "looking for monsters/bandits in the area";
			}
			evt += " and consisting of:";
			party = [];
			for (i = 0; i < Roll(2, 3); i++) {
				party.push(GetCharacter() + " (Mounted)");
			}
			evt += "<ul><li>" + party.join("</li><li>") + "</li></ul>";
		}
	}
	return evt;
};

var GetWildernessAnimalHerd = function(forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	evt = "You see ";
	if (rand <= 8) {
		evt += Roll(4, 4) + " wolves";
	} else if (rand <= 18) {
		evt += Roll(3, 4) + " boars";
	} else if (rand <= 23) {
		evt += Roll(3, 4) + " axe beaks";
	} else if (rand <= 43) {
		evt += Roll(5, 4) + " deer";
	} else if (rand <= 58) {
		evt += Roll(4, 4) + " wild horses";
	} else if (rand <= 78) {
		evt += Roll(5, 4) + " elk";
	} else if (rand <= 88) {
		evt += Roll(5, 3) + " hyena";
	} else if (rand <= 98) {
		evt += Roll(5, 3) + " jackals";
	} else {
		evt += Roll(4, 3) + " elephants";
	}
	return evt + " from a distance.";
};

var GetMonsterEncounterRarity = function(averagePartyLevel, forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	var rarity;
	if (averagePartyLevel <= 4) {
		if (rand <= 83) {
			rarity = "low";
		} else if (rand <= 92) {
			rarity = "middle";
		} else if (rand <= 97) {
			rarity = "high";
		} else {
			rarity = "veryhigh";
		}
	} else if (averagePartyLevel <= 10) {
		if (rand <= 9) {
			rarity = "low";
		} else if (rand <= 80) {
			rarity = "middle";
		} else if (rand <= 92) {
			rarity = "high";
		} else {
			rarity = "veryhigh";
		}
	} else if (averagePartyLevel <= 16) {
		if (rand <= 8) {
			rarity = "low";
		} else if (rand <= 20) {
			rarity = "middle";
		} else if (rand <= 87) {
			rarity = "high";
		} else {
			rarity = "veryhigh";
		}
	} else {
		if (rand <= 7) {
			rarity = "low";
		} else if (rand <= 19) {
			rarity = "middle";
		} else if (rand <= 54) {
			rarity = "high";
		} else {
			rarity = "veryhigh";
		}
	}
	return rarity;
};

var GetMonsterEncounter = function(terrain, averagePartyLevel) {
	var rarity = GetMonsterEncounterRarity(averagePartyLevel);
	// var choices = encounterList[terrain][rarity];
	// return FormatMonsterEncounter(choices[Math.floor(Math.random()*choices.length)]);
	var evt = "You find ";
	var rand = Roll(1, 100);
	switch (terrain) {
		case "Borderlands":
		case "Farmlands":
		case "PatrolledWilderness":
		case "Plains":
			if (rarity == "low") {
				if (rand <= 1) {
					return evt + "a hobgolin captain with " + (Roll(1, 4) + 1) + " hobgoblins";
				} else if (rand <= 2) {
					return evt + "a chimera";
				} else if (rand <= 3) {
					return evt + "a gorgon";
				} else if (rand <= 4) {
					return evt + Roll(1, 2) + " couatl";
				} else if (rand <= 5) {
					return evt + "an anklysaurus";
				} else if (rand <= 6) {
					return evt + "a weretiger";
				} else if (rand <= 7) {
					return evt + Roll(1, 3) + " allosaurus";
				} else if (rand <= 9) {
					return evt + Roll(1, 3) + " elephant";
				} else if (rand <= 10) {
					return "an orog";
				} else if (rand <= 11) {
					return "a pegasus";
				} else if (rand <= 14) {
					return (Roll(1, 4) + 3) + " swarms of insects";
				} else if (rand <= 16) {
					return evt + "a phase spider";
				} else if (rand <= 18) {
					return evt + "a gnoll pack lord with " + Roll(1, 4) + " hyena";
				} else if (rand <= 20) {
					return evt + Roll(1, 8) + " warg";
				} else if (rand <= 22) {
					return evt + "an ankheg";
				} else if (rand <= 24) {
					return evt + Roll(1, 3) + " rhinoceros";
				} else if (rand <= 28) {
					return evt + Roll(1, 3) + " cockatrice";
				} else if (rand <= 32) {
					return evt + (Roll(1, 6) + 2) + " giant wasp";
				} else if (rand <= 36) {
					return evt + Roll(1, 4) + " jackalwere";
				} else if (rand <= 40) {
					return evt + Roll(1, 8) + " giant goat";
				} else if (rand <= 41) {
					return evt + Roll(2, 4) + " hobgoblin";
				} else if (rand <= 42) {
					return evt + Roll(2, 4) + " orc";
				} else if (rand <= 44) {
					return evt + Roll(2, 4) + " gnoll";
				} else if (rand <= 46) {
					return evt + Roll(1, 2) + " giant poisonous snake";
				} else if (rand <= 47) {
					return evt + (Roll(1, 6) + 2) + " elk";
				} else if (rand <= 48) {
					return evt + (Roll(1, 6) + 2) + " riding horses";
				} else if (rand <= 50) {
					return evt + Roll(2, 4) + " goblins";
				} else if (rand <= 52) {
					return evt + Roll(1, 3) + " boar";
				} else if (rand <= 53) {
					return evt + "a panther";
				} else if (rand <= 54) {
					return evt + "a lion";
				} else if (rand <= 58) {
					return evt + (Roll(1, 6) + 3) + " goblins riding wolves";
				} else if (rand <= 60) {
					return evt + Roll(2, 6) + " giant wolf spiders";
				} else if (rand <= 62) {
					return evt + "a giant eagle";
				} else if (rand <= 65) {
					return evt + (Roll(1, 8) + 4) + " pteranodons";
				} else if (rand <= 69) {
					return evt + Roll(3, 6) + " wolves";
				} else if (rand <= 74) {
					return evt + (Roll(2, 4) + 2) + " axe beaks";
				} else if (rand <= 75) {
					return evt + "a giant boar";
				} else if (rand <= 76) {
					return evt + Roll(1, 2) + " tigers";
				} else if (rand <= 77) {
					return evt + "an ogre";
				} else if (rand <= 78) {
					return evt + Roll(1, 3) + " bugbear";
				} else if (rand <= 79) {
					return evt + "a giant elk";
				} else if (rand <= 80) {
					return evt + "a gnoll pack lord with " + Roll(1, 3) + " giant hyena";
				} else if (rand <= 81) {
					return evt + Roll(1, 3) + " giant vulture";
				} else if (rand <= 82) {
					return evt + Roll(1, 3) + " hippogriff";
				} else if (rand <= 83) {
					return evt + "a goblin boss with " + (Roll(1, 6) + 2) + " goblins and " + (Roll(1, 4) + 3) + " wolves";
				} else if (rand <= 84) {
					return evt + Roll(1, 3) + " thri-kreen";
				} else if (rand <= 86) {
					return evt + Roll(1, 6) + " scarecrows";
				} else if (rand <= 89) {
					return evt + "a wereboar";
				} else if (rand <= 91) {
					return evt + Roll(1, 3) + " centaur";
				} else if (rand <= 93) {
					return evt + Roll(1, 3) + " griffon";
				} else if (rand <= 94) {
					return evt + Roll(1, 3) + " gnoll fangs of Yeenoghu";
				} else if (rand <= 95) {
					return evt + "an orc Eye of Gruumsh with " + (Roll(2, 4) + 1) + " orcs";
				} else if (rand <= 96) {
					return evt + "a triceratops";
				} else if (rand <= 97) {
					return evt + "a cyclops";
				} else if (rand <= 98) {
					return evt + "a manticore";
				} else if (rand <= 99) {
					return evt + "a bulette";
				} else {
					return evt + "a tyrannosaurus rex";
				}
			} else if (rarity == "middle") {
				if (rand <= 1) {
					return evt + Roll(1, 3) + " gorgon";
				} else if (rand <= 2) {
					return evt + Roll(1, 4) + " cyclopes";
				} else if (rand <= 4) {
					return evt + Roll(1, 3) + " gnoll fangs of Yeenoghu";
				} else if (rand <= 6) {
					return evt + "a chimera";
				} else if (rand <= 9) {
					return evt + Roll(1, 4) + " saber-toothed tiger";
				} else if (rand <= 11) {
					return evt + "a tornado touching down 1d6 miles away, tearing up the land for 1 mile before dissipating";
				} else if (rand <= 13) {
					return evt + Roll(1, 3) + " manticore";
				} else if (rand <= 15) {
					return evt + Roll(2, 4) + " ankheg";
				} else if (rand <= 17) {
					return evt + (Roll(1, 8) + 1) + " centaurs";
				} else if (rand <= 19) {
					return evt + (Roll(1, 6) + 2) + " griffons";
				} else if (rand <= 21) {
					return evt + Roll(1, 6) + "elephant";
				} else if (rand <= 24) {
					return evt + "a stretch of land littered with rotting war machines, bones, and banners of forgotten armies";
				} else if (rand <= 28) {
					return evt + (Roll(1, 8) + 1) + " bugbear";
				} else if (rand <= 32) {
					return evt + "a gnoll pack lord with " + (Roll(1, 4) + 1) + " giant hyena";
				} else if (rand <= 36) {
					return evt + Roll(2, 4) + " scarecrow";
				} else if (rand <= 40) {
					return evt + Roll(1, 12) + " lion";
				} else if (rand <= 44) {
					return evt + Roll(1, 10) + "thri-kreen";
				} else if (rand <= 46) {
					return evt + "an allosaurus";
				} else if (rand <= 48) {
					return evt + "a tiger";
				} else if (rand <= 49) {
					return evt + Roll(1, 2) + " giant eagle";
				} else if (rand <= 50) {
					return evt + Roll(1, 2) + " giant vulture";
				} else if (rand <= 52) {
					return evt + "a goblin boss with " + Roll(2, 4) + " goblins";
				} else if (rand <= 54) {
					return evt + Roll(1, 2) + "pegasus";
				} else if (rand <= 58) {
					return evt + "an anklysaurus";
				} else if (rand <= 62) {
					return evt + Roll(1, 2) + " couatl";
				} else if (rand <= 66) {
					return evt + "an orc Eye of Gruumsh with " + (Roll(1, 8) + 1) + " orcs";
				} else if (rand <= 70) {
					return evt + Roll(2, 4) + " hippogriffs";
				} else if (rand <= 74) {
					return evt + (Roll(1, 4) + 1) + " rhinoceroses";
				} else if (rand <= 76) {
					return evt + "a hobgoblin captain with " + Roll(2, 6) + " hobgoblins";
				} else if (rand <= 78) {
					return evt + Roll(1, 3) + " phase spiders";
				} else if (rand <= 80) {
					return evt + (Roll(1, 6) + 2) + " giant boar";
				} else if (rand <= 82) {
					return evt + Roll(2, 4) + " giant elk";
				} else if (rand <= 84) {
					return evt + Roll(1, 4) + " ogres and " + Roll(1, 4) + " orogs";
				} else if (rand <= 87) {
					return evt + "A hot wind with the stench of rot";
				} else if (rand <= 90) {
					return evt + Roll(1, 3) + " weretiger";
				} else if (rand <= 92) {
					return evt + "a bulette";
				} else if (rand <= 94) {
					return evt + "a tribe of " + (Roll(2, 20) + 20) + " nomads (tribal warriors) on riding horses following a herd of antelope (deer), willing to trade food, leather, and information for weapons.";
				} else if (rand <= 96) {
					return evt + (Roll(1, 6) + 2) + " wereboars";
				} else if (rand <= 97) {
					return evt + "a young gold dragon";
				} else if (rand <= 99) {
					return evt + Roll(1, 4) + " triceratops";
				} else {
					return evt + Roll(1, 3) + " tyrannosaurus rex";
				}
			} else if (rarity == "high") {
				if (rand <= 5) {
					return evt + Roll(3, 6) + " wereboars";
				} else if (rand <= 10) {
					return evt + Roll(2, 10) + " gnoll fangs of Yeenoghu";
				} else if (rand <= 15) {
					return evt + Roll(1, 4) + " bulette";
				} else if (rand <= 17) {
					return evt + "an adult gold dragon and " + Roll(1, 2) + " young gold dragon";
				} else if (rand <= 27) {
					return evt + Roll(1, 12) + " couatl";
				} else if (rand <= 30) {
					return evt + Roll(2, 4) + " ogres and " + Roll(2, 4) + " orogs";
				} else if (rand <= 40) {
					return evt + Roll(2, 10) + " elephants";
				} else if (rand <= 46) {
					return evt + Roll(2, 4) + " weretigers";
				} else if (rand <= 56) {
					return evt + (Roll(1, 8) + 1) + " cyclopes";
				} else if (rand <= 61) {
					return evt + Roll(1, 3) + " chimera";
				} else if (rand <= 66) {
					return evt + (Roll(2, 3) + 1) + " triceratops";
				} else if (rand <= 69) {
					return evt + "A giant hole 50 feet across that descends nearly 500 feet before opening into a cave";
				} else if (rand <= 79) {
					return evt + (Roll(1, 4) + 3) + " gorgon";
				} else if (rand <= 88) {
					return evt + Roll(1, 3) + " young gold dragon";
				} else if (rand <= 90) {
					return evt + "a circular section of grass nearly a quarter-mile across that appears to have been pressed down; 1d4 more such circles connected by lines can be seen overhead";
				} else if (rand <= 96) {
					return evt + Roll(2, 4) + " tyrannosaurus rex";
				} else if (rand <= 99) {
					return evt + "an adult gold dragon";
				} else {
					return evt + "an ancient gold dragon";
				}
			} else {
				if (rand <= 10) {
					return evt + Roll(2, 6) + " triceratops";
				} else if (rand <= 20) {
					return evt + Roll(1, 10) + " gorgon";
				} else if (rand <= 25) {
					return evt + Roll(2, 6) + " hyena feeding on a dinosaur carcass";
				} else if (rand <= 35) {
					return evt + Roll(3, 6) + " bulettes";
				} else if (rand <= 40) {
					return evt + "2 adult gold dragons";
				} else if (rand <= 50) {
					return evt + Roll(1, 3) + " young gold dragon";
				} else if (rand <= 60) {
					return evt + Roll(2, 4) + " cyclopes";
				} else if (rand <= 65) {
					return evt + Roll(1, 2) + " tyrannosaurus rex battling a triceratops";
				} else if (rand <= 75) {
					return evt + Roll(2, 10) + " bugbears with " + Roll(4, 6) + " goblins and " + Roll(2, 10) + "wolves";
				} else if (rand <= 80) {
					return evt + "an adult gold dragon with " + Roll(1, 4) + " young gold dragon";
				} else if (rand <= 90) {
					return evt + Roll(1, 12) + " chimera";
				} else if (rand <= 96) {
					return evt + (Roll(1, 6) + 2) + " tyrannosaurus rex";
				} else if (rand <= 99) {
					return evt + "an adult gold dragon";
				} else {
					return evt + "an ancient gold dragon";
				}
			}
			break;
		case "PrimalForests":
		case "ForestsAndWoodlands":
			if (rarity == "low") {
				if (rand <= 1) {
					return evt + "a Giant Owl";
				} else if (rand <= 2) {
					return evt + (Roll(1, 4)) + " cats";
				} else if (rand <= 3) {
					return evt + (Roll(2, 4)) + " woodcutters (commoners)";
				} else if (rand <= 4) {
					return evt + "a Badger or " + (Roll(1, 4)) + " poisonous snakes";
				} else if (rand <= 5) {
					return evt + (Roll(2, 8)) + " baboons";
				} else if (rand <= 6) {
					return evt + (Roll(1, 6) + 3) + " Hyenas";
				} else if (rand <= 7) {
					return evt + "a owl";
				} else if (rand <= 8) {
					return evt + "a Pseudodragon";
				} else if (rand <= 9) {
					return evt + "a Giant Poisonous Snake";
				} else if (rand <= 10) {
					return evt + "a Giant Poisonous Snake";
				} else if (rand <= 11) {
					return evt + (Roll(1, 6) + 2) + " boars";
				} else if (rand <= 12) {
					return evt + (Roll(1, 4) + 1) + " giant lizards";
				} else if (rand <= 13) {
					return evt + "a ape or 1 tiger";
				} else if (rand <= 14) {
					return evt + (Roll(2, 6)) + " Tribal Warriors with " + (Roll(1, 6)) + " mastiffs";
				} else if (rand <= 15) {
					return evt + (Roll(1, 6) + 2) + " giant bats or " + (Roll(3, 6)) + " flying snakes";
				} else if (rand <= 16) {
					return evt + "a scout or " + (Roll(2, 4)) + " guards with " + (Roll(1, 8)) + " mastiffs";
				} else if (rand <= 17) {
					return evt + (Roll(1, 8) + 1) + " winged Kobolds";
				} else if (rand <= 18) {
					return evt + (Roll(1, 3)) + " constrictor snakes";
				} else if (rand <= 19) {
					return evt + (Roll(1, 10) + 5) + " giant rats or " + (Roll(2, 6) + 3) + " giant weasels";
				} else if (rand <= 20) {
					return evt + (Roll(1, 4) + 1) + " needle blights with " + (Roll(1, 6) + 3) + " twig blights";
				} else if (rand <= 25) {
					return evt + "a lost, weeping child. If the characters take the child home, the Parents reward them with " + (Roll(1, 3)) + " potions of Healing.";
				} else if (rand <= 26) {
					return evt + (Roll(1, 8) + 1) + " giant frogs";
				} else if (rand <= 27) {
					return evt + (Roll(4, 4)) + " Kobolds";
				} else if (rand <= 28) {
					return evt + (Roll(1, 3)) + " black bears";
				} else if (rand <= 29) {
					return evt + (Roll(3, 6)) + " stirges";
				} else if (rand <= 30) {
					return evt + "a satyr";
				} else if (rand <= 31) {
					return evt + (Roll(2, 4)) + " kenku";
				} else if (rand <= 32) {
					return evt + (Roll(1, 3)) + " vine blights with " + (Roll(1, 12)) + " awakened shrubs";
				} else if (rand <= 33) {
					return evt + (Roll(1, 4)) + " swarms of ravens";
				} else if (rand <= 34) {
					return evt + "a Faerie Dragon (yellow or younger)";
				} else if (rand <= 35) {
					return evt + (Roll(1, 4) + 2) + " giant badgers";
				} else if (rand <= 40) {
					return evt + "a young woodcutter (scout) racing through the forest to rescue a lost friend";
				} else if (rand <= 41) {
					return evt + (Roll(2, 4)) + " blink dogs";
				} else if (rand <= 42) {
					return evt + (Roll(1, 8) + 1) + " sprites";
				} else if (rand <= 43) {
					return evt + (Roll(1, 6) + 2) + " elk";
				} else if (rand <= 44) {
					return evt + (Roll(1, 4)) + " Lizardfolk or " + (Roll(3, 6)) + " bandits";
				} else if (rand <= 45) {
					return evt + (Roll(1, 4) + 4) + " wolves";
				} else if (rand <= 46) {
					return evt + (Roll(2, 4)) + " giant wolf spiders";
				} else if (rand <= 47) {
					return evt + "a Swarm of Insects or " + (Roll(2, 8)) + " blood hawks";
				} else if (rand <= 48) {
					return evt + (Roll(1, 6) + 2) + " pixies";
				} else if (rand <= 49) {
					return evt + "a Brown Bear";
				} else if (rand <= 50) {
					return evt + (Roll(1, 4) + 3) + " Goblins";
				} else if (rand <= 51) {
					return evt + (Roll(1, 3)) + " dryads";
				} else if (rand <= 52) {
					return evt + "a Awakened Tree";
				} else if (rand <= 53) {
					return evt + "a Phase Spider";
				} else if (rand <= 54) {
					return evt + (Roll(1, 6)) + " harpies";
				} else if (rand <= 55) {
					return evt + "a Ettercap or " + (Roll(1, 8) + 1) + " orcs";
				} else if (rand <= 56) {
					return evt + "a Goblin Boss with " + (Roll(2, 6) + 1) + " Goblins";
				} else if (rand <= 57) {
					return evt + "a Ankheg";
				} else if (rand <= 58) {
					return evt + "a Giant Constrictor Snake";
				} else if (rand <= 59) {
					return evt + (Roll(1, 4)) + " Bugbears or " + (Roll(2, 4)) + " Hobgoblins";
				} else if (rand <= 60) {
					return evt + "a Pegasus";
				} else if (rand <= 65) {
					return evt + "a stream of cool, clean water flowing between the trees";
				} else if (rand <= 66) {
					return evt + (Roll(1, 4)) + " half-ogres or 1 ogre";
				} else if (rand <= 67) {
					return evt + "a Faerie Dragon (green or older)";
				} else if (rand <= 68) {
					return evt + "a Werewolf or " + (Roll(1, 8) + 1) + " worgs";
				} else if (rand <= 69) {
					return evt + "a druid harvesting mistletoe";
				} else if (rand <= 70) {
					return evt + "a will-o’-wisp";
				} else if (rand <= 71) {
					return evt + (Roll(1, 4)) + " dire wolves or 1 Giant Boar";
				} else if (rand <= 72) {
					return evt + (Roll(1, 10)) + " giant wasps";
				} else if (rand <= 73) {
					return evt + "a Owlbear or 1 Giant Elk";
				} else if (rand <= 74) {
					return evt + (Roll(2, 6)) + " Gnolls";
				} else if (rand <= 75) {
					return evt + (Roll(1, 6)) + " giant toads";
				} else if (rand <= 80) {
					return evt + (Roll(1, 6)) + " web cocoons hanging from the branches, holding withered carcasses";
				} else if (rand <= 81) {
					return evt + "a Wereboar or " + (Roll(1, 4)) + " giant boars";
				} else if (rand <= 82) {
					return evt + (Roll(1, 6) + 2) + " giant spiders";
				} else if (rand <= 83) {
					return evt + (Roll(1, 4)) + " centaurs or " + (Roll(1, 4)) + " Giant Elk";
				} else if (rand <= 84) {
					return evt + "a Orc Eye of Gruumsh with " + (Roll(2, 4) + 2) + " orcs";
				} else if (rand <= 85) {
					return evt + "a Gnoll Fang of Yeenoghu";
				} else if (rand <= 86) {
					return evt + (Roll(1, 4)) + " gricks";
				} else if (rand <= 87) {
					return evt + "a Bandit Captain with " + (Roll(2, 6) + 3) + " bandits";
				} else if (rand <= 88) {
					return evt + (Roll(1, 4)) + " wererats";
				} else if (rand <= 89) {
					return evt + "a Couatl " + (day) + " or 1 Banshee (night)";
				} else if (rand <= 90) {
					return evt + "a Gnoll Pack Lord with " + (Roll(1, 4)) + " giant Hyenas";
				} else if (rand <= 91) {
					return evt + (Roll(2, 4)) + " berserkers or " + (Roll(1, 4)) + " veterans";
				} else if (rand <= 92) {
					return evt + "a Lizardfolk Shaman with " + (Roll(1, 3)) + " swarms of poisonous snakes and " + (Roll(1, 10) + 2) + " Lizardfolk";
				} else if (rand <= 93) {
					return evt + (Roll(1, 4)) + " displacer Beasts";
				} else if (rand <= 94) {
					return evt + (Roll(1, 3)) + " green hags";
				} else if (rand <= 95) {
					return evt + "a Hobgoblin Captain with " + (Roll(2, 6)) + " Hobgoblins and " + (Roll(1, 4)) + " giant boars";
				} else if (rand <= 96) {
					return evt + "a Yuan-ti malison with " + (Roll(1, 6)) + " + 1 Yuan-ti purebloods";
				} else if (rand <= 97) {
					return evt + (Roll(1, 3)) + " weretigers";
				} else if (rand <= 98) {
					return evt + "a Gorgon or 1 Unicorn";
				} else if (rand <= 99) {
					return evt + "a Shambling Mound";
				} else {
					return evt + "a Yuan-ti Abomination";
				}
			} else if (rarity == "middle") {
				if (rand <= 1) {
					return evt + (Roll(2, 4)) + " vine blights";
				} else if (rand <= 2) {
					return evt + (Roll(2, 6)) + " Hobgoblins or " + (Roll(2, 6)) + " orcs";
				} else if (rand <= 3) {
					return evt + (Roll(2, 4)) + " apes or " + (Roll(2, 4)) + " satyrs";
				} else if (rand <= 4) {
					return evt + (Roll(1, 3)) + " will-o’-wisps";
				} else if (rand <= 5) {
					return evt + (Roll(1, 4)) + " swarms of poisonous snakes";
				} else if (rand <= 6) {
					return evt + "a Orc Eye of Gruumsh with " + (Roll(1, 3)) + " orogs and " + (Roll(1, 8) + 2) + " orcs";
				} else if (rand <= 7) {
					return evt + (Roll(1, 3)) + " constrictor snakes or " + (Roll(1, 4)) + " tigers";
				} else if (rand <= 8) {
					return evt + "a Goblin Boss with " + (Roll(3, 6)) + " Goblins";
				} else if (rand <= 9) {
					return evt + "a Faerie Dragon (any age)";
				} else if (rand <= 10) {
					return evt + "a Brown Bear or " + (Roll(1, 6) + 2) + " black bears";
				} else if (rand <= 13) {
					return evt + (Roll(1, 4)) + " giant boars";
				} else if (rand <= 15) {
					return evt + (Roll(1, 8) + 1) + " giant spiders";
				} else if (rand <= 17) {
					return evt + "a Lizardfolk Shaman with " + (Roll(2, 4)) + " Lizardfolk";
				} else if (rand <= 18) {
					return evt + (Roll(1, 10)) + " giant toads";
				} else if (rand <= 19) {
					return evt + (Roll(1, 4)) + " ankhegs";
				} else if (rand <= 20) {
					return evt + (Roll(1, 3)) + " awakened trees (day) or 1 Banshee (night)";
				} else if (rand <= 25) {
					return evt + "a small shack almost hidden by the deep forest. The interior is empty aside from a large cast-iron oven.";
				} else if (rand <= 26) {
					return evt + "a Couatl";
				} else if (rand <= 28) {
					return evt + (Roll(1, 4)) + " ogres or " + (Roll(1, 6) + 2) + " half-ogres";
				} else if (rand <= 30) {
					return evt + "a Gnoll Pack Lord with " + (Roll(1, 4) + 1) + " giant Hyenas";
				} else if (rand <= 32) {
					return evt + (Roll(1, 6)) + " wererats";
				} else if (rand <= 33) {
					return evt + (Roll(1, 4)) + " gricks";
				} else if (rand <= 34) {
					return evt + (Roll(1, 8) + 1) + " Yuan-ti purebloods";
				} else if (rand <= 35) {
					return evt + (Roll(1, 6)) + " Pegasi";
				} else if (rand <= 40) {
					return evt + "an old stone archway of obvious elven design. Any character who passes under it makes Wisdom (Perception) checks with advantage for 1 hour.";
				} else if (rand <= 42) {
					return evt + (Roll(1, 6) + 2) + " dryads";
				} else if (rand <= 43) {
					return evt + (Roll(1, 4)) + " Giant Elk";
				} else if (rand <= 44) {
					return evt + (Roll(1, 8) + 1) + " harpies";
				} else if (rand <= 46) {
					return evt + "a Bandit Captain with 1 druid and " + (Roll(1, 6) + 5) + " bandits";
				} else if (rand <= 48) {
					return evt + (Roll(2, 4)) + " dire wolves";
				} else if (rand <= 50) {
					return evt + (Roll(2, 4)) + " Bugbears";
				} else if (rand <= 52) {
					return evt + (Roll(2, 4)) + " centaurs";
				} else if (rand <= 54) {
					return evt + (Roll(3, 10)) + " blink dogs";
				} else if (rand <= 56) {
					return evt + (Roll(1, 4)) + " owlbears";
				} else if (rand <= 58) {
					return evt + (Roll(1, 8) + 1) + " berserkers";
				} else if (rand <= 60) {
					return evt + (Roll(1, 3)) + " green hags";
				} else if (rand <= 65) {
					return evt + "a clear pool of water with " + (Roll(1, 6)) + " sleeping animals lying around its edge";
				} else if (rand <= 67) {
					return evt + (Roll(1, 4)) + " werewolves";
				} else if (rand <= 69) {
					return evt + "a Werebear";
				} else if (rand <= 71) {
					return evt + (Roll(1, 8) + 1) + " ettercaps";
				} else if (rand <= 73) {
					return evt + (Roll(2, 10)) + " elk";
				} else if (rand <= 75) {
					return evt + (Roll(1, 4)) + " veterans";
				} else if (rand <= 80) {
					return evt + "an old tree with a wizened face carved into the trunk";
				} else if (rand <= 81) {
					return evt + (Roll(1, 4)) + " wereboars";
				} else if (rand <= 82) {
					return evt + (Roll(2, 4)) + " displacer Beasts";
				} else if (rand <= 83) {
					return evt + (Roll(1, 4)) + " shambling mounds";
				} else if (rand <= 84) {
					return evt + "a Hobgoblin Captain with " + (Roll(3, 10)) + " Hobgoblins and " + (Roll(4, 12)) + " Goblins";
				} else if (rand <= 85) {
					return evt + "a Yuan-ti Abomination";
				} else if (rand <= 86) {
					return evt + (Roll(1, 8) + 1) + " phase spiders";
				} else if (rand <= 87) {
					return evt + (Roll(1, 4)) + " Trolls";
				} else if (rand <= 88) {
					return evt + (Roll(2, 4)) + " Yuan-ti Malisons";
				} else if (rand <= 89) {
					return evt + "a oni";
				} else if (rand <= 90) {
					return evt + (Roll(1, 4)) + " unicorns";
				} else if (rand <= 91) {
					return evt + (Roll(1, 6) + 2) + " weretigers";
				} else if (rand <= 92) {
					return evt + "a Young Green Dragon";
				} else if (rand <= 93) {
					return evt + (Roll(1, 4)) + " gorgons";
				} else if (rand <= 94) {
					return evt + (Roll(1, 6) + 2) + " Gnoll Fangs of Yeenoghu";
				} else if (rand <= 95) {
					return evt + "a Treant";
				} else if (rand <= 96) {
					return evt + (Roll(1, 4)) + " revenants";
				} else if (rand <= 97) {
					return evt + "a Grick Alpha with " + (Roll(1, 6) + 1) + " gricks";
				} else if (rand <= 98) {
					return evt + (Roll(1, 4)) + " giant apes";
				} else if (rand <= 99) {
					return evt + "a Guardian Naga";
				} else {
					return evt + "a Adult Gold Dragon";
				}
			} else if (rarity == "high") {
				if (rand <= 3) {
					return evt + "a Werebear";
				} else if (rand <= 5) {
					return evt + (Roll(1, 4)) + " druids performing a ritual for the dead (day only) " + (Roll(1, 4)) + " banshees (night only)";
				} else if (rand <= 7) {
					return evt + (Roll(1, 3)) + " couatls";
				} else if (rand <= 10) {
					return evt + (Roll(1, 3)) + " Gnoll Fangs of Yeenoghu with " + (Roll(2, 6) + 3) + " Gnolls";
				} else if (rand <= 15) {
					return evt + (Roll(2, 4)) + " displacer Beasts";
				} else if (rand <= 20) {
					return evt + (Roll(1, 6) + 2) + " veterans";
				} else if (rand <= 25) {
					return evt + "a pool of clear, still water. Gold coins litter the bottom, but they disappear if removed from the pool.";
				} else if (rand <= 30) {
					return evt + (Roll(1, 4) + 1) + " green hags with " + (Roll(1, 3)) + " owlbears";
				} else if (rand <= 35) {
					return evt + (Roll(1, 6) + 2) + " werewolves";
				} else if (rand <= 40) {
					return evt + "a small woodland shrine dedicated to a mysterious cult named the Siswa";
				} else if (rand <= 45) {
					return evt + (Roll(1, 6) + 2) + " phase spiders";
				} else if (rand <= 50) {
					return evt + (Roll(2, 4)) + " Yuan-ti Malisons";
				} else if (rand <= 52) {
					return evt + (Roll(1, 3)) + " werebears";
				} else if (rand <= 54) {
					return evt + (Roll(1, 4)) + " revenants";
				} else if (rand <= 56) {
					return evt + "a Young Green Dragon";
				} else if (rand <= 58) {
					return evt + (Roll(1, 4)) + " Trolls";
				} else if (rand <= 60) {
					return evt + (Roll(1, 6) + 2) + " wereboars";
				} else if (rand <= 65) {
					return evt + "a group of seven people (commoners) wearing animal masks and ambling through the woods";
				} else if (rand <= 67) {
					return evt + (Roll(1, 4)) + " gorgons";
				} else if (rand <= 69) {
					return evt + (Roll(1, 3)) + " shambling mounds";
				} else if (rand <= 71) {
					return evt + "a Treant";
				} else if (rand <= 73) {
					return evt + (Roll(1, 4)) + " unicorns";
				} else if (rand <= 75) {
					return evt + (Roll(1, 6) + 2) + " weretigers";
				} else if (rand <= 80) {
					return evt + "Peals of silvery laughter that echo from a distance";
				} else if (rand <= 82) {
					return evt + "a Guardian Naga";
				} else if (rand <= 84) {
					return evt + "a Young Gold Dragon";
				} else if (rand <= 86) {
					return evt + "a Grick Alpha with " + (Roll(2, 4)) + " gricks";
				} else if (rand <= 88) {
					return evt + (Roll(1, 3)) + " Yuan-ti Abominations";
				} else if (rand <= 90) {
					return evt + "a Adult Green Dragon";
				} else if (rand <= 93) {
					return evt + (Roll(1, 8) + 1) + " giant apes";
				} else if (rand <= 96) {
					return evt + (Roll(2, 4)) + " oni";
				} else if (rand <= 99) {
					return evt + (Roll(1, 3)) + " treants";
				} else {
					return evt + "a Ancient Green Dragon";
				}
			} else {
				if (rand <= 5) {
					return evt + "a Young Green Dragon";
				} else if (rand <= 10) {
					return evt + "a Treant";
				} else if (rand <= 13) {
					return evt + "a Guardian Naga";
				} else if (rand <= 16) {
					return evt + (Roll(1, 10)) + " revenants";
				} else if (rand <= 19) {
					return evt + (Roll(1, 8) + 1) + " unicorns";
				} else if (rand <= 22) {
					return evt + (Roll(1, 3)) + " grick alphas";
				} else if (rand <= 25) {
					return evt + "For a few hundred feet, wherever the characters step, flowers bloom and emit soft light.";
				} else if (rand <= 28) {
					return evt + "a Young Gold Dragon";
				} else if (rand <= 31) {
					return evt + (Roll(1, 6) + 2) + " shambling mounds";
				} else if (rand <= 34) {
					return evt + (Roll(2, 4)) + " werebears";
				} else if (rand <= 37) {
					return evt + (Roll(1, 4)) + " oni";
				} else if (rand <= 40) {
					return evt + (Roll(4, 6) + 10) + " elves living in a small community in the treetops";
				} else if (rand <= 43) {
					return evt + (Roll(1, 6) + 2) + " gorgons";
				} else if (rand <= 46) {
					return evt + (Roll(2, 4)) + " Trolls";
				} else if (rand <= 49) {
					return evt + (Roll(1, 4)) + " giant apes";
				} else if (rand <= 52) {
					return evt + (Roll(1, 3)) + " Yuan-ti Abominations";
				} else if (rand <= 62) {
					return evt + (Roll(1, 3)) + " young green Dragons";
				} else if (rand <= 65) {
					return evt + "a 50-foot-tall stone statue of an elf warrior with hand raised, palm out, as if to forbid travelers from coming this way";
				} else if (rand <= 75) {
					return evt + (Roll(1, 4)) + " treants";
				} else if (rand <= 80) {
					return evt + "a cairn set atop a low hill";
				} else if (rand <= 90) {
					return evt + "a Adult Gold Dragon";
				} else if (rand <= 96) {
					return evt + "a Ancient Green Dragon";
				} else if (rand <= 99) {
					return evt + (Roll(2, 4) + 1) + " treants";
				} else {
					return evt + "a Ancient Gold Dragon";
				}
			}
			break;
		case "Swamps":
			if (rarity == "low") {
				if (rand <= 1) {
					return evt + (Roll(1, 4)) + " poisonous snakes";
				} else if (rand <= 5) {
					return evt + (Roll(3, 6)) + " rats";
				} else if (rand <= 10) {
					return evt + "2s8 ravens";
				} else if (rand <= 12) {
					return evt + (Roll(3, 6)) + " giant rats";
				} else if (rand <= 13) {
					return evt + (Roll(1, 10) + 5) + " Tribal Warriors";
				} else if (rand <= 15) {
					return evt + (Roll(1, 8) + 1) + " giant lizards";
				} else if (rand <= 17) {
					return evt + "a Crocodile";
				} else if (rand <= 19) {
					return evt + "a Swarm of Insects";
				} else if (rand <= 20) {
					return evt + "a Giant Spider";
				} else if (rand <= 22) {
					return evt + (Roll(1, 4) + 1) + " mud huts partially sunken in murky water";
				} else if (rand <= 25) {
					return evt + (Roll(2, 8) + 1) + " Kobolds";
				} else if (rand <= 26) {
					return evt + (Roll(2, 4)) + " mud mephits";
				} else if (rand <= 29) {
					return evt + (Roll(1, 6) + 2) + " giant poisonous snakes";
				} else if (rand <= 30) {
					return evt + (Roll(2, 4)) + " winged Kobolds";
				} else if (rand <= 32) {
					return evt + "a scout";
				} else if (rand <= 34) {
					return evt + "The corpse of an adventurer tangled in the weeds. Looting the body turns up an Explorer's Pack and perhaps (50% chance a random Common magic item.";
				} else if (rand <= 38) {
					return evt + "a Giant Toad";
				} else if (rand <= 41) {
					return evt + (Roll(1, 6) + 2) + " constrictor snakes";
				} else if (rand <= 44) {
					return evt + (Roll(2, 4)) + " giant frogs";
				} else if (rand <= 45) {
					return evt + (Roll(1, 8) + 1) + " swarms of rats or " + (Roll(1, 6) + 2) + " swarms of ravens";
				} else if (rand <= 48) {
					return evt + (Roll(2, 10)) + " stirges";
				} else if (rand <= 52) {
					return evt + (Roll(2, 6) + 3) + " bullywugs";
				} else if (rand <= 54) {
					return evt + (Roll(1, 8) + 1) + " orcs";
				} else if (rand <= 56) {
					return evt + (Roll(1, 4)) + " Yuan-ti purebloods";
				} else if (rand <= 57) {
					return evt + "a druid";
				} else if (rand <= 59) {
					return evt + "a Yuan-ti malison";
				} else if (rand <= 62) {
					return evt + "a Giant Constrictor Snake";
				} else if (rand <= 64) {
					return evt + "a high-pitched shriek that lasts for " + (Roll(1, 4)) + " minutes";
				} else if (rand <= 67) {
					return evt + (Roll(2, 4)) + " Lizardfolk";
				} else if (rand <= 70) {
					return evt + "a Will-o'-Wisp";
				} else if (rand <= 72) {
					return evt + "a wight";
				} else if (rand <= 73) {
					return evt + "a ghast";
				} else if (rand <= 75) {
					return evt + "a Swarm of Poisonous Snakes";
				} else if (rand <= 77) {
					return evt + "a foul stench bubbling up from brackish waters";
				} else if (rand <= 80) {
					return evt + (Roll(1, 4) + 2) + " ogres";
				} else if (rand <= 83) {
					return evt + "a Shambling Mound";
				} else if (rand <= 86) {
					return evt + "a Lizardfolk Shaman with " + (Roll(1, 6)) + " giant lizards and " + (Roll(2, 10)) + " lizardfolk";
				} else if (rand <= 87) {
					return evt + "a troll";
				} else if (rand <= 89) {
					return evt + (Roll(1, 4)) + " green hags";
				} else if (rand <= 91) {
					return evt + "a Revenant";
				} else if (rand <= 93) {
					return evt + "a Giant Crocodile";
				} else if (rand <= 95) {
					return evt + "a Orc Eye of Gruumsh with " + (Roll(1, 3)) + " orogs and " + (Roll(2, 6) + 3) + " orcs";
				} else if (rand <= 97) {
					return evt + "a Young Black Dragon";
				} else if (rand <= 98) {
					return evt + "a Yuan-ti adomination";
				} else if (rand <= 99) {
					return evt + (Roll(1, 4)) + " water Elementals";
				} else {
					return evt + "a hydra";
				}
			} else if (rarity == "middle") {
				if (rand <= 1) {
					return evt + "a Green Hag";
				} else if (rand <= 3) {
					return evt + (Roll(2, 4)) + " giant lizards or " + (Roll(2, 4)) + " giant poisonous snakes";
				} else if (rand <= 5) {
					return evt + (Roll(2, 8)) + " winged Kobolds";
				} else if (rand <= 7) {
					return evt + (Roll(1, 10) + 1) + " bullywugs with " + (Roll(1, 8) + 1) + " giant frogs";
				} else if (rand <= 9) {
					return evt + "a druid";
				} else if (rand <= 10) {
					return evt + (Roll(1, 8) + 1) + " swarms of insects";
				} else if (rand <= 13) {
					return evt + (Roll(1, 12)) + " Ghouls";
				} else if (rand <= 16) {
					return evt + (Roll(2, 8)) + " scouts";
				} else if (rand <= 19) {
					return evt + (Roll(2, 10)) + " orcs";
				} else if (rand <= 22) {
					return evt + (Roll(2, 4)) + " giant spiders";
				} else if (rand <= 24) {
					return evt + "Tainted water that exposes creatures that move through it to Sight Rot (see 'Diseases' in chapter 8 of the Dungeon Master's Guide)";
				} else if (rand <= 27) {
					return evt + (Roll(1, 6) + 2) + " giant toads";
				} else if (rand <= 30) {
					return evt + (Roll(3, 6)) + " Lizardfolk";
				} else if (rand <= 33) {
					return evt + (Roll(1, 8) + 1) + " Yuan-ti purebloods";
				} else if (rand <= 36) {
					return evt + (Roll(1, 4) + 1) + " swarms of poisonous snakes";
				} else if (rand <= 38) {
					return evt + "a bloated humanoid corpse floating facedown in the water";
				} else if (rand <= 41) {
					return evt + "a Shambling Mound";
				} else if (rand <= 44) {
					return evt + (Roll(1, 4) + 1) + " will-o'-wisps";
				} else if (rand <= 47) {
					return evt + (Roll(2, 6)) + " crocodiles";
				} else if (rand <= 50) {
					return evt + (Roll(1, 4) + 1) + " giant constrictor snakes";
				} else if (rand <= 54) {
					return evt + "a Lizardfolk Shaman with " + (Roll(1, 3)) + " swarms of poisonous snakes and " + (Roll(1, 8) + 2) + " Lizardfolk";
				} else if (rand <= 58) {
					return evt + (Roll(1, 8) + 1) + " ogres";
				} else if (rand <= 62) {
					return evt + (Roll(2, 4)) + " ghasts";
				} else if (rand <= 65) {
					return evt + "an altar partially sunk into the mud, devoted to a god that is part human and part frog";
				} else if (rand <= 69) {
					return evt + "a Giant Crocodile";
				} else if (rand <= 73) {
					return evt + "a Shambling Mound";
				} else if (rand <= 77) {
					return evt + "a Orc Eye of Gruumsh with " + (Roll(1, 3)) + " ogres and " + (Roll(2, 10) + 5) + " orcs";
				} else if (rand <= 80) {
					return evt + "a torrential rain that lasts " + (Roll(1, 6)) + " minutes and puts out all unprotected flames within 1 mile";
				} else if (rand <= 82) {
					return evt + "a Young Black Dragon";
				} else if (rand <= 84) {
					return evt + (Roll(1, 4)) + " green hags with " + (Roll(1, 6) + 1) + " ogres";
				} else if (rand <= 86) {
					return evt + "a Yuan-ti Abomination";
				} else if (rand <= 88) {
					return evt + (Roll(1, 4) + 1) + " wights";
				} else if (rand <= 90) {
					return evt + (Roll(1, 6) + 1) + " Yuan-ti Malisons";
				} else if (rand <= 93) {
					return evt + (Roll(1, 4) + 1) + " Trolls";
				} else if (rand <= 96) {
					return evt + (Roll(1, 10)) + " revenants";
				} else if (rand <= 99) {
					return evt + (Roll(1, 8) + 1) + " water Elementals";
				} else {
					return evt + (Roll(1, 3)) + " Hydras";
				}
			} else {
				if (rand <= 10) {
					return evt + (Roll(1, 4)) + " giant crocodiles";
				} else if (rand <= 15) {
					return evt + (Roll(1, 3)) + " Yuan-ti Abominations";
				} else if (rand <= 20) {
					return evt + (Roll(1, 6) + 1) + " green hags";
				} else if (rand <= 25) {
					return evt + "a large, spreading tree from which " + (Roll(2, 6)) + " armored knights hang by the neck";
				} else if (rand <= 30) {
					return evt + (Roll(2, 4)) + " wights";
				} else if (rand <= 35) {
					return evt + (Roll(1, 8) + 1) + " Yuan-ti Malisons";
				} else if (rand <= 40) {
					return evt + "Fog that rolls across the terrain, making the area within " + (Roll(1, 3)) + " miles heavily obscured for " + (Roll(1, 4)) + " hours";
				} else if (rand <= 45) {
					return evt + (Roll(1, 4)) + " revenants";
				} else if (rand <= 50) {
					return evt + (Roll(1, 6)) + " shambling mounds";
				} else if (rand <= 55) {
					return evt + (Roll(1, 10)) + " water Elementals";
				} else if (rand <= 60) {
					return evt + (Roll(1, 4)) + " young black Dragons";
				} else if (rand <= 65) {
					return evt + "an eerie, bat-headed idol almost completely covered by vines";
				} else if (rand <= 70) {
					return evt + (Roll(1, 8) + 2) + " Trolls";
				} else if (rand <= 75) {
					return evt + (Roll(1, 3)) + " Hydras";
				} else if (rand <= 80) {
					return evt + "The sound of drums beating several miles away";
				} else if (rand <= 96) {
					return evt + "a Adult Black Dragon";
				} else {
					return evt + "a Ancient Black Dragon";
				}
			}
			break;
		case "Desert":
			if (rarity == "low") {
				if (rand <= 1) {
					return evt + (Roll(3, 8)) + " scorpions";
				} else if (rand <= 2) {
					return evt + (Roll(2, 4)) + " vultures";
				} else if (rand <= 3) {
					return evt + "a abandoned mule";
				} else if (rand <= 4) {
					return evt + (Roll(2, 6)) + " commoners with " + (Roll(2, 4)) + " camels bound for a distant city";
				} else if (rand <= 5) {
					return evt + (Roll(1, 6)) + " flying snakes";
				} else if (rand <= 6) {
					return evt + (Roll(2, 6)) + " Hyenas or " + (Roll(2, 6)) + " jackals";
				} else if (rand <= 7) {
					return evt + (Roll(1, 6)) + " guards escorting a noble to the edge of the desert, all of them astride camels";
				} else if (rand <= 8) {
					return evt + (Roll(1, 6)) + " cats";
				} else if (rand <= 9) {
					return evt + "a Pseudodragon";
				} else if (rand <= 10) {
					return evt + (Roll(1, 4)) + " poisonous snakes";
				} else if (rand <= 13) {
					return evt + (Roll(2, 4)) + " stirges";
				} else if (rand <= 15) {
					return evt + (Roll(1, 6) + 2) + " giant wolf spiders";
				} else if (rand <= 17) {
					return evt + "a scout";
				} else if (rand <= 20) {
					return evt + (Roll(2, 4)) + " giant poisonous snakes";
				} else if (rand <= 25) {
					return evt + "Single-file tracks marching deeper into the desert";
				} else if (rand <= 27) {
					return evt + (Roll(4, 4)) + " Kobolds";
				} else if (rand <= 29) {
					return evt + "a Jackalwere";
				} else if (rand <= 31) {
					return evt + (Roll(3, 6)) + " Tribal Warriors";
				} else if (rand <= 33) {
					return evt + (Roll(1, 6)) + " giant lizards";
				} else if (rand <= 35) {
					return evt + "a Swarm of Insects";
				} else if (rand <= 40) {
					return evt + "an oasis surrounded by palm trees and containing the remnants of an old camp";
				} else if (rand <= 44) {
					return evt + (Roll(3, 6)) + " bandits";
				} else if (rand <= 46) {
					return evt + (Roll(1, 4)) + " constrictor snakes";
				} else if (rand <= 48) {
					return evt + (Roll(2, 4)) + " winged Kobolds";
				} else if (rand <= 50) {
					return evt + "a Dust Mephit";
				} else if (rand <= 52) {
					return evt + (Roll(1, 3) + 1) + " giant toads";
				} else if (rand <= 54) {
					return evt + (Roll(1, 4)) + " giant spiders";
				} else if (rand <= 55) {
					return evt + "a druid";
				} else if (rand <= 57) {
					return evt + (Roll(2, 4)) + " Hobgoblins";
				} else if (rand <= 58) {
					return evt + "a wight";
				} else if (rand <= 60) {
					return evt + "a ogre";
				} else if (rand <= 65) {
					return evt + "a brass lamp lying on the ground";
				} else if (rand <= 67) {
					return evt + (Roll(1, 4)) + " giant vultures";
				} else if (rand <= 68) {
					return evt + "a Phase Spider";
				} else if (rand <= 69) {
					return evt + "a Giant Constrictor Snake";
				} else if (rand <= 71) {
					return evt + "a Gnoll Pack Lord with " + (Roll(1, 3)) + " giant Hyenas";
				} else if (rand <= 72) {
					return evt + (Roll(1, 6) + 2) + " Gnolls";
				} else if (rand <= 74) {
					return evt + "a mummy";
				} else if (rand <= 75) {
					return evt + (Roll(1, 3)) + " half-ogres";
				} else if (rand <= 80) {
					return evt + "a pile of humanoid bones wrapped in rotting cloth";
				} else if (rand <= 82) {
					return evt + "a lamia";
				} else if (rand <= 83) {
					return evt + "a Hobgoblin Captain with " + (Roll(2, 6)) + " Hobgoblins";
				} else if (rand <= 84) {
					return evt + (Roll(2, 4)) + " death dogs";
				} else if (rand <= 86) {
					return evt + (Roll(1, 4)) + " giant scorpions";
				} else if (rand <= 87) {
					return evt + "a Yuan-ti malison with " + (Roll(1, 4) + 1) + " Yuan-ti purebloods";
				} else if (rand <= 89) {
					return evt + "a Bandit Captain with 1 druid and " + (Roll(3, 6)) + " bandits";
				} else if (rand <= 90) {
					return evt + (Roll(2, 4)) + " Thri-kreen";
				} else if (rand <= 91) {
					return evt + "a Air Elemental";
				} else if (rand <= 92) {
					return evt + (Roll(1, 3)) + " couatls";
				} else if (rand <= 93) {
					return evt + "a Fire Elemental";
				} else if (rand <= 94) {
					return evt + (Roll(1, 4)) + " Gnoll Fangs of Yeenoghu";
				} else if (rand <= 95) {
					return evt + "a Revenant";
				} else if (rand <= 96) {
					return evt + (Roll(1, 4)) + " weretigers";
				} else if (rand <= 97) {
					return evt + "a Cyclops";
				} else if (rand <= 98) {
					return evt + "a Young Brass Dragon";
				} else if (rand <= 99) {
					return evt + "a Medusa";
				} else {
					return evt + "a Yuan-ti Abomination";
				}
			} else if (rarity == "middle") {
				if (rand <= 1) {
					return evt + (Roll(1, 6)) + " scouts";
				} else if (rand <= 2) {
					return evt + (Roll(2, 4)) + " jackalweres";
				} else if (rand <= 3) {
					return evt + (Roll(2, 6)) + " Hobgoblins";
				} else if (rand <= 4) {
					return evt + (Roll(1, 4) + 3) + " dust mephits";
				} else if (rand <= 5) {
					return evt + (Roll(1, 6)) + " swarms of insects";
				} else if (rand <= 6) {
					return evt + "a Giant Constrictor Snake";
				} else if (rand <= 8) {
					return evt + "a lion";
				} else if (rand <= 10) {
					return evt + (Roll(2, 4)) + " Gnolls";
				} else if (rand <= 12) {
					return evt + (Roll(2, 6)) + " giant toads";
				} else if (rand <= 17) {
					return evt + "a mummy";
				} else if (rand <= 20) {
					return evt + (Roll(1, 8) + 1) + " giant vultures";
				} else if (rand <= 25) {
					return evt + "a stone obelisk partly buried in the sand";
				} else if (rand <= 28) {
					return evt + "a ogre with " + (Roll(1, 3)) + " half-ogres";
				} else if (rand <= 35) {
					return evt + (Roll(1, 10)) + " giant Hyenas";
				} else if (rand <= 40) {
					return evt + (Roll(1, 6) + 1) + " empty tents";
				} else if (rand <= 43) {
					return evt + (Roll(1, 6) + 2) + " Thri-kreen";
				} else if (rand <= 46) {
					return evt + (Roll(2, 4)) + " Yuan-ti purebloods";
				} else if (rand <= 50) {
					return evt + (Roll(1, 6) + 3) + " death dogs";
				} else if (rand <= 52) {
					return evt + (Roll(1, 4)) + " giant scorpions";
				} else if (rand <= 53) {
					return evt + "a Fire Elemental";
				} else if (rand <= 55) {
					return evt + "a Hobgoblin Captain with " + (Roll(3, 4)) + " Hobgoblins";
				} else if (rand <= 56) {
					return evt + (Roll(1, 6) + 2) + " ogres";
				} else if (rand <= 58) {
					return evt + (Roll(1, 4)) + " lamias";
				} else if (rand <= 60) {
					return evt + "a Air Elemental";
				} else if (rand <= 65) {
					return evt + "a meteorite Resting at the bottom of a glassy crater";
				} else if (rand <= 66) {
					return evt + (Roll(1, 4) + 1) + " wights";
				} else if (rand <= 68) {
					return evt + "a Young Brass Dragon";
				} else if (rand <= 70) {
					return evt + "a Bandit Captain with " + (Roll(1, 3)) + " berserkers and " + (Roll(3, 6)) + " bandits";
				} else if (rand <= 72) {
					return evt + "a Cyclops";
				} else if (rand <= 73) {
					return evt + (Roll(1, 4)) + " couatls";
				} else if (rand <= 75) {
					return evt + (Roll(1, 4)) + " Yuan-ti Malisons";
				} else if (rand <= 80) {
					return evt + "Strong winds that kick up dust and reduce visibility to " + (Roll(1, 6)) + " feet for " + (Roll(1, 4)) + " hours";
				} else if (rand <= 83) {
					return evt + "a Revenant with " + (Roll(1, 3)) + " wights";
				} else if (rand <= 85) {
					return evt + (Roll(1, 8) + 1) + " phase spiders";
				} else if (rand <= 87) {
					return evt + (Roll(1, 6) + 2) + " weretigers";
				} else if (rand <= 90) {
					return evt + (Roll(2, 4)) + " Gnoll Fangs of Yeenoghu";
				} else if (rand <= 91) {
					return evt + "a Young Blue Dragon";
				} else if (rand <= 92) {
					return evt + (Roll(1, 4)) + " cyclopes";
				} else if (rand <= 93) {
					return evt + (Roll(1, 3)) + " Yuan-ti Abominations";
				} else if (rand <= 94) {
					return evt + (Roll(1, 4)) + " medusas";
				} else if (rand <= 95) {
					return evt + "a Guardian Naga";
				} else if (rand <= 96) {
					return evt + (Roll(1, 3)) + " young brass Dragons";
				} else if (rand <= 97) {
					return evt + "a Efreeti";
				} else if (rand <= 98) {
					return evt + "a roc";
				} else if (rand <= 99) {
					return evt + "a Gynosphinx";
				} else {
					return evt + "a Adult Brass Dragon";
				}
			} else if (rarity == "high") {
				if (rand <= 1) {
					return evt + "a Young Brass Dragon";
				} else if (rand <= 5) {
					return evt + (Roll(4, 6)) + " Gnolls";
				} else if (rand <= 10) {
					return evt + (Roll(3, 10)) + " giant Hyenas";
				} else if (rand <= 12) {
					return evt + (Roll(1, 8) + 1) + " lamias";
				} else if (rand <= 14) {
					return evt + (Roll(2, 4)) + " Gnoll Fangs of Yeenoghu";
				} else if (rand <= 17) {
					return evt + (Roll(1, 6) + 2) + " giant scorpions";
				} else if (rand <= 20) {
					return evt + (Roll(2, 4)) + " phase spiders";
				} else if (rand <= 25) {
					return evt + "a desert caravan consisting of " + (Roll(1, 6)) + " merchants " + (nobles) + " with " + (Roll(2, 6)) + " guards";
				} else if (rand <= 27) {
					return evt + (Roll(1, 6) + 1) + " couatls";
				} else if (rand <= 30) {
					return evt + (Roll(1, 4)) + " fire Elementals";
				} else if (rand <= 32) {
					return evt + "a Hobgoblin Captain with " + (Roll(3, 10) + 10) + " Hobgoblins";
				} else if (rand <= 35) {
					return evt + (Roll(2, 4)) + " wights";
				} else if (rand <= 40) {
					return evt + (Roll(1, 6)) + " square miles of desert glass";
				} else if (rand <= 42) {
					return evt + "a Young Blue Dragon";
				} else if (rand <= 45) {
					return evt + (Roll(1, 6) + 2) + " weretigers";
				} else if (rand <= 48) {
					return evt + (Roll(1, 4)) + " air Elementals";
				} else if (rand <= 50) {
					return evt + (Roll(1, 6) + 1) + " Yuan-ti Malisons";
				} else if (rand <= 55) {
					return evt + (Roll(1, 4)) + " medusas";
				} else if (rand <= 60) {
					return evt + (Roll(1, 4)) + " revenants with " + (Roll(3, 12)) + " skeletons";
				} else if (rand <= 65) {
					return evt + "a plundered pyramid";
				} else if (rand <= 70) {
					return evt + (Roll(1, 4)) + " young brass Dragons";
				} else if (rand <= 75) {
					return evt + (Roll(1, 3)) + " Yuan-ti Abominations";
				} else if (rand <= 78) {
					return evt + (Roll(1, 6) + 2) + " cyclopes";
				} else if (rand <= 82) {
					return evt + "a Adult Brass Dragon";
				} else if (rand <= 85) {
					return evt + "a Purple Worm";
				} else if (rand <= 86) {
					return evt + (Roll(1, 2)) + " young blue Dragons";
				} else if (rand <= 88) {
					return evt + "a Mummy Lord";
				} else if (rand <= 89) {
					return evt + (Roll(1, 3)) + " Guardian nagas";
				} else if (rand <= 90) {
					return evt + "a Adult Blue Dragon";
				} else if (rand <= 91) {
					return evt + (Roll(1, 2)) + " gynosphinxes";
				} else if (rand <= 93) {
					return evt + (Roll(1, 3)) + " efreet";
				} else if (rand <= 94) {
					return evt + "a Androsphinx";
				} else if (rand <= 95) {
					return evt + (Roll(1, 4)) + " rocs";
				} else if (rand <= 97) {
					return evt + "a Adult Blue Dracolich";
				} else if (rand <= 99) {
					return evt + "a Ancient Brass Dragon";
				} else {
					return evt + "a Ancient Blue Dragon";
				}
			} else {
				if (rand <= 5) {
					return evt + "a Adult Brass Dragon";
				} else if (rand <= 10) {
					return evt + (Roll(1, 2)) + " Yuan-ti Abominations with " + (Roll(2, 10) + 5) + " Yuan-ti Malisons and " + (Roll(4, 6) + 6) + " Yuan-ti purebloods";
				} else if (rand <= 14) {
					return evt + (Roll(1, 6) + 2) + " medusas";
				} else if (rand <= 18) {
					return evt + (Roll(1, 2)) + " purple worms";
				} else if (rand <= 22) {
					return evt + (Roll(2, 4)) + " cyclopes";
				} else if (rand <= 25) {
					return evt + "an abandoned city made from white marble, empty during the day. At night, harmless apparitions roam the streets, replaying the final moments of their lives.";
				} else if (rand <= 30) {
					return evt + (Roll(1, 3)) + " young blue Dragons";
				} else if (rand <= 35) {
					return evt + "a Mummy Lord";
				} else if (rand <= 40) {
					return evt + (Roll(1, 4)) + " hours of extreme heat (see chapter 5 of the Dungeon Master’s Guide)";
				} else if (rand <= 50) {
					return evt + (Roll(1, 3)) + " Guardian nagas";
				} else if (rand <= 60) {
					return evt + (Roll(1, 4)) + " efreet";
				} else if (rand <= 63) {
					return evt + "an old signpost identifying a single destination, called Pazar";
				} else if (rand <= 72) {
					return evt + (Roll(1, 4)) + " rocs";
				} else if (rand <= 80) {
					return evt + (Roll(1, 3)) + " gynosphinxes";
				} else if (rand <= 85) {
					return evt + "a Adult Blue Dracolich";
				} else if (rand <= 90) {
					return evt + "a Androsphinx";
				} else if (rand <= 96) {
					return evt + "a Ancient Brass Dragon";
				} else if (rand <= 99) {
					return evt + "a Ancient Blue Dragon";
				} else {
					return evt + (Roll(1, 4)) + " adult brass Dragons";
				}
			}
			break;
		case "Mountains":
			if (rarity == "low") {
				if (rand <= 2) {
					return evt + "a eagle";
				} else if (rand <= 5) {
					return evt + (Roll(1, 3)) + " swarms of bats";
				} else if (rand <= 8) {
					return evt + (Roll(1, 6)) + " goats";
				} else if (rand <= 11) {
					return evt + (Roll(1, 10) + 5) + " Tribal Warriors";
				} else if (rand <= 14) {
					return evt + (Roll(1, 6) + 3) + " pteranodons";
				} else if (rand <= 17) {
					return evt + (Roll(1, 8) + 1) + " winged Kobolds";
				} else if (rand <= 20) {
					return evt + "a lion";
				} else if (rand <= 24) {
					return evt + "Stairs chiseled into the side of the mountain that climb " + (Roll(3, 20)) + " + 40 feet before ending abruptly";
				} else if (rand <= 27) {
					return evt + (Roll(2, 10)) + " stirges";
				} else if (rand <= 30) {
					return evt + (Roll(2, 4)) + " Aarakocra";
				} else if (rand <= 33) {
					return evt + (Roll(2, 6)) + " dwarf soldiers (guards) with " + (Roll(1, 6)) + " mules laden with iron ore";
				} else if (rand <= 36) {
					return evt + "a Giant Eagle";
				} else if (rand <= 38) {
					return evt + "a small shrine dedicated to a lawful netural god, perched on a stone outcropping";
				} else if (rand <= 41) {
					return evt + (Roll(2, 8) + 1) + " blood hawks";
				} else if (rand <= 44) {
					return evt + "a Giant Goat";
				} else if (rand <= 47) {
					return evt + (Roll(3, 4)) + " Kobolds";
				} else if (rand <= 50) {
					return evt + "a Half-Ogre";
				} else if (rand <= 53) {
					return evt + "a Berserker";
				} else if (rand <= 55) {
					return evt + "a orog";
				} else if (rand <= 56) {
					return evt + "a Hell Hound";
				} else if (rand <= 57) {
					return evt + "a druid";
				} else if (rand <= 59) {
					return evt + "a Peryton";
				} else if (rand <= 61) {
					return evt + (Roll(1, 2)) + " hippogriffs";
				} else if (rand <= 62) {
					return evt + "a Manticore";
				} else if (rand <= 64) {
					return evt + (Roll(1, 6) + 2) + " scouts";
				} else if (rand <= 67) {
					return evt + "Enormous footprints left by a giant, which head into the mountain peaks";
				} else if (rand <= 73) {
					return evt + (Roll(2, 4)) + " orcs";
				} else if (rand <= 75) {
					return evt + "a Giant Elk";
				} else if (rand <= 77) {
					return evt + "a Veteran";
				} else if (rand <= 79) {
					return evt + "a Orc Eye of Gruumsh";
				} else if (rand <= 80) {
					return evt + (Roll(1, 4)) + " harpies";
				} else if (rand <= 81) {
					return evt + "a ogre";
				} else if (rand <= 82) {
					return evt + "a Griffon";
				} else if (rand <= 83) {
					return evt + "a Basilisk";
				} else if (rand <= 85) {
					return evt + "a Saber-Toothed Tiger";
				} else if (rand <= 90) {
					return evt + "a sparkling stream of water spilling from a crevice";
				} else if (rand <= 91) {
					return evt + (Roll(1, 2)) + " ettins";
				} else if (rand <= 92) {
					return evt + "a Cyclops";
				} else if (rand <= 93) {
					return evt + "a troll";
				} else if (rand <= 94) {
					return evt + "a Galeb Duhr";
				} else if (rand <= 95) {
					return evt + "a Air Elemental";
				} else if (rand <= 96) {
					return evt + "a Bulette";
				} else if (rand <= 97) {
					return evt + "a Chimera";
				} else if (rand <= 98) {
					return evt + "a Wyvern";
				} else if (rand <= 99) {
					return evt + "a Stone Giant";
				} else {
					return evt + "a Frost Giant";
				}
			} else if (rarity == "middle") {
				if (rand <= 2) {
					return evt + (Roll(2, 8) + 1) + " Aarakocra";
				} else if (rand <= 4) {
					return evt + "a lion or 1 Saber-Toothed Tiger";
				} else if (rand <= 6) {
					return evt + (Roll(1, 8) + 1) + " giant goats";
				} else if (rand <= 8) {
					return evt + (Roll(1, 4) + 3) + " dwarf trailblazers (scouts)";
				} else if (rand <= 10) {
					return evt + (Roll(1, 6) + 2) + " orcs";
				} else if (rand <= 15) {
					return evt + (Roll(1, 10)) + " giant eagles";
				} else if (rand <= 20) {
					return evt + (Roll(1, 8) + 1) + " hippogriffs";
				} else if (rand <= 25) {
					return evt + (Roll(1, 8)) + " fissures venting steam that partially obscures a 20-foot cube above each fissure";
				} else if (rand <= 30) {
					return evt + "a Basilisk";
				} else if (rand <= 35) {
					return evt + (Roll(1, 12)) + " half-ogres";
				} else if (rand <= 40) {
					return evt + "a ravine blocked by a 100-foot-high wall, which has an opening in the center where a gate used to be";
				} else if (rand <= 45) {
					return evt + "a Manticore";
				} else if (rand <= 50) {
					return evt + (Roll(2, 4)) + " harpies";
				} else if (rand <= 52) {
					return evt + "a Galeb Duhr";
				} else if (rand <= 54) {
					return evt + "a Bulette";
				} else if (rand <= 56) {
					return evt + (Roll(1, 10)) + " berserkers";
				} else if (rand <= 58) {
					return evt + (Roll(1, 3)) + " hell hounds";
				} else if (rand <= 60) {
					return evt + (Roll(1, 8) + 1) + " veterans";
				} else if (rand <= 65) {
					return evt + "a distant mountain whose peak resembles a tooth";
				} else if (rand <= 69) {
					return evt + (Roll(1, 4)) + " ettins";
				} else if (rand <= 73) {
					return evt + "a Wyvern";
				} else if (rand <= 75) {
					return evt + "a Orc Eye of Gruumsh with " + (Roll(1, 6)) + " orogs and " + (Roll(3, 6) + 10) + " orcs";
				} else if (rand <= 80) {
					return evt + "a row of " + (Roll(1, 10) + 40) + " stakes upon which the bodies of Kobolds, Dwarves, or orcs are impaled";
				} else if (rand <= 83) {
					return evt + "a Fire Giant";
				} else if (rand <= 85) {
					return evt + "a Young Silver Dragon";
				} else if (rand <= 87) {
					return evt + (Roll(1, 4)) + " air Elementals";
				} else if (rand <= 90) {
					return evt + (Roll(1, 4)) + " Trolls";
				} else if (rand <= 92) {
					return evt + (Roll(1, 3) + 1) + " cyclopes";
				} else if (rand <= 94) {
					return evt + (Roll(1, 4)) + " chimeras";
				} else if (rand <= 96) {
					return evt + "a Cloud Giant";
				} else if (rand <= 97) {
					return evt + "a roc";
				} else if (rand <= 98) {
					return evt + (Roll(1, 4)) + " Stone Giant";
				} else if (rand <= 99) {
					return evt + "a Young Red Dragon";
				} else {
					return evt + (Roll(1, 4)) + " Frost Giants";
				}
			} else if (rarity == "high") {
				if (rand <= 2) {
					return evt + (Roll(1, 8) + 1) + " basilisks";
				} else if (rand <= 4) {
					return evt + (Roll(2, 4)) + " hell hounds";
				} else if (rand <= 6) {
					return evt + (Roll(1, 3)) + " chimeras";
				} else if (rand <= 8) {
					return evt + "a Galeb Duhr";
				} else if (rand <= 10) {
					return evt + (Roll(2, 6)) + " veterans";
				} else if (rand <= 15) {
					return evt + "a Young Silver Dragon";
				} else if (rand <= 20) {
					return evt + (Roll(2, 4)) + " Trolls";
				} else if (rand <= 25) {
					return evt + "a red dragon gliding through the sky above the highest mountaintops";
				} else if (rand <= 30) {
					return evt + (Roll(1, 8) + 1) + " manticores";
				} else if (rand <= 35) {
					return evt + (Roll(1, 4)) + " cyclopes";
				} else if (rand <= 40) {
					return evt + "Heavy snowfall that lasts for " + (Roll(1, 6)) + " hours";
				} else if (rand <= 45) {
					return evt + (Roll(1, 10)) + " air Elementals";
				} else if (rand <= 50) {
					return evt + (Roll(1, 6) + 2) + " bulettes";
				} else if (rand <= 55) {
					return evt + (Roll(1, 4)) + " Stone Giants";
				} else if (rand <= 60) {
					return evt + "a Fire Giant";
				} else if (rand <= 65) {
					return evt + "2 Stone Giants playing catch with a boulder a few ";
				} else if (rand <= 70) {
					return evt + (Roll(1, 8) + 1) + " ettins";
				} else if (rand <= 75) {
					return evt + (Roll(1, 3)) + " Frost Giants";
				} else if (rand <= 80) {
					return evt + "a wide crevasse, its depths shrouded in mist";
				} else if (rand <= 85) {
					return evt + (Roll(1, 4)) + " Cloud Giants";
				} else if (rand <= 90) {
					return evt + "a Adult Silver Dragon";
				} else if (rand <= 96) {
					return evt + (Roll(1, 4)) + " Adult Red Dragon";
				} else if (rand <= 98) {
					return evt + (Roll(1, 4)) + " rocs";
				} else if (rand <= 99) {
					return evt + "a Ancient Silver Dragon";
				} else {
					return evt + "a Ancient Red Dragon";
				}
			} else {
				if (rand <= 5) {
					return evt + (Roll(1, 10)) + " bulettes";
				} else if (rand <= 10) {
					return evt + (Roll(1, 8) + 1) + " chimeras";
				} else if (rand <= 15) {
					return evt + "a Adult Silver Dragon";
				} else if (rand <= 20) {
					return evt + (Roll(1, 8) + 1) + " wyverns";
				} else if (rand <= 25) {
					return evt + "a massive boat perched atop a mountain";
				} else if (rand <= 30) {
					return evt + (Roll(2, 4)) + " Galeb Duhr";
				} else if (rand <= 35) {
					return evt + (Roll(1, 4)) + " Frost Giants";
				} else if (rand <= 40) {
					return evt + "a wooded valley haunted by secretive and reclusive elves who tell warily of their master: a mad Wizard who lives in the heart of the valley";
				} else if (rand <= 45) {
					return evt + (Roll(1, 10)) + " air Elementals";
				} else if (rand <= 50) {
					return evt + (Roll(1, 6) + 3) + " Trolls";
				} else if (rand <= 55) {
					return evt + "a Adult Red Dragon";
				} else if (rand <= 60) {
					return evt + (Roll(1, 4)) + " Cloud Giants";
				} else if (rand <= 65) {
					return evt + "a waterfall hundreds of feet high that drops into a clear pool";
				} else if (rand <= 70) {
					return evt + (Roll(1, 3)) + " Fire Giants";
				} else if (rand <= 75) {
					return evt + (Roll(2, 4)) + " Stone Giant";
				} else if (rand <= 80) {
					return evt + "a force of 100 Dwarves (veterans) standing guard at a mountain pass, permitting no passage until a traveler pays 100 gp (if on foot) or 200 gp (if mounted)";
				} else if (rand <= 85) {
					return evt + (Roll(1, 4)) + " rocs";
				} else if (rand <= 90) {
					return evt + (Roll(1, 4)) + " young red Dragons";
				} else if (rand <= 96) {
					return evt + "a Ancient Silver Dragon";
				} else {
					return evt + "a Ancient Red Dragon";
				}
			}
			break;
		case "Hills":
			if (rarity == "low") {
				if (rand <= 1) {
					return evt + "a eagle";
				} else if (rand <= 3) {
					return evt + (Roll(2, 4)) + " baboons";
				} else if (rand <= 6) {
					return evt + (Roll(1, 6)) + " bandits";
				} else if (rand <= 7) {
					return evt + (Roll(1, 4)) + " vultures";
				} else if (rand <= 8) {
					return evt + (Roll(1, 10)) + " commoners";
				} else if (rand <= 9) {
					return evt + "a raven";
				} else if (rand <= 10) {
					return evt + "a Poisonous Snake";
				} else if (rand <= 13) {
					return evt + (Roll(2, 6)) + " bandits or " + (Roll(2, 6)) + " Tribal Warriors";
				} else if (rand <= 14) {
					return evt + (Roll(2, 8)) + " goats";
				} else if (rand <= 15) {
					return evt + (Roll(1, 6) + 4) + " blood hawks";
				} else if (rand <= 16) {
					return evt + (Roll(1, 4) + 3) + " giant weasels";
				} else if (rand <= 18) {
					return evt + (Roll(1, 3)) + " guards with " + (Roll(1, 2)) + " mastiffs and 1 mule";
				} else if (rand <= 20) {
					return evt + (Roll(1, 6) + 5) + " Hyenas";
				} else if (rand <= 22) {
					return evt + (Roll(2, 4)) + " stirges";
				} else if (rand <= 25) {
					return evt + "an empty cave littered with bones";
				} else if (rand <= 26) {
					return evt + "a Pseudodragon or " + (Roll(1, 3)) + " giant owls";
				} else if (rand <= 27) {
					return evt + "a lion or 1 Panther (cougar)";
				} else if (rand <= 30) {
					return evt + (Roll(2, 8)) + " Kobolds";
				} else if (rand <= 31) {
					return evt + "a Hippogriff";
				} else if (rand <= 34) {
					return evt + (Roll(2, 4)) + " Goblins";
				} else if (rand <= 35) {
					return evt + "a worg";
				} else if (rand <= 36) {
					return evt + (Roll(1, 3)) + " swarms of bats or " + (Roll(1, 3)) + " swarms of ravens";
				} else if (rand <= 37) {
					return evt + "a Giant Eagle";
				} else if (rand <= 40) {
					return evt + "an old dwarf sitting on a stump, whittling a piece of wood";
				} else if (rand <= 41) {
					return evt + (Roll(1, 4)) + " elk";
				} else if (rand <= 42) {
					return evt + (Roll(1, 4)) + " winged Kobolds with " + (Roll(1, 6)) + " Kobolds";
				} else if (rand <= 43) {
					return evt + (Roll(1, 6) + 2) + " giant wolf spiders";
				} else if (rand <= 45) {
					return evt + (Roll(2, 4)) + " wolves";
				} else if (rand <= 46) {
					return evt + "a Swarm of Insects";
				} else if (rand <= 47) {
					return evt + (Roll(1, 8) + 1) + " axe beaks";
				} else if (rand <= 49) {
					return evt + "a Brown Bear or " + (Roll(1, 3)) + " boars";
				} else if (rand <= 50) {
					return evt + "a scout";
				} else if (rand <= 51) {
					return evt + "a ogre";
				} else if (rand <= 53) {
					return evt + (Roll(2, 4)) + " Gnolls";
				} else if (rand <= 54) {
					return evt + "a Giant Elk";
				} else if (rand <= 55) {
					return evt + (Roll(1, 3) + 1) + " harpies";
				} else if (rand <= 56) {
					return evt + "a Werewolf";
				} else if (rand <= 58) {
					return evt + (Roll(2, 4)) + " orcs";
				} else if (rand <= 59) {
					return evt + (Roll(1, 4)) + " half-ogres";
				} else if (rand <= 60) {
					return evt + "a druid or 1 Veteran";
				} else if (rand <= 63) {
					return evt + "The corpse of an adventurer that carries an intact explorer’s pack and lies atop a Longsword";
				} else if (rand <= 64) {
					return evt + "a Green Hag";
				} else if (rand <= 66) {
					return evt + (Roll(1, 3)) + " dire wolves";
				} else if (rand <= 68) {
					return evt + "a small cemetery containing " + (Roll(2, 6)) + " graves";
				} else if (rand <= 70) {
					return evt + "a Hobgoblin Captain with " + (Roll(2, 4)) + " Hobgoblins";
				} else if (rand <= 71) {
					return evt + (Roll(2, 4)) + " giant goats";
				} else if (rand <= 72) {
					return evt + "a Manticore";
				} else if (rand <= 74) {
					return evt + (Roll(1, 6) + 2) + " Hobgoblins";
				} else if (rand <= 75) {
					return evt + "a Phase Spider";
				} else if (rand <= 78) {
					return evt + "a pile of droppings from a very large bird";
				} else if (rand <= 79) {
					return evt + "a Gnoll Fang of Yeenoghu";
				} else if (rand <= 80) {
					return evt + (Roll(1, 3)) + " giant boars";
				} else if (rand <= 81) {
					return evt + "a Gnoll Pack Lord with " + (Roll(1, 3)) + " giant Hyenas";
				} else if (rand <= 82) {
					return evt + "a Bandit Captain with " + (Roll(2, 4)) + " bandits";
				} else if (rand <= 83) {
					return evt + "a Orc Eye of Gruumsh with " + (Roll(1, 8) + 2) + " orcs";
				} else if (rand <= 84) {
					return evt + (Roll(1, 3)) + " orogs or " + (Roll(1, 4)) + " berserkers";
				} else if (rand <= 86) {
					return evt + "a ettin or 1 Wereboar";
				} else if (rand <= 88) {
					return evt + "a Goblin Boss with " + (Roll(2, 6)) + " Goblins";
				} else if (rand <= 89) {
					return evt + (Roll(1, 3)) + " griffons";
				} else if (rand <= 90) {
					return evt + (Roll(1, 3)) + " perytons or " + (Roll(1, 4)) + " Pegasi";
				} else if (rand <= 96) {
					return evt + (Roll(1, 3)) + " Trolls";
				} else if (rand <= 99) {
					return evt + "a Cyclops";
				} else {
					return evt + "a Stone Giant";
				}
			} else if (rarity == "middle") {
				if (rand <= 1) {
					return evt + (Roll(1, 4)) + " Pegasi or " + (Roll(1, 3)) + " perytons";
				} else if (rand <= 2) {
					return evt + (Roll(1, 6) + 2) + " giant goats";
				} else if (rand <= 3) {
					return evt + "a Manticore";
				} else if (rand <= 4) {
					return evt + (Roll(1, 8) + 1) + " Gnolls or " + (Roll(1, 8) + 1) + " Hobgoblins";
				} else if (rand <= 5) {
					return evt + (Roll(1, 4)) + " lions";
				} else if (rand <= 6) {
					return evt + (Roll(1, 6) + 2) + " worgs";
				} else if (rand <= 7) {
					return evt + (Roll(1, 4)) + " brown bears";
				} else if (rand <= 8) {
					return evt + (Roll(3, 6)) + " axe beaks";
				} else if (rand <= 9) {
					return evt + "a Half-Ogre with " + (Roll(2, 6)) + " orcs";
				} else if (rand <= 10) {
					return evt + (Roll(2, 10)) + " winged Kobolds";
				} else if (rand <= 12) {
					return evt + "a Goblin Boss with " + (Roll(1, 4)) + " dire wolves and " + (Roll(2, 6)) + " Goblins";
				} else if (rand <= 13) {
					return evt + (Roll(1, 6)) + " Giant Elk";
				} else if (rand <= 15) {
					return evt + (Roll(1, 8) + 1) + " giant eagles";
				} else if (rand <= 17) {
					return evt + (Roll(1, 4)) + " phase spiders";
				} else if (rand <= 19) {
					return evt + "a Gnoll Pack Lord with " + (Roll(2, 4)) + " giant Hyenas";
				} else if (rand <= 20) {
					return evt + (Roll(2, 4)) + " hippogriffs";
				} else if (rand <= 25) {
					return evt + "a 15-foot-tall stone statue of a dwarf warrior that has been tipped over on its side";
				} else if (rand <= 27) {
					return evt + (Roll(2, 4)) + " orogs";
				} else if (rand <= 29) {
					return evt + (Roll(1, 4) + 1) + " griffons";
				} else if (rand <= 31) {
					return evt + (Roll(1, 6) + 2) + " harpies";
				} else if (rand <= 33) {
					return evt + "a Orc Eye of Gruumsh with " + (Roll(2, 6) + 3) + " orcs";
				} else if (rand <= 35) {
					return evt + (Roll(1, 4) + 3) + " giant boars";
				} else if (rand <= 40) {
					return evt + "a stone door set into the side of a steep hill, opening onto 15 feet of descending stairs that end at a cave-in";
				} else if (rand <= 42) {
					return evt + (Roll(1, 3)) + " green hags";
				} else if (rand <= 44) {
					return evt + (Roll(1, 4)) + " werewolves";
				} else if (rand <= 46) {
					return evt + (Roll(1, 6) + 2) + " ogres";
				} else if (rand <= 48) {
					return evt + "a Hobgoblin Captain with " + (Roll(2, 8)) + " Hobgoblins";
				} else if (rand <= 50) {
					return evt + "a Bandit Captain with " + (Roll(3, 6)) + " bandits";
				} else if (rand <= 54) {
					return evt + "a Chimera";
				} else if (rand <= 58) {
					return evt + (Roll(1, 4)) + " ettins";
				} else if (rand <= 62) {
					return evt + (Roll(1, 6) + 2) + " veterans with " + (Roll(2, 6)) + " berserkers";
				} else if (rand <= 65) {
					return evt + "an abandoned wooden hut";
				} else if (rand <= 69) {
					return evt + "a Galeb Duhr";
				} else if (rand <= 73) {
					return evt + "a Bulette";
				} else if (rand <= 77) {
					return evt + "a Wyvern";
				} else if (rand <= 80) {
					return evt + (Roll(2, 6) + 10) + " goats with 1 herder (Tribal Warrior)";
				} else if (rand <= 82) {
					return evt + (Roll(1, 3)) + " Hill Giants";
				} else if (rand <= 84) {
					return evt + (Roll(2, 4)) + " wereboars";
				} else if (rand <= 86) {
					return evt + (Roll(1, 4)) + " revenants";
				} else if (rand <= 88) {
					return evt + (Roll(1, 2)) + " gorgons";
				} else if (rand <= 90) {
					return evt + (Roll(1, 8) + 1) + " Gnoll Fangs of Yeenoghu";
				} else if (rand <= 93) {
					return evt + (Roll(1, 4)) + " cyclopes";
				} else if (rand <= 96) {
					return evt + "a Young Red Dragon";
				} else if (rand <= 98) {
					return evt + (Roll(1, 4)) + " Stone Giants";
				} else if (rand <= 99) {
					return evt + (Roll(1, 3)) + " young copper Dragons";
				} else {
					return evt + "a roc";
				}
			} else if (rarity == "high") {
				if (rand <= 1) {
					return evt + (Roll(2, 8)) + " manticores or " + (Roll(2, 8)) + " phase spiders";
				} else if (rand <= 4) {
					return evt + (Roll(1, 6)) + " green hags with " + (Roll(1, 6)) + " wyverns";
				} else if (rand <= 7) {
					return evt + "a Hobgoblin Captain with 1 Hill Giant and " + (Roll(4, 10)) + " Hobgoblins";
				} else if (rand <= 10) {
					return evt + (Roll(2, 6) + 3) + " werewolves";
				} else if (rand <= 14) {
					return evt + (Roll(1, 6) + 2) + " ettins";
				} else if (rand <= 18) {
					return evt + (Roll(1, 3)) + " bulettes";
				} else if (rand <= 22) {
					return evt + (Roll(1, 4)) + " werebears";
				} else if (rand <= 24) {
					return evt + "a stream of smoke emerging from a small chimney in the hillside";
				} else if (rand <= 28) {
					return evt + (Roll(1, 4)) + " wyverns";
				} else if (rand <= 32) {
					return evt + (Roll(1, 8) + 1) + " wereboars";
				} else if (rand <= 36) {
					return evt + (Roll(1, 3)) + " revenants";
				} else if (rand <= 38) {
					return evt + "a mild Earthquake that shakes the region for " + (Roll(1, 20)) + " seconds";
				} else if (rand <= 42) {
					return evt + (Roll(1, 3)) + " chimeras";
				} else if (rand <= 46) {
					return evt + (Roll(1, 4)) + " gorgons";
				} else if (rand <= 50) {
					return evt + (Roll(1, 6) + 2) + " Gnoll Fangs of Yeenoghu";
				} else if (rand <= 54) {
					return evt + (Roll(1, 4)) + " Hill Giants";
				} else if (rand <= 58) {
					return evt + "a Young Red Dragon";
				} else if (rand <= 62) {
					return evt + (Roll(1, 3) + 1) + " Galeb Duhr";
				} else if (rand <= 65) {
					return evt + (Roll(2, 10)) + " dwarf miners (commoners), whistling as they march toward their mine";
				} else if (rand <= 69) {
					return evt + (Roll(1, 3)) + " young copper Dragons";
				} else if (rand <= 73) {
					return evt + (Roll(1, 4)) + " Trolls";
				} else if (rand <= 77) {
					return evt + (Roll(1, 3)) + " cyclopes";
				} else if (rand <= 80) {
					return evt + (Roll(1, 3)) + " nobles with " + (Roll(1, 4)) + " scouts prospecting for gold";
				} else if (rand <= 85) {
					return evt + "a Adult Copper Dragon";
				} else if (rand <= 90) {
					return evt + (Roll(2, 4)) + " Stone Giants";
				} else if (rand <= 96) {
					return evt + (Roll(1, 4)) + " rocs";
				} else if (rand <= 99) {
					return evt + "a Adult Red Dragon";
				} else {
					return evt + "a Ancient Copper Dragon";
				}
			} else {
				if (rand <= 1) {
					return evt + (Roll(1, 2)) + " rocs";
				} else if (rand <= 5) {
					return evt + "a Young Red Dragon";
				} else if (rand <= 10) {
					return evt + (Roll(2, 6)) + " ettins";
				} else if (rand <= 15) {
					return evt + (Roll(1, 4)) + " bulettes";
				} else if (rand <= 20) {
					return evt + (Roll(1, 10)) + " revenants";
				} else if (rand <= 25) {
					return evt + "The white outline of an enormous horse carved into the side of a high hill";
				} else if (rand <= 30) {
					return evt + (Roll(1, 6) + 1) + " gorgons";
				} else if (rand <= 35) {
					return evt + (Roll(2, 4) + 1) + " Trolls";
				} else if (rand <= 40) {
					return evt + "The scorched remains of " + (Roll(2, 10)) + " humanoids littering a hillside";
				} else if (rand <= 45) {
					return evt + (Roll(2, 4)) + " Hill Giants";
				} else if (rand <= 50) {
					return evt + (Roll(1, 6) + 2) + " werebears";
				} else if (rand <= 55) {
					return evt + (Roll(2, 4)) + " Galeb Duhr";
				} else if (rand <= 60) {
					return evt + (Roll(1, 4) + 2) + " wyverns";
				} else if (rand <= 65) {
					return evt + "a massive boulder partly buried in the earth as if it fell or was Thrown there";
				} else if (rand <= 70) {
					return evt + "a Adult Copper Dragon";
				} else if (rand <= 75) {
					return evt + (Roll(1, 6) + 3) + " cyclopes";
				} else if (rand <= 80) {
					return evt + "The stub of an old stone tower jutting from the top of a hill";
				} else if (rand <= 85) {
					return evt + (Roll(2, 4)) + " Stone Giants";
				} else if (rand <= 90) {
					return evt + "a Adult Red Dragon";
				} else if (rand <= 96) {
					return evt + "a Ancient Copper Dragon";
				} else if (rand <= 99) {
					return evt + "a Ancient Red Dragon";
				} else {
					return evt + (Roll(1, 2)) + " adult red Dragons with " + (Roll(1, 3)) + " young red Dragons";
				}
			}
			break;
		case "Coast":
			if (rarity == "low") {
				if (rand <= 1) {
					return evt + "a pseudodragon";
				} else if (rand <= 5) {
					return evt + Roll(2, 8) + " crabs";
				} else if (rand <= 11) {
					return evt + Roll(2, 6) + " fishers (commoners)";
				} else if (rand <= 13) {
					return evt + Roll(1, 3) + " poisonous snake";
				} else if (rand <= 15) {
					return evt + Roll(1, 6) + " guards protecting a stranded noble";
				} else if (rand <= 18) {
					return evt + Roll(2, 10) + " merfolk";
				} else if (rand <= 20) {
					return evt + (Roll(1, 6) + 2) + " sahuagin";
				} else if (rand <= 25) {
					return evt + Roll(1, 4) + " ghouls feeding on corpses aboard the wreckage of a merchant ship. A search uncovers 2d6 bolts of ruined silk, 50 feet of rope, and a barrel of salted herring";
				} else if (rand <= 27) {
					return evt + Roll(1, 4) + " winged kobolds with " + (Roll(1, 6) + 1) + " kobolds";
				} else if (rand <= 29) {
					return evt + Roll(2, 6) + " tribal warriors";
				} else if (rand <= 31) {
					return evt + Roll(3, 4) + " kobolds";
				} else if (rand <= 33) {
					return evt + (Roll(2, 4) + 5) + " blood hawks";
				} else if (rand <= 35) {
					return evt + (Roll(1, 8) + 1) + " pteranodons";
				} else if (rand <= 40) {
					return evt + "a few dozen baby turtles struggling to make their way to sea";
				} else if (rand <= 42) {
					return evt + (Roll(1, 6) + 2) + " giant lizards";
				} else if (rand <= 44) {
					return evt + (Roll(1, 4) + 4) + " giant crabs";
				} else if (rand <= 46) {
					return evt + Roll(2, 4) + " stirges";
				} else if (rand <= 48) {
					return evt + (Roll(2, 6) + 3) + " bandits";
				} else if (rand <= 53) {
					return evt + "a sea hag";
				} else if (rand <= 55) {
					return evt + "a manticore";
				} else if (rand <= 60) {
					return evt + Roll(1, 4) + " sahuagin";
				} else if (rand <= 65) {
					return evt + Roll(1, 4) + " harpies";
				} else if (rand <= 70) {
					return evt + "a lone hermit (acolyte) sitting on the beach, contemplating the meaning of the multiverse";
				} else if (rand <= 75) {
					return evt + Roll(1, 4) + " berserker";
				} else if (rand <= 80) {
					return evt + Roll(1, 6) + " giant eagle";
				} else if (rand <= 81) {
					return evt + Roll(1, 4) + " ogres";
				} else if (rand <= 83) {
					return evt + Roll(2, 4) + " giant toad";
				} else if (rand <= 84) {
					return evt + Roll(1, 4) + " merrow";
				} else if (rand <= 85) {
					return evt + Roll(3, 6) + " sahuagin";
				} else if (rand <= 87) {
					return evt + Roll(1, 2) + " plesiosaurus";
				} else if (rand <= 88) {
					return evt + "a bandit capitan with " + Roll(2, 6) + " bandits";
				} else if (rand <= 89) {
					return evt + Roll(1, 3) + " manticores";
				} else if (rand <= 90) {
					return evt + "a banshee";
				} else if (rand <= 92) {
					return evt + (Roll(1, 4) + 3) + " griffons";
				} else if (rand <= 94) {
					return evt + "a sahuagin priestess with " + Roll(1, 3) + " merrow and " + Roll(2, 6) + " sahuagin";
				} else if (rand <= 96) {
					return evt + "a sahuagin baron";
				} else if (rand <= 98) {
					return evt + "a water elemental";
				} else if (rand <= 99) {
					return evt + "a cyclops";
				} else {
					return evt + "a young bronze dragon";
				}
			} else if (rarity == "middle") {
				if (rand <= 1) {
					return evt + Roll(2, 8) + " giant wolf spiders";
				} else if (rand <= 3) {
					return evt + Roll(3, 6) + " pteranodons";
				} else if (rand <= 5) {
					return evt + Roll(2, 4) + " scouts";
				} else if (rand <= 7) {
					return evt + (Roll(1, 6) + 2) + " Sahuagin";
				} else if (rand <= 8) {
					return evt + "a Sea Hag";
				} else if (rand <= 10) {
					return evt + (Roll(1, 4) + 1) + " giant toads";
				} else if (rand <= 15) {
					return evt + Roll(3, 6) + " Sahuagin";
				} else if (rand <= 20) {
					return evt + Roll(2, 6) + " giant eagles";
				} else if (rand <= 25) {
					return evt + "A Pseudodragon chasing gulls through the air";
				} else if (rand <= 29) {
					return evt + Roll(1, 2) + " druids";
				} else if (rand <= 32) {
					return evt + (Roll(2, 4) + 1) + " giant toads";
				} else if (rand <= 35) {
					return evt + "a Commoner singing a dirge (day only) or a Banshee (night only)";
				} else if (rand <= 40) {
					return evt + "a stoppered bottle containing an illegible note and half buried in the sand";
				} else if (rand <= 43) {
					return evt + "3 sea hags";
				} else if (rand <= 46) {
					return evt + (Roll(1, 8) + 1) + "harpies";
				} else if (rand <= 50) {
					return evt + Roll(1, 4) + "plesiosauruses";
				} else if (rand <= 53) {
					return evt + Roll(1, 4) + "manticores";
				} else if (rand <= 56) {
					return evt + Roll(2, 4) + "ogres";
				} else if (rand <= 60) {
					return evt + Roll(1, 10) + "griffons";
				} else if (rand <= 65) {
					return evt + "A battle at sea between two galleons";
				} else if (rand <= 70) {
					return evt + (Roll(1, 4) + 3) + "Merrow";
				} else if (rand <= 75) {
					return evt + "A Pirate crew consisting of a Bandit Captain, a druid, 2 berserkers, and " + Roll(2, 12) + " bandits, all searching for buried Treasure";
				} else if (rand <= 80) {
					return evt + "A severed humanoid hand tangled in a net";
				} else if (rand <= 82) {
					return evt + "a Water Elemental";
				} else if (rand <= 84) {
					return evt + "a Cyclops";
				} else if (rand <= 86) {
					return evt + Roll(1, 4) + "banshees (night only)";
				} else if (rand <= 88) {
					return evt + Roll(2, 4) + "veterans";
				} else if (rand <= 90) {
					return evt + "a Young Bronze Dragon";
				} else if (rand <= 93) {
					return evt + Roll(1, 3) + "cyclopes";
				} else if (rand <= 95) {
					return evt + "a Young Blue Dragon";
				} else if (rand <= 96) {
					return evt + "a Sahuagin Baron with " + Roll(1, 3) + " Sahuagin priestesses and " + Roll(2, 8) + " Sahuagin";
				} else if (rand <= 97) {
					return evt + "a Djinni";
				} else if (rand <= 98) {
					return evt + "a roc";
				} else if (rand <= 99) {
					return evt + "a marid";
				} else {
					return evt + "a Storm Giant";
				}
			} else if (rarity == "high") {
				if (rand <= 1) {
					return evt + (Roll(1, 4)) + " banshees (night only)";
				} else if (rand <= 4) {
					return evt + "a Cyclops";
				} else if (rand <= 8) {
					return evt + (Roll(1, 6) + 2) + " manticores";
				} else if (rand <= 10) {
					return evt + (Roll(1, 8) + 2) + " veterans";
				} else if (rand <= 20) {
					return evt + "a Young Blue Dragon";
				} else if (rand <= 25) {
					return evt + "a nest of " + (Roll(1, 6)) + " Dragon Turtle eggs";
				} else if (rand <= 35) {
					return evt + (Roll(1, 4)) + " Sahuagin barons";
				} else if (rand <= 40) {
					return evt + "a Trident partially buried in the sand";
				} else if (rand <= 50) {
					return evt + "a Young Blue Dragon";
				} else if (rand <= 55) {
					return evt + "a marid";
				} else if (rand <= 60) {
					return evt + (Roll(1, 6)) + " water Elementals";
				} else if (rand <= 65) {
					return evt + (Roll(2, 6)) + " ghasts crawling over " + (Roll(1, 6)) + " wrecked ships and feeding on the dead";
				} else if (rand <= 70) {
					return evt + "a Djinni";
				} else if (rand <= 75) {
					return evt + (Roll(1, 3)) + " young bronze Dragons";
				} else if (rand <= 80) {
					return evt + "a beached whale, dead and bloated. If it takes any damage, it explodes, and each creature within 30 feet of it must make a DC 15 Dexterity saving throw, taking " + (Roll(5, 6)) + " bludgeoning damage on a failed save, or half as much damage on a successful one.";
				} else if (rand <= 82) {
					return evt + (Roll(2, 4)) + " cyclopes";
				} else if (rand <= 84) {
					return evt + "a Storm Giant";
				} else if (rand <= 86) {
					return evt + (Roll(1, 3)) + " young blue Dragons";
				} else if (rand <= 88) {
					return evt + "a Adult Bronze Dragon";
				} else if (rand <= 90) {
					return evt + "a Adult Blue Dragon";
				} else if (rand <= 93) {
					return evt + (Roll(1, 3)) + " rocs";
				} else if (rand <= 97) {
					return evt + "a Dragon Turtle";
				} else if (rand <= 99) {
					return evt + "a Ancient Bronze Dragon";
				} else {
					return evt + "a Ancient Blue Dragon";
				}
			} else {
				if (rand <= 10) {
					return evt + "a roc";
				} else if (rand <= 20) {
					return evt + "a Storm Giant";
				} else if (rand <= 25) {
					return evt + "an Adult Bronze Dragon fighting an Adult Blue Dragon to the death";
				} else if (rand <= 40) {
					return evt + (Roll(2, 6)) + " cyclopes";
				} else if (rand <= 50) {
					return evt + "a Adult Bronze Dragon or 1 Adult Blue Dragon";
				} else if (rand <= 60) {
					return evt + (Roll(1, 3)) + " djinn or " + (Roll(1, 3)) + " marids";
				} else if (rand <= 70) {
					return evt + "a Dragon Turtle";
				} else if (rand <= 75) {
					return evt + (Roll(1, 3)) + " rocs";
				} else if (rand <= 80) {
					return evt + (Roll(1, 6)) + " + 2 waterspouts that dance on the water before stopping abruptly";
				} else if (rand <= 90) {
					return evt + (Roll(1, 6)) + " young blue Dragons";
				} else if (rand <= 96) {
					return evt + "a Ancient Bronze Dragon";
				} else if (rand <= 99) {
					return evt + "a Ancient Blue Dragon";
				} else {
					return evt + (Roll(1, 3) + 1) + " Storm Giants";
				}
			}
			break;
		case "FrozenLands":
			if (rarity == "low") {
				if (rand <= 1) {
					return evt + "a giant owl";
				} else if (rand <= 5) {
					return evt + (Roll(1, 6) + 3) + " kobolds";
				} else if (rand <= 8) {
					return evt + (Roll(1, 4) + 3) + " trappers (commoners)";
				} else if (rand <= 10) {
					return evt + "an owl";
				} else if (rand <= 12) {
					return evt + Roll(2, 4) + " blood hawks";
				} else if (rand <= 17) {
					return evt + Roll(2, 6) + "bandits";
				} else if (rand <= 20) {
					return evt + Roll(1, 3) + " winged kobolds with " + Roll(1, 6) + "kobolds";
				} else if (rand <= 25) {
					return evt + "The partially eaten carcass of a mammoth, from which 1d4 weeks of rations may be harvested";
				} else if (rand <= 29) {
					return evt + Roll(2, 8) + " hunters (tribal warriors)";
				} else if (rand <= 35) {
					return evt + "a half-ogre";
				} else if (rand <= 40) {
					return evt + "single file tracks in the snow that stop abruptly";
				} else if (rand <= 45) {
					return evt + Roll(1, 3) + " ice mephits";
				} else if (rand <= 50) {
					return evt + "a brown bear";
				} else if (rand <= 53) {
					return evt + (Roll(1, 6) + 1) + " orcs";
				} else if (rand <= 55) {
					return evt + "a polar bear";
				} else if (rand <= 57) {
					return evt + (Roll(1, 6) + 1) + " orcs hunting a mammoth";
				} else if (rand <= 60) {
					return evt + "a saber-toothed tiger";
				} else if (rand <= 65) {
					return evt + "a frozen pond with a jagged hole in the ice that appears recently made";
				} else if (rand <= 68) {
					return evt + "a berserker";
				} else if (rand <= 70) {
					return evt + "an ogre";
				} else if (rand <= 72) {
					return evt + "a griffon";
				} else if (rand <= 75) {
					return evt + "an ogre with an orog";
				} else if (rand <= 80) {
					return evt + Roll(3, 4) + " refugees (commoners) fleeing from orcs";
				} else if (rand <= 81) {
					return evt + Roll(1, 3) + " griffons";
				} else if (rand <= 82) {
					return evt + Roll(1, 4) + " orogs";
				} else if (rand <= 83) {
					return evt + "2 brown bears";
				} else if (rand <= 84) {
					return evt + "an orc Eye of Gruumsh with " + Roll(2, 8) + " orcs";
				} else if (rand <= 85) {
					return evt + Roll(1, 3) + " winter wolves";
				} else if (rand <= 87) {
					return evt + Roll(1, 4) + " yeti";
				} else if (rand <= 88) {
					return evt + "a half-ogre";
				} else if (rand <= 89) {
					return evt + Roll(1, 3) + " manticore";
				} else if (rand <= 90) {
					return evt + "a bandit captain with " + Roll(2, 6) + " bandits";
				} else if (rand <= 91) {
					return evt + "a revenant";
				} else if (rand <= 93) {
					return evt + "a troll";
				} else if (rand <= 95) {
					return evt + "a werebear";
				} else if (rand <= 97) {
					return evt + "a young remorhaz";
				} else if (rand <= 98) {
					return evt + "a mammoth";
				} else if (rand <= 99) {
					return evt + "a young white dragon";
				} else {
					return evt + "a frost giant";
				}
			} else if (rarity == "middle") {
				if (rand <= 5) {
					return evt + "2 saber-toothed tigers";
				} else if (rand <= 7) {
					return evt + Roll(1, 4) + " half-ogres";
				} else if (rand <= 10) {
					return evt + (Roll(1, 3) + 1) + " brown bears";
				} else if (rand <= 15) {
					return evt + Roll(1, 3) + " polar bears";
				} else if (rand <= 20) {
					return evt + Roll(2, 4) + " berserkers";
				} else if (rand <= 25) {
					return evt + "a half-orc druid tending to an injured polar bear";
				} else if (rand <= 30) {
					return evt + Roll(1, 6) + " ogres with " + Roll(1, 2) + " orogs";
				} else if (rand <= 35) {
					return evt + Roll(2, 4) + " ice mephits";
				} else if (rand <= 40) {
					return evt + (Roll(2, 6) + 1) + " zombies aboard a galleon trapped in the ice. Searching the ship yields 2d20 days of rations";
				} else if (rand <= 45) {
					return evt + "a manticore";
				} else if (rand <= 50) {
					return evt + (Roll(2, 6) + 3) + " orcs";
				} else if (rand <= 53) {
					return evt + (Roll(1, 6) + 2) + " ogres";
				} else if (rand <= 55) {
					return evt + Roll(2, 4) + " griffons";
				} else if (rand <= 57) {
					return evt + Roll(1, 4) + " polar bears";
				} else if (rand <= 60) {
					return evt + "a bandit captain with a druid, " + Roll(1, 3) + " berserker, and " + (Roll(2, 10) + 5) + " bandits";
				} else if (rand <= 65) {
					return evt + "1d4 hours of extreme cold";
				} else if (rand <= 68) {
					return evt + "a young remorhaz";
				} else if (rand <= 72) {
					return evt + "an orc Eye of Gruumsh with " + Roll(1, 6) + " orogs and " + (Roll(2, 8) + 6) + " orcs";
				} else if (rand <= 75) {
					return evt + "a revenant";
				} else if (rand <= 80) {
					return evt + "a howl that echoes over the land for 1d3 minutes";
				} else if (rand <= 82) {
					return evt + Roll(1, 3) + " mammoths";
				} else if (rand <= 84) {
					return evt + "a young white dragon";
				} else if (rand <= 86) {
					return evt + Roll(2, 4) + " winter wolves";
				} else if (rand <= 88) {
					return evt + (Roll(1, 6) + 2) + " yetis";
				} else if (rand <= 90) {
					return evt + Roll(1, 2) + " frost giants";
				} else if (rand <= 92) {
					return evt + Roll(1, 3) + " werebear";
				} else if (rand <= 94) {
					return evt + Roll(1, 4) + " trolls";
				} else if (rand <= 96) {
					return evt + "an abominable yeti";
				} else if (rand <= 98) {
					return evt + "a remorhaz";
				} else if (rand <= 99) {
					return evt + "a roc";
				} else {
					return evt + Roll(2, 4) + " young remorhazes";
				}
			} else if (rarity == "high") {
				if (rand <= 1) {
					return evt + "an abominable yeti";
				} else if (rand <= 4) {
					return evt + Roll(1, 6) + " revenant";
				} else if (rand <= 10) {
					return evt + (Roll(1, 4) + 1) + " werebears";
				} else if (rand <= 20) {
					return evt + Roll(1, 3) + " young white dragons";
				} else if (rand <= 25) {
					return evt + "a blizzard reduces visibility to 5 feet for 1d6 hours";
				} else if (rand <= 35) {
					return evt + "a roc";
				} else if (rand <= 40) {
					return evt + "A herd of " + (Roll(3, 20) + 60) + " caribou (deer) moving through the snow";
				} else if (rand <= 50) {
					return evt + Roll(1, 4) + " mammoth";
				} else if (rand <= 60) {
					return evt + (Roll(1, 8) + 1) + " trolls";
				} else if (rand <= 65) {
					return evt + Roll(2, 3) + " ogres hunting " + Roll(1, 4) + " mammoth";
				} else if (rand <= 75) {
					return evt + Roll(2, 4) + " remorhazes";
				} else if (rand <= 80) {
					return evt + "A crumbling ice castle littered with the frozen bodies of blue-skinned humainoids";
				} else if (rand <= 90) {
					return evt + "an adult white dragon";
				} else if (rand <= 96) {
					return evt + (Roll(2, 4) + 1) + " frost giants";
				} else if (rand <= 99) {
					return evt + Roll(1, 4) + " remorhaz";
				} else {
					return evt + "an ancient white dragon";
				}
			} else {
				if (rand <= 2) {
					return evt + Roll(2, 10) + " revenants";
				} else if (rand <= 4) {
					return evt + Roll(2, 8) + " trolls";
				} else if (rand <= 6) {
					return evt + Roll(2, 10) + " werebears";
				} else if (rand <= 8) {
					return evt + "a frost giant";
				} else if (rand <= 10) {
					return evt + Roll(2, 4) + " young remorhazes";
				} else if (rand <= 20) {
					return evt + Roll(1, 4) + " frost giant";
				} else if (rand <= 25) {
					return evt + Roll(1, 4) + " frost giant hunting a mammoth";
				} else if (rand <= 35) {
					return evt + "an ancient white dragon";
				} else if (rand <= 40) {
					return evt + "a roc fighting an adult white dragon";
				} else if (rand <= 50) {
					return evt + Roll(1, 3) + " abominable yeti";
				} else if (rand <= 60) {
					return evt + Roll(1, 4) + " remorhazes";
				} else if (rand <= 65) {
					return evt + "a 500 foot high wall of ice that is 300 feet thick, stretching 2d4 miles";
				} else if (rand <= 75) {
					return evt + Roll(1, 4) + " roc";
				} else if (rand <= 80) {
					return evt + "an adult white dragon eating a mammoth";
				} else if (rand <= 90) {
					return evt + Roll(1, 10) + " frost giant with " + Roll(2, 4) + " polar bears";
				} else if (rand <= 96) {
					return evt + Roll(1, 3) + " adult white dragons";
				} else if (rand <= 99) {
					return evt + Roll(2, 4) + " abominable yetis";
				} else {
					return evt + "an ancient white dragon with " + Roll(1, 3) + " young white dragons";
				}
			}
			break;
		case "Urban":
			if (rarity == "low") {
				if (rand <= 1) {
					return evt + (Roll(1, 6)) + " cats";
				} else if (rand <= 3) {
					return evt + "a Commoner with " + (Roll(1, 6)) + " goats";
				} else if (rand <= 5) {
					return evt + (Roll(2, 10)) + " rats";
				} else if (rand <= 6) {
					return evt + "a raven perched on a signpost";
				} else if (rand <= 7) {
					return evt + "a commoners leading " + (Roll(1, 4)) + " mules or " + (Roll(1, 4)) + " ponies";
				} else if (rand <= 8) {
					return evt + (Roll(2, 4)) + " mastiffs";
				} else if (rand <= 9) {
					return evt + (Roll(1, 2)) + " commoners leading " + (Roll(1, 4)) + " mules or " + (Roll(1, 4)) + " ponies";
				} else if (rand <= 10) {
					return evt + "a Pseudodragon";
				} else if (rand <= 11) {
					return evt + "a spy";
				} else if (rand <= 13) {
					return evt + (Roll(1, 8) + 1) + " acolytes";
				} else if (rand <= 14) {
					return evt + (Roll(1, 6) + 6) + " flying snakes";
				} else if (rand <= 15) {
					return evt + (Roll(3, 6)) + " Kobolds";
				} else if (rand <= 16) {
					return evt + (Roll(2, 4)) + " giant centipedes";
				} else if (rand <= 17) {
					return evt + (Roll(1, 8) + 1) + " skeletons";
				} else if (rand <= 19) {
					return evt + (Roll(1, 6) + 2) + " swarms of rats";
				} else if (rand <= 20) {
					return evt + (Roll(1, 12)) + " Zombies";
				} else if (rand <= 25) {
					return evt + "a peddler weighed down with a load of pots, pans, and other basic supplies";
				} else if (rand <= 26) {
					return evt + "a Giant Wasp";
				} else if (rand <= 28) {
					return evt + "a Warhorse";
				} else if (rand <= 29) {
					return evt + (Roll(2, 8)) + " Cultists";
				} else if (rand <= 31) {
					return evt + (Roll(3, 4)) + " giant rats";
				} else if (rand <= 32) {
					return evt + (Roll(2, 8)) + " stirges";
				} else if (rand <= 33) {
					return evt + (Roll(1, 3) + 2) + " giant poisonous snakes";
				} else if (rand <= 34) {
					return evt + (Roll(1, 4) + 2) + " swarms of bats";
				} else if (rand <= 35) {
					return evt + (Roll(2, 4)) + " winged Kobolds";
				} else if (rand <= 40) {
					return evt + "a wagon loaded with apples that has a broken wheel and holds up traffic";
				} else if (rand <= 41) {
					return evt + "a Crocodile";
				} else if (rand <= 43) {
					return evt + "a Swarm of Insects";
				} else if (rand <= 45) {
					return evt + (Roll(3, 6)) + " bandits";
				} else if (rand <= 47) {
					return evt + (Roll(1, 3) + 2) + " nobles on riding horses with an escort of " + (Roll(1, 10)) + " guards";
				} else if (rand <= 48) {
					return evt + (Roll(2, 4)) + " kenku";
				} else if (rand <= 49) {
					return evt + (Roll(1, 6) + 2) + " smoke mephits";
				} else if (rand <= 50) {
					return evt + (Roll(1, 8) + 1) + " Swarm of Ravens";
				} else if (rand <= 52) {
					return evt + "a Wererat";
				} else if (rand <= 54) {
					return evt + (Roll(1, 3)) + " half-ogres";
				} else if (rand <= 56) {
					return evt + "a mimic";
				} else if (rand <= 58) {
					return evt + (Roll(1, 4)) + " Ghouls";
				} else if (rand <= 60) {
					return evt + (Roll(1, 4)) + " specters";
				} else if (rand <= 62) {
					return evt + (Roll(1, 10)) + " shadows";
				} else if (rand <= 65) {
					return evt + "Someone empties a chamber pot onto the street from a second-floor window";
				} else if (rand <= 67) {
					return evt + "a ghast";
				} else if (rand <= 69) {
					return evt + "a Priest";
				} else if (rand <= 71) {
					return evt + "a Will-o'-Wisp";
				} else if (rand <= 73) {
					return evt + (Roll(1, 3)) + " Giant Spider";
				} else if (rand <= 75) {
					return evt + (Roll(1, 4)) + " Yuan-ti purebloods";
				} else if (rand <= 77) {
					return evt + (Roll(2, 4)) + " thugs";
				} else if (rand <= 80) {
					return evt + "a doomsayer who preaches the end of the world from a street corner";
				} else if (rand <= 81) {
					return evt + "a Cambion";
				} else if (rand <= 82) {
					return evt + "a Vampire Spawn";
				} else if (rand <= 83) {
					return evt + "a Couatl";
				} else if (rand <= 84) {
					return evt + "a ghost";
				} else if (rand <= 85) {
					return evt + "a Succubus or 1 Incubus";
				} else if (rand <= 86) {
					return evt + "a Bandit Captain with " + (Roll(3, 6)) + " bandits";
				} else if (rand <= 87) {
					return evt + (Roll(1, 4) + 1) + " cult fanatics";
				} else if (rand <= 88) {
					return evt + "a Knight or 1 Veteran";
				} else if (rand <= 89) {
					return evt + "a Water Weird";
				} else if (rand <= 90) {
					return evt + "a wight";
				} else if (rand <= 91) {
					return evt + "a mage";
				} else if (rand <= 92) {
					return evt + "a Shield Guardian";
				} else if (rand <= 93) {
					return evt + "a Gladiator";
				} else if (rand <= 94) {
					return evt + "a Revenant";
				} else if (rand <= 95) {
					return evt + (Roll(2, 4)) + " gargoyles";
				} else if (rand <= 96) {
					return evt + (Roll(1, 4)) + " doppelgangers";
				} else if (rand <= 97) {
					return evt + "a oni";
				} else if (rand <= 98) {
					return evt + "a Invisible Stalker";
				} else if (rand <= 99) {
					return evt + (Roll(1, 8) + 1) + " phase spiders";
				} else {
					return evt + "a Assassin";
				}
			} else if (rarity == "middle") {
				if (rand <= 2) {
					return evt + (Roll(1, 10)) + " kenku";
				} else if (rand <= 4) {
					return evt + (Roll(2, 6)) + " giant centipedes";
				} else if (rand <= 6) {
					return evt + (Roll(2, 8)) + " skeletons";
				} else if (rand <= 8) {
					return evt + (Roll(1, 6)) + " swarms of bats and " + (Roll(1, 6)) + " swarms of rats";
				} else if (rand <= 10) {
					return evt + (Roll(3, 6)) + " winged Kobolds";
				} else if (rand <= 13) {
					return evt + (Roll(2, 4)) + " specters";
				} else if (rand <= 16) {
					return evt + (Roll(1, 4)) + " wights";
				} else if (rand <= 19) {
					return evt + (Roll(4, 4)) + " acolytes on draft horses";
				} else if (rand <= 22) {
					return evt + (Roll(3, 6)) + " giant centipedes";
				} else if (rand <= 25) {
					return evt + "a talkative Urchin, badgering passersby to serve as their guide through the community for a price of 1 sp";
				} else if (rand <= 28) {
					return evt + (Roll(1, 10)) + " spies";
				} else if (rand <= 31) {
					return evt + (Roll(3, 6)) + " crocodiles";
				} else if (rand <= 34) {
					return evt + (Roll(1, 6) + 2) + " swarms of insects";
				} else if (rand <= 37) {
					return evt + (Roll(2, 4)) + " smoke mephits";
				} else if (rand <= 40) {
					return evt + "a noble shouts 'Stop! Thief!' at a fleeing scoundrel (Bandit)";
				} else if (rand <= 43) {
					return evt + "a Succubus or 1 Incubus";
				} else if (rand <= 46) {
					return evt + (Roll(1, 10)) + " half-ogres";
				} else if (rand <= 49) {
					return evt + (Roll(2, 10)) + " giant wasps";
				} else if (rand <= 51) {
					return evt + (Roll(4, 10)) + " Zombies";
				} else if (rand <= 53) {
					return evt + (Roll(1, 4)) + " knights on warhorses";
				} else if (rand <= 55) {
					return evt + (Roll(1, 4) + 1) + " water weirds";
				} else if (rand <= 57) {
					return evt + (Roll(1, 8) + 1) + " mimics";
				} else if (rand <= 59) {
					return evt + (Roll(2, 8)) + " giant spiders";
				} else if (rand <= 61) {
					return evt + (Roll(3, 6)) + " shadows";
				} else if (rand <= 65) {
					return evt + "an actor leans out from a second-story window to call to passersby, announcing a show";
				} else if (rand <= 67) {
					return evt + "a Bandit Captain with " + (Roll(3, 8)) + " bandits";
				} else if (rand <= 69) {
					return evt + (Roll(1, 10)) + " will-o'-wisps";
				} else if (rand <= 71) {
					return evt + (Roll(2, 4)) + " Priests";
				} else if (rand <= 74) {
					return evt + (Roll(3, 6)) + " Yuan-ti purebloods";
				} else if (rand <= 76) {
					return evt + (Roll(2, 10)) + " thugs";
				} else if (rand <= 80) {
					return evt + "a fortune-teller reads cards for those who pay a price of 1 sp";
				} else if (rand <= 81) {
					return evt + (Roll(1, 3)) + " gladiators";
				} else if (rand <= 82) {
					return evt + (Roll(1, 4) + 1) + " couatls";
				} else if (rand <= 83) {
					return evt + (Roll(1, 8)) + " ghosts";
				} else if (rand <= 84) {
					return evt + (Roll(2, 4)) + " doppelgangers";
				} else if (rand <= 85) {
					return evt + (Roll(1, 6) + 2) + " phase spiders";
				} else if (rand <= 86) {
					return evt + (Roll(2, 4)) + " veterans";
				} else if (rand <= 87) {
					return evt + (Roll(1, 8)) + " ghasts with " + (Roll(2, 6)) + " Ghouls";
				} else if (rand <= 88) {
					return evt + (Roll(3, 6)) + " gargoyles";
				} else if (rand <= 89) {
					return evt + (Roll(2, 10)) + " cult fanatics";
				} else if (rand <= 90) {
					return evt + (Roll(3, 6)) + " wererats";
				} else if (rand <= 91) {
					return evt + "a assassins";
				} else if (rand <= 92) {
					return evt + (Roll(1, 3)) + " Invisible stalkers";
				} else if (rand <= 93) {
					return evt + "a Gray Slaad";
				} else if (rand <= 94) {
					return evt + "a Young Silver Dragon";
				} else if (rand <= 95) {
					return evt + (Roll(1, 4)) + " cambions or " + (Roll(1, 4)) + " revenants";
				} else if (rand <= 96) {
					return evt + (Roll(3, 6)) + " wights";
				} else if (rand <= 97) {
					return evt + "a Archmage";
				} else if (rand <= 98) {
					return evt + (Roll(2, 4)) + " Vampire Spawn or " + (Roll(1, 4)) + " oni";
				} else if (rand <= 99) {
					return evt + "a mage with 1 Shield Guardian";
				} else {
					return evt + "a Rakshasa or 1 Vampire";
				}
			} else if (rarity == "high") {
				if (rand <= 1) {
					return evt + "a mimic";
				} else if (rand <= 5) {
					return evt + "a Bandit Captain with " + (Roll(5, 10)) + " bandits, all on riding horses";
				} else if (rand <= 10) {
					return evt + (Roll(1, 10)) + " knights on warhorses (one Knight is a Doppelganger)";
				} else if (rand <= 13) {
					return evt + (Roll(1, 8)) + " succubi or " + (Roll(1, 8)) + " incubi";
				} else if (rand <= 16) {
					return evt + (Roll(3, 6)) + " cult fanatics";
				} else if (rand <= 19) {
					return evt + (Roll(1, 10)) + " wights";
				} else if (rand <= 22) {
					return evt + (Roll(3, 6)) + " wererats";
				} else if (rand <= 25) {
					return evt + "a distant boom followed by a plume of smoke rising from the other side of the community";
				} else if (rand <= 28) {
					return evt + (Roll(1, 8) + 1) + " ghosts";
				} else if (rand <= 31) {
					return evt + (Roll(2, 10)) + " gargoyles";
				} else if (rand <= 34) {
					return evt + (Roll(1, 6) + 2) + " water weirds";
				} else if (rand <= 37) {
					return evt + (Roll(1, 4) + 4) + " will-o'-wisps";
				} else if (rand <= 40) {
					return evt + "Street performers putting on a puppet show, involving two puppets beating each other with sticks to the amusement of the gathered crowd";
				} else if (rand <= 43) {
					return evt + (Roll(2, 4)) + " couatls";
				} else if (rand <= 46) {
					return evt + (Roll(2, 8)) + " ghasts";
				} else if (rand <= 51) {
					return evt + (Roll(1, 8) + 1) + " veterans";
				} else if (rand <= 55) {
					return evt + (Roll(3, 4)) + " preists";
				} else if (rand <= 58) {
					return evt + (Roll(2, 4)) + " cambions";
				} else if (rand <= 61) {
					return evt + (Roll(1, 10)) + " revenants";
				} else if (rand <= 65) {
					return evt + (Roll(2, 4)) + " phase spiders";
				} else if (rand <= 69) {
					return evt + "a scruffy Commoner that ducks into an alley to make a purchase from a suspicious-looking figure";
				} else if (rand <= 72) {
					return evt + (Roll(1, 8)) + " Invisible stalkers";
				} else if (rand <= 75) {
					return evt + (Roll(1, 8) + 1) + " gladiators";
				} else if (rand <= 80) {
					return evt + "Two farmers trading blows over the price of potatoes (50% chance for one farmer to be a retired Assassin)";
				} else if (rand <= 82) {
					return evt + (Roll(1, 4)) + " young silver Dragons";
				} else if (rand <= 84) {
					return evt + (Roll(1, 4)) + " assassins";
				} else if (rand <= 86) {
					return evt + (Roll(1, 8)) + " oni";
				} else if (rand <= 88) {
					return evt + (Roll(1, 4)) + " mages with " + (Roll(1, 4)) + " Shield guardians";
				} else if (rand <= 90) {
					return evt + (Roll(1, 10)) + " Vampire Spawn";
				} else if (rand <= 92) {
					return evt + "a Adult Silver Dragon";
				} else if (rand <= 94) {
					return evt + (Roll(1, 4)) + " gray slaadi";
				} else if (rand <= 96) {
					return evt + "a spellcaster Vampire or 1 warrior Vampire";
				} else if (rand <= 97) {
					return evt + "a Archmage speeding down the street on a Riding Horse, blasting " + (Roll(1, 4)) + " guards with Spells";
				} else if (rand <= 98) {
					return evt + "a Rakshasa";
				} else if (rand <= 99) {
					return evt + "a Vampire";
				} else {
					return evt + "a Ancient Silver Dragon";
				}
			} else {
				if (rand <= 5) {
					return evt + (Roll(1, 10)) + " Invisible stalkers";
				} else if (rand <= 10) {
					return evt + (Roll(1, 10)) + " revenants";
				} else if (rand <= 14) {
					return evt + (Roll(1, 6) + 2) + " gladiators";
				} else if (rand <= 18) {
					return evt + (Roll(2, 4)) + " cambions";
				} else if (rand <= 22) {
					return evt + (Roll(2, 6)) + " succubi or " + (Roll(2, 6)) + " incubi";
				} else if (rand <= 25) {
					return evt + "a witch (Archmage) who zooms overhead on a Broom of Flying";
				} else if (rand <= 30) {
					return evt + (Roll(1, 4)) + " gray slaadi";
				} else if (rand <= 35) {
					return evt + (Roll(2, 8)) + " couatls";
				} else if (rand <= 40) {
					return evt + "a distraught parent who rushes up to people, begging for help for a child who fell into the sewer";
				} else if (rand <= 45) {
					return evt + (Roll(1, 3)) + " young silver dragons";
				} else if (rand <= 50) {
					return evt + (Roll(3, 6)) + " ghosts";
				} else if (rand <= 55) {
					return evt + "a Adult Silver Dragon";
				} else if (rand <= 60) {
					return evt + (Roll(1, 4)) + " mages with " + (Roll(1, 4)) + " Shield guardians";
				} else if (rand <= 65) {
					return evt + "an aggressive merchant who hawks wares to passersby, claiming to be the purveyor of the finest silks in all the land";
				} else if (rand <= 70) {
					return evt + "a Ancient Silver Dragon";
				} else if (rand <= 75) {
					return evt + (Roll(3, 6)) + " Vampire Spawn";
				} else if (rand <= 80) {
					return evt + "a patrol of " + (Roll(2, 10)) + " guards marching up the street, searching for someone or something";
				} else if (rand <= 85) {
					return evt + (Roll(1, 10)) + " assassins";
				} else if (rand <= 90) {
					return evt + (Roll(1, 4) + 1) + " gray slaadi";
				} else if (rand <= 93) {
					return evt + (Roll(1, 10)) + " oni";
				} else if (rand <= 96) {
					return evt + "a spellcaster Vampire or 1 warrior Vampire";
				} else if (rand <= 97) {
					return evt + (Roll(1, 4)) + " archmages";
				} else if (rand <= 98) {
					return evt + (Roll(1, 3)) + " Rakshasa";
				} else if (rand <= 99) {
					return evt + (Roll(1, 4)) + " vampires";
				} else {
					return evt + "a Tarrasque";
				}
			}
			break;
		case "SeaVoyages":
		case "Water":
			if (rarity == "low") {
				if (rand <= 10) {
					return evt + (Roll(3, 6)) + " quippers";
				} else if (rand <= 14) {
					return evt + (Roll(2, 4)) + " steam mehpits";
				} else if (rand <= 18) {
					return evt + (Roll(1, 4)) + " Sahuagin";
				} else if (rand <= 22) {
					return evt + (Roll(2, 6)) + " Merfolk";
				} else if (rand <= 25) {
					return evt + (Roll(2, 4)) + " corpses of drowned sailors tangled in kelp";
				} else if (rand <= 29) {
					return evt + (Roll(2, 4)) + " constrictor snakes";
				} else if (rand <= 33) {
					return evt + (Roll(1, 4)) + " reef sharks";
				} else if (rand <= 37) {
					return evt + "a Swarm of Quippers";
				} else if (rand <= 40) {
					return evt + "a bed of enormous clams";
				} else if (rand <= 45) {
					return evt + (Roll(1, 10)) + " Merfolk with " + (Roll(1, 3)) + " giant sea horses";
				} else if (rand <= 50) {
					return evt + "a Giant Octopus";
				} else if (rand <= 55) {
					return evt + "a Merrow";
				} else if (rand <= 60) {
					return evt + "a Plesiosaurus";
				} else if (rand <= 65) {
					return evt + (Roll(2, 10)) + " pieces of corroded brass dinnerware littering the bottom";
				} else if (rand <= 70) {
					return evt + "a Giant Constrictor Snake";
				} else if (rand <= 75) {
					return evt + "a Sea Hag";
				} else if (rand <= 80) {
					return evt + "a school of silvery fish darting through the water";
				} else if (rand <= 85) {
					return evt + (Roll(1, 4)) + " Hunter sharks";
				} else if (rand <= 90) {
					return evt + "a Sahuagin Priestess with " + (Roll(2, 4)) + " Sahuagin";
				} else if (rand <= 96) {
					return evt + (Roll(1, 4)) + " killer whales";
				} else if (rand <= 98) {
					return evt + "a Giant Shark";
				} else if (rand <= 99) {
					return evt + "a Water Elemental";
				} else {
					return evt + "a Sahuagin Baron";
				}
			} else if (rarity == "middle") {
				if (rand <= 2) {
					return evt + (Roll(3, 6)) + " steam mephits";
				} else if (rand <= 4) {
					return evt + (Roll(1, 10)) + " Sahuagin";
				} else if (rand <= 6) {
					return evt + "a giant octpus";
				} else if (rand <= 8) {
					return evt + (Roll(3, 6)) + " constrictor snakes";
				} else if (rand <= 10) {
					return evt + (Roll(2, 10)) + " Merfolk with " + (Roll(1, 4)) + " giant sea horses";
				} else if (rand <= 15) {
					return evt + (Roll(1, 4)) + " sea hags";
				} else if (rand <= 20) {
					return evt + (Roll(2, 4)) + " swarms of quippers";
				} else if (rand <= 25) {
					return evt + "a sunken galleon with a 50% chance of a random Treasure hoard inside (roll on the Treasure Hoard: Challenge 5-10 table in chapter 7 of the Dungeon Master's Guide)";
				} else if (rand <= 30) {
					return evt + (Roll(1, 4)) + " plesiosauruses";
				} else if (rand <= 35) {
					return evt + (Roll(3, 6)) + " reef sharks";
				} else if (rand <= 40) {
					return evt + "an abandoned bathysphere";
				} else if (rand <= 50) {
					return evt + (Roll(1, 4)) + " giant constrictor snakes";
				} else if (rand <= 55) {
					return evt + (Roll(2, 4)) + " Hunter sharks";
				} else if (rand <= 60) {
					return evt + (Roll(1, 3)) + " Sahuagin priestesses with " + (Roll(2, 10)) + " Sahuagin";
				} else if (rand <= 65) {
					return evt + "an empty castle made from coral";
				} else if (rand <= 70) {
					return evt + (Roll(1, 4)) + " killer whales";
				} else if (rand <= 75) {
					return evt + (Roll(1, 10)) + " Merrow";
				} else if (rand <= 80) {
					return evt + "an eerie statue of a squatting humanoid, with bat wings on its back and tentacles sprouting from its face";
				} else if (rand <= 85) {
					return evt + (Roll(1, 4)) + " water Elementals";
				} else if (rand <= 90) {
					return evt + "a Sahuagin Baron with " + (Roll(2, 8)) + " Sahuagin";
				} else if (rand <= 96) {
					return evt + (Roll(1, 4)) + " giant sharks";
				} else if (rand <= 99) {
					return evt + "a marid";
				} else {
					return evt + "a Storm Giant";
				}
			} else {
				if (rand <= 10) {
					return evt + "a Sahuagin Baron with " + (Roll(1, 4)) + " Sahuagin priestesses and " + (Roll(2, 10)) + " Sahuagin";
				} else if (rand <= 35) {
					return evt + (Roll(1, 10)) + " killer whales";
				} else if (rand <= 40) {
					return evt + "a ghost ship passing overhead, containing " + (Roll(2, 6) + 10) + " ghosts";
				} else if (rand <= 60) {
					return evt + (Roll(1, 6)) + " giant sharks";
				} else if (rand <= 65) {
					return evt + "a 1-mile-radius Sphere of effervescent water that allows air-breathing creatures to breathe water while in the Sphere";
				} else if (rand <= 75) {
					return evt + (Roll(1, 10)) + " water Elementals";
				} else if (rand <= 80) {
					return evt + "a shimmering, blue-green portal to the Elemental Plane of Water";
				} else if (rand <= 90) {
					return evt + (Roll(1, 4)) + " marids";
				} else if (rand <= 96) {
					return evt + (Roll(1, 3)) + " Storm Giants";
				} else if (rand <= 99) {
					return evt + "a Dragon Turtle";
				} else {
					return evt + "a Kraken";
				}
			}
			break;
		case "Underdark":
			if (rarity == "low") {
				if (rand <= 1) {
					return evt + "a Mind Flayer Arcanist";
				} else if (rand <= 2) {
					return evt + (Roll(1, 3) + 1) + " giant poisonous snakes";
				} else if (rand <= 3) {
					return evt + (Roll(1, 3)) + " giant lizards";
				} else if (rand <= 4) {
					return evt + (Roll(2, 4)) + " giant fire beetles";
				} else if (rand <= 5) {
					return evt + (Roll(1, 8) + 1) + " flumphs";
				} else if (rand <= 6) {
					return evt + "a Shrieker";
				} else if (rand <= 7) {
					return evt + (Roll(1, 12)) + " giant rats";
				} else if (rand <= 8) {
					return evt + (Roll(2, 4)) + " Kobolds";
				} else if (rand <= 9) {
					return evt + (Roll(1, 8) + 1) + " stirges";
				} else if (rand <= 10) {
					return evt + (Roll(2, 4)) + " humans (Tribal Warriors) seeking the way to the surface, fleeing their Underdark oppressors";
				} else if (rand <= 12) {
					return evt + (Roll(1, 10)) + " troglodytes";
				} else if (rand <= 14) {
					return evt + (Roll(1, 2)) + " gray oozes";
				} else if (rand <= 16) {
					return evt + (Roll(3, 6)) + " stirges";
				} else if (rand <= 18) {
					return evt + (Roll(1, 3)) + " magma mephits";
				} else if (rand <= 20) {
					return evt + (Roll(1, 10)) + " Goblins";
				} else if (rand <= 22) {
					return evt + "Orc graffiti on the walls, suggesting something rude about the mother of someone named Krusk";
				} else if (rand <= 24) {
					return evt + "a Swarm of Insects";
				} else if (rand <= 25) {
					return evt + "a deep gnome";
				} else if (rand <= 28) {
					return evt + (Roll(1, 8) + 1) + " drow";
				} else if (rand <= 30) {
					return evt + (Roll(1, 4)) + " violet fungi";
				} else if (rand <= 32) {
					return evt + (Roll(1, 12)) + " Kuo-toa";
				} else if (rand <= 33) {
					return evt + "a Rust Monster";
				} else if (rand <= 35) {
					return evt + "a rubble-strewn passage that appears to have been recently cleared after a cave-in";
				} else if (rand <= 37) {
					return evt + (Roll(1, 8) + 1) + " giant bats";
				} else if (rand <= 39) {
					return evt + (Roll(3, 6)) + " Kobolds";
				} else if (rand <= 41) {
					return evt + (Roll(2, 4)) + " Grimlocks";
				} else if (rand <= 43) {
					return evt + (Roll(1, 4) + 3) + " swarms of bats";
				} else if (rand <= 44) {
					return evt + "a dwarf prospector (scout) looking for gold";
				} else if (rand <= 45) {
					return evt + "a Carrion Crawler or 1 Gelatinous Cube";
				} else if (rand <= 46) {
					return evt + (Roll(1, 8)) + " darkmantles or " + (Roll(2, 4)) + " piercers";
				} else if (rand <= 47) {
					return evt + "a Hell Hound";
				} else if (rand <= 48) {
					return evt + (Roll(1, 3)) + " specters";
				} else if (rand <= 49) {
					return evt + (Roll(1, 4)) + " Bugbears";
				} else if (rand <= 50) {
					return evt + (Roll(1, 10) + 5) + " winged Kobolds";
				} else if (rand <= 51) {
					return evt + (Roll(1, 4)) + " fire snakes";
				} else if (rand <= 52) {
					return evt + (Roll(2, 8) + 1) + " troglodytes";
				} else if (rand <= 53) {
					return evt + (Roll(1, 6)) + " giant spiders";
				} else if (rand <= 54) {
					return evt + (Roll(3, 6)) + " Kuo-toa";
				} else if (rand <= 55) {
					return evt + "a Goblin Boss with " + (Roll(2, 4)) + " Goblins";
				} else if (rand <= 56) {
					return evt + (Roll(4, 4)) + " Grimlocks";
				} else if (rand <= 57) {
					return evt + "a Ochre Jelly";
				} else if (rand <= 58) {
					return evt + (Roll(2, 10)) + " giant centipedes";
				} else if (rand <= 59) {
					return evt + "a Nothic or 1 Giant Toad";
				} else if (rand <= 60) {
					return evt + (Roll(1, 4)) + " myconid adults with " + (Roll(5, 4)) + " myconid sprouts";
				} else if (rand <= 61) {
					return evt + "a Minotaur Skeleton or 1 Minotaur";
				} else if (rand <= 62) {
					return evt + (Roll(3, 6)) + " drow";
				} else if (rand <= 63) {
					return evt + "a mimic or 1 Doppelganger";
				} else if (rand <= 64) {
					return evt + (Roll(1, 6) + 3) + " Hobgoblins";
				} else if (rand <= 65) {
					return evt + "a Intellect Devourer or 1 Spectator";
				} else if (rand <= 66) {
					return evt + (Roll(1, 8) + 1) + " orcs";
				} else if (rand <= 68) {
					return evt + "a faint tapping coming from inside a nearby wall";
				} else if (rand <= 69) {
					return evt + "a Gibbering Mouther or 1 Water Weird";
				} else if (rand <= 70) {
					return evt + (Roll(1, 12)) + " gas spores";
				} else if (rand <= 71) {
					return evt + "a Giant Constrictor Snake";
				} else if (rand <= 72) {
					return evt + (Roll(1, 10)) + " shadows";
				} else if (rand <= 73) {
					return evt + (Roll(1, 3)) + " grells";
				} else if (rand <= 74) {
					return evt + (Roll(1, 4)) + " wights";
				} else if (rand <= 75) {
					return evt + (Roll(1, 8) + 1) + " Quaggoth spore Servants";
				} else if (rand <= 76) {
					return evt + (Roll(1, 2)) + " gargoyles";
				} else if (rand <= 77) {
					return evt + (Roll(1, 4)) + " ogres or " + (Roll(1, 3)) + " ettins";
				} else if (rand <= 78) {
					return evt + (Roll(1, 4)) + " dwarf explorers (veterans)";
				} else if (rand <= 80) {
					return evt + "an abandoned miners' camp spattered with blood and littered with the contents of " + (Roll(1, 3)) + " dungeoneer's packs";
				} else if (rand <= 81) {
					return evt + "a chuul or 1 Salamander";
				} else if (rand <= 82) {
					return evt + (Roll(1, 4)) + " phase spiders or " + (Roll(1, 3)) + " hook horrors";
				} else if (rand <= 83) {
					return evt + (Roll(5, 4)) + " Duergar";
				} else if (rand <= 84) {
					return evt + "a ghost or 1 Flameskull or 1 Wraith";
				} else if (rand <= 85) {
					return evt + "a druid with 1 Polar Bear (cave bear)";
				} else if (rand <= 86) {
					return evt + "a Hobgoblin Captain with " + (Roll(1, 4)) + " half-ogres and " + (Roll(2, 10)) + " Hobgoblins";
				} else if (rand <= 87) {
					return evt + "a Earth Elemental or 1 Black Pudding";
				} else if (rand <= 88) {
					return evt + "a Kuo-toa Monitor with " + (Roll(1, 8) + 1) + " Kuo-toa whips";
				} else if (rand <= 89) {
					return evt + "a Quaggoth Thonot with " + (Roll(1, 3)) + " Quaggoths";
				} else if (rand <= 90) {
					return evt + "a Beholder Zombie or 1 Bone Naga";
				} else if (rand <= 91) {
					return evt + "a Orc Eye of Gruumsh with " + (Roll(1, 4)) + " orogs and " + (Roll(2, 8)) + " orcs";
				} else if (rand <= 92) {
					return evt + (Roll(1, 4)) + " ghasts with " + (Roll(1, 10)) + " Ghouls";
				} else if (rand <= 95) {
					return evt + "a reeking puddle where slimy water has dripped from the ceiling";
				} else if (rand <= 96) {
					return evt + "a Otyugh or 1 roper";
				} else if (rand <= 97) {
					return evt + "a Vampire Spawn";
				} else if (rand <= 98) {
					return evt + "a Chimera";
				} else if (rand <= 99) {
					return evt + "a Mind Flayer";
				} else {
					return evt + "a Spirit Naga";
				}
			} else if (rarity == "middle") {
				if (rand <= 1) {
					return evt + (Roll(3, 6)) + " swarms of bats";
				} else if (rand <= 2) {
					return evt + (Roll(1, 4)) + " giant spiders or " + (Roll(1, 4)) + " giant toads";
				} else if (rand <= 3) {
					return evt + "a mimic";
				} else if (rand <= 4) {
					return evt + (Roll(2, 4)) + " gray oozes";
				} else if (rand <= 5) {
					return evt + (Roll(2, 10)) + " orcs or " + (Roll(3, 6)) + " troglodytes";
				} else if (rand <= 6) {
					return evt + (Roll(3, 6)) + " Grimlocks";
				} else if (rand <= 7) {
					return evt + (Roll(1, 6) + 2) + " magma mephits";
				} else if (rand <= 8) {
					return evt + "a Goblin Boss with " + (Roll(2, 4)) + " Goblins";
				} else if (rand <= 9) {
					return evt + (Roll(2, 4)) + " darkmantles";
				} else if (rand <= 10) {
					return evt + (Roll(2, 8) + 1) + " drow";
				} else if (rand <= 11) {
					return evt + (Roll(2, 10)) + " piercers";
				} else if (rand <= 12) {
					return evt + (Roll(1, 4)) + " Minotaur skeletons";
				} else if (rand <= 14) {
					return evt + (Roll(3, 6)) + " Deep Gnomes";
				} else if (rand <= 15) {
					return evt + "a druid with 1 Polar Bear (cave bear)";
				} else if (rand <= 17) {
					return evt + (Roll(3, 6)) + " orcs";
				} else if (rand <= 18) {
					return evt + "a Bone Naga";
				} else if (rand <= 20) {
					return evt + (Roll(2, 6)) + " Bugbears";
				} else if (rand <= 25) {
					return evt + "Luminescent fungi growing on the walls of a moist cave, filling it with dim light";
				} else if (rand <= 26) {
					return evt + (Roll(2, 4)) + " specters";
				} else if (rand <= 27) {
					return evt + (Roll(1, 12) + 4) + " shadows";
				} else if (rand <= 28) {
					return evt + (Roll(1, 3)) + " gibbering mouthers";
				} else if (rand <= 30) {
					return evt + (Roll(4, 4)) + " Hobgoblins";
				} else if (rand <= 32) {
					return evt + (Roll(1, 4)) + " carrion crawlers";
				} else if (rand <= 34) {
					return evt + "a Black Pudding";
				} else if (rand <= 35) {
					return evt + (Roll(1, 4)) + " ochre jellies";
				} else if (rand <= 40) {
					return evt + "a patch of mold that appears yellow when light is directed toward it";
				} else if (rand <= 41) {
					return evt + (Roll(1, 4)) + " nothics";
				} else if (rand <= 43) {
					return evt + (Roll(2, 8) + 1) + " gas spores";
				} else if (rand <= 45) {
					return evt + (Roll(1, 3)) + " gelatinous cubes";
				} else if (rand <= 46) {
					return evt + "a ghost";
				} else if (rand <= 48) {
					return evt + "a Flameskull";
				} else if (rand <= 50) {
					return evt + (Roll(2, 8)) + " Duergar";
				} else if (rand <= 51) {
					return evt + "a Wraith";
				} else if (rand <= 52) {
					return evt + "a Umber Hulk";
				} else if (rand <= 53) {
					return evt + "a xorn";
				} else if (rand <= 54) {
					return evt + (Roll(1, 6) + 2) + " dwarf hunters (veterans) searching for Trolls";
				} else if (rand <= 55) {
					return evt + "a Hobgoblin Captain with " + (Roll(3, 10)) + " Hobgoblins";
				} else if (rand <= 56) {
					return evt + "a roper";
				} else if (rand <= 57) {
					return evt + "a Kuo-toa monitor with " + (Roll(1, 4)) + " Kuo-toa whips and " + (Roll(1, 8) + 1) + " Kuo-toa";
				} else if (rand <= 58) {
					return evt + (Roll(1, 3)) + " water weirds";
				} else if (rand <= 59) {
					return evt + (Roll(1, 4)) + " ghasts with " + (Roll(1, 10)) + " Ghouls";
				} else if (rand <= 60) {
					return evt + "a Otyugh";
				} else if (rand <= 62) {
					return evt + "a merchant caravan consisting of 1 Drow Mage, 2 drow elite warriors, and " + (Roll(2, 10)) + " Quaggoths";
				} else if (rand <= 63) {
					return evt + (Roll(1, 4)) + " wights";
				} else if (rand <= 64) {
					return evt + (Roll(1, 4)) + " doppelgangers";
				} else if (rand <= 65) {
					return evt + (Roll(2, 8)) + " fire snakes";
				} else if (rand <= 66) {
					return evt + (Roll(1, 4)) + " spectators";
				} else if (rand <= 67) {
					return evt + "a Orc Eye of Gruumsh with " + (Roll(1, 4)) + " orogs and " + (Roll(2, 10) + 3) + " orcs";
				} else if (rand <= 68) {
					return evt + (Roll(1, 3)) + " Vampire Spawn";
				} else if (rand <= 69) {
					return evt + (Roll(1, 4)) + " hook horrors or " + (Roll(1, 4)) + " minotaurs";
				} else if (rand <= 70) {
					return evt + (Roll(3, 6)) + " Quaggoth spore Servants";
				} else if (rand <= 72) {
					return evt + (Roll(1, 3)) + " grells";
				} else if (rand <= 73) {
					return evt + (Roll(1, 6) + 1) + " Intellect Devourers";
				} else if (rand <= 74) {
					return evt + (Roll(1, 10)) + " gargoyles";
				} else if (rand <= 75) {
					return evt + "a Beholder Zombie";
				} else if (rand <= 77) {
					return evt + "a Quaggoth Thonot with " + (Roll(2, 4)) + " Quaggoths";
				} else if (rand <= 78) {
					return evt + (Roll(1, 6)) + " ettins or " + (Roll(1, 4)) + " Trolls";
				} else if (rand <= 79) {
					return evt + (Roll(1, 8) + 1) + " phase spiders";
				} else if (rand <= 80) {
					return evt + "a Fomorian or " + (Roll(1, 3)) + " cyclopes";
				} else if (rand <= 81) {
					return evt + (Roll(1, 4)) + " earth Elementals";
				} else if (rand <= 82) {
					return evt + (Roll(3, 6)) + " ogres";
				} else if (rand <= 83) {
					return evt + (Roll(1, 4) + 1) + " chuuls";
				} else if (rand <= 84) {
					return evt + (Roll(1, 10)) + " hell hounds";
				} else if (rand <= 85) {
					return evt + (Roll(1, 3)) + " drow elite warriors";
				} else if (rand <= 86) {
					return evt + (Roll(1, 4)) + " chimeras";
				} else if (rand <= 87) {
					return evt + (Roll(1, 4)) + " salamanders";
				} else if (rand <= 88) {
					return evt + "a Cloaker";
				} else if (rand <= 89) {
					return evt + (Roll(2, 4)) + " wights";
				} else if (rand <= 90) {
					return evt + (Roll(1, 4)) + " driders";
				} else if (rand <= 91) {
					return evt + "a Fire Giants";
				} else if (rand <= 92) {
					return evt + "a Grick Alpha with " + (Roll(2, 4)) + " gricks";
				} else if (rand <= 93) {
					return evt + "a Mind Flayer Arcanist";
				} else if (rand <= 94) {
					return evt + (Roll(1, 4)) + " drow mages";
				} else if (rand <= 95) {
					return evt + "a Spirit Naga";
				} else if (rand <= 96) {
					return evt + (Roll(1, 4)) + " Mind Flayers";
				} else if (rand <= 97) {
					return evt + "a behir";
				} else if (rand <= 98) {
					return evt + "a Aboleth";
				} else if (rand <= 99) {
					return evt + "a dao or 1 Stone Giant";
				} else {
					return evt + "a Beholder";
				}
			} else if (rarity == "high") {
				if (rand <= 2) {
					return evt + (Roll(3, 6)) + " carrion crawlers";
				} else if (rand <= 4) {
					return evt + (Roll(1, 6) + 1) + " gelatinous cubes";
				} else if (rand <= 6) {
					return evt + (Roll(1, 8) + 2) + " gibbering mouthers";
				} else if (rand <= 8) {
					return evt + (Roll(2, 8)) + " Minotaur skeletons";
				} else if (rand <= 10) {
					return evt + (Roll(2, 6)) + " ochre jellies";
				} else if (rand <= 12) {
					return evt + (Roll(2, 4)) + " doppelgangers";
				} else if (rand <= 14) {
					return evt + (Roll(1, 4)) + " Quaggoth thonots with " + (Roll(1, 10) + 2) + " Quaggoths";
				} else if (rand <= 16) {
					return evt + (Roll(1, 3)) + " ropers";
				} else if (rand <= 18) {
					return evt + (Roll(3, 6)) + " gargoyles";
				} else if (rand <= 20) {
					return evt + (Roll(1, 10)) + " mimics";
				} else if (rand <= 25) {
					return evt + "a 100-foot-long ravine, " + (Roll(4, 10)) + " feet wide and " + (Roll(5, 20) + 200) + " feet deep";
				} else if (rand <= 27) {
					return evt + "a Hobgoblin Captain with " + (Roll(3, 10)) + " Hobgoblins";
				} else if (rand <= 29) {
					return evt + (Roll(2, 4)) + " spectators";
				} else if (rand <= 31) {
					return evt + (Roll(3, 6)) + " ghasts";
				} else if (rand <= 33) {
					return evt + (Roll(2, 8)) + " Intellect Devourers";
				} else if (rand <= 35) {
					return evt + (Roll(1, 3)) + " orc Eyes of Gruumsh with " + (Roll(2, 4)) + " orogs and " + (Roll(2, 10)) + " orcs";
				} else if (rand <= 40) {
					return evt + "a large cave containing " + (Roll(2, 10)) + " extraordinarily detailed statues of various creatures";
				} else if (rand <= 42) {
					return evt + (Roll(1, 8) + 1) + " Kuo-toa monitors";
				} else if (rand <= 44) {
					return evt + (Roll(2, 4)) + " water weirds";
				} else if (rand <= 46) {
					return evt + (Roll(2, 10)) + " gricks";
				} else if (rand <= 48) {
					return evt + (Roll(3, 6)) + " nothics";
				} else if (rand <= 50) {
					return evt + (Roll(2, 8) + 1) + " ogres";
				} else if (rand <= 52) {
					return evt + (Roll(1, 6) + 2) + " chuuls";
				} else if (rand <= 54) {
					return evt + (Roll(1, 8) + 1) + " ettins";
				} else if (rand <= 55) {
					return evt + (Roll(3, 6)) + " grells";
				} else if (rand <= 56) {
					return evt + (Roll(2, 4)) + " flameskulls";
				} else if (rand <= 57) {
					return evt + (Roll(2, 12)) + " dwarf soldiers (veterans) on patrol";
				} else if (rand <= 58) {
					return evt + (Roll(2, 8)) + " hell hounds";
				} else if (rand <= 59) {
					return evt + (Roll(1, 10)) + " ghosts";
				} else if (rand <= 60) {
					return evt + (Roll(3, 4)) + " wights";
				} else if (rand <= 61) {
					return evt + (Roll(3, 6)) + " phase spiders";
				} else if (rand <= 62) {
					return evt + (Roll(1, 8) + 1) + " bone nagas";
				} else if (rand <= 65) {
					return evt + "a shrill scream followed by dark laughter";
				} else if (rand <= 66) {
					return evt + (Roll(1, 4)) + " chimeras";
				} else if (rand <= 67) {
					return evt + (Roll(1, 10)) + " black puddings";
				} else if (rand <= 68) {
					return evt + (Roll(3, 6)) + " minotaurs";
				} else if (rand <= 69) {
					return evt + (Roll(2, 4)) + " otyughs";
				} else if (rand <= 70) {
					return evt + (Roll(1, 6) + 1) + " Beholder Zombies";
				} else if (rand <= 71) {
					return evt + (Roll(4, 4)) + " hook horrors";
				} else if (rand <= 72) {
					return evt + (Roll(1, 8) + 1) + " umber hulks";
				} else if (rand <= 73) {
					return evt + (Roll(2, 4)) + " salamanders";
				} else if (rand <= 74) {
					return evt + (Roll(1, 3)) + " grick alphas";
				} else if (rand <= 75) {
					return evt + (Roll(1, 6) + 2) + " xorn";
				} else if (rand <= 80) {
					return evt + "a ruined village that once belonged to Deep Gnomes. A Search has a 50% chance of uncovering " + (Roll(1, 3)) + " potions of Healing and a 25% chance of finding a random Common Magic Items.";
				} else if (rand <= 81) {
					return evt + (Roll(2, 4)) + " earth Elementals";
				} else if (rand <= 82) {
					return evt + (Roll(1, 3)) + " spirit nagas";
				} else if (rand <= 83) {
					return evt + (Roll(1, 8) + 1) + " cyclopes";
				} else if (rand <= 84) {
					return evt + (Roll(1, 6) + 2) + " Trolls";
				} else if (rand <= 85) {
					return evt + (Roll(2, 4)) + " stone Giants";
				} else if (rand <= 86) {
					return evt + (Roll(2, 4)) + " wraiths";
				} else if (rand <= 87) {
					return evt + (Roll(1, 4)) + " fomorians";
				} else if (rand <= 88) {
					return evt + (Roll(1, 3)) + " drow mages with " + (Roll(1, 4)) + " drow elite warriors";
				} else if (rand <= 89) {
					return evt + (Roll(1, 10)) + " Vampire Spawn";
				} else if (rand <= 90) {
					return evt + (Roll(1, 3)) + " cloakers";
				} else if (rand <= 91) {
					return evt + (Roll(1, 4)) + " Fire Giants";
				} else if (rand <= 92) {
					return evt + "a Mind Flayer Arcanist with " + (Roll(1, 6) + 1) + " Mind Flayers";
				} else if (rand <= 93) {
					return evt + (Roll(1, 4)) + " dao";
				} else if (rand <= 94) {
					return evt + (Roll(1, 8) + 1) + " driders";
				} else if (rand <= 95) {
					return evt + (Roll(1, 3)) + " behirs";
				} else if (rand <= 96) {
					return evt + (Roll(1, 4)) + " aboleths";
				} else if (rand <= 97) {
					return evt + "a Beholder";
				} else if (rand <= 98) {
					return evt + "a Young Red Shadow Dragon";
				} else if (rand <= 99) {
					return evt + "a Death Tyrant";
				} else {
					return evt + "a Purple Worm";
				}
			} else {
				if (rand <= 1) {
					return evt + (Roll(1, 4)) + " grick alphas";
				} else if (rand <= 2) {
					return evt + (Roll(2, 8)) + " spectators";
				} else if (rand <= 4) {
					return evt + (Roll(3, 6)) + " minotaurs or " + (Roll(2, 8)) + " Kuo-toa monitors";
				} else if (rand <= 6) {
					return evt + (Roll(2, 8)) + " grells";
				} else if (rand <= 8) {
					return evt + (Roll(2, 10)) + " phase spiders";
				} else if (rand <= 10) {
					return evt + (Roll(4, 4)) + " hell hounds";
				} else if (rand <= 12) {
					return evt + (Roll(1, 6) + 2) + " ropers";
				} else if (rand <= 14) {
					return evt + (Roll(2, 10)) + " wights";
				} else if (rand <= 16) {
					return evt + (Roll(3, 6)) + " doppelgangers";
				} else if (rand <= 18) {
					return evt + (Roll(1, 8) + 1) + " chimeras";
				} else if (rand <= 20) {
					return evt + (Roll(1, 4)) + " cloakers";
				} else if (rand <= 21) {
					return evt + (Roll(1, 4)) + " Hobgoblin captains with " + (Roll(5, 10)) + " Hobgoblins";
				} else if (rand <= 23) {
					return evt + (Roll(1, 8) + 1) + " earth Elementals";
				} else if (rand <= 25) {
					return evt + (Roll(2, 4)) + " Vampire Spawn";
				} else if (rand <= 27) {
					return evt + (Roll(3, 6)) + " minotaurs";
				} else if (rand <= 30) {
					return evt + "a 30-foot-tall inverted black pyramid floating 1 inch above the floor in a large cave";
				} else if (rand <= 32) {
					return evt + (Roll(1, 10)) + " Beholder Zombies";
				} else if (rand <= 34) {
					return evt + (Roll(1, 4)) + " Mind Flayer arcanists";
				} else if (rand <= 36) {
					return evt + (Roll(1, 6) + 2) + " otyughs";
				} else if (rand <= 38) {
					return evt + (Roll(1, 12)) + " Trolls";
				} else if (rand <= 40) {
					return evt + (Roll(1, 10)) + " wraiths";
				} else if (rand <= 43) {
					return evt + "a beautiful obsidian sculpture of a Panther lying on the floor";
				} else if (rand <= 45) {
					return evt + (Roll(1, 4)) + " drow mages with " + (Roll(1, 6)) + " drow elite warriors";
				} else if (rand <= 47) {
					return evt + (Roll(1, 4)) + " spirit nagas";
				} else if (rand <= 49) {
					return evt + (Roll(1, 8) + 1) + " salamanders";
				} else if (rand <= 51) {
					return evt + (Roll(2, 4)) + " umber hulks";
				} else if (rand <= 53) {
					return evt + (Roll(1, 10)) + " xorn";
				} else if (rand <= 56) {
					return evt + "a Young Red Shadow Dragon";
				} else if (rand <= 59) {
					return evt + (Roll(2, 4)) + " fomorians";
				} else if (rand <= 62) {
					return evt + (Roll(1, 8) + 1) + " driders";
				} else if (rand <= 65) {
					return evt + (Roll(1, 20) + 20) + " spiders crawling on the walls of a web-filled cave";
				} else if (rand <= 68) {
					return evt + (Roll(1, 4)) + " Fire Giants";
				} else if (rand <= 70) {
					return evt + (Roll(1, 10)) + " Mind Flayers";
				} else if (rand <= 73) {
					return evt + (Roll(2, 4)) + " Stone Giants";
				} else if (rand <= 76) {
					return evt + (Roll(1, 12)) + " cyclopes";
				} else if (rand <= 80) {
					return evt + "a large cave in which stands a 50-foot-tall idol of Blipdoolpoolp";
				} else if (rand <= 85) {
					return evt + (Roll(1, 3)) + " dao";
				} else if (rand <= 90) {
					return evt + (Roll(1, 4)) + " Beholders";
				} else if (rand <= 93) {
					return evt + (Roll(1, 4)) + " behirs";
				} else if (rand <= 96) {
					return evt + "a Death Tyrant";
				} else if (rand <= 99) {
					return evt + (Roll(1, 3)) + " purple worms";
				} else {
					return evt + (Roll(2, 4)) + " aboleths";
				}
			}
			break;
	}
};

var GetWildernessPastEvent = function(terrain, forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	evt = "You find ";
	if (rand <= 4) {
		evt += "a ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 9) {
			evt += "fresh (today) ";
		} else if (rand2 < 49) {
			evt += "newly dead (within the week) ";
		} else if (rand2 < 79) {
			evt += "recently deceased (within past few months)";
		} else {
			evt += "very old ";
		}
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 19) {
			evt += "corpse of a monster. " + DungeonDressingCorpseMonster();
		} else if (rand2 < 59) {
			evt += "corpse of a humanoid. " + DungeonDressingCorpseHumanoid();
		} else {
			evt += "corpse of a " + GetCharacter() + ". " + DungeonDressingCorpseAdventurer();
		}
	} else if (rand <= 16) {
		evt += "a large pool of blood";
	} else if (rand <= 36) {
		evt += "a dead animal";
	} else if (rand <= 46) {
		evt += "an area of fire or destruction";
		if (Math.random() < 0.1) {
			evt += " (with treasure)";
		}
	} else if (rand <= 51) {
		evt += "Signs of ground being dug up and old sacks laying around";
		if (Math.random() < 0.1) {
			evt += " (with treasure)";
		}
	} else if (rand <= 56) {
		evt += "an altar with a bloody body. ";
		if (Math.random() < 0.1) {
			evt += " (with trap). ";
		}
		evt += DungeonDressingAltarApperance() + ". " + DungeonDressingAltarDressing();
	} else if (rand <= 71) {
		evt += "a campsite with a smoldering fire, a few hours old";
		if (Math.random() < 0.1) {
			evt += " (with treasure)";
		}
	} else if (rand <= 81) {
		evt += "a scene of recent skirmish, with dead humainoids and monster";
		if (Math.random() < 0.1) {
			evt += " (with treasure)";
		}
	} else if (rand <= 86) {
		evt += "smoldering and smoking remains of a large funeral pyer with a burnt body";
	} else if (rand <= 91) {
		evt += "a dead " + GetCharacter() + " with arrows sticking out of him";
		if (Math.random() < 0.2) {
			evt += " (with treasure)";
		}
		if (Math.random() < 0.2) {
			evt += " (with monsters and/or bandits very near)";
		}
	} else if (rand <= 93) {
		evt += "a ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 9) {
			evt += "fresh (today) ";
		} else if (rand2 < 49) {
			evt += "newly dead (within the week) ";
		} else if (rand2 < 79) {
			evt += "recently deceased (within past few months)";
		} else {
			evt += "very old ";
		}
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 19) {
			evt += "corpse of a monster hanging from a tree";
		} else if (rand2 < 59) {
			evt += "corpse of a humanoid hanging from a tree";
		} else {
			evt += "corpse of a " + GetCharacter() + " hanging from a tree";
		}
	} else if (rand <= 95) {
		evt += "burnt arcane symbols on a tree or boulder ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 32) {
			evt += "invoking an evil god or summoning";
		} else if (rand2 < 65) {
			evt += "invoking a good god or summoning";
		} else {
			evt += "as a protective ward that is no longer active";
		}
	} else if (rand <= 97) {
		evt += "a large giant skull";
		if (Math.random() < 0.1) {
			evt += " (with treasure)";
		}
	} else {
		evt += "a wandering riding horse with a saddle that looks injured and tired";
	}
	return evt;
};

var GetWildernessCurrentEvent = function(terrain, onRoad, averagePartyLevel, forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	var amt;
	var evt = "You find ";
	if (rand <= 3) {
		amt = Roll(1, 6);
		evt += "a fire covering " + amt + (Math.random() < 0.5 ? " mile" : " yard") + (amt > 1 ? "s" : "") + ", seen from a distance.";
	} else if (rand <= 9) {
		rand2 = Roll(1, 100) - 1;
		amt = Roll(1, 2);
		evt += amt + " ";
		if (rand2 < 19) {
			evt += "wolf";
		} else if (rand2 < 39) {
			evt += "black bear";
		} else if (rand2 < 59) {
			evt += "boar";
		} else if (rand2 < 74) {
			evt += "brown bear";
		} else if (rand2 < 84) {
			evt += "dire wolf";
		} else if (rand2 < 89) {
			evt += "lion";
		} else if (rand2 < 94) {
			evt += "panther";
		} else {
			evt += "tiger";
		}
		evt += (amt > 1 ? "s" : "") + " attacking a woman and child";
	} else if (rand <= 19) {
		rand2 = Roll(1, 100) - 1;
		if (rand2 <= 49) {
			evt += (Roll(1, 2) + 1) + " bandits";
		} else {
			evt += Roll(2, 2) + " thugs";
		}
		evt += " that will attack travelers.";
	} else if (rand <= 29) {
		rand2 = Roll(1, 100) - 1;
		if (rand2 <= 19) {
			evt += (Roll(1, 2) + 1) + " goblins";
		} else if (rand2 <= 39) {
			evt += (Roll(1, 2) + 2) + " kobolds";
		} else if (rand2 <= 54) {
			evt += (Roll(1, 2)) + " orc";
		} else if (rand2 <= 59) {
			evt += (Roll(1, 2)) + " axe beak";
		} else if (rand2 <= 69) {
			evt += (Roll(1, 2)) + " bugbear";
		} else if (rand2 <= 73) {
			evt += (Roll(1, 2)) + " cockatrice";
		} else if (rand2 <= 83) {
			evt += (Roll(1, 2) + 1) + " gnolls";
		} else if (rand2 <= 93) {
			evt += (Roll(1, 2) + 1) + " hobgoblins";
		} else if (rand2 <= 98) {
			evt += "an ogre";
		} else {
			evt += "a troll";
		}
		evt += " that will attack travelers.";
	} else if (rand <= 39) {
		evt += "a ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 <= 29) {
			evt += "wolf";
		} else if (rand2 <= 54) {
			evt += "black bear";
		} else if (rand2 <= 74) {
			evt += "brown bear";
		} else if (rand2 <= 84) {
			evt += "dire wolf";
		} else if (rand2 <= 89) {
			evt += "lion";
		} else if (rand2 <= 94) {
			evt += "panther";
		} else {
			evt += "tiger";
		}
		evt += " munching on a dead ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 <= 39) {
			rand3 = Roll(1, 100) - 1;
			if (rand3 <= 12) {
				evt += "baboon";
			} else if (rand3 <= 25) {
				evt += "boar";
			} else if (rand3 <= 37) {
				evt += "deer";
			} else if (rand3 <= 50) {
				evt += "horse";
			} else if (rand3 <= 62) {
				evt += "elk";
			} else if (rand3 <= 75) {
				evt += "goat";
			} else if (rand3 <= 87) {
				evt += "mule";
			} else {
				evt += "giant snake";
			}
		} else if (rand2 <= 59) {
			evt += "goblin";
		} else if (rand2 <= 79) {
			evt += "kobold";
		} else if (rand2 <= 89) {
			evt += "human";
		} else {
			evt += GetCharacter();
		}
	} else if (rand <= 74) {
		if (onRoad && Math.random() < 0.2) {
			return GetMonsterEncounter(terrain, averagePartyLevel);
		}
		switch (terrain) {
			case "Grasslands":
			case "Plains":
				return WildernessDressingPlainsMinorEvent();
			case "Low Scrub":
			case "Borderlands":
				return WildernessDressingBorderlandsMinorEvent();
			case "Light Trees":
			case "ForestsAndWoodlands":
				return WildernessDressingForestsAndWoodlandsMinorEvent();
			case "Heavy Trees":
			case "PrimalForests":
				return WildernessDressingPrimalForestsMinorEvent();
			case "Marsh":
			case "Swamps":
				return WildernessDressingSwampsMinorEvent();
			case "Desert":
				return WildernessDressingDesertMinorEvent();
			case "Farmlands":
				return WildernessDressingFarmlandsMinorEvent();
			case "Barren Rock":
			case "Mountains":
				return WildernessDressingMountainsMinorEvent();
			case "Hills":
				return WildernessDressingHillsMinorEvent();
			case "River Vessel":
			case "Sea Vessel":
			case "Large Lake Vessel":
			case "SeaVoyages":
				return WildernessDressingSeaVoyagesMinorEvent();
			case "Coast":
				return WildernessDressingCoastMinorEvent();
			case "Snow":
			case "FrozenLands":
				return WildernessDressingFrozenLandsMinorEvent();
			default:
				return GetWilderness(terrain, onRoad, averagePartyLevel);
		}
	} else if (rand <= 79) {
		evt += "a flying ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 <= 14) {
			evt += "chimera";
		} else if (rand2 <= 29) {
			evt += "wyvern";
		} else if (rand2 <= 44) {
			evt += "giant eagle";
		} else if (rand2 <= 59) {
			evt += "griffin";
		} else if (rand2 <= 64) {
			evt += "hippogriff";
		} else if (rand2 <= 84) {
			evt += "giant vulture";
		} else if (rand2 <= 89) {
			evt += "manticore";
		} else {
			evt += "young green dragon";
		}
		evt += " carrying a dead ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 <= 79) {
			rand3 = Roll(1, 100) - 1;
			if (rand3 <= 12) {
				evt += "baboon";
			} else if (rand3 <= 25) {
				evt += "boar";
			} else if (rand3 <= 37) {
				evt += "deer";
			} else if (rand3 <= 50) {
				evt += "horse";
			} else if (rand3 <= 62) {
				evt += "elk";
			} else if (rand3 <= 75) {
				evt += "goat";
			} else if (rand3 <= 87) {
				evt += "mule";
			} else {
				evt += "giant snake";
			}
		} else {
			evt += "humanoid";
		}
	} else if (rand <= 84) {
		evt += "a mage duel. Two spellcasters are fighting each other";
	} else if (rand <= 89) {
		evt += "a naked female tied on an altar, with " + (Roll(1, 3) + 4) + " cultists around. " + DungeonDressingAltarApperance() + ". " + DungeonDressingAltarDressing();
	} else if (rand <= 98) {
		evt += "a prisoner beiung chased by " + (Roll(1, 2) + 2) + " guards";
	} else {
		evt += (Roll(1, 3) + 2) + " thugs digging up stolen treasure sacks in the ground:</br>";
		rand2 = Roll(1, 100) - 1;
		if (rand2 <= 44) {
			evt += RandomTreasureHoard(Roll(1, 4));
		} else if (rand2 <= 79) {
			evt += RandomTreasureHoard(Roll(1, 6) + 4);
		} else if (rand2 <= 98) {
			evt += RandomTreasureHoard(Roll(1, 6) + 10);
		} else {
			evt += RandomTreasureHoard(Roll(1, 4) + 16);
		}
	}
	return evt;
};

var GetWildernessLostItem = function(forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	evt = "You find ";
	if (rand <= 1) {
		evt += "a random weapon";
	} else if (rand <= 23) {
		evt += "random clothing";
	} else if (rand <= 38) {
		evt += Roll(1, 4);
		rand2 = Roll(1, 100) - 1;
		if (rand3 <= 12) {
			evt += "bowl";
		} else if (rand3 <= 25) {
			evt += "cup";
		} else if (rand3 <= 37) {
			evt += "plate";
		} else if (rand3 <= 50) {
			evt += "pot";
		} else if (rand3 <= 62) {
			evt += "fork";
		} else if (rand3 <= 75) {
			evt += "knife";
		} else if (rand3 <= 87) {
			evt += "spoon";
		} else {
			evt += "pan";
		}
	} else if (rand <= 68) {
		evt += "a ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 <= 12) {
			evt += "pouch";
		} else if (rand2 <= 84) {
			evt += "sack";
		} else {
			evt += "backpack";
		}
	} else if (rand <= 69) {
		evt += "a random piece of jewelery";
	} else if (rand <= 79) {
		evt += "an empty ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 <= 49) {
			evt += "pouch";
		} else if (rand2 <= 84) {
			evt += "sack";
		} else {
			evt += "backpack";
		}
	} else if (rand <= 94) {
		evt += "a random trinket";
	} else {
		evt += "a leatherbound diary with trivial entries";
	}
	return evt;
};

var GetWildernessRemarkableEventOrFeature = function(terrain, forceTopRoll = false) {
	var rand;
	if (forceTopRoll) {
		rand = forceTopRoll;
	} else {
		rand = Roll(1, 100) - 1;
	}
	var evt = "You find ";
	if (rand <= 4) {
		evt += "a stone well with arcane ruins. The water gives a ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 59) {
			evt += "feather fall";
		} else if (rand2 < 89) {
			evt += "detect magic";
		} else {
			evt += "jump";
		}
		evt += " effect when drunk less than 24 hours after drawing it";
	} else if (rand <= 9) {
		evt += "a stone well with the symbol of an evil god. The water gives a ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 59) {
			evt += "detect poison and disease";
		} else if (rand2 < 89) {
			evt += "bane";
		} else {
			evt += "protection from good";
		}
		evt += " effect when drunk less than 24 hours after drawing it";
	} else if (rand <= 14) {
		evt += "a stone well with the symbol of a good god. The water gives a ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 59) {
			evt += "cure wounds";
		} else if (rand2 < 89) {
			evt += "bless";
		} else {
			evt += "protection from evil";
		}
		evt += " effect when drunk less than 24 hours after drawing it";
	} else if (rand <= 19) {
		evt += "an ancient glowing stone pillar covered in glyphs. If touched, ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 2) {
			evt += "it changes the creature's sex for the next 2d6 days, after which you turn back to the normal sex";
		} else if (rand2 < 22) {
			evt += "it grants inspiration (can only happen once per character)";
		} else if (rand2 < 27) {
			evt += "it ages the creature by 4d4 years for the 2d6 days, after which, you turn back to the normal age. This will not kill a creature who ages too much";
		} else if (rand2 < 42) {
			evt += "it sends out an arcane blast, dealing 2d6 damage to the touched creature. A Dexterity save can half the damage";
		} else if (rand2 < 57) {
			evt += "it fully heals the creature and grants 1d8 temporary hitpoints";
		} else if (rand2 < 62) {
			evt += "it ages the creature by 4d4 years younger for the next 2d6 days, after which, you turn back to the normal age. A creature that ages younger than zero will become an infant";
		} else if (rand2 < 72) {
			evt += "it gates in a random creature";
		} else if (rand2 < 82) {
			evt += "it increases an ability score by + 1 for 1d6 days";
		} else if (rand2 < 92) {
			evt += "it decreases an ability score by - 1 for 1d4 days";
		} else if (rand2 < 93) {
			evt += "it changes the alignment of the creature who touched it to " + GetAlignment();
		} else {
			evt += "it makes a random magical item appear (this only happens once).";
		}
		if (Math.random() < 0.2) {
			evt += ". A random treasure is nearby";
		}
		if (Math.random() < 0.2) {
			evt += ". Wandering monsters or bandits are nearby";
		}
	} else if (rand <= 24) {
		evt += "an ancient black tree with twisted branches. Red liquid oozes that ";
		rand2 = Roll(1, 100) - 1;
		if (rand2 < 39) {
			evt += "poisons any who drink it";
		} else if (rand2 < 59) {
			evt += "heals (as cure wounds) any who drink it within 24 hours of gathering";
		} else if (rand2 < 79) {
			evt += "provides a + 2 bonus to strength for 1 hour to any who drink it within 24 hours of gathering";
		} else {
			evt += "acts as strong alcohol";
		}
	} else if (rand <= 29) {
		evt += "a moonwell. Heals 1d8 when drunk within 24 hours after drawing it, or deals 1d8 poison damage at any time if the drinker has harmed nature in a major way within the past 24 hours. If a full moon, also provides lesser restoration.";
	} else if (rand <= 34) {
		evt += "a minor earthquake. Small cracks appear in the ground";
	} else if (rand <= 39) {
		evt += "a meteorite strike happening. The meteors can be seen coming from the distance";
	} else if (rand <= 69) {
		evt += "an area with arcane diffusement. There is an off pitched hum. Any spells within one mile have a 20% failure chance and cannot be cast at a higher spell slot";
	} else {
		evt += "an area with arcane enrichment. There is a low pitched hum. Any spells within one mile have + 5 to their DCs and are treated as one higher spell slot";
	}
	return evt;
};

var DungeonDressingCorpseMonster = function() {
	var choices = [
		"The corpse is half‐melted; almost half of the body is not present. A DC 15 Heal check reveals that a powerful acid caused the horrific injury (and could provide warning of a nearby patch of green slime or roving gelatinous cube).  ",
		"The creature is writhing with a rot grub swarm   which bursts out if the body is disturbed.",
		"This giant, partially decayed creature provides a soft landing for creatures falling on it from a great height. Damage for falling creatures is capped at 5d6 if they land on the corpse.",
		"The stench from this corpse is particularly bad. Increase the stench DC by 5.",
		"The cadaver’s build‐up of internal gases are flammable, and explode (as fireball; 20 ft. radius burst, 3d6 fire damage; Reflex 14 halves) if a naked flame is brought within 10 ft.",
		"The remains of this creature yield glands, teeth, leather, bones or other body parts worth 100 gp as spell components or as parts of magical items.",
		"This creature, although appearing lifelike, has been stuffed. A DC 5 Perception check reveals the monster is dead. It is worth 250 gp to an avid collector.",
		"This creature has been decapitated, and its head mounted on a blood‐drenched spear.",
		"This carcass is covered in a roiling mass of tankard‐ sized blowflies.",
		"This corpse has been torn apart by scavengers.",
		"Inside the corpse’s stomach is a half‐digested monster.",
		"Refer to the creature’s type below.</b><ul><li><b>Aberration.</b> The creature, while apparently dead, is in a state of regenerative metamorphosis. A DC 25 Knowledge (dungeoneering) check keeps conditions suitable for this transformation to occur. At the end of one week the aberration respawns as a new creature with the young creature and advanced creature simple templates.</li><li><b>Animal, magical beast or vermin.</b> This monster was pregnant when it died. A character can save the still‐living baby with a DC 25 Heal check. The saved creature has the simple young creature template applied twice. The creature can be reared with a Handle Animal check (DC 15 + creature’s HD). Rearing a magical beast increases the DC of this check by 5.</li><li><b>Construct.</b> This destroyed construct can be repaired and reprogrammed with a DC 25 Knowledge (arcana) check and materials worth one‐quarter its normal creation cost.</li><li><b>Dragon.</b> This corpse lies near a nest which contains crushed and shattered eggs. A single egg survives and hatches in 1d6 months if incubated with a DC 25 Knowledge (arcana) check.</li><li><b>Fey, humanoid or monstrous humanoid.</b> A young child of the corpse lingers nearby, malnourished and whimpering. The child can be soothed with a DC 25 Diplomacy check. A DC 30 check means the child views the PC as its adoptive parent.</li><li><b>Ooze or plant.</b> Parts of this ooze or plant creature can be saved, enabling a character to regrow it in 1d6 months with a DC 25 Knowledge (nature) or Knowledge (dungeoneering) check. The resultant creature has the young creature simple template.</li><li><b>Outsider.</b> The essence of the outsider still retains a link to this corporeal shell. A one‐hour summoning ritual requiring a DC 25 Knowledge (planes) check and materials worth 500 gp per HD of the outsider returns the creature to the Material plane. The creature may be entrapped in a summoning circle and bargained with as described by planar binding.</li><li><b>Undead.</b> The essence of this undead creature still lingers within the cadaver. The undead creature can be reanimated or restored with a DC 25 Knowledge (religion) check and onyx gems worth 25 gp per HD of the creature.</li></ul>",
		"All the creature’s teeth have been removed.",
		"An hourglass, half empty, sits next to the carcass.",
		"One of the creature’s eyes is milky white.",
		"The corpse is covered in recent violet fungus growths. Any creature approaching the corpse is attacked by 1d6 young violet fungi.",
		"The corpse bears signs of many old wounds indicating the creature had many fights over its life.",
		"The creature’s flesh is scorched and burnt (01‐60), frozen (61‐80) or unnaturally blackened (81‐100).",
		"The creature’s face is frozen in death into a hideous snarl (01‐50) or look of abject terror.",
		"The corpse’s skin seems to undulate as if something is living within. If the corpse is disturbed, a centipede swarm floods forth and attacks all nearby creatures."
	];
	return randomChoice(choices);
};

var DungeonDressingCorpseHumanoid = function() {
	var choices = [
		"The corpse has been flensed of its skin.",
		"The cadaver has its chest opened and dissected. Its internal organs are arrayed neatly nearby.",
		"The body’s head, arms and legs have been torn from their sockets; of them there is no sign.  ",
		"This corpse is charred and still smoking.",
		"A severed head is stuck atop a crude spear wedged into the ground. The rest of the body has been stripped of flesh by humanoid teeth.",
		"The cadaver’s feet and legs are covered in welts caused by a branding iron.  ",
		"The corpse’s skin is covered with elaborate tattoos. One, set on the forearm, is the equivalent of a scroll of lightning bolt. The skin can be removed, undamaged, with a DC 23 Heal check.",
		"The corpse’s has the word “Channamel” tattooed on its chest. The word could be a password, command word or creature’s name.",
		"The cadaver has been torn apart and eaten by animals, leaving only bloody bones and a pool of gore and drying blood.",
		"The corpse is chained to the wall with masterwork manacles. Deep cuts mars the corpse’s wrists (as if the creature tried to free itself).  ",
		"A deep slash has almost severed the corpse’s head from its body. The nearby walls (and ceiling) are splattered in blood.  ",
		"An empty and slashed backpack lies nearby. A DC 20 Perception check reveals a hidden compartment containing 5 pp.  ",
		"The corpse is naked. Slashes mar its arms and legs.",
		"The cadaver is covered in a black burial shroud and attended by a dozen still‐burning red candles.",
		"The cadaver is bathed in sacramental oils and oriented directly east‐west.",
		"The corpse’s eyes have been gouged out.",
		"Scratched on the wall above this corpse is “Ganiss rests well here.”",
		"Marked in chalk on a small plank of wood leaning over the body: “Harmal the Deceiver. Slain before I could take my revenge.”  ",
		"Dark, black pustules cover the corpse. Despite its age, nothing has fed on the corpse.",
		"This corpse lies under a stone cairn. The first stone laid is composed of crystalline quartz struck through with veins of gold (worth 250 gp; DC 20 Perception check reveals).",
		"This mauled cadaver lies face down, a sack of gold coins exploding out onto the stone floor. There are 150 gp and 120 sp; many are covered in blood.",
		"The corpse is completely hairless.",
		"The corpse continually whispers “Darkness.”  ",
		"The corpse is haunted by a repeating silent image (DC 11 Will) of the creature’s final moments.  ",
		"A pool of congealing blood, too much for one creature, puddles around the corpse.",
		"The creature is covered with terrible cuts and slashes, but there is no blood here.",
		"The body is punctured by over forty arrows. One of the arrows is a +1 cold iron arrow.",
		"The corpse is completed exsanguinated.",
		"The corpse has a stump for a right hand, which healed over before its death.",
		"Two iron spikes have been driven through the corpse’s shoulders, pinning it to the wall.  ",
		"The corpse is still fresh but all of its equipment is so tarnished and rusted as to be unusable.",
		"The corpse is skeletal with age, but its equipment is untouched by the ravages of time.",
		"The cadaver is surrounded by 2d6 dead creatures of a different type.  ",
		"The corpse’s right index finger twitches once.",
		"Entrails spill from a horrific stomach wound.",
		"The corpse clutches a steel vial containing a potion of cure serious wounds in its left hand.",
		"The cadaver reaches in vain for a battered shortsword lying 30 feet away.",
		"The corpse’s right arm has been partially eaten.  ",
		"The cadaver is set upon an unlit pyre.",
		"These two corpses hold hands; each carries a weapon in the other hand.  ",
		"A scorch silhouette decorates the wall behind this pile of burnt bones.",
		"Every bone in this corpse’s body is broken without a single mark on the skin.",
		"Something has burst out of this cadaver’s head, leaving a fist‐sized hole.",
		"This corpse has suffered post mortem trepanation.",
		"This creature was slain while polymorphing into a dragon (or other creature), and now is a hideous amalgam of the two creatures.",
		"The corpse’s eyes are wide open in shock.",
		"The corpse is surrounded by 1d3 mirror images which expire in 1d4 minutes.",
		"Bloody footprints circle the body before leading away.  ",
		"The corpse has been staged and lies in an obviously odd position. One arm and one leg are broken and are twisted at unnatural angles.  ",
		"This gray, ashen corpse rises as a wight 2d6 rounds after first being examined."
	];
	return randomChoice(choices);
};

var DungeonDressingCorpseAdventurer = function() {
	var choices = [
		"The contorted corpse of a dark‐skinned, moustachioed human lies here stripped of clothing and valuables. The corpse lacks a right hand. A DC 25 Perception check finds an ivory statuette in the man’s likeness (worth 1,500 gp) in a crevice nearby, clutched in his severed hand. If the statuette is touched to the corpse it teleports away to the wizard’s home as part of the conditions of an ongoing contingency.<ul><li>LN human wizard 11; bloated, 8 days; Heal DC 15, slashing; stench DC 5; Intimidate +0; consume DC 20.</li><li>Speak with dead: Ismos died after being betrayed by his companions, the hand holding his contingency statuette was severed before it could be triggered.</li><li>Raise dead: Ismos thanks the party and teleports away to check his family’s safety. If reacquainted with the party he provides up to ten day’s service to craft items with Craft Wondrous Item and Scribe Scroll.</li></ul>",
		"Three bundles of spider silk hang suspended in thick layers of webs. The desiccated bodies inside are accessible with a DC 20 Strength check or 15 points of slashing damage to the webs. All wear leather armour and carry rusted, bloodstained longswords.<ul><li>CE elf rogue 3; dry remains, 4 months; Heal DC 30, poison; stench DC 2; Intimidate ‐3; consume DC 30.</li><li>Speak with dead: The three rogues died here, ambushed by ettercaps, fleeing justice after murdering a local peasant family.</li><li>Resurrection: The rogues offer to join the party, but betray them at the first opportunity.</li></ul>",
		"A malnourished human corpse, gripping tightly to a bloody bone‐saw, lies on the floor surrounded by four dismemberment humans. The severed stumps of the mutilated bodies are bound with bloody bandages.<ul><li>N human cleric 2, four N human warriors 2; fresh, 2 days; Heal DC 10, starvation, slashing; stench DC 4; Intimidate ‐1; consume DC 10.</li><li>Speak with dead: A doru div ambushed Sorno and his companions, draining their Wisdom with its poison and trapping them here with illusions of walls. The doru haunted Sorno with illusions of gangrene on his companion’s limbs and suggestions to cleanse them.</li><li>Raise dead: Sorno has been driven mad and cowers in a corner away from the PCs unless calmed with a DC 30 Diplomacy check or healed of his madness with heal, limited wish, wish or miracle.</li></ul>",
		"A decapitated woman in monk’s robes lies at one end of this room. Her head lies 60 feet away, under a thin, bloodied wire, secured at neck height across the doorway. An empty glass potion vial is in her belt pouch. A DC 16 Spellcraft check identifies the residue in the vial as the remains of a potion of expeditious retreat.<ul><li>LN human monk 5; active decay, 3 weeks; Heal DC 20, slashing; stench DC 10; Intimidate 0; consume DC 25.</li><li>Speak with dead: Hessa the Swift died attacking a patrol of duergar who were familiar with her Spring Attack tactics.</li><li>Resurrection: Hessa offers to pay the PCs her life savings of 1,000 gp if she is resurrected, and becomes a firm ally for life.</li></ul>",
		"Two dwarven knights lie dead against a wall amid a pile of six dead ogres.<ul><li>LG dwarf fighter 3; fresh, 1 round; Heal DC 10, bludgeoning; stench DC 1; Intimidate  ‐4; consume DC 10.</li><li>CE ogre; fresh, 3 rounds; Heal DC 10, slashing; stench DC 7; Intimidate +1; Consume DC 10.</li><li>The two dwarves wear masterwork half‐plate and carry tower shields and dwarven waraxes. The ogres carry a total of 483 sp and each has hide armour and a Large greatclub.</li><li>Speak with dead: Raun and Droxi Warspite were exploring these tunnels and fell to ogre raiders.</li><li>Breath of life: If both are returned to life, the dwarves thank the party, offering them safe passage to their underground citadel. If only one can be revived, the dwarf is overcome with grief, and carries the other’s corpse back to their home.</li></ul>",
		"Half of this burley human warrior’s head has been disintegrated. The man has been stripped of possessions, except for a granite gravestone strapped to his back. The gravestone reads as follows: Marango Thronefall Slew the Bloat Goblins of Harvestmire. Drank of the Blessed Waters of Travistine before the gaze of the Mistwarden. Battled the Drake of Ages beneath the Mountain of Lost Souls. Rescued the Radiant Maid of Rivenmere from the Dark Seraphim of Talonais.<ul><li>N human fighter 8, active decay, 2 weeks; Heal DC 20, disintegrate; stench DC 10; Intimidate 0; consume DC 25.</li><li>Speak with dead: The corpse cannot answer questions.</li><li>Resurrection: Marango offers to protect the PCs for a year and a day as reward for returning him to life.</li></ul>"
	];
	return randomChoice(choices);
};

var DungeonDressingAltarApperance = function() {
	var choices = [
		"An unholy symbol is carved into the front of the altar in exquisite detail.",
		"The altar is made of very rough, porous rock. Blood has soaked into the pores giving it a mottled brown and black appearance.",
		"The altar is hewn from a black, glittering stone. Its edges are rough and sharp.",
		"The altar slopes slightly downwards in one direction. A lip at the bottom end is encrusted with blood.",
		"Drainage channels criss‐cross the altar’s upper surface and run to two small fonts, one at either end of the altar.",
		"The altar has a secret compartment (DC 30 Perception). Pressing a small skull (or other minor craved decoration) opens the compartment.",
		"The altar has a secret compartment within (DC 25 Perception check locates). Pressing an unholy symbol of the god into a shallow depression behind the altar opens the compartment.",
		"Intricate scrollwork decorates every surface of the altar. Religious symbols and images of the god are hidden within.",
		"A large carving of religious significance decorates the front of the altar.",
		"Niches in the front of the altar hold grinning skulls. Streaks of dried blood cover each skull.",
		"The altar stands upon a 5 ft. high dais.",
		"Pillars depicting the altar’s patron deity flank the altar. Each is well detailed.  ",
		"A continual flame burns upon the altar’s surface.",
		"An unhallow spell protects the altar and surrounding shrine. If the altar is still used, a secondary spell effect may be present.",
		"The altar stands in a shadowy, cramped alcove hidden behind a lurid tapestry. Intricate carving and scrollwork covers the walls.",
		"Niches in the rear of the altar hold books and other items of religious significance.",
		"The altar is hollow and serves as the tomb of a devout worshipper.  ",
		"Many small holes pierce the altar. Wind blowing through the holes creates a whining sound",
		"The front of the altar is carved to represent a demonic head. Small red gems serve as its eyes and its tongue protrudes in an obscene fashion.",
		"The altar is a simple rectangle of stone.  ",
		"The altar is only 2 ft. high.",
		"The altar is 6 ft. high; ceremonial steps behind it enable the priest to carry out services. The steps are narrow and steep; a landing at the top provides a modicum of comfort for the officiating priest.",
		"The altar has a hinged lid which accesses a large compartment within.",
		"The altar hides a secret set of stairs leading to a crypt or treasure vault (DC 30 Perception check reveals).",
		"The altar is a huge natural stalagmite which has had its top carved away.",
		"The altar is fused to the floor (DC 23 Knowledge [arcana] reveals stone shape was used to craft the altar).",
		"Many small holes adorn the front of the altar; each holds a small, low‐value gem.",
		"Many small holes pierce the altar; a hinged lid accesses a fire pit within. It is full of ash.",
		"Religious teachings are carved into the front of the altar.",
		"Fused bones form an armour of sorts over the altar. The bones are those of previous priests and other devout worshippers.",
		"The altar is composed of fused bones.",
		"A shallow bone pit surrounds the altar.  ",
		"A narrow trench surrounds the altar; it is full of oil. When lit, it burns for 5 minutes, creating a thin wall of flame 2 ft. high.  ",
		"Several stone candlesticks stud each end of the altar. Liberal amounts of dried wax cover the candlesticks which all contain half‐burnt candles.  ",
		"Stout manacles are mortared into the altar. The key to the manacles is hidden in a grinning skull carving on the rear face of the altar (DC 20 Perception check locates).  ",
		"The altar is immense – it could easily hold a prostrate Large‐sized creature.",
		"A mosaic decorates the top of the altar.",
		"A stone lectern is built into one side of the altar.",
		"The altar slopes downwards to a font in front of it. Grooves on the altar top lead into the font.",
		"A metal grill covers the altar’s surface. Below lies a fire pit. Manacles are attached to the grill.  ",
		"A permanent alarm protects the altar and activates when a nonbeliever comes within 10 ft.",
		"A permanent ghost sound projects the sound of wailing and moaning (or other sinister sounds) from the altar",
		"A permanent symbol (determine type randomly) wards the altar.",
		"The altar is trapped. (See page 8 for examples)."
	];
	return randomChoice(choices);
};

var DungeonDressingAltarDressing = function() {
	var choices = [
		"Several half‐burnt candles stand in pools of wax on the altar.",
		"A skull with its top cut off sits on the altar. A huge candle emerges from the skull.",
		"Spots of dried blood speckle the top of the altar.",
		"Rusting manacles (DC 30 Escape Artist, DC 24 Break) are mortared into the altar.",
		"A big dried bloodstain covers the altar’s top.",
		"The surface of the altar is chipped and dented.",
		"The shards of broken manacles lie on the altar.",
		"A skeleton lies atop the altar.",
		"The shards of a curved bloodstained dagger lie on the floor in front of the altar.",
		"Cobwebs cover the altar. Many small spiders scuttle within.",
		"Mould sprouts from several large bloodstains on one side of the altar. The stains are old and dry.",
		"Masterwork manacles (DC 35 Escape Artist, DC 28 Break) are mortared into the altar.",
		"Insects live in the cracks around the altar and feed on sacrifices’ blood.",
		"A mouldy cloth covers the altar.",
		"The altar is scorched and burnt. Charred bones and ash cover its surface.",
		"The altar has been deformed by a stone shape.",
		"A pool of dried melted wax almost covers the altar. Red and white wax mix to form a lurid, smear of colour.",
		"Luminescent fungus grows over the altar, giving it and its immediate surrounds a dim green glow.",
		"Two blackened skeletons lie in front of the altar.",
		"Holes stud the altar’s flanks; they once held small gems but are now empty.",
		"The faint smell of incense hangs in the air around the altar. Several incense burners are in evidence on the altar.",
		"Shadows seem to hang in the air around the altar. Nonmagical illumination in a 10 ft. radius around the altar is reduced by one step.",
		"The remains of a crude campfire cover the floor behind the altar. The campfire is old and the ashes are cold.",
		"Graffiti – denigrating the altar’s patron power – covers its top.",
		"A hallow spell is centred on the altar.",
		"A great crack runs through the altar as if the stone had suffered a single, massive blow.",
		"A pile of skulls decorates the altar.",
		"The altar is clean and obviously well tended.",
		"The altar’s decorative carvings have been chipped and defaced; signs of a crude attempt to repair them are evident.",
		"Worthless offerings – mouldy food, broken and rusted weapons and so on – cover the altar top.",
		"A few silver and copper coins lie amid the dust of the altar top.",
		"Several empty vials lie on the floor nearby. They once contained holy water – divine symbols of goodness and light are inscribed into their caps.",
		"A deeper darkness is centred on the altar.",
		"A chipped and broken hourglass lies on its side atop the altar.",
		"The altar is battered and smashed; it has evidently been repeatedly struck with a heavy object.",
		"A small pool of partially dried oil – about that held in a standard flask – has pooled at the altar’s base.",
		"The altar held a secret compartment, but its lid has been ripped off; the compartment is empty.",
		"Daubed on the front of the altar is the single word, “Blasphemy.”",
		"The skeletal remains of several humanoids litter the ground around the altar. (These could be sacrificial victims or those slain by a trap.)",
		"A magic mouth has been cast on the altar. When activated, it shouts, “Fools! This is a sacred place. Flee or die.” The mouth appears on the rear of the altar so it is not normally visible to those approaching the altar.",
		"The faint outline of several runes is evident, in the thick dust covering the altar.",
		"Flecks of silver cover the altar (this is the dried‐ up remains of a flask of holy water).",
		"Deep piles of smashed and ground bones cover the altar. A shattered skull lies at the centre of each pile.",
		"A circle of silver filings (the remains of a magic circle spell) surrounds the altar.",
		"Several small chalked pentagrams decorate the altar’s top. A DC 20 Knowledge (arcana) reveals they deal with summoning evil spirits.",
		"A pile of putrid, bloodstained rags lie behind the altar. They are heavy and rancid.",
		"Black mould grows on the rear of the altar. A DC 15 Knowledge (dungeoneering) check reveals it to be harmless.",
		"A font pierces the centre of the altar. Several vials‐worth of unholy water lie within.",
		"Cracked and broken bones lie strewn about the altar. They are of humanoid origin; something has broken them open to get at the marrow within.",
		"Suspiciously cold air surrounds the altar.",
		"The paving stones around the altar have been pried up – previous explorers searched this area for treasure long ago.",
		"The base of the altar is chipped and scratched. (Explorers tried to lever the altar up believing there to be a hidden space below).",
		"Part of the ceiling has collapsed, covering the badly damaged altar in rubble and dust.",
		"Newly trimmed and unused candles cover much of the altar’s top. Dried wax holds them in place.",
		"A hole has been smashed into the top of the altar to reveal a secret niche within. The niche is empty of everything but dust.",
		"The altar has a secret compartment within (DC 25 Perception reveals) but the catch to access it has long since broken. Characters must smash their way through the altar (hardness 8, hp 40; DC 28 Break) to access the niche.",
		"The floor around the altar has been meticulously cleaned.",
		"A small gong stands atop the altar; it is tarnished and battered. An unholy symbol is inscribed into its centre. Of its hammer, there is no sign.",
		"Ashes cover the altar. A DC 15 Perception check reveals the remains of several partially burnt pages and book covers. All are of unholy origin.",
		"The altar and the ground beneath it are split by a great crack in the rock. A DC 28 Knowledge (arcana) check reveals the damage was caused by an earthquake.",
		"The altar lies on its side – as if a being of great strength flipped it over. Where it once stood, a narrow burial niches pierces the floor. Except dust and a faded burial shift, the niche is empty.",
		"Certain parts of the altar’s decorative carvings have been melted away by acid. The “scars” on the altar are very noticeable.",
		"Primitive offerings – animal teeth, shiny pebbles, shells and so forth are scattered across the altar.",
		"The altar has been painted jet black; the paint is now peeling, giving the stone a mottled look.",
		"Graffiti denigrating the altar’s patron power covers the altar. Strenuous attempts have been made to clean off the blasphemous words; the whole is now horribly smeared.",
		"Daubed on the altar top in blood are the words, “Dark Lord, Forgive Me.”",
		"The altar is standing up on its end.",
		"Ripped and torn priests’ robes lie crumpled in a pile near the altar. They could be bloodstained, scorched etc.",
		"Water dripping down from the ceiling above has soaked the altar. A small puddle surrounds it.",
		"Pottery shards, probably once a bowl, cover the floor around the altar.",
		"An offering bowl lies on its side, on the altar. Under it, a single copper coin remains.",
		"Broken and smashed idols lie about the altar.",
		"The flagstones around the altar are cracked. The cracks radiate out from the altar.",
		"A serrated sword blade (the remains of an activated trap) stands proud from the altar top.",
		"Blood red mould grows over part of the altar. In the dark it radiates a dim crimson light. A DC 15 knowledge (dungeoneering) check reveals it to be harmless.",
		"The air around the altar is particularly humid.",
		"Rotting wood lies by the altar.",
		"An empty, dusty scroll case lies wedged between the altar and the floor.",
		"The original symbol on the altar has been chiselled off and another – the symbol of a good‐aligned deity – put in its place.",
		"A large chalked pentagram covers the ground in front of the altar.",
		"Daubed on the front of the altar is the single word, “Why?”",
		"The altar’s drainage channels are clogged with a paste of dried blood and dust.",
		"A melted pool of slag – once a variety of unholy objects – mars the altar’s top.",
		"One corner of the altar has crumbled away, as if a wasting disease had infected the stone.",
		"A large wrought iron candlestick lies on its side in front of the altar. It is bent and twisted.",
		"Skeletal remains of a man wearing mouldering robes are chained to the altar. (The man wears the robes of a temple priest; he was executed by a previous band of adventurers.)",
		"A bunch of herbs lies mouldering on the altar.",
		"The bloody, severed heads of another adventuring party decorate the altar. Their blood has dripped down onto the floor.",
		"Cockroaches feast on the rotting remains of the last sacrificial victim.",
		"Dried vomit stains the rear of the altar.",
		"A single lit candle set in the absolute centre of the altar dimly illuminates a blank sheet of parchment.",
		"The altar feels warm (or cold) to the touch.",
		"Silver coins arrayed in a circle surround the altar.",
		"Crudely applied whitewash covers the altar.",
		"A flagon of (possibly poisoned) wine and a single cup stand atop the altar.",
		"“Beware the Wrath of the Righteous” is crudely scratched into the altar.",
		"Thousands of shards of glass cover the floor surrounding the altar.",
		"A phantom trap protects the altar."
	];
	return randomChoice(choices);
};

var WildernessDressingPlainsMinorEvent = function() {
	var choices = [
		"A murder of crows flock over the cleanly picked remains of a large animal.",
		"Vultures circle a stretch of field, though no carrion seems present.",
		"A random PC steps in the entrance of a rabbit's burrow (DC 12 Reflex save or suffer a 5 ft. penalty to speed for 24 hours).",
		"A herd of loping deer crosses the path.",
		"A solitary wolf stands over the prone form of a deer, growling in defence of its kill.",
		"An ominous scarecrow sways in the wind as it stands vigil over a barren field.",
		"A dappled stallion parallels the PCs progress along the horizon.",
		"A herd of grazing cows occupies a nearby field.",
		"The droppings of some enormous animal in the road ahead contain the remains of a partially digested sheep.",
		"A random PC trips into a shallow hole, reminiscent of a half‐dug grave; a shovel is planted at its head.",
		"An enormous black raven follows the party, intently eyeing any familiars.",
		"A curious magpie swoops out of the sky, trying to steal a loosely attended shiny object.",
		"A pack of wild dogs trails the party for a brief span, before moving onto a softer target.",
		"The fresh tracks of centaurs have churned up the earth at irregular intervals for nearly a mile.",
		"Tall grass conceals a broken hunter’s trap (DC 15 Perception reveals).",
		"At midnight, the pitch darkness is shattered by a dense swarm of fireflies. (DC 13 Reflex save or blinded for 1 round).",
		"A newly birthed calf mewls near the corpse of its mother.",
		"The night sky is painted with bright colours, forming a surreal tapestry.",
		"As the party makes camp, a shooting star blazes across the sky.",
		"A thirteen‐point bull elk crosses the party’s path and lowers its antlers before dashing away.",
		"A pure white eagle lands nearby, dropping something golden before taking off.",
		"A discarded backpack containing a collection of books of children’s stories lies near a tree.",
		"The skeletal remains of a dog are oddly topped by a human skull.",
		"The mangled body of an owlbear blocks the way – both its eyes and tongue are missing.",
		"Distant figures (a band of hunters trying to catch a marauding wolf) trudge across a distant hill.",
		"A lamb wanders the plains, a collar proclaiming its name to be “Slaughter.”",
		"Black clouds swirl overhead, deluge the party in rain for a few minutes and then abruptly dissipate, leaving the party thoroughly soaked.",
		"An enormous reptilian footprint serves as a pool from which several deer drink.",
		"An ornate dining room table and chairs sits immaculately arranged just off the beaten path.",
		"A shining, gold‐hilted masterwork longsword (worth 400 gp) has been planted point first at the centre of a crossroad.",
		"Carrion birds pick at the body of a bandit that has been staked out near the path.",
		"As the party breaks camp, one of them finds a small (non venomous) snake in his boot.",
		"Crude, pumpkin‐headed effigies reminiscent of goblins leer at travellers for the next 3 miles.",
		"A dimly glowing lantern draws the eye to the remains of a ruined tower.",
		"A random PC steps on an ant hill, and is quickly covered with angry red ants (DC 12 Fortitude save or be sickened for 1 hour).",
		"A toppled bees’ nest lies nearby, its occupants chasing off a black bear.",
		"A rabbit foraging beside the trail flees when the PCs approach.",
		"A woman’s boot stands discarded in the remains of a hastily scattered campfire.",
		"Faint lights, as those of a distant mob of torches, are visible on the horizon as the PCs make camp.",
		"Faintly visible humanoid figures shadow the party. Their distance is difficult to judge, seeming at times to be miles, and at other times to be only a few hundred feet.",
		"A large bird is caught in the jaws of an oversized carnivorous plant.",
		"A flock of birds flies overhead, their pattern seemingly forming an arrow.",
		"A white deer races across the PCs’ trail, and quickly darts away.",
		"The monuments of a roadside graveyard seem to move in the fading light of dusk.",
		"A series of ropes have been staked out in this field, their pattern reminiscent of cobwebs.",
		"A small fire is slowly eating away at a field of strange plants, filling the air with a bizarre, acrid stench.",
		"Rapidly moving clouds seem to be pulled into a far distant canyon.",
		"A wild dog drags a set of manacles, a severed hand still occupying one side.",
		"A wagon wheel rolls past at an alarming speed, its source and destination unknown.",
		"For a brief moment, near midnight, clouds scudding across the moon give it the appearance of a scowling face.",
		"One PC is grabbed at the ankle by what seems to be a skeletal hand, but which turns out to be an ancient withered root.",
		"The sound of ferocious barking – carried on the wind – reaches the PCs.",
		"The wind whips dandelion seeds into the face of a random PC, who must make a DC 10 Reflex save or be blinded for 1 round.",
		"A vulture picks at the corpse of a well‐armoured dwarf, his chainmail is still in good condition.",
		"A horse‐drawn cart races across the plains, a swirling trail of spices cascading off the back.",
		"Fruit falling from a nearby tree splatters unerringly in the midst of the party.",
		"A small wild pony crops at the grass nearby.",
		"An escaped sheep – and bearing its owner’s brand – crops the grass nearby.",
		"Pelting hail assails the party; one random PC must make a DC 10 Reflex save or have a randomly chosen potion shattered.",
		"One PC steps in a bear trap, but disuse has rusted it nearly solid – its jaws close mere inches.",
		"A small dog follows the party, begging for scraps.",
		"What seemed to be a stone reveals itself as a lizard as it opens one inhuman eye.",
		"A small stream is home to a school of luminescent fish.",
		"Two male sheep butt horns attempting to win the attention of several nearby females.",
		"A tumbleweed crosses the PCs’ path, leaving a trail of fresh blood.",
		"A screeching sound pierces the air; of the source there is no sign",
		"A flying predator distantly trails the party for a few minutes before seeking easier prey.",
		"A wounded bear growls as the party approaches.",
		"A black squirrel shadows the party, occasionally hurling nutshells when they get too close.",
		"One of the party’s animal companions or familiars dashes into nearby brush, finding a half‐ concealed corpse with 4 gp stuffed into its mouth.",
		"A distant band of hill giants turn out to be detailed statues upon closer inspection. Disturbingly, they surround a freshly killed deer.",
		"A fox slinks through the undergrowth, a rabbit in its jaws.",
		"The party passes through a patch of clawing brambles. Several of the PCs’ cloaks are snagged and ripped on the thorns.",
		"A swirling dust devil ravages the landscape, throwing earth at a herd of cows.",
		"Swarming red ants carry the complete remains of a skeletal human hand.",
		"A travelling pedlar wanders towa dr the PCs whistling a happy tune.",
		"A charnel pit emits such a stench that every PC is sickened for one hour (DC 12 Fortitude negates).",
		"A swarm (harmless) beetles scuttle over a fallen tree.",
		"A lightning bolt descends from a clear blue sky to shatter a nearby tree.",
		"A swarm of multihued butterflies swirls around the party before flying away.",
		"As the party passes under a low‐hanging branch, an enormous and hairy, but harmless, spider drops on one PC’s shoulder.",
		"At night, something enormous flies overhead, blotting out stars a handful at a time.",
		"A distant howling wolf is answered from seemingly every direction.",
		"Glowing red eyes haunt the area surrounding the PCs camp, though no creatures can be found.",
		"The remains of a fallen building choke a small gulley. An old man lurks within and offers to read the future for a small price.",
		"A baby griffon tears flesh from a fallen animal it has slain. It flees, if approached.",
		"A nest of snakes swarm over a set of burnished brass keys.",
		"A herd of grazing bison trample carelessly over the skeletal remains of dozens of humanoids",
		"A passing traveller offers to sell salted meat.",
		"Two hunting dogs hurtle across the plain chasing some unseen animal.",
		"One PC’s mount dashes off, only to be found moments later eating at a field of carrots.",
		"An overpowering smell of fresh bread permeates the air for the next mile.",
		"A howling wind sounds almost like painful screams.",
		"A single bolt of lightning drops from the blackened sky a dozen feet from the party.",
		"A blue silk scarf tumbles on the wind before wrapping itself around a random PC.",
		"Hundreds of tiny lizards sit in a nearby tree, staring as the party passes.",
		"Several birds peck among the crops in a nearby field. A farm boys is running toward them shouting and waving this hands.",
		"A flock of starlings in full song hurtle across the sky above the PCs’ heads.",
		"Swirling leaves seem almost to form words as they blow past the party.",
		"Shouts and peals of laughter emanate from a sunken pool; within several children play."
	];
	return randomChoice(choices);
};

var WildernessDressingBorderlandsMinorEvent = function() {
	var choices = [
		"The party stumble across a half‐eaten deer. Entrails trail off into the underbrush.",
		"A column of smoke rises in the distance; the breeze soon blows the smell across the party.",
		"Rocks clatter down the nearby hillside, though the party can’t spot what disturbed them.",
		"As a PC walks beneath it, a tree branch crashes to the ground, narrowly missing him.",
		"With an ominous rumble of thunder, lashing rain besets the party.",
		"An arrow thuds into the tree right next to a PC, barely missing his ear.",
		"A strange, seemingly endless road made of black stone cuts a straight line from horizon to horizon.",
		"As the party rest around the campfire, a twig snaps loudly in the darkness just beyond camp.",
		"The party come across a suit of rusting studded leather armour rent by several gashes.",
		"As the party wade across a shallow river, they realize the riverbed is not sand or rock, but the packed skulls of countless humanoids.",
		"Dozens of panicked rodents stream across the party’s path towards the brush, obviously fleeing something.",
		"Each time the party get within a few strides of the edge of the forest, the trees themselves lean towards them, branches outstretched.",
		"As the rain pours down, a thunderous noise is the party’s only warning before a flash flood sweeps toward them.",
		"A shapeless shadow flashes across the ground and over the party, but when they look up, the skies are perfectly clear.",
		"Rocks crack and the ground splits as an earthquake shakes the area.",
		"A large patch of still‐hot and charred ground appears to be the remains of a small farm.",
		"A PC shakes out his bedroll for the evening, only to find dozens of tiny spiders hiding in it.",
		"A flock of black birds sit in the nearby branches, simply watching passersby without so much as a caw or flutter of their wings.",
		"A snake slithers from its burrow in front of the party, spooking the horses.",
		"With a grinding noise, the stone statue the party passes turns its head to watch them.",
		"While trying to find wood for a campfire, a PC realize every possible scrap has been soaked by the recent rains.",
		"The party realize a vulture has been tracking them for miles and always stays just overhead.",
		"The nearby field of wildgrass keeps rustling, as if something skulks through its overgrowth.  ",
		"A pack of wolves lope by in the distance briefly before disappearing into the underbrush.",
		"As the party stride through a field of wildflowers, the pollen makes them start sneezing, and they don’t stop until they leave the field.",
		"While travelling at night, harmless little bats start dive‐bombing the party.",
		"A strange, furred creature screeches at the party from atop a nearby rock, where it uses its prehensile tail to fling pebbles at them.",
		"A strange screech in the night startles one of the party, causing them to knock the cooking pot and its contents into the fire.",
		"Two wide‐set eyes peek up at the party from just above the surface of a large pool. A PC’s boot becomes lodged in a gopher hole, and he falls over (DC 12 Reflex negates).",
		"While descending a hillside, a PC steps on a rock; a muted hissing noise immediately comes from underneath it.",
		"The riverbank crumbles, sending a PC somersaulting into the chilly water.",
		"Amidst the stormy weather, lightning strikes a nearby tree, setting it aflame.",
		"The party returns to the campsite setup earlier to find something has made off with some of their provisions.",
		"As they pass by a small cave entrance in the mountainside, a gust of foul wind blasts the party.",
		"The creak of wheels heralds the approach of a brightly painted tinker’s wagon.",
		"A bestial roar thunders from the nearby woods, and birds take flight from the treetops as it fades.",
		"Laughter and the flicker of flames in the distance draw the party towards a glade filled with dancing shadows.",
		"As the party listen to a babbling stream, they realize the trickling and burbling forms actual song and music.",
		"A high wind whips the darkening clouds into a spiralling cone that touches the earth nearby.",
		"A PC spots a bear lumbering by, with a pair of cubs trailing. The mother growls at the party in warning.",
		"The party spot a ghostly figure traipsing across a clearing before it fades from sight.",
		"An eagle dives into a lake and snatches up a fish in its talons.",
		"Millions of ants track across the ground, forming a moving, writhing carpet.",
		"The party are traversing a mountain pass when a boulder smashes into the path in front of them.",
		"In a valley, the party hear a sudden echo of, “Hellooo!”",
		"Someone is chopping wood nearby.",
		"Striding between two trees, a PC activates a defunct tripwire trap.",
		"The tree a PC is leaning against suddenly creaks and topples, uprooting itself.",
		"Leaves rustle overhead, before several pairs of shining eyes peer down at the party.",
		"A lit lantern slips from a PC’s grasp and shatters; the nearby dry grasses catches fire.",
		"A mangy fox creeps toward a PC eating. The fox looks half‐starved.",
		"A flock of butterflies swirls about the party for an hour, drawn to them for some reason.",
		"A buzzing noise draws the party’s eyes to a massive wasp nest hanging from a tree bough; hundreds of the insects swarm about.",
		"A PC up‐ends his boot to see a handful of small spiders fall out.",
		"As a PC lies down on his bedroll or blanket, something suddenly wriggles under his back.",
		"A herd of wild horses gallops over the hill, their manes streaming in the wind.",
		"In the distance, a cluster of buzzards hop about a mound of bloody, mangled flesh.",
		"As a PC fills his flask from a river, a fish rises to the surface and spits water into his eye.",
		"A hawk dives over the campfire, snatching up the shank of meat that had been roasting there.",
		"As a PC passes under a wild fruit tree, a rotten piece splats on top of his head.",
		"The party meet a trapper inspecting a snare.",
		"The party encounter a mapmaker sketching this region of the wilderness for future reference.",
		"When a PC opens his tent flap, a fawn bolts out and runs for the nearby woods.",
		"After the fresh rain, earthworms seem to boil up from he mud.",
		"Squirrels chatter in the nearby trees, occasionally flinging a nut at the party.",
		"A PC spots an ebony scale the size of his hand lying on the ground. Whatever reptile shed it may still lurk in the area.",
		"An owl follows the party, hooting loudly.",
		"With a rustle of branches, a moose emerges from a thicket.",
		"While descending the steep hill, the scree suddenly gives way beneath the party’s feet.",
		"A thick field of tall brambles blocks the party’s progress.",
		"Hundreds of bullfrogs hop the path, making it difficult to proceed without squishing any.",
		"A colourful bird perches nearby and begins to mimic the party’s every word and vocalization.",
		"A nearby tree sways as if caught in a strong wind, but there is no wind.",
		"The smell of burning flesh drifts upon the breeze.",
		"The earth crumbles beneath a PC, and a twenty‐foot wide sinkhole opens up ahead of the party.",
		"The party discover two dead bucks, their antlers locked together in mortal combat.",
		"Without warning, a water flasks burst a seam, drenching a PC’s backpack.",
		"After brushing by a leafy bush, a PC notices an extremely itchy rash across his bare skin.",
		"While passing between two trees, a PC walks into a previously unseen spider web.",
		"The party discover a tree trunk pierced by two arrows of crude manufacture.",
		"The stink of rot and decay grows stronger.",
		"As night falls, a spectacular shower of falling stars shoots across the sky.",
		"Green and yellow light wink on and off all around the party; they are too big be fireflies.",
		"A thick fog envelops the area.",
		"With an explosive fluttering, a bevy of quail scatter from a nearby bush.",
		"A rabbit bolts from its burrow and scampers for other cover.",
		"Trampling noises caused by some unseen beast crunch along in the thick undergrowth.  ",
		"A harsh whining rises in the air around the party.",
		"Several piles of stacked rocks bound the trail.",
		"During the night, the nearby river flooded and almost inundated the party’s  campsite.",
		"Thousands of bloodthirsty mosquitoes swarm about the party as they make camp.",
		"A speckled bird appears to be nursing a broken wing as it hops away from the party.",
		"A strong wind plucks at the party’s cloaks.",
		"A woman sits on a rock, painting landscapes on the canvas and easel before her.",
		"Two bears rise from the nearby berry bushes, roar at one another, and engage in brutal combat before the party’s eyes.",
		"An eagle, or other large bird, dive bombs the party.",
		"A PC discovers a mouse in his pack.",
		"While fording the river, the straps holding a PC’s backpack snap, and the equipment is swept downstream.",
		"A crusted, shrivelled mass appears to be a human scalp pinned to the tree by a stone blade."
	];
	return randomChoice(choices);
};

var WildernessDressingForestsAndWoodlandsMinorEvent = function() {
	var choices = [
		"The PCs see a skunk in their path before the animal sees them.",
		"A hawk dives into the bushes near the PCs and grabs a small rodent before flying away.",
		"Wind suddenly gusts through the trees, bending their less sturdy boughs.",
		"A wolf howls in the distance; from the opposite direction, another wolf answers.",
		"A tree falls across the PCs’ path about 200 feet in front of them.",
		"A hermit bursts out of the trees screaming about a terrible monster pursuing him.",
		"Squirrels chatter at the PCs from a nearby tree's branches. The squirrels taunt the PCs and hurl acorns at them if approached.",
		"A cloud of butterflies, comprised of several different species, rushes past the PCs.",
		"The wind creates a susurrus sounding like humanoid whispering.",
		"A dead branch drops from a towering oak and crashes nearby.",
		"A flock of birds erupts from a nearby bush; the birds cry in unison as they fly away.",
		"A faint odour reminiscent of baking bread reaches the PCs.",
		"At midday, a faint mist forms. The mist does not appreciably affect visibility.",
		"An owl cries 'Hoo' at the appropriate time in response to the PCs’ conversation.",
		"Three porcupines trundle across the PCs’ path.",
		"A sudden thunderstorm drenches the PCs; during the storm, lightning strikes a nearby tree and splits it half.",
		"A large winged creature flies directly over the PCs; the creature is oblivious to (or uncaring of) the PCs.",
		"A sinkhole forms about 300 feet in front of the PCs; a DC 8 Perception check notices the sinkhole. The 10‐foot diameter sinkhole is 30‐ feet deep and opens up to underground tunnels left by a large worm‐like creature years ago.",
		"A 3‐foot diameter seed head floats by the PCs; if disturbed; it breaks up into Individual floating seeds.",
		"One of the PCs’ mounts (or a PC, if the party has no mounts) trips in a rut (1 Dex damage [DC 10 Reflex save negates]).",
		"A swarm of stinging insects flies in parallel to the PCs; the swarm does not react to the PCs unless they directly interact with it.",
		"A deer bursts from a nearby thicket, startling the PCs and their mounts; each mount must make a DC 10 Will save or be shaken for 2 rounds. A PC trained in Handle Animal can make a DC 10 check in place of his mount’s Will save.",
		"A loud roar sounds at a distance from behind the PCs; optionally, the roar repeats once an hour from the same distance.",
		"A pile of dead leaves drops on the PCs; a DC 12 Reflex save avoids 1d2 damage as the leaves poke and scratch the victim.",
		"Any PC making a DC 15 Perception check hears an argument between two fey creatures; the creatures present no threat to the characters, but may reward those who help resolve their disagreement.",
		"A nest of snakes slithers out from under a bush; the snakes are not poisonous and do not attack except in self‐defence, but the creatures might disturb the party’s mounts.",
		"The wind picks up a lot of dust; the PCs must make a DC 10 Fortitude save or take a ‐4 penalty on sight‐based Perception checks for an hour.",
		"An empty, runaway carriage heads straight for the PCs; the mount pulling the carriage dies of exhaustion after the PCs stop it (or a short way further down the trail).",
		"A large, black cat crosses the PCs’ path; it arches its back and hisses at them, but otherwise takes no offensive action.The faint smell of smoke reaches the PCs upon the breeze, but no obvious fires burn nearby.",
		"A flock of doves takes off at the PCs’ approach. A DC 10 Knowledge (nature) check, reveals this to be a good portent; everyone in the party gains a +1 luck bonus on his next saving throw (if made on the same day).",
		"Borril the huntsman (LN male human expert 1/warrior 1) describes a group or poachers and asks the PCs if they have seen them; they have not run into the group, but may later on.",
		"At daybreak, a sudden chill hits the woods creating frost on the grass; after an hour passes, the temperature rises to a comfortable level.",
		"A mated pair of deer timidly approaches the PCs; they seem comfortable with humanoids and appear to want food.",
		"The leaves on a single tree suddenly change colour as if the onset of autumn took place over the course of a minute.",
		"The ground shakes as if a large creature moves through the nearby woods.",
		"A gentle rain falls, creating a steady, light drumming on the leaves above. Very little of the rain reaches the ground, until the leaves bend under the collected water’s weight.",
		"At hourly intervals, a bird chirps a number of times equal to the hour; the unseen bird seems to follow the PCs throughout the day.",
		"A wild boar bursts from a thicket; it tries to trip a random PC (CMB +4) and then barrels onward to the other side of the path before disappearing into a thicket.",
		"The party reaches an oak tree where a family of four opossums hang by their tails from the same branch; the animals are unmindful of the interruption.",
		"A sudden (but distant) shriek sounds from in front of the PCs; a DC 20 Knowledge (local) check reveals the shriek comes from a humanoid, while a DC 20 Perception or Survival check estimates the distance as five miles away.",
		"The party interrupts a raccoon that had been washing its food in a small stream; the animal chitters at them angrily and runs off.",
		"A root threatens to trip unmounted PCs; each walking PC must make a DC 15 Reflex save to avoid falling prone and taking 1d2 damage.",
		"As the party travels to their destination, a group of blackbirds alights at regular intervals on a nearby tree; the number of birds equals the number of miles to the party’s destination (DC 10 Intelligence check determine the significance).",
		"A sudden gust blows through the woods, threatening to uproot smaller trees; the PCs are affected by severe winds for 1d4 rounds.",
		"A pair of foxes crosses the PCs’ path; shortly after they do so, a horn sounds followed by the baying of hounds. Through a break in the trees, the PCs spot a cluster of dark clouds scuttling across the sky toward them. Half an hour later, the party is beset by an intense, but brief rainstorm.",
		"The sound of someone whistling reaches the PCs; It comes from random directions, and the PCs cannot find source of the whistling.",
		"During an evening watch or just before the PCs wakes up, squirrels attempt to rummage through packs and other accessible containers; they steal rations and small shiny objects if nothing threatens them.",
		"A druid (Tialla [NG female half‐elf druid 3]) approaches the PCs and asks them to protect her animal companion, Marinda – a tigress – while she undertakes a dangerous mission; she promises to meet the PCs further along on their travels, and the tigress behaves herself during their journey (but does not fight on their behalf unless directly threatened).",
		"Just before dusk or dawn, the distant sounds of drumming reaches the PCs; the nearest known village is too far away to be the source of the drumming.",
		"A cloud of gnats swarms around the PCs; while the gnats deal no damage, they impose a‐4 penalty to Perception checks; dealing any damage to the swarm disperses the gnats.",
		"When the PCs reach the bank of a pond or lake, they find a colony of frogs that croak in unison 53 upon their arrival. Otherwise, the frogs ignore the PCs.",
		"A tree falls, threatening to hit one or more of the PCs; it attacks in a 15‐foot line with a +10 bonus (using one attack roll for all targets in the line) and deals 3d6 bludgeoning damage if hits.",
		"A peacock walks up to the PC with the highest Charisma, fans its tail and then struts away.",
		"A fox – a dead rabbit in its bloody jaws – darts across the trail. At sight of the PCs, it sprints into nearby undergrowth.",
		"Three trees lie by the trail. Each has obviously been deliberately chopped down, but of the woodcutter there is no sign. An axe stands against one of the fallen trees and a nearby backpack contains mouldering food. Squirrels in a nearby tree’s bough chuck nuts at the PCs, evidently in an attempt to drive them away (+3 attack, 1 nonlethal damage). Any threatening action taken towards the squirrels scares them off.",
		"A family of brown bears wanders into the party’s campsite; they seem hungry, but do not take any aggressive action. If anyone feeds the bears, they follow the party for a couple of hours before wandering off.",
		"A cloud of hallucinogenic spores blows through the party; each PC must make a DC 14 Fortitude save or become confused for 1d6 rounds.",
		"A cascade of water suddenly flows from a rocky shelf above the PCs; (+12 melee attack, 1d8 nonlethal damage plus bull rush [+12 CMB]).",
		"The temperature drops precipitously during the night; unprotected PCs are affected by cold weather (during spring, summer or fall months) or by severe cold (during winter months).",
		"The PCs reach a riverbank where someone has tied a boat to a nearby tree; the boat has fishing equipment, but the boat’s owner is not present.",
		"If the PCs fail a DC 15 Perception check, they do not notice the entrance to an abandoned, overgrown burrow. A PC unaware of the burrow must make a DC10 Reflex save or fall into it, twist his ankle and suffer 1d3 damage.",
		"The PCs hear mewling from a nearby hole; if they investigate, they find a litter of eight bobcat kittens. The mother has abandoned the young or perished.",
		"Beroca, a treant, rumbles across the PCs’ path; he remains oblivious to them, unless they draw his attention. Beroca does not attack and may answer questions about this portion of the woods if the PCs can improve his attitude from indifferent to friendly (DC 16).",
		"A wild man, nude except for a loin cloth and with sticks and twigs in his hair, confronts the PCs; he speaks gibberish, but he obviously tries to warn the PCs about a threat further down the path (a DC 20 Sense Motive check confirms this).",
		"At night, assuming the party has a campfire or other light sources, a swarm of moths mills about the light; if unbothered, they dance about the light for an hour and then fly off.",
		"The PCs encounter a man whose wrists show PCs may signs of previously being bound (DC 10 Perception reveals); he refuses any offers of help and goes on his own way. The encounter his pursuers later.",
		"Bats fly from a nearby cave, potentially startling the PCs’ mounts; each mount must make a DC Will save or be shaken for 1 hour. PCs trained in Handle Animal can perform a skill check in place of the Will save.",
		"Panicked animals – rabbits, deer and so on – crash through the trees towards the PCs; they obviously flee from something. No other signs of what frightened the animals present themselves.",
		"A middle‐aged woman (Calsita [N female human commoner 1]) covered in pustules and apparently suffering from a nasty disease warns the PCs to stay away from her home village where all the inhabitants suffer from the same affliction. She then stumbles away, mumbling something about getting help from a local druid.",
		"A team of fine horses, wearing harnesses bedecked with bells, prances past the PCs; while they act like they know where they are going, they have no riders.",
		"An eight‐foot long throwing spear crashes through the trees and lands several feet away from the party. Of who threw it, there is no sign.",
		"Lightning flashes and an ominous boom of thunder sounds in front of the PCs; with a DC 15 Survival check, a PC realizes a storm is imminently going to strike the area.",
		"A griffon flies over the treetops but spies the PCs’ mounts through gaps in the trees; after a tense moment where the creature decides whether to grab a tasty horse, it flies off.",
		"The party happens upon an overturned cart in a ditch. Of the rider or horse there is no sign. The wagon has not lain here long (DC 20 Perception reveals) and there is no sign of foul play.",
		"A badger, interrupted from enjoying the snake it recently killed, hisses at the characters and drags its kill into a thicket.",
		"The party reaches a pond that sparkles in the sun; fish regularly jump out of the pond and splash back in. The fish are so plentiful that PCs making a Survival check to forage gain a +5 circumstance bonus.",
		"The wind creates a tiny tornado that picks up dirt and leaves and swirls them around; a PC in the swirling winds must make a DC 10 Reflex save to avoid getting dirt in his eyes (‐2 penalty to sight‐based Perception checks) for 10 minutes.",
		"An ape jumps down from the forest’s canopy, beats its chest and stares down the PC with the highest Strength score; after the ape makes its display, it climbs back into the trees.",
		"A flock of blue songbirds darts in and out of the trees around the PCs; they sing a lively tune while they frolic.",
		"When the party passes through a clearing filled with flowers, the flowers turn from the sun to face any divine spellcasters who pass by.",
		"A grizzly bear, drunk on fermented honey, attempts to pass the PCs while weaving on its rear legs. If the PCs provoke the bear, it merely grunts at them and then belches.",
		"In a hilly part of the forest, the PCs hear a shouted warning before a runaway log barrels down the hill; the log bull rushes one PC (+15 CMB). 1d3 rounds later Niall (LN male human expert 1) rushes down the hill to apologise.",
		"A tree nearby the PCs suddenly splits in half, and each half falls over. A DC 15 Knowledge (nature) check reveals the tree is dead; killed by a rotting mould; the trunk split under its own weight.",
		"In a dry patch of the woods, PCs must be careful to avoid starting a forest fire; a PC lighting a fire must make a DC 12 Survival check to avoid catching dry grass, creating an out‐of‐control forest fire after 1d8 minutes.",
		"Snarls and roars herald the arrival of a pair of tigers locked in a territorial battle. They roll past the PCs and concentrate only on each other. They attack a PC only if he directly interferes.",
		"A crow attempts to alight on one of the PCs’ shoulders; if allowed to land, every few minutes it caws out a name the PCs do not recognize.",
		"A unicorn, riddled with arrows, reaches the PCs and collapses. It dies in 2 rounds unless the PCs act. The arrows are of crude manufacture and a DC 10 Craft (weapons) or Profession (fletcher) reveals they are of orcish artifice. If revived, the unicorn (Firatris) thanks the PCs and warns of a band of marauding orcs in the area.",
		"The party interrupts a large spider in the process of cocooning a deer caught in its web foreboding thicket. If the PCs approach, the spider hisses, clacks its mandibles menacingly and then retreats, allowing the PCs to rescue the trapped animal.",
		"Witch‐lights appear and dance enticingly to lead the PCs into a dark and foreboding part of the woods; when the PCs reach the last light in a secluded clearing, they do not find anything. This behaviour repeats itself for two days.",
		"After the PCs set up camp, a flock of owls lands on tree branches encircling the camp; they hoot at each other as if discussing the party. If attacked, they fly away. If allowed to remain the owls hoot all night and the PCs are fatigued the next day due to lack of sleep.",
		"The wind blows a rare lotus blossom of deep red hue past the PCs; a DC 20 Knowledge (nature) check identifies the specimen, which the PCs can sell to an interested buyer for 50 gp (if they can find such a fellow before the bloom perishes).",
		"A cluster of puffball mushrooms burst when the party passes by; each PC within 20‐foot must make a DC 15 Fortitude save or become sickened for 1d4 hours by the spores.",
		"One of the PCs’ mounts refuses to enter a section of the forest; a DC 10 Handle Animal check coaxes it to move through the woods.",
		"The PCs hear a commoner (Sezerin [CN male human commoner 1) calling for Hurst; when they find him, he claims to have lost his prize pig, which slipped into the woods. He offers a meagre reward to help him find his pig.",
		"The party come across a large clearing. A riot of wild flowers covers the ground and a PC making a DC 15 Heal or Knowledge (nature) check finds enough herbs to replenish three uses of a healer’s kit.",
		"The PCs stumble upon a bandit’s hidden treasure cache. A shovel lies on the ground near a large hole dug between the roots of a mighty elm tree. At the bottom of the hole lies the remains of two sacks. A DC 20 Perception check recovers 5 sp from the loose earth.",
		"The PCs encounter a man painting this area of the forest; however, the painting portrays events that have not happened yet and includes at least one member of the party. If the PCs question the man – who is actually a ghost – fades from sight."
	];
	return randomChoice(choices);
};

var WildernessDressingPrimalForestsMinorEvent = function() {
	var choices = [
		"A PC steps in a rotting pile of vegetation (DC 20 Perception or Knowledge [nature] check to notice beforehand); a creature using scent can detect the PC at twice the normal range.",
		"An owl swoops p the party and grabs a mouse from nearby underbush.",
		"A gust of wind rushes through the party and hits a dead standing tree which topples over into the PCs’ path.",
		"An emaciated fox regards the PCs from a narrow opening between a pair of trees before bolting away.",
		"As the PCs travel down a rough trail, a clearer trail presents itself a few hundred feet away; the trail is illusory (DC 14 Will save to disbelieve).",
		"A dozen sabre‐toothed squirrels among the branches of several trees, scattered watch the party and chatter at each other.",
		"Motes of multi‐coloured light beckon the party off the trail; if followed, they stay ahead of the PCs and eventually wink out never to return.",
		"At dusk and dawn, the party spot a ghostly white stag in the distance; the creature stares at the PCs for a while before snorting, shaking its head and ambling away. The stag leaves no tracks and cannot be followed.",
		"Three raccoon kits tumble playfully with each other, crossing the party’s path; the PCs see no adult raccoons in the area.",
		"At noon, and for an hour afterward, the air becomes still and a thick fog surrounds the PCs; if they disperse the fog, it returns a minute later.",
		"Tiny fey taunt the PCs as they travel. Each PC who hears the fey and fails a DC 11 Will save becomes confused for 1 round; the fey disappear if anything threatens them.",
		"A PC breaks a trip wire (DC 15 Perception check to notice, DC 15 Disable Device check to disarm), but nothing happens; the trip wire appears to not have an associated trap.",
		"After the party makes camp, a conspiracy of ravens alights in trees surrounding the campsite. They caw at each other in conversation and occasionally one of them waves a wing in the PCs’ direction. After 10 minutes, they fly away.",
		"Hundreds of rats burst from the underbrush and rush past the PCs; Speak with animals gets a hurried, “big nasty...big teeth” response.",
		"The PCs discover a large picnic basket filled with enough fresh food to feed six; the food is not poisonous, nor does it radiate magic.",
		"Two dogs and a cat cross paths with the party the cat looks at one of the PCs with a spark of recognition and then sadness, before the trio wander away.",
		"One of the PCs steps into a snare (DC 20 Perception check to notice; DC 10 Disable Device check to remove); the ancient ropes used in the snare have rotted so much they have a 50% chance of breaking when pulling up a target weighing more than 100 pounds.",
		"If the PCs make a fire when they camp, a strong wind blows embers into nearby brush, which catches fire; if left unchecked, the fire consumes two acres before burning itself out.",
		"A cloud of gnats accompanies the party, causing all PCs who fail a DC 11 Fortitude save to take a ‐ 2 penalty to Perception checks; wind disperses the annoying insects, which return 15 minutes later, but an area spell that deals 5 points of damage destroys the gnats.",
		"Every time the party reaches a clearing, they spot a flock of buzzards circling directly overhead.",
		"Beautiful flute music reaches the PCs’ ears from some unknown source during the day; at night, the music turns shrill and discordant.",
		"A giant log trap swoops down at the PCs (DC 20 check to bypass, bull rush [CMB +15] all characters in a 30‐foot line). Perception check to notice, DC 20 Disable Device",
		"The PCs hear a large creature and in the forest’s upper canopy, but they cannot see it; seconds later it flies away.",
		"Pony‐sized rabbits hop past and through the party, heedless of the potential danger the PCs represents.",
		"A crow follows the party and chooses one PC, repeating the last word spoken by the target after he or she pauses or stops talking; if the PC stops talking, the crow croaks out the same word every five minutes.",
		"A shower of normal cocoons falls on the party.",
		"At noon, the trees overhead part, allowing the sun to bathe the PCs in light.",
		"A clump of mushrooms fire spores at anything that passes within 20 feet, and the spores coat anyone who fails a DC 15 Reflex save; if the clinging spores are not removed with a half‐gallon of alcohol or a spell like neutralize poison, affected PCs exude a pungent odour, and creatures with scent gain a +5 circumstance bonus on Perception checks to find them.",
		"After the PCs pass by a point, a bear trots through on its hind legs.",
		"The smell of baking pies wafts through the air, but the party can find no source for the scent.",
		"An explosion of light surrounds the PCs, outlining them in faerie fire for an hour (DC 18 Reflex negates).",
		"A line of seven‐inch long, black horned beetles travels in parallel to the party; each beetle carries a ball of organic material, nestled on its horns.",
		"Moments after the PCs hear a woodpecker in one direction (DC 10 Knowledge [nature] to identify it) a similar pattern sounds from the opposite direction.",
		"A rotten tree falls, hitting all PCs in a 15‐foot line (+11 attack, 2d6 damage).",
		"A PC, or one of the PCs’ mounts, trips on an exposed root covered by debris (root’s trip attempt CMB +15).",
		"A wild cat crawls through the forest’s canopy and, spotting the party, hisses and growls before continuing on its way.",
		"Lightning strikes a tree in a nearby clearing, and the thunder almost deafens the PCs.",
		"A branch seemingly reaches down to tap the shoulder of a passing PC.",
		"A flock of wrens carrying a four‐foot‐long, yellow ribbon drapes the ribbon over a tree’s branches; they flutter nearby, and then, satisfied with the ribbon’s placement, fly away.",
		"A tree splits in two, and each half of the tree threatens to fall over, but it remains standing.",
		"A sudden haze envelops the PCs; it feels uncomfortably warm and causes those within to take a ‐2 penalty on Perception checks.",
		"Once per hour, the PCs hear a faint knocking, as if it originates from within a tree.",
		"A unicorn stands at the top of an uphill path and regards the PCs, before trotting away from them down the other side of the hill.",
		"As the party camps at night, flickering motes of light appear at random locations along the edge of the campfire’s illumination; the lights emit musical notes before winking out.",
		"Giant puffball mushrooms explode as the party passes by; they release a mass of harmless white spores.",
		"A minor earthquake strikes the area, toppling small, weak trees, but otherwise causing no damage to the forest or the party.",
		"From the distance, a chorus of cheers goes up and repeats roughly every four minutes; once the party reaches the source of the cheers, they find an abandoned arena in a clearing.",
		"The PCs disturb a nest of non‐poisonous snakes underneath a pile of rotting leaves; the snakes hiss and slither off in all directions.",
		"A fledgling bird falls from a nest high up in a tree; a PC can catch the bird and save it from dying by making a DC 12 Reflex save.",
		"Chipmunks lob acorns from 16‐foot high branches at the party, dealing no damage even if they hit; after one throw, each chipmunk scurries back into a hole in the tree.",
		"A tiny winged woman alights on a branch and silently regards the PCs; she flees at the first sign of aggression or approach.",
		"Several flocks of sparrows line the branches around the PCs where they quietly watch the party; a loud noise sends the birds away in an angry exclamation of chirps.",
		"A distant bell tolls five times, stops for a minute and then tolls five more times.",
		"The scent of roasting meat reaches the party, but it dissipates almost instantly.",
		"A giant purple bird bursts through the trees, knocking one over, shrieks at the party and continues on its way.",
		"Tiny leaflets flutter past the PCs like butterflies; the leaflets, written in Sylvan, discuss popular spring fashions for the faerie court.",
		"As the party travels down the path, the trees alongside it suddenly sprout foot‐long thorns.",
		"A team of white stallions fitted to pull an elegant carriage canters by the party without a carriage.",
		"A raven lands on a nearby branch and repeats “turn back” several times before taking flight.",
		"Deep within the forest, the temperature suddenly plummets; untouched by the sun, a six‐foot snowdrift covers two acres of the woods.",
		"A 2‐foot diameter sphere of frogs falls near the party; all the frogs in the sphere survive the fall and hop away.",
		"During combat, a nearby tree bears similar wounds those taken by a PC; if the PC is healed, the “wounds” disappear from the tree as well.",
		"A stand of trees seems to block the way forward, but the trees part when someone approaches.",
		"A group of three‐foot tall, purple‐capped mushrooms sways to an unheard melody.",
		"An elm tree passes through a year’s life cycle in a matter of minutes; the leaves it drops rot away quickly as well.",
		"A group of corpses hang from nooses slung from high branches; a DC 20 Perception check reveals one of the “bodies” is still struggling, and a DC 25 Heal check reveals the person (a badly injured goblins) still lives.",
		"Branches from a willow tree unsuccessfully grasp at the PCs; the tree lets out a nearly inaudible howl when it fails to grab someone.",
		"Bats fly past the PCs, shrieking as they do, and one or two get tangled up with a party member.",
		"The forest’s sounds suddenly cease once the party reaches a certain point and begin again when they travel further; the PCs can make sounds without issue.",
		"A large club crashes through the trees and lands near one of the PCs; they hear a distant bellow seconds later.",
		"During the night the PCs camp under the forest’s canopy, which parts to reveal the stars and a streaking meteorite.",
		"A hunting dog trots through the woods, carrying a bugle in its mouth.",
		"A giant turtle, carrying an empty hut on its shell, lumbers across the PCs’ path.",
		"A light rain seeps through the canopy; at times pooled water in the upper canopy pours down on the party.",
		"A tinny fanfare plays from several hundred yards to the east, and it plays again ten minutes later.",
		"A blue goat with a horn jutting from its nose meanders through the forest, a cowbell sounding as it walks.",
		"At night, a swarm of fireflies gathers around the party; if the PCs do not disperse the insects, they are treated as if affected by faerie fire.",
		"Five warthogs surround the party and make threatening snorts; at the first sign of aggression the animals flee.",
		"A large branch suspended above the clearing falls on the party (all PCs in a 20‐foot line, +18 attack, 2d6 damage); a DC 17 Perception check alerts the PCs to the sound of the falling branch and provides a +2 dodge bonus to their AC.",
		"A nearby tree suddenly gets sucked into the ground; investigation reveals a hole slightly larger than the now missing tree that travels further down than the PCs can see.",
		"An animate mound of plant matter (a DC 16 Knowledge [nature] check reveals it is a shambling mound) watches the PCs from a distance.",
		"A rotten log gives way under a PC’s weight (DC 15 Perception to notice, 20‐foot drop); the skeletal remains of another victim rest in the pit.",
		"As the PCs pass a grove of trees, the bark on all trees turns ash white; no ill effects seem to result from this change.",
		"A tree falls and strikes another tree, which in turn falls and strikes another tree, creating a slow‐moving chain reaction that finally stops with the seventh fallen tree.",
		"An acrid, brown fluid seeps up from underground; it causes no harm to anything it touches.",
		"The lilting notes from a harp reach the PCs’ ears; the distant sound persists for ten minutes before stopping.",
		"A kindly looking giant gazes intently at the PCs before deciding to leave them alone. He then lopes away into the forest.",
		"The top stone on one of the dolmens protecting a grove of yew trees crashes to the ground and splits in half.",
		"A tree bends such that its bough touches the ground; if someone climbs into the bough, the tree gently straightens out.",
		"A pack of wolverines crosses paths with the PCs; the animals snarl and growl but do not threaten to attack; they continue on their way if left alone.",
		"On a downward slope in the forest, a boulder rolls past the PCs and bounces off a tree before continuing on its downward path.",
		"The smell of smoke reaches the PCs’ noses on a westerly wind; if they look to the west, they see a blaze has started roughly a mile away.",
		"The distant sound of drums repeats once an hour; the drums seem to draw closer for a while and then recede.",
		"A flock of quail land noisily in the branches above the party’s heads.",
		"The wind blows through a pile of rotting leaves creating a tiny cyclone of leaves which travels 60 feet before falling apart; any PC in the cyclone’s path must make a DC 11 Reflex save or the leaves plaster his body (this has no harmful effect).",
		"A 50‐foot line of leafcutter ants parallels the party’s path. After half a mile, the insects climb a tree crawling with thousands more of them.",
		"The PCs hear the snarling of wolves, quickly cut short by a yelp immediately followed by a triumphant howl.",
		"As the PCs travel, they hear chanting (druids who speak Druidic recognize the language); once the party reaches the chanting’s source, they see group of cloaked figures who disappear at once.",
		"While the PCs camp at night, a meteorite crashes through the forest’s canopy and lands a half mile from the campsite; the impact creates a small tremor and starts a fire.",
		"Faint whispers carried on the wind warn the PCs to turn back, run away and beware (followed by a muddled name). The whisper are in Sylvan and they cease after 15 minutes"
	];
	return randomChoice(choices);
};

var WildernessDressingSwampsMinorEvent = function() {
	var choices = [
		"A single bird cries aloud as it flies overhead.",
		"A faint, bobbing light begins to glow from deeper into the swamp.",
		"Mosquitoes and other insects swarm about the party.",
		"The buzzing of flies fills the air.",
		"The party come across a wild pig stuck in a patch of quicksand. The pig is partially submerged and exhausted from its struggles.",
		"A sudden wind sighs through the surrounding reeds and thick grasses.",
		"A sparrowhawk flies overhead before diving into a nearby thicket. It emerges moments later clutching a mouse in its claws.",
		"A small, non‐venomous snake slithers through the grass by the trail.",
		"A lizardfolk warrior lies hidden in a deep pool. As the PCs approach, it submerges and waits for them to pass.",
		"Several dead fish float upon the surface of a wide pool.",
		"A small flock of wading birds stand in a shallow pool and watch",
		"A single loud splash shatters the silence.",
		"Smoke from an unattended campfire rises from a distant hillock.",
		"Several wading birds regard the PCs from a shallow pool.",
		"A single, large frog hops across the path.",
		"A magic mouth cast on a stone activates and croaks “go back” in Draconic. the PCs as they pass.",
		"Several frogs hop along a muddy bank leading down to a small stream.",
		"A viper basks on a fallen tree.",
		"A deer suddenly emerges from a stand of tall grass. It bounds away, if attacked.",
		"A small stream flows through the mire. At one point, beavers have dammed the stream creating a shallow, wide pool.",
		"A dragonfly buzzes past the PCs.",
		"Several butterflies flutter through the air. As the PCs approach, they settle on a nearby fallen tree.",
		"An owl has taken up residence in a large tree atop a low hummock. By night, he hunts the surrounding area.",
		"A flock of birds weave and dart overhead.",
		"Lily pads float upon a deep pool; a small frog sits atop one such pad.",
		"A sudden splash from a nearby deep pool splits the air and large ripples spread ominously on the pool’s surface.",
		"The load croaking of several frogs fills the air.",
		"When the party camp for the night, they discover that all have been attacked by leaches. (Every character suffers 1 damage).",
		"Thick black smoke marks the location of a sullenly burning hut.",
		"The water’s surface is disturbed as if something large is swimming just below the surface.",
		"The wind blows sodden leaves into the party’s faces.",
		"The wind blows the stench of decay over the party.",
		"A single large black scale (from a black dragon) lies on the trail.",
		"A bush looks like a shambling mound (but isn’t). A DC 16 Knowledge (nature) reveals its true identity (as a bush).",
		"The buzzing of insects fills the air.",
		"A spike is embedded in the mud. A DC 15 Knowledge (arcana) identifies it as a manticore spike.",
		"A loud (but distant) tiger’s roar shatters the silence.",
		"A hallucinatory terrain renders a deep pool to appear as a high hummock. Unwary characters tumble into the pool.",
		"The rotting head of a basilisk (DC 15 Knowledge [arcana] identifies) hangs from a tree.",
		"A severed snake head lies tangled atop thick reeds. A DC 17 Knowledge (nature) identifies it as coming from a medusa.",
		"A globe of total darkness covers an area of marsh. A DC 23 Knowledge (arcana) identifies it as a deeper darkness spell.",
		"The PCs hear distant singing.",
		"A mass of ants cover the trail. There are not enough to form a swarm.",
		"The characters hear distant laughing.",
		"The distant crack of breaking wood is followed by a loud splash.",
		"A sudden loud chorus of frog croaks shatters the silence.",
		"Leeches attach themselves to one or more characters. Unless removed, the leaches drain 1 hp an hour from their victim.",
		"Hard rain deluges the characters. After 1d6 hours, the trail begins to flood.",
		"A distant splash is followed by a short scream that is suddenly cut off. Ominous silence follows.",
		"The air goes totally still; there is absolutely no wind.",
		"The mournful sound of a single flute pierces the silence.",
		"A marsh bird transfixed by a slender arrow suddenly falls at the party’s feet.",
		"A fly swarm buzzes about the decomposing corpse of a crocodile that has suffered horrendous bite wounds to its head.",
		"The cackling of a sinister crone echoes across the waters of a nearby pool.",
		"Without warning the straps of one of the PCs’ backpack splits.",
		"Midges and gnats beset the party.",
		"A long stream of bubbles suddenly mar the surface of a pool close to the trail.",
		"Schools of small fish dart about the depths of a pool, easily visible from the trail.",
		"The PCs spy a hunched, cloaked figure moving quickly away from them.",
		"A crude coracle floats by; the body of a lizardfolk warrior laid out in state lies within.",
		"Although no wind stirs the air a patch of nearby rushes sways ominously.",
		"The sounds of marsh life – the buzzing of marsh insects, the croaking of frogs and so on – abruptly cease.",
		"A large bird sings at the party as they pass.",
		"A large butterfly lands on a character’s nose.",
		"The howling of an injured dog shatters the quiet.",
		"A light drizzle begins to fall and doesn’t stop until around midnight.",
		"Clouds part to reveal the moon has risen early to hang over the marsh with pregnant menace.",
		"A thick mist hovers over a low‐lying area of marsh. Strange sounds emanate, from within.",
		"A high hillock seems to be a perfect campsite. However, the ground is riddled with ants and if the party camp on the hillock their clothes become infested.",
		"The roots of a tree stump hide a nest of swamp snakes. The snakes are harmless.",
		"The distant boom of thunder rolls over the party, but the sky does not look stormy.",
		"Heavy cloud cover brings dusk several hours early, possibly catching the party without a campsight.",
		"A large pile of steaming excrement sits on the trail. The (large) creature that created it may yet lurk nearby.",
		"A javelin arcs out of a nearby thicket of reeds and just misses the rearmost party member.",
		"A half‐sunken coracle lies in the water near the trail.",
		"The party discover a section of causeway and make good time for the remainder of the day.",
		"The PCs are bitten by insects infected with filth fever (DC 12 Fortitude negates).",
		"The sky is completely clear of clouds and the day slowly becomes unbearably hot.",
		"A drifting, empty coracle floats nearby the trail.",
		"The ground gives way at the party’s feet falling into a fetid, muddy cavern.",
		"A faint, luminescent fogs rises from a nearby pool.",
		"One of the party’s pack animals falls and breaks a leg.",
		"A marsh viper bites a pack animal. Panicked, the creature flees into the marsh.",
		"Strong wind and heavy rain combine to make the day’s travel a truly miserable experience.",
		"The smoke of a smouldering campfire drifts lazily into the sky.",
		"Several birds suddenly take flight from a nearby tree and fly away while crying out in alarm at some unseen (by the party) danger.",
		"A slender spear lies upon the mud about 20 ft. away. The area is actually riddled with quicksand (page 9) which may entrap those seeking to recover the spear.",
		"A fallen tree blocks the trail. Characters climbing over it dislodge it and fall flat on their face in the mud (DC 15 Reflex negates).",
		"The waters of a deep pool seem to glow from within.",
		"With a splash, a spear lands in a nearby pool.",
		"The acrid stench of acid reaches the PCs.",
		"One of the party steps into a deep patch of sticky mud. The PC loses his shoe unless he makes a DC 15 Reflex save.",
		"The PCs blunder into an area of quicksand (page 9).",
		"The party stumbles into an area rank with marsh gases and are sickened for 1d3 hours (DC 12 Fortitude negates).",
		"Many leaches attach themselves to one or more characters. Until removed, the leaches drain 3 hp an hour from their victim.",
		"The trail is bound by a steep bank, which collapses when the party passes by. Two PCs must make a DC 15 Reflex save or slide into the pool below.",
		"The PCs spy a distant manticore flying over the marsh. It does not see them.",
		"A sudden cold wind whips up the water of the nearby pools.",
		"Clouds block out the sun and the temperature suddenly drops.",
		"The smell of smoke borne upon the breeze reaches the PCs."
	];
	return randomChoice(choices);
};

var WildernessDressingDesertMinorEvent = function() {
	var choices = [
		"The smell of spices is carried on the wind.",
		"A monitor lizard warms itself on a nearby rock.",
		"The party travels through an area of pitch‐black sand.",
		"Tracks from large slithering creatures cross the sand.",
		"A group of escaped slaves come crawling through the dunes, near death from thirst and starvation.",
		"In the quiet desert night, far off chanting can be heard on the wind.",
		"During the night, the howling of a pack of jackals makes it hard to sleep.",
		"Heaps of animal droppings cover the sand (DC 10 Knowledge [nature] identifies as camel droppings).",
		"Nature conspires to create severe heat conditions (DC 15 +1 for each previous check every 10 minutes or suffer 1d4 nonlethal damage).",
		"On the top of a nearby dune, several vultures feast on a recently dead camel.",
		"A slight breeze gives a needed respite from the sweltering conditions.",
		"A flying carpet passes over the party; the carpet’s passengers take no notice of the PCs.",
		"Five stones are arranged amid the sand in a semi‐circular pattern.",
		"Scorch marks in the sand tell of a magical duel.",
		"Bestial tracks cross the sand (DC 20 Knowledge [nature] identifies as jackalwere tracks).",
		"Patches of sand feel wet to touch. (In fact, it is soaked in acid which deals 1d4 acid damage).",
		"A desert cliff has steps carved into it.",
		"The wind has laid bare a small nest of eggs (DC 20 Survival identifies as lizard eggs).",
		"In the distance a massive sandstorm rages (DC 15 Survival predicts the likely path of the sandstorm in the coming hours). 8 The setting sun envelops the landscape in blood red hues.",
		"The dried out husk of a kobold lies in the sand.",
		"Two sets of neatly folded clothing lie in the party’s path; nothing can be seen of the owners.",
		"A large mesa stretches out before the party.",
		"A silken veil is blown over the party by the wind.",
		"Drifting sand partially covers a large, polished purple stone.",
		"Tracks reveals a gnoll slaver caravan is operating in the area (DC 11 Knowledge [local] reveals).",
		"Several large birds circle on the horizon (DC 10 Knowledge [nature] identifies as vultures).",
		"The party finds a skeleton clutching a dust‐filled waterskin.",
		"A goat herd nibbles at the sparse scrub.",
		"A PC finds a huge, cracked tooth (DC 15 Knowledge [arcana] identifies as a dragon’s tooth).",
		"The party come across an empty, partially collapsed tent.",
		"Close by a flock of birds are startled, and take flight.",
		"A perfectly circular hole pierces the bedrock.",
		"The stinking rotten carcass of a death worm lies in the sand.",
		"Much needed shade is found under a rocky outcropping.",
		"A natural sandstone bridge spans a deep chasm.",
		"A pack of hyenas trail the party for a while. They stay back at a safe distance and flee if attacked.",
		"At night, the glow of a campfire rises from the dunes. A DC 10 Survival check reveals it is about three miles away.",
		"A silk caravan passes the party.",
		"Suddenly the winds dies down and the air is still.",
		"A perfectly clean skull sits on the sandy ground.",
		"In the night sky, a stationary dark shape blots out the stars.",
		"Small waves ripple in the sand as if something is moving beneath.",
		"A loud animalistic roar breaks the silence.",
		"While the party camps at night, green lightning can be seen shooting up from the ground some miles to the south.",
		"Giant footprints are discovered (DC 15 Survival identifies as desert giant footprints).",
		"A young boy is frantically searching for a lost sheep.",
		"A 20 ft. by 20 ft. carpet is laying halfway up a dune. It is in pristine shape, and not a single grain of sand mars the carpet’s surface (worth 150 gp; DC 20 Appraise values).",
		"Several rocks stick up through the sand. They seem to be arranged in circular patterns, but whether it is a natural occurrence or man‐made is impossible to tell.",
		"A still wet bloodstain, in a roughly human shape mars the sand. It is evident (DC 15 Heal check) that whatever bled here probably died. 24 A dung beetle rolls a ball of dung up a dune.",
		"A whirlwind traverses the desert against the prevailing wind direction.",
		"A group of gnolls have passed this way a few hours ago (DC 15 Survival reveals).",
		"A small lizard watches lazily as the party passes.",
		"A raving mad hermit yells insults at the party.",
		"A nomadic tribe on camels pass the party travelling in the opposite direction.",
		"The unmistakably sound of a rattlesnake reaches the party, but no snake can be seen nearby (DC 10 Survival check reveals the sound can travel on the wind for several hundred feet).",
		"A vulture falls from the sky, dead.",
		"An eight‐inch long bluish tinted scale is found on",
		"the ground (DC 15 Knowledge [arcana] identifies as a blue dragon scale).",
		"A small merchant caravan approaches over the dunes.",
		"A well‐guarded caravan takes steps to keep the party at a distance.",
		"At night, a sickly green glow is seen over the dunes to the east.",
		"The party has several vultures circling overhead.",
		"A jackal is trapped in a snare.",
		"The rearmost party member’s waterskin has been leaking for a while, it is now half full.",
		"The wind has formed a lifelike face in the sand.",
		"A large scimitar lies in the sand.",
		"At night the sound of huge wings come from far above the campsite.",
		"A character falls over a stone sticking up through the sand. Worn, unreadable runes cover every surface.",
		"A lone gnoll scout observes the party.",
		"A small rodent flees from the party into a hole in the sand.",
		"Sand covers most of an ancient ruined building.",
		"A family of meerkats watches the party curiously from their underground tunnel entrances; should anyone approach them, they quickly dive back into the safety of their tunnels.",
		"Something reflects the sun on a dune a few miles away.",
		"A nonvenomous snake slithers below the sand as the party approaches.",
		"The night is pleasantly warm.",
		"Thirteen silver pieces lie in the sand.",
		"In the horizon a range of mountainous peaks rise from the desert.",
		"Wisps of smoke seen over a dune leads to a campfire used by someone during the night.",
		"A dragonlike creature sits on a rocky outcrop in the distance (DC 18 Knowledge [arcana] identifies as a desert drake).",
		"A scorpion kills a beetle, and carries its prey off.",
		"Nomads are collecting water from cacti.",
		"A green human shaped rock feels cold to touch.",
		"A crate dropped by a caravan lie in the sand.",
		"The wind is noticeably colder than usual.",
		"A desert tortoise has been flipped over and is struggling to regain its footing before the sun cooks it alive.",
		"Bats fly over the party’s campfire.",
		"Two small scorpions are engaged in their own duel for a dead beetle.",
		"A spear has been driven into the sand. The wind blowing around nearby hoodoos plays a haunting tune.",
		"A large patch of cacti are in full bloom.",
		"A single boot – half‐filled with sand stands forlornly halfway up a dune.",
		"At dawn cacti are dripping with dew.",
		"A desert owl flies over the party’s campfire at night.",
		"A distant pack of gnolls travel hastily away from the party.",
		"The desert shows signs of recent precipitation.",
		"The party reaches an oasis, where they can stock up on supplies.",
		"No living things have been seen for miles.",
		"A bottle of fine wine is found, the contents have long since evaporated.",
		"An oil lamp lies discarded in the sand."
	];
	return randomChoice(choices);
};

var WildernessDressingFarmlandsMinorEvent = function() {
	var choices = [
		"Several field mice seek protection from a hawk wheeling above the party.",
		"A crossbow bolt narrowly misses one of the PCs; the party cannot determine the bolt’s source.",
		"A garter snake hisses at the PCs before slithering away into the field.",
		"A flowering plant blows pollen at a PC; he must make a DC 11 Fortitude save to avoid sneezing and watery eyes for 2d4 minutes.",
		"As the PCs enter a field, a nearby alarm bell rings for a full minute; the party can hear the commotion of people rushing toward the alarm.",
		"One of the PCs falls (DC 18 Perception spots; 1d6 nonlethal damage) into the burrow of an extraordinarily large rodent.",
		"In a strong gust, a pair of overalls floats over the PCs’ heads; shortly thereafter a naked man gives chase through the tall grass.",
		"A rustling sound travels in parallel to the PCs, and, when they stop, it stops.",
		"A barn owl descends twenty feet from the PCs, grabs a wriggling animal and silently flies away.",
		"A one‐ton cow barrels towards the PCs while her owner gives chase.",
		"Several people run by carrying sandbags; they only stop for a few seconds to explain a nearby river is threatening to overflow its banks.",
		"A swarm of butterflies descends on the field through which the party travels; they flit about every plant in the field except for one.",
		"A small section of grass catches fire; it grows into a full‐blown blaze if unattended for 10 rounds.",
		"An incoherent, wild eyed man, shackled at the feet, shuffles toward the party.",
		"A pair of black and white dogs whirls about the PCs in an attempt to herd them.",
		"At night, a full moon rises and bestows an eerie white glow to the surrounding fields .",
		"Crickets chirrup without interruption even as the PCs pass through the area.",
		"All along the fence closing off this pasture, posters display bills of sale for the farm.",
		"The smell of smoked meat wafts past the party.",
		"Ducklings pass the party searching for their mother, whose distant quaking the PCs can hear.",
		"A windmill’s blades spin wildly, and then fly off the windmill, narrowly missing the party.",
		"A fox, loaded down with a dead chicken in its mouth, dashes away from the party.",
		"A lone sheep follows the party, occasionally bleating for food or attention; the PCs can reunite the animal with its flock.",
		"A pair of scarecrows seems to follow the party’s movement; upon investigation, the PCs find no signs of life or unlife in the pair.",
		"A cloud of grasshoppers descends on the field the PCs travel through; the insects act as a fog cloud in terms of visibility.",
		"Three children race through the fields with bright streamers attached to sticks; one races up to the party, touches a PC and proclaims him “it!”",
		"At midday, a rooster crows, but the call cuts short with a strangled sound.",
		"Hummingbirds flit by the PCs; some stop to investigate, while others sup the flowers’ nectar.",
		"A man (commoner 1) carrying a sickle chases after the PCs and demands they leave his land.",
		"An ancient barn collapses when the PCs approach.",
		"A box trap holds a pair of emaciated rabbits; if set free, the animals look expectantly at the PCs for food before scampering away.",
		"The PCs encounter a man who mistakes them for tax collectors before running away.",
		"As the PCs travel through a field full of a tall, cultivated plant (corn, wheat etc.), a nearby section flattens, seemingly of its own accord.",
		"A hundred feet away, the ground heaves and settles, uprooting several plants.",
		"A team of oxen pulling a plough runs loose; the PCs can stop the oxen (AC 12, hp 8, CMD 14).",
		"Grass coils about the PCs and attempts to trip them (CMB +3); after doing so, it falls dormant.",
		"The PCs inadvertently flush out a flock of starlings.",
		"A peddler meets the PCs as they cross the border between two farmsteads; he sells great tasting produce at a modest price. ",
		"A muster of domesticated peacocks and peahens cries in cacophonous unison.",
		"A murder of crows, numbering at least 100, flies about the party before departing, cawing loudly. 43 A mostly intact wagon wheel rumbles by the party, stops rolling and tumbles over.",
		"A gopher peeks its head out of a hole, spots the party and darts back underground. 44 A woman wielding a butcher’s knife chases after a squealing pig and shouts to the PCs for help.",
		"A barn explodes, showering everything in a 500‐foot radius; miraculously no one is hurt.",
		"A calf awkwardly follows the party; its small cowbell rings as it stumbles along.",
		"A cloud of gnats floats passed the PCs’ location, obscuring vision for a few seconds.",
		"As one of the PCs passes a gourd, it splits open and empties its guts on his boots.",
		"A bull bursts out of its pen and charges toward a hapless farmhand.",
		"Mosquitoes swarm near a stagnant pool.",
		"Two teenagers frolic hand‐in‐hand through the field; on spotting the PCs, their eyes go wide and one of them pleads, “Don’t tell my dad!”",
		"A wild porcupine lazes on its back while it munches on an ear of corn.",
		"Clouds build ominously overhead, and the wind blows stinging dirt into the PCs’ faces.",
		"An old hound trots up to the party and bays loudly; a PCs can quiet the dog with a treat.",
		"A net, obviously meant for rodents, flies out at the PCs’ feet; they can easily free themselves.",
		"An owl emerges from its hole when the PCs approach; seeing they are not prey, it retreats.",
		"A PC disturbs an ant mound (DC 22 Perception spots); the crawling, biting ants do 1 nonlethal damage per round, until the victim makes a DC 14 Reflex save to brush them off.",
		"A long, multi‐coloured ribbon carried on a breeze descends on one of the PCs and gets tangled up about him but doesn’t impede his movement.",
		"A rabbit, cheeks stuffed with radish, regards the party for a moment before hopping off.",
		"As the PCs travel through a field, the plants undergo a noticeable (magical) growth surge.",
		"Shortly after the party sets camp, a bright flickering glow becomes evident in the distance.",
		"A bony coyote parallels the party’s path; it runs away if anyone approaches it.",
		"A brood of chickens gathers around the PCs and pecks at the ground for worms.",
		"A dragonfly darts around the party; it devours gnats, flies or mosquitoes bothering the PC.",
		"A frantic woman accosts the PCs and implores them to divulge her child’s location.",
		"A dairy cow with an orange “honourable mention” ribbon dangling from her neck wanders passed the party.",
		"A trio of halfling farmers complains about the weather while sitting under a tree and drinking.",
		"Wild deer nibbling on ripe corn startle and run away when the party approach.",
		"A flock of sheep run away from a man dressed in sheepskins carrying a shepherd’s crook.",
		"A pair of griffons “buzz” the party.",
		"A bee takes an unusual interest in one of the characters and flies about hi",
		"Packets of thistles caught on a breeze attach themselves to the PCs’ clothes.",
		"A woman stops the PCs and enquires about their adventures; she asks to accompany the party.",
		"The party surprises a llama, which spits at the PCs and then sprints away.",
		"A blood‐red full moon rises and bathes everything in the same colour.",
		"A cloud of flies envelopes the party.",
		"A sudden gust of wind whips seeds, small stalks, dirt and other debris into the PCs’ faces.",
		"A farmer wielding a wooden sword and wearing a bucket as a helmet challenges a PC to a duel.",
		"A flock of geese creates a considerable racket with its honking as it lands around the PCs.",
		"A brightly coloured wagon approaches the PCs; a cheerful halfling woman asks for directions.",
		"A distant glint of light reflects off something hidden in the grass.",
		"A mob of farmers carrying torches and pitchforks rushes up to the party; they are hunting a troll.",
		"The pungent smell of rot assaults the PCs’ senses and then immediately fades.",
		"Several children spot the party and run over to them; they ask bizarre questions.",
		"A druid stands in the middle of a field proclaiming the futility of farming to a handful of confused spectators.",
		"One of the PCs stands on a weed covered wine bottle and it shatters.",
		"A light rain shower sprinkles the party; sun glints off the droplets as they fall.",
		"A mustard‐yellow cloud billows through the field in which the PCs travel; it has no effect on the PCs, but plants immediately wilt on contact.",
		"A ball of fire streaks from the sky and lands in a nearby field setting it ablaze.",
		"In the distance, a baby wails without stopping; investigating PCs find a lost, scared toddler.",
		"Two sunflowers float on the wind.",
		"During a clear day, a bolt of lightning strikes a nearby plant, setting it on fire.",
		"One of the tall plants growing here uproots itself and follows the party.",
		"A ghostly figure appears and beckons the PCs deeper into the tall plants growing in a field.",
		"Low chanting in an ominous language (Aklo, Infernal etc.) emanates from a nearby barn.",
		"Several dandelion puff balls blow past the party and explode in glittery sprays.",
		"A high‐pitched throat‐clearing reaches a PC’s ears just before he steps on a brownie.",
		"A braying mule approaches the party; it searches for fresh fruits or vegetables to munch on.",
		"A young boy dashes past the party, stops, turns and inquires, “You comin’ to the meetin’?”",
		"The party disturb a housecat hunting a small bird; the cat hisses and runs away.",
		"A tiny dragon‐like creature hovers just within the PCs’ line of sight; it disappears if approached."
	];
	return randomChoice(choices);
};

var WildernessDressingMountainsMinorEvent = function() {
	var choices = [
		"Rising along a rock tor is a series of crudely build houses (a tengu village; DC 11 Knowledge [local] identifies).",
		"A black kite swoops from its perch and lands nearby.",
		"A slow column of smoke rises from a crevasse, 200 yards away.",
		"The sound of bestial crying and warbling is heard; it leads to an abandoned baby bugbear.",
		"Thick fog rolls among the trees covering the mountainside. Visibility is halved.",
		"The bleeding, mutilated bodies of three dwarves are found just off the mountain trail.",
		"In the dead of night, coyotes howl.",
		"The painful cry of an animal breaks the mountain air. A bear is caught in a leg trap.",
		"A trail of scattered raw meat leads into the wooded scrub on the side of the trail.",
		"A DC 15 Survival check reveals a group of orcs passed this way within the hour.",
		"Below a ledge on a jutting rock a golden eagle feeds its young.",
		"A DC 15 Perception check spots, across the valley, signal lights flashing.",
		"The constant “hoot” of an owl breaks the night’s quiet, making sleep a thing of dreams.",
		"A wagon with a smashed rear end has crashed into a large fallen tree.",
		"Three freshly dug graves stand in a shady near the trail.",
		"The sun casts shadows from a rock formation in the pattern of a gated door on a nearby cliff.",
		"A 20‐foot cave opens just above the tree line. Massive bear prints appear in the rocky soil.",
		"A large bird with a 10‐foot wingspan glides over the party (DC 13 Knowledge [nature] identifies as a condor).",
		"Above a rise in the pass circle three large vultures;",
		"A slight trickle of rocks rolls down a nearby cliff face.",
		"Cold, hard rain deluges the party for two hours.",
		"As the PCs reach a high ridge, fog gathers in the valley below.",
		"Just to the side of the trail a bear trap lies in the brush; a bloodied bear foot yet caught within.",
		"The gutted remains of a moose lie strewn about; huge bear prints are evident.",
		"A red‐tailed fox darts across the trail carrying a freshly caught rabbit in it mouth.",
		"An aurora of green and blue colours fills the sky in flashing spectral patterns.",
		"A herd of chinchillas bathes in dust pools among the tumbled rocks.",
		"The body of a mangled orc lies decaying between two boulders.",
		"The temperature drops rapidly as night falls.",
		"Dark clouds roll overhead. 39 A lone antelope grazing on scrub is ambushed by a mountain lion.",
		"The tracks of several snow rabbits are seen in the fresh powder just above the tree line. There are intermingled with larger feline tracks.",
		"Two forlorn, collapsed canvas tents mark the location of an abandoned campsite.",
		"Down the mountainside a fast running stream gurgles over rocks.",
		"A group of six climbers make their way up a cliff face. They are roped together in tandem.",
		"Glistening like a patch of ice, a foot‐long scale rests on the ground. (DC 16 Knowledge [arcana] identities as a silver dragon scale).",
		"The wooden foot bridge spanning the gap of a crevasse looks to be recently demolished.",
		"The moon creates a “red ring” solar eclipse positioned low between two peaks.",
		"Rocks slide away revealing a snake with red, black, yellow, black and red markings. A DC 12 Knowledge (nature) check identifies it as a king snake.",
		"Drag marks of a large object run off the trail into a crack in the mountain face next to the path.",
		"The tracks of a Lynx mar a small dirt patch of bare earth (DC 18 Survival identifies).",
		"An arrow suddenly imbeds itself in a nearby tree.",
		"The sound of chopping wood and the fall of a tree resounds through the mountains.",
		"Just above the foothills of the mountain sits a perfectly good wagon. No horse and no signs of a struggle are evident.",
		"The moon begins passing into the umbra as a lunar eclipse begins.",
		"A hawk circles above watching the party. A DC 15 Knowledge (arcana) identifies it as a blood hawk",
		"Shouts for help ring out from high up a cliff face.",
		"Atop a rocky crag a large nest is home to a winged creature with the head of a wolf and the body of a stag (DC 14 Knowledge [arcana] identities as a peryton).",
		"Upon a dark patch of granite rests a single white scale (DC 12 Knowledge [arcana] identities as a white dragon scale).",
		"An abandoned canoe lies partially covered by branches near the trail.",
		"The stench of smoke fills the mountain air.",
		"The distant sound of slow trotting horses comes from behind the party on the trail.",
		"Movement through the brush and scrub is revealed to be a small herd of mountain goats.",
		"Faint screams come of the party’s ears carried by the wind. They abruptly cease.",
		"The tail of a comet flares in the light of day. It smashes into the half‐dome mountainside.",
		"In the light of the full moon the landscape becomes eerily bright as if it is day time.",
		"A goose falls from the sky with an arrow piercing its neck.",
		"Tree limbs crowd a ledge as big as a house. The nest contains 1d6 large, black eggs (a DC 19 Knowledge [nature] identities them as roc eggs).",
		"56 The bloody remains of several skinned dear litter the ground.",
		"A small patch of ice covered snow holds the tracks of a large creature (a DC 14 Knowledge [nature] identities them as yeti tracks).",
		"A fast running stream has been dammed and the surrounding area is now flooded.",
		"Freshly cut trees lie down slope; several figures stand by a wide slow moving river.",
		"The limestone rock face opens into a crumbling cavern. Rubble covers the ground within, but its recesses are very sheltered.",
		"A lone pine tree stands with four corpses hanging in nooses from its branches.",
		"A five‐foot wide fissure in the rock angles downwards; it is filled with cobwebs.",
		"A herd of wild yaks graze on low scrub grass.",
		"Dark shapes lope through the night sky. A DC 13 Knowledge (planes) identifies them as a pack of hunting yeth hounds.",
		"Ripped and torn cloth is scattered around a small fire pit. Dried blood splatters the rocks nearby and leads off to the east.",
		"Five bear‐skinned, cloaked figures huddle by a campfire near a snow covered rock spire.",
		"A huge ibex stands atop a lone boulder. Massive four‐foot horns curl back from its head.",
		"A large dead tree trunk lies across the trail.",
		"A donkey stands sullenly in the trail. Its cargo toppled over; there is no sign of its owner.",
		"This hunter’s cabin is built into the rock face. A single door in its front, a few rusty bear traps hang to one side.",
		"Frozen bodies poke through the fresh snow. They are completely looted of valuables.",
		"Amongst the pine needles a small pile of scat is found (DC 12 Knowledge [nature] identifies as puma scat).",
		"With a roar of tumbling rock, a landslide engulfs part of the trail the PCs have just used.",
		"Rain falls in torrents and a minor mudslide slides onto the trail.",
		"A gap in the low‐lying gloomy clouds suddenly bathes the mountainside in warm sunlight.",
		"Bird calls echo through the air (a DC 12 Knowledge [nature] reveals them as unnatural).",
		"A four‐foot tall rock wall has been recently built to partially block the mouth to a side ravine.",
		"The thunderous roar of a huge flying creature emanates from the thick cloud above.",
		"In the dry heat of the mountain’s rain shadow the party crunch across a carpet of dead mountain locusts.",
		"The thunder of hooves echoes among the peaks (a stampede of bighorn sheep are storming in the party’s direction).",
		"A severe wind blows up suddenly and blasts the party.",
		"Dead horses, partially eaten, are dumped on a rock slab. A DC 15 Knowledge (local) check reveals cyclops were likely responsible.",
		"The baying of a donkey rolls through the valley from up ahead.",
		"A DC 17 Perception check spots two small snares near a bank festooned with rabbit holes.",
		"Streams of shooting stars fill the night sky.",
		"A signal fire pyre and its dead watchmen lie atop a steep cliff.",
		"A distant horsemen with ice‐crusted armour rides through the snow.",
		"Plush mountain farms checker the valley. Lazy smoke rises from several small yurts.",
		"The loud cracking of rock startles the party awake in the dead of night.",
		"A torrent of sleet and hailstones blast down from the sky.",
		"In the dark of night a high‐pitch squeaking fills the air. (A DC 12 Knowledge [nature] check reveals the likely source to be a bat swarm).",
		"A partially exposed block of ice holds a giant figure trapped within.",
		"High in the mountain pass a makeshift graveyard containing six burial graves and three cairns.",
		"The sound of barking dogs followed by shouts comes from somewhere ahead.",
		"Tiny figures toil upa steep slope far above the party.",
		"Off in the distance, three short horn blasts cut through the still mountain air.",
		"At the foot of a tall rock face lies the broken body of a human climber. Therope against the cliff waves back and forth.",
		"A bushy‐tailed tree squirrel raps a walnut against an oddly shaped rock formation. "
	];
	return randomChoice(choices);
};

var WildernessDressingHillsMinorEvent = function() {
	var choices = [
		"A murder of midnight black ravens erupt from the trees just ahead.",
		"The orange glow of sunrise or sunset silhouettes a group of wolves cresting a hill to the east.",
		"A comet dashes across the night sky.",
		"A distant rumble of thunder rolls toward you; cold wind blows, damp with the scent of rain.",
		"Wind whips the dusty path. PCs must make a DC 15 Reflex save or be blinded for 1d4 rounds.",
		"The crunching of dried leaves and cracking twigs can be heard in the distance.",
		"A stiff breeze blows the scent of smoke through the hills.",
		"At night, the clatter of rocks wakes everyone in camp.",
		"A tangled mass of brush and tree limbs lie at the base of a flat‐topped hill. A DC 20 Perception check reveals the sound of scratching coming from inside the brush.",
		"Desiccated bodies of birds, mice and other small animals hang from a tree’s low branches.",
		"The sun blazes high in the sky; a falcon dives rolling down a hill toward the distant ground in search of prey.",
		"The sound of barking echoes through the hills. It slowly moves away from the party.",
		"A large elk stands at bay in a small glade a short distance away. The hills rise sharply behind it.",
		"Several birds wheel overhead, in full song.",
		"Faint high pitched squeaking in the dead of night heralds the arrival of many bats (DC 10 Knowledge [nature] identifies).",
		"In the middle of conversation with a travelling companion a fly becomes caught in your throat. ",
		"An orc body, three arrows in its back, lies on the trail. A DC 15 Heal check reveals it is less than three hours dead.",
		"A wide s‐shaped track weaves up the hillside.",
		"A large raccoon eyes you menacingly while clutching a small mouse in its paws.",
		"The dark of night is interrupted by flashes of light coming from between two distant hills.",
		"A desultory drizzle begins to fall.",
		"Dusty grey squirrels chatter while chasing one another around a large oak.",
		"An eclipse begins with the sun swallowing the moon. It bathes the hillside in blood red light.",
		"A ram, flanked by two ewes, stands on a low rocky hillside.",
		"A bright blue‐white flash of lightning rends the sky; the sound of splintering rock follows.",
		"The lazy rolling hill pasture is occupied by a dozen fat cows. Neither a shepherd or dog is in attendance. ",
		"From across the rough rolling hillside, a bobbling ball of whitish‐green witch‐light wavers. It moves away from those approaching it.",
		"Deeply set tracks cross the party’s path; a DC 18 Survival check reveals hem to be of six heavily laden goblins that passed by two days ago.",
		"Rotten branches and fallen small trees lie across the trail as it goes up hill.",
		"The faint smell of roasting meat wafts on the breeze, probably from the sliver of smoke floating up from behind the next hill.",
		"A DC 20 Perception check reveals the torn remains of a cleverly hidden net trap anchored to a tall oak.",
		"A DC 20 Perception check reveals a jagged topped stone looks out of place. A deep hollow beneath contains three days of trail rations.",
		"The weed cloaked skeletons of four ogres, their amour and weapons weathered beyond use, lie in a narrow gorge.",
		"A newly cut trail leads downhill towards the sound of running water.",
		"A trickle of mist covers the low‐lying ground between several hills.",
		"The clatter of hooves echoes through the hills, from ahead.",
		"The rocky hillside has crumbled away to reveal a strangely carved opening in the hill. The opening is partially covered by the rock fall.",
		"A sliver of blue fox fire snakes about the hillside before disappearing into the ground.",
		"The rotting corpse of a light warhorse clad in rent barding bakes in the sun.",
		"You hear the distinct sound of a baby rattle coming from the tall grass on the hillside.",
		"The exposed roots of a massive hickory tree grow out of a craggy hill, creatinga protected overhang.",
		"The crack of whips and screams of pain echo through the hills.",
		"The scent of smoke and burning flesh fills the air. To the east, a plume of smoke grows higher.",
		"A gibbous moon hangs above the hills.",
		"Tents of foreign design stand on a hillside.",
		"As the sun reaches its apex the wind whips about with furious gusts. Distant chanting rises in tone.",
		"A set of Large humanoid footprints led over a hill where two voices argue. A DC 16 Knowledge [local] reveals the voices are speaking in Ettin.",
		"This hollow under a hawthorn tree‐covered hillside serves as a worg’s den. A DC 12 Knowledge (arcana) check reveals the identity of the den’s occupants.",
		"Foreboding, dark clouds gather above the hills.",
		"Fallen trees border a recent campsite. A DC 15 Survival check reveals it is three days olds.",
		"A stark, unearthly shriek pierces the air; all other sounds cease and the wind grows in strength.",
		"Positioned in the crook of a tall oak atop a hill rests a severed dwarven head.",
		"The scent of death wafts through the hills. A DC 15 Perception check uncovers a black bear’s hollowed out carcass.",
		"Wild grapes grow among a twisted brier. The briar hides a massive bee hive which unwary explorers may disturb.",
		"DC 18 Perception check reveals a very young wolf lurking behind a thorny bush at the base of the hill. It is emaciated and hungry.",
		"An old, weathered arrow sticks out of the trail.",
		"Strewn about the base of the hill are the looted remains of a campsite.",
		"A DC 15 Survival check reveals several horses passed this way recently.",
		"The ground shakes violently. Characters must make a DC 14 Acrobatics check or fall prone. A DC 10 Knowledge (nature) identifies the phenomenon as a minor earth tremor.",
		"You hear the creaking of cart wheels. Still a few bow shots behind you, shouts can be heard.",
		"Carrion birds circle back and forth above a nearby hill. Investigations reveals the remains of several humans and goblins.",
		"A large pit full of decomposing animals gapes before you. Flies cluster about and the stench of death is heavy in the air.",
		"The trail heads down a difficult, irregular hillside. Characters must make a DC 12 Acrobatics, check to avoid sliding down the hill.",
		"The wind moans through the hills; it grows suddenly colder.",
		"A sudden drop in temperature heralds dark, rain‐laden clouds creeping over the hills",
		"A sudden strong winds sends small pebbles tumbling down a cliff.",
		"Horse tracks and those of a laden cart are evident on the trail. Further on lies a body bloated with disease.",
		"A slow, heavy rain makes the hillsides muddy and slippery.",
		"A large flock of mountain sheep graze silently in the fold between two hills.",
		"A long line of ants snakes across the party’s path.",
		"The warning yip of a fox (DC 10 Knowledge [nature] identifies) comes from a nearby rise.",
		"The bright flash of an explosion bursts from the shadowed side of a steep‐sided hill.",
		"A low rumbling echoes through the hills.",
		"A broken chest lies on its side, on a hillside.",
		"Two sets of clothing, along with other miscellaneous equipment, lies scattered about. ",
		"Four horse riders move across a distant ridge.",
		"The hill rises to a cliff pockmarked with caves.",
		"Spindles of smoke rise from several cave mouths.",
		"On a sheer section of the hillside perches a large nest of small trees, branches and shrubs.",
		"Two broken down covered wagons block the trail. Shouting and banging come from the front wagon.",
		"Vultures circle in the sky a few hills away.",
		"A large stag stands atop a hill. It snorts in the party’s direction.",
		"A ten‐foot deep hole pierces the hill. A block and tackle are set above it.",
		"Large rocks tumble down the hill across the party’s path.",
		"An abandon campsite, several days old, has a map of the local area drawn in the earth. An “X” marks a spot just over a nearby ridge.",
		"Several wolves circle an injured deer. Slowly the circle grows smaller.",
		"A dead body lies face down on the trail. The unfortunate clutches a book in one hand and an empty bowl in the other.",
		"Three heavily laden horses are tied to a large oak stump at the base of a tall bluff.",
		"The stench of brimstone and sulphur waft from cracks in the hill.",
		"Atop a convoluted hill, a single branch on a lone elm tree slowly bobs up and down.",
		"A signpost lies on the ground. It reads 'DREAD' and is written in dried blood.",
		"The sound of sweet music comes from every direction.",
		"A wide swath of mud covers the trail.",
		"Recently made cart tracks from several wagons mar the trail.",
		"Heavy rain lashes the hills; after 2d20 minutes rivulets of water start to wash over the trail.",
		"Smoke issues from a deep rent in a nearby hillside.",
		"Rolling hills drop down to a pristine lake.",
		"The soft earth at the base of a hill barely conceals the opening of a sink hole.",
		"A flock of ducks flies over low overhead. One drops from the sky, pierced by an arrow.",
		"Fireflies flash and blink at the base of a twisted hill.",
		"Suddenly a wall of earth sprouts the length of the opposite hill. Flashes and blasts of light can be seen coming from two battling figures."
	];
	return randomChoice(choices);
};

var WildernessDressingSeaVoyagesMinorEvent = function() {
	var choices = [
		"A crewman tries to steal a small, mundane item from one of the PCs.",
		"A landlubber clings to the main mast. His face is pale white.",
		"The ship's wheel is manned by two burly sailors.",
		"Storage boxes slide about on deck as the ship lists to one side.",
		"An outbreak of dysentery wreaks havoc among the passengers.",
		"A passenger goes great lengths to to keep themselves out of the weather.",
		"The body of a crewman is found stuffed in the bilge. His throat has been slashed. ",
		"Two of the crew, who are identical twins, display full body dragon tattoos.",
		"A passenger who is dressed in aristocratic clothes, but is blind, wanders about the deck followed by a balding manservant.",
		"Several rats scurry among crates of cargo.",
		"A ship’s officer bellows at a crewman and lashes him violently for insubordination.",
		"The call to man the pumps breaks the calm of the noonday sun.",
		"An order is given to “bare the poles!” In dangerously strong winds, sailors scramble to take the sails.",
		"One of the crew deck early in the morning sneaks about (DC 15 Perception spots).",
		"Fluttering to one of the upper deck handrail is a small, emerald‐green and red feathered parrot.",
		"A strange, rotten smell wafts up from the bilge.",
		"After fishing for several hours, three crewmen haul a small squid onboard.",
		"A DC 16 Perception check spots a small bottle marked with a skull and crossbones tucked into a coil of rope",
		"The sun beats down on the deck, baking all in sweltering heat.",
		"Much of the food on board goes bad.",
		"The “Old Man” or captain walks the deck mumbling in a disconcerting tone. The crew whisper in worried tones, behind his back.",
		"A sailor carves a serpent into the handrail of the starboard bow.",
		"As the wind picks up the order to “chock‐a‐block” rings out loud and clear. The sails are pulled tight to the rigging. ",
		"A passenger dies of tuberculosis. Many of the crew avoid the remaining passengers as a result.",
		"Two very rough‐looking passengers play mumble peg with a large kitchen knife.",
		"Two crewmen begin to argue. A fight soon breaks out.",
		"Children are entertained by the comedy antics of a passenger.",
		"A sudden freak wave heaves a wash of water across the deck. Characters must make a DC 15 Acrobatics check or be knocked into the ship’s rail.",
		"A female passenger is seen talking intently, but quietly, with the ship's captain.",
		"The PCs’ clothes become infested with fleas.",
		"A DC 15 Perception check reveals the portside handrail has been sawn through in several spots.",
		"Several sailors are making scrimshaws out of whale teeth.",
		"No wind blows for the whole day; the ship is becalmed.",
		"Crewmen are moving barrels of rum above‐board to amidships. The captain stands atop a small crate supervisin.",
		"At midday, a thin man in loose robes plays a strange flute to a large cobra as it sways back and forth.",
		"A DC 16 Perception check reveals several of the crew have deep, pink scars on both sides of their neck.",
		"A fellow passenger asks for help in persuading the captain to change course to a nearby island.",
		"During a storm, lightning strikes the mainmast setting it ablaze.",
		"A DC 15 Perception check reveals a rope tied low, out‐of‐place, on the handrail next to the mast.",
		"Below decks, it is particular hot and fetid. The crew are in a bad mood and many have taken to sleeping on deck.",
		"One of the crew invites a gullible‐looking PC to a dice game later that day.",
		"Just by a sailor’s actions the PCs can tell he “doesn’t have both oars in the water.”",
		"Some of the crew and passengers develop bad coughs, overnight.",
		"In the morning, a bloody hex mark is found on the captain’s cabin door.",
		"A group of seagulls assails several crewmen as they climb the mizzenmast.",
		"The damp air has made the ship's deck very slippery; movement is halved.",
		"The wind carries away the sheet music of a bard practising his craft on deck. The sheets are marked with arcane marks.",
		"Dark mutterings of discontent circulate among the crew.",
		"A knot of crewmen on the poop deck argue heatedly with the captain.",
		"A drunken trader bumps into a PC, and then accuses them of thievery.",
		"It is too hot and smelly to sleep below deck.",
		"Each day at noon, the crew salute the quarterdeck where a small altar is kept.",
		"Worms and grubs are discovered to have infested some of the food.",
		"A weather‐worn sailor blocks a PC’s descent through the companion way.",
		"A zigzag hex mark is found burnt into the main hold’s door.",
		"At sunset, the crew play musical instruments and sing shanties while working.",
		"Suddenly the helmsman yells as the wheel spins free.",
		"One sailor offers to pierce a PC’s ears for good luck on the trip.",
		"Just before dawn, a ghostly shape is seen near the masthead.",
		"The sounds of shifting rock come from the ballast hold.",
		"The crew whisper among themselves about an unmarked crate below deck.",
		"The last full water barrel is brought up carefully from below. ",
		"Several of the crew start suffering from scurvy.",
		"A step gives way as a PC descends a ladder (1d6 damage; DC 20 Reflex negates).",
		"As the ship comes about to catch the wind, a yard‐arm snaps under the stress.",
		"Crewmen begin setting out buckets of sand. The ship is heading into pirate waters, and the captain wants to be prepared.",
		"The crew swab the deck.",
		"Many of the passengers are obviously new to sailing and suffer from violent sea sickness.",
		"A DC 15 Perception check reveals a cloaked figure sneaking through the hold.",
		"During heavy winds, many of the ropes tying a sail down come loose. One strikes a nearby passenger knocking them unconscious.",
		"The crew gather expectantly on deck in preparation for pay day.",
		"Several crewman are lowered over the side in boatswain chairs to paint the hull. ",
		"Several crewmen are playing cards and laughing loudly.",
		"A DC 16 Perception check spots a trail of wide, wet footprints leading away from a porthole.",
		"One passenger is a tradesman and approaches the party, attempting to sell his wares. He is extremely persistent.",
		"A crewman asks a PC if he fancies a spot of fishing in one of the ship’s longboats.",
		"A group of sailors gather suspiciously near the gig.The captain’s personal boat is the centre of attention.",
		"Wild yarns are spun as the sailors gather for the evening meal.",
		"The muffled sound of dice rolling can be heard from behind a stack of crates.",
		"A sudden squall soaks everyone on deck.",
		"All the ship’s lanterns flam suddenly turn the green colour of baleful witch fire.",
		"The body of one of the ship's riggers is found dead. Ring‐like markings cover his neck.",
		"Anaccidental fire breaks out on deck.",
		"Several of the crew take great steps to avoid the party, for no apparent reason.",
		"A DC 17 Perception check reveals the ropes connected to the capstan are dangerously frayed.",
		"A cold northern wind blows across the ship.",
		"The ship’s galley seems oddly quietright before meal time.",
		"The sound of gathering sea gulls wakes the PCs as dawn breaks.",
		"A few sailors exchange small pucks of chewing tobacco covertly.",
		"A crewman is wearing his clothes inside out. If asked why, he states he is warding off the bad luck that has been plaguing him.",
		"The captain bursts from his cabin and shouts his astrolabe and other navigational tools have been stolen.",
		"The foremast looks as if the rigging has been sabotaged.",
		"A sailor falls from the upper rigging into the sea.",
		"The ship’s compass spins wildly and points in random directions.",
		"A sudden strong wind blows up, increasing the ship’s speed by half.",
		"On a night with no moon the eyes of the catheads to either side of the figurehead glow light blue.",
		"The ship yaws back and forth between large waves. Characters must make a DC 14 Fortitude save or become seasick.",
		"As the crew perform maintenance they discover extensive rotting in the hull.",
		"Several sailors grumble under their breath as they swab the deck.",
		"As the ship settles for the night a spectral, human outline is seen looking into the distance from the starboard bow."
	];
	return randomChoice(choices);
};

var WildernessDressingCoastMinorEvent = function() {
	var choices = [
		"A massive flock of seagulls stand on the beach. If disturbed by sudden noise or movement, the flock takes flight, providing creatures with total concealment for three rounds.",
		"Burrowing out of the beach and flopping across the sand are hundreds of tiny, newborn turtles. A cloud of gulls, terns, sea eagles and hawks wheel about, plucking up the stragglers before they can reach the protective waves.",
		"2d4 bedraggled shipwreck survivors haul their small keelboat up onto the beach. Their original vessel ran aground on an unmarked reef two days ago. The crew now glares at the one midshipman who suggested they resort to cannibalism six hours into the journey.",
		"A pack of 2d6 wreckers (NE human commoner 1) lead a train of mules, each with lanterns hung about their necks, slowly up the beach to fool mariners into believing the slow‐moving lights are ships. If confronted, they flee.",
		"A flock of frigate birds are circling a pool of fresh water. Every 1d6 rounds a bird swoops over the water to drink before rising back up into the air.",
		"Two small grey nurse sharks are feeding on a school of whiting in the still shallows.",
		"A short jetty juts into this sheltered harbour. Stevedores load a small trading cog with bales of cotton.",
		"Swarms of bluebottles float in the water and lie trapped on the beach. A creature touching the poisonous tentacles of the jellyfish with its bare skin must make a DC 13 Fortitude saving throw or take 1d2 Dexterity damage.",
		"A small skiff draws up to the beach and disgorges 2d4 smugglers (N human rogue 2; Stealth +6). The smugglers attempt to remain undetected as they carry off their chests of valuables (worth 500 gp) to avoid local taxation.",
		"Two hundred feet from shore swim a pod of 2d4 whales. The whales breach every 3d6 minutes, and follow any ships they encounter for one hour.",
		"A small skiff draws up to the beach and disgorges 2d4 smugglers (N human rogue 2; Stealth +6). They are trafficking human cargo. These wretches may be slaves, enemies of the crown or other ne’er‐do‐wells who wish to avoid scrutiny.",
		"One hundred feet from shore swims a pod of 2d6 dolphins. The dolphins use aid another actions to help obviously distressed swimmers.",
		"Two large fish collide head‐on with one another under the clear water.",
		"This section of shoreline littered with shallow rock pools. There is a 5% chance per pool investigated that the PCs encounter a venomous blue‐ringed octopus. PCs handling the creature develop a nasty rash that lasts for 1 day (or until cured).",
		"A dog‐sized crayfish swims in a shallow rock pool, clawing at clumps of seaweed.",
		"A school of colourful fish scoot about the shallows. A live specimen would fetch 5 gp from the right buyer.",
		"A pair of sea eagles swoop into the ocean and come up with fish in their talons.",
		"A 200‐foot tall sand dune rises in front of the party, requiring DC 10 Climb checks to traverse. A PC failing this check by 5 or more slides all the way to the bottom of the dune. 9 At dusk, 3d20 fairy penguins waddle up the beach in groups of 2d4 creatures at a time.",
		"The oily, stinking remains of an aboleth lie on the beach. The creature can be identified with a DC 20 Knowledge (dungeoneering) check. 2d6 doses of mucus can be harvested from the corpse which imitates its mucus cloud ability. If not used within two days, the mucus becomes inert.",
		"A strong gust of wind throws stinging sand and salty sea spray at the PCs. Every creature on the beach must make a DC 12 Reflex saving throw every minute or be blinded for 1 round.",
		"The broken spars and shredded sails of a large ship bob sedately in the surf. The bloated corpse of a seaman is lashed to a piece of mast.",
		"Out of the nearby sand swarms thousands of hand‐sized red crabs. The crabs languidly scuttle down to the water’s edge to lay eggs before returning to land one hour later.",
		"Several dozen families of sea lions form a rookery on the rocky coastline. If the sea lion are disturbed, they rear up threateningly. Sea lions use the statistics of wolves with a base speed of 10 feet and a swim speed of 50 feet. 12",
		"A 60‐foot wide volcanic lava‐flow meets the sea here, throwing up a plume a boiling‐hot steam which obscures sight as a 120‐foot wide fog cloud.",
		"A coconut falls on a PC’s head, inflicting 1d6 damage (DC 13 Reflex negates).",
		"Three boasting fishermen stand on the rocks here with their sizable catch. The fishermen are willing to part with their fish for 5 sp.",
		"A tiny peasant girl clambers down a cliff face to collect sea bird’s eggs from their nests.",
		"A pelican flies laboriously past, wrestling with a small shark in its bulging beak. 52 A freak wave churns out of the sea to knock the PCs prone (CMB +15).",
		"A fishing rod ensorcelled with animate object repetitively casts itself into the ocean. A staggering pile of fish bones lies beside the rod.",
		"A very wet and thoroughly miserable‐looking dog trots along the beach.",
		"A legless zombie draws itself slowly out of the pounding surf.",
		"A polar bear forlornly stands on a passing, drifting ice floe.",
		"A swarm of bats bursts from a nearby sea cave, into the sky.",
		"A beautifully ringed sea snake undulates through the water.",
		"A faint keening rises over the sound of the waves, reaching a crescendo as the waves break against the shore.",
		"A flock of cormorants circle a school of fish, plunging into the ocean over and over again to collect their prey.",
		"Three salt water crocodiles sun themselves on the beach.",
		"A small octopus coils itself around a rusted spyglass in a shallow rock pool.",
		"A raucous sea gull follows the party as they travel, screeching loudly at every opportunity. Any attempt to drive off the bird only draws the attention of two others.",
		"Three tiny water elementals slither on the beach, touch a lonesome rock at the edge of the high tide mark before rushing back into the water.",
		"A bright blue crab emerges from the sand before spotting the PCs and hurriedly burying itself.",
		"The setting sun reflects off the rippling ocean surface, dazzling creatures on the beach (DC 11 Reflex negates).",
		"A crippled fluffy eaglet limps along the beach, its wing broken.",
		"A hermit crab leaves its shell and tries to walk away inside one of the PC’s belongings (helmet, boot, spell component pouch etc.)",
		"A small fishing boat’s crew are wrestling with a mako shark. Their shouts and screams echo across the beach.",
		"Three local halfling children are swimming easily in the quiet ocean.",
		"A burlap sack lies on the beach. It is home to a colony of honey ants.",
		"A small wyrmling bronze dragon wheels over the sea cliffs, swooping on a tern’s nest and carrying off its eggs.",
		"Four iguanas leap from the nearby cliffs into the frothing sea below.",
		"One of the PCs stands on a rotting fish carcass. A creature using scent can detect the PC at three times the normal distance.",
		"A cavernous shipwreck lies on the beach. Investigating the wreck causes it to collapse (3d6 damage; DC 15 Reflex halves).",
		"A small iron pot sits over a glowing campfire. The pot contains a delicious fish stew. The stew is warming and incredibly nourishing.",
		"Nine sets of footprints trail up the beach. If a PC steps on one, he immediately sinks up to his hips in the sand.",
		"The name of one of the PCs is scrawled into the sand. If the PCs erase or otherwise tamper with the writing, it redraws itself after 1 round.",
		"Two wooden grave markers are hammered into the beach. A skeletal arm looks to have burst from the sandy grave, but is now inanimate.",
		"A silhouette of a tiger shark can be seen lurking amid the breaking surf.",
		"An orca suddenly breaches the waves like a battering ram, snatching a baby seal from the stony beach before writhing back into the surf.",
		"A ghostly orange phosphorescence shimmers on the surface of the rippling ocean. Suddenly the glow coalesces into a single point of light before shooting off towards the distant stars.",
		"An obese merman gorges on the contents of a lobster trap, burps loudly and swims slowly away.",
		"A trio of sirens recline on a granite spur in the distance. A PC making a DC 20 Perception check overhears the following snippet of conversation “…what a motley lot. It’s not worth the effort to lure them over here.”",
		"Something beneath the water cleanly severs the sounding rope as the PC’s ship navigates a treacherous shoal.",
		"The fresh, blustering wind suddenly ceases, and the PCs are becalmed for 1d6x10 minutes. 64",
		"A local daredevil leaps from a 70‐foot high cliff, plunging into the ocean below. Rising from the depths, the diver gives the PCs a friendly wave before swimming back to shore and climbing the cliff.",
		"A scraggly albatross sails over the PCs, letting loose a tremendous screech before wheeling away over the ocean.",
		"A floating sea chest washes up on shore momentarily before being washed out to sea again. A DC 20 Swim check recovers the chest which contains a selection of waterlogged women’s clothes.",
		"A 40‐foot high column of stone succumbs to the elements and slides into the sea with a deafening crash. A few moments later, a large wave crashes into the shore.",
		"A PC catches a foot in a crab trap (CMD 11). Several crabs are also caught within.",
		"A flying fish hurtles from the water and strikes a PC in the stomach, inflicting 1 damage. The fish flaps forlornly at the party’s feet.",
		"A giant clam, revealed by the low ring tide, spurts a jet of water 20 feet into the air.",
		"Bleached driftwood is arranged into the sigil of some dark power. Any PC disturbing the symbol is subject to bestow curse (DC 15 Will negates). If the PCs cast hallow or consecrate on the area after dismantling the wood, they receive a +2 enhancement bonus to Wisdom for 24 hours.",
		"The silhouette of a sea‐hawk carrying a thrashing fish can be seen in the distance. A DC 25 Perception check reveals the figures are much further away than previously imagined – and are actually an enormous roc carrying off a huge shark.",
		"A robber crab is slowly tearing open a green coconut, balanced precariously on a palm trunk.",
		"The PC is tripped by a fishing net buried in the sand. The net is old and ripped; it has obviously buried for a long time.",
		"The last 10 feet of cliff edge collapses into the churning sea. Spray and debris are hurled into the air before crashing down into the water.",
		"A 70‐foot square section of the surf has been lowered under the effects of control water, revealing the rocky sea floor. The spell has 2 minutes of duration remaining.",
		"An empty ghost ship follows the PCs as they travel along the shore, the wind mysteriously changing direction to push the vessel’s tattered sails in the same direction as the party are travelling.",
		"A small, 10‐foot diameter floating slick of whale oil is blazing merrily just beyond the breakers.",
		"A swarm of biting sand flies descend on the party. Each PC must make a DC 11 Fortitude saving throw or take a ‐1 penalty on attack rolls, saving throws and skill checks for 1 hour as the distracting itchy red welts blossom.",
		"A collection of 3d8 emptied severed heads floats in the surf. They are bloated; fish have nibbled at them and all have looks of stark terror etched upon their faces.",
		"A collection of 3d8 emptied severed heads floats in the surf. They are bloated; fish have nibbled at them and all have looks of stark terror etched upon their faces. The eyes have been removed, and tallow candles lit in the vacant cranium. Somehow, the candles have remained lit.",
		"A beam of light suddenly pierces the darkness from a distant lighthouse, tracking the PCs for ten minutes before darkening again. If the PCs approach the lighthouse, only a decrepit ruin stands on the headland.",
		"The PCs’ footprints in this section of beach turn black on the white sand.",
		"Thousands of awakened limpets leap and tumble from rock‐to‐rock, freezing whenever the PCs watch them.",
		"Some large creature burrows beneath the sand and pebbles on the beach, its body deforming the surface to leave a long hillock.",
		"A swarm of 2d100 seagulls surround the party, seemingly oblivious to any danger.",
		"A human fisherman works within a rickety shack, gutting his recent haul of fish, and throwing the entrails into the ocean for the circling sharks.",
		"A merfolk hunter works within this ramshackle, submerged coral outcrop, gutting his recent brace of coneys, and throwing the entrails onto the beach for the waiting pack of wolves.",
		"Several hundred feet up the beach, a whole crew of rotting undead seamen shamble out of the ions have disappeared water and into the nearby forest. When the PCs investigate, the apparit amid the darkened trees.",
		"A small gnomish child is flying a complicated kite from the cliff edge. She shrieks with excitemen as the kite dives and wheels in the wind.",
		"A lightning bolt strikes a tree upon the headland dead ahead, starting a small brush fire. The tree burns for hours.",
		"A rolling thunderstorm generates a bright blue cascade of St Elmo’s fire across the piers of a rotting abandoned wooden jetty. The jetty is unstable and collapses if a Medium or larger creature weighing over 200 lbs. steps upon it.",
		"A foreign ship sails along the coastline on a voyage of exploration. There is a 10% chance the ship is of extraplanar nature.",
		"A small whale, impaled with three harpoons lies labouring on the beach. It is not dead, but is in considerable pain.",
		"A small pack of fur seals surrounds the PCs, nuzzling them with their wet noses. They are not hostile.",
		"Chalk miners carve away chunks of the towering white cliffs. A pile of rubble lies at the foot of the cliffs. PCs walking under where they are working are at danger of being hit by falling debris.",
		"An imperious whale shark swims slowly parallel to the coastline.",
		"A sulphurous smell emanates from the sea, causing any creatures within 60 feet to be sickened (DC 13 Fortitude negates).",
		"The wet clinging mud of the flats holds fast the feet of any travellers crossing it. To move, a creature must first escape the mud’s grapple (CMD 15)."
	];
	return randomChoice(choices);
};

var WildernessDressingFrozenLandsMinorEvent = function() {
	var choices = [
		"Lemmings gather on the shore of a partially frozen river. Little bigger than a hamster, their brown and yellowish hair appears oily.",
		"The body of a recently killed caribou lies on the snow. No hunter is in sight.",
		"Clouds of snow glide swiftly down a mountainside. The distant rumble of an avalanche reaches the party’s ears.",
		"A caravan train of dog sleds glide across a snow covered plain in the middle distance.",
		"Five sets of cross‐country ski tracks head off to the east.",
		"Columns of sunlight shine through clouds highlighting the broken roofs of an abandoned snow drenched village.",
		"Smoke slowly rises ment of five large canvass tents in the lee of a nearby hill.",
		"from the encamp",
		"No clouds mar the sky and the sun blazes down creating some localised melting of snow and ice.",
		"A huge, frozen bloodstain mars the ice.",
		"Caribou gather in a herd 400 strong to feed on light scrub grass poking through the snow.",
		"Two whaling ships and their crew are cleaning their catch off shore; red waves lap the shore.",
		"Ice crystals floating in the air cause halo rings around the moon.",
		"Suddenly a snowstorm strikes; it drops up to five feet of snow in one hour.",
		"The trumpeting of sea lions basking on a nearby startles the party awake in the morning.",
		"While chewing on grass shoots, three small pikas watch you from atop a small boulder.",
		"The ground vibrates and shakes. Fissures and cracks form in the ice, but do not become large enough to swallow an explorer.",
		"A group of 15 walruses sun themselves on a rocky beach.",
		"A towering, lone thunderhead shaped like a castle slowly moves southward.",
		"A family of mastodons – one male, a female and a smaller young female – move across the snow covered valley floor.",
		"Arctic hares, their plump white fur bodies topped by black tipped ears, chase one another through deep snow.",
		"The wind moans like the disembodied voices of those who have died in the snow.",
		"Parliaments of horned owls “hoot” from the few trees bordering the tundra.",
		"Dusk comes early this day.",
		"Great gouges in the snow show where two young white dragons wallowed (DC 16 Knowledge [arcana] identifies the creatures).",
		"A lone arctic fox zigzags behind the group. Its brown tipped white fur waves in the breeze as it darts about.",
		"The naked, frozen corpse of a human male lies in the snow.",
		"A pack (1d6+5) of huge white wolves (DC 15Knowledge [arcana] identifies) moves across a nearby ridge.",
		"The journey is taking its toll on edible rations and supplies; unprotected rations are frozen solid.",
		"Four dwarves pulling handcarts trek across the frosted plain.",
		"Several gangs of elk form a migratory herd moving across the snow‐covered field.",
		"A snow trench looks a little too unnatural (DC 27 Knowledge [arcana] identifies it as the track of an ice linnorm).",
		"Three fur‐clad thugs rummage through a dog sled. Human and animal remains surround the scene.",
		"With the sun just above the horizon the sky turns into stripes of sea green.",
		"Dark clouds block out the sun.",
		"Fourteen tundra swans glide atop the freezing cold water of a lake.",
		"Huddled by a dead fire sit four figures. (DC 14 Knowledge [religion] identifies as frost wights).",
		"The remains of an ancient battle between form a radial pattern (DC 20 Perception spots). The eight peaked roofs of snow trench shelters humans and orcs peak through the snow.",
		"Screaming from the heavens, a meteor strikes the ground just over the horizon.",
		"An unkindness of arctic ravens gathers for a feast of carrion in the snow.",
		"Melt water bursts from fissures in an ice wall. Characters failing a DC 14 Reflex are drenched.",
		"Crude, guttural yelps carry on the gusty snow‐filled wind (DC 19 Knowledge [nature] identifies them as the call of a yeti).",
		"Massive chunks of ice fly through the air; two young frost giants are having a hurling contest.",
		"The glaring sun blinds the characters (DC 15 Fortitude negates; duration 1d6 hours).",
		"A pod of whales gather offshore in the open water. About 30 feet long; their purplish grey skin shines in the sun.",
		"Two frost giants (DC 14 Knowledge [local] identifies) feed on a mastodon’s carcass.",
		"The temperature suddenly drops to ‐20 (extreme cold); characters suffer 1d6 lethal damage and must make a DC 15 (+1 per previous check) Fortitude every minute or suffer 1d4 nonlethal damage. The cold snaps lasts 10 minutes.",
		"Late one night, the howling of wolves is heard in the distance.",
		"A small thatch hovel surrounded by a flowering garden stands alone. Snow drifts surround it.",
		"Three heavenly bodies align; a swirling mass of spectral blue and red forms an upright disk above the snow.",
		"A huge arrow has been drawn in the snow. It points in the direction of the party’s travel.",
		"Three igloos flanked by racks of freeze drying meat come into view around a hill.",
		"A mile‐wide spectral green aura borealis lights up the sky.",
		"A group of igloos set just below a ridge capped with ice appear abandoned; one has partly collapsed.",
		"Three frozen trees stand atop a high, icy hill.",
		"Emperor penguins gather on an ice flow; their tall tuxedoed bodies cluster in a tight clutch.",
		"Ice blue flame licks across the ice",
		"As darkness falls the immense expanse of the star‐filled sky stretches from horizon to horizon.",
		"Growing from the frozen taiga, a large hawthorn tree (a treant; DC 18 Knowledge [nature] identifies) shakes snow‐covered branches.",
		"An empty dogsled pulled by a pack of thick furred huskies approaches the party.",
		"Just below the ice salmon swim to the ocean.",
		"The shard of a broken disk juts from the snow; arcane runes adorn its surface.",
		"A near perfect hole is cut into the thick ice wall; A DC 22 Knowledge (arcana) identifies this as a remorhaz hole.",
		"Hoarfrost forms on every surface following a light, misty rain.",
		"Blowing ice and snow reduce movement by half.",
		"A sudden, savage wind chills the party.",
		"Exposed metal has become so cold that touching it with bare flesh causes it to become stuck.",
		"A deep patch of slush snow (treat as quicksand) lies ahead (DC 15 Survival identifies).",
		"The sounds of reverberating cracking signals the breaking of ice ahead.",
		"A frozen hand protrudes from the snow.",
		"The shores of a thawed river are covered in buzzing black flies.",
		"A wagon with no horse rolls lies forlornly on its side in the snow.",
		"Four ice climbers ascend towards a dark cave opening.",
		"A flurry of “St Elmo’s fire” passes though the party’s campsite.",
		"Five frozen bodies are found huddled next to a low rocky rise.",
		"The blank snow plain causes disorientation; +5 to the DC of Survival checks made to not get lost.",
		"Eight humans stand frozen in place as if in flight from some attacking creature.",
		"A single raven soars overhead.",
		"Seals poke their heads through holes in the ice. Some pop onto the ice and watch the party.",
		"A small tribe of mountain goats scramble up a steep cliff 30 feet above the party.",
		"The snowy plane is actually an ice covered lake (DC 15 Perception reveals). Encumbered characters have 1 in 4 chance of breaking through.",
		"The broken body of a penguin lies in the snow.",
		"Fur‐clad barbarians are sacking a small fishing village in the distance.",
		"When mirages appear that would be reflected in the snow, they appear to move across the sky.",
		"Two polar bears emerge from the open water onto an ice flow.",
		"At high noon a group of five oval‐shaped, ice mirrors appear out of the swirling snow.",
		"A low breeze blows snow into a mist; the party are but shadowy figures within.",
		"Snow squall: winds are strong and visibility is reduced by 50%; condition is sporadic and lasts  up to 30 minutes.",
		"The wind blows small whirling columns of snow about randomly.",
		"Toboggans race downhill carrying blue skinned goblins. They brandish weapons of bone.",
		"Three longswords crossed by daggers stand as headstones for low rock piles.",
		"An eight‐foot long, cylindrical snow boulder rolls across an open snow field. It slowly comes to a halt nearby the party.",
		"The pole star winks out and does not return for 1d4 hours.",
		"The characters’ breath forms crystals; the light creates rainbow like patterns.",
		"Set on the stony shore is a small cabin whose roof is made from an overturned long boat.",
		"Groups of natives glide across the open water in sealskin kayaks.",
		"A large ice slab floats by with stranded human explorers on board; they shout for help.",
		"Nine light blue skinned elven travellers gather by an overturned sled.",
		"All‐day long the sun appears to be transfixed with a large cross.",
		"Brown and white sandpipers gather during their migration. Their sharp calls cut through the air."
	];
	return randomChoice(choices);
};

var RandomTreasureHoard = function(cr, useDefault) {
	if (useDefault) {
		return GetDefaultTreasureHoard(cr);
	} else {
		return GetTreasureHoard(cr);
	}
};

var GetDefaultTreasureHoard = function(cr) {
	if (cr <= 4) {
		return HoardTreasureLowCR();
	} else if (cr <= 10) {
		return HoardTreasureMediumCR();
	} else if (cr <= 16) {
		return HoardTreasureHighCR();
	} else {
		return HoardTreasureImpossibleCR();
	}
};

var GetTreasureHoard = function(cr) {
	var items = [];
	var i;
	var item;
	var totalValue = 0;
	for (i=0; i<(Roll(2,12)+Roll(2,8))/4-3; i++) {
		item = chooseRandomItem("Mundane");
		totalValue += GetValue(item);
		items.push(formatItem(item));
	}
	for (i=0; i<(Roll(4,12)+Roll(4,8))/8-Math.floor(Math.max(5-cr/5,3)); i++) {
		item = chooseRandomItem("Common");
		totalValue += GetValue(item);
		items.push(formatItem(item));
	}
	for (i=0; i<(Roll(4,12)+Roll(4,8))/8-Math.max(Math.floor(6-cr/5),3); i++) {
		item = chooseRandomItem("Uncommon");
		totalValue += GetValue(item);
		items.push(formatItem(item));
	}
	for (i=0; i<(Roll(6,12)+Roll(6,8))/10-Roll(4,6)+Math.floor(cr/2.5); i++) {
		item = chooseRandomItem("Rare");
		totalValue += GetValue(item);
		items.push(formatItem(item));
	}
	for (i=0; i<(Roll(6,12)+Roll(6,8))/Roll(3,8)-17+Math.floor(cr/2); i++) {
		item = chooseRandomItem("Very Rare");
		totalValue += GetValue(item);
		items.push(formatItem(item));
	}
	for (i=0; i<(Roll(8,12)+Roll(8,8))/Roll(3,8)-22+Math.floor((cr/2)); i++) {
		item = chooseRandomItem("Legendary");
		totalValue += GetValue(item);
		items.push(formatItem(item));
	}
	var cp = 0;
	var sp = 0;
	var ep = 0;
	var gp = 0;
	var pp = 0;
	if (cr <= 4) {
		cp += Roll(6,6)*100;
		sp += Roll(3,6)*100;
		ep += 0;
		gp += Roll(2,6)*10;
		pp += 0;
	} else if (cr <= 10) {
		cp += Roll(2,6)*100;
		sp += Roll(2,6)*1000;
		ep += 0;
		gp += Roll(6,6)*100;
		pp += Roll(3,6)*10;
	} else if (cr <= 16) {
		cp += 0;
		sp += 0;
		ep += 0;
		gp += Roll(4,6)*1000;
		pp += Roll(5,6)*100;
	} else {
		cp += 0;
		sp += 0;
		ep += 0;
		gp += Roll(12,6)*1000;
		pp += Roll(8,6)*1000;
	}
	totalValue += cp/100 + sp/10 + ep/2 + gp + pp*10;
	goalValue = 100*Math.pow(cr+1, 2.3) * ((Math.random()*0.5)+0.6);
	goalValue = Math.round(goalValue*100)/100;
	goalValue -= totalValue;
	while (goalValue > 0) {
		var rand = Math.random();
		if (goalValue > 10) {
			if (rand > 0.5) {
				pp++;
				goalValue -= 10;
				totalValue += 10;
			} else if (rand > 0.75) {
				gp++;
				goalValue -= 1;
				totalValue += 1;
			} else if (rand > 0.87) {
				ep++;
				goalValue -= 0.5;
				totalValue += 0.5;
			} else if (rand > 0.96) {
				sp++;
				goalValue -= 0.1;
				totalValue += 0.1;
			} else {
				cp++;
				goalValue -= 0.01;
				totalValue += 0.01;
			}
		} else if (goalValue > 1) {
			if (rand > 0.6) {
				gp++;
				goalValue -= 1;
				totalValue += 1;
			} else if (rand > 0.77) {
				ep++;
				goalValue -= 0.5;
				totalValue += 0.5;
			} else if (rand > 0.93) {
				sp++;
				goalValue -= 0.1;
				totalValue += 0.1;
			} else {
				cp++;
				goalValue -= 0.01;
				totalValue += 0.01;
			}
		} else if (goalValue > 0.1) {
			if (goalValue > 0.5 && rand < 0.4) {
				ep++;
				goalValue -= .5;
				totalValue += .5;
			} else {
				if (rand < 0.5) {
					sp++;
					goalValue -= 0.1;
					totalValue += 0.1;
				} else {
					cp++;
					goalValue -= 0.01;
					totalValue += 0.01;
				}
			}
		} else {
			cp++;
			goalValue -= 0.01;
			totalValue += 0.01;
		}
	}
	var ret = "Total Value: " + Math.round(totalValue*100)/100 + " gp<ul><li>";
	if (pp > 0) {
		ret += pp + " pp";
	}
	if (gp > 0) {
		if (!ret.endsWith("<li>")) {
			ret += ", ";
		}
		ret += gp + " gp";
	}
	if (ep > 0) {
		if (!ret.endsWith("<li>")) {
			ret += ", ";
		}
		ret += ep + " ep";
	}
	if (sp > 0) {
		if (!ret.endsWith("<li>")) {
			ret += ", ";
		}
		ret += sp + " sp";
	}
	if (cp > 0) {
		if (!ret.endsWith("<li>")) {
			ret += ", ";
		}
		ret += cp + " cp";
	}
	return ret + "</li><li>" + items.join("</li><li>") + "</li></ul>";
};

var chooseRandomItem = function(rarity) {
	var item = randomChoice(items[rarity]);
	return item;
};

var formatItem = function(item) {
	var s = "";
	s += "<b>" + item.Name + ".</b>";
	if (item.Description && item.Description !== "" && item.Description.toLowerCase() !== 'n/a') {
		s += " " + item.Description;
	}
	if (item.Rarity && item.Rarity !== "" && item.Rarity.toLowerCase() !== 'n/a') {
		s += "</br><i>Rarity: </i>" + item.Rarity;
	}
	if (item["Est. Value"] && item["Est. Value"] !== "" && item["Est. Value"].toLowerCase() !== 'n/a') {
		s += "</br><i>Estimated Value: </i>" + item["Est. Value"];
	}
	if (item.Weight && item.Weight !== "" && item.Weight.toLowerCase() !== 'n/a') {
		s += "</br><i>Weight: </i>" + item.Weight;
	}
	if (item.Properties && item.Properties !== "" && item.Properties.toLowerCase() !== 'n/a') {
		s += "</br><i>Properties: </i>" + item.Properties;
	}
	if (item.Requirements && item.Requirements !== "" && item.Requirements.toLowerCase() !== 'n/a') {
		s += "</br><i>Requirements: </i>" + item.Requirements;
	}
	return s;
};

var GetValue = function(item) {
	var value = 0;
	v = item["Est. Value"];
	if (v) {
		var re = /([0-9\.]+)/;
		value = parseFloat(re.exec(v.replace(",",""))[0]);
	} else {
		switch (item.Rarity) {
		case "Mundane":
			value = Roll(1,50);
			break;
		case "Common":
			value = Roll(1, 150);
			break;
		case "Uncommon":
			value = Roll(1, 400) + 100;
			break;
		case "Rare":
			value = Roll(1, 4500) + 500;
			break;
		case "Very Rare":
			value = Roll(1, 45000) + 5000;
			break;
		case "Legendary":
			value = Roll(1, 50000) + 50000;
			break;
		}
	}
	return value;
};

var ArmorForTableI = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 10);
		if (rand <= 2) {
			items.push('Armor, +3 Studded Leather');
		} else if (rand <= 4) {
			items.push('Armor, +2 Half Plate');
		} else if (rand <= 6) {
			items.push('Armor, +3 Breastplate');
		} else if (rand <= 8) {
			items.push('Armor, +3 Splint Plate');
		} else if (rand <= 9) {
			items.push('Armor, +3 Half Plate');
		} else {
			items.push('Armor, +3 Plate');
		}
	}
	return items.join('</li><li>');
};

var Art2500gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 10);
		if (rand <= 1) {
			items.push('Old masterpiece painting (2500gp)');
		} else if (rand <= 2) {
			items.push('Embroidered glove set with jewel chips (2500gp)');
		} else if (rand <= 3) {
			items.push('Platinum bracelet set with a sapphire (2500gp)');
		} else if (rand <= 4) {
			items.push('Fine gold chain set with a fire opal (2500gp)');
		} else if (rand <= 5) {
			items.push('Gold music box (2500gp)');
		} else if (rand <= 6) {
			items.push('Eye patch with a mock eye set in blue sapphire and moonstone (2500gp)');
		} else if (rand <= 7) {
			items.push('A necklace string of small pink pearls (2500gp)');
		} else if (rand <= 8) {
			items.push('Gold circlet set with four aquamarines (2500gp)');
		} else if (rand <= 9) {
			items.push('Embroidered silk and velvet mantle set with numerous moonstones (2500gp)');
		} else {
			items.push('jeweled anklet (2500gp)');
		}
	}
	return items.join('</li><li>');
};

var Art250gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 10);
		if (rand <= 1) {
			items.push('Carved ivory statuette (250gp)');
		} else if (rand <= 2) {
			items.push('Large well-made tapestry (250gp)');
		} else if (rand <= 3) {
			items.push('Gold bird cage with electrum filigree (250gp)');
		} else if (rand <= 4) {
			items.push('Bronze crown (250gp)');
		} else if (rand <= 5) {
			items.push('Silk robe with gold embroidery (250gp)');
		} else if (rand <= 6) {
			items.push('Large gold bracelet (250gp)');
		} else if (rand <= 7) {
			items.push('Silver necklace with a gemstone pendant (250gp)');
		} else if (rand <= 8) {
			items.push('Brass mug with jade inlay (250gp)');
		} else if (rand <= 9) {
			items.push('Gold ring set with bloodstones (250gp)');
		} else {
			items.push('Box of turquoise animal figurines (250gp)');
		}
	}
	return items.join('</li><li>');
};

var Art25gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 10);
		if (rand <= 1) {
			items.push('Small mirror set in a painted wooden frame (25gp)');
		} else if (rand <= 2) {
			items.push('Pair of engraved bone dice (25gp)');
		} else if (rand <= 3) {
			items.push('Carved bone statuette (25gp)');
		} else if (rand <= 4) {
			items.push('Embroidered silk handkerchief (25gp)');
		} else if (rand <= 5) {
			items.push('Small gold bracelet (25gp)');
		} else if (rand <= 6) {
			items.push('Cloth-of-gold vestments (25gp)');
		} else if (rand <= 7) {
			items.push('Copper chalice with silver filigree (25gp)');
		} else if (rand <= 8) {
			items.push('Silver ewer (25gp)');
		} else if (rand <= 9) {
			items.push('Black velvet mask stitched with silver thread (25gp)');
		} else {
			items.push('Gold locket with a painted portrait inside (25gp)');
		}
	}
	return items.join('</li><li>');
};

var Art7500gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 8);
		if (rand <= 1) {
			items.push('Jeweled gold crown (7500gp)');
		} else if (rand <= 2) {
			items.push('Bejeweled ivory drinking horn with gold filigree (7500gp)');
		} else if (rand <= 3) {
			items.push('Jade game board with solid gold playing pieces (7500gp)');
		} else if (rand <= 4) {
			items.push('Gold jewelry box with platinum filigree (7500gp)');
		} else if (rand <= 5) {
			items.push('Painted gold childs sarcophagus (7500gp)');
		} else if (rand <= 6) {
			items.push('Jeweled platinum ring (7500gp)');
		} else if (rand <= 7) {
			items.push('Small gold statuette set with rubies (7500gp)');
		} else {
			items.push('Gold cup set with emeralds (7500gp)');
		}
	}
	return items.join('</li><li>');
};

var Art750gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 10);
		if (rand <= 1) {
			items.push('Carved harp of exotic wood with ivory inlay and zircon gems (750gp)');
		} else if (rand <= 2) {
			items.push('Painted gold war mask (750gp)');
		} else if (rand <= 3) {
			items.push('Small gold idol (750gp)');
		} else if (rand <= 4) {
			items.push('Ceremonial electrum dagger wit~ a black pearl in the pommel (750gp)');
		} else if (rand <= 5) {
			items.push('Obsidian statuette with gold fittings and inlay (750gp)');
		} else if (rand <= 6) {
			items.push('Gold dragon comb set with red garnets as eyes (750gp)');
		} else if (rand <= 7) {
			items.push('Bottle stopper cork embossed with gold leaf and set with amethysts (750gp)');
		} else if (rand <= 8) {
			items.push('Silver and gold brooch (750gp)');
		} else if (rand <= 9) {
			items.push('Silver chalice set with moonstones (750gp)');
		} else {
			items.push('Silver-plated steellongsword with jet set in hilt (750gp)');
		}
	}
	return items.join('</li><li>');
};

var HoardTreasureHighCR = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 108);
		if (rand <= 4) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art750gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableD((Roll(1,4)*1)));
		} else if (rand <= 8) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableD((Roll(1,4)*1)));
		} else if (rand <= 13) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art750gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableC((Roll(1,6)*1)));
		} else if (rand <= 29) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableC((Roll(1,6)*1)));
		} else if (rand <= 31) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableH((Roll(1,4)*1)));
		} else if (rand <= 36) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems500gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableC((Roll(1,6)*1)));
		} else if (rand <= 41) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableC((Roll(1,6)*1)));
		} else if (rand <= 45) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableA((Roll(1,4)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 47) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems500gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableF(1) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 49) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems500gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableI(1));
		} else if (rand <= 51) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableI(1));
		} else if (rand <= 54) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableA((Roll(1,4)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 57) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems500gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableA((Roll(1,4)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 59) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableF(1) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 62) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)));
		} else if (rand <= 66) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art750gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableA((Roll(1,4)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 68) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art750gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableF(1) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 71) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art750gp((Roll(2,4)*1)));
		} else if (rand <= 73) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableE(1));
		} else if (rand <= 77) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableD((Roll(1,4)*1)));
		} else if (rand <= 79) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems500gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableD((Roll(1,4)*1)));
		} else if (rand <= 81) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableF(1) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 84) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art750gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableH((Roll(1,4)*1)));
		} else if (rand <= 87) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp');
		} else if (rand <= 89) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems500gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableE(1));
		} else if (rand <= 91) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art750gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableI(1));
		} else if (rand <= 93) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art750gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableE(1));
		} else if (rand <= 95) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableI(1));
		} else if (rand <= 97) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableE(1));
		} else if (rand <= 100) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableH((Roll(1,4)*1)));
		} else if (rand <= 102) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems500gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableH((Roll(1,4)*1)));
		} else if (rand <= 105) {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems500gp((Roll(3,6)*1)));
		} else {
			items.push((Roll(8,6)*500) + ' gp</li><li>' + (Roll(10,6)*50) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)));
		}
	}
	return "<ul><li>" + items.join('</li><li>') + "</li></ul>";
};

var HoardTreasureImpossibleCR = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 109);
		if (rand <= 2) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art7500gp((Roll(1,4)*1)) + '</li><li>' + MagicItemTableH((Roll(1,4)*1)));
		} else if (rand <= 7) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems5000gpgp((Roll(1,8)*1)) + '</li><li>' + MagicItemTableE((Roll(1,6)*1)));
		} else if (rand <= 15) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art7500gp((Roll(1,4)*1)) + '</li><li>' + MagicItemTableD((Roll(1,6)*1)));
		} else if (rand <= 23) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableD((Roll(1,6)*1)));
		} else if (rand <= 28) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems5000gpgp((Roll(1,8)*1)) + '</li><li>' + MagicItemTableI((Roll(1,3)*1)));
		} else if (rand <= 33) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art7500gp((Roll(1,4)*1)) + '</li><li>' + MagicItemTableI((Roll(1,3)*1)));
		} else if (rand <= 34) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 42) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art2500gp((Roll(1,10)*1)) + '</li><li>' + MagicItemTableD((Roll(1,6)*1)));
		} else if (rand <= 54) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems5000gpgp((Roll(1,8)*1)) + '</li><li>' + MagicItemTableH((Roll(1,4)*1)));
		} else if (rand <= 60) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art2500gp((Roll(1,10)*1)) + '</li><li>' + MagicItemTableE((Roll(1,6)*1)));
		} else if (rand <= 65) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art7500gp((Roll(1,4)*1)) + '</li><li>' + MagicItemTableE((Roll(1,6)*1)));
		} else if (rand <= 67) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art7500gp((Roll(1,4)*1)) + '</li><li>' + MagicItemTableC((Roll(1,8)*1)));
		} else if (rand <= 70) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art2500gp((Roll(1,10)*1)) + '</li><li>' + MagicItemTableC((Roll(1,8)*1)));
		} else if (rand <= 72) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art2500gp((Roll(1,10)*1)) + '</li><li>' + MagicItemTableH((Roll(1,4)*1)));
		} else if (rand <= 80) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems5000gpgp((Roll(1,8)*1)) + '</li><li>' + MagicItemTableD((Roll(1,6)*1)));
		} else if (rand <= 83) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems5000gpgp((Roll(1,8)*1)) + '</li><li>' + MagicItemTableC((Roll(1,8)*1)));
		} else if (rand <= 84) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art7500gp((Roll(1,4)*1)) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 85) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art2500gp((Roll(1,10)*1)) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 87) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp');
		} else if (rand <= 90) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableC((Roll(1,8)*1)));
		} else if (rand <= 96) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableE((Roll(1,6)*1)));
		} else if (rand <= 101) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableI((Roll(1,3)*1)));
		} else if (rand <= 102) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems5000gpgp((Roll(1,8)*1)) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 104) {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Gems1000gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableH((Roll(1,4)*1)));
		} else {
			items.push((Roll(12,6)*1000) + ' gp</li><li>' + (Roll(8,6)*1000) + ' pp</li><li>' + Art2500gp((Roll(1,10)*1)) + '</li><li>' + MagicItemTableI((Roll(1,3)*1)));
		}
	}
	return "<ul><li>" + items.join('</li><li>') + "</li></ul>";
};

var HoardTreasureLowCR = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 5) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems50gp((Roll(2,6)*1)) + '</li><li>' + MagicItemTableF((Roll(1,4)*1)));
		} else if (rand <= 12) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableF((Roll(1,4)*1)));
		} else if (rand <= 20) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems50gp((Roll(2,6)*1)) + '</li><li>' + MagicItemTableA((Roll(1,6)*1)));
		} else if (rand <= 21) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems50gp((Roll(2,6)*1)) + '</li><li>' + MagicItemTableG(1));
		} else if (rand <= 31) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Art25gp((Roll(2,4)*1)));
		} else if (rand <= 39) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableA((Roll(1,6)*1)));
		} else if (rand <= 45) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep');
		} else if (rand <= 50) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 52) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableG(1));
		} else if (rand <= 55) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems10gp((Roll(2,6)*1)) + '</li><li>' + MagicItemTableC((Roll(1,4)*1)));
		} else if (rand <= 60) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems50gp((Roll(2,6)*1)) + '</li><li>' + MagicItemTableC((Roll(1,4)*1)));
		} else if (rand <= 62) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableC((Roll(1,4)*1)));
		} else if (rand <= 72) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems10gp((Roll(2,6)*1)));
		} else if (rand <= 77) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems10gp((Roll(2,6)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 82) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems50gp((Roll(2,6)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 92) {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems50gp((Roll(2,6)*1)));
		} else {
			items.push((Roll(6,6)*100) + ' cp</li><li>' + (Roll(6,6)*50) + ' sp</li><li>' + (Roll(4,6)*5) + ' ep</li><li>' + Gems10gp((Roll(2,6)*1)) + '</li><li>' + MagicItemTableA((Roll(1,6)*1)));
		}
	}
	return "<ul><li>" + items.join('</li><li>') + "</li></ul>";
};

var HoardTreasureMediumCR = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 80);
		if (rand <= 1) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems100gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableH(1));
		} else if (rand <= 3) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 4) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableD(1));
		} else if (rand <= 9) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems100gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 13) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 15) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableD(1));
		} else if (rand <= 18) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableF((Roll(1,4)*1)));
		} else if (rand <= 21) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems100gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableF((Roll(1,4)*1)));
		} else if (rand <= 26) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems50gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 28) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableC((Roll(1,4)*1)));
		} else if (rand <= 29) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableH(1));
		} else if (rand <= 31) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems100gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableG((Roll(1,4)*1)));
		} else if (rand <= 35) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableF((Roll(1,4)*1)));
		} else if (rand <= 36) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems50gp((Roll(3,6)*1)));
		} else if (rand <= 40) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableA((Roll(1,6)*1)));
		} else if (rand <= 41) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art25gp((Roll(2,4)*1)));
		} else if (rand <= 45) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp');
		} else if (rand <= 46) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems100gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableD(1));
		} else if (rand <= 47) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)));
		} else if (rand <= 51) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems50gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableF((Roll(1,4)*1)));
		} else if (rand <= 54) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems50gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableC((Roll(1,4)*1)));
		} else if (rand <= 58) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems50gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableA((Roll(1,6)*1)));
		} else if (rand <= 62) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art250gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableA((Roll(1,6)*1)));
		} else if (rand <= 66) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems100gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableA((Roll(1,6)*1)));
		} else if (rand <= 68) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems50gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableD(1));
		} else if (rand <= 73) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableB((Roll(1,4)*1)));
		} else if (rand <= 76) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Art25gp((Roll(2,4)*1)) + '</li><li>' + MagicItemTableC((Roll(1,4)*1)));
		} else if (rand <= 79) {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems100gp((Roll(3,6)*1)) + '</li><li>' + MagicItemTableC((Roll(1,4)*1)));
		} else {
			items.push((Roll(4,6)*50) + ' cp</li><li>' + (Roll(4,6)*500) + ' sp</li><li>' + (Roll(6,6)*100) + ' gp</li><li>' + (Roll(6,6)*5) + ' pp</li><li>' + Gems100gp((Roll(3,6)*1)));
		}
	}
	return "<ul><li>" + items.join('</li><li>') + "</li></ul>";
};

var Gems1000gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 8);
		if (rand <= 1) {
			items.push('Yellow sapphire (1000gp)');
		} else if (rand <= 2) {
			items.push('Fire opal (1000gp)');
		} else if (rand <= 3) {
			items.push('Emerald (1000gp)');
		} else if (rand <= 4) {
			items.push('Star sapphire (1000gp)');
		} else if (rand <= 5) {
			items.push('Opal (1000gp)');
		} else if (rand <= 6) {
			items.push('Star ruby (1000gp)');
		} else if (rand <= 7) {
			items.push('Black opal (1000gp)');
		} else {
			items.push('Blue sapphire (1000gp)');
		}
	}
	return items.join('</li><li>');
};

var Gems100gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 10);
		if (rand <= 1) {
			items.push('Tourmaline (100gp)');
		} else if (rand <= 2) {
			items.push('Coral (100gp)');
		} else if (rand <= 3) {
			items.push('Amber (100gp)');
		} else if (rand <= 4) {
			items.push('Spinel (100gp)');
		} else if (rand <= 5) {
			items.push('Pearl (100gp)');
		} else if (rand <= 6) {
			items.push('Garnet (100gp)');
		} else if (rand <= 7) {
			items.push('Chrysoberyl (100gp)');
		} else if (rand <= 8) {
			items.push('jet (100gp)');
		} else if (rand <= 9) {
			items.push('Amethyst (100gp)');
		} else {
			items.push('jade (100gp)');
		}
	}
	return items.join('</li><li>');
};

var Gems10gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 12);
		if (rand <= 1) {
			items.push('Blue quartz (10gp)');
		} else if (rand <= 2) {
			items.push('Lapis lazuli (10gp)');
		} else if (rand <= 3) {
			items.push('Malachite (10gp)');
		} else if (rand <= 4) {
			items.push('Eye agate (10gp)');
		} else if (rand <= 5) {
			items.push('Obsidian (10gp)');
		} else if (rand <= 6) {
			items.push('Moss agate (10gp)');
		} else if (rand <= 7) {
			items.push('Azurite (10gp)');
		} else if (rand <= 8) {
			items.push('Turquoise (10gp)');
		} else if (rand <= 9) {
			items.push('Banded agate (10gp)');
		} else if (rand <= 10) {
			items.push('Tiger eye (10gp)');
		} else if (rand <= 11) {
			items.push('Rhodochrosite (10gp)');
		} else {
			items.push('Hematite (10gp)');
		}
	}
	return items.join('</li><li>');
};

var Gems5000 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 4);
		if (rand <= 1) {
			items.push('Ruby');
		} else if (rand <= 2) {
			items.push('Black sapphire');
		} else if (rand <= 3) {
			items.push('Jacinth');
		} else {
			items.push('Diamond');
		}
	}
	return items.join('</li><li>');
};

var Gems500gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 6);
		if (rand <= 1) {
			items.push('Peridot (500gp)');
		} else if (rand <= 2) {
			items.push('Aquamarine (500gp)');
		} else if (rand <= 3) {
			items.push('Alexandrite (500gp)');
		} else if (rand <= 4) {
			items.push('Blue spinel (500gp)');
		} else if (rand <= 5) {
			items.push('Black pearl (500gp)');
		} else {
			items.push('Topaz (500gp)');
		}
	}
	return items.join('</li><li>');
};

var Gems50gp = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 12);
		if (rand <= 1) {
			items.push('Star rose quartz (50gp)');
		} else if (rand <= 2) {
			items.push('Jasper (50gp)');
		} else if (rand <= 3) {
			items.push('Quartz (50gp)');
		} else if (rand <= 4) {
			items.push('Citrine (50gp)');
		} else if (rand <= 5) {
			items.push('Sardonyx (50gp)');
		} else if (rand <= 6) {
			items.push('Chrysoprase (50gp)');
		} else if (rand <= 7) {
			items.push('Onyx (50gp)');
		} else if (rand <= 8) {
			items.push('Chalcedony (50gp)');
		} else if (rand <= 9) {
			items.push('Carnelian (50gp)');
		} else if (rand <= 10) {
			items.push('Moonstone (50gp)');
		} else if (rand <= 11) {
			items.push('Bloodstone (50gp)');
		} else {
			items.push('Zircon (50gp)');
		}
	}
	return items.join('</li><li>');
};

var MagicItemTableA = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 10) {
			items.push('Spell scroll (' + Spells0(1) + ')');
		} else if (rand <= 60) {
			items.push('Potion of healing');
		} else if (rand <= 64) {
			items.push('Potion of greater healing');
		} else if (rand <= 65) {
			items.push('Driftglobe');
		} else if (rand <= 69) {
			items.push('Spell scroll (' + Spells2(1) + ')');
		} else if (rand <= 89) {
			items.push('Spell scroll (' + Spells1(1) + ')');
		} else if (rand <= 90) {
			items.push('Bag of holding');
		} else {
			items.push('Potion of climbing');
		}
	}
	return items.join('</li><li>');
};

var MagicItemTableB = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 5) {
			items.push('Potion of water breathing');
		} else if (rand <= 6) {
			items.push('Wand of magic detection');
		} else if (rand <= 7) {
			items.push('Lantern of revealing');
		} else if (rand <= 9) {
			items.push('Dust of sneezing and choking');
		} else if (rand <= 12) {
			items.push('Bag of holding');
		} else if (rand <= 13) {
			items.push('Mariners armor');
		} else if (rand <= 14) {
			items.push('Cloak of the manta ray');
		} else if (rand <= 19) {
			items.push('Spell scroll (' + Spells3(1) + ')');
		} else if (rand <= 24) {
			items.push('Spell scroll (' + Spells2(1) + ')');
		} else if (rand <= 25) {
			items.push('Helm of comprehending languages');
		} else if (rand <= 26) {
			items.push('Goggles of night');
		} else if (rand <= 27) {
			items.push('Immovable rod');
		} else if (rand <= 30) {
			items.push('Keoghtoms ointment');
		} else if (rand <= 31) {
			items.push('Wand of secrets');
		} else if (rand <= 46) {
			items.push('Potion of greater healing');
		} else if (rand <= 47) {
			items.push('Rope of climbing');
		} else if (rand <= 49) {
			items.push('Philter of love');
		} else if (rand <= 51) {
			items.push('Elemental gem');
		} else if (rand <= 52) {
			items.push('Potion of poison');
		} else if (rand <= 59) {
			items.push('Potion of resistance');
		} else if (rand <= 66) {
			items.push('Potion of fire breath');
		} else if (rand <= 69) {
			items.push('Oil of slipperiness');
		} else if (rand <= 74) {
			items.push('Ammunition , +1');
		} else if (rand <= 79) {
			items.push('Potion of animal friendship');
		} else if (rand <= 80) {
			items.push('Ring of swimming');
		} else if (rand <= 81) {
			items.push('Robe of useful items');
		} else if (rand <= 82) {
			items.push('Driftglobe');
		} else if (rand <= 87) {
			items.push('Potion of hill giant strength');
		} else if (rand <= 88) {
			items.push('Saddle of the cavalier');
		} else if (rand <= 89) {
			items.push('Alchemy jug');
		} else if (rand <= 94) {
			items.push('Potion of growth');
		} else if (rand <= 95) {
			items.push('Mithral armor');
		} else if (rand <= 97) {
			items.push('Dust ·of dryness');
		} else if (rand <= 98) {
			items.push('Cap of water breathing');
		} else {
			items.push('Dust of disappearance');
		}
	}
	return items.join('</li><li>');
};

var MagicItemTableC = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 1) {
			items.push('Periapt of health');
		} else if (rand <= 6) {
			items.push('Potio n of clairvoyance');
		} else if (rand <= 9) {
			items.push('Elixir of health');
		} else if (rand <= 14) {
			items.push('Spell scroll (' + Spells5(1) + ')');
		} else if (rand <= 17) {
			items.push('Scroll of protection');
		} else if (rand <= 22) {
			items.push('Potion of gaseous form');
		} else if (rand <= 27) {
			items.push('Potion of mind reading');
		} else if (rand <= 28) {
			items.push('Hewa rds handy haversack');
		} else if (rand <= 33) {
			items.push('Potion of frost giant strength');
		} else if (rand <= 36) {
			items.push('Potion of fire giant strength');
		} else if (rand <= 39) {
			items.push('Quaals feather token');
		} else if (rand <= 40) {
			items.push('Chime of opening');
		} else if (rand <= 41) {
			items.push('Decanter of endless water');
		} else if (rand <= 42) {
			items.push('Eyes of minute seeing');
		} else if (rand <= 47) {
			items.push('Potion of invu lnerabil ity');
		} else if (rand <= 52) {
			items.push('Ammunition, +2');
		} else if (rand <= 54) {
			items.push('Bag of beans');
		} else if (rand <= 69) {
			items.push('Potion of superior healing');
		} else if (rand <= 70) {
			items.push('Necklace of fireballs');
		} else if (rand <= 73) {
			items.push('Oil of etherealness');
		} else if (rand <= 74) {
			items.push('Horseshoes of speed');
		} else if (rand <= 79) {
			items.push('Potion of stone giant strength');
		} else if (rand <= 84) {
			items.push('Potion of heroism');
		} else if (rand <= 91) {
			items.push('Spell scroll (' + Spells4(1) + ')');
		} else if (rand <= 92) {
			items.push('Sending stones');
		} else if (rand <= 93) {
			items.push('Folding boat');
		} else if (rand <= 95) {
			items.push('Bead of force');
		} else {
			items.push('Potion of diminution');
		}
	}
	return items.join('</li><li>');
};

var MagicItemTableD = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 1) {
			items.push('Portable hole');
		} else if (rand <= 6) {
			items.push('Oil of sharpness');
		} else if (rand <= 9) {
			items.push('Nolzurs marvelous pigments');
		} else if (rand <= 12) {
			items.push('Horseshoes of a zephyr');
		} else if (rand <= 19) {
			items.push('Spell scroll (' + Spells7(1) + ')');
		} else if (rand <= 29) {
			items.push('Spell scroll (' + Spells6(1) + ')');
		} else if (rand <= 34) {
			items.push('Ammunition, +3');
		} else if (rand <= 54) {
			items.push('Potion of supreme healing');
		} else if (rand <= 59) {
			items.push('Potion of fl yi ng');
		} else if (rand <= 64) {
			items.push('Potion of longevity');
		} else if (rand <= 69) {
			items.push('Spell scroll (' + Spells8(1) + ')');
		} else if (rand <= 79) {
			items.push('Potion of invisibility');
		} else if (rand <= 84) {
			items.push('Potion of vitality');
		} else if (rand <= 89) {
			items.push('Potion of cloud giant strength');
		} else if (rand <= 90) {
			items.push('Bag of devouring');
		} else {
			items.push('Potion of speed');
		}
	}
	return items.join('</li><li>');
};

var MagicItemTableE = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 25) {
			items.push('Potion of storm giant strength');
		} else if (rand <= 55) {
			items.push('Spell scroll (' + Spells8(1) + ')');
		} else if (rand <= 60) {
			items.push('Arrow of slaying');
		} else if (rand <= 62) {
			items.push('Sovereign glue');
		} else if (rand <= 77) {
			items.push('Spell scroll (' + Spells9(1) + ')');
		} else if (rand <= 92) {
			items.push('Potion of supreme healing');
		} else {
			items.push('Universal solvent');
		}
	}
	return items.join('</li><li>');
};

var MagicItemTableF = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 1) {
			items.push('Eversmoking bottle');
		} else if (rand <= 2) {
			items.push('Ring of jumping');
		} else if (rand <= 3) {
			items.push('Gloves of missile snaring');
		} else if (rand <= 4) {
			items.push('Pipes of haunting');
		} else if (rand <= 5) {
			items.push('Adamantine armor (scale mail)');
		} else if (rand <= 7) {
			items.push('Pearl of power');
		} else if (rand <= 8) {
			items.push('Medallion of thoughts');
		} else if (rand <= 9) {
			items.push('Stone of good luck');
		} else if (rand <= 10) {
			items.push('Instrument of the bards (Doss lute)');
		} else if (rand <= 11) {
			items.push('Pipes of the sewers');
		} else if (rand <= 13) {
			items.push('Cloak of elvenkind');
		} else if (rand <= 28) {
			items.push('Weapon, +1');
		} else if (rand <= 30) {
			items.push('Staff of the adder');
		} else if (rand <= 32) {
			items.push('Gauntlets of ogre power');
		} else if (rand <= 33) {
			items.push('Instrument of the bards (Mac-Fuimidh cittern)');
		} else if (rand <= 34) {
			items.push('Instrument of the bards (Fochlucan bandore)');
		} else if (rand <= 36) {
			items.push('Cloak of protection');
		} else if (rand <= 38) {
			items.push('Broom of flying');
		} else if (rand <= 41) {
			items.push('Sentinel shield');
		} else if (rand <= 44) {
			items.push('Shield,+ 1');
		} else if (rand <= 45) {
			items.push('Bag of tricks (rust)');
		} else if (rand <= 47) {
			items.push('Hat of disguise');
		} else if (rand <= 49) {
			items.push('Rod of the pact keeper, + 1');
		} else if (rand <= 51) {
			items.push('Boots of striding and springing');
		} else if (rand <= 52) {
			items.push('Deck of illusions');
		} else if (rand <= 53) {
			items.push('Bag of tricks (gray)');
		} else if (rand <= 54) {
			items.push('Necklace of adaptation');
		} else if (rand <= 55) {
			items.push('Gloves of thievery');
		} else if (rand <= 56) {
			items.push('Eyes of the eagle');
		} else if (rand <= 57) {
			items.push('Headband of intellect');
		} else if (rand <= 59) {
			items.push('Boots of elvenkind');
		} else if (rand <= 60) {
			items.push('Figurine of wondrous power (silver raven)');
		} else if (rand <= 61) {
			items.push('Ring of warmth');
		} else if (rand <= 62) {
			items.push('Ring of water walking');
		} else if (rand <= 63) {
			items.push('Quiver of Ehlonna');
		} else if (rand <= 64) {
			items.push('Helm of telepathy');
		} else if (rand <= 66) {
			items.push('Bracers of archery');
		} else if (rand <= 68) {
			items.push('Trident of fish command');
		} else if (rand <= 69) {
			items.push('Boots of the winterlands');
		} else if (rand <= 70) {
			items.push('Eyes of charming');
		} else if (rand <= 72) {
			items.push('Wand of magic missiles');
		} else if (rand <= 74) {
			items.push('Weapon of warning');
		} else if (rand <= 75) {
			items.push('Circlet of blasting');
		} else if (rand <= 76) {
			items.push('Adamantine armor (chain mail)');
		} else if (rand <= 78) {
			items.push('Amulet of proof against detection and location');
		} else if (rand <= 79) {
			items.push('Gem of brightness');
		} else if (rand <= 80) {
			items.push('Adamantine armor (chain shirt)');
		} else if (rand <= 82) {
			items.push('Brooch of shielding');
		} else if (rand <= 84) {
			items.push('Wand of the war mage, + 1');
		} else if (rand <= 85) {
			items.push('Bag of tricks (tan)');
		} else if (rand <= 86) {
			items.push('Periapt of wound closure');
		} else if (rand <= 88) {
			items.push('Sword of vengeance');
		} else if (rand <= 90) {
			items.push('Staff of the python');
		} else if (rand <= 91) {
			items.push('Winged boots');
		} else if (rand <= 92) {
			items.push('Ring of mind shielding');
		} else if (rand <= 93) {
			items.push('Gloves of swimming and climbing');
		} else if (rand <= 95) {
			items.push('Slippers of spider climbing');
		} else if (rand <= 97) {
			items.push('Javelin of lightning');
		} else if (rand <= 98) {
			items.push('Wind fan');
		} else {
			items.push('Wand of web');
		}
	}
	return items.join('</li><li>');
};

var MagicItemTableG = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 1) {
			items.push('Armor of resistance (leather)');
		} else if (rand <= 2) {
			items.push('loun stone (awareness)');
		} else if (rand <= 3) {
			items.push('Ring of resistance');
		} else if (rand <= 4) {
			items.push('Belt of hill giant strength');
		} else if (rand <= 5) {
			items.push('Shield of missile attraction');
		} else if (rand <= 6) {
			items.push('Censer of controlling air elementals');
		} else if (rand <= 7) {
			items.push('Sword of life stealing');
		} else if (rand <= 8) {
			items.push('Ring of X-ray vision');
		} else if (rand <= 9) {
			items.push('Wand of paralysis');
		} else if (rand <= 10) {
			items.push('Instrument ofthe bards (Cii lyre)');
		} else if (rand <= 11) {
			items.push('Dimensional shackles');
		} else if (rand <= 12) {
			items.push('Ring of evasion');
		} else if (rand <= 13) {
			items.push('Armor of vulnerability');
		} else if (rand <= 14) {
			items.push('Cape of the mountebank');
		} else if (rand <= 15) {
			items.push('Ring of feather falling');
		} else if (rand <= 16) {
			items.push('Bracers of defense');
		} else if (rand <= 17) {
			items.push('Dragon slayer');
		} else if (rand <= 18) {
			items.push('Flame tongue');
		} else if (rand <= 19) {
			items.push('Tentacle rod');
		} else if (rand <= 20) {
			items.push('Rope of entanglement');
		} else if (rand <= 21) {
			items.push('Peri apt of proof against poison');
		} else if (rand <= 22) {
			items.push('Adamantine armor (splint)');
		} else if (rand <= 23) {
			items.push('Shield, +2');
		} else if (rand <= 24) {
			items.push('Wand of fear');
		} else if (rand <= 25) {
			items.push('Staff of the woodlands');
		} else if (rand <= 26) {
			items.push('Armor, + 1 leather');
		} else if (rand <= 27) {
			items.push('Cube afforce');
		} else if (rand <= 28) {
			items.push('Rod of the pact keeper, +2');
		} else if (rand <= 29) {
			items.push('Brazier of commanding fire elementals');
		} else if (rand <= 30) {
			items.push('Armor, +1 chain mail');
		} else if (rand <= 31) {
			items.push('Wand of binding');
		} else if (rand <= 32) {
			items.push('Staff of healing');
		} else if (rand <= 33) {
			items.push('Cloak of displacement');
		} else if (rand <= 34) {
			items.push('loun stone (sustenance)');
		} else if (rand <= 35) {
			items.push('Rod of rulership');
		} else if (rand <= 36) {
			items.push('Ring of animal influence');
		} else if (rand <= 37) {
			items.push('Armor of resistance (chain mail)');
		} else if (rand <= 38) {
			items.push('Elven chain');
		} else if (rand <= 39) {
			items.push('Dagger of venom');
		} else if (rand <= 40) {
			items.push('Giant slayer');
		} else if (rand <= 43) {
			items.push('Figurine of wondrous power (' + StatuesForTableG(1) + ')');
		} else if (rand <= 44) {
			items.push('Iron bands of Bilarro');
		} else if (rand <= 45) {
			items.push('Sun blade');
		} else if (rand <= 46) {
			items.push('Helm of teleportation');
		} else if (rand <= 47) {
			items.push('Wand of enemy detection');
		} else if (rand <= 48) {
			items.push('Armor of resistance (chain shirt)');
		} else if (rand <= 49) {
			items.push('Ring of spell storing');
		} else if (rand <= 50) {
			items.push('Clamoured studded leather');
		} else if (rand <= 51) {
			items.push('Staff of charming');
		} else if (rand <= 52) {
			items.push('Mantle of spell resistance');
		} else if (rand <= 53) {
			items.push('Necklace of prayer beads');
		} else if (rand <= 54) {
			items.push('Horn of Valhalla (silver or brass)');
		} else if (rand <= 55) {
			items.push('Berserker axe');
		} else if (rand <= 56) {
			items.push('Armor, +1 scale mail');
		} else if (rand <= 57) {
			items.push('Ring of protection');
		} else if (rand <= 58) {
			items.push('Belt of dwarvenkind');
		} else if (rand <= 59) {
			items.push('Arrow-catching shield');
		} else if (rand <= 60) {
			items.push('Wand of fireballs');
		} else if (rand <= 61) {
			items.push('Horn of blasting');
		} else if (rand <= 62) {
			items.push('Wand of the war mage, +2');
		} else if (rand <= 63) {
			items.push('Ring of free action');
		} else if (rand <= 64) {
			items.push('Amulet of health');
		} else if (rand <= 65) {
			items.push('Wand of wonder');
		} else if (rand <= 66) {
			items.push('loun stone (protection)');
		} else if (rand <= 67) {
			items.push('Ring of the ram');
		} else if (rand <= 68) {
			items.push('Boots of speed');
		} else if (rand <= 79) {
			items.push('Weapon, +2');
		} else if (rand <= 80) {
			items.push('Staff of withering');
		} else if (rand <= 81) {
			items.push('Mace of disruption');
		} else if (rand <= 82) {
			items.push('Adamantine armor (breastplate)');
		} else if (rand <= 83) {
			items.push('Staff of swarming insects');
		} else if (rand <= 84) {
			items.push('loun stone (reserve');
		} else if (rand <= 85) {
			items.push('Sword of wounding');
		} else if (rand <= 86) {
			items.push('Robe of eyes');
		} else if (rand <= 87) {
			items.push('Bowl of commanding water elementals');
		} else if (rand <= 88) {
			items.push('Stone of controlling earth elementals');
		} else if (rand <= 89) {
			items.push('Boots of levitation');
		} else if (rand <= 90) {
			items.push('Instrument of the bards (Canaith mandolin)');
		} else if (rand <= 91) {
			items.push('Wand of lightning bolts');
		} else if (rand <= 92) {
			items.push('Armor,+ 1 chain shirt');
		} else if (rand <= 93) {
			items.push('Daerns instant fortress');
		} else if (rand <= 94) {
			items.push('Mace of smiting');
		} else if (rand <= 95) {
			items.push('Mace of terror');
		} else if (rand <= 96) {
			items.push('Wings of flying');
		} else if (rand <= 97) {
			items.push('Cloak of the bat');
		} else if (rand <= 98) {
			items.push('Vicious weapon');
		} else if (rand <= 99) {
			items.push('Gem of seeing');
		} else {
			items.push('Armor of resistance (scale mail)');
		}
	}
	return items.join('</li><li>');
};

var MagicItemTableH = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 1) {
			items.push('Tome of leadership and influence');
		} else if (rand <= 2) {
			items.push('Tome of clear thought');
		} else if (rand <= 3) {
			items.push('loun stone (absorption)');
		} else if (rand <= 4) {
			items.push('Demon armor');
		} else if (rand <= 5) {
			items.push('Armor, + 1 breastplate');
		} else if (rand <= 6) {
			items.push('Helm of brilliance');
		} else if (rand <= 7) {
			items.push('Frost brand');
		} else if (rand <= 9) {
			items.push('Staff of frost');
		} else if (rand <= 11) {
			items.push('Staff of power');
		} else if (rand <= 12) {
			items.push('Cloak of arachnida');
		} else if (rand <= 14) {
			items.push('Staff of fire');
		} else if (rand <= 16) {
			items.push('Robe of scintillating colors');
		} else if (rand <= 17) {
			items.push('Spellguard shield');
		} else if (rand <= 18) {
			items.push('Armor, + 1 splint');
		} else if (rand <= 19) {
			items.push('Oath bow');
		} else if (rand <= 20) {
			items.push('Manual of quickness of action');
		} else if (rand <= 21) {
			items.push('Armor, + 1 studded leather');
		} else if (rand <= 22) {
			items.push('Adamantine armor (plate)');
		} else if (rand <= 23) {
			items.push('Instrument of the bards (Anstruth harp)');
		} else if (rand <= 24) {
			items.push('Armor of resistance (splint)');
		} else if (rand <= 25) {
			items.push('Armor of resistance (studded leather)');
		} else if (rand <= 26) {
			items.push('loun stone (fortitude)');
		} else if (rand <= 27) {
			items.push('Belt of fire giant strength');
		} else if (rand <= 28) {
			items.push('Belt of frost (or stone) giant strength');
		} else if (rand <= 29) {
			items.push('Armor, +2 chain mail');
		} else if (rand <= 31) {
			items.push('Ring of shooting stars');
		} else if (rand <= 32) {
			items.push('Armor, +2 chain shirt');
		} else if (rand <= 33) {
			items.push('loun stone (intellect)');
		} else if (rand <= 34) {
			items.push('loun stone (leadership)');
		} else if (rand <= 36) {
			items.push('Rod of alertness');
		} else if (rand <= 37) {
			items.push('Horn ofValhalla (bronze)');
		} else if (rand <= 39) {
			items.push('Robe of stars');
		} else if (rand <= 41) {
			items.push('Sword of sharpness');
		} else if (rand <= 43) {
			items.push('Wand of polymorph');
		} else if (rand <= 44) {
			items.push('loun stone (strength)');
		} else if (rand <= 45) {
			items.push('Dwarven thrower');
		} else if (rand <= 46) {
			items.push('Nine li ves stealer');
		} else if (rand <= 47) {
			items.push('Dragon scale mail');
		} else if (rand <= 48) {
			items.push('Dwarven plate');
		} else if (rand <= 50) {
			items.push('Ring of telekinesis');
		} else if (rand <= 51) {
			items.push('loun stone (insight)');
		} else if (rand <= 52) {
			items.push('Armor, +2 scale mail');
		} else if (rand <= 54) {
			items.push('Carpet of flying');
		} else if (rand <= 56) {
			items.push('Rod of absorption');
		} else if (rand <= 57) {
			items.push('Candle of invocation');
		} else if (rand <= 58) {
			items.push('Mirror of life trapping');
		} else if (rand <= 59) {
			items.push('Armor of resistance (breastplate)');
		} else if (rand <= 60) {
			items.push('Animated shield');
		} else if (rand <= 61) {
			items.push('Manual of golems');
		} else if (rand <= 62) {
			items.push('Manual of gainful exercise');
		} else if (rand <= 63) {
			items.push('Efreeti bottle');
		} else if (rand <= 64) {
			items.push('Figurine of wondrous power (obsidian steed)');
		} else if (rand <= 66) {
			items.push('Scimitar of speed');
		} else if (rand <= 68) {
			items.push('Shield, +3');
		} else if (rand <= 70) {
			items.push('Amulet of the planes');
		} else if (rand <= 71) {
			items.push('Dancing sword');
		} else if (rand <= 73) {
			items.push('Wand of the war mage, +3');
		} else if (rand <= 83) {
			items.push('Weapon, +3');
		} else if (rand <= 84) {
			items.push('loun stone (agility)');
		} else if (rand <= 85) {
			items.push('Adamantine armor (half plate)');
		} else if (rand <= 86) {
			items.push('Tome of understanding');
		} else if (rand <= 88) {
			items.push('Ring of regeneration');
		} else if (rand <= 90) {
			items.push('Crystal ball (very rare version)');
		} else if (rand <= 92) {
			items.push('Rod of security');
		} else if (rand <= 94) {
			items.push('Rod of the pact keeper, +3');
		} else if (rand <= 96) {
			items.push('Staff of thunder and lightning');
		} else if (rand <= 98) {
			items.push('Staff of striking');
		} else if (rand <= 99) {
			items.push('Armor, +2 leather');
		} else {
			items.push('Manual of bodily health');
		}
	}
	return items.join('</li><li>');
};

var MagicItemTableI = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 1) {
			items.push('Tome of the stilled tongue');
		} else if (rand <= 2) {
			items.push('Talisman of ultimate evil');
		} else if (rand <= 7) {
			items.push('Hammer of thunderbolts');
		} else if (rand <= 8) {
			items.push('Plate armor of etherealness');
		} else if (rand <= 10) {
			items.push('Crystal ball (legendary version)');
		} else if (rand <= 11) {
			items.push('Ring of water elemental command');
		} else if (rand <= 12) {
			items.push('loun stone (mastery)');
		} else if (rand <= 14) {
			items.push('Armor, +1 plate');
		} else if (rand <= 15) {
			items.push('Belt of storm giant strength');
		} else if (rand <= 17) {
			items.push('Robe of the archmagi');
		} else if (rand <= 18) {
			items.push('Instrument of the bards (Ollamh harp)');
		} else if (rand <= 19) {
			items.push('loun stone (greater absorption)');
		} else if (rand <= 21) {
			items.push('Cloak of invisibility');
		} else if (rand <= 22) {
			items.push('Ring of fire elemental command');
		} else if (rand <= 23) {
			items.push('Ring of three wishes');
		} else if (rand <= 25) {
			items.push('Well of many worlds');
		} else if (rand <= 26) {
			items.push('Horn ofValhalla (iron)');
		} else if (rand <= 27) {
			items.push('Sphere of annihilation');
		} else if (rand <= 28) {
			items.push('Plate armor of resistance');
		} else if (rand <= 29) {
			items.push('loun stone (regeneration)');
		} else if (rand <= 30) {
			items.push('Talisman of pure good');
		} else if (rand <= 31) {
			items.push('Talisman of the sphere');
		} else if (rand <= 34) {
			items.push('Staff of the magi');
		} else if (rand <= 35) {
			items.push('Efreeti chain');
		} else if (rand <= 36) {
			items.push('Deck of many things');
		} else if (rand <= 39) {
			items.push('Ring of djinni summoning');
		} else if (rand <= 42) {
			items.push('Holy avenger');
		} else if (rand <= 43) {
			items.push('Cubic gate');
		} else if (rand <= 48) {
			items.push('Sword of answering');
		} else if (rand <= 50) {
			items.push('Armor, +3 leather');
		} else if (rand <= 52) {
			items.push('Armor, + 1 half plate');
		} else if (rand <= 54) {
			items.push('Rod of resurrection');
		} else if (rand <= 56) {
			items.push('Iron flask');
		} else if (rand <= 59) {
			items.push('Vorpal sword');
		} else if (rand <= 62) {
			items.push('Ring of invisibility');
		} else if (rand <= 67) {
			items.push('Defender');
		} else if (rand <= 69) {
			items.push('Armor, +2 splint');
		} else if (rand <= 71) {
			items.push('Scarab of protection');
		} else if (rand <= 72) {
			items.push('Ring of air elemental command');
		} else if (rand <= 73) {
			items.push('Apparatus of Kwalish');
		} else if (rand <= 74) {
			items.push(MagicArmorForTableI(1));
		} else if (rand <= 75) {
			items.push('Armor of invulnerability');
		} else if (rand <= 77) {
			items.push('Armor, +2 breastplate');
		} else if (rand <= 79) {
			items.push('Belt of cloud giant strength');
		} else if (rand <= 81) {
			items.push('Armor, +1 scale mail');
		} else if (rand <= 84) {
			items.push('Ring of spell turning');
		} else if (rand <= 87) {
			items.push('Rod of lordly might');
		} else if (rand <= 88) {
			items.push('Armor of resistance (half plate)');
		} else if (rand <= 93) {
			items.push('Luck blade');
		} else if (rand <= 95) {
			items.push('Armor, +3 chain shirt');
		} else if (rand <= 97) {
			items.push('Armor, +3 chain mail');
		} else if (rand <= 98) {
			items.push('Ring of earth elemental command');
		} else {
			items.push('Armor, +2 studded leather');
		}
	}
	return items.join('</li><li>');
};

var Spells0 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 2) {
			items.push('Chill Touch');
		} else if (rand <= 4) {
			items.push('Friends');
		} else if (rand <= 6) {
			items.push('Acid Splash');
		} else if (rand <= 8) {
			items.push('Light');
		} else if (rand <= 10) {
			items.push('Vicious Mockery');
		} else if (rand <= 40) {
			items.push(Spells0(1));
		} else if (rand <= 42) {
			items.push('Poison Spray');
		} else if (rand <= 44) {
			items.push('Frostbite');
		} else if (rand <= 46) {
			items.push('Control Flames');
		} else if (rand <= 48) {
			items.push('Thorn Whip');
		} else if (rand <= 50) {
			items.push('True Strike');
		} else if (rand <= 52) {
			items.push('Prestidigitation');
		} else if (rand <= 54) {
			items.push('Blade Ward');
		} else if (rand <= 56) {
			items.push('Produce Flame');
		} else if (rand <= 58) {
			items.push('Druidcraft');
		} else if (rand <= 60) {
			items.push('Dancing Lights');
		} else if (rand <= 62) {
			items.push('Thunderclap');
		} else if (rand <= 64) {
			items.push('Shape Water');
		} else if (rand <= 66) {
			items.push('Sacred Flame');
		} else if (rand <= 68) {
			items.push('Minor Illusion');
		} else if (rand <= 70) {
			items.push('Message');
		} else if (rand <= 72) {
			items.push('Eldritch Blast');
		} else if (rand <= 74) {
			items.push('Mold Earth');
		} else if (rand <= 76) {
			items.push('Shocking Grasp');
		} else if (rand <= 78) {
			items.push('Spare The Dying');
		} else if (rand <= 80) {
			items.push('Thaumaturgy');
		} else if (rand <= 82) {
			items.push('Guidance');
		} else if (rand <= 84) {
			items.push('Resistance');
		} else if (rand <= 86) {
			items.push('Ray Of Frost');
		} else if (rand <= 88) {
			items.push('Shillelagh');
		} else if (rand <= 90) {
			items.push('Gust');
		} else if (rand <= 92) {
			items.push('Magic Stone');
		} else if (rand <= 94) {
			items.push('Mage Hand');
		} else if (rand <= 96) {
			items.push('Mending');
		} else if (rand <= 98) {
			items.push('Create Bonfire');
		} else {
			items.push('Fire Bolt');
		}
	}
	return items.join('</li><li>');
};

var Spells1 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 1) {
			items.push('Ensnaring Strike');
		} else if (rand <= 2) {
			items.push('Thunderous Smite');
		} else if (rand <= 3) {
			items.push('Catapult');
		} else if (rand <= 4) {
			items.push('Shield');
		} else if (rand <= 5) {
			items.push('Hex');
		} else if (rand <= 6) {
			items.push('Inflict Wounds');
		} else if (rand <= 7) {
			items.push('Illusory Script');
		} else if (rand <= 8) {
			items.push('Beast Bond');
		} else if (rand <= 9) {
			items.push('Grease');
		} else if (rand <= 10) {
			items.push('Fog Cloud');
		} else if (rand <= 11) {
			items.push('False Life');
		} else if (rand <= 12) {
			items.push('Ice Knife');
		} else if (rand <= 13) {
			items.push('Wrathful Smite');
		} else if (rand <= 14) {
			items.push('Earth Tremor');
		} else if (rand <= 15) {
			items.push('Bane');
		} else if (rand <= 16) {
			items.push('Bless');
		} else if (rand <= 17) {
			items.push('Animal Friendship');
		} else if (rand <= 18) {
			items.push('Mage Armor');
		} else if (rand <= 19) {
			items.push('Armor Of Agathys');
		} else if (rand <= 20) {
			items.push('Arms Of Hadar');
		} else if (rand <= 53) {
			items.push(Spells1(1));
		} else if (rand <= 54) {
			items.push('Purify Food And Drink');
		} else if (rand <= 55) {
			items.push('Burning Hands');
		} else if (rand <= 56) {
			items.push('Guiding Bolt');
		} else if (rand <= 57) {
			items.push('Unseen Servant');
		} else if (rand <= 58) {
			items.push('Ray Of Sickness');
		} else if (rand <= 59) {
			items.push('Hail Of Thorns');
		} else if (rand <= 60) {
			items.push('Sanctuary');
		} else if (rand <= 61) {
			items.push('Faerie Fire');
		} else if (rand <= 62) {
			items.push('Expeditious Retreat');
		} else if (rand <= 63) {
			items.push('Thunderwave');
		} else if (rand <= 64) {
			items.push('Sleep');
		} else if (rand <= 65) {
			items.push('Dissonant Whispers');
		} else if (rand <= 66) {
			items.push('Hunters Mark');
		} else if (rand <= 67) {
			items.push('Identify');
		} else if (rand <= 68) {
			items.push('Divine Favor');
		} else if (rand <= 69) {
			items.push('Speak With Animals');
		} else if (rand <= 70) {
			items.push('Command');
		} else if (rand <= 71) {
			items.push('Jump');
		} else if (rand <= 72) {
			items.push('Hellish Rebuke');
		} else if (rand <= 73) {
			items.push('Healing Word');
		} else if (rand <= 74) {
			items.push('Charm Person');
		} else if (rand <= 75) {
			items.push('Hideous Laughter');
		} else if (rand <= 76) {
			items.push('Floating Disk');
		} else if (rand <= 77) {
			items.push('Shield Of Faith');
		} else if (rand <= 78) {
			items.push('Witch Bolt');
		} else if (rand <= 79) {
			items.push('Chromatic Orb');
		} else if (rand <= 80) {
			items.push('Disguise Self');
		} else if (rand <= 81) {
			items.push('Color Spray');
		} else if (rand <= 82) {
			items.push('Searing Smite');
		} else if (rand <= 83) {
			items.push('Detect Magic');
		} else if (rand <= 84) {
			items.push('Detect Poison And Disease');
		} else if (rand <= 85) {
			items.push('Detect Evil And Good');
		} else if (rand <= 86) {
			items.push('Heroism');
		} else if (rand <= 87) {
			items.push('Goodberry');
		} else if (rand <= 88) {
			items.push('Protection From Evil And Good');
		} else if (rand <= 89) {
			items.push('Compelled Duel');
		} else if (rand <= 90) {
			items.push('Feather Fall');
		} else if (rand <= 91) {
			items.push('Longstrider');
		} else if (rand <= 92) {
			items.push('Cure Wounds');
		} else if (rand <= 93) {
			items.push('Create Or Destroy Water');
		} else if (rand <= 94) {
			items.push('Comprehend Languages');
		} else if (rand <= 95) {
			items.push('Silent Image');
		} else if (rand <= 96) {
			items.push('Absorb Elements');
		} else if (rand <= 97) {
			items.push('Alarm');
		} else if (rand <= 98) {
			items.push('Magic Missile');
		} else if (rand <= 99) {
			items.push('Entangle');
		} else {
			items.push('Find Familiar');
		}
	}
	return items.join('</li><li>');
};

var Spells2 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 1) {
			items.push('Find Steed');
		} else if (rand <= 2) {
			items.push('Snowball Swarm');
		} else if (rand <= 34) {
			items.push(Spells2(1));
		} else if (rand <= 35) {
			items.push('Shatter');
		} else if (rand <= 36) {
			items.push('Locate Object');
		} else if (rand <= 37) {
			items.push('Warding Wind');
		} else if (rand <= 38) {
			items.push('Dust Devil');
		} else if (rand <= 39) {
			items.push('Protection From Poison');
		} else if (rand <= 40) {
			items.push('Flaming Sphere');
		} else if (rand <= 41) {
			items.push('Rope Trick');
		} else if (rand <= 42) {
			items.push('Ray Of Enfeeblement');
		} else if (rand <= 43) {
			items.push('Spiritual Weapon');
		} else if (rand <= 44) {
			items.push('Barkskin');
		} else if (rand <= 45) {
			items.push('Augury');
		} else if (rand <= 46) {
			items.push('Scorching Ray');
		} else if (rand <= 47) {
			items.push('Branding Smite');
		} else if (rand <= 48) {
			items.push('Cordon Of Arrows');
		} else if (rand <= 49) {
			items.push('Continual Flame');
		} else if (rand <= 50) {
			items.push('Gust Of Wind');
		} else if (rand <= 51) {
			items.push('Alter Self');
		} else if (rand <= 52) {
			items.push('Blur');
		} else if (rand <= 53) {
			items.push('Aganazzars Scorcher');
		} else if (rand <= 54) {
			items.push('Aid');
		} else if (rand <= 55) {
			items.push('Arcane Lock');
		} else if (rand <= 56) {
			items.push('Blindness/Deafness');
		} else if (rand <= 57) {
			items.push('Beast Sense');
		} else if (rand <= 58) {
			items.push('Enthrall');
		} else if (rand <= 59) {
			items.push('Enlarge/Reduce');
		} else if (rand <= 60) {
			items.push('Calm Emotions');
		} else if (rand <= 61) {
			items.push('Warding Bond');
		} else if (rand <= 62) {
			items.push('Suggestion');
		} else if (rand <= 63) {
			items.push('Phantasmal Force');
		} else if (rand <= 64) {
			items.push('Heat Metal');
		} else if (rand <= 65) {
			items.push('Darkvision');
		} else if (rand <= 66) {
			items.push('Detect Thoughts');
		} else if (rand <= 67) {
			items.push('Pyrotechnics');
		} else if (rand <= 68) {
			items.push('Zone Of Truth');
		} else if (rand <= 69) {
			items.push('Knock');
		} else if (rand <= 70) {
			items.push('Pass Without Trace');
		} else if (rand <= 71) {
			items.push('Moonbeam');
		} else if (rand <= 72) {
			items.push('Darkness');
		} else if (rand <= 73) {
			items.push('Arcanists Magic Aura');
		} else if (rand <= 74) {
			items.push('Animal Messenger');
		} else if (rand <= 75) {
			items.push('Misty Step');
		} else if (rand <= 76) {
			items.push('Prayer Of Healing');
		} else if (rand <= 77) {
			items.push('Web');
		} else if (rand <= 78) {
			items.push('Crown Of Madness');
		} else if (rand <= 79) {
			items.push('Locate Animals Or Plants');
		} else if (rand <= 80) {
			items.push('Hold Person');
		} else if (rand <= 81) {
			items.push('Spider Climb');
		} else if (rand <= 82) {
			items.push('Magic Mouth');
		} else if (rand <= 83) {
			items.push('Acid Arrow');
		} else if (rand <= 84) {
			items.push('Silence');
		} else if (rand <= 85) {
			items.push('Lesser Restoration');
		} else if (rand <= 86) {
			items.push('Levitate');
		} else if (rand <= 87) {
			items.push('Skywrite');
		} else if (rand <= 88) {
			items.push('Bane');
		} else if (rand <= 89) {
			items.push('Spike Growth');
		} else if (rand <= 90) {
			items.push('Gentle Repose');
		} else if (rand <= 91) {
			items.push('Enhance Ability');
		} else if (rand <= 92) {
			items.push('Cloud Of Daggers');
		} else if (rand <= 93) {
			items.push('Earthen Grasp');
		} else if (rand <= 94) {
			items.push('Mirror Image');
		} else if (rand <= 95) {
			items.push('Magic Weapon');
		} else if (rand <= 96) {
			items.push('Flame Blade');
		} else if (rand <= 97) {
			items.push('Find Traps');
		} else if (rand <= 98) {
			items.push('Earthbind');
		} else if (rand <= 99) {
			items.push('Invisibility');
		} else {
			items.push('See Invisibility');
		}
	}
	return items.join('</li><li>');
};

var Spells3 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 1) {
			items.push('Aura Of Vitality');
		} else if (rand <= 2) {
			items.push('Feign Death');
		} else if (rand <= 3) {
			items.push('Vampiric Touch');
		} else if (rand <= 4) {
			items.push('Tidal Wave');
		} else if (rand <= 5) {
			items.push('Hypnotic Pattern');
		} else if (rand <= 6) {
			items.push('Animate Dead');
		} else if (rand <= 7) {
			items.push('Conjure Barrage');
		} else if (rand <= 8) {
			items.push('Conjure Animals');
		} else if (rand <= 9) {
			items.push('Clairvoyance');
		} else if (rand <= 10) {
			items.push('Elemental Weapon');
		} else if (rand <= 11) {
			items.push('Wall of Sand');
		} else if (rand <= 12) {
			items.push('Mass Healing Word');
		} else if (rand <= 13) {
			items.push('Bestow Curse');
		} else if (rand <= 14) {
			items.push('Beacon Of Hope');
		} else if (rand <= 15) {
			items.push('Hunger Of Horror');
		} else if (rand <= 16) {
			items.push('Dispel Magic');
		} else if (rand <= 17) {
			items.push('Fireball');
		} else if (rand <= 18) {
			items.push('Flame Arrows');
		} else if (rand <= 19) {
			items.push('Lightning Bolt');
		} else if (rand <= 20) {
			items.push('Fly');
		} else if (rand <= 21) {
			items.push('Speak With Plants');
		} else if (rand <= 22) {
			items.push('Spirit Guardians');
		} else if (rand <= 23) {
			items.push('Gaseous Form');
		} else if (rand <= 24) {
			items.push('Glyph Of Warding');
		} else if (rand <= 25) {
			items.push('Tiny Hut');
		} else if (rand <= 26) {
			items.push('Daylight');
		} else if (rand <= 27) {
			items.push('Call Lightning');
		} else if (rand <= 28) {
			items.push('Blink');
		} else if (rand <= 29) {
			items.push('Stinking Cloud');
		} else if (rand <= 30) {
			items.push('Phantom Steed');
		} else if (rand <= 31) {
			items.push('Sending');
		} else if (rand <= 32) {
			items.push('Minute Meteors');
		} else if (rand <= 33) {
			items.push('Speak With Dead');
		} else if (rand <= 34) {
			items.push('Sleet Storm');
		} else if (rand <= 35) {
			items.push('Water Breathing');
		} else if (rand <= 36) {
			items.push('Slow');
		} else if (rand <= 37) {
			items.push('Revivify');
		} else if (rand <= 38) {
			items.push('Lightning Arrow');
		} else if (rand <= 39) {
			items.push('Remove Curse');
		} else if (rand <= 40) {
			items.push('Protection From Energy');
		} else if (rand <= 41) {
			items.push('Plant Growth');
		} else if (rand <= 42) {
			items.push('Blinding Smite');
		} else if (rand <= 43) {
			items.push('Nondetection');
		} else if (rand <= 44) {
			items.push('Fear');
		} else if (rand <= 45) {
			items.push('Wind Wall');
		} else if (rand <= 46) {
			items.push('Tongues');
		} else if (rand <= 47) {
			items.push('Water Walk');
		} else if (rand <= 48) {
			items.push('Wall of Water');
		} else if (rand <= 49) {
			items.push('Create Food And Water');
		} else if (rand <= 50) {
			items.push('Counterspell');
		} else if (rand <= 51) {
			items.push('Meld Into Stone');
		} else if (rand <= 52) {
			items.push('Haste');
		} else if (rand <= 53) {
			items.push('Crusaders Mantle');
		} else if (rand <= 54) {
			items.push('Magic Circle');
		} else if (rand <= 55) {
			items.push('Erupting Earth');
		} else if (rand <= 56) {
			items.push('Major Image');
		} else {
			items.push(Spells3(1));
		}
	}
	return items.join('</li><li>');
};

var Spells4 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 2) {
			items.push('Hallucinatory Terrain');
		} else if (rand <= 4) {
			items.push('Elemental Bane');
		} else if (rand <= 6) {
			items.push('Greater Invisibility');
		} else if (rand <= 8) {
			items.push('Grasping Vine');
		} else if (rand <= 10) {
			items.push('Conjure Minor Elementals');
		} else if (rand <= 12) {
			items.push('Locate Creature');
		} else if (rand <= 14) {
			items.push('Dominate Beast');
		} else if (rand <= 16) {
			items.push('Fabricate');
		} else if (rand <= 18) {
			items.push('Faithful Hound');
		} else if (rand <= 20) {
			items.push('Staggering Smite');
		} else if (rand <= 22) {
			items.push('Stoneskin');
		} else if (rand <= 24) {
			items.push('Secret Chest');
		} else if (rand <= 26) {
			items.push('Black Tentacles');
		} else if (rand <= 28) {
			items.push('Banishment');
		} else if (rand <= 30) {
			items.push('Divination');
		} else if (rand <= 32) {
			items.push('Dimension Door');
		} else if (rand <= 34) {
			items.push('Death Ward');
		} else if (rand <= 36) {
			items.push('Resilient Sphere');
		} else if (rand <= 38) {
			items.push('Freedom Of Movement');
		} else if (rand <= 40) {
			items.push('Wall Of Fire');
		} else if (rand <= 42) {
			items.push('Aura Of Purity');
		} else if (rand <= 44) {
			items.push('Blight');
		} else if (rand <= 46) {
			items.push('Ice Storm');
		} else if (rand <= 48) {
			items.push('Storm Sphere');
		} else if (rand <= 50) {
			items.push('Phantasmal Killer');
		} else if (rand <= 52) {
			items.push('Confusion');
		} else if (rand <= 54) {
			items.push('Compulsion');
		} else if (rand <= 56) {
			items.push('Guardian Of Faith');
		} else if (rand <= 58) {
			items.push('Conjure Woodland Beings');
		} else if (rand <= 60) {
			items.push('Aura Of Life');
		} else if (rand <= 62) {
			items.push('Arcane Eye');
		} else if (rand <= 64) {
			items.push('Control Water');
		} else if (rand <= 66) {
			items.push('Stone Shape');
		} else if (rand <= 68) {
			items.push('Fire Shield');
		} else if (rand <= 70) {
			items.push('Vitriolic Sphere');
		} else if (rand <= 72) {
			items.push('Polymorph');
		} else if (rand <= 74) {
			items.push('Private Sanctum');
		} else if (rand <= 76) {
			items.push('Giant Insect');
		} else if (rand <= 78) {
			items.push('Watery Sphere');
		} else {
			items.push(Spells4(1));
		}
	}
	return items.join('</li><li>');
};

var Spells5 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 2) {
			items.push('Dispel Evil And Good');
		} else if (rand <= 4) {
			items.push('Modify Memory');
		} else if (rand <= 6) {
			items.push('Creation');
		} else if (rand <= 8) {
			items.push('Destructive Wave');
		} else if (rand <= 10) {
			items.push('Cone Of Cold');
		} else if (rand <= 12) {
			items.push('Commune With Nature');
		} else if (rand <= 20) {
			items.push(Spells5(1));
		} else if (rand <= 22) {
			items.push('Antilife Shell');
		} else if (rand <= 24) {
			items.push('Scrying');
		} else if (rand <= 26) {
			items.push('Seeming');
		} else if (rand <= 28) {
			items.push('Tree Stride');
		} else if (rand <= 30) {
			items.push('Commune');
		} else if (rand <= 32) {
			items.push('Contagion');
		} else if (rand <= 34) {
			items.push('Control Winds');
		} else if (rand <= 36) {
			items.push('Telepathic Bond');
		} else if (rand <= 38) {
			items.push('Reincarnate');
		} else if (rand <= 40) {
			items.push('Telekinesis');
		} else if (rand <= 42) {
			items.push('Transmute Rock');
		} else if (rand <= 44) {
			items.push('Contact Other Plane');
		} else if (rand <= 46) {
			items.push('Conjure Volley');
		} else if (rand <= 48) {
			items.push('Dominate Person');
		} else if (rand <= 50) {
			items.push('Dream');
		} else if (rand <= 52) {
			items.push('Conjure Elemental');
		} else if (rand <= 54) {
			items.push('Animate Objects');
		} else if (rand <= 56) {
			items.push('Immolation');
		} else if (rand <= 58) {
			items.push('Banishing Smite');
		} else if (rand <= 60) {
			items.push('Awaken');
		} else if (rand <= 62) {
			items.push('Mislead');
		} else if (rand <= 64) {
			items.push('Greater Restoration');
		} else if (rand <= 66) {
			items.push('Cloudkill');
		} else if (rand <= 68) {
			items.push('Circle Of Power');
		} else if (rand <= 70) {
			items.push('Hold Monster');
		} else if (rand <= 72) {
			items.push('Teleportation Circle');
		} else if (rand <= 74) {
			items.push('Wall Of Force');
		} else if (rand <= 76) {
			items.push('Raise Dead');
		} else if (rand <= 78) {
			items.push('Planar Binding');
		} else if (rand <= 80) {
			items.push('Maelstrom');
		} else if (rand <= 82) {
			items.push('Insect Plague');
		} else if (rand <= 84) {
			items.push('Legend Lore');
		} else if (rand <= 86) {
			items.push('Wall Of Stone');
		} else if (rand <= 88) {
			items.push('Swift Quiver');
		} else if (rand <= 90) {
			items.push('Flame Strike');
		} else if (rand <= 92) {
			items.push('Arcane Hand');
		} else if (rand <= 94) {
			items.push('Hallow');
		} else if (rand <= 96) {
			items.push('Mass Cure Wounds');
		} else if (rand <= 98) {
			items.push('Geas');
		} else {
			items.push('Passwall');
		}
	}
	return items.join('</li><li>');
};

var Spells6 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 2) {
			items.push('Conjure Fey');
		} else if (rand <= 4) {
			items.push('Chain Lightning');
		} else if (rand <= 6) {
			items.push('Flesh To Stone');
		} else if (rand <= 8) {
			items.push('Circle Of Death');
		} else if (rand <= 10) {
			items.push('Wall Of Thorns');
		} else if (rand <= 12) {
			items.push('True Seeing');
		} else if (rand <= 14) {
			items.push('Wind Walk');
		} else if (rand <= 16) {
			items.push('Transport Via Plants');
		} else if (rand <= 18) {
			items.push('Sunbeam');
		} else if (rand <= 20) {
			items.push('Arcane Gate');
		} else if (rand <= 22) {
			items.push('Blade Barrier');
		} else if (rand <= 24) {
			items.push('Heal');
		} else if (rand <= 26) {
			items.push('Bones of the Earth');
		} else if (rand <= 28) {
			items.push('Magic Jar');
		} else if (rand <= 30) {
			items.push('Disintegrate');
		} else if (rand <= 32) {
			items.push('Create Undead');
		} else if (rand <= 34) {
			items.push('Investiture of Stone');
		} else if (rand <= 36) {
			items.push('Heroes Feast');
		} else if (rand <= 38) {
			items.push('Mass Suggestion');
		} else if (rand <= 40) {
			items.push('Investiture of Ice');
		} else if (rand <= 42) {
			items.push('Investiture of Flame');
		} else if (rand <= 44) {
			items.push('Freezing Sphere');
		} else if (rand <= 46) {
			items.push('Forbiddance');
		} else if (rand <= 48) {
			items.push('Globe Of Invulnerability');
		} else if (rand <= 72) {
			items.push(Spells6(1));
		} else if (rand <= 74) {
			items.push('Contingency');
		} else if (rand <= 76) {
			items.push('Irresistible Dance');
		} else if (rand <= 78) {
			items.push('Investiture of Wind');
		} else if (rand <= 80) {
			items.push('Programmed Illusion');
		} else if (rand <= 82) {
			items.push('Primordial Ward');
		} else if (rand <= 84) {
			items.push('Planar Ally');
		} else if (rand <= 86) {
			items.push('Move Earth');
		} else if (rand <= 88) {
			items.push('Wall Of Ice');
		} else if (rand <= 90) {
			items.push('Word Of Recall');
		} else if (rand <= 92) {
			items.push('Instant Summons');
		} else if (rand <= 94) {
			items.push('Guards And Wards');
		} else if (rand <= 96) {
			items.push('Harm');
		} else if (rand <= 98) {
			items.push('Eyebite');
		} else {
			items.push('Find The Path');
		}
	}
	return items.join('</li><li>');
};

var Spells7 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 4) {
			items.push('Symbol');
		} else if (rand <= 8) {
			items.push('Simulacrum');
		} else if (rand <= 12) {
			items.push('Prismatic Spray');
		} else if (rand <= 16) {
			items.push('Mirage Arcane');
		} else if (rand <= 20) {
			items.push('Plane Shift');
		} else if (rand <= 24) {
			items.push('Magnificent Mansion');
		} else if (rand <= 28) {
			items.push('Fire Storm');
		} else if (rand <= 32) {
			items.push('Forcecage');
		} else if (rand <= 36) {
			items.push('Finger Of Death');
		} else if (rand <= 40) {
			items.push('Arcane Sword');
		} else if (rand <= 44) {
			items.push('Divine Word');
		} else if (rand <= 48) {
			items.push('Etherealness');
		} else if (rand <= 52) {
			items.push('Project Image');
		} else if (rand <= 56) {
			items.push('Teleport');
		} else if (rand <= 60) {
			items.push('Whirlwind');
		} else if (rand <= 64) {
			items.push('Delayed Blast Fireball');
		} else if (rand <= 68) {
			items.push('Conjure Celestial');
		} else if (rand <= 72) {
			items.push('Sequester');
		} else if (rand <= 76) {
			items.push('Resurrection');
		} else if (rand <= 80) {
			items.push('Reverse Gravity');
		} else if (rand <= 96) {
			items.push(Spells7(1));
		} else {
			items.push('Regenerate');
		}
	}
	return items.join('</li><li>');
};

var Spells8 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 5) {
			items.push('Antimagic Field');
		} else if (rand <= 10) {
			items.push('Antipathy/sympathy');
		} else if (rand <= 15) {
			items.push('Incendiary Cloud');
		} else if (rand <= 20) {
			items.push('Feeblemind');
		} else if (rand <= 25) {
			items.push('Dominate Monster');
		} else if (rand <= 30) {
			items.push('Earthquake');
		} else if (rand <= 35) {
			items.push('Sunburst');
		} else if (rand <= 40) {
			items.push(Spells8(1));
		} else if (rand <= 45) {
			items.push('Horrid Wilting');
		} else if (rand <= 50) {
			items.push('Tsunami');
		} else if (rand <= 55) {
			items.push('Telepathy');
		} else if (rand <= 60) {
			items.push('Glibness');
		} else if (rand <= 65) {
			items.push('Maze');
		} else if (rand <= 70) {
			items.push('Animal Shapes');
		} else if (rand <= 75) {
			items.push('Holy Aura');
		} else if (rand <= 80) {
			items.push('Power Word Stun');
		} else if (rand <= 85) {
			items.push('Control Weather');
		} else if (rand <= 90) {
			items.push('Clone');
		} else if (rand <= 95) {
			items.push('Mind Blank');
		} else {
			items.push('Demiplane');
		}
	}
	return items.join('</li><li>');
};

var Spells9 = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 100);
		if (rand <= 6) {
			items.push('Prismatic Wall');
		} else if (rand <= 12) {
			items.push('Storm Of Vengeance');
		} else if (rand <= 18) {
			items.push('Mass Heal');
		} else if (rand <= 24) {
			items.push('Meteor Swarm');
		} else if (rand <= 30) {
			items.push('Power Word Heal');
		} else if (rand <= 36) {
			items.push('Gate');
		} else if (rand <= 42) {
			items.push('Time Stop');
		} else if (rand <= 48) {
			items.push('Foresight');
		} else if (rand <= 54) {
			items.push('Astral Projection');
		} else if (rand <= 60) {
			items.push('Imprisonment');
		} else if (rand <= 64) {
			items.push(Spells9(1));
		} else if (rand <= 70) {
			items.push('True Resurrection');
		} else if (rand <= 76) {
			items.push('Power Word Kill');
		} else if (rand <= 82) {
			items.push('Shapechange');
		} else if (rand <= 88) {
			items.push('Weird');
		} else if (rand <= 94) {
			items.push('Wish');
		} else {
			items.push('True Polymorph');
		}
	}
	return items.join('</li><li>');
};

var StatuesForTableG = function(n=1) {
	var items = [];
	for (var i=0; i<n; i++) {
		var rand = Roll(1, 8);
		if (rand <= 2) {
			items.push('Onyx Dog');
		} else if (rand <= 3) {
			items.push('Serpentine Owl');
		} else if (rand <= 4) {
			items.push('Marble Elephant');
		} else if (rand <= 5) {
			items.push('Golden Lions');
		} else if (rand <= 6) {
			items.push('Ivory Goats');
		} else if (rand <= 7) {
			items.push('Ebony Fly');
		} else {
			items.push('Bronze Griffon');
		}
	}
	return items.join('</li><li>');
};