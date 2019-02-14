var Roll = function(number, type) {
	var n = 0;
	for (i = 0; i < number; i++) {
		n += Math.floor(Math.random() * type) + 1;
	}
	return n;
};

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
}

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

var randomChoice = function(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
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
var items = {
  "Common": [
    {
      "Author": "Unknown",
      "Category": "Wondrous Item",
      "Description": "Three jet black spheres, about the size of an apple, that smell distinctly of cooked pastry. ",
      "Est. Value": "20. gp",
      "Name": "Pie Bombs",
      "Properties": "If thrown (or dropped) with force, each sphere will magically transform into a large pie. The subsequent effect is similar to having thrown a pie at someone, only a lot more unexpected.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A large bale of rare furs.",
      "Est. Value": "40. gp",
      "Name": "Bale of Furs",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "20 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A dried out and preserved homunculus. This one is a winged humanoid creature, similar to a small gargoyles or tiny demon. It's eye have been replaced with beads and it is stiff and unmoving.",
      "Est. Value": "20. gp",
      "Name": "Dehydrated Homunculi",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A simple silver dagger with a blood line that runs down the center of the blade to drain its victim’s blood.",
      "Est. Value": "5. gp",
      "Name": "Draining Dagger",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A thin malachite bracelet with a silver clasp.",
      "Est. Value": "6. gp",
      "Name": "Malachite Bracelet",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A 5 ft. tall book stand in maple-wood, the front of which is carved into the likeness of three intertwined foxes. ",
      "Est. Value": "6. gp",
      "Name": "Bookstand",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "30 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Bountiful Spade",
      "Properties": "1d4 Bludgeoning - Simple",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Three vicious little mollusks (1hp, Armour 1) that explode in a 2m blast (d8) when killed. ",
      "Est. Value": "",
      "Name": "Dire Barnacle",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "This gem normally looks like quartz, but if allowed to absorb heat will change in color to resemble a bright orange garnet. When smashed against something, it is drained of color and will light that thing on fire",
      "Est. Value": "",
      "Name": "Firestone Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An age-worn ivory figurine, which, nonetheless, bears an uncanny resemblance to a young woman the characters have just met.",
      "Est. Value": "",
      "Name": "Mysterious Ivory Figurine",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A foot-high bronze statuette of a pair of entwined nymphs, dancing.",
      "Est. Value": "8. gp",
      "Name": "Nymph Statuette",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An old boot filled with chunks/flakes of silver-bearing quartz ore.",
      "Est. Value": "50. gp",
      "Name": "Old Boot",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An unhafted axe head of exceptional craftsmanship. It’s faces are inlaid with a faience scene showing a crowd of human villagers throwing a Halfling down a well.",
      "Est. Value": "50. gp",
      "Name": "Ornate Axe Head",
      "Properties": "1d6 Slashing - Simple - Light, Thrown - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An ivory and copper smoking pipe with stale tobacco inside.",
      "Est. Value": "4. gp",
      "Name": "Ornate Smoking Pipe",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A wooden leg, carved to appear as a standing leopard with green agate eyes. (Agates: 4gp each; the whole leg, with eyes: 10gp)",
      "Est. Value": "10. gp",
      "Name": "Ornate Wooden Leg",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "'Phoenix Egg' from a peddler in the City of Brass. After consulting with a few scholars, he later found that (at least in my world lore) Phoenixes are born of primal energy and not hatched, and that he had in fact purchased a very large jar of Alchemist's Fire.",
      "Est. Value": "",
      "Name": "Phoenix Egg",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A piglet.",
      "Est. Value": "",
      "Name": "Piglet",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Refillable curved poison dagger",
      "Est. Value": "",
      "Name": "Poison Dagger",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Pouch of poisoned throwing needles (see dagger damage & dart range)",
      "Est. Value": "",
      "Name": "Poisoned Throwing Needles",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "A large, leather-bound tome has a large illustrated potion vial stitched into the front cover. Above the illustration, written in Dwarven is the title; 'The Art of Potionmaking'. Further examination reveals this to be a comprehensive guide to potionmaking written by a Dwarf called Zygmunt Brigge.",
      "Est. Value": "20. gp",
      "Name": "'The Art of Potionmaking' by Zygmunt Brigge",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Dwarven",
      "Weight": "1 lb"
    },
    {
      "Author": "Baldur's Gate",
      "Category": "Treasure",
      "Description": "A necklace patterened with Agni Mani. These ornamental stones were usually found in desert regions. In the Realms, the name applies specifically only to black tektite material. ",
      "Est. Value": "20. gp",
      "Name": "Agni Mani Necklace",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "A detailed account of an adventurer who lived in an Kobold tribe for a number of years. You get a sense that there may have been some embellishment at some points, but it is otherwise an interesting examination of their general nature.",
      "Est. Value": "10. gp",
      "Name": "Among the Kobolds",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Book",
      "Description": "A tome whose pages have been yellowed with age and used to press metallic leaves of gold, silver, platinum, brass, copper, and bronze.",
      "Est. Value": "20. gp",
      "Name": "Ancient Tome",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A thick copper necklace set with a small aquamarine. ",
      "Est. Value": "7. gp",
      "Name": "Aquamarine Necklace",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "A sheepskin bedroll.",
      "Est. Value": "1. gp",
      "Name": "Bedroll",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "7 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This dark red-brown heliotrope can sometimes be mistaken for a Stone of Invisibility but this one bears no overt magical powers.",
      "Est. Value": "50. gp",
      "Name": "Bloodstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "The bonesaw was used to amputate body parts after the skin had already been cut through with the amputation knife.",
      "Est. Value": "15. gp",
      "Name": "Bonesaw",
      "Properties": "1d8 Slashing | Finesse",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "8 lb"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "This peculiar spear-like weapon is popular among travelers and law enforcement. The brandistock's three-pronged head is retractable, which renders it indistinguishable from a quarterstaff (unless closely inspected). Extending the blades is instantaneous, but pulling them back requires you to spend an action. ",
      "Est. Value": "10. gp",
      "Name": "Brandistock",
      "Properties": "1d8 Piercing, Special, Two-Handed",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A brass chamber pot in which has been hidden 3 pieces of rosy quartz.",
      "Est. Value": "12. gp",
      "Name": "Brass Chamber Pot",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "A set of brass knuckles. Used, but in good condition.",
      "Est. Value": "0.5 gp",
      "Name": "Brass Knuckles",
      "Properties": "1d4 Bludgeoning, Light, Hidden",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Armor",
      "Description": "A tower shield of bronze, cast into the likeness of a chimera’s heads and enameled to provide the appropriate colors. +3 AC, Strength 17, Stealth Disadvantage.",
      "Est. Value": "85. gp",
      "Name": "Bronze Tower Shield",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "18 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This is an opaque orange gemstone set in a small brooch.",
      "Est. Value": "50. gp",
      "Name": "Carnelian Gemstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "An old pyromancy tome from Carthus containing pyromancies crafted for battle. It gives the impression it might have fallen through from a different plane of existence.",
      "Est. Value": "25. gp",
      "Name": "Carthus Tome of Pyromancy",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A carved wooden mantle, meant to be mounted above a fireplace, crafted of ash-wood and stained a medium brown. The left side is carved in images of demons and flames, the right in images of angels and air. The top is carved into an idyllic forest theme and has a moon above the left corner and a sun above the right.",
      "Est. Value": "65. gp",
      "Name": "Carved Wooden Mantle",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "100 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An electrum pendant shaped like a curled-up cat.",
      "Est. Value": "6. gp",
      "Name": "Cat Pendant",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "A reinforced gauntlet which protects the knuckles and transforms mere punches into lethal blows. This weapon cannot be disarmed. It takes an action to don or doff a cestus.",
      "Est. Value": "0.5 gp",
      "Name": "Cestus",
      "Properties": "1d4 Bludgeoning - Light, Special, Hidden",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This pale white gemstone has a waxy luster and is slightly translucent.   ",
      "Est. Value": "50. gp",
      "Name": "Chalcedony Gemstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A dozen chicken eggs; hollowed out and filled with white flour.",
      "Est. Value": "0.6 gp",
      "Name": "Chicken Eggs",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Rabbit-fur mittens and hat sized for a child.",
      "Est. Value": "1. gp",
      "Name": "Child's Mittens and Hat",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An apple-green gemstone consisting of a variety of chalcedony that contains nickel.",
      "Est. Value": "50. gp",
      "Name": "Chrysoprase Gemstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This golden gem has been expertly worked into an oval but has long since fallen out of whatever ring or brooch it was carved for.",
      "Est. Value": "50. gp",
      "Name": "Citrine Gemstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A leather bag containing an embroidered black silk shirt with eight silver buttons.",
      "Est. Value": "8. gp",
      "Name": "Classy Shirt",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A leather vest with climbing gear: 12 iron pitons, a hammer, 50’ of silk rope, a grappling hook, a set of bronze crampons, thick leather gloves, and a leather harness seat..",
      "Est. Value": "32. gp",
      "Name": "Climbing Harness",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "10 lbs."
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A cloak of griffon feathers set on black velvet.",
      "Est. Value": "60. gp",
      "Name": "Cloak of Griffon Feathers",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "5 lbs."
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A child’s cloth doll with a small silver brooch pinned to it in the shape of a butterfly.",
      "Est. Value": "4. gp",
      "Name": "Cloth Doll",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A small cask of yellow clothiers’ dye.",
      "Est. Value": "8. gp",
      "Name": "Clothier's Dye",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A life-sized copper and silver statuette of a cockatrice.",
      "Est. Value": "17. gp",
      "Name": "Cockatrice Statue",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "10 lbs."
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "This book appears to be a phrasebook for those looking to learn the basics of the Orcish language. It has an entire section of swear words, which is most amusing. The book seems to have an effect on anyone using the phrase book to speak in Black Speech. They become prone to shouting louder and louder the less they are understood. Nobody knows why this is; the book is not magical in the slightest.",
      "Est. Value": "10. gp",
      "Name": "Colloquial Black Speech for Orcs, Trolls and Men",
      "Properties": "Enables the reader to speak basic Orcish phrases.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Four bars of copper.",
      "Est. Value": "8. gp",
      "Name": "Copper Bars",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A copper necklace set with a small amulet shaped into a symbol representing the sun.",
      "Est. Value": "2. gp",
      "Name": "Copper Necklace",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A copper tongue scraper",
      "Est. Value": "4. gp",
      "Name": "Copper Tongue Scraper",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A cow. It's a real hoofer.",
      "Est. Value": "10. gp",
      "Name": "Cow",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1500 lbs."
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large crystal vase, silver trimmed, with a dozen dead roses and some stagnant water within.",
      "Est. Value": "15. gp",
      "Name": "Crystal Vase",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "1d20 normal bone darts. They resemble fletched knitting needles, about 1 foot in length. Not used often by themselves, but rather as ammunition in a blowgun. Can be dipped in poison and used as an effective delivery device.",
      "Est. Value": "0.8 gp",
      "Name": "Dart",
      "Properties": "Finesse, Undersized, Thrown (30/60)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1/4 lb"
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "The skeletal remains of a long-dead warrior, wearing a suit of plate armor which still glistens as if it had been polished yesterday. The name of every warrior to ever don the armor has been inscribed upon the front and back of the chest plate, covering nearly every inch of its surface with precisely written, black runes. A careful inspection of the armor will reveal that there remains room for one last name.",
      "Est. Value": "",
      "Name": "Dead Warrior",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "80 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "The remnants of a massive door of stone which has been smashed into rubble. A magic mouth which had once adorned the door remains intact. As the PCs draw near it will issue its warning: “Disturb not this chamber, lest the world suffer.” Whatever the mouth was set to guard is gone – the chamber beyond the broken door is empty.",
      "Est. Value": "",
      "Name": "Door Rubble",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "The double spear is a polearm comprising of a wooden haft with a short thrusting blade at either end. It can be used in one or two hands like a spear, but in the hands of a master both heads can be used effectively. If you use the Double Weapon Master feat to make an additional attack with a double spear, it deals 1d6 piercing damage. ",
      "Est. Value": "5. gp",
      "Name": "Double Spear",
      "Properties": "1d6 Piercing - Thrown (20/60), Versatile (1d8)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A battle pennant, triangular in shape, of a black dragon on red silk. The staff is a silver-tipped lance. (Pennant: 30gp, Lance: 25gp)",
      "Est. Value": "55. gp",
      "Name": "Dragon Banner",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Shield",
      "Description": "A large copper shield, embossed with a copper dragon’s head. “Elvalynte” is inscribed on the interior in a flowing script. (34gp)",
      "Est. Value": "",
      "Name": "Dragon Head Shield",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An electrum drow house-medallion bearing the image of a crimson scorpion with the house name inscribed on the back in the drow tongue (House Ulrather).",
      "Est. Value": "20. gp",
      "Name": "Drow Medallion",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A finely crafted compass of gold and silver, decorated and labelled with ornate, dwarven and draconic runes. Once every 1d4 hours it randomly changes the cardinal direction to which its arrow points.",
      "Est. Value": "",
      "Name": "Dwarven Compass",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A dwarven holy symbol in silver; shaped into a flaming war-hammer set against an anvil-shaped backdrop. ",
      "Est. Value": "55. gp",
      "Name": "Dwarven Holy Symbol",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A prismatic crystal which echoes back – in a deep, melodious voice – every word which is said around it two seconds after it has been said.",
      "Est. Value": "",
      "Name": "Echo Crystal",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A detailed rose, with petals and thorns, constructed of silver and electrum.",
      "Est. Value": "40. gp",
      "Name": "Electrum Rose",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large (18”x28”), rectangular electrum sheet with ancient writing on it. The writing, if deciphered, is a brief history of a powerful magical item known as the House of Winds, with several clues as to where the item may have been lost fourteen hundred years ago. The House of Winds is described as an ornate mithril helm of legendary power.",
      "Est. Value": "75. gp",
      "Name": "Electrum Sheet",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "115 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A collection of six elephant tusks.",
      "Est. Value": "64. gp",
      "Name": "Elephant Tusks",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "14 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A small wooden case holding four pairs of fairy wings.",
      "Est. Value": "20. gp",
      "Name": "Fairy Wing Cage",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large, ornate field tent such as a lord would have, room for 12 persons",
      "Est. Value": "",
      "Name": "Field Tent",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Fire Agate is the name given to chalcedony which contains thin lines of iridescent goethite. When properly cut, the iridescence displays red, brown, gold, and green hues, and the finest specimens are partly translucent. ",
      "Est. Value": "30. gp",
      "Name": "Fire Agate Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A bandolier holding 8 silver flasks (empty (x3), brandy (x2), acid (x1), ogre blood (x1), gold dust (x1, value of gold: 12gp). (Flasks: 3gp each, bandolier: 5gp, ogre blood (to alchemist): 12gp, acid: 10gp, brandy: ",
      "Est. Value": "12. gp",
      "Name": "Flask Bandolier",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "Utility belt of flasks",
      "Est. Value": "",
      "Name": "Flask Belt",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "A ceremonial short spear; ash wood with an iron point. Seven red and three blue dyed vulture feathers are attached to the head of the spear. The iron is fluted to whistle through the air, if thrown.",
      "Est. Value": "3. gp",
      "Name": "Fluted Short Spear",
      "Properties": "1d6 Piercing - Simple - Thrown, Versatile (1d8) - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A life sized ivory carving of a chicken.",
      "Est. Value": "20. gp",
      "Name": "Foul Ivory Statue",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A frost giant necklace of silver upon which are pierced 17 human-sized hands. All of them appear to be the right hand of their former owner.",
      "Est. Value": "55. gp",
      "Name": "Frost Giant's Necklace",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "A heavy cast iron frying pan. This can be used for frying, searing, browning and whacking people over the head! It has the remnants of this morning's breakfast smeared around it's rim. Damage is doubled when wielder has proficiency with cooking.",
      "Est. Value": "0.1 gp",
      "Name": "Frying Pan",
      "Properties": "1d6 Bludgeoning - Versatile ",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A wicker basket with a pair of mink furs within.",
      "Est. Value": "20. gp",
      "Name": "Fur Basket",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A small colored-glass window pane depicting the crowning of the first king.",
      "Est. Value": "10. gp",
      "Name": "Glass Window",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A miniature crystal – small enough to lie upon the outstretched finger of a halfling child – glows softly, and pulses whenever an object colored red is brought near.",
      "Est. Value": "",
      "Name": "Glowing Crystal",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An eight inch golden horn, likely more of a ceremonial object than of any real value as an instrument.",
      "Est. Value": "70. gp",
      "Name": "Golden Horn",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A roughly beaten golden orb, roughly 10 inches in diameter. The orb is etched with the likeness of an orcish skull with an axe embedded in it. This was used by an orcish chieftain as his “royal orb”.",
      "Est. Value": "72. gp",
      "Name": "Golden Orb",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A golden signet ring, origin unknown.",
      "Est. Value": "60. gp",
      "Name": "Golden Signet Ring",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A grandfather’s broadsword, plain but quality. An unknown script runs along the inner side of the scabbard.",
      "Est. Value": "20. gp",
      "Name": "Grandfather's Broadsword",
      "Properties": "2d4 Piercing",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "This mighty spear is favoured by centaurs.",
      "Est. Value": "75. gp",
      "Name": "Great Spear",
      "Properties": "1d8 Piercing - Oversized (1d10), Thrown (20/60), Two-Handed",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "8 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A simple hand axe and belt sheath. The axehead is inlaid with dwarvish runes which reference the high quality of items made by Tomu Aethmalk, the blacksmith who crafted the axe.",
      "Est. Value": "5. gp",
      "Name": "Dwarven Hand Axe",
      "Properties": "1d6 Slashing - Simple - Light, Thrown - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Silver hand sized harp",
      "Est. Value": "",
      "Name": "Hand Harp",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A hand-fan of clipped, black-dyed harpy feathers bound with copper wiring.",
      "Est. Value": "15. gp",
      "Name": "Harpy Feather Fan",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Potpourri with demon blood – invigorating & entrancing",
      "Est. Value": "",
      "Name": "Hell Scented Potpourri",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Seven lengths of extremely thick, 30’ long, hemp rope, such as that used for catapults.",
      "Est. Value": "35. gp",
      "Name": "Hemp Rope",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Concealed punching dagger-bracer",
      "Est. Value": "200. gp",
      "Name": "Hidden Blade Bracer",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60  When you attack and hit a creature that is surprised with this dagger, it must make a Constitution saving throw DC 18. On a failed save, the target takes an extra 2d4 damage from your attack.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "A dozen quality daggers in a rolled up rug.",
      "Est. Value": "24. gp",
      "Name": "Hidden Daggers",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A broken holy sword, inscribed with the name of a legendary Paladin.",
      "Est. Value": "20. gp",
      "Name": "Holy Sword of Pentorus",
      "Properties": "1d8 Slashing - Versatile (1d10)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "The holy symbol of a god long thought dead and gone.",
      "Est. Value": "",
      "Name": "Holy Symbol",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Potion",
      "Description": "Three vials of holy water.",
      "Est. Value": "25. gp",
      "Name": "Holy Water",
      "Properties": "See PHB page ",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "BGII",
      "Category": "Book",
      "Description": "This book peddles a philosophy of personal ascendancy and manipulation by charisma alone. The authors and advocates of such tomes claim that, by drawing on the most recent theories in sociology and interpersonal psychology, it is possible to raise an individual's charisma by a single point. They're wrong, that can only be done by magic, but what you read is your own.",
      "Est. Value": "10. gp",
      "Name": "How to Win Friends and Influence People",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Iol is actually short for Iolite (cordierite), although a common nickname is 'violet stone' even though its overall hue is usually blue. Iols are usually cut into faceted gems to best display the stone's color change as it is viewed from different directions. Small, cut iols can be clear, but larger specimens usually contain silky inclusions of another substance such as hemitite crystals, which give the same rich golden flash of color as in sunstones. ",
      "Est. Value": "50. gp",
      "Name": "Iol Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Potion",
      "Description": "An iron flask holding a viscous liquid of intense, emerald-green that smells faintly of citrus fruit. The liquid is a concentrated, magical dye for clothing and the like, equal to four full barrels of normal dye. If consumed, it turns the drinker green for a full month.",
      "Est. Value": "65. gp",
      "Name": "Iron Flask",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A lovely ivory-colored dress of silk with flowing sleeves. The dress has tiny pearls sewn at the neckline.",
      "Est. Value": "70. gp",
      "Name": "Ivory Dress",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A small sack containing 32 carved ivory mice",
      "Est. Value": "",
      "Name": "Ivory Mice",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A decorative fountain, crafted elegantly from a single block of jade and decorated with gold leaf, in which the water flows in the wrong direction.",
      "Est. Value": "",
      "Name": "Jade Fountain",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A small, white jade pendant without necklace. The pendant depicts a unicorn rampant with a cracked back leg.",
      "Est. Value": "10. gp",
      "Name": "Jade Pendant",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "A small steel shield, triangular, emblazoned with a griffon device in red on a field of gray. This battered shield is inscribed on the interior with the words: “May this shield be your protection in battle, Jallak. Honor the Galbrand name.”",
      "Est. Value": "7. gp",
      "Name": "Jallak's Shield",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Baldur's Gate",
      "Category": "Treasure",
      "Description": "Jasper is an opaque quartz found in reds, browns, and blacks. Very rare specimens are blue or have bands of blue against the other colours. Jasper can be crushed and used in making potions and magical devices which protect against poison. ",
      "Est. Value": "50. gp",
      "Name": "Jasper Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A 6’ stack of 1” x 8” x 12’ planks of rare, scented jewel wood",
      "Est. Value": "",
      "Name": "Jewel Wood",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PlatypusPal",
      "Category": "Book",
      "Description": "A large tome filled with over one hundred recipes for wild boar, goose, and venison; written by Kilan Wester, a former royal chef (retired).",
      "Est. Value": "95. gp",
      "Name": "Kilan Wester's Royal Recipes",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "Knife vest – holds 1d12 knives!",
      "Est. Value": "",
      "Name": "Knife Vest",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large (36” diameter) bronze bell.",
      "Est. Value": "10. gp",
      "Name": "Large Bronze Bell",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A leather bag containing 6 green dragon scales (young adult).",
      "Est. Value": "30. gp",
      "Name": "Leather Bag of Dragon Scales",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Pulsating organ of leviathan (is sack/cloth)",
      "Est. Value": "",
      "Name": "Leviathan Organ",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "A large tome which details advanced techniques in the field of potion making. It's dust cover is a little tatty but the pages inside have kept well and it still has plenty of life left in it.",
      "Est. Value": "30. gp",
      "Name": "Libatius Borage's Advanced Potion Making",
      "Properties": "Grants advantage to Alchemy checks.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Fossilized skull of lich-arcane power source",
      "Est. Value": "",
      "Name": "Lich Skull",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large bronze wardrobe, banded in steel, which contains Violet Fungi (hp 15) and a human body with rotting noble’s clothing, a rusty dagger, and a thin platinum bracelet set with a moonstone. ",
      "Est. Value": "75. gp",
      "Name": "Malivar's Wardrobe",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "This tome has been bound in iron plates, giving the sense that it could take a real beating if needed. It's been well kept, however, and inscribed in the front is the title, 'Mallius Metallius' with the subtitle, 'A Layman's Guide to Metallurgy'.",
      "Est. Value": "30. gp",
      "Name": "Mallius Metallius, A Layman's Guide to Metallurgy",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Quest Hook",
      "Description": "A sword of truly mammoth proportions. Resting within a chamber more than thirty meters long, the sword stretches from one end to the other. Whatever creature was meant to wield this mighty weapon would truly stagger the imagination of a dragon.",
      "Est. Value": "0. gp",
      "Name": "Mammoth Sword",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "20000 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A mithril-headed branding-iron bearing the sigil of the Manticora Trading House.",
      "Est. Value": "100. gp",
      "Name": "Manticora Branding Iron",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "BGII",
      "Category": "Book",
      "Description": "A typical manual of bodily health provides the reader with valuable information regarding preventative medicine, basic first aid, and proper muscle toning.",
      "Est. Value": "10. gp",
      "Name": "Manual of Bodily Health",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "BGII",
      "Category": "Book",
      "Description": "A typical Manual of Gainful Exercise provides the reader with a strictly regimented routine of daily stretches and tests designed to increase muscle bulk. ",
      "Est. Value": "10. gp",
      "Name": "Manual of Gainful Exercise",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "BGII",
      "Category": "Book",
      "Description": "A typical manual of quickness of action provides the reader with a wide variety of tips and pointers regarding the motion and coordination of one's hands and feet. This small tome is much in demand by people from many walks of life, including rogues wishing to improve their slight-of-hand and paladins wanting to perfect their thrust and parry. ",
      "Est. Value": "10. gp",
      "Name": "Manual of Quickness of Action",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A masquerade mask crafted of leather and peacock feathers.",
      "Est. Value": "12. gp",
      "Name": "Masquerade Mask",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "With an elegant hinged case of black onyx, the characters find a set of masterwork gaming darts. Although useless for combat, the darts will give a +2 skill check bonus to anyone using them to play a game of darts (due to their superb balance and construction).",
      "Est. Value": "",
      "Name": "Masterwork Gaming Darts",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Within a wooden box carved with pastoral scenes lies a leather purse, and within the purse are a handful of seeds. If these seeds are planted, they will take root and grow into plants of unnatural shape, hue, and life unlike anything seen upon this world, and operating by utterly alien principles.",
      "Est. Value": "100. gp",
      "Name": "Matroshka Seeds",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A cabinet containing 24 glass jars of various medicinal herbs",
      "Est. Value": "60. gp",
      "Name": "Medicinal Herbs",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "2 oz bottle of mineral oil",
      "Est. Value": "4. gp",
      "Name": "Mineral Oil",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Moonstone is an opaque, white feldspar gem polished to a bluish sheen. Old legends say that the sight of a moonstone would cause a lycanthrope to revert to his animal form. Whether or not this is true is unknown as anyone close enough to find out apparently hasn't lived to tell the tale. However moonstones have been used in spells that effect this particular curse. ",
      "Est. Value": "50. gp",
      "Name": "Moonstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A dagger sheath of bronze, set with a small moonstone.",
      "Est. Value": "10. gp",
      "Name": "Moonstone Sheath",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Book",
      "Description": "A bestiary!",
      "Est. Value": "2. gp",
      "Name": "Moradin's Magical Bestiary",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Dwarven",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This gemstone has opaque bands of black and white across it's surface.",
      "Est. Value": "50. gp",
      "Name": "Onyx Gemstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Orb of venom-Applies to all of user attacks. Target takes an additional 1d4 poison damage on their next turn.",
      "Est. Value": "",
      "Name": "Orb Of Venom",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "BGII",
      "Category": "Book",
      "Description": "This appears to be a cookbook written by an unnamed Orc. It has some insightful notes on how best to cook Owlbear and a rather unpleasant section on what spices go well with human flesh. ",
      "Est. Value": "5. gp",
      "Name": "Orcish Cookbook",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Orc",
      "Weight": "2 lb"
    },
    {
      "Author": "PHB",
      "Category": "Potion",
      "Description": "A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points. Drinking or administering a potion takes an action. ",
      "Est. Value": "50. gp",
      "Name": "Potion of Healing",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "A cloth or leather pouch that can hold up to 20 sling bullets or 50 blowgun needles, among other things. ",
      "Est. Value": "0.5 gp",
      "Name": "Pouch",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Potion",
      "Description": "A large carry pouch made from the skin of a monkey. Inside are 1d6 Potions of Healing. ",
      "Est. Value": "50. gp",
      "Name": "Pouch of Healing Potions",
      "Properties": "You regain 2d4 + 2 hit points when you drink these potions. The potion's red liquid glimmers when agitated.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Bands of white-yellow sard cross the surface of this dark onyx gemstone.",
      "Est. Value": "50. gp",
      "Name": "Sardonyx Gemstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "This weapon is inspired by the common farming implement used to cut swaths of grown hay, but it has a straight handle and a heavier blade. Despite its humble origins, the scythe is recognized as a symbol of death in many cultures because of its use in reaping. ",
      "Est. Value": "0.5 gp",
      "Name": "Scythe",
      "Properties": "2d4 Slashing - Heavy, Two-Handed",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "A relatively small compendium of information about healing tonics.",
      "Est. Value": "20. gp",
      "Name": "Seimai's Guide to Healing Tonics",
      "Properties": "Grants advantage to Medicine checks.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Shandon is another name for natrolite; its slender, colorless crystals yield tiny faceted gems used often in veils and robes in order to capture the beading effect of water glistening upon the material. ",
      "Est. Value": "90. gp",
      "Name": "Shandon Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Skydrop is the common name given to clear or lightly colored tektite material; fragments of glass of celestial (meteoric) origin, found in the vast shifting sands of Anauroch and other deserts. ",
      "Est. Value": "40. gp",
      "Name": "Skydrop Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "A spade is a simple tool designed for digging soil, the head can be made of any material that can hold its shape, but is most frequently made of metal to facilitate cutting into soil. ",
      "Est. Value": "2gp",
      "Name": "Spade",
      "Properties": "1d4 Bludgeoning - Simple",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Star Diopside is the most prized form of a hard, durable gemstone that is rarely found in attractive colours. It is usually too dark for beauty, however mountain and streambed-pebble crystals of a pale green hue make attractive stones such as diopside. When a gem is found that is darker green it can be cut in such a fashion so to produce four- or six-rayed stars. ",
      "Est. Value": "95. gp",
      "Name": "Star Diopside Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This gemstone is a polished pink sphere. When viewed at a specific angle with a source of light an asterism (star-effect) is visible across it's surface. ",
      "Est. Value": "50. gp",
      "Name": "Star Rose Quartz",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Sunstone is a feldspar jem, closely related to moonstone, and more properly known as oligoclase. Sunstone can be colorless or faintly greenish and of facet grade, but most common by far is its softer (cabochon) variety. This yields gemstones that have bright red or orange spangles (minute crystals) suspended in a nearly colorless background in a parallel fashion, giving the whole a rich golden or redish brown color. ",
      "Est. Value": "50. gp",
      "Name": "Sunstone Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Tchazar is the common name given to aragonite, a straw-yellow gemstone found in elongated, prism-shaped crystal form. It is soft and fragile, and requires skilled cutting to yield faceted gems.. ",
      "Est. Value": "50. gp",
      "Name": "Tchazar Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "BGII",
      "Category": "Book",
      "Description": "The Recipes and Ruminations of One Dradeel of Tethir is a book with food recipes from Dradeel. Even a casual look will inform the reader that he was a wizard with an addled mind.",
      "Est. Value": "10. gp",
      "Name": "The Recipes and Ruminations of One Dradeel of Tethir",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "This tatty old tome is missing a number of pages, leaving whatever the third rule of Poisoncraft was completely unknown. Hopefully you'll manage with the first two, unlike whomever owned this book before you.",
      "Est. Value": "40. gp",
      "Name": "The Three Rules to Poisoncraft",
      "Properties": "Grants advantage to Alchemy checks.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A small cedar cask of dwarven pipe tobacco.",
      "Est. Value": "25. gp",
      "Name": "Tobacco Cask",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "BGII",
      "Category": "Book",
      "Description": "A typical Tome of Clear Thought contains a collection of esoteric and scholarly literature, often involving obscure mathematical or algebraic formulae or the occasional reference to inter-planar biology..",
      "Est. Value": "40. gp",
      "Name": "Tome of Clear Thought",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "BGII",
      "Category": "Book",
      "Description": "A typical Tome of Understanding contains a sober, if dry analysis of legal battles, historic events, government policies, philosophical treatises and theories of magic and metaphysics.",
      "Est. Value": "10. gp",
      "Name": "Tome of Understanding",
      "Properties": "Grants advantage to History checks.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A delicate silver chain set with a tourmaline.",
      "Est. Value": "28. gp",
      "Name": "Tourmaline Chain",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "This gemstone has not yet been finished, but even in its unpolished state it's bright cyan gleam is arresting to the eye.",
      "Est. Value": "35. gp",
      "Name": "Unfinished Zircon Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A tattered, and sadly unusable, scroll fragment, inscribed with a spell unknown to any living mage.",
      "Est. Value": "5. gp",
      "Name": "Unusable Scroll",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A five gallon cask of usk brandy.",
      "Est. Value": "80. gp",
      "Name": "Usk Brandy",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "A creature that drinks this vial of liquid gains advantage on saving throws against poison for 1 hour. It confers no benefit to undead or constructs. ",
      "Est. Value": "50. gp",
      "Name": "Vial of Antitoxin",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Waterstar is also called achroite or colourless tourmaline and is rare in the Realms. This stone is riddled with flaws and inclusions and hence only a small portion is fit for cutting. ",
      "Est. Value": "80. gp",
      "Name": "Waterstar Gem",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Mundane",
      "Description": "A set of wooden wind chimes which plays a different tune depending upon the direction of the wind which disturbs it.",
      "Est. Value": "0.5 gp",
      "Name": "Wooden Wind Chimes",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Ziose is the name given by sages to a particular facet-grade variety of ziosite; a rare mineral that yields cut stones that flash three vivid hues depending on how the light catches them; purple, blue, and red, or purple, green, and red. Very large (fist- or foot-sized) gems are found and are prized for use in pendants and brooches. ",
      "Est. Value": "60. gp",
      "Name": "Ziose Gemstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Zircon is a brownish crystal found in igneous (volcanic) rocks. Zircon attains its pale blue shade with heating and cutting (usually facet-cut). ",
      "Est. Value": "50. gp",
      "Name": "Zircon Gemstone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "A silver-headed heavy mace, the head of which is shaped into the likeness of a ram’s head.",
      "Est. Value": "90. gp",
      "Name": "Ram's Head Mace",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "6 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Random monster taxidermy",
      "Est. Value": "",
      "Name": "Random Monster Taxidermy",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A life-size basalt statue of a raven.",
      "Est. Value": "25. gp",
      "Name": "Raven Statue",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A 3’ square replica of a castle, in wood, complete with ramparts and miniature ballistae and toy soldiers. Scribbled in some spots are notes written in draconic that suggest a plan to assault the castle (“Kill guard here first”, “Murder holes overhead”, Fireball this area”, etc…)",
      "Est. Value": "65. gp",
      "Name": "Replica Castle",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "120 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Reversible, finely crafted robes",
      "Est. Value": "",
      "Name": "Reversible Robes",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Adventuring Gear",
      "Description": "This large sledge hammer has been cast entirely out of steel. There is a small symbol of a rat moulded into the hammer head, above Dwarvish lettering that indicates the weight.",
      "Est. Value": "2. gp",
      "Name": "Sledge Hammer",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A simple steel dagger with an oak handle and matching leather sheath.",
      "Est. Value": "2. gp",
      "Name": "Dagger",
      "Properties": "1d4 Piercing - Simple - Finesse, Light, Thrown - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A huge wooden greatclub, made from an old oak branch that has been carved and sanded into the shape of a large nail, with the narrower end wrapped in leather as a crude handle.",
      "Est. Value": "0.2 gp",
      "Name": "Greatclub",
      "Properties": "1d8 Bludgeoning - Simple - Two-Handed",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A straight wooden handle with a basic steel axe head on one end. It has been balanced well enough to use as a throwing axe.",
      "Est. Value": "5. gp",
      "Name": "Handaxe",
      "Properties": "1d6 Slashing - Simple - Light, Thrown - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A long thin shaft armed with a leaf-shaped head. It has a tassled based, to allow the javelineer to retrieve it after it has been thrown.",
      "Est. Value": "0.5 gp",
      "Name": "Javelin",
      "Properties": "1d6 Piercing - Simple - Thrown - Range: 30/120",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A small sledge hammer with a haft made of wood about one and a half feet long.",
      "Est. Value": "2. gp",
      "Name": "Light Hammer",
      "Properties": "1d4 Bludgeoning - Simple - Light, Thrown - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "This mace is essentially just a wooden shaft with a flanged iron head mounted on the end.",
      "Est. Value": "5. gp",
      "Name": "Mace",
      "Properties": "1d6 Bludgeoning - Simple",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "One of man's earliest weapons, dating back to the most primitive of times. A simple wooden pole with a steel spearhead on the end.",
      "Est. Value": "1. gp",
      "Name": "Spear",
      "Properties": "1d6 Piercing - Simple - Thrown, Versatile (1d8) - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A simple handaxe made from a smooth tree branch and a sharp piece of knapped flint. ",
      "Est. Value": "0.8 gp",
      "Name": "Primitive Hand Axe",
      "Properties": "1d4 Slashing - Simple - Light, Thrown - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A woodcutter's tool of choice for felling trees. Its formidable weight and uneven balancing make it a slow, inefficient weapon.",
      "Est. Value": "1. gp",
      "Name": "Woodcutter's Axe",
      "Properties": "1d10 Slashing - Simple - Heavy, Two-Handed",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "7 lb"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "A round glass container filled with a clear liquid. It has a paper label indicating in common that it contains acid, and to warning not to accidentally break the glass.",
      "Est. Value": "25. gp",
      "Name": "Acid (Vial)",
      "Properties": "See PHB page 148.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Adventuring Gear",
      "Description": "A basic wooden abacus, designed for merchants and treasurers. It comes with a simple latched case to protect the counting beads from damage. ",
      "Est. Value": "2. gp",
      "Name": "Abacus",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "PHB",
      "Category": "Weapon",
      "Description": "An ash crossbow with a wooden shaft. This crossbow has been designed for smaller, foot long bolts, and is a comfortable ranged weapon for any sized creature.",
      "Est. Value": "25. gp",
      "Name": "Light Crossbow",
      "Properties": "1d8 Piercing - Loading, Two-Handed - Ammunition (Range: 80/320)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "PHB",
      "Category": "Weapon",
      "Description": "A small, easy to conceal missile weapon. They might not do a lot of damage on their own but when your opponent has three of these embedded in their face before they can get within 10 feet of you they might reconsider the fight.",
      "Est. Value": "0.05 gp",
      "Name": "Dart",
      "Properties": "1d4 Piercing - Finesse - Thrown (Range: 20/60)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1/4 lb"
    },
    {
      "Author": "PHB",
      "Category": "Weapon",
      "Description": "A small bow used by travelers and adventurers alike for protection. It doesn't do a lot of damage, but it can be used to attack foes from a distance.",
      "Est. Value": "25. gp",
      "Name": "Shortbow",
      "Properties": "1d6 Piercing - Two-Handed, Ammunition (Range: 80/320)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "PHB",
      "Category": "Weapon",
      "Description": "A basic a leather strap with a pouch for holding the missile. The weapon is held by both ends of the strap and twirled around the wielder's head. Note: Always be careful not to knock yourself out.",
      "Est. Value": "0.1 gp",
      "Name": "Sling",
      "Properties": "1d4 Bludgeoning - Ammunition (Range: 30/120)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "The legendary sword once owned by the Goblin hero 'Stink', who was also known as the 'Hero of Thyme' after he slew a greedy Human merchant and stole a wagon of expensive cooking spices. The sword itself appears to be ornate and magical in nature from afar, but when handled it is clear that it is simply a clever replica made out of gypsum and mud that has been painted.",
      "Est. Value": "100. gp",
      "Name": "The Plaster Sword",
      "Properties": "Due to it's storied history, the sword provides a +2 on any charisma based check when dealing with Goblins. If any attempt to use the sword as a weapon is made, it will break and can not be repaired.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "This throwing weapon was originally used by forest-dwelling Orcs to hunt game. Its unique shape allows it to return after being thrown.",
      "Est. Value": "1. gp",
      "Name": "Boomerang",
      "Properties": "1d4 Bludgeoning - Thrown (Range: 30/90) Special: Does not require direct line of sight, due to a curved trajectory.  If the attack misses, the weapon returns to the thrower's position and can be caught with a free action.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "This combat boomering does not resembe the conventional 'V' shape of a normal boomerang and instead has more of a 'tick mark' shape. One end has a smaller wing which is both thicker and carefully reinforced with metal studs. It can be used as both a ranged weapon as expected, but can also be used in close quarters as a club.",
      "Est. Value": "2. gp",
      "Name": "Combat Boomerang",
      "Properties": "1d6 Bludgeoning  - Thrown (Range: 30/90) Special: Does not require direct line of sight, due to a curved trajectory.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A curved sword favored by lizardmen. It can be used to attack directly or can be thrown like a boomerang.",
      "Est. Value": "5. gp",
      "Name": "Boomerang Sword",
      "Properties": "1d6 Slashing - Thrown (Range: 30/90) Special: Does not require direct line of sight, due to a curved trajectory.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "2 lb"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "A three bladed disk which can either be used in melee or as a thrown weapon. The circular handle is made from dark wood and has the design of an owl's head in the middle.",
      "Est. Value": "25. gp",
      "Name": "Glaive",
      "Properties": "1d4 Slashing - Finesse - Light - Thrown (Range: 30/60) Special: The weapon returns to the thrower's position after an attack and can be caught with a free action.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "3 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "The ornamentation that adorns this blade is a traditional elven design. It's forged from a very durable and rust-proof metal.",
      "Est. Value": "20. gp",
      "Name": "Elven Sword",
      "Properties": "1d8 Slashing - Versatile (1d10)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A human skeleton in rotted priest’s robes wearing a ring and necklace. (Electrum ring: 4gp Silver necklace: 3gp)",
      "Est. Value": "",
      "Name": "Priest Skeleton",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A goblin skull that has been dipped in molten copper. (1gp)",
      "Est. Value": "1. gp",
      "Name": "Prism's Copper Goblin",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "If worn on a hand, the entire arm will vanish.  It will return after 24 hours have elapsed.  Roll a d10: 1 - tattoo on arm, 2 - arm injured, 3 - gained a ring, probably a wedding ring, 4 - ring missing, 5-10 - nothing special.  It will have a similar effect on legs.",
      "Est. Value": "",
      "Name": "Ring of the Adventurous Limb",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Quest Hook",
      "Description": "Collection of documents with traces of royal bloodlines",
      "Est. Value": "",
      "Name": "Royal Documents",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A silver hand mirror with mother-of-pearl backing.",
      "Est. Value": "28. gp",
      "Name": "Silver Hand Mirror",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Trap",
      "Description": "",
      "Est. Value": "",
      "Name": "Fungus Spores",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Trap",
      "Description": "A popular Goblin trap; a 50 ft length of neatly coiled wire that has nails welded onto it at regular intervals. The resulting product can be used either by running it across the floor or by intertwining it along a fence or wall.",
      "Est. Value": "20. gp",
      "Name": "Stabby String",
      "Properties": "Stabby String can be left semi-coiled on the floor, at half it's length, to create difficult terrain. Any creature that attempts to pass over the Stabby String is subject to 1d4 piercing damage.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Trap",
      "Description": "",
      "Est. Value": "",
      "Name": "Burning Oil",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "",
      "Est. Value": "",
      "Name": "Pendulum",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "A dusty scroll which contains a political essay written by a witch called Virginia Woolfsblood. The essay delves into the systemic oppression of witches and advocates for the magical education and liberation of women in general.",
      "Est. Value": "30. gp",
      "Name": "A Dungeon of One's Own ",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A common, bright purple gemstone.",
      "Est. Value": "50. gp",
      "Name": "Amethyst",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "When used (worn), this seemingly golden crown turns to sand and falls to the ground where it reforms into a crown. Any gold, silver, or copper item it is placed near will also gain this property. A coin would only turn to sand when it was being used (spent), etc ",
      "Est. Value": "",
      "Name": "Sand Crown Crown",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Adventuring Gear",
      "Description": "A thick leather satchel containing an adventurer's’ kit: 6 wax candles, two pieces of white chalk, two pieces of red chalk, a small bag of (100) clay marbles, a whistle, four pieces of charcoal, three large sacks, six iron pitons, a hammer, a tinderbox with flint and steel, 2 empty copper vials, a chunk of coal, and three large sheets of paper.",
      "Est. Value": "10. gp",
      "Name": "Satchel",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Silver pan/satyr pipes/flute",
      "Est. Value": "",
      "Name": "Satyr Pipes",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Nigh-indestructible scroll case – leviathan ivory, jewel encrusted, demon paintings on side – scraps of scroll inside",
      "Est. Value": "",
      "Name": "Scroll Case",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A 40’ coil of rare sea shells strung on a silken cord",
      "Est. Value": "",
      "Name": "Sea Shell Coil",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "Studded leather armor made from sharkskin set with iron disks.",
      "Est. Value": "100. gp",
      "Name": "Sharkskin Armour",
      "Properties": "Light Armor - Armor Class: 12 + Dex Modifier",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "",
      "Category": "Adventuring Gear",
      "Description": "A high quality sharpening stone",
      "Est. Value": "",
      "Name": "Sharpening Stone",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "A leather string holding 11 silver shuriken. ",
      "Est. Value": "12. gp",
      "Name": "Shurikens",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PlatypusPal",
      "Category": "Weapon",
      "Description": "A pouch filled with 13 silver sling bullets. Each bullet is engraved with the holy symbol of Pelor.",
      "Est. Value": "10. gp",
      "Name": "Silver Bullets",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large chunk of raw silver ore.",
      "Est. Value": "5. gp",
      "Name": "Silver Ore",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "25 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A set of five small silver statuettes (each about 2” tall) consisting of a cat, an owl, a falcon, a horse and a griffon.",
      "Est. Value": "45. gp",
      "Name": "Silver Statuettes",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Two six-fingered gloves, along with a matching seven-fingered glove. The set is made of supple black leather, and stitched with fine, silver thread.",
      "Est. Value": "",
      "Name": "Six Fingered Gloves",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A single, platinum skeleton-key on a platinum ring. The key is finely crafted, with a delicate design etched in elvish characters along the length and across the bow.",
      "Est. Value": "37. gp",
      "Name": "Skeleton Key",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Adventuring Gear",
      "Description": "Key chain with multiple types of ‘skeleton keys’",
      "Est. Value": "",
      "Name": "Skeleton Key Chain",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PlatypusPal",
      "Category": "Quest Hook",
      "Description": "A bearer-order allowing the possessor to take ownership of a dozen slaves from Zoealage the flesh-monger",
      "Est. Value": "",
      "Name": "Slave Order",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A long, narrow wooden box containing forty, ½ lb rolls of quality smoking leaf.",
      "Est. Value": "",
      "Name": "Smoking Box",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A six foot long smoking pipe made of ivory, possibly a narwhal horn, carved to look like a twisting serpent.",
      "Est. Value": "",
      "Name": "Smoking Pipe",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Adventuring Gear",
      "Description": "Smugglers boots – great for hiding a concealed backup dagger or wand",
      "Est. Value": "",
      "Name": "Smuggler's Boots",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Adventuring Gear",
      "Description": "A hooded cloak with a dozen inside pockets.",
      "Est. Value": "",
      "Name": "Smuggler's Coat",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "A scimitar with a gold and snakeskin hilt set with a citrine.",
      "Est. Value": "100. gp",
      "Name": "Snakeskin Scimitar",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Four pairs of snow serpent fur felt stockings",
      "Est. Value": "20. gp",
      "Name": "Snow Serpent Stockings",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A two gallon stone ware jug containing hallucinogenic tree sap syrup ",
      "Est. Value": "20. gp",
      "Name": "Special Syrup",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "A pair of blue enameled steel spiked gauntlets. The palms of both gauntlets are designed to display the Cambersome family crest, a stylized ‘C’ shaped into the likeness of a coiled serpent.",
      "Est. Value": "90. gp",
      "Name": "Steel Spiked Gauntlets",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A stuffed falcon, tattered with age, with black onyx eyes. (Onyx value: 5gp each)",
      "Est. Value": "",
      "Name": "Stuffed Falcon",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A short quiver holding 3 sunrods.",
      "Est. Value": "6. gp",
      "Name": "Sunrod Quiver",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A well-sealed cake box with intact cake",
      "Est. Value": "",
      "Name": "Tasty Cake",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Ritualistic tattooing kit",
      "Est. Value": "",
      "Name": "Tattoo Kit",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A cracked mask of teak wood, colored in (chipped) blue and red paint depicting the face of a fairy (4sp)",
      "Est. Value": "",
      "Name": "Teak Mask",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "An ornately carved quarterstaff of teakwood. The end is carved into the likeness of a dragon’s head, with (painted red) flame issuing from its mouth and the butt end carved into an entwining serpent-like tail. (5gp)",
      "Est. Value": "5. gp",
      "Name": "Teakwood Quarterstaff",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "The neverburning torch. A jet black torch, with an inscription in gold upon its side: “Only in your hour of darkest need will I light.” All attempts – magical or otherwise – to light the torch will fail, but if the character carrying the torch ever finds himself upon the brink of death, the torch will flare to life.",
      "Est. Value": "",
      "Name": "The Neverburning Torch",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Scalpel capable of cutting any substance",
      "Est. Value": "",
      "Name": "The Scalpel",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Found on the corpse of an enemy from the realm of chaos.",
      "Est. Value": "",
      "Name": "The Torturer's Dagger",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60  Any wounds inflicted using this dagger are healed two rounds later.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "You find a barrel filled with broken crockery. Near the bottom is a mouse nest in which, amidst the tangled mouse fur, lays a silver ring set with a polished tigerseye.",
      "Est. Value": "200. gp",
      "Name": "Tigerseye Ring",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Box of ‘Top Secret Battle Monkeys’",
      "Est. Value": "",
      "Name": "Top Secret Battle Monkeys",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Quest Hook",
      "Description": "Piece of Legendary weapon & map with possible locations for other pieces",
      "Est. Value": "",
      "Name": "Treasure Map I",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Quest Hook",
      "Description": "A peg leg inscribed with a pirate’s treasure map. The map is either false or its treasure has long since been plundered. If you wish to provide the PCs with a true map, then one may be found in the hollow compartment within the leg.",
      "Est. Value": "",
      "Name": "Treasure Map II",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A leather harness bearing three short quivers (sized for quarrels, rather than arrows). The first holds a dozen red-fletched quarrels, the second a dozen green fletched quarrels, and the third has a dozen white fletched quarrels.",
      "Est. Value": "5. gp",
      "Name": "Triple Harness",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "When blown, any trolls within a mile or so will approach the players",
      "Est. Value": "",
      "Name": "Troll Horn",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An oboe-like musical instrument made from a troll’s femur.",
      "Est. Value": "",
      "Name": "Troll Oboe",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A set of panpipes carved from the bones of a unicorn. When played, they do not make the slightest sound.",
      "Est. Value": "",
      "Name": "Unicorn Pipes",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "This leather-bound recipe book appears to be aimed at adventurers who aren't satified with merely fighting monsters and taking their treasure. It features a mixed selection of recipies, with side-notes on how best to prepare the remains of each creature included. 'Braized Dragon Liver and Onions', 'Eye of the Beholder Soup', 'Rust Monster Jerky' and 'Gelatinous Cube Jelly' are particular standouts.",
      "Est. Value": "40. gp",
      "Name": "The Book of Monster Recipes",
      "Properties": "Allows the reader to prepare meals from most common monsters without poisoning themselves.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A bowl full of golden apples found in the midst of ruins which have long been left desolate and uninhabited. They are quite edible and unspoiled. If they are taken beyond the ruins, they will lose their golden sheen and appear – in all respects – as normal, red apples. So long as they remain within the ruins, however, they are golden, and will not age or rot.",
      "Est. Value": "",
      "Name": "Unspoiled Golden Apples",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Seventy-three clay vials of oil (1 pint each). ",
      "Est. Value": "75. gp",
      "Name": "Vials of Oil",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Adventuring Gear",
      "Description": "Wand Chamber – fashioned to look like a scroll case, it contains 1d12 slots to hold wands – think of it as a circular bandolier for your everyday wizard",
      "Est. Value": "",
      "Name": "Wand Chamber",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Box with runic markings for destroy/to be destroyed containing cursed object",
      "Est. Value": "",
      "Name": "Warning Box",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Quest Hook",
      "Description": "Water damaged ledger – hidden location",
      "Est. Value": "",
      "Name": "Water Damaged Ledger",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A weapons cabinet, unlocked and immovable, containing: 12 score arrows (1gp/score), 40 javelins (1gp each), 120 crossbow bolts (1sp/each), and a short bow (30gp).",
      "Est. Value": "94. gp",
      "Name": "Weapon Cabinet",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An elaborate, whalebone scrimshaw carving of intertwined orbs, each showing the legend of creation story of one of the seven civilized religions, roughly 10” in diameter.",
      "Est. Value": "45. gp",
      "Name": "Whalebone Scrimshaw",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A cane of the purest white ivory, decorated with ruins unknown to modern scholars, and topped with a handle of polished amber. Trapped within the amber is a strange creature unlike any the PCs have ever seen before.",
      "Est. Value": "",
      "Name": "White Ivory Cane",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A small ball of white marble – roughly three inches across – which hovers in the air until it is touched or disturbed, at which point it falls to the floor and ceases to exhibit any supernatural properties.",
      "Est. Value": "",
      "Name": "White Marble Ball",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large, wrought-iron sign crafted to read: “Beware of Wyvern” in a bold script.",
      "Est. Value": "70. gp",
      "Name": "Wrought Iron Sign",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "80 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A small, brown glass jar, sealed with wax, with a gray dust inside. A white label is affixed to the jar, and reads: “Zombie Dust” in a shaky script. (It is zombie dust.)",
      "Est. Value": "3. gp",
      "Name": "Zombie Dust",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "This thermometer has a long, silver blade and a pommeled wooden handle. 'Come here, monster! I just want to take your temperature!'",
      "Est. Value": "",
      "Name": "Terrible Thermometer",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A normal hand axe, only there's two of them.",
      "Est. Value": "10. gp",
      "Name": "Double Axe",
      "Properties": "1d6 Slashing - Simple - Light, Thrown - Range: 20/60",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Belt of Fattening",
      "Properties": "Cursed Putting on this belt causes the user to gain 200lb over the period of a short rest.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "",
      "Est. Value": "",
      "Name": "Morph Blade",
      "Properties": "This blade can switching between piecing, slashing and bludgeoning damage as a bonus action.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Lucky Coin",
      "Properties": "Coin always lands heads up.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Wand of Pillows",
      "Properties": "At any time, if the users says 'Floomp' a pillow will magically appear. After the eighth pillow apparates, they start simply teleporting to the user in order.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "",
      "Est. Value": "",
      "Name": "Gravedigger",
      "Properties": "1d4 Bludgeoning Attack with advantage and 1d10 against undead enemies",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Potion",
      "Description": "",
      "Est. Value": "",
      "Name": "Giggle Water",
      "Properties": "small vial of liquid that when drunk makes the drinker continuously giggle for 1 hour. When that wears off they hiccup for 1 hour",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Entangled Coins",
      "Properties": "Two coins, when flipped at close to the same time will always land the same way, no matter how far apart they are",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Gooch_Ticklr",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Ring of Fire Detection",
      "Properties": "A bronze ring that houses magical protection. It alerts the wearer of fire by etchings becoming red and glowing when fire is within a 10 foot radius, even behind walls",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Requires Attunement",
      "Weight": ""
    },
    {
      "Author": "u/DngnMaster",
      "Category": "Wondrous Item",
      "Description": "A simple straw hat.",
      "Est. Value": "30. gp",
      "Name": "Drunkard's Hat",
      "Properties": "The wearer of this hat always knows the direction to the nearest alcholic beverage.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "The breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil. The rest of the armor is made of softer and more flexible materials.",
      "Est. Value": "10. gp",
      "Name": "Leather Armor",
      "Properties": "Light Armor Armor Class: 11 + Dex Modifier",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "Padded armor consists of quilted layers of cloth and batting.",
      "Est. Value": "5. gp",
      "Name": "Padded Armor",
      "Properties": "Light Armor - Armor Class: 11 + Dex Modifier Disadvantage on Stealth",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "8 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "Made from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes.",
      "Est. Value": "45. gp",
      "Name": "Studded Armor",
      "Properties": "Light Armor Armor Class: 12 + Dex Modifier",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "13 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "This crude armor consists of thick furs and pelts. It is commonly worn by barbarian tribes, evil humanoids, and other folk who lack access to the tools and materials needed to create better armor.",
      "Est. Value": "10. gp",
      "Name": "Hide Armor",
      "Properties": "Medium Armor Armor Class: 12 + Dex Modifier (max 2)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "12 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "This armor consists of a fitted metal chest piece worn with supple leather. Although it leaves the legs and arms relatively unprotected, this armor provides good protection for the wearer's vital organs while leaving the wearer relatively unencumbered.",
      "Est. Value": "400. gp",
      "Name": "Breastplate Armor",
      "Properties": "Medium Armor - Armor Class: 14 + Dex Modifier (max 2)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "20 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "Half plate consists of shaped metal plates that cover most of the wearer's body. It does not include leg protection beyond simple greaves that are attached with leather straps.",
      "Est. Value": "750. gp",
      "Name": "Half Plate Armor",
      "Properties": "Medium Armor - Armor Class: 15 + Dex Modifier (max 2) Disadvantage on Stealth",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "40 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather. This armor offers modest protection to the wearer's upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers.",
      "Est. Value": "50. gp",
      "Name": "Chain Shirt Armor",
      "Properties": "Medium Armor - Armor Class: 13 + Dex Modifier (max 2)",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "20 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish. The suit includes gauntlets.",
      "Est. Value": "50. gp",
      "Name": "Scale Mail Armor",
      "Properties": "Medium Armor - Armor Class: 14 + Dex Modifier (max 2) Disadvantage on Stealth",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "45 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "This armor is leather armor with heavy rings sewn into it. The rings help reinforce the armor against blows from swords and axes. Ring mail is inferior to chain mail, and it's usually worn only by those who can't afford better armor.",
      "Est. Value": "30. gp",
      "Name": "Ring Mail Armor",
      "Properties": "Heavy Armor - Armor Class: 14 Disadvantage on Stealth",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "40 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body.",
      "Est. Value": "1,500. gp",
      "Name": "Plate Armor",
      "Properties": "Heavy Armor - Armor Class: 18 Disadvantage on Stealth",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Strength: 15",
      "Weight": "65 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows. The suit includes gauntlets.",
      "Est. Value": "75. gp",
      "Name": "Chain Mail Armor",
      "Properties": "Heavy Armor - Armor Class: 16 Disadvantage on Stealth",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Strength: 13",
      "Weight": "55 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding. Flexible chain mail protects the joints.",
      "Est. Value": "200. gp",
      "Name": "Splint Armor",
      "Properties": "Heavy Armor - Armor Class: 17 Disadvantage on Stealth",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "Strength: 15",
      "Weight": "60 lb"
    },
    {
      "Author": "PHB",
      "Category": "Armor",
      "Description": "A shield is made from wood or metal and is carried in one hand.",
      "Est. Value": "10. gp",
      "Name": "Shield",
      "Properties": "Wielding a shield increases your Armor Class by 2. You can benefit from only one shield at a time.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "6 lb"
    },
    {
      "Author": "Baldur's Gate II",
      "Category": "Adventuring Gear",
      "Description": "This shoulder belt is ideally suited for holding sling bullets, darts, arrows or bolts.",
      "Est. Value": "200. gp",
      "Name": "Ammo Belt",
      "Properties": "More reliable than a quiver.",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "This sticky, adhesive fluid ignites when exposed to air. As an action, you can throw this flask up to 20 feet, shattering it on impact. Make a ranged attack against a creature or object, treating the alchemist's fire as an improvised weapon. On a hit, the target takes 1d4 fire damage at the start of each of its turns. A creature can end this damage by using its action to make a DC 10 Dexterity check to extinguish the flames.",
      "Est. Value": "50. gp",
      "Name": "Alchemist's Fire",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A simple silver ring that bears no inscription or identifying marks on it's surface.",
      "Est. Value": "10. gp",
      "Name": "Silver Ring",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A dagger sheath of hardened leather, set with a number of cheap decorative stones. Any dagger kept within this sheath is automatically sharpened as if it were a fresh blade.",
      "Est. Value": "200. gp",
      "Name": "Sharpening Sheath",
      "Properties": "",
      "Rarity": "Common",
      "Rarity Number": "2",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Acid Splash spell.",
      "Name": "Acid Splash Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Blade Ward spell.",
      "Name": "Blade Ward Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Chill Touch spell.",
      "Name": "Chill Touch Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Control Flames spell.",
      "Name": "Control Flames Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Create Bonfire spell.",
      "Name": "Create Bonfire Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dancing Lights spell.",
      "Name": "Dancing Lights Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Druidcraft spell.",
      "Name": "Druidcraft Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Eldritch Blast spell.",
      "Name": "Eldritch Blast Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Fire Bolt spell.",
      "Name": "Fire Bolt Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Friends spell.",
      "Name": "Friends Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Frostbite spell.",
      "Name": "Frostbite Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Guidance spell.",
      "Name": "Guidance Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Gust spell.",
      "Name": "Gust Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Infestation spell.",
      "Name": "Infestation Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Light spell.",
      "Name": "Light Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mage Hand spell.",
      "Name": "Mage Hand Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Magic Stone spell.",
      "Name": "Magic Stone Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mending spell.",
      "Name": "Mending Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Message spell.",
      "Name": "Message Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Minor Illusion spell.",
      "Name": "Minor Illusion Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mold Earth spell.",
      "Name": "Mold Earth Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Poison Spray spell.",
      "Name": "Poison Spray Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Prestidigitation spell.",
      "Name": "Prestidigitation Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Primal Savagery spell.",
      "Name": "Primal Savagery Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Produce Flame spell.",
      "Name": "Produce Flame Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Ray of Frost spell.",
      "Name": "Ray of Frost Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Resistance spell.",
      "Name": "Resistance Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Sacred Flame spell.",
      "Name": "Sacred Flame Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Shape Water spell.",
      "Name": "Shape Water Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Shillelagh spell.",
      "Name": "Shillelagh Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Shocking Grasp spell.",
      "Name": "Shocking Grasp Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Spare the Dying spell.",
      "Name": "Spare the Dying Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Thaumaturgy spell.",
      "Name": "Thaumaturgy Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Thorn Whip spell.",
      "Name": "Thorn Whip Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Thunderclap spell.",
      "Name": "Thunderclap Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Toll the Dead spell.",
      "Name": "Toll the Dead Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the True Strike spell.",
      "Name": "True Strike Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Vicious Mockery spell.",
      "Name": "Vicious Mockery Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Word of Radiance spell.",
      "Name": "Word of Radiance Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Absorb Elements spell.",
      "Name": "Absorb Elements Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Alarm spell.",
      "Name": "Alarm Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Animal Friendship spell.",
      "Name": "Animal Friendship Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Armor of Agathys spell.",
      "Name": "Armor of Agathys Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Arms of Hadar spell.",
      "Name": "Arms of Hadar Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Bane spell.",
      "Name": "Bane Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Beast Bond spell.",
      "Name": "Beast Bond Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Bless spell.",
      "Name": "Bless Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Burning Hands spell.",
      "Name": "Burning Hands Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Catapult spell.",
      "Name": "Catapult Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Cause Fear spell.",
      "Name": "Cause Fear Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Ceremony spell.",
      "Name": "Ceremony Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Chaos Bolt spell.",
      "Name": "Chaos Bolt Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Charm Person spell.",
      "Name": "Charm Person Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Chromatic Orb spell.",
      "Name": "Chromatic Orb Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Color Spray spell.",
      "Name": "Color Spray Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Command spell.",
      "Name": "Command Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Compelled Duel spell.",
      "Name": "Compelled Duel Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Comprehend Languages spell.",
      "Name": "Comprehend Languages Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Create or Destroy Water spell.",
      "Name": "Create or Destroy Water Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Cure Wounds spell.",
      "Name": "Cure Wounds Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Detect Evil and Good spell.",
      "Name": "Detect Evil and Good Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Detect Magic spell.",
      "Name": "Detect Magic Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Detect Poison and Disease spell.",
      "Name": "Detect Poison and Disease Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Disguise Self spell.",
      "Name": "Disguise Self Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dissonant Whispers spell.",
      "Name": "Dissonant Whispers Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Divine Favor spell.",
      "Name": "Divine Favor Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Earth Tremor spell.",
      "Name": "Earth Tremor Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Ensnaring Strike spell.",
      "Name": "Ensnaring Strike Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Entangle spell.",
      "Name": "Entangle Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Expeditious Retreat spell.",
      "Name": "Expeditious Retreat Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Faerie Fire spell.",
      "Name": "Faerie Fire Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the False Life spell.",
      "Name": "False Life Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Feather Fall spell.",
      "Name": "Feather Fall Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Find Familiar spell.",
      "Name": "Find Familiar Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Fog Cloud spell.",
      "Name": "Fog Cloud Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Goodberry spell.",
      "Name": "Goodberry Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Grease spell.",
      "Name": "Grease Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Guiding Bolt spell.",
      "Name": "Guiding Bolt Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hail of Thorns spell.",
      "Name": "Hail of Thorns Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Healing Word spell.",
      "Name": "Healing Word Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hellish Rebuke spell.",
      "Name": "Hellish Rebuke Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Heroism spell.",
      "Name": "Heroism Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hex spell.",
      "Name": "Hex Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hunter's Mark spell.",
      "Name": "Hunter's Mark Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Ice Knife spell.",
      "Name": "Ice Knife Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Identify spell.",
      "Name": "Identify Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Illusory Script spell.",
      "Name": "Illusory Script Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Inflict Wounds spell.",
      "Name": "Inflict Wounds Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Jump spell.",
      "Name": "Jump Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Longstrider spell.",
      "Name": "Longstrider Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mage Armor spell.",
      "Name": "Mage Armor Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Magic Missile spell.",
      "Name": "Magic Missile Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Protection from Evil and Good spell.",
      "Name": "Protection from Evil and Good Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Purify Food and Drink spell.",
      "Name": "Purify Food and Drink Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Ray of Sickness spell.",
      "Name": "Ray of Sickness Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Sanctuary spell.",
      "Name": "Sanctuary Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Searing Smite spell.",
      "Name": "Searing Smite Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Shield spell.",
      "Name": "Shield Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Shield of Faith spell.",
      "Name": "Shield of Faith Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Silent Image spell.",
      "Name": "Silent Image Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Sleep spell.",
      "Name": "Sleep Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Snare spell.",
      "Name": "Snare Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Speak with Animals spell.",
      "Name": "Speak with Animals Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Tasha's Hideous Laughter spell.",
      "Name": "Tasha's Hideous Laughter Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Tenser's Floating Disk spell.",
      "Name": "Tenser's Floating Disk Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Thunderous Smite spell.",
      "Name": "Thunderous Smite Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Thunderwave spell.",
      "Name": "Thunderwave Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Unseen Servant spell.",
      "Name": "Unseen Servant Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Witch Bolt spell.",
      "Name": "Witch Bolt Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wrathful Smite spell.",
      "Name": "Wrathful Smite Spell Scroll",
      "Rarity": "Common"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Zephyr Strike spell.",
      "Name": "Zephyr Strike Spell Scroll",
      "Rarity": "Common"
    }
  ],
  "Legendary": [
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "The sapling of a young tree. Within a few minutes it will have grown into a wizened oak. A few moments more and the tree slowly fades from existence as a young seedling pushes up from the ground and begins the cycle anew.",
      "Est. Value": "",
      "Name": "Perpetual Tree",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Garnet is a general class of crystals ranging from deep red to violet in colour. a typical cut for this rare isometric gem is 12 to 24 sides, with the very rare 36 sides being known from time to time. This may be the only 48 sided garnet in existance. and as such it is highly prized.",
      "Est. Value": "10,000. gp",
      "Name": "48-sided Garnet Gemstone",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "An apparatus of Kwalish appears to be a large, sealed iron barrel, but it has a secret catch that opens a hatch in one end. Inside, a character finds ten levers. The levers perform various functions, including extending or retracting the legs, tail, pincers and feelers, covering and uncovering the portholes, moving the apparatus, snapping its pincers, opening and closing its magically-lit 'eyes', rising and sinking in water, and opening or closing the hatch. When activated the apparatus looks like a giant lobster.",
      "Est. Value": "10,000. gp",
      "Name": "Apparatus of Kwalish",
      "Properties": "See DMG page 151.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "500 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "Apple of the God’s – gain random ability of 1 god aspect at risk of save vs death, then random forbidden fruit side effect; ability is 1 per day/50% chance success",
      "Est. Value": "5,000. gp",
      "Name": "Apple of the Gods",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "You have a +3 bonus to AC while wearing this armor. ",
      "Est. Value": "24,000. gp",
      "Name": "Armor +3",
      "Properties": "Light, Medium or Heavy",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "8 - 60"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "You have resistance to nonmagical damage while you wear this armor. Additionally, you can use an action to make yourself immune to nonmagical damage for 10 minutes or until you are no longer wearing the armor. Once this special action is used, it can't be used again until the next dawn.",
      "Est. Value": "18,000. gp",
      "Name": "Armor of Invulnerability",
      "Properties": "Plate Armor",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "Requires Attunement",
      "Weight": "65 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Weapon",
      "Description": "A long steel blade with an amber edge and lustrous golden hilt. When first discovered, the blade is without detail, but is filled with runes as members of other races volunteer their blood as tribute to the blade's cause.",
      "Est. Value": "3,000. gp",
      "Name": "Balering, the Sword of Balance",
      "Properties": "1d8, plus an additional 1d8 radiant damage to Dragons, Garou, and Spiders for each rune that appears on the blade. The blade is adorned with a rune for every 3 different races that willingly shed their blood on the sword.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this belt, your Strength score changes to 27. If your Strength is already equal to or greater than 27, the item has no effect on you.",
      "Est. Value": "36,000. gp",
      "Name": "Belt of Cloud Giant Strength",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this belt, your Strength score changes to 29. If your Strength is already equal to or greater than 29, the item has no effect on you.",
      "Est. Value": "45,000. gp",
      "Name": "Belt of Storm Giant Strength",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "Scribnibbler21",
      "Category": "Weapon",
      "Description": "This greatsword belongs to the current mortal champion of Vingaret, the goddess of vengeance. Once per day, the attuned champion can choose to have one attack with Bloodgaze deal an extra 1D10 damage to the target if the target was the last creature to attack the champion. This damage increases to 2D10 when the champion reaches 7th level and to 3D10 when the champion reaches 15th level.",
      "Est. Value": "50,000. gp",
      "Name": "Bloodgaze, Champion of Vingaret",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "15 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Armor",
      "Description": "Gives insane buffs, will eventually turn you into one of whatever it's namesake is.",
      "Est. Value": "",
      "Name": "Bound Armor of the Demon",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "40 - 60"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Armor",
      "Description": "Gives insane buffs, will eventually turn you into one of whatever it's namesake is.",
      "Est. Value": "",
      "Name": "Bound Armor of the Fey",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "40 - 60"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Armor",
      "Description": "Gives insane buffs, will eventually turn you into one of whatever it's namesake is.",
      "Est. Value": "",
      "Name": "Bound Armor of the Lich",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "40 - 60"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A small brass flame-shaped charm on a black cord. The center of the flame is overlaid with platinum and is visible in darkness. Holding it in your hands fills you with a tingling sense of ambition and an urge to act.",
      "Est. Value": "2,000. gp",
      "Name": "Brass Halo",
      "Properties": "CHA +2 Whenever you cast a spell, roll a d20. On a 20, that spell will be cast as a 10th level spell. A spell slot of the lowest castable level is expended as a result.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A flattened bronze halo that hovers behind the bearer's head. It spins rapidly when the bearer exhibits great presence of mind.",
      "Est. Value": "1,000. gp",
      "Name": "Bronze Halo",
      "Properties": "INT +2 You may add 1d20 to any dice roll you make. A bolt of lightning then strikes you, dealing lightning damage equal to the result of the roll. This can only be done once per dice roll.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "u/giratina2648",
      "Category": "Wondrous Item",
      "Description": "A commanding cloak of authority, used to hide whole legions of armies against the Starwizards of the astral planes. ",
      "Est. Value": "",
      "Name": "Cloak of the Shadow General",
      "Properties": "1/ Day: Creatures within a 30 feet radius, including the user, are granted the effects of greater invisibility, and cannot be detected by Truesight and other means of reveal, e.g. Mordenkainen's Faithful Hound. Charges are restored at dusk.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A copper band with a scale-pattern etched into it. At the top of the bracelet is a broken inset where a platinum decoration used to be.",
      "Est. Value": "0. gp",
      "Name": "Copper Band of the Deceiver",
      "Properties": "Grants the wearer a feeling of safety that they become instantly addicted to. Wearing it for a full day creates a feeling of dependency, requiring a DC 12 wisdom save to overcome and remove the bracelet. Attempting to do so makes the user panicked and sickened and fearful of the dangers of the world. The DC increases by 2 for each day that they bracelet is worn. After a week, the bearer will look sickly and lose their will to eat. After a month, they will become dark and boney, and begin to develop scarring, and their features will become shifted and demonic. This transition continues until they resemble a waifish demonic figure.  The wearer of this bracelet is immortal in the physical sense, no amount of harm will cause them to die.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A copper gauntlet that never greens. The bearer feels a sense of influence and importance.",
      "Est. Value": "1,500. gp",
      "Name": "Copper Halo",
      "Properties": "STR +2 You may point at a creature and give it a command. The command must be phrased as helping you or helping another person to complete a task. If the target has less than 10 intelligence, it obeys you. If its Intelligence is 10 or higher, it makes a DC 17 Wisdom save or follows your command. You may do this to any number of targets, but if one of them fails to listen to you, the effect may break on all others (roll 1d2, success on 1).",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "u/giratina2648",
      "Category": "Armor",
      "Description": "Nigh-unbreakable golemsteel armor enchanted to withstand nearly any strike. If a ranged attack targets a friendly creature besides yourself within five feet radius, you can move them and take the shot to negate the damage and effects instead; if they are within a 10 feet radius, use your reaction. ",
      "Est. Value": "",
      "Name": "Eternity Armor",
      "Properties": "Heavy Armor | AC 20 | Str 20 | Stealth: Disadvantage",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "80 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A necklace of large gold-and-platinum prayer beads, 12 beads in all. They project a feeling of safety and austere silence.",
      "Est. Value": "1,000. gp",
      "Name": "Golden Halo",
      "Properties": "WIS +2 You may choose one target within ten feet to be encapsulated in an opaque sphere of white force. The target must have 100 or less current HP. When a target is captured in a sphere, a bead on the necklace will turn platinum. Once inside the sphere, time ceases to pass within it, effectively preserving the captive indefinitely. The captives can be released at will.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Armor",
      "Description": "A thick, flesh-like leather vest adorned with occult symbols and human teeth. Parts of it are ragged with wear, and it feels clammy to the touch.",
      "Est. Value": "5,000. gp",
      "Name": "Hallowed Skin",
      "Properties": "Grants 12 AC +Dex. Undead creatures revere the bearer of this garment, and will not attack you, unless they are in threat of being destroyed. A good-aligned character wearing this vest will become nauseous, and suffers fitful nightmares on any night after this has been worn, preventing them from benefitting from a long rest.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "This ring is set with a hemispherical glass eyeball that looks around when it is worn. It functions as an alternative eye for the user and is not affected by magic.",
      "Est. Value": "9,000. gp",
      "Name": "Observer's Ring",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "Requires Attunement",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Two disks of hardened quicksilver laying atop one another. If they are separated, a tornado springs up between them – anchored on each end to a disk.",
      "Est. Value": "",
      "Name": "Pocket Tornado",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PlatypusPal",
      "Category": "Potion",
      "Description": "Bottle with a liquid with rainbow colors. When you drink it you automatically succeed on death saving throws for one hour.",
      "Est. Value": "",
      "Name": "Potion of Temporary Immortality",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Treasure",
      "Description": "A single, elegant seaglass colored earring made of clear glasslike material. Its exact shape changes slowly over time, shifting from one watery artful shape to another.",
      "Est. Value": "5,000. gp",
      "Name": "Seaglass Earring",
      "Properties": "The attuned bearer of this earring may cast the 'Control Water' spell once per day, using Charisma as their modifier. The bearer may also take an aqueous form once per day, becoming immune to nonmagical damage, gaining a swim speed of 60 ft, and may effuse through pinhole openings for up to 1 minute.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A small silver ring shaped from the circle of Captain Wellby's hat.",
      "Est. Value": "2,000. gp",
      "Name": "Silver Halo",
      "Properties": "DEX +2 Activate to slip between dimensions - for one minute you can choose to be invisible, ghostly or fully real. You can move through objects at will, and can still affect the material world.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Armor",
      "Description": "A black and crimson cloak with tattered edges that are ever-glowing as it were on fire on moments ago.",
      "Est. Value": "2,000. gp",
      "Name": "Smoldering Cloak",
      "Properties": "If an attack would strike you in combat, you may use your reaction to become a cloud of thick, black smoke, and may move up to 15 feet without provoking attacks of opportunity. You must complete a short rest before using this ability again. If you suffer 10 or more fire damage from any source, the feature becomes available again.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Weapon",
      "Description": "A simple, sturdy longsword with a broad blade. There is a shining sun sigil at the crossguard. The blade shines as if reflecting sunlight, even in the dimmest rooms.",
      "Est. Value": "10,000. gp",
      "Name": "Solarion",
      "Properties": "1d8, +1d6 fire, +1d6 radiant. As a bonus action, you may hold the sword above your head, under a clear, bright day in order to charge the sword with power. Doing so increases the fire and radiant damage of the weapon to 2d6 for one minute. The blade also emits a bright light in 60 feet at will.",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "Scribnibbler21",
      "Category": "Weapon",
      "Description": "This warhammer belonged to a famous dwarven general known as Thaxton the Fierce. It grants a +1 bonus to attack and damage rolls, as well as Intimidation checks, to the user. If the user is a dwarf, this bonus is increased to +2.",
      "Est. Value": "",
      "Name": "Thaxton's Hammer",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "BGII",
      "Category": "Book",
      "Description": "The Book of Kaza is a famed tome written by the lich, Kaza. It is said to deal with the darkest secrets of necromancy, though the pages appear to be blank when you look at it. Kaza was destroyed during the upheaval of Nethril's final days. How it has come to its present location after so many years is anyone's guess.        ",
      "Est. Value": "4,500. gp",
      "Name": "The Book of Kaza",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "Language: Abyssal",
      "Weight": "1 1/2 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "'The Box of Do Want' which made anyone looking into the box desire whatever it was that I put inside of it. A rock? The shopkeeper wants it so badly they're willing to pay their entire fortune. A spoon? The tavern keeper is willing to give you his daughter.",
      "Est. Value": "",
      "Name": "The Box of 'Do Want'",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "J",
      "Category": "Wondrous Item",
      "Description": "This legendary eyeball, said to have once been that of a gynosphinx, has the capability to scry at a radius of around 1000 miles. To use it, one must attune to it and to do so, one must gouge out one of their own eyes and replace it with the Eye of Far Seeing (similar to the eye of vecna).",
      "Est. Value": "30,000. gp",
      "Name": "The Eye of Far Seeing",
      "Properties": "Inserting this eye into one of your own eyes lots gives the ability to scry at will twice (or thrice) a day. If it is used more than that, your vision in that eye will start to fade and you will suffer exhaustion. ",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "Requires Attunement",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Vial #2 contains speculumia, a slightly greenish opaque liquid that when drunk suddenly causes a cloud of smoke and summons an exact copy of whoever drank it. The new person is completely the same as the drinker and will actually think that he is the one who drank the drink, the sudden cloud of smoke will prevent anyone witnessing the situation from being able to tell which one is the original person.",
      "Est. Value": "",
      "Name": "Vial #2",
      "Properties": "",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "William Orfanakos",
      "Category": "Weapon",
      "Description": "A legendary longsword that glows a dark red when ",
      "Est. Value": "10,000. gp",
      "Name": "Soul Stealer",
      "Properties": "When this weapon is used to kill an intelligent creature, it's soul is absorbed into the blade. These souls can be released as a bonus action for 1d4 psychic damage per soul. All of the souls must be released at once. 1d12 Slashing - Versatile (2d8)",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "Requires Attunement",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Gnomish Stop Clock",
      "Properties": "Allows you to stop time. However, if you ever let go of the clock while time is stopped it will shatter, restoring time but freezing the user",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "",
      "Est. Value": "",
      "Name": "Key Dagger",
      "Properties": "Appears to be a silvered 1d4 dagger with some cuts running up it’s spine. But when the blade is inserted into a lock, it acts as the correct key",
      "Rarity": "Legendary",
      "Rarity Number": "6",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Abi-Dalzim’s Horrid Wilting spell.",
      "Name": "Abi-Dalzim’s Horrid Wilting Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Animal Shapes spell.",
      "Name": "Animal Shapes Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Antimagic Field spell.",
      "Name": "Antimagic Field Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Antipathy (Sympathy) spell.",
      "Name": "Antipathy (Sympathy) Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Antipathy Sympathy spell.",
      "Name": "Antipathy Sympathy Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Clone spell.",
      "Name": "Clone Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Control Weather spell.",
      "Name": "Control Weather Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Demiplane spell.",
      "Name": "Demiplane Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dominate Monster spell.",
      "Name": "Dominate Monster Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Earthquake spell.",
      "Name": "Earthquake Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Feeblemind spell.",
      "Name": "Feeblemind Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Glibness spell.",
      "Name": "Glibness Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Holy Aura spell.",
      "Name": "Holy Aura Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Illusory Dragon spell.",
      "Name": "Illusory Dragon Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Incendiary Cloud spell.",
      "Name": "Incendiary Cloud Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Maddening Darkness spell.",
      "Name": "Maddening Darkness Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Maze spell.",
      "Name": "Maze Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mighty Fortress spell.",
      "Name": "Mighty Fortress Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mind Blank spell.",
      "Name": "Mind Blank Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Power Word Stun spell.",
      "Name": "Power Word Stun Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Sunburst spell.",
      "Name": "Sunburst Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Telepathy spell.",
      "Name": "Telepathy Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Tsunami spell.",
      "Name": "Tsunami Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Astral Projection spell.",
      "Name": "Astral Projection Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Foresight spell.",
      "Name": "Foresight Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Gate spell.",
      "Name": "Gate Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Imprisonment spell.",
      "Name": "Imprisonment Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Invulnerability spell.",
      "Name": "Invulnerability Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mass Heal spell.",
      "Name": "Mass Heal Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mass Polymorph spell.",
      "Name": "Mass Polymorph Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Meteor Swarm spell.",
      "Name": "Meteor Swarm Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Power Word Heal spell.",
      "Name": "Power Word Heal Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Power Word Kill spell.",
      "Name": "Power Word Kill Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Prismatic Wall spell.",
      "Name": "Prismatic Wall Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Psychic Scream spell.",
      "Name": "Psychic Scream Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Shapechange spell.",
      "Name": "Shapechange Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Storm of Vengeance spell.",
      "Name": "Storm of Vengeance Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Time Stop spell.",
      "Name": "Time Stop Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the True Polymorph spell.",
      "Name": "True Polymorph Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the True Resurrection spell.",
      "Name": "True Resurrection Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Weird spell.",
      "Name": "Weird Spell Scroll",
      "Rarity": "Legendary"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wish spell.",
      "Name": "Wish Spell Scroll",
      "Rarity": "Legendary"
    }
  ],
  "Mundane": [
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "Three oily rags in an old wicker basket.",
      "Est. Value": "0.2 gp",
      "Name": "Oily Rags",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "On the floor, you find a single pickle wrapped in an oily paper bag. It has a strong distinct smell, but otherwise seems like a normal pickle.",
      "Est. Value": "0.05 gp",
      "Name": "Pickle",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Weapon",
      "Description": "A used, slightly rusted double-bladed sword.",
      "Est. Value": "2. gp",
      "Name": "Ancient Sword",
      "Properties": "1d4 Piercing - Finesse, Light",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "Baldur's Gate",
      "Category": "Treasure",
      "Description": "Andar is hard and durable, yielding translucent gems that flash green-red or brown-red when properly faceted.",
      "Est. Value": "15. gp",
      "Name": "Andar Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A round translucent white gemstone with a ring of striped brown through its center.",
      "Est. Value": "10. gp",
      "Name": "Banded Agate Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A large barrel of pickled eels. The barrel can be re-used, but it's unlikely the smell of pickled eel will ever truly be washed out.",
      "Est. Value": "5. gp",
      "Name": "Barrel o' Eels",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "35 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A newly crafted barrel filled with iron nails. Might be difficult for the players to get this around if they don't have a cart.",
      "Est. Value": "5. gp",
      "Name": "Barrel o' Nails",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "40 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A string of eight beaver pelts.",
      "Est. Value": "1. gp",
      "Name": "Beaver Pelts",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "20 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "An old leather belt.",
      "Est. Value": "0.15 gp",
      "Name": "Belt",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An ornate black velvet mask sitched with silver thread.",
      "Est. Value": "25. gp",
      "Name": "Black Velvet Mask",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A blank scroll. It could have any spell in the world on it, eventually. The possibilities are endless.",
      "Est. Value": "0.5 gp",
      "Name": "Blank Scroll",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "A thick woolen blanket. Something like this is perfect for wrapping up during those long cold nights spent staring at a cave wall.",
      "Est. Value": "0.35 gp",
      "Name": "Blanket",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A blood-stained dress which, despite being found in ruins which have lain undisturbed for centuries, is still a vibrant, stunning blue.",
      "Est. Value": "2. gp",
      "Name": "Blood Stained Dress",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Unknown",
      "Category": "Book",
      "Description": "A blood-soaked book; a partially written history about a long-lost keep on the borderlands. The last written page is done in a different hand, and is scrawled with “The rules have changed!” in large, bold letters. Roughly a third of the book (of 100 pages) has been used. ",
      "Est. Value": "5. gp",
      "Name": "Blood-Soaked Book",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small quartz gemstone shaped in a bevelled square. It is transparent pale blue in color.",
      "Est. Value": "10. gp",
      "Name": "Blue Quartz Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A finely woven blue wool scarf.",
      "Est. Value": "1. gp",
      "Name": "Blue Scarf",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "A butter churn made of bone slats, bound with hoops of silver. A scrimshaw scene depicting a crowd of human villagers beating a Halfling with shovels and hoes wraps around it.",
      "Est. Value": "0.5 gp",
      "Name": "Bone Butter Churn",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A pair of engraved bone dice.",
      "Est. Value": "25. gp",
      "Name": "Bone Dice",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "Bits of bone from an unknown creature.",
      "Est. Value": "0. gp",
      "Name": "Bone Fragments",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A long needle carved out of bone.",
      "Est. Value": "0.25 gp",
      "Name": "Bone Needle",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "This is simply a regular sword that has been partially broken, in combat or however. Most people would just get rid of it, but maybe this sword has a nice hilt or sentimental value. ",
      "Est. Value": "0.5 gp",
      "Name": "Broken Sword",
      "Properties": "1d4 Piercing, Finesse, Light",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "Six red wax candles. ",
      "Est. Value": "0.01 gp",
      "Name": "Candle",
      "Properties": "For 1 hour, a candle sheds bright light in a 5-foot radius and dim light for an additional 5 feet. ",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A carved ox bone female figure statue on a wooden base. The statue is 16' in height.",
      "Est. Value": "25. gp",
      "Name": "Carved Bone Statuette",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A small piece of chalk used to draw on any hard surface.",
      "Est. Value": "0.05 gp",
      "Name": "Chalk",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "An old scrap of cloth from a shirt or sheet of some kind. ",
      "Est. Value": "0. gp",
      "Name": "Cloth Scrap",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "These holy garments are made of silk interwoven with gold threads.",
      "Est. Value": "25. gp",
      "Name": "Cloth-of-gold Vestments",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A small wooden comb.",
      "Est. Value": "0.2 gp",
      "Name": "Comb",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A cast iron cooking pot. It smells like it was last used for soup.",
      "Est. Value": "0.2 gp",
      "Name": "Cooking Pot",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Treasure",
      "Description": "Heavy, solid copper acorns with perfect natural detail.",
      "Est. Value": "1. gp",
      "Name": "Copper Acorns",
      "Properties": "These acorns drop from the oak-like trees that sprout on the graves of Copper Dragons. They can be lethal when falling, often embedding themselves in the ground.",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small copper chalice with a silver filigree.",
      "Est. Value": "25. gp",
      "Name": "Copper Chalice",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "Using a crowbar grants advantage to Strength checks where the crowbar’s leverage can be applied.",
      "Est. Value": "2. gp",
      "Name": "Crowbar",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A wooden box. Carved by someone who has had no formal training in woodworking, and it shows.",
      "Est. Value": "0.15 gp",
      "Name": "Crude Box",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A crudely carved wooden holy symbol.",
      "Est. Value": "0.5 gp",
      "Name": "Crude Holy Symbol",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A crudely carved wooden pipe.",
      "Est. Value": "0.15 gp",
      "Name": "Crude Pipe",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "Metal box of unidentifiable powder.",
      "Est. Value": "0.5 gp",
      "Name": "Curious Powder Box",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "A long-dead fey, dried and petrified as a trophy and hanging from ceiling.",
      "Est. Value": "5. gp",
      "Name": "Dead Fey",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "120 lb"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "The mounted head of a deer, it's impossibly massive horns have broken in places.",
      "Est. Value": "5. gp",
      "Name": "Deer Bust",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "7 lb"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "A one-gallon cask of Demon’s Vale Wine; a fiery red wine known to be made from hot peppers.",
      "Est. Value": "10. gp",
      "Name": "Demon's Vale Wine",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A six sided dice. Probably used in some silly tabletop game.",
      "Est. Value": "0.15 gp",
      "Name": "Dice (6 Sided)",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "18 dried rashers of meat, possibly the largest rashers you have ever seen. They are wrapped in a sheep bladder cloth which has been labelled 'THUNDERER MEAT' in large, rough handwriting.",
      "Est. Value": "10. gp",
      "Name": "Dinosaur Bacon",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "Hanging from a drying rack are two large Dire Bat wings. It is unclear how long they have been seperated from the rest of the bat, but they are in good condition and could potentially be used as a crafting material.",
      "Est. Value": "2. gp",
      "Name": "Dire Bat Wings",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "A disk of finely polished stone. On one side, the Elvish rune for death is inscribed in blackest obsidian. Upon the other, the Dwarven rune for life is inscribed in the palest ivory.",
      "Est. Value": "4. gp",
      "Name": "Disk of Balance",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "The party finds a complete set of bronze and carved stone weight training equipment issued to the 4th army of some Ancient Empire. There is an inscription in one of the weights that reads 'Dost thou even lift, brother?'",
      "Est. Value": "20. gp",
      "Name": "Weight Training Equipment",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "200 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A flower that has been dried out to preserve it.",
      "Est. Value": "0. gp",
      "Name": "Dried Flower",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "A ruby the size of a man’s fist which sparkles and gleams with the promise of untold wealth in the faintest of lights, but which crumbles to dust upon the lightest touch.",
      "Est. Value": "0. gp",
      "Name": "Dust Ruby",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Armor",
      "Description": "An archer’s bracer of leather and electrum.",
      "Est. Value": "2.5 gp",
      "Name": "Electrum Bracer",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A leather ball stuffed with chicken feathers. On a DC 15 peception check the player can find an electrum ring amongst the feathers.",
      "Est. Value": "3.5 gp",
      "Name": "Leather Ball",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "An empty vial, just waiting to be filled with something more valuable than itself.",
      "Est. Value": "0.35 gp",
      "Name": "Empty Vial",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This simple agate gem has translucent circles of white dotted around its surface which bring to mind the image of an eye.",
      "Est. Value": "10. gp",
      "Name": "Eye Agate Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "A life sized copper statue of a fat cat with amber eyes that purrs when stroked. Curiously, it does not detect as magic.",
      "Est. Value": "5. gp",
      "Name": "Fat Cat Statue",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A 5’ diameter wheel of fine, aged cheese",
      "Est. Value": "0.5 gp",
      "Name": "Fine Cheese",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "Useful for catching fish.",
      "Est. Value": "1. gp",
      "Name": "Fishing Tackle",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Unknown",
      "Category": "Armor",
      "Description": "A small wooden shield bound in human skin bearing a tattoo that appears to be some sort of map. The skin is held in place with a rim of beaten copper.",
      "Est. Value": "7. gp",
      "Name": "Flesh Shield",
      "Properties": "Provides +2 AC",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "6 lb"
    },
    {
      "Author": "PHB",
      "Category": "Treasure",
      "Description": "A carved steel striker and a piece of shaped flint that allows the user to start a fire.",
      "Est. Value": "0.3 gp",
      "Name": "Flint & Steel",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A handheld water pan with a number of chunks of pyrite in it, otherwise known as 'Fool's Gold'. You might be able to convince someone that these nuggets are real gold, but not for very long.",
      "Est. Value": "0.5 gp",
      "Name": "Fool's Gold",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A bag containing 1d8 torches infused with pleasant fragrances. This may have been owned by a tanner, to cover the overwhelming stench of tannin that is used in the leathermaking process.",
      "Est. Value": "4. gp",
      "Name": "Fragrant Torches",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Book",
      "Description": "A wizard called Frolee appears to have mass produced a five page guide to mustaches and beards. It has a unique, hairy cover made out of bearskin.",
      "Est. Value": "2. gp",
      "Name": "Frolee's Guide to Follicle Perfection",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A wreath of eight garlic buds.",
      "Est. Value": "0.2 gp",
      "Name": "Garlic",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A teal gem.",
      "Est. Value": "1. gp",
      "Name": "Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small Azurite gem. It is opaque and a deep mottled blue in colour.",
      "Est. Value": "10. gp",
      "Name": "Gem of Azurite",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A 14 inch diameter sealed glass sphere containing water and an ornamental fish.",
      "Est. Value": "3. gp",
      "Name": "Glass Sphere",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "8 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Treasure",
      "Description": "A sparkling handful of raw gems.",
      "Est. Value": "0.01 gp",
      "Name": "Glittering Glass",
      "Properties": "These convincing rocks are actually made of a river-tumbled glassy stone that is said to form from the aftermath of elemental turmoil.",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "This is a tiny jar of glitternight dust. (a narcotic)",
      "Est. Value": "3. gp",
      "Name": "Glitternight Dust",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A small green stone that gives off a feint light that's practically imperceptable in anything other than pitch black darkness. It could be used as a marker or a light source in a pinch.",
      "Est. Value": "2. gp",
      "Name": "Glow Stone",
      "Properties": "Provides dim-light for a 5 foot radius.",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A pound of goat jerky.",
      "Est. Value": "0.2 gp",
      "Name": "Goat Jerky",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small gold bracelet. It's design is plain so as to be appropriate for anyone.",
      "Est. Value": "25. gp",
      "Name": "Gold Bracelet",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A charming golden locket with a painted portrait inside.",
      "Est. Value": "25. gp",
      "Name": "Gold Locket",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "A crosspeen hammer forged from steel. It has a gently crowned flat face that has been hardened and tempered for toughness. The handle is hand carved ash, flame treated and oiled.",
      "Est. Value": "1. gp",
      "Name": "Hammer",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "",
      "Est. Value": "2. gp",
      "Name": "Hand Mirror",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A rather dull gray-black hematite gem with the remains of a necklace fasten on its back.",
      "Est. Value": "10. gp",
      "Name": "Hematite",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A reliquary containing the bones of an ancient holy man",
      "Est. Value": "0. gp",
      "Name": "Holy Bones",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "An old tome, written for the clergy of Pelor. It has a stiff leather dust jacket which has been worn down on the spine and a broken clasp once used to attach a chain",
      "Est. Value": "4. gp",
      "Name": "Holy Book",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Adventuring Gear",
      "Description": "A wooden holy symbol. ",
      "Est. Value": "0.25 gp",
      "Name": "Holy Symbol",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A quart of honey.",
      "Est. Value": "1. gp",
      "Name": "Honey",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Potion",
      "Description": "A small, crystal vial of a clear, viscous liquid that smells strongly of honeysuckle.",
      "Est. Value": "4. gp",
      "Name": "Honeysuckle Potion",
      "Properties": "Drinking this potion will heal a character 1d4 - 1 health.",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A delicately carved hope chest of polished cherry wood. The box contains nothing but a remarkably fine, gray sand drawn from some unknown locale. Beneath the new moon, this sand glows a faint blue.",
      "Est. Value": "10. gp",
      "Name": "Hope Chest",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "30 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Inhalation herbs & essences provide natural healing remedies for all manner of symptoms such as headaches, colds and flu.",
      "Est. Value": "0.2 gp",
      "Name": "Inhalation Herbs & Essences",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A vial of black ink, for use with a quill.",
      "Est. Value": "0.6 gp",
      "Name": "Ink",
      "Properties": "When unstoppered underwater, this item causes an inky cloud to fill a 10′ cubic area which lasts for the duration of the room. It effectively renders all characters and monsters in the area obscured from ranged attacks.",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "An iron belt buckle that's beginning to rust.",
      "Est. Value": "0.03 gp",
      "Name": "Iron Buckle",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "An iron earring. Missing it's twin.",
      "Est. Value": "0.1 gp",
      "Name": "Iron Earring",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A large iron nail, useful for fixing things together.",
      "Est. Value": "0.03 gp",
      "Name": "Iron Nail",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A large iron spike, useful for fixing heavy items together.",
      "Est. Value": "0.35 gp",
      "Name": "Iron Spike",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An iron torc with six small silver figurines: A hare, a horse, a spear, a wolf’s head, a simple circle, and an oak tree.",
      "Est. Value": "9. gp",
      "Name": "Iron Torc",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Whale ivory leg prosthetic",
      "Est. Value": "5. gp",
      "Name": "Ivory Peg Leg",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A jar containing six eyeballs (2 human, 1 goblin, 1 ogre, 1 worg, and 1 hawk) in a clear liquid.",
      "Est. Value": "2. gp",
      "Name": "Jar o' Eyeballs",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "½ of jerked meat",
      "Est. Value": "0.1 gp",
      "Name": "Jerked Meats",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A 35 lb keg of iron nails",
      "Est. Value": "2. gp",
      "Name": "Keg o' Nails",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "35 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A pair of bear fur knee breeches, slightly worn from having been used when horse riding.",
      "Est. Value": "1. gp",
      "Name": "Knee Breeches",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Adventuring Gear",
      "Description": "",
      "Est. Value": "",
      "Name": "Lantern",
      "Properties": "A Lantern provides bright light within a radius of 10 squares.  The light lasts 8 hours per pint of oil.",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A gem of lapis lazuli, dark blue in colour with light yellow flecks.",
      "Est. Value": "10. gp",
      "Name": "Lapis Lazuli Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large pile of coal. Two small, rough diamonds are hidden near the bottom. (20gp, 25 gp)",
      "Est. Value": "",
      "Name": "Large Pile of Coal",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Satchel of gold painted lead coins.",
      "Est. Value": "0.1 gp",
      "Name": "Lead Coins",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "",
      "Est. Value": "",
      "Name": "Leather Quiver",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "",
      "Est. Value": "",
      "Name": "Leather Satchel",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A bright red hooded cape sized for a child, spattered with dried blood.",
      "Est. Value": "1. gp",
      "Name": "Little Riding Hood",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Lynx eye is a specific type of labradorite (a feldspar gemstone). Labradorite as a class of stones is pale to dark gray and has patches of colored reflections. This 'flash' is most commonly blue but can be of all shades. 'Green Flash' labradorite is called lynx eye in the Realms. ",
      "Est. Value": "10. gp",
      "Name": "Lynx Eye Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Baldur's Gate",
      "Category": "Treasure",
      "Description": "Lynx eye is a special type of labradorite. It is pale to dark grey and has patches of coloured reflections. This 'flash' is most commonly blue but can be of all shades. 'Green Flash' labradorite is called Lynx Eye in the local regions.",
      "Est. Value": "10. gp",
      "Name": "Lynx Eye Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "Someone used this to get married",
      "Est. Value": "10. gp",
      "Name": "Magical Ring of Engagement",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "",
      "Est. Value": "2. gp",
      "Name": "Magnifying Glass",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A large malachite gem. It is striated light and dark green across its polished surface.",
      "Est. Value": "10. gp",
      "Name": "Malachite Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A mask carved to look like the face of a man, but which has been fitted for something wholly other.",
      "Est. Value": "1. gp",
      "Name": "Man Mask",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Mechanical mice which run through the walls of an ancient keep. They have done so for longer than written record can attest. They seem to be a benign presence – lacking even the slightest pestilent qualities of their flesh-and-blood counterparts – and have become an accepted presence here. Who their creator was, how they are fueled, and what purpose they serve (if any) are mysteries which may never be solved.",
      "Est. Value": "",
      "Name": "Mechanical Mice",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "D3 sprigs of mistletoe",
      "Est. Value": "10. gp",
      "Name": "Mistletoe",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A beautiful moss agate gem. It is a translucent pink with a mossy gray texture.",
      "Est. Value": "10. gp",
      "Name": "Moss Agate Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "An unused fishing net made out of spun mammoth hairs.",
      "Est. Value": "0.5 gp",
      "Name": "Net",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small opaque black gem.",
      "Est. Value": "10. gp",
      "Name": "Obsidian Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Adventuring Gear",
      "Description": "A flask of oil suitable for use in a lantern. ",
      "Est. Value": "0.5 gp",
      "Name": "Oil",
      "Properties": "Enough to last for 48 hours. As an action, you can splash the oil in this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. Make a ranged attack against a target creature or object, treating the oil as an improvised weapon. On a hit, the target is covered in oil. If the target takes any fire damage before the oil dries (after 1 minute), the target takes an additional 5 fire damage from the burning oil. You can also pour a flask of oil on the ground to cover a 5-foot-square area, provided that the surface is level. If lit, the oil burns for 2 rounds and deals 5 fire damage to any creature that enters the area or ends its turn in the area. A creature can take this damage only once per turn.",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A ragged old hat with a moth eaten brim.",
      "Est. Value": "0.03 gp",
      "Name": "Old Hat",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Adventuring Gear",
      "Description": "An old pouch. Works as any pouch might, but it has a hole in it.",
      "Est. Value": "0.15 gp",
      "Name": "Old Pouch",
      "Properties": "Every day, player loses 1d4 of any small object stored in the pouch.",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "Father’s old round shield, beneath the boss is the sigil of ______, valiant conduct by the bearer may draw the eye of the God.",
      "Est. Value": "1. gp",
      "Name": "Old Round Shield",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A rotten saddlebag with a few coins spilling out. The copper coins have some verdigris and the silver coins are badly tarnished.",
      "Est. Value": "2. gp",
      "Name": "Old Saddlebag",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A rotting wheelbarrow holding 167 torches.",
      "Est. Value": "1.6 gp",
      "Name": "Old Wheelbarrow",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A spare bit of parchment.",
      "Est. Value": "0.35 gp",
      "Name": "Parchment",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A straight wooden handle with a curved iron pick useful for breaking up rocky surfaces or hard earth. It would not make for an effecitve weapon, but without the head the handle would make for a rudimentary club.",
      "Est. Value": "2. gp",
      "Name": "Pick Axe",
      "Properties": "1d4 Bludgeoning - Simple - Light",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A classic 52 card set of playing cards.",
      "Est. Value": "0.5 gp",
      "Name": "Playing Cards",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A fragrant bowl of potpourri.",
      "Est. Value": "0.05 gp",
      "Name": "Potpourri",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This rhodochrosite gem is a light pink colour and shaped to resemble a small heart.",
      "Est. Value": "10. gp",
      "Name": "Rhodochrosite Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A stone that has been worn down to a smooth finish. Probably from a river bed.",
      "Est. Value": "0. gp",
      "Name": "River Stone",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Adventuring Gear",
      "Description": "100’ of rope",
      "Est. Value": "",
      "Name": "Rope",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "",
      "Est. Value": "0.3 gp",
      "Name": "Saw",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "",
      "Est. Value": "1. gp",
      "Name": "Scroll Case",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This silk handkerchief is embroidered with a pale pink pattern.",
      "Est. Value": "25. gp",
      "Name": "Silk Handkerchief",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A large jug with a wide mouth coated in silver.",
      "Est. Value": "25. gp",
      "Name": "Silver Ewer",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A slightly dirty mirror set in a painted wooden frame.",
      "Est. Value": "25. gp",
      "Name": "Small Mirror",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "Some fresh, waxy soap. It smells faintly of lavender.",
      "Est. Value": "0.15 gp",
      "Name": "Soap",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "that says encouraging things like 'Everything's GREAT!' and 'Your body temperature is squarely within normal human range!'",
      "Est. Value": "",
      "Name": "Spork of Positive Reinforcement",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A steel chain measuring 1 foot long.",
      "Est. Value": "0.75 gp",
      "Name": "Steel Chain",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "",
      "Est. Value": "10. gp",
      "Name": "Steel Lockbox",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Has no function, but glows and vibrates in a way that suggests it could be used for distributing extreme pain. ",
      "Est. Value": "",
      "Name": "Threatening Probe",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Translucent brown with a bright golden center.",
      "Est. Value": "10. gp",
      "Name": "Tiger Eye Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A tin drinking cup.",
      "Est. Value": "0.1 gp",
      "Name": "Tin Cup",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A full tinderbox.",
      "Est. Value": "0.15 gp",
      "Name": "Tinderbox",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A small amount of tobacco wrapped in a large soft leaf.",
      "Est. Value": "0.15 gp",
      "Name": "Tobacco",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Adventuring Gear",
      "Description": "A short stick with oil-soaked cloth wrapped around one end so it can burn as a torch.",
      "Est. Value": "0.2 gp",
      "Name": "Torch",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Turquoise is an opaque aqua stone with darker mottling, and is found in the more arid reaches of the Realms. Horsemen will often place a sliver of this stone in a horse's harness as a sign of good luck. ",
      "Est. Value": "10. gp",
      "Name": "Turquoise Gem",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A paper note that's been left on a damp floor. It's completely illegible.",
      "Est. Value": "0. gp",
      "Name": "Unreadable Note",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Adventuring Gear",
      "Description": "An old whetstone and a half-used vial of oil. The stone itself is ever-so-slightly worn into a curve from years of use, but it will be decades before it's wear renders it useless.",
      "Est. Value": "0.15 gp",
      "Name": "Used Whetstone",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/SPYROHAWK",
      "Category": "Ring",
      "Description": "",
      "Est. Value": "0. gp",
      "Name": "Vanishing Ring",
      "Properties": "After half a day of wearing this ring, it disappears completely and is not found again.",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A wooden walking stick.",
      "Est. Value": "0.15 gp",
      "Name": "Walking Stick",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A dozen glow wasps in a round wire cage with handle. Equal to a torch light at night. Require food and water daily.",
      "Est. Value": "",
      "Name": "Wasplight Lantern",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "A waterskin made from a sheep's bladder.",
      "Est. Value": "0.2 gp",
      "Name": "Waterskin",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A weighted dice.",
      "Est. Value": "0.5 gp",
      "Name": "Weighted Die (6 Sided)",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A small wooden whistle.",
      "Est. Value": "0.5 gp",
      "Name": "Whistle",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A grey and white wolf pelt.",
      "Est. Value": "0.5 gp",
      "Name": "Wolf Pelt",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A weather worn wooden board, inscribed with patterns which make it clear that it was once used for a game whose rules have long since been lost to time.",
      "Est. Value": "",
      "Name": "Wooden Board",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A long wooden spike, used to fix soft items together or kill vampires while they sleep.",
      "Est. Value": "0.15 gp",
      "Name": "Wooden Spike",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "",
      "Est. Value": "",
      "Name": "Wormrose Incense",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A narcotic made from the petal of a wormrose flower.",
      "Est. Value": "5. gp",
      "Name": "Wormscrape",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "½ tin of raisins.",
      "Est. Value": "0.1 gp",
      "Name": "Raisins",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A crude club made to clobber animals and people alike, carved roughly from a thick cedar branch.",
      "Est. Value": "0.1 gp",
      "Name": "Club",
      "Properties": "1d4 Bludgeoning - Simple - Light",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A length of stoud wood ranging six to nine feet in length and shod with metal at both ends.",
      "Est. Value": "0.2 gp",
      "Name": "Quarterstaff",
      "Properties": "1d6 Bludgeoning - Simple - Versatile (1d8)",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A farming tool that can be used as a weapon if needed. It has a long curved blade attached to a short wooden handle.",
      "Est. Value": "1. gp",
      "Name": "Sickle",
      "Properties": "1d4 Slashing - Simple - Light",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A small chain with flint stone in the shape of a triangle hanging from it. Popular tradition states that this is a 'Thunderstone', a rock that has fallen from the sky during a storm. The fact that is resembles a primitive axe head, however, may fall upon deaf ears. ",
      "Est. Value": "0.2 gp",
      "Name": "Thunderstone Amulet",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "BOTW",
      "Category": "Weapon",
      "Description": "A kitchen implement often used for serving delicious soups. It was carved from the wood of a sturdy tree, so it actually packs quite the wallop.",
      "Est. Value": "0.2 gp",
      "Name": "Soup Ladel",
      "Properties": "1d4 Bludgeoning - Light",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A farming tool primarily used for tilling fields. Its fine craftsmanship is sturdy enough to withstand backbreaking fieldwork, but its battle applications are untested.",
      "Est. Value": "0.2 gp",
      "Name": "Farming Hoe",
      "Properties": "1d4 Bludgeoning - Two-Handed",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "Made for paddling boats, but it was made sturdy enough to fight strong currents. Maybe it's useful for self-defense in a pinch.",
      "Est. Value": "0.2 gp",
      "Name": "Boat Oar",
      "Properties": "1d4 Bludgeoning - Two-Handed",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "6 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "Just a mop to the untrained eye, it excels at tidying up the place. But it owes its sturdy construction to a true craftsman, so it actually has some combat merit.",
      "Est. Value": "0.2 gp",
      "Name": "Wooden Mop",
      "Properties": "1d4 Bludgeoning - Two-Handed",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A farming tool used to collect hay efficiently. It's light enough to be used by anyone. The four prongs are very sharp.",
      "Est. Value": "0.2 gp",
      "Name": "Farming Pitchfork",
      "Properties": "1d4 Piercing - Two-Handed",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "6 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A fisherman's tool that excels at catching large fish. Its particularly sharp spearhead makes it valuable as a weapon as well.",
      "Est. Value": "0.4 gp",
      "Name": "Fishing Harpoon",
      "Properties": "1d6 Piercing - Versatile (1d8) - Thrown (Range: 20/60)",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "A finely made silver chalice etched in arcane symbols. An arcane check will find no trace of magic, however, and it may be that these are simply aesthetic.",
      "Est. Value": "7. gp",
      "Name": "Silver Chalice",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "A silver-tipped quill with an elaborate white feather.",
      "Est. Value": "7. gp",
      "Name": "Silver-tipped Quill",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "A broad dagger with a hilt that can be unscrewed. The space revealed is sufficient to hold up to 25 coins, and currently holds 10 gold coins and 15 silver coins.",
      "Est. Value": "15. gp",
      "Name": "Smuggler's Dagger",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Trap",
      "Description": "",
      "Est. Value": "",
      "Name": "Marbles",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "An old dead rat. It has begun to decay, and eminates an unpleasant smell.",
      "Est. Value": "0. gp",
      "Name": "Dead Rat",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PHB",
      "Category": "Adventuring Gear",
      "Description": "",
      "Est. Value": "",
      "Name": "Hourglass",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "u/LeBlondes",
      "Category": "Weapon",
      "Description": "The Garrote Wire can only be used on a medium or small creature while the user has advantage on the attack roll. On hit, the target takes 1d4 slashing damage and is grappled. Until the grapple ends, the target cannot breath and begins to choke, and the user has advantage on attack rolls against it.",
      "Est. Value": "2. gp",
      "Name": "Garotte Wire",
      "Properties": "1d4 Slashing - Finesse - Light - Two-Handed",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "This perculiar dice is made out of copper and has two sides. Engraved on one side is the portrait of a long forgotten ruler, on the other is an ornate two headed chimera. Useful for making decisions. Doesn't roll well.",
      "Est. Value": "1. gp",
      "Name": "Two-Sided Die",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Fable II",
      "Category": "Treasure",
      "Description": "Well, it's brown, but that doesn't necessarily make it chocolate. Still, at least its sweet. In an unusual and repugnant way.",
      "Est. Value": "1. gp",
      "Name": "Mudbrick Chocolate",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Someone has managed to cram all the stench of an Ogre into one reeking bottle. Why? The world may never know. No human should ever willingly apply this to their body or attire.        ",
      "Est. Value": "0.5 gp",
      "Name": "'Eau D'Ogre' Perfume",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A sack of prized flower bulbs",
      "Est. Value": "",
      "Name": "Sack of Flower Bulbs",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Quest Hook",
      "Description": "Receipt for delivery of slaves",
      "Est. Value": "",
      "Name": "Sales Receipt",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Package of d6 sausages",
      "Est. Value": "",
      "Name": "Sausages",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Book",
      "Description": "A scroll detailing the bound service of two men-at-arms sworn to six months of service.",
      "Est. Value": "",
      "Name": "Service Record",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A silver brooch depicting a mage’s tower. (This could be a pass for magical wards at the mage’s tower, at the DM’s discretion.)",
      "Est. Value": "12. gp",
      "Name": "Silver Brooch",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A set of 8 silver spoons.",
      "Est. Value": "2. gp",
      "Name": "Silver Spoons",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A 1 quart jar of rare purple snail dye.",
      "Est. Value": "",
      "Name": "Snail Dye",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A straw broom",
      "Est. Value": "",
      "Name": "Straw Broom",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Tactical defense stick…",
      "Est. Value": "",
      "Name": "Tactical Defense Stick",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "D8 springs of wolfsbane",
      "Est. Value": "",
      "Name": "Wolfsbane",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "You'll never know if the owner willingly parted with this prosthetic. You do know that it makes an effective cudgel.",
      "Est. Value": "",
      "Name": "Peg Leg",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A pick axe has a curved iron head that is useful for breaking up rocky surfaces. A prick axe has an uncomfortable knobbly handle and the axe head constantly falls off.",
      "Est. Value": "",
      "Name": "Prick Axe",
      "Properties": "1d4 Piercing - Simple - Light",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Baldur's Gate II",
      "Category": "Treasure",
      "Description": "This is a small jar of Adamantine dust, most likely the end result of exposing a Drow item to the light of day. It seems the previous owner wasn't quite ready to let go of it.",
      "Est. Value": "1. gp",
      "Name": "Adamantine Dust",
      "Properties": "",
      "Rarity": "Mundane",
      "Rarity Number": "1",
      "Requirements": "",
      "Weight": "1 lb"
    }
  ],
  "Other": [
    {
      "Author": "Author",
      "Category": "Category",
      "Description": "Description",
      "Est. Value": "Est. Value",
      "Name": "Name",
      "Properties": "Properties",
      "Rarity": "Rarity",
      "Rarity Number": "Rarity Number",
      "Requirements": "Requirements",
      "Weight": "Weight"
    }
  ],
  "Rare": [
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Whenever an arrow is fired in the vicinity of this amulet’s wearer, it will strike the amulet wearer",
      "Est. Value": "",
      "Name": "Arrow Magnet Amulet",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/Bloka2au",
      "Category": "Wondrous Item",
      "Description": "A plain wooden spoon that appears to have been used in many, many meals. The spoon comes in a stained walnut box with two brass hinges and a brass hook on the front. No other markings are present. [Any markings made on the box or spoon will disappear in 24 hours. The box itself is magical in nature and will alter any spoon made to the same size of the Spoon of Cooking to become a duplicate of the Spoon of Cooking.]",
      "Est. Value": "",
      "Name": "Bloka Tao's Spoon of Cooking",
      "Properties": "Any creature that touches the spoon must make a DC 12 Charisma save or be dominated by the spoon for 1d2 hours. The spoon then urges the creature to make the most delicious meal they can from the immediately available ingredients. ",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Provides +2 AC when worn, but attracts the attention of crabs, who will come from nearby and cling to the wearer",
      "Est. Value": "",
      "Name": "Crab Crown",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Anything significant that happens to the doll happens to you, beneficial or harmful.",
      "Est. Value": "",
      "Name": "Curse Doll",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A staff that could change into a hammer and give him extra strength while it was in that mode.",
      "Est. Value": "",
      "Name": "Mr. Hammer's Crazy Staff",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A gear-driven ships navigational calculator enclosed in a jewelwood box.",
      "Est. Value": "5,000. gp",
      "Name": "Navigational Calculator",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "The silver hilt of a sword with a grip of black leather. The blade is missing, or never existed to begin with. One night per year, however, on the eve of the new year, the hilt is possessed of a ghostly blade – allowing it to perform its duties as a sword once more.",
      "Est. Value": "1,000. gp",
      "Name": "New Year's Sword",
      "Properties": "1d8+4 Slashing - Versatile (1d10+4)",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Martial Weapon Expertise Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A charm of twisted black obsidian. Touching the charm unleashes strange, ghostly visions from a strange and alien world – utterly different in every particular, but eerily similar to our own world in its broad scope and form.",
      "Est. Value": "",
      "Name": "Obsidian Charm",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "An owlbear costume. Gives the wearer a +10 to disguise when attempting to disguise as an Owlbear.",
      "Est. Value": "",
      "Name": "Owlbear Costume",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Ash of phoenix in necklace choker – instant revive to wearer (takes 10 rounds/1 minute)",
      "Est. Value": "",
      "Name": "Phoenix Choker",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PlatypusPal",
      "Category": "Potion",
      "Description": "Potion 3: Phoenix Restorative. The next time the drinker is reduced to 0 hit points, they deal area fire damage, and return to full health, only happens once. The player has no special knowledge this is true, but the flavor of the draught burns their throat but leaves them feeling oddly optimistic. Fire damage dealt should be based on circumstance, but if you can get away with lots, it'd be the most fun.",
      "Est. Value": "",
      "Name": "Phoenix Restorative Potion",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Weapon",
      "Description": "You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the rarity of the ammunition. Once it hit a target, the ammunition is no longer magical. Value listed is for individual units.",
      "Est. Value": "100. gp",
      "Name": "1d20 Ammunition +2",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This small black sphere measures 3/4 of an inch in diameter and weighs an ounce. You can use an action to throw the bead up to 60 feet. The bead explodes on impact and is destroyed. Each creature within a 10-foot radius of where the bead landed must succeed on a DC 15 Dexterity saving throw or take 5d4 force damage. A sphere of transparent force then encloses the area for 1 minute. Any creature that failed the save and is completely within the area is trapped inside this sphere. Creatures that succeeded on the save, or are partially within the area, are pushed away from the center of the sphere until they are no longer inside it. Only breathable air can pass through the sphere's wall. No attack or other effect can. An enclosed creature can use its action to push against the sphere's wall, moving the sphere up to half the creature's walking speed. The sphere can be picked up, and it's magic causes it to weigh only 1 pound, regardless of the weight of creatures inside. ",
      "Est. Value": "960. gp",
      "Name": "1d4 + 4 Beads of Force",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Book",
      "Description": "A large tome bound in thick bison-hide that is a common-orcish language primer, as well as a primer on orcish culture. The author of the primer, Darius Woodherd, seems to have added a lot of information on orcish heraldry and politics, as well. Darius spent almost twenty years amongst the orcs of the north, and eventually married an orc before being killed a score of years ago in a rival tribe’s ambush. ",
      "Est. Value": "90. gp",
      "Name": "A Study of Orcs, by Darius Woodherd",
      "Properties": "Grants a +2 circumstance check on speaking orcish, knowledge of orcish history and heraldry, and on diplomacy checks with orcs.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "A large, nearly unbreakable leaf from Tree of Adamant.",
      "Est. Value": "200. gp",
      "Name": "Adamant Leaf",
      "Properties": "The leaf is extremely durable; no amount of force applied to the leaf is able to break it and it can only be damaged by Piercing or Slashing with a weapon. ",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A transparent dark green Alexandrite emerald.",
      "Est. Value": "500. gp",
      "Name": "Alexandrite Emerald",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This amulet is a golden disk on a chain. It usually bears the image of a lion or other powerful animal. ",
      "Est. Value": "8,000. gp",
      "Name": "Amulet of Health",
      "Properties": "Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher. ",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement.",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Quest Hook",
      "Description": "Miniature golden replica of ancient mythical temple – location map inside",
      "Est. Value": "30. gp",
      "Name": "Ancient Temple Replica",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "Animated pet rock – capable of killing people!",
      "Est. Value": "250. gp",
      "Name": "Animated Pet Rock",
      "Properties": "Spend a bonus action to have the rock attack anything within 25 feet of the pet owner, can only be used every other turn (the rock needs to return to its owner!). Deals 1d4+1 bludgeoning damage.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A tiny toy soldier which marches ceaselessly back and forth – eternally vigilant and pissed off if anyone disturbs.",
      "Est. Value": "300. gp",
      "Name": "Animated Toy Soldier",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A dirty canvas bag containing twenty pounds of an aphrodisiac root.",
      "Est. Value": "400. gp",
      "Name": "Aphrodisiac Root",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "20 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Aquamarine is a hard, transparent form of beryl, blue-green in colour. These sought after gems are found primarily among the tribes that roam the tundra.",
      "Est. Value": "500. gp",
      "Name": "Aquamarine",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Weapon",
      "Description": "A large arbalest/bolt thrower. It is disassembled and crated for shipping. It requires four strong men to lift. When reassembled, it hurls a 5’ bolt for 2d12 damage. ",
      "Est. Value": "3,000. gp",
      "Name": "Arbalest",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "2000 lb"
    },
    {
      "Author": "AtomicArchitect",
      "Category": "Wondrous Item",
      "Description": "This loincloth causes the wearer to have extremely elevated self confidence. As a result, they get +2 on Bluff Diplomacy and Intimidate checks, and -2 on Listen Search Spot and Appraise checks, they also tend to make reckless decisions more often.",
      "Est. Value": "500. gp",
      "Name": "Architect's Underwear of Confidence",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "You have a +1 bonus to AC while wearing this armor.",
      "Est. Value": "1,500. gp",
      "Name": "Armor +1",
      "Properties": "Light, Medium or Heavy",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "8 - 60"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Armor",
      "Description": "This is a set of Studded Leather Armour that has been enchanted with the spirit of a long dead barbarian warrior. Once per day it allows the user to channel it's rageful spirit.",
      "Est. Value": "300. gp",
      "Name": "Armor of Barbarian Rage",
      "Properties": "Light Armor (AC is 14+DEX mod) - Once per day the user can use Barbarian Rage during this rage: You have advantage on Strength checks and Strength saving throws. When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels, counting your own level as the levels you would have in barbarian, as shown in the Rage Damage column of the Barbarian table. You have resistance to bludgeoning, piercing, and slashing damage. You cannot cast any spells while in the rage and any concentration spells being maintained when you enter rage instantly fade. This effect lasts for 1 minute, or dissipates if you do not deal physical or take any type of damage in a turn. ",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "13 lb"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below. ",
      "Est. Value": "6,000. gp",
      "Name": "Armor of Resistance",
      "Properties": "Light, Medium or Heavy",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "8 - 60"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "While wearing this armor, you have resistance to one of the following damage types: bludgeoning, piercing, or slashing. The DM chooses the type or determines it randomly. Curse. This armor is cursed, a fact that is revealed only when an identify spell is cast on the armor or you attune to it. Attuning to the armor curses you until you are targeted by the remove curse spell or similar magic: removing the armor fails to end the curse. While cursed you have vulnerability to two of the three damage type associated with the armor (not the one to which it grants resistance). ",
      "Est. Value": "",
      "Name": "Armor of Vulnerability",
      "Properties": "Plate Armor",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "65 lb"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead.",
      "Est. Value": "6,000. gp",
      "Name": "Arrow-catching Shield",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "6 lb"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "Created by the very old and very crotchety wizard Arval long ago, this hollow silver box the size of a deck of playing cards has a rotating dial on top, as well as a button. When the button is pressed, a single target of the wielder's choice is linked with the device magically. By then rotating the dial, the user can alter his target's voice by up to 100%. That is to say the target can be either muted or doubled in volume, and anywhere in between. A will save DC 30 is required to resist the effect.",
      "Est. Value": "1,800. gp",
      "Name": "Arval's Soundpiece",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Container",
      "Description": "Halves the weight of anything placed inside of it. Nothing larger than the backpack can fit inside the backpack.",
      "Est. Value": "1,000. gp",
      "Name": "Backpack of Effortlessness",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "A coin that always comes up tails. Placing it anywhere tails side down causes it to flip itself over after 1 round. It takes 50 pounds of pressure to prevent this flip.",
      "Est. Value": "600. gp",
      "Name": "Bad Coin",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Weapon",
      "Description": "1d6 angel feathers aura of good; razor sharp; stronger than steel (can be used as weapon like dagger)",
      "Est. Value": "",
      "Name": "Bag of Angel Feathers",
      "Properties": "1d4 Piercing - Finesse, Light, Range, Thrown - 20/60",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "The Bag of Ash acts like a jar of infinite water, except it just makes a grey, sooty ash.",
      "Est. Value": "600. gp",
      "Name": "Bag of Ash",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "Inside this heavy cloth bag are 3d4 dry beans. The bag weights 1/2 pound plus 1/4 pound for each bean it contains.",
      "Est. Value": "",
      "Name": "Bag of Beans",
      "Properties": "See DMG page 152.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This ordinary rust coloured cloth bag appears to be empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table that corresponds to the bag’s color. The creature vanishes at the next dawn or when it is reduced to 0 hit points. The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature. Once three fuzzy objects have been pulled from the bag, the bag cannot be used again until the next dawn.",
      "Est. Value": "3,000. gp",
      "Name": "Bag of Tricks, Rust",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This ordinary tan cloth bag appears to be empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table that corresponds to the bag’s color. The creature vanishes at the next dawn or when it is reduced to 0 hit points. The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature. Once three fuzzy objects have been pulled from the bag, the bag cannot be used again until the next dawn.    ",
      "Est. Value": "6,480. gp",
      "Name": "Bag of Tricks, Tan",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Weapon",
      "Description": "Ballistic Fist Hammer (Hammer with each side acting as ballistic fists from Fallout series)",
      "Est. Value": "",
      "Name": "Ballistic Fist Hammer",
      "Properties": "Damage? Will determine cost.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "7 lb"
    },
    {
      "Author": "/u/Silanoch",
      "Category": "Weapon",
      "Description": "Despite appearing to be a normal dagger, even those not able to recognise the presence of magic can tell that there is something imbued in the unassuming metal hilt and blade.  When appraised it transpires that this blade was buried with a banshee and it's spirit has somehow been absorbed. Now whomever uses the dagger carries the risk that its spirit will be unleashed.",
      "Est. Value": "2,000. gp",
      "Name": "Banshee Spirit Dagger",
      "Properties": "On a critical hit, it'll scream like her. It hasn't happened yet, but I imagine it'll either force the target to make a will save or be feared, or possibly drop to zero hit points.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "To all intents and purposes this resembles a Belt of Fire Giant Stength, and it certainly does have a giant's strength enchantment on it; unfortunately, the it was accidentally made with the strength of a baby fire giant. Fire giant babies have roughly the same strength as an average human man. ",
      "Est. Value": "1,000. gp",
      "Name": "Belt of Baby Fire Giant Strength",
      "Properties": "While wearing this belt, your Strength score changes to 10. If your Strength is already equal to or greater than 10, the item has no effect on you.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this belt, you gain the following benefits: Your Constitution score increases by 2, to a maximum of 20. You have advantage on Charisma (Persuasion) checks made to interact with dwarves. In addition, while attuned to the belt, you have a 50 percent chance each day at dawn of growing a full beard if you're capable of growing one, or a visibly thicker beard if you already have one. If you aren't a dwarf, you gain the following additional benefits while wearing the belt: You have advantage on saving throws against poison, and you have resistance against poison damage. You have darkvision out to a range of 60 feet. You can speak, read, and write Dwarvish. ",
      "Est. Value": "6,000. gp",
      "Name": "Belt of Dwarvenkind",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this belt, your Strength score changes to 21. If your Strength is already equal to or greater than 21, the item has no effect on you.",
      "Est. Value": "13,000. gp",
      "Name": "Belt of Hill Giant Strength",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Weapon",
      "Description": "You gain +1 bonus to attack and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon your hit point maximum increased by 1 for each level you have attained.",
      "Est. Value": "",
      "Name": "Berserker Axe",
      "Properties": "Cursed.  See DMG page 155.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "5 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "Shake this lantern well and you get 2d4 hours of light. It takes a standard action to shake the lantern and requires 8 hours to 'recharge'.",
      "Est. Value": "100. gp",
      "Name": "Bioluminescent Fluid Lantern",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Black Opal has a greenish hue with black mottling and gold flecks. Usually found in ancient hot springs, the gem is tumbled smooth and cut cabochon. The phrase in the north 'Black as an opal' is used as a subtle form of praise for kind-hearted rogues and the like. ",
      "Est. Value": "1,000. gp",
      "Name": "Black Opal",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A dark blue-black Pearl.",
      "Est. Value": "500. gp",
      "Name": "Black Pearl",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A worn coin with notched edges.",
      "Est. Value": "200. gp",
      "Name": "Blacksalt’s Luckmaker",
      "Properties": "This coin will always come up heads. It takes on the appearance of any other coinage it is mixed in with, but retains its notched edges.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "A hard, roughly cut piece of basalt rock which bleeds when pressure is applies to it.",
      "Est. Value": "300. gp",
      "Name": "Bleeding Rock",
      "Properties": "The rock has a soft limit of 800ml blood a day.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Allows comprehension of all written languages. Unfortunately, said comprehension is only granted when the blindfold is worn over the eyes - meaning you cannot see to read anything. Perhaps your group can find a work around?",
      "Est. Value": "100. gp",
      "Name": "Blindfold of Reading",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Semi-reliable Blindfold of Trap Awareness, sends shivers down the wearer’s spine when traps are near – or at random times.",
      "Est. Value": "",
      "Name": "Blindfold of Trap Awareness",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A scabbard stained the dark color of rust. Any blade which is placed within the scabbard will emerge covered in a sheen of blood.",
      "Est. Value": "3,000. gp",
      "Name": "Blood Scabbard",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A silver ring with a transparent blue-white sapphire.",
      "Est. Value": "1,000. gp",
      "Name": "Blue Sapphire Ring",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A silver ring with a Blue Spinel gemstone embedded on it.",
      "Est. Value": "500. gp",
      "Name": "Blue Spinel Ring",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Weapon",
      "Description": "Crossbow bolt of chaos – 1 random effect on hit",
      "Est. Value": "",
      "Name": "Bolt of Chaos",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Bone crushing mace – critical renders limb useless; two handed by any smaller than large",
      "Est. Value": "",
      "Name": "Bone Crushing Mace",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Write the name of your antagonist in your flesh and he will leave you be. Causes one hit point of damage for every letter inscribed in the bearer's flesh. Lasts until the damage is healed.",
      "Est. Value": "",
      "Name": "Bone Stylus",
      "Properties": "1d4 Piercing | Finesse, Light",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "An elegant, decorative hand held scepter made of bronze and small jewels. You can hear a mild humming resonance when held to your ear.",
      "Est. Value": "500. gp",
      "Name": "Booming Scepter",
      "Properties": "Speaking directly into the scepter causes your voice to amplify so that it can be heard for 300 ft around for one minute. It requires 8 hours to build up its potency again.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine via Matt Mercer",
      "Category": "Armor",
      "Description": "Plain leather boots, tattered and worn, but glistening with a soft white light similar to the sunlight reflecting off freshly fallen snow.",
      "Est. Value": "1,500. gp",
      "Name": "Boots of Feral Leaping",
      "Properties": "When you wear these boots you can instill your leaps with incredible bursts of power. As a bonus action, you can attempt to leap. Make a DC16 Strength check: if you are successful, you can leap either 15 feet vertically or 20 feet horizontally. On a failure, you are knocked prone where you stand.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While you wear these boots, you can use an action to cast the levitate spell on yourself at will. ",
      "Est. Value": "4,000. gp",
      "Name": "Boots of Levitation",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While you wear these boots, you can use a bonus action and click the boots' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect. When the boots' property has been used for a total of 10 minutes, the magic ceases to function until you finish a long rest. ",
      "Est. Value": "4,000. gp",
      "Name": "Boots of Speed",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Potion",
      "Description": "Once per day, restores 4d2 HP.This goes up to 4d4 at 5, 6d4 at 10,  8d4 at 15 and 10d4 at 20. Cannot use during Combat",
      "Est. Value": "",
      "Name": "Bottle",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Potion",
      "Description": "This bottle stinks before it's even been opened. The stench of it's contents will protect whomever can stomach to wear it from almost any wandering predators. It's very difficult to get said stench out of adventuring gear, however. Potency may vary on weather, but it should ward of predators for at least a day or two.",
      "Est. Value": "200. gp",
      "Name": "Bottle of Giant's Urine",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A reusable bottle cork embossed with gold leaf and set with amethysts.",
      "Est. Value": "750. gp",
      "Name": "Bottle Stopper",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While this bowl is filled with water, you can use an action to speak the bowl's command word and summon a water elemental, as if you had cast the conjure elemental spell. The bowl can't be used this way again until the next dawn. The bowl is about 1 foot in diameter and half as deep. It weighs 3 pounds and holds about 3 gallons.",
      "Est. Value": "8,000. gp",
      "Name": "Bowl of Commanding Water Elementals",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing these bracers, you gain a +2 bonus to AC if you are wearing no armor and using no shield. ",
      "Est. Value": "6,000. gp",
      "Name": "Bracers of Defense",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While a fire burns in this brass brazier, you can use an action to speak the brazier's command word and summon a fire elemental, as if you had cast the conjure elemental spell. The brazier can't be used this way again until the next dawn. ",
      "Est. Value": "8,000. gp",
      "Name": "Brazier of Commanding Fire Elementals",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "This buckler has been enchanted with the power to protect you and your allies.",
      "Est. Value": "",
      "Name": "Buckler of Friendship",
      "Properties": "For one round, all allies gain +1 AC.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "6 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A small bag containing 58 clay sling bullets. Each bullet has a 12 gp opal hidden inside.",
      "Est. Value": "696. gp",
      "Name": "Bullet Bag",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A diamond of incredible beauty which slowly shifts its color from the purest white to canary to blue to black and back again.",
      "Est. Value": "250. gp",
      "Name": "Canary Diamond",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "These three chickens have been trained to check for traps, unfortunately they are not very good at it. Once released, each chicken will roam a dungeon at 30 feet a round and will walk in the direction of any nearby traps. If there are no nearby traps, they will walk in the direction that the players imagine there to be traps (they are prone to getting caught up in the moment). Each chicken will accidentally set off any trap it is feasible for it to set off and be killed by the trap. The chicken have name tags and are called Dara, Demi and Miki.",
      "Est. Value": "0.2 gp",
      "Name": "Carlin's Courageous Chickens",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "18 lbs."
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This is a ceremonial dagger made of electrum with a black pearl in it's pommel.",
      "Est. Value": "750. gp",
      "Name": "Ceremonial Dagger",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Fin Fen",
      "Category": "Wondrous Item",
      "Description": "This Cloak is woven together from the fur of a lion and goat over the skin of a serpent. It bears the emblem of house Chimera.",
      "Est. Value": "5,000. gp",
      "Name": "Chimera's Mantel",
      "Properties": "While wearing this cloak and attuned to it, you gain fire resistance. In addition you can use your action to exhale fire in a 15-foot cone. Each creature in that area must make a DC 15 Dexterity saving throw, taking 7d8 fire damage on a failed save, or half as much damage on a successful one. Once you use this ability, you cannot do so again until you take a short rest.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Armor",
      "Description": "A left-handed glove. It remains warm regardless of atmosphere, and is almost painfully hot to be touched with.",
      "Est. Value": "150. gp",
      "Name": "Cinder Glove",
      "Properties": "Rubbing the fingertips of this glove together creates flames that can ignite easily flammable objects. Holding a creature with it causes painful burns that will blister the skin, and unarmed strikes with this glove deal an additional 1 fire damage.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Cursed. Anything who puts on this circlet is sent into an irreversible state of misery for 1d4 hours.",
      "Est. Value": "400. gp",
      "Name": "Circlet of Inconsolable Weeping",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "This rope coils itself after 10 rounds of being uncoiled, regardless of what is happening to it. It will undo all knots and will wind itself up around one end (always the same end). This process always takes 1 round.",
      "Est. Value": "800. gp",
      "Name": "Coiling Rope (50 feet)",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "5 lbs."
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "1’, 10’, or 20’ – any size you need!",
      "Est. Value": "500. gp",
      "Name": "Collapsible Rod",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "10 lbs."
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A large sword with jewels that sequentially light up after activation. After the last jewel is lit, the sword will explode!",
      "Est. Value": "3,000. gp",
      "Name": "Countdown Cutlass",
      "Properties": "Each time an attack roll with the Countdown Cutlass succeeds, one of the 10 gemstones illuminates. Upon a successful hit with 10 stones illuminated (the 11th hit), the item explodes, dealing 4d8 fire damage in a 10-foot radius centered around the cutlass. The cutlass is consumed and cannot be remade.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Weapon",
      "Description": "A normal, if not well-crafted looking shortsword. There is a sigil of a chicken on the bottom of the pommel.",
      "Est. Value": "0. gp",
      "Name": "Cowardly Blade",
      "Properties": "Damage: 1d6+1 slashing (considered magical). If the wielder receives a critical hit, faces imminent death, or is subjected to a fear effect, the sword falls to pieces.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/Ragatan",
      "Category": "Treasure",
      "Description": "This wooden crate is about 60cm by 60cm by 40cm, with 'Chaos Mushrooms' burned into the lid in Sylvan. It fizzes with a faint magical aura, and smells delicious",
      "Est. Value": "2,000. gp",
      "Name": "Crate of Chaos Mushrooms",
      "Properties": "The box contains 1d10+4 'Chaos Mushrooms', which are considered a delecacy at Fey dinner parties. If a creature eats one of the Chaos Mushrooms, they must roll on the Wild Magic Surge table (PHB, p104) and are subject to the result. Each mushroom eaten requires a seperate roll. ",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "30 lb"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "A set of Armor Spikes made out of thick, sharp silver. They can be attached to full or half-plate, and behave like normal armor spikes. However, they grow faintly in total darkness - - enough for the wearer to see 5 ft, or for another person to see the wearer from up to 50 ft away.",
      "Est. Value": "650. gp",
      "Name": "Crescent Armor Spikes",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Crystal prism (d20 x 10 gp)",
      "Est. Value": "200. gp",
      "Name": "Crystal Prism",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Demonic themed tarot/playing cards – extra planar repercussions based on game played; tarot tales come true",
      "Est. Value": "",
      "Name": "Cursed Tarot Cards",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "DC save to avoid bleeding damage",
      "Est. Value": "",
      "Name": "Dagger of Bleeding",
      "Properties": "1d4 Piercing; Finesse, Light, Range, Thrown",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "A preserved Minotaur head, old but still retaining most detail. The skin is old and decrepit, yet both the horns have been dipped in molten gold. When donned, this helmet magically causes the wearer to appear as a living minotaur—as well as protecting the wearer against critical hits. The user's stats remain the same, however, and the player only appears to be a minotaur (+4 on intimidate checks).",
      "Est. Value": "2,400. gp",
      "Name": "Dehydrated Minotaur Helm",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Weapon",
      "Description": "A long, Hollow wooden rod with a narrow opening at one end, and a wider one at the other.",
      "Est. Value": "250. gp",
      "Name": "Digiridoom",
      "Properties": "1d6, Finesse, blowing into the narrow end of the rod creates a circle of silence within 10 feet for as long as the note is sustained.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Like a regular compass, except with multiple needles each pointing toward different useful things, such as: north, the nearest source of fresh water, the strongest nearby evil aura, nearest large concentration of gold, nearest civilization (exact definition of civilization may vary by user), and nearest storm. Needles lengthen and shorten as the object gets closer or further away.",
      "Est. Value": "",
      "Name": "Dowsing Compass",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Object of secret door detection/lay out visualization",
      "Est. Value": "",
      "Name": "Dowsing Rod",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A set of golden combs shapes as dragons, each set with red garnets as the eyes.",
      "Est. Value": "750. gp",
      "Name": "Dragon Comb Set",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Trained rat in wooden cage – sniffs out gold in exchange for treats. One trail ration per sniff.",
      "Est. Value": "",
      "Name": "Dragon Scale Tombe",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A long, black feather with violet iridescence. The shaft glows softly white in moonlight.",
      "Est. Value": "1,500. gp",
      "Name": "Dreaming Nightfeather",
      "Properties": "Holding this feather at night will allow you to fly with a speed of 60 feet, as long as your eyes are closed. The feather ignites in sunlight.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "D&D Wiki",
      "Category": "Potion",
      "Description": "Upon taking a single sip of this potion, you are afflicted with some form of madness. Roll 1d6. On a 1-3 you are afflicted with a short-term madness (DMG p. 259); on a 4-5 you are afflicted with a long-term madness (DMG p. 260); on a 6 you are afflicted with an indefinite madness.(DMG p. 260). The remainder of the elixir loses its magical properties, becoming merely a foul tasting liquid.",
      "Est. Value": "100. gp",
      "Name": "Elixir of Madness",
      "Properties": "Cursed.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An embroidered glove set designed for human sized hands, each with jewel chips.",
      "Est. Value": "2,500. gp",
      "Name": "Embroidered Gloves",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An Emerald is a brilliant green beryl, cleaved along straight box like lines, with rectangular cutting in the finished gem. Emeralds are often connected with health, and so are used ornamentally for such a purpose.",
      "Est. Value": "1,000. gp",
      "Name": "Emerald",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Extra dimensional flask – holds 1 gallon",
      "Est. Value": "",
      "Name": "Extra-Dimensional Flask",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An eye patch with a mock eye set in blue sapphire and moonstone.",
      "Est. Value": "2,500. gp",
      "Name": "Eye Patch",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A small wooden box with a silver embossed flame on the lid. Inside is a pipe-shape horn that spouts a tiny flame that can not be snuffed. The box is not flammable.",
      "Est. Value": "350. gp",
      "Name": "Filligins Uncontrollable Flame",
      "Properties": "When the flame ignites an object, the fire cannot be doused by any other method than returning the flame to the pipe. When the fire runs out of fuel, it will reduce to a candle-like flame and remain indefinitely.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A filthy bucket, bolted to the floor, ¾ full of urine, containing silver coins, rings and necklaces.",
      "Est. Value": "820. gp",
      "Name": "Filthy Bucket",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "A heavy rug that has been kept rolled up. When unrolled, it reveals that the surface of the rug is permanently on fire. When rolled back up the fire disappears.",
      "Est. Value": "",
      "Name": "Fire Blanket",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This Fire Opal is a translucent fiery red colour and is set within a broken brooch. It takes no effort to wedge it out.",
      "Est. Value": "1,000. gp",
      "Name": "Fire Opal",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A fine gold chain set with a fire opal.",
      "Est. Value": "2,500. gp",
      "Name": "Fire Opal Chain",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Scribnibbler21",
      "Category": "Weapon",
      "Description": "This imposing, three-headed flail has a +2 bonus to attack and damage rolls. Any creature that takes damage from this flail may immediately make a saving throw against any one ongoing effect that is affecting them.",
      "Est. Value": "",
      "Name": "Flail of Flagellation",
      "Properties": "1d8 Bludgeoning - Two-Handed",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Potion",
      "Description": "A pure white lily that becomes rigid when picked. Its petals are icy cold and shatter like glass if mishandled.",
      "Est. Value": "150. gp",
      "Name": "Frostbite Lilly",
      "Properties": "If kept intact, this flower will refrigerate any container smaller than a 6x6x6 cube for up to one week. The six petals may be plucked and crushed, creating a sheen of ice in a 10 foot radius. If used over water, this will freeze 3 inches thick.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "The curse of the gauntlets was that no magic would ever help you, beneficial or baneful and anything you were in contact with would lose its magical properties while you're touching it. found out the contact one when visiting flying mage's tower. I was no longer welcome there, but with certain classes the gloves are pretty sweet even considering the downside. Oh also the curse had a very specific trigger, the gauntlets could only be removed if you cast remove curse on them and then had a chaotic neutral halfling pull them off of you with the intention of stealing them. even if you hacked your arms off and then had regeneration cast on you your hands would grow back with the gauntlets on them.",
      "Est. Value": "",
      "Name": "Gauntlets",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Six giant temple candles. Each is 6’ tall, 1’ thick, and weighs 100 lbs. They are made of fine white wax, rolled in gold dust, and set with emeralds. (320 gps each)",
      "Est. Value": "1,920. gp",
      "Name": "Giant Temple Candles",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Baldur's Gate",
      "Category": "Wondrous Item",
      "Description": "The cursed Girdle of Femininity and Masculinity, a rare yet oft-discussed magical item, is wrought with a most powerful magic. Anyone unfortunate enough to secure it around their waist instantly finds their gender to be transformed. It is said that not fifty years past, a nameless court jester was beheaded for presenting the girdle as a gift to Duke Lobelahn's lover. ",
      "Est. Value": "200. gp",
      "Name": "Girdle of Femininity/Masculinity",
      "Properties": "Changes the gender of the wearer. Requires 'Remove Curse'.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A gold circlet set with four aquamarines.",
      "Est. Value": "2,500. gp",
      "Name": "Gold Circlet",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small gold idol.",
      "Est. Value": "750. gp",
      "Name": "Gold Idol",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Quest Hook",
      "Description": "Gold plated idols – possession = death penalty",
      "Est. Value": "160. gp",
      "Name": "Gold Plated Idols",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Potion",
      "Description": "http://www.dandwiki.com/wiki/Grog_of_Susbtantial_Whimsy_%283.5e_Equipment%29",
      "Est. Value": "",
      "Name": "Grog of Substantial Whimsy",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Thunder Hammer – deafening or stunned, DC save, 40’ radius",
      "Est. Value": "",
      "Name": "Hammer of Thunderous Power",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A carved harp of exotic wood with an ivory inlay and zircon gems.",
      "Est. Value": "750. gp",
      "Name": "Harp",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "80 lb"
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "Description needed.",
      "Est. Value": "",
      "Name": "Headband of Enslavement",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Scribnibbler21",
      "Category": "Wondrous Item",
      "Description": "At the end of a long rest, a Bard attuned to this item may perform a dancing ritual while wearing it. That bard makes a Performance check. Each creature that watches the whole ritual performance may replace their result for one attack roll, ability check, or saving throw with the result of the bard's performance check. The ritual performance takes 5 minutes to complete. ",
      "Est. Value": "",
      "Name": "Headdress of the Dawn Dancer",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "Helm – cherubic infant embellishment, emits confusion spell at wil",
      "Est. Value": "",
      "Name": "Helm of Confusion",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "A 'God-Helmet' that explained the universe when you put it on. It usually just fried your brain though, small chance of enlightenment or instant death.",
      "Est. Value": "",
      "Name": "Helm of Unsurvivable Knowledge",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A hollow glass sphere of surprising proportions – nearly three meters across. If it is broken those nearby will catch the barest scent of alien perfumes, hinting at strange lands belonging to the ancient time when the sphere was first forged and air trapped within it.",
      "Est. Value": "1,000. gp",
      "Name": "Hollow Glass Sphere",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Once per day this item grants one extra attack for it's user.",
      "Est. Value": "",
      "Name": "Hyperstone",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "5x range, normal range 5x dmg, 2xs range = 4xs dmg, 3xs range = 3xs dmg, etc… - explodes & destroyed after use except at 5xs or 4xs range",
      "Est. Value": "",
      "Name": "Javelin of Explosions",
      "Properties": "1d6 Piercing - Simple - Thrown - Range: 30/120",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A jeweled anklet.",
      "Est. Value": "2,500. gp",
      "Name": "Jeweled Anklet",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Treasure",
      "Description": "A sizeable cut diamond with bluish tint.",
      "Est. Value": "500. gp",
      "Name": "Lost Diamond",
      "Properties": "Whenever this diamond is sought, it has a DC 12 to be found. If it is not found, it is in the ethereal plane, and remains there for 30 minutes until reappearing.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Potion",
      "Description": "A viscous potion in a clear glass bottle. It is uncomfortably hot to hold, and glows a faint orange in darkness.",
      "Est. Value": "150. gp",
      "Name": "Magmatic Elixir",
      "Properties": "When you drink this potion, make a constitution saving throw with a DC of 14. If you fail the save, you painfully vomit the substance, and suffer 2d6 fire damage. Otherwise, you gain the ability to breath fire for ten minutes. Breathing on enemies deals 2d6 + your current level in damage to foes in a 15 foot line, and ignites flammable objects.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Self-guided grappling hook - +10 to ranged attack roll for aiming",
      "Est. Value": "",
      "Name": "Magnetic Grappling Hook",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Near-Empty-Ever-Full One Arrow Quiver – always only 1 arrow, will reappear after being shot.",
      "Est. Value": "",
      "Name": "Malluf's Not-Quite-Full, Not-Quite-Empty Quiver",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An embroidered silk and velvet mantle set with numerous moonstones. ",
      "Est. Value": "2,500. gp",
      "Name": "Mantle Set",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An old painting, a lot treasure by a painter of some renoun.",
      "Est. Value": "2,500. gp",
      "Name": "Masterpiece Painting",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A black leather collar, stiff from wear and riddled with bite marks.",
      "Est. Value": "75. gp",
      "Name": "Mongrel Collar",
      "Properties": "While wearing this collar, you are unable to speak. At most, you may utter grunts and yelps like a dog.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An ornate golden music box.",
      "Est. Value": "2,500. gp",
      "Name": "Music Box",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "Black leather saddle with streaks of red through the leather itself. A small amount of black smoke emanates from the saddle when it is holding still.",
      "Est. Value": "2,000. gp",
      "Name": "Necromancer's Saddle",
      "Properties": "You can use an action to place this saddle on the corpse or skeleton of a Large creature and animate it as an undead mount. The undead creature's bones shift as necessary to create something similar to a warhorse skeleton (MM 273), which follows your mental commands as long as you are riding it. The effect lasts until you remove the saddle, or until the next dawn. When the effect ends, the undead creature crumbles into dust.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "30 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Potion",
      "Description": "A common looking pipeweed, which smells only a little sweeter than the most common varieties. Close inspection reveals occasional black burrs mixed among the leaves.",
      "Est. Value": "150. gp",
      "Name": "Nightmare Pipeweed",
      "Properties": "Smoking this pipeweed causes a brief feeling of relaxation and elation. A few minutes in, however, the experience falls into terror. The smoker will hallucinate that they are being pursued by a nightmarish figment that is never fully visible. The pursuer will never actually reach them, but if the smoker fails a wisdom check of DC 15, they will be compelled to flee in a random direction for ten minutes.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An obsidian statuette of a demon with a golden inlay and fittings.",
      "Est. Value": "750. gp",
      "Name": "Obsidian Statuette",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "A very heavy, hard staff engrained with beautiful swirling, natural patterns across the wood. It has a large diameter and is slightly tapered to be thicker at one end. It can be used like a normal quarterstaff, except at 1d8 damage. However, in the hands of a Druid or a 5th-level Ranger, the staff's thicker tip can be lit at-will like a Sunrod of any color. The wielder is also capable of easily distinguishing any non-natural (magical) trees, and can speak Entish (so long as they could already speak Elvish).",
      "Est. Value": "4,000. gp",
      "Name": "Olivewood Staff",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "8 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A translucent pale blue Opal with green and golden mottling.",
      "Est. Value": "1,000. gp",
      "Name": "Opal",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This longsword seems to have been made more for show than for use. It is silver-plated steel and has a jet gemstone set inside the hilt.",
      "Est. Value": "750. gp",
      "Name": "Ornate Longsword",
      "Properties": "1d8 Slashing - Versatile (1d10)",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Marial Weapon Expertise",
      "Weight": "5 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Book",
      "Description": "A small, leather-bound book filled with prophecies. All of them will be found to be true, but the last of them is dated just a few weeks ago.",
      "Est. Value": "150. gp",
      "Name": "Outdated Book of Prophecies",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Language: Elvish",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A necklace string of small pink pearls.",
      "Est. Value": "2,500. gp",
      "Name": "Pearl Necklace",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A circular Peridot of rich green colouring with milky inclusions.",
      "Est. Value": "500. gp",
      "Name": "Peridot Gemstone",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Potion",
      "Description": "A viscous, golden liquid inside of a corked glass vial.",
      "Est. Value": "1,000. gp",
      "Name": "Philter of Blave",
      "Properties": "After drinking the potion, you are compelled to speak first in every conversation and become unable to say anything which is not a deliberate and blatant lie. You believe the lies yourself [and reality itself can alter in minor ways, as determined by the DM, to reflect what you say. Your lies cannot place yourself or any other creature in immediate physical harm]. For the duration of the effect, you automatically succeed on saving throws against any spell or effect which would compel you to speak the truth. These effects last for 1 hour.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A platinum bracelet set with a sapphire.",
      "Est. Value": "2,500. gp",
      "Name": "Platinum Bracelet",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Potion",
      "Description": "A large carry pouch made from the skin of a monkey. Inside are 1d6 Potions of Superior Healing. ",
      "Est. Value": "750. gp",
      "Name": "Pouch of Healing Potions",
      "Properties": "You regain 8d4 + 8 hit points when you drink this potion.  The potion's red liquid glimmers when agitated.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "Scribnibbler21",
      "Category": "Wondrous Item",
      "Description": "This cursed item hovers just behind whoever it is attuned to, generating startling sounds and lights at random intervals. A character attuned to the Prism of Paranoia cannot sleep or benefit from long or short rests, but has +10 to passive Perception.",
      "Est. Value": "",
      "Name": "Prism of Paranoia",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Armor",
      "Description": "An cherrywood cloak that repels water perfectly.",
      "Est. Value": "550. gp",
      "Name": "Rafting Cloak",
      "Properties": "This cloak may be spread like a blanket over open water. When it is, it can support up to 300 lbs as a raft, staying perfectly buoyant and supportive even in moderately choppy conditions.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Armor",
      "Description": "This armor is Leather Armor with heavy rings sewn into it. The rings help reinforce the armor against blows from swords and axes. Three rings across the chest are made of brilliant gold that sheds dim light similar to daybreak.",
      "Est. Value": "1,500. gp",
      "Name": "Ring Mail of Three Wishes",
      "Properties": "When you are hit by a melee or ranged attack while wearing this armor, you can use your reaction to wish that you hadn't been hit. The attack deals no damage, but the armor class provided by the armor decreases by 1. After the third wish, the armor's rings vanish and it becomes nonmagical leather armor.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "40 lb"
    },
    {
      "Author": "2nd Ed.",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Ring of Contrariness",
      "Properties": "Cursed. Once attuned, the wearer of this ring cannot take it off and is forced to disagree with any idea, statement or action. On top of that, the wearer is also forced to resist any attempt to remove the curse.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Rod",
      "Description": "You can use an action to present the rod and command obedience from each creature of your choice that you can see within 120 feet of you. Each target must succeed on a DC 15 Wisdom saving throw or be charmed by you for 8 hours. While charmed in this way, the creature regards you as its trusted leader. If harmed by you or your companions, or commanded to do something contrary to its nature, a target ceases to be charmed in this way. The rod can't be used again until the next dawn.",
      "Est. Value": "",
      "Name": "Rod of Rulership",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": ""
    },
    {
      "Author": "Brendan M",
      "Category": "Weapon",
      "Description": "A tough metal shield with a large stud in the center.",
      "Est. Value": "",
      "Name": "Shield of Bashing",
      "Properties": "When running to a target from at least 20 feet. The target must make a Constitution saving throw of 14 or be knocked prone. Following attacks would then have advantage.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A simple but finely made silver and gold brooch.",
      "Est. Value": "750. gp",
      "Name": "Silver and Gold Brooch",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A silver chalice set with moonstones.",
      "Est. Value": "750. gp",
      "Name": "Silver Chalice",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A light silver platter, 6 inches in diameter, etched with ornate feathers.",
      "Est. Value": "1,250. gp",
      "Name": "Silver Platter of Feathers",
      "Properties": "Anything placed on this platter has no weight whatsoever. The item must be fully supported by the platter and regains its weight over 1 second after leaving the platter",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Fin Fen",
      "Category": "Weapon",
      "Description": "You gain a +1 bonus to attack and damage rolls with this magical weapon, and it deals an additional 1d8 poison damage. The damage increases by 1d8 if the target is a Monstrosity or Beast.  This weapon has 7 spikes hidden within the Barb at the end of the pike. As a ranged attack, you can launch a single spike at a target, each having a range of 100/200 ft. Each of these spikes deal 1d8 piercing damage. Every Morning at dawn, this weapon regrows all of it's spikes.",
      "Est. Value": "5,000. gp",
      "Name": "Spire of the Manticore",
      "Properties": "Heavy, Reach, Two-Handed",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "18 lb"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "Weapon",
      "Description": "This Morningstar is made of solid wrought steel, with a heavy spiked head. It behaves like a normal Morningstar, except within 60ft of Evil and Undead creatures and within an hour of Dawn. In any of these cases, the head glows like the tip of a Sunrod, and it becomes a Morningstar +2 which stuns for 1d4+1 rnds on a Critical. Fortitude saves vs stun, with a DC equal to the player's attack roll. Cannot be used by Evil creatures.",
      "Est. Value": "3,200. gp",
      "Name": "Star of Morning's Glory",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "8 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A translucent ruby with a white star-shaped center.",
      "Est. Value": "1,000. gp",
      "Name": "Star Ruby",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Star Sapphire is a precious variation of the sapphire, however is more translucent, with a white star highlighted in its center. A star sapphire has been known to ornament devices which protect against magic. ",
      "Est. Value": "1,000. gp",
      "Name": "Star Sapphire",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/Euphorbus11",
      "Category": "Wondrous Item",
      "Description": "A simple leather pouch filled with 4 small runestones.",
      "Est. Value": "5. gp",
      "Name": "Stones of Ruin",
      "Properties": "Requires attunement by a druid. A pouch of stone runes that predict the worst event that will happen before the next full moon. Using the runes makes the events it predicts more likely to happen.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "This round and polished stone glows with a fierce light and seems to dispel the shadows around you. ",
      "Est. Value": "500. gp",
      "Name": "Sun Gem",
      "Properties": "Properties of a torch.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Brendan M",
      "Category": "Weapon",
      "Description": "A sharp one-sided blade that is slightly curved.",
      "Est. Value": "",
      "Name": "Sword of Bleeding",
      "Properties": "The creature must a Constitution saving throw of 14 or take an addition 1d6. The creature makes this check every turn until succeeded",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "This is a magical Glaive, with an ornately decorated shaft made of solid (but light) steel. The blade is made of silver, and floats near the end unattached to the shaft. Three keywords act on this weapon: anda, sinta, and pahta (long, short, and closed, in Elven). Anda is the longest extent, and the weapon acts as a two-handed glaive. Sinta makes the weapon shorten and behave as a one-handed axe, and pahta shortens the weapon to throwing-axe size. The blade also changes shape and position to fit these weapon styles.",
      "Est. Value": "1,400. gp",
      "Name": "Telescoping Glaive",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "Scribnibbler21",
      "Category": "Wondrous Item",
      "Description": "This large basin has bloodstains permanently ingrained in it. Any liquid placed in the Clegane Bowl immediately turns into Potion of Greater Hype. When consumed, a dose of this potion doubles the Strength score of the user for 1 hour, up to a maximum of 30 Strength.",
      "Est. Value": "",
      "Name": "The Clegane Bowl",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "20 lb"
    },
    {
      "Author": "BG",
      "Category": "Ring",
      "Description": "This wrought-iron band is pitted and stained as if by acid. Between the two thorns formed by the band, a crude lump of silver on its head suggests the image of a skull against a black field, perhaps the symbol of Myrkul, Lord of Bones.",
      "Est. Value": "100. gp",
      "Name": "The Iron Thorn",
      "Properties": "Upon attunement this ring changes it's wearer's appearance to that of a Zombie. Requires 'Remove Curse' to remove.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Book",
      "Description": "A large tome, bound in leather and clasped with gold. A closer inspection of this volume will reveal that each page is perfectly preserved dragon scale which has been inscribed with the black blood of a fiend. The book describes the four spirits (quicksilver, orpiment, sal ammoniac, sulfur) and seven bodies (gold, silver, iron, quicksilver, lead, tin, copper) of traditional alchemy.",
      "Est. Value": "200. gp",
      "Name": "Tome of Alchemy",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Language: Common",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A yellow facet cut Topaz gemstone.",
      "Est. Value": "500. gp",
      "Name": "Topaz",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An uncut chunk of raw diamond. It is easily the size of a dwarf’s fist and is likely worth a substantial sum to the right jewel maker.",
      "Est. Value": "1,000. gp",
      "Name": "Uncut Diamond",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A wand with runic inscriptions that have been scratched out and rewritten several times",
      "Est. Value": "250. gp",
      "Name": "Wand of Arcane Errata",
      "Properties": "Upon invoking the activation word, the wand will create a random effect. d20: 1-5: You or a target is made clean. 6-10: Glowing orbs dance around you as the dancing lights spell. 11-15: Conjures 1d4 loaves of warm bread. 16-19: The wand releases 20 gallons of pure, cool water. 20: The wand unfolded into a thin effigy of a man, who will serve you for 1 hour. Its strength is 6 and has 1 hp.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A black and white painted Oakwood wand, with card suits painted down the length of the wand beyond the handle.",
      "Est. Value": "250. gp",
      "Name": "Wand of Prestidigitation",
      "Properties": "Allows the user to cast the spell Prestidigitation without the need of somatic or visual components on any object within 25 feet.  The staff has 5 charges that refill completely every morning.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This mask has been painted gold and appears to be a ceremonial mask worn to battle.",
      "Est. Value": "750. gp",
      "Name": "War Mask",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Treasure",
      "Description": "A pair of elegantly decorated teacups that always feel warm to the touch. If filled with any liquid, it will somehow seep through invisible cracks in the cup.",
      "Est. Value": "500. gp",
      "Name": "Wellwizard's Teacups",
      "Properties": "When held, the teacups will fill with hot, pleasant tea. If a pleasant conversation ensues, the teacups will refill up to three times. If someone holding the cups tells a lie, the tea will seep through invisible cracks.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A glass orb with a small slit opening, braced by fine grey metal.",
      "Est. Value": "150. gp",
      "Name": "Whispering Bauble",
      "Properties": "A user may speak into this bauble for up to one minute. After this period, anyone who places the bauble to their ear will hear the message. The message can be replayed multiple times, until a new message is purposefully spoken into it.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A transparent fiery yellow or yellow· green Sapphire.",
      "Est. Value": "1,000. gp",
      "Name": "Yellow Sapphire",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Unknown",
      "Category": "Potion",
      "Description": "A foul smelling liquid that shifts between bright red and burgundy as it swirls around it's flask.",
      "Est. Value": "3,500. gp",
      "Name": "Potion of Extra Health",
      "Properties": "User gains 1d2 HP per level and will regenerate 1d2HP per round.  The effect is lost the next time the drinker goes to the toilet.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "A shiny silver sword with a purple hilt. There are three orange pommels at the center of the hilt that each resembles a triangle, placed together so they create a larger triangle as a group. The guard is shaped like two outstretched wings and along the blade of this sword are etchings in Elvish that read 'The Blade of Evil's Bane'. Looking into the history of this sword will tell of an order of Maesters who, upon growing weary of merely recording the passage of history, decided to make it themselves.",
      "Est. Value": "",
      "Name": "Maester Sword",
      "Properties": "1d8 Slashing - Versatile (1d10)",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "3 lb"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "This oddly-shaped weapon looks like it might be made of roc’s feathers, bound together and strengthened by magic. There is a small emerald set in the weapon’s vertex amidst gilded furnishings that mark it as a weapon of some distinction.",
      "Est. Value": "900. gp",
      "Name": "Gale Boomerang",
      "Properties": "1d4 + 2 Bludgeoning - Thrown (Range: 30/90) Special: Does not require direct line of sight, due to a curved trajectory. Once per day, you can cast the Gust of Wind (DC 15) spell as a free action with a successful attack.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Potion",
      "Description": "A potion vial containing a purple concoction, labelled simply 'Ooze'. The bubbling, slimy fluid is dark purple with emerald accretions on the side. It smells like butyric acid (vomit) and tastes worse.",
      "Est. Value": "900. gp",
      "Name": "Potion of Purple Ooze",
      "Properties": "Drinking this potion will turn you into an ooze for 1d8+1 days.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DOTA2",
      "Category": "Wondrous Item",
      "Description": "Grants the following, +2 fort saves, +2 reflex saves, +2 will saves",
      "Est. Value": "",
      "Name": "Power Treads",
      "Properties": "Grants +2 fort saves, +2 reflex saves, +2 will saves",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "The tiny figurine of a fertility goddess, carved from a rare, fist-sized pearl. Found deep beneath the surface of the earth, for two weeks after it is brought to the surface any woman touching the figurines will become pregnant. After the two week period has expired, the figure will never work again (or until returned to its original spot for 1d12 months).",
      "Est. Value": "",
      "Name": "Pregnancy Figure",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "Ring of Ghosts: the wearer of the ring can see and communicate with the ghost of any intelligent being that has died in the past 24 hours within a 1 mile radius. After the 24 hours, the ghost disappears. The ghosts are only visible and audible to the wearer, but remain intangible. Also, the ghosts likely aren't very cooperative if the players killed them.",
      "Est. Value": "",
      "Name": "Ring of Ghosts",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Rust-dust Bomb – metallic eating dust",
      "Est. Value": "",
      "Name": "Rust-Dust Bomb",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Book",
      "Description": "Without a successful Arcana check of 25, this scroll appears to be a Scroll of Comprehend Language. When used, however a DC save must be made or the user will be unable to speak anything but gibberish for 1d20 days.",
      "Est. Value": "",
      "Name": "Scroll of Cursed Gibberish",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Book",
      "Description": "Summons a moose.",
      "Est. Value": "",
      "Name": "Scroll of Summon Moose",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "extra planar/dimensional transport/escape to pocket dimension with scrying/teleportation stone/orb",
      "Est. Value": "",
      "Name": "Self-Incinerating Pellets",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "Shadoweave armor is woven with darkness imbued into its silk. +6 armor +6 max bonus",
      "Est. Value": "",
      "Name": "Shadoweave Armor",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Monster presence detecting weapon (Hobbit – Sting, Orcs/Goblins)",
      "Est. Value": "",
      "Name": "Sting",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Knife of a god of undeath. It turned whoever owned it immediately undead.",
      "Est. Value": "",
      "Name": "Undead Knife",
      "Properties": "Cursed",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DOTA",
      "Category": "Wondrous Item",
      "Description": "Urn of shadows-starts with no charges, user can grant allies 10HP, or deal 10 damage to enemies. gains additional uses for every 2 creatures that die within 40ft radius of holder",
      "Est. Value": "",
      "Name": "Urn of Shadows",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A small tortoise (STR 2, DEX 1, WIL 6, 1hp, Armour 1) that knows the way to anywhere you ask, but gets there very slowly. ",
      "Est. Value": "",
      "Name": "Worldly Tortoise",
      "Properties": "",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "William Orfanakos",
      "Category": "Weapon",
      "Description": "",
      "Est. Value": "800. gp",
      "Name": "Spear of the Hunter",
      "Properties": "This spear grants a +2 to AC and summons a friendly wolf whenever a natural 20 is rolled to hit. 1d8 Piercing - Oversized (1d10), Thrown (20/60), Two-Handed",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "3 lb"
    },
    {
      "Author": "William Orfanakos",
      "Category": "Weapon",
      "Description": "",
      "Est. Value": "1,200. gp",
      "Name": "Insanity Blade",
      "Properties": "Once attuned, the user of this weapon must make a Wisdom save each day, starting at 0 and going up +1 DC with each subsequent check. On a failure, the character is thrown into a blind rage and must fight the nearest creature for 1d8 rounds or until they are killed. 1d8 Slashing & 1d4 Psychic",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": ""
    },
    {
      "Author": "William Orfanakos",
      "Category": "Weapon",
      "Description": "",
      "Est. Value": "1,400. gp",
      "Name": "Tracking Dagger",
      "Properties": "On a successful hit with this dagger, the user knows exactly where the target is for 1d20 hours.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "The Patient Man's Key Ring",
      "Properties": "Rusty key ring containing 100 rusty keys, for any given lock, one of the keys will open said lock. You just have to keep going until you find it. 1d100 to figure out how many keys the player has to try before they succeed.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Baldur's Gate II",
      "Category": "Weapon",
      "Description": "This blade belonged to Dabbar, a long dead servant of Bhaal that exercised control over his minions in the most brutal of ways. In addition to strengthening the mind against the guile of others, the sword absorbs life energy from an opponent with each successful hit, healing the user. Dabbar considered it a failure of his officers if he returned from battle in less than perfect health, and as the rest of the company watched, he would administer beatings until fully healed.",
      "Est. Value": "3,500. gp",
      "Name": "Adjatha the Drinker",
      "Properties": "1d8+2 Slashing - Versatile (1d10+2) Heals the wielder 1 hit point every time it hits the target. Makes wielder immune to charm and domination status effects.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "1 lb"
    },
    {
      "Author": "Baldur's Gate II",
      "Category": "Weapon",
      "Description": "Basalin was a large man, rumored, far from his hearing, to be a werebear. He long wielded the bastard sword Albruin in the protection of his village, slaying giant spiders that plagued the area. The sword protected him from their poison and also allowed him to see invisible Red Wizards who controlled some of the more fantastic variants. The reason for their enmity is unknown.",
      "Est. Value": "2,000. gp",
      "Name": "Albruin",
      "Properties": "2d4+3 Slashing - Versatile (2d6+2) Renders user immune to poison. Can detect invisibility once per day.",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement Strength: 11",
      "Weight": "8 lb"
    },
    {
      "Author": "Baldur's Gate II",
      "Category": "Wondrous Item",
      "Description": "Algernon's cloak is imbued with magical properties such that the wearer will seem to shine with an inner glow. ",
      "Est. Value": "1,750. gp",
      "Name": "Algernon's Cloak",
      "Properties": "Provides +2 to Charisma",
      "Rarity": "Rare",
      "Rarity Number": "4",
      "Requirements": "Requires Attunement",
      "Weight": "3 lb"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Arcane Eye spell.",
      "Name": "Arcane Eye Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Aura of Life spell.",
      "Name": "Aura of Life Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Aura of Purity spell.",
      "Name": "Aura of Purity Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Banishment spell.",
      "Name": "Banishment Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Blight spell.",
      "Name": "Blight Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Charm Monster spell.",
      "Name": "Charm Monster Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Compulsion spell.",
      "Name": "Compulsion Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Confusion spell.",
      "Name": "Confusion Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Conjure Minor Elementals spell.",
      "Name": "Conjure Minor Elementals Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Conjure Woodland Beings spell.",
      "Name": "Conjure Woodland Beings Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Control Water spell.",
      "Name": "Control Water Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Death Ward spell.",
      "Name": "Death Ward Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dimension Door spell.",
      "Name": "Dimension Door Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Divination spell.",
      "Name": "Divination Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dominate Beast spell.",
      "Name": "Dominate Beast Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Elemental Bane spell.",
      "Name": "Elemental Bane Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Evard's Black Tentacles spell.",
      "Name": "Evard's Black Tentacles Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Fabricate spell.",
      "Name": "Fabricate Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Find Greater Steed spell.",
      "Name": "Find Greater Steed Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Fire Shield spell.",
      "Name": "Fire Shield Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Freedom of Movement spell.",
      "Name": "Freedom of Movement Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Giant Insect spell.",
      "Name": "Giant Insect Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Grasping Vine spell.",
      "Name": "Grasping Vine Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Greater Invisibility spell.",
      "Name": "Greater Invisibility Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Guardian of Faith spell.",
      "Name": "Guardian of Faith Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Guardian of Nature spell.",
      "Name": "Guardian of Nature Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hallucinatory Terrain spell.",
      "Name": "Hallucinatory Terrain Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Ice Storm spell.",
      "Name": "Ice Storm Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Leomund's Secret Chest spell.",
      "Name": "Leomund's Secret Chest Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Locate Creature spell.",
      "Name": "Locate Creature Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mordenkainen's Faithful Hound spell.",
      "Name": "Mordenkainen's Faithful Hound Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mordenkainen's Private Sanctum spell.",
      "Name": "Mordenkainen's Private Sanctum Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Otiluke's Resilient Sphere spell.",
      "Name": "Otiluke's Resilient Sphere Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Phantasmal Killer spell.",
      "Name": "Phantasmal Killer Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Polymorph spell.",
      "Name": "Polymorph Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Shadow of Moil spell.",
      "Name": "Shadow of Moil Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Sickening Radiance spell.",
      "Name": "Sickening Radiance Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Staggering Smite spell.",
      "Name": "Staggering Smite Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Stone Shape spell.",
      "Name": "Stone Shape Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Stoneskin spell.",
      "Name": "Stoneskin Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Storm Sphere spell.",
      "Name": "Storm Sphere Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Summon Greater Demon spell.",
      "Name": "Summon Greater Demon Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Vitriolic Sphere spell.",
      "Name": "Vitriolic Sphere Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wall of Fire spell.",
      "Name": "Wall of Fire Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Watery Sphere spell.",
      "Name": "Watery Sphere Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Animate Objects spell.",
      "Name": "Animate Objects Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Antilife Shell spell.",
      "Name": "Antilife Shell Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Awaken spell.",
      "Name": "Awaken Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Banishing Smite spell.",
      "Name": "Banishing Smite Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Bigby's Hand spell.",
      "Name": "Bigby's Hand Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Circle of Power spell.",
      "Name": "Circle of Power Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Cloudkill spell.",
      "Name": "Cloudkill Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Commune spell.",
      "Name": "Commune Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Commune with Nature spell.",
      "Name": "Commune with Nature Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Cone of Cold spell.",
      "Name": "Cone of Cold Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Conjure Elemental spell.",
      "Name": "Conjure Elemental Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Conjure Volley spell.",
      "Name": "Conjure Volley Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Contact Other Plane spell.",
      "Name": "Contact Other Plane Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Contagion spell.",
      "Name": "Contagion Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Control Winds spell.",
      "Name": "Control Winds Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Creation spell.",
      "Name": "Creation Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Danse Macabre spell.",
      "Name": "Danse Macabre Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dawn spell.",
      "Name": "Dawn Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Destructive Wave spell.",
      "Name": "Destructive Wave Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dispel Evil and Good spell.",
      "Name": "Dispel Evil and Good Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dominate Person spell.",
      "Name": "Dominate Person Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dream spell.",
      "Name": "Dream Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Enervation spell.",
      "Name": "Enervation Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Far Step spell.",
      "Name": "Far Step Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Flame Strike spell.",
      "Name": "Flame Strike Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Geas spell.",
      "Name": "Geas Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Greater Restoration spell.",
      "Name": "Greater Restoration Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hallow spell.",
      "Name": "Hallow Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hold Monster spell.",
      "Name": "Hold Monster Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Holy Weapon spell.",
      "Name": "Holy Weapon Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Immolation spell.",
      "Name": "Immolation Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Infernal Calling spell.",
      "Name": "Infernal Calling Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Insect Plague spell.",
      "Name": "Insect Plague Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Legend Lore spell.",
      "Name": "Legend Lore Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Maelstrom spell.",
      "Name": "Maelstrom Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mass Cure Wounds spell.",
      "Name": "Mass Cure Wounds Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mislead spell.",
      "Name": "Mislead Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Modify Memory spell.",
      "Name": "Modify Memory Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Negative Energy Flood spell.",
      "Name": "Negative Energy Flood Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Passwall spell.",
      "Name": "Passwall Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Planar Binding spell.",
      "Name": "Planar Binding Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Raise Dead spell.",
      "Name": "Raise Dead Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Rary's Telepathic Bond spell.",
      "Name": "Rary's Telepathic Bond Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Reincarnate spell.",
      "Name": "Reincarnate Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Scrying spell.",
      "Name": "Scrying Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Seeming spell.",
      "Name": "Seeming Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Skill Empowerment spell.",
      "Name": "Skill Empowerment Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Steel Wind Strike spell.",
      "Name": "Steel Wind Strike Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Swift Quiver spell.",
      "Name": "Swift Quiver Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Synaptic Static spell.",
      "Name": "Synaptic Static Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Telekinesis spell.",
      "Name": "Telekinesis Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Teleportation Circle spell.",
      "Name": "Teleportation Circle Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Transmute Rock spell.",
      "Name": "Transmute Rock Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Tree Stride spell.",
      "Name": "Tree Stride Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wall of Force spell.",
      "Name": "Wall of Force Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wall of Light spell.",
      "Name": "Wall of Light Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wall of Stone spell.",
      "Name": "Wall of Stone Spell Scroll",
      "Rarity": "Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wrath of Nature spell.",
      "Name": "Wrath of Nature Spell Scroll",
      "Rarity": "Rare"
    }
  ],
  "Uncommon": [
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An ornate block of ice carved into an ancient holy symbol. The carving has a subtle taint of magic to it, but it's not exactly clear what prevents it from melting.",
      "Est. Value": "400. gp",
      "Name": "Holy Ice Symbol",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "/u/dustybullets",
      "Category": "Wondrous Item",
      "Description": "A wind instrument consisting of a reed melody pipe and from one to five drones with air supplied continuously either by a bag with valve-stopped mouth tube or by bellows. The bag itself is patterned in red and blue.",
      "Est. Value": "",
      "Name": "Bagpipe of Invisibility",
      "Properties": "Renders the user invisible whilst the bagpipes are being played.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Requires Attunement",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A contract with blank parts. Can be modified into any sort of deal you wish. The first party to break the contract is blasted with a beam from above (d12, ignore armour) and the contract dissolves into shredded parchment. ",
      "Est. Value": "",
      "Name": "Blank Contract",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Awakens any creature from sleep or unconsciousness, but they flail and scream in terror for a few seconds first. They have no memory of this afterwards. ",
      "Est. Value": "",
      "Name": "Devil Salts",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Neverfull Waterskin (It's always half empty.)",
      "Est. Value": "200. gp",
      "Name": "Neverfull Waterskin",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An obsidian figurine of a dolphin which is always wet to the touch.",
      "Est. Value": "",
      "Name": "Obsidian Dolphin",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Quest Hook",
      "Description": "Within a rotten pouch found upon the body of a long dead soldier is a parchment with an unbroken seal. If the seal is broken and the message read, it warns its would-be recipient to guard against an eminent betrayal.",
      "Est. Value": "",
      "Name": "Old Guard's Note",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Unknown",
      "Category": "Treasure",
      "Description": "An abacus with counting beads made of ivory, silver, gold, and vitrified eye balls.",
      "Est. Value": "120. gp",
      "Name": "Ornate Abacus",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "A rapier in an ornate, electrum-trimmed steel scabbard worked in swirl-patterns. ",
      "Est. Value": "65. gp",
      "Name": "Ornate Rapier",
      "Properties": "1d8 Piercing - Martial - Finesse",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "One hundred and sixteen 3” white porcelain discs, each has a 1 ounce knob of electrum embedded in its center",
      "Est. Value": "",
      "Name": "Porcelain Discs",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Weapon",
      "Description": "You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the rarity of the ammunition. Once it hit a target, the ammunition is no longer magical. Value listed is for individual units.",
      "Est. Value": "25. gp",
      "Name": "1d20 Ammunition +1",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit. ",
      "Est. Value": "500. gp",
      "Name": "Adamantine Armor",
      "Properties": "Medium, Heavy (Not Hide)",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "20 - 60"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty. You can use an action and name one liquid from the table below to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as an action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named. Once the jug starts producing a liquid, it can't produce a different one, or more of one that has reached its maximum, until the next dawn. ",
      "Est. Value": "6,000. gp",
      "Name": "Alchemy Jug",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "These pieces of unweatherd, thick parchment are lined by a thin string of gold woven into the paper. To anyone who cannot read magic, they are always blank and featureless. However, someone who can read magic realizes that these scrolls can contain spell charges—of ANY type of spell, rather than just Arcane. Paladins, Clerics, and Druids, rejoice! Two charges of the spell must be spent to write one to the scroll, and some scrolls might be found with magic already written to them. These scrolls, once written to, can be cast free of charge—but the scroll is consumed in the process. Store those odd utility spells on Allmagic Scrolls, and never waste an unused daily charge again!",
      "Est. Value": "150. gp",
      "Name": "Allmagic Scrolls",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An amber gemstone of watery gold colouring. It has been polished so that you can see a small petrified leaf suspended inside.",
      "Est. Value": "100. gp",
      "Name": "Amber Gemstone",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An ornate cup fashioned out of a deep purple Amethyst. This material was probably chosen as many believe it to prevent intoxication.",
      "Est. Value": "100. gp",
      "Name": "Amethyst Drinking Cup",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this amulet, you are hidden from divination magic. You can't be targeted by such magic or perceived through magical scrying sensors. ",
      "Est. Value": "20,000. gp",
      "Name": "Amulet of Proof Against Detection and Location",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Requires Attunement",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A cache of ancient coins left from the elder days of the world and made by a civilization utterly alien to the values of today: They are carved from bloodstone, moonstone, and jacinth – with unknown faces and unreadable runes decorating their surface.",
      "Est. Value": "50. gp",
      "Name": "Ancient Coins",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "Ancient gold cube – quite encumbering.",
      "Est. Value": "200. gp",
      "Name": "Ancient Gold Cube",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "40 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "An ancient mummy which was given full burial rites and laid within a stately sarcophagus. Arranged on five pedestals around the sarcophagus are the canopic jars in which the mummy’s vital organs were placed. Although the mummy is not of the undead, opening these jars will reveal that its organs continue to function: The heart beats, the lungs fill with air and empty again, and so forth.",
      "Est. Value": "0. gp",
      "Name": "Ancient Mummy",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A collection case holding fifty spent wands – crafted by the finest craftsman and enchanted by the mightiest wizards of a bygone age, but now reduced to mere wood, bone, and glass.",
      "Est. Value": "40. gp",
      "Name": "Ancient Wand Box",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small box of turquoise animal figurines.",
      "Est. Value": "250. gp",
      "Name": "Animal Figurines",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "In this room of the dungeon, there is an elaborate arm chair carved entirely of a single piece of coal. It has been inlaid with silver runes that age has rendered unreadable.",
      "Est. Value": "80. gp",
      "Name": "Anthracite Chair",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "60 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A tiny diorama made of oak and silver, depicting a prophecy of the last days of the world in vivid detail.",
      "Est. Value": "80. gp",
      "Name": "Armageddon Diorama",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "20 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Book",
      "Description": "A very large scroll tube containing the plans for many of the ancient war engines of Armentarious.",
      "Est. Value": "100. gp",
      "Name": "Armentarious' Scroll Tube",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "An astrologer’s chart, inscribed with the finest instruments and the greatest precision upon a vellum which is both supple and expensive. Close inspection by those with the proper knowledge, however, reveals that these charts were constructed around an entirely different night sky – and, possibly, a calendrical system and length of year unlike anything known upon this world.",
      "Est. Value": "100. gp",
      "Name": "Astrologer's Chart",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A miniature golden chest with tiny emeralds lining the top that trace out a mage’s sigil. The chest is crafted in exquisite detail. (This is the material component of a “Secret Chest” (from the spell of the same name) for the ruthless lady-mage Aumurille, who will likely want it back....)",
      "Est. Value": "75. gp",
      "Name": "Aumurille's Chest",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action. If the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate. Placing a bag of holding inside an extradimensional space created by a Heward's handy haversack, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened. ",
      "Est. Value": "4,000. gp",
      "Name": "Bag of Holding",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "15 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A small bag of saffron. It can be used to flavor the parties travel rations, but is probably more valuable as a trade good.",
      "Est. Value": "22. gp",
      "Name": "Bag of Saffron",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This ordinary gray cloth bag appears to be empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table that corresponds to the bag’s color. The creature vanishes at the next dawn or when it is reduced to 0 hit points. The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature. Once three fuzzy objects have been pulled from the bag, the bag cannot be used again until the next dawn.    ",
      "Est. Value": "900. gp",
      "Name": "Bag of Tricks, Grey",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "Witch’s Mad Sack of Bats – releases swarm of bats",
      "Est. Value": "300. gp",
      "Name": "Bat Sack",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A famous battle banner, long lost, smells badly",
      "Est. Value": "200. gp",
      "Name": "Battle Banner",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "A pair of dark leather boots upon which a curious gnomish mechanism has been fastened around. There is a small lever on the side of the ankle that, when toggled, extends on each boot a set of sharp mountaineering claws. The boots are sized for medium humanoid but the mechanism itself would be easy enough for a blacksmith to scale up or down.",
      "Est. Value": "300. gp",
      "Name": "Bear Claw Boots",
      "Properties": "The mountaineering claws provide a +2 circumstance bonus to climb checks. This bonus can be used in addition to a Climber's Kit.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Treasure",
      "Description": "A stoppered behir horn containing 300 gp worth of powdered electrum",
      "Est. Value": "300. gp",
      "Name": "Behir Horn",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "A dark, water-worn leather belt embossed with an intricate seascape all around its girth. It has a polished golden buckle, as well as the name “Jadmek” carved into the front. It confers a +2 bonus to all Use Rope checks, as well as a +2 bonus to knowledge of anything maritime. Any encounter with pirates or seafaring merchants might prove interesting if the NPCs spot this belt.",
      "Est. Value": "220. gp",
      "Name": "Belt of the Shippey",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An antique golden bird cage with an electrum filigree.",
      "Est. Value": "250. gp",
      "Name": "Bird Cage",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "Four half-pound bricks of compressed Black Lotus pollen",
      "Est. Value": "400. gp",
      "Name": "Black Lotus Pollen",
      "Properties": "Potent poison. Very valuable to...the right people.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A 1’ x 3’ bronze plate bearing the ancient, and secret recipe for Black Mountain Stout",
      "Est. Value": "",
      "Name": "Black Mountain Stout Recipe",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Waterskin of lamb’s blood",
      "Est. Value": "0.2 gp",
      "Name": "Blood Waterskin",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A finely crafted figurine of a blue dragon, rampant, done in wood and painted. ",
      "Est. Value": "0.6 gp",
      "Name": "Blue Dragon Figurine",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently. ",
      "Est. Value": "2,500. gp",
      "Name": "Boots of Elvenkind",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "A pair of tan boots which are fastened around the foot with three adjustable belts. The inner sole of these boots feels springy to the touch and seems to mould itself around the user's foot for a fit so comfortable it's like walking on the clouds.",
      "Est. Value": "5,000. gp",
      "Name": "Boots of Striding and Springing",
      "Properties": "While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "A pair of hide boots lined with dense, warm white fur. The eyelet for each bootlace is patterned with small gemstones and the sole of the boot is spiked so as to benefit the user over icy and unstable terrain. These furred boots are snug and feel quite warm. ",
      "Est. Value": "2,500. gp",
      "Name": "Boots of the Winterlands",
      "Properties": "See DMG page 156.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "An ornate box containing corked vials of different diseases",
      "Est. Value": "",
      "Name": "Box o' Diseases",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A collection of humanoid figurines, each poised in an unspeakable act of evil. They are packed in box which has been wrapped in lamb’s wool.",
      "Est. Value": "30. gp",
      "Name": "Box of Evil Miniatures",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons.",
      "Est. Value": "1,500. gp",
      "Name": "Bracers of Archery",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "BGII",
      "Category": "Wondrous Item",
      "Description": "The bracers appear to be Bracers of Specialization, but when donned, bind the wearer wrists together, making it quite difficult to wield a weapon or cast a spell. These bracers are sometimes offered as rewards for services rendered by the Drow. The recipient, believing them to be very powerful, will often don them before examinating them. At this point, the drow find it amusing to conjure a hook horror. ",
      "Est. Value": "300. gp",
      "Name": "Bracers of Binding",
      "Properties": "lower damage by 5 points, increase spell failure to 75% and give the wearer a +5 penalty to THACO. Since they are cursed, they can't be unequiped without a Remove Curse spell or the services of a priest",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A delicate brass dragon egg; hollowed out and painted into a seascape, resting on a wooden stand.",
      "Est. Value": "35. gp",
      "Name": "Brass Dragon Egg",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A plain brass mug with a surprisingly ornate jade inlay.",
      "Est. Value": "250. gp",
      "Name": "Brass Mug",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A cask full of bronze caltrops.",
      "Est. Value": "3. gp",
      "Name": "Bronze Caltrops",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "6 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An old bronze crown, once inlaid with gemstones. They have since been picked out, but the crown itself is wonderfully cast.",
      "Est. Value": "250. gp",
      "Name": "Bronze Crown",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the magic missile spell. ",
      "Est. Value": "7,500. gp",
      "Name": "Brooch of Shielding",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Requires Attunement",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This wooden broom functions like a mundane broom until you stand astride it and speak its command word. It then hovers beneath you and can be ridden in the air. The broom stops hovering when you land. You can send the broom to travel alone to a destination within 1 mile of you if you speak the command word, name the location, and are familiar with that place. The broom comes back to you when you speak another command word, provided that the broom is still within 1 mile of you. ",
      "Est. Value": "8,000. gp",
      "Name": "Broom of Flying",
      "Properties": "It has a flying speed of 50 feet. It can carry up to 400 pounds, but its flying speed becomes 30 feet while carrying over 200 pounds. ",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "A silver ring shaped into the likeness of a bull’s head.",
      "Est. Value": "10. gp",
      "Name": "Bull's Head Ring",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A complete barding for a war horse made of Bullette horn plates.",
      "Est. Value": "",
      "Name": "Bullette Horn Barding",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "40 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "The word “STYX” is sewn into the inner headband of this cap.",
      "Est. Value": "1,000. gp",
      "Name": "Cap of Water Breathing",
      "Properties": "While wearing this cap underwater you can speak its command word as an action to create a bubble of air arround your head. It allows you to breathing normally underwater. This bubble stays with you until you speak the command word again, the cap is removed or you are no longer underwater.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "4 ceramic canopic jars, holding the stomach, intestines, lungs, and liver of a long-ago monarch. Each has a golden lid with a likeness of a paunchy, hook-nosed man with pale skin and a squint.",
      "Est. Value": "80. gp",
      "Name": "Ceramic Jars",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "20 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large, boxed chess set. All the pieces are small, dead pixies somehow sealed within glass.",
      "Est. Value": "150. gp",
      "Name": "Chess Set",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Chrysoberyl is a hard, transparent, green gem which is usually facet-cut. It is said that Chrysoberyl has ties to the outer planes and hence its use with battling demonic possession and the undead.        ",
      "Est. Value": "100. gp",
      "Name": "Chrysoberyl Gem",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A clàrsach harp in the style of the northern barbarians, but crafted with an elegance which suggests the decadence of a great civilization. Its strings are almost too fine to be perceived with the naked eye, and when they are played they resonate with the force of a full orchestra.",
      "Est. Value": "375. gp",
      "Name": "Clàrsach Harp",
      "Properties": "Add your proficiency bonus to all Performance (Charisma) checks made when playing the harp.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "80 lb"
    },
    {
      "Author": "AdamLapka",
      "Category": "Armor",
      "Description": "A normal looking black cloak with a high collar. When activated it gives off small puffs of black smoke that help obscure the wearer.",
      "Est. Value": "250. gp",
      "Name": "Cloak of Partial Shadow",
      "Properties": "Speak the command word to activate the cloak and receive advantage on your next stealth roll. The wearer can only benefit from the effect once. It lasts for up to 6 seconds.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "5 lbs"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Quest Hook",
      "Description": "A Companion Cube: It was created by a wizard who had stuck himself in a tower to show complete dedication to his studies. However, after several decades he became so lonely that he chose to make a friend... literally. Using what little non-component materials he had laying around his tower, he created a small cube and gave it sentience. It was able to communicate telepathically with anyone who made a link with the cube. Unfortunately, the wizard eventually died and the cube became lonely. Unable to travel and find a new friend, the cube simply sat there and waited for anyone to come along. Anyone seeing the cube would be compelled to be with the cube and have it in their possession. Upon holding the cube, they would feel the need to keep it with them at all times, and protect it as if it were their own child. Little by little, the connection between the cube and it's possessor would grow, until the two would be inseparable.",
      "Est. Value": "",
      "Name": "Companion Cube",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "30 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A dark crimson Coral gemstone fitted into a golden circlet.",
      "Est. Value": "100. gp",
      "Name": "Coral Circlet",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "This set of 12 torches burn different colors. There are two sets of Red, Yellow, Blue, Green, Orange and Purple torches.",
      "Est. Value": "50. gp",
      "Name": "Crayon Torches",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "12 lbs."
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "When used this sword will deliver 1 instant hit for max damage, including bonuses. Once used, the sword shatters into crystal shards. Anyone within one square must roll reflex or take 1d4 damage from shard pieces.",
      "Est. Value": "40. gp",
      "Name": "Crystal Sword",
      "Properties": "1d8 Slashing - Versatile (1d10)",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Dagger of slicing – ignores armor bonus",
      "Est. Value": "",
      "Name": "Dagger of Slicing",
      "Properties": "1d4 Piercing; Finesse, Light, Range, Thrown",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Charm that tells 1 truth about a creature killed in the area",
      "Est. Value": "",
      "Name": "Death Talker Charm",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Quest Hook",
      "Description": "Debt of a Soul – contract of soul ownership",
      "Est. Value": "",
      "Name": "Debt of a Soul",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An ancient deck of cards with five suits – clovers, swords, clubs, hearts, and dragons.",
      "Est. Value": "50. gp",
      "Name": "Deck of Cards",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "The skeletal remains of a long-dead warrior, wearing a suit of plate armor which has long since tarnished. The name of every warrior to ever die by the last wearer’s hand has been inscribed upon the front and back of the chest plate, covering nearly every inch of its surface with chaotically written, black runes.",
      "Est. Value": "",
      "Name": "Decrepit Skeleton in Armor",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "60 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Potion",
      "Description": "Dragon balm – reduced heat damage",
      "Est. Value": "",
      "Name": "Dragon Balm",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A statuette of a dragon, forged from the finest mithril, which responds to yes or no questions which are posed to it in draconic. The answers given may appear prophetic or oracular, but are actually random.",
      "Est. Value": "400. gp",
      "Name": "Dragon Statuette",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A wood chip which acts as a magnet, despite its non-metallic nature.",
      "Est. Value": "",
      "Name": "Druid's Magnet",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Once per day, give +10ft to movement, and +1 to attack and damage rolls to all allies.",
      "Est. Value": "",
      "Name": "Drums of Endurance",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "This compass is carved out of heavy, hard Petrebony (a wood that grows in caves). A brass needle sits in the center. However, this compass' needle points East, not North. There are no markings on its surface.",
      "Est. Value": "135. gp",
      "Name": "Duergar Compass",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Stack of 4, user covers 20ft radius in magic dust that shows anything that is hidden or dispellable.",
      "Est. Value": "",
      "Name": "Dust of Appearance",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Magical dust that makes anyone cough and sneeze (combat)",
      "Est. Value": "",
      "Name": "Dust of Coughing and Sneezing",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "stack of 4, user covers 20ft radius in magic dust that shows anything that is hidden or dispellable.",
      "Est. Value": "",
      "Name": "Dust of Dispelling",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "Works like a normal greatsword. Great tasting and low in calories! Regenerates 6 inches per day.",
      "Est. Value": "400. gp",
      "Name": "Edible Greatsword",
      "Properties": "2d6 Slashing - Heavy - Two-Handed",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "6 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Eldritch flint & steel – 10’ reach – blinding/minor burns",
      "Est. Value": "",
      "Name": "Eldritch Flint & Steel",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "An elegant carved comb of oak, engraved with the name Aethelren and decorated with twin dragons. Elsewhere, a similar comb of ash, engraved with the name Ilthorien and decorated with twin unicorns, can be found.",
      "Est. Value": "60. gp",
      "Name": "Elven Engraved Combs",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "This magical mason jar is made of uneven, lumpy, blue-green glass with a copper lid. No matter what is placed in this transparent jar, it will always appear to be empty from the outside--so long as the lid is on. On the lid is pressed “calasse,” Elven for “clean.” It cannot hold more than its actual volume.",
      "Est. Value": "800. gp",
      "Name": "Empty Mason Jar",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A purple-colored apple. (This enchanted apple has all the properties of a potion of Cure Light Wounds. 50gp)",
      "Est. Value": "50. gp",
      "Name": "Enchanted Apple",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Trap",
      "Description": "Exploding gold coins (Looks legit. Should avoid contact with real gold coins for safety...)",
      "Est. Value": "",
      "Name": "Exploding Gold Coins",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Exploding rations – breathe weapon 1d6 hours for 1 use of color theme type",
      "Est. Value": "",
      "Name": "Exploding Rations",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "These appear to be normal Gnomish fireworks (although even those might seem unique and valuable to anyone unfamiliar with Gnomish ingenuity) but when they are eventually set off they spell out giant obscenities across the night's sky. It seems, in retrospect, that they may have been created by a rather angry Gnome. Sadly, whomever created the fireworks and who they were originally intended for will forever remain a mystery.",
      "Est. Value": "30. gp",
      "Name": "F**k You Fireworks",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Treasure",
      "Description": "A finely made 10’ x 12’ wool floor rug. The center of the rug depicts a scene of siege warfare. A Halfling is being flung over a city wall by a trebuchet.",
      "Est. Value": "100. gp",
      "Name": "Finely Woven Rug",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Half-full flask of nightmare ale – 1 sip = 1d4 hours fear check per hour; full measure = 1d4 hours horrifying hallucinations vs DC save for early retirement",
      "Est. Value": "",
      "Name": "Flask of Nightmare Ale",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A pair of steel flasks, sealed with wax bearing the symbol of St. Cuthbert. (Holy water, 25 gp each)",
      "Est. Value": "",
      "Name": "Flask of St. Cuthbert",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A sundial which runs backwards.",
      "Est. Value": "",
      "Name": "Fundial",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Garnet is a general class of crystals ranging from deep red to violet in colour. a typical cut for this rare isometric gem is 12 to 24 sides, with the very rare 36 sides being known from time to time. it is rumored a 48-sided garnet exists although none have ever been able to track down its location. ",
      "Est. Value": "100. gp",
      "Name": "Garnet Gemstone",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Giant-King’s platinum necklace with crimson diamond worn by dragon",
      "Est. Value": "",
      "Name": "Giant-King's Necklace",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "A huge arrow, with a steel tip and copper wire inlaid spirally down the shaft. To a medium or large creature, it behaves just like a javelin. However, when thrown, it whistles loudly.",
      "Est. Value": "80. gp",
      "Name": "Giant's Arrow",
      "Properties": "1d6 Piercing - Simple - Thrown - Range: 30/120",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "This is a short pole-arm resembling a Fauchard or Guan do, with an additional spike for thrusting. It deals slashing damage when wielded in one hand and piercing damage when wielded in two hands.",
      "Est. Value": "5. gp",
      "Name": "Glaive",
      "Properties": "1d6 Slashing - Versatile (1d8 Piercing)",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Globe of Invulnerability (It's a snowglobe. Not even the gods themselves can destroy it.)",
      "Est. Value": "",
      "Name": "Globe of Invulnerability",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "Gloves that improve a skill but will randomly force the user to slap an ally/NPC during conversations at the DM's discretion.",
      "Est. Value": "",
      "Name": "Gloves of Slapping",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "This paint provides no protection, but grants 10 to disguise. The only way it works, however, is if the wearer is wearing no clothes, and covered head to toe in the stuff. It's hilarious when a disguise check fails, and they realize they are staring at a naked Gnome.",
      "Est. Value": "",
      "Name": "Gnome Camo Paint",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "Ring of a god",
      "Est. Value": "",
      "Name": "God Ring",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A golden bracelet.",
      "Est. Value": "250. gp",
      "Name": "Gold Bracelet",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small gold ring set with bloodstones.",
      "Est. Value": "250. gp",
      "Name": "Gold Ring",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A quiver of golden arrows, They are devoid of supernatural properties, but despite their unusual composition will perform as normal arrows would.",
      "Est. Value": "",
      "Name": "Golden Arrows",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A tablet of pure gold, inscribed with the core rites and beliefs of a venerable religion. Careful study of this tablet, however, will reveal subtle – but important – differences between these ancient practices and the current practices of the religion in question.",
      "Est. Value": "",
      "Name": "Golden Tablet",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "Weapon",
      "Description": "This is a large greataxe, with a steel shaft and silver floating blade much like the Telescoping Glaive. ",
      "Est. Value": "0. gp",
      "Name": "Greataxe of Blindness",
      "Properties": "1d14 Slashing - Martial - Heavy, Two-Handed When raising this axe to swing the wielder suffers 1 minute of total blindness.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "7 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A small, heart-shaped token carved out of rose-colored sandstone, holding the mad soul of a princess who was trapped there by a sorcerer many centuries ago. Her body remains in the hidden royal sepulchers of her homeland, perfectly preserved by ancient magic.",
      "Est. Value": "",
      "Name": "Heart Shaped Token",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "These start getting made after the party does something particularly heroic. Little cloth dolls that look like party members, when squeezed, the caster spouts illusionary flames, the cleric spouts prayers 'Praise Avandra!', the fighter has kung-fu action where he swings his sword.",
      "Est. Value": "",
      "Name": "Hero Dolls",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Horn Coral, which is also called night coral, is a deep black coral, similar to angel's skin save for its solid color. It is incredibly difficult to work with, and is used in jewelry as a polished twig or branch of material, or is cut cabochon. ",
      "Est. Value": "100. gp",
      "Name": "Horn Coral Gem",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Rod",
      "Description": "This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success.",
      "Est. Value": "",
      "Name": "Immovable Rod",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A carved sculpture of jungle animals on an ivory tusk.",
      "Est. Value": "250. gp",
      "Name": "Ivory Statuette",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small collection of antique Jade buttons.",
      "Est. Value": "100. gp",
      "Name": "Jade Buttons",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A Weather-worn jade statue depicting a desert beast known only to the people of the far south.",
      "Est. Value": "300. gp",
      "Name": "Jade Statue",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A telescope of jade and banded with bloodstone. A character looking through the telescope sees not the world around them, but a strange, alien panorama which – nonetheless – follows the motions of the telescope.",
      "Est. Value": "",
      "Name": "Jade Telescope",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A deep black brooch set with a Jet gemstone. Rumor suggests a brooch of this nature helps prevent the evil eye.",
      "Est. Value": "100. gp",
      "Name": "Jet Brooch",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Jewel encrusted sarcophagus – mummy inside",
      "Est. Value": "",
      "Name": "Jewel Encrusted Sarcophagus",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "When this Kazoo is played, it grants +2 to Intimidation checks. A +3 if the player has a kazoo in the room.",
      "Est. Value": "",
      "Name": "Kazoo of Intimidation",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A large snow globe, with a study base of polished oak, depicting a small farmhouse in the midst of a forest clearing. Shaking the globe causes the snow to gently fall, and as it does miniature figures exit the house and begin performing chores about the farmyard. The figures return to the house as the last flake falls.",
      "Est. Value": "",
      "Name": "Large Snow Globe",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Rocks stuffed with lava",
      "Est. Value": "",
      "Name": "Lava Rocks",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "This is a rack of weapons, armor, books, wands, whatever you desire. It holds anywhere from 3-6 items, each usually magical in nature. Each can be examined visually and by a Detect Magic spell. However, as soon as one is touched, the others disappear—never to be found again. Multiple items cannot be removed at once. Optionally a password could dispel the magic, allowing all items to be removed.",
      "Est. Value": "0. gp",
      "Name": "Leomund's Loot Rack",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "300 lb"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "The Longsword of Balanced Sums. Functions exactly like a generic +2 Longsword... except when you crit miss. Then it heals the target for half its max hit points.",
      "Est. Value": "",
      "Name": "Longsword of Balanced Sums",
      "Properties": "1d8+2 Slashing, Versatile (1d10+2)",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "5 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "You must have this item with you for 24 hours for it to become attuned to you. Once attuned, you may choose the result any time it is flipped, regardless of who actually flips it. Possible commands include heads, tails, and edge.",
      "Est. Value": "",
      "Name": "Lucky Coin",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Requires Attunement",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Once an encounter, the player can choose to roll a d20 and use that as their base AC instead of 10. Player must take the value of the roll.",
      "Est. Value": "",
      "Name": "Lucky Dodge Belt",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Litmus magic paper: This paper can be used as a standard action by rubbing it on an object. It either detects no magic and can be used again, or changed color and brightness to reflect the school(s) and strengths of magic on the object.",
      "Est. Value": "",
      "Name": "Magic Litmus Paper",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A stone table in the midst of the wilderness which is, nevertheless, always filled with a fresh meal whenever travelers come across it.",
      "Est. Value": "",
      "Name": "Meal Table",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Once per day, swift. remove AC of target granted by armor, last one turn. user takes penalty to AC equal to target for same duration. ",
      "Est. Value": "",
      "Name": "Medallion of Courage",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "Book",
      "Description": "This magical book has no discernable writings on the outside, or on any page. As soon as it is opened up, ask the player for the first three skills that come to mind. As soon as they tell you, the first page of the book becomes a table of contents with three chapters. The names of the chapters are the three skills they mentioned. Turning to the page of a skill chapter causes the book to disappear in a colored burst of light—and leaves the user with a permanent +1 rank to said skill. If their ranks are maxed out, the book is wasted.",
      "Est. Value": "950. gp",
      "Name": "Menesta's Book of Stored Skill",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "A merchant’s leather case containing a selection of twenty well-made daggers of varying designs.",
      "Est. Value": "80. gp",
      "Name": "Merchant's Dagger Box",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "22 lb"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A set of dies and hammers for minting the king's coinage.",
      "Est. Value": "400. gp",
      "Name": "Minting Tools",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "Mithril is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't.",
      "Est. Value": "800. gp",
      "Name": "Mithral Armor",
      "Properties": "Medium, Heavy (Not Hide)",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "20 - 60"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Moonbar is a pearly white, opaque gemstone, usually pale blue with green and gold mottling. Related in type to fire and black opals, but is only slightly more common. ",
      "Est. Value": "375. gp",
      "Name": "Moonbar Gemstone",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "Two peanut-sized balls of moss sit atop gnarled wooden knobs. Placing one of them in each ear causes total deafness—or total hearing protection, whichever your preference. The player cannot hear anything, and must succeed on a DC 16 Will save to speak a single sentence comprehensibly. However, they are totally immune to all sonic attacks and songs and can fall asleep extremely well. The earplugs can be removed at will.",
      "Est. Value": "45. gp",
      "Name": "Moss Earplugs",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Pearls consist of layers of aragonite agonizingly formed around a bit of grit or other irritant inside oysters and other mollusks. The resulting pearl has a rich, deep luster. Most of the pearls in the realms are white, however there are varieties that are much more rare such as rainbow and black. ",
      "Est. Value": "100. gp",
      "Name": "Pearl",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Potion",
      "Description": "A large carry pouch made from the skin of a monkey. Inside are 1d6 Potions of Greater Healing. ",
      "Est. Value": "300. gp",
      "Name": "Pouch of Healing Potions",
      "Properties": "You regain 4d4 + 4 hit points when you drink this potion.  The potion's red liquid glimmers when agitated.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "A small brown pouch that smells faintly musty. Inside it are 1d4 colourful mushrooms that are unrecognizable, even to a particularly knowledgeable alchemist or naturist. If determined, a painstaking delve through a herbalists library might identify the mushrooms as 'sub-space mushrooms' in a madly written diary of a man claiming to be a deposed king called Cooper.",
      "Est. Value": "0. gp",
      "Name": "Pouch of Mushrooms",
      "Properties": "If eaten, each mushroom will increase the consumer's size to one greater than it currently is for an hour.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Jacos",
      "Category": "Ring",
      "Description": "A silver ring, encrusted with a small topaz. Upon wearing it on their finger, the wearer feels incredibly strong and confident. However, entering combat, their confidence immediately dissipates, leaving them terrified.",
      "Est. Value": "20. gp",
      "Name": "Ring of Dubious Might",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "This sentient dagger attempts to help anytime it's owner tries to sneak by whistling inconspicuously.  For some reason it seems to have been discarded.",
      "Est. Value": "300. gp",
      "Name": "Sentient Dagger of Sneaking",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A long silk robe with golden embroidery.",
      "Est. Value": "250. gp",
      "Name": "Silk Robe",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "This silver necklace has a gemstone pendant.",
      "Est. Value": "250. gp",
      "Name": "Silver Necklace",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Sphene is a soft, brittle gemstone (and, like scapra, easily worked by unskilled cutters) of various yellow to green shades, the most prized of these being a fine emerald green. ",
      "Est. Value": "225. gp",
      "Name": "Sphene Gem",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A spun leather necklace of deep green Spinel beads.",
      "Est. Value": "100. gp",
      "Name": "Spinel Necklace",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A large, well-made tapestry depicting a local duke.",
      "Est. Value": "250. gp",
      "Name": "Tapestry",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "20 lb"
    },
    {
      "Author": "Scribnibbler21",
      "Category": "Armor",
      "Description": "The Rhinoclean helm is a large iron cap with visor shaped like the head of a certain kind of beetle. The helm's wearer has advantage on bull rushes and can stand up from being prone once on each of its turns without expending movement. ",
      "Est. Value": "",
      "Name": "The Rhinoclean Helm",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Scribnibbler21",
      "Category": "Armor",
      "Description": "The Rhinocles helm is a large iron cap with visor shaped like the head of a certain kind of beetle. The helm's wearer has advantage on bull rushes and can stand up from being prone once on each of its turns without expending movement.",
      "Est. Value": "",
      "Name": "The Rhinocles Helm",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A multi colored rectangular Tourmaline gemstone.",
      "Est. Value": "100. gp",
      "Name": "Tourmaline Gemstone",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "Townshend's Crudgels was invented by its namesake, Peter 'Unknown' Townshend, a traveling bard who wished his lute to both give beauty and take it away (preferably with a good old fashioned thrashing). His lute design, later copied by some of his admirers, was a simple oak lute, reinforced with an iron shell, to maintain the soft vibration of the sound against the wooden interior, and to give the lute the strength to crack open an orc's skull with a well placed blow. This weapon functions both as a lute and a weapon. When used as a lute, it is considered to be a lute and does not require a separate proficiency bonus to play. However, if the user rolls a critical miss with the weapon (a 1 on an attack roll) the lute may become slightly damaged and will require the user to spend an hour to retune it. If the instrument is not returned, whenever the instrument is played, the user is disadvantaged on the Perform check. This weapon can also be used as a bard's spellcasting focus. ",
      "Est. Value": "38. gp",
      "Name": "Townshend's Cudgel",
      "Properties": "1d6 Bludgeoning - Versatile (1d8)",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "Water Opal is a colourless, clear opal with a play of colour. It is rare and valuable in the Realms, where it is used in scrying devices. ",
      "Est. Value": "350. gp",
      "Name": "Water Opal",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Unknown",
      "Category": "Potion",
      "Description": "A potion vial containing a sweet. honey-smelling golden syrup. There is a label on the vial written in common, which reads 'Potion of Deception'.",
      "Est. Value": "1,000. gp",
      "Name": "Potion of False Bluff",
      "Properties": "The drinker of the potion perceives that they are an amazing liar. They believe that every bluff, diplomacy, and intimidation check they make for the next 1d4 hours succeeds, whether it does or not.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Sherwood Bosco",
      "Category": "Potion",
      "Description": "A pearlescent green potion in a glass vial that seems to swirl playfully when started at.",
      "Est. Value": "400. gp",
      "Name": "Potion of Harmless Flaying",
      "Properties": "1d4 rounds after drinking this potion target produces the illusions of his/her innards becoming outards for 1d6 minutes. The illusion is entirely intangible, but nonetheless real looking.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A pair of pole mounted fans made of giant raven feathers",
      "Est. Value": "",
      "Name": "Raven Feather Fans",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A pen made from a raven’s feather. Through some magical means it writes continuously from an inexhaustible supply of golden ink upon whatever piece of parchment may be near by.",
      "Est. Value": "",
      "Name": "Raven Pen",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Ricochet-sling – up to 4 targets (d4 for targets, attack roll each; first attack fail causes ricochet to end [unless a tie, in the case of a tie to AC the ricochet continues])",
      "Est. Value": "",
      "Name": "Ricochet Sling",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "",
      "Est. Value": "20. gp",
      "Name": "Ring of Bad Luck",
      "Properties": "This ring will appear to be a Ring of Good Luck without an appraise check of 25. It actually imbues the wearer -1 on all saves and is not removable for a full day without removing the enchantment.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "A silver ring inlaid with a trasluscent pearl. There is an inscription in Elvish which reads, 'To Elabella, perhaps now you will find your mirror less engrossing.'",
      "Est. Value": "80. gp",
      "Name": "Ring of Fake Invisibility",
      "Properties": "The wearer of this ring is unable to see themselves or anything they are carrying.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A brown and red flecked egg, about the size of a loaf of bread, that gives off a rancid scent.",
      "Est. Value": "50. gp",
      "Name": "Troglodyte Egg",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Weapon",
      "Description": "This massive boomerang requires two hands by medium sized humanoids. This may have been specially designed for an ogre, or giant. It has sharp metal blades that run down the side of each wing. The blades on the inner curves make it a bit tricky to wield.",
      "Est. Value": "50. gp",
      "Name": "Giant Boomerang",
      "Properties": "1d8 Bludgeoning - Thrown (Range: 30/90) - Two-Handed Special: Does not require direct line of sight, due to a curved trajectory.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Martial Weapon Expertise",
      "Weight": "4 lb"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Weapon",
      "Description": "This otherwise normal looking boomerang has a sense of arcana deep within it's dark oak core. Researching it's history will reveal that this is, in fact, one of many created by a local wizard who was frustrated at being unable to throw a normal boomerang in such a way that it returned naturally.",
      "Est. Value": "180. gp",
      "Name": "Boomerang of Retrieval",
      "Properties": "1d6 Bludgeoning (+1 force damage) - Thrown (Range: 30/90) Special: Does not require direct line of sight, due to a curved trajectory.  Unlike a normal boomerang, the boomerang of retrieval will always return to you after you make a ranged attack with it, even if you hit.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "An elegant puppet theater. Although its wood is brightly polished and the red of its satin curtains is bright and fresh, the hand-painted sign upon its front (reading “The Wondrous Show of Punch and Judy” in carnival lettering) is chipped and faded. If the curtains are opened (using a set of finely woven pulley ropes which lie inside the theater), the puppets – stored in a concealed compartment “backstage” – will come to life and perform elaborate shows of their own volition.",
      "Est. Value": "",
      "Name": "Puppet Theater",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "In a worn and decaying wall of mud bricks, a single black brick – polished and perfectly preserved – stands out in stark contrast. If the brick is pried out and broken open, it will reveal a quicksilver core.",
      "Est. Value": "",
      "Name": "Quicksilver Surprise",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A lucky rabbit’s foot which hangs from a golden chain. Although separated from the rest of the rabbit, the foot magically lives on: It will respond to touch, bleed if injured, and so forth.",
      "Est. Value": "",
      "Name": "Rabbit's Foot",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "This ring imbues the wearer +1 on all saves.",
      "Est. Value": "",
      "Name": "Ring of Good Luck",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Potion",
      "Description": "A small metal tin which has been carefully labelled. Instructions are included on the inside of the lid, 'Smear on bare skin to grow a natural defence.' The paste inside is white and gritty. It smells like coconut.",
      "Est. Value": "200. gp",
      "Name": "Shell Paste Lotion",
      "Properties": "Smearing Shell Paste lotion on your bare skin will cause an exoskeleton to grow for 1d4 hours. This exoskeleton increases your AC by 1.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "A metallic egg-shaped weapon which, when thrown, sprouts magical wings and hovers above it's intended target.",
      "Est. Value": "",
      "Name": "Griffon Bomb",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "An ornate, egg-shaped device made with cast bronze. There is a pin in the top of the device with an etched note indicating the following: PULL THYS PINNE AND WAITE TENNE COUNTS BEFORRE BOOME. When the pin is pulled, an urgent ticking sound begins to eminate from the device.",
      "Est. Value": "",
      "Name": "Gnome Bomb",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "An orange-yellow shell with small claw-like protrusions. This appears more to have been grown rather than constructed.",
      "Est. Value": "",
      "Name": "Elven Bomb",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Dwarven Bomb",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "A so-called 'Dryad Bomb', called such because when thrown it creates a mess of magically grown tangles and vines. Appears to be a glowing orange orb surrounded by a series of vines and roots.",
      "Est. Value": "",
      "Name": "Dryad Bomb",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Wondrous Item",
      "Description": "A magical time-keeping device produced by a Gnomish artisan. Opening this circular locket allows you to check the current time based on where a delicate hand is pointing. On one half of the circular face is an ornate night's sky with a crescent moon indicating midnight. On the other half is a blue sky, with a bright sun indicating mid-day. It's unclear how the magic has been infused with the device, as no arcane presence is detectable, but pulling the silver panel off the back of the locket simply exposes a number of delicate, ticking gears. Gnome magic is compicated.",
      "Est. Value": "150. gp",
      "Name": "Gnome Timepiece",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "A book detailing the general process of learning a language, from both a practical and theoretical angle. Written by a talented linguist called Chompsky the Gnome.",
      "Est. Value": "200. gp",
      "Name": "Learning Languages by Chompsky",
      "Properties": "Allows any natural speaker of a language to be considered an 'instructor' of that language. ",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Language: Common",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "One of the most famous plays in the works of the famous Orcish bard; Villam Spearshaker. It tells the story of two starcrossed lovers whose familes are locked in a bitter rivalry. They attempt to run away together, only to end up eaten by an ogre. The ogre then proceeds to eat most of the two feuding families, all of the side characters and in a number of early renditions of the play a few members of the audience as well. A note to budding directors: Try not to cast an actual ogre as the ogre.",
      "Est. Value": "180. gp",
      "Name": "Romeot and Julio",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "Uberbeard",
      "Category": "Book",
      "Description": "A sequel to the original play by the famous Orcish bard; Villam Speakshaker. Romeot and Julio (or at least, what's left of them) are ressurected as shambling zombies in service to a wealthy merchant. The play ends with the merchant attempting to extract a pound of flesh from Romeot to pay for a debt before getting eaten alive by the two zombies. Their final moments of the play are spent lovingly feeding each other his bloody entrails.",
      "Est. Value": "175. gp",
      "Name": "Romeot and Julio II",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Salve of Silence – armor improving sound nullifier",
      "Est. Value": "",
      "Name": "Salve of Silence",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A quarry of 20 Screaming Arrows – intimidate/fear check",
      "Est. Value": "",
      "Name": "Screaming Arrows",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Shrunken head with command word – 1 ray spell per hour",
      "Est. Value": "",
      "Name": "Shrunken Head",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "A large signet ring of gold, worked with a unicorn crest. Any commoner who dons the ring will suddenly discover its metal heated to unbearable levels – causing one hit point of damage per round. However, anyone with noble blood (however slight), or destined to become a noble at some point in the future, who does the same will suffer only a momentary flash of pain (with an accompanying 1 hp of damage). They will find that the unicorn crest has reshaped itself to their own heraldry, which has also been branded in miniature form upon the back of the finger. From this point forward, they can put on or remove the ring at will without any further ill effects.",
      "Est. Value": "",
      "Name": "Signet Ring of Gold",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Gold dipped idol of several skulls",
      "Est. Value": "600. gp",
      "Name": "Skull Idol",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "One time use only, grants perfect hide and move silently rolls to all allies. effect is lost if moved within 10ft of enemy",
      "Est. Value": "",
      "Name": "Smoke of Deceit",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Baldur's Gate II",
      "Category": "Armor",
      "Description": "This heavy and thick bear hide is all that remains of the fabled Aeger. Several hundred years ago, the Aeger, a giant bear, terrorized hundreds of small villages up and down the Sword Coast. The bear was invulnerable to fire, cold, or acid. Finally the young men and women of several villages banded together, forming a militia almost two hundred people strong. The Aeger was surrounded and finally slain. Less than a dozen villagers survived, and they carved the Aeger's hide amongst themselves. Out of one of the pieces this armor was created. ",
      "Est. Value": "9,000. gp",
      "Name": "Aeger's Hide",
      "Properties": "Medium Armor Armor Class: 12 + Dex Modifier (max 2) Provides +15% resistance to fire, cold, and acid Render's it's wearer immune to confusion",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "Requires Attunement",
      "Weight": "35 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A cursed fishing pole made of blackened ash. It will never catch a fish – although, if one attempts to use it unbaited, they will succeed in catching skeleton fish.",
      "Est. Value": "",
      "Name": "Solomon's Fishing Pole",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Brass dungeon compass, runic markings, always points to nearest exit.",
      "Est. Value": "",
      "Name": "Sortida Compass",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Giant spider silk rope – sticks to most surfaces (including oiled gloves)",
      "Est. Value": "",
      "Name": "Spider-Silk Rope",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "once per day, standard. lifts target into air for 3 rounds. Enemy can make a reflex save each round to get out DC 10+User level. Deals 1d8 after 1 round, then 2d8, and 3d8 if they cannot get out after 3 rounds",
      "Est. Value": "",
      "Name": "Staff of Eulosus",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "once per day, standard. push target 10 ft the direction they are facing. once per day. If target is pushed into another creature, they deal 1d20 damage. to each other. If target is pushed into object, they take 1d20. Target can make a fort save against the push, goes against users 1d20+will mod ",
      "Est. Value": "",
      "Name": "Staff of Force",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Pebble that transforms into whatever inorganic substance it last touched. Currently the leather of your pouch. ",
      "Est. Value": "",
      "Name": "Stem-Stone",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Thirty storm giant minted gold coins, each is the size of a dinner plate and weighs 17 lbs. The image stuck on the coins shows a giant hand flicking a human off a table.",
      "Est. Value": "",
      "Name": "Storm Giant Coins",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A horn fashioned from the translucent bone of a storm giant. Those who put their ear to the horn hear it whisper the sounds of an unknown village square. Whether the village which they hear is – or was – a real place is a mystery which may never be solved. (Twin horn in village square allows communication between the two).",
      "Est. Value": "",
      "Name": "Storm Giant Horn",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Battle Fury-grants the feat Cleave",
      "Est. Value": "",
      "Name": "Sword of Battle Fury",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Enchanted talking toad – polymorphed noble – knowledge of multiple regions, religions & other worldly strangeness",
      "Est. Value": "",
      "Name": "Talking Toad",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PlatypusPal",
      "Category": "Weapon",
      "Description": "Each day this blade draws no blood it becomes heavier to bear.",
      "Est. Value": "",
      "Name": "The Bloody Burden",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A plain mirror with a frame of pale ashwood. Whenever someone looks in the mirror, however, they perceive an elven face in place of their own.",
      "Est. Value": "",
      "Name": "The Elven Mirror",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A famous (or forgotten) tapestry depicting the Fall of Erian. The figures upon the tapestry move and change, re-enacting – in an artistically abstracted form – the legendary battle over the course of half an hour.",
      "Est. Value": "",
      "Name": "The Erian Tapestry",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "Functions as a normal helmet other than the fact that it turns the user's head invisible.",
      "Est. Value": "",
      "Name": "The Headless Helm",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "The Living Lantern, it acts as a decent light source, but it hates wooden items and structures and tends to set them on fire. I haven't decided if it should take a liking to burning cloth. It has some very curious results, mostly involving villagers getting angry at their houses burning or support struts burning down resulting in some catastrophic collapse.",
      "Est. Value": "",
      "Name": "The Living Lantern",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "If the user of this throwing axe manages a critical hit, it will sever an appendage. – critical = appendage severed",
      "Est. Value": "",
      "Name": "Throwing Axe of Appendage Severing",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "When embedded in the hilt of a weapon. -deal and additional 1d6 lightning damage on attacks with an odd 1d20 roll",
      "Est. Value": "",
      "Name": "Thunder Pommel",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A floating mass of swirling colours the size of a penny. It follows your every command and leaves a multicolour trail across any surface it touches. Cannot physically interact in any other way.",
      "Est. Value": "",
      "Name": "Tiny Phantasm",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A pinewood totem pole of the northern barbarians, bearing six faces (from top to bottom): a hawk, a demon, an elk, a man, a fox, and a white dragon. The hawk has a silver feather on the left side of its face (8gp), the demon has a gold nose-ring (6gp), the elk has copper antlers (4gp), the man has electrum eyes (3gp each), the fox has a black onyx nose (15gp), and the dragon has ivory teeth (30 teeth worth 1gp each). The pole is fifteen feet tall and weighs 200 pounds. (4.57m, 90.7kg)",
      "Est. Value": "",
      "Name": "Totem Pole",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A token/key designed to deactivate all traps within the dungeon, requires activation at security box in secret depths of deepest part of dungeon",
      "Est. Value": "",
      "Name": "Trap Detection Key",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Triple ‘barreled’ crossbow",
      "Est. Value": "",
      "Name": "Triple Barreled Crossbow",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "PlatypusPal",
      "Category": "Armor",
      "Description": "Troll-rubber boots. They give a +1 to stealth movement.",
      "Est. Value": "",
      "Name": "Troll-Rubber Boots",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "Underworld Currency – lead coins; purple rocks/crystals, fairy dust, dragon scales, dna globules (rocks/capsules with runic understanding of specific creatures), tally bones, soul traps/crystals",
      "Est. Value": "",
      "Name": "Underworld Currency",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "This dagger belonged to the great druid, Marcek, a wise and cunning elf who fell only to the fiery Wyrm, Brazzemel, during his quest to reclaim the lost Eladrin spell tomes. Marcek inherited this dagger from his master and mentor, Garbasen the Sage, who crafted it with ancient Eladrin magic. Covered in etched runes and jewels, this dagger holds a legendary history and a powerful magic core.",
      "Est. Value": "",
      "Name": "Visikus",
      "Properties": "1d4 Piercing - Finesse, Light - Range: 20/60",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A wand of eye poking, four charges. It will unerringly poke out the eye of a target creature within arm’s reach.",
      "Est. Value": "",
      "Name": "Wand of Eye-Poking",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A sheep's bladder waterskin. It is lined with a suedelike fabric which has been beautifully stiched with the image of a stag's head. ",
      "Est. Value": "600. gp",
      "Name": "Waterskin of Inexplicable Amelioration",
      "Properties": "When any liquid is poured into this waterskin it is instantly purified of disease, poison or other potentially harmful contaminents.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A leaf from the great tree Yggdrasil.",
      "Est. Value": "",
      "Name": "Yggdrasil Leaf",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A trolls hand mounted on a three foot rod. It will grasp objects or make a fist. Commands: Grabit, Leggo, Fist.",
      "Est. Value": "",
      "Name": "Zulabar's Fist-Stick",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "William Orfanakos",
      "Category": "Wondrous Item",
      "Description": "This appears to be a common cloth sack about 2 feet by 4 feet in size. ",
      "Est. Value": "500. gp",
      "Name": "Greedy Bag of Holding",
      "Properties": "This functions as a normal Bag of Holding, but for every item you wish to remove from the bag you must put in a silver piece. Any money placed into the bag dissapears almost immediately. It's unclear where the coins go when placed into the bag.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "15 lb"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "",
      "Est. Value": "",
      "Name": "Dice Mace",
      "Properties": "-5 to hit but does 1d20 Bludgeoning Damage",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Thirsty Cup",
      "Properties": "All liquid poured into this cup drains from it as if there was a hole in the bottom.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Susej Cup",
      "Properties": "Turns any liquid that is poured into this cup into Elven wine.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Charm of Frost",
      "Properties": "grants water-walking abilities, but requires concentration. Anything that disrupts a concentration spell disrupts the charm. 10 ft radius of ice",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Illusionary Coin Bag",
      "Properties": "a bag that makes all coins in it appear as platinum. Coins revert to original form 5 minutes after being taken out of bag. Can not hold more than 50 coins. This means you do not actually gain any profit from using the bag, but you can trick people",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "",
      "Est. Value": "",
      "Name": "Sword of Frost",
      "Properties": "1d6 slashing damage, 1d6 chill damage. Freezes/Slows enemies hit, upon death enemy turns to ice and shatters, damaging all nearby enemies for 1d4 chill damage. No effect on fire or ice enemies",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "",
      "Est. Value": "",
      "Name": "Axe of Blood",
      "Properties": "crimson red axe that deals 1d6 slashing damage and 1d6 bludgeoning damage. Each hit restores +1 hp to wielding regardless of damage dealt",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "",
      "Est. Value": "",
      "Name": "Hypnotic Spinning Top",
      "Properties": "a spinning top that causes all creatures that can see it, including the person spinning it, to become mesmerized by it and will do nothing but stand in place and stare at it until it stops spinning and falls. This effect is technically psionic",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A bronze circle held by a red ribbon.",
      "Est. Value": "",
      "Name": "Blood Amulet",
      "Properties": "This amulet is constantly covered in blood. Any attempt to wash the blood off is unsuccessful, and the amulet must be wrapped in a waterproof cloth to prevent anything it is kept in frow slowly becoming drenched in blood.",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Baldur's Gate II",
      "Category": "Armor",
      "Description": "This robe has been specially enchanted to meet the eclectic needs of the adventuring mage. Aside from protecting the wearer from various forms of crushing damage, it also provides protection from the basilisk's petrying gaze and polymorphing powers of rival mages. As with other such robes, the Adventurer's Robe can only be worn by those engaged in the wizardly profession. ",
      "Est. Value": "600. gp",
      "Name": "Adventurer's Robe",
      "Properties": "AC: 11 + Dex Modifier Disadvantage on Stealth + 1 bonus vs. petrification & polymorph",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "4 lb"
    },
    {
      "Author": "Baldur's Gate II",
      "Category": "Treasure",
      "Description": "This enchanted statuette depicts the swirling form of an air elemental. When stood close, you can feel a cooling breeze swirling around the statuette.",
      "Est. Value": "450. gp",
      "Name": "Air Elemental Statue",
      "Properties": "",
      "Rarity": "Uncommon",
      "Rarity Number": "3",
      "Requirements": "",
      "Weight": "10 lb"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Aganazzar's Scorcher spell.",
      "Name": "Aganazzar's Scorcher Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Aid spell.",
      "Name": "Aid Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Alter Self spell.",
      "Name": "Alter Self Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Animal Messenger spell.",
      "Name": "Animal Messenger Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Arcane Lock spell.",
      "Name": "Arcane Lock Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Augury spell.",
      "Name": "Augury Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Barkskin spell.",
      "Name": "Barkskin Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Beast Sense spell.",
      "Name": "Beast Sense Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Blindness Deafness spell.",
      "Name": "Blindness Deafness Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Blur spell.",
      "Name": "Blur Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Branding Smite spell.",
      "Name": "Branding Smite Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Calm Emotions spell.",
      "Name": "Calm Emotions Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Cloud of Daggers spell.",
      "Name": "Cloud of Daggers Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Continual Flame spell.",
      "Name": "Continual Flame Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Cordon of Arrows spell.",
      "Name": "Cordon of Arrows Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Crown of Madness spell.",
      "Name": "Crown of Madness Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Darkness spell.",
      "Name": "Darkness Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Darkvision spell.",
      "Name": "Darkvision Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Detect Thoughts spell.",
      "Name": "Detect Thoughts Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dragon's Breath spell.",
      "Name": "Dragon's Breath Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dust Devil spell.",
      "Name": "Dust Devil Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Earthbind spell.",
      "Name": "Earthbind Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Enhance Ability spell.",
      "Name": "Enhance Ability Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Enlarge Reduce spell.",
      "Name": "Enlarge Reduce Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Enthrall spell.",
      "Name": "Enthrall Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Find Steed spell.",
      "Name": "Find Steed Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Find Traps spell.",
      "Name": "Find Traps Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Flame Blade spell.",
      "Name": "Flame Blade Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Flaming Sphere spell.",
      "Name": "Flaming Sphere Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Gentle Repose spell.",
      "Name": "Gentle Repose Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Gust of Wind spell.",
      "Name": "Gust of Wind Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Healing Spirit spell.",
      "Name": "Healing Spirit Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Heat Metal spell.",
      "Name": "Heat Metal Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hold Person spell.",
      "Name": "Hold Person Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Invisibility spell.",
      "Name": "Invisibility Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Knock spell.",
      "Name": "Knock Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Lesser Restoration spell.",
      "Name": "Lesser Restoration Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Levitate spell.",
      "Name": "Levitate Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Locate Animals or Plants spell.",
      "Name": "Locate Animals or Plants Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Locate Object spell.",
      "Name": "Locate Object Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Magic Mouth spell.",
      "Name": "Magic Mouth Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Magic Weapon spell.",
      "Name": "Magic Weapon Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Maximillian's Earthen Grasp spell.",
      "Name": "Maximillian's Earthen Grasp Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Melf's Acid Arrow spell.",
      "Name": "Melf's Acid Arrow Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mind Spike spell.",
      "Name": "Mind Spike Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mirror Image spell.",
      "Name": "Mirror Image Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Misty Step spell.",
      "Name": "Misty Step Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Moonbeam spell.",
      "Name": "Moonbeam Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Nystul's Magic Aura spell.",
      "Name": "Nystul's Magic Aura Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Pass without Trace spell.",
      "Name": "Pass without Trace Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Phantasmal Force spell.",
      "Name": "Phantasmal Force Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Prayer of Healing spell.",
      "Name": "Prayer of Healing Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Protection from Poison spell.",
      "Name": "Protection from Poison Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Pyrotechnics spell.",
      "Name": "Pyrotechnics Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Ray of Enfeeblement spell.",
      "Name": "Ray of Enfeeblement Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Rope Trick spell.",
      "Name": "Rope Trick Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Scorching Ray spell.",
      "Name": "Scorching Ray Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the See Invisibility spell.",
      "Name": "See Invisibility Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Shadow Blade spell.",
      "Name": "Shadow Blade Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Shatter spell.",
      "Name": "Shatter Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Silence spell.",
      "Name": "Silence Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Skywrite spell.",
      "Name": "Skywrite Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Snilloc's Snowball Swarm spell.",
      "Name": "Snilloc's Snowball Swarm Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Spider Climb spell.",
      "Name": "Spider Climb Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Spike Growth spell.",
      "Name": "Spike Growth Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Spiritual Weapon spell.",
      "Name": "Spiritual Weapon Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Suggestion spell.",
      "Name": "Suggestion Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Warding Bond spell.",
      "Name": "Warding Bond Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Warding Wind spell.",
      "Name": "Warding Wind Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Web spell.",
      "Name": "Web Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Zone of Truth spell.",
      "Name": "Zone of Truth Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Animate Dead spell.",
      "Name": "Animate Dead Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Aura of Vitality spell.",
      "Name": "Aura of Vitality Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Beacon of Hope spell.",
      "Name": "Beacon of Hope Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Bestow Curse spell.",
      "Name": "Bestow Curse Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Blinding Smite spell.",
      "Name": "Blinding Smite Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Blink spell.",
      "Name": "Blink Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Call Lightning spell.",
      "Name": "Call Lightning Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Catnap spell.",
      "Name": "Catnap Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Clairvoyance spell.",
      "Name": "Clairvoyance Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Conjure Animals spell.",
      "Name": "Conjure Animals Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Conjure Barrage spell.",
      "Name": "Conjure Barrage Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Counterspell spell.",
      "Name": "Counterspell Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Create Food and Water spell.",
      "Name": "Create Food and Water Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Crusader's Mantle spell.",
      "Name": "Crusader's Mantle Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Daylight spell.",
      "Name": "Daylight Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Dispel Magic spell.",
      "Name": "Dispel Magic Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Elemental Weapon spell.",
      "Name": "Elemental Weapon Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Enemies Abound spell.",
      "Name": "Enemies Abound Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Erupting Earth spell.",
      "Name": "Erupting Earth Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Fear spell.",
      "Name": "Fear Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Feign Death spell.",
      "Name": "Feign Death Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Fireball spell.",
      "Name": "Fireball Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Flame Arrows spell.",
      "Name": "Flame Arrows Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Fly spell.",
      "Name": "Fly Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Gaseous Form spell.",
      "Name": "Gaseous Form Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Glyph of Warding spell.",
      "Name": "Glyph of Warding Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Haste spell.",
      "Name": "Haste Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hunger of Hadar spell.",
      "Name": "Hunger of Hadar Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Hypnotic Pattern spell.",
      "Name": "Hypnotic Pattern Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Leomund's Tiny Hut spell.",
      "Name": "Leomund's Tiny Hut Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Life Transference spell.",
      "Name": "Life Transference Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Lightning Arrow spell.",
      "Name": "Lightning Arrow Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Lightning Bolt spell.",
      "Name": "Lightning Bolt Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Magic Circle spell.",
      "Name": "Magic Circle Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Major Image spell.",
      "Name": "Major Image Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mass Healing Word spell.",
      "Name": "Mass Healing Word Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Meld into Stone spell.",
      "Name": "Meld into Stone Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Melf's Minute Meteors spell.",
      "Name": "Melf's Minute Meteors Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Nondetection spell.",
      "Name": "Nondetection Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Phantom Steed spell.",
      "Name": "Phantom Steed Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Plant Growth spell.",
      "Name": "Plant Growth Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Protection from Energy spell.",
      "Name": "Protection from Energy Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Remove Curse spell.",
      "Name": "Remove Curse Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Revivify spell.",
      "Name": "Revivify Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Sending spell.",
      "Name": "Sending Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Sleet Storm spell.",
      "Name": "Sleet Storm Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Slow spell.",
      "Name": "Slow Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Speak with Dead spell.",
      "Name": "Speak with Dead Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Speak with Plants spell.",
      "Name": "Speak with Plants Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Spirit Guardians spell.",
      "Name": "Spirit Guardians Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Stinking Cloud spell.",
      "Name": "Stinking Cloud Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Summon Lesser Demons spell.",
      "Name": "Summon Lesser Demons Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Thunder Step spell.",
      "Name": "Thunder Step Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Tidal Wave spell.",
      "Name": "Tidal Wave Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Tiny Servant spell.",
      "Name": "Tiny Servant Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Tongues spell.",
      "Name": "Tongues Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Vampiric Touch spell.",
      "Name": "Vampiric Touch Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wall of Sand spell.",
      "Name": "Wall of Sand Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wall of Water spell.",
      "Name": "Wall of Water Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wall of Water spell.",
      "Name": "Wall of Water Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Water Breathing spell.",
      "Name": "Water Breathing Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Water Walk spell.",
      "Name": "Water Walk Spell Scroll",
      "Rarity": "Uncommon"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wind Wall spell.",
      "Name": "Wind Wall Spell Scroll",
      "Rarity": "Uncommon"
    }
  ],
  "Very Rare": [
    {
      "Author": "PlatypusPal",
      "Category": "Quest Hook",
      "Description": "A scroll that when signed with blood would enter the participant into an assassin ranking system. Upon the scroll was also an arrow that always pointed to the assassin that was a rank above you. The goal is to reach rank 1 for a single wish however the only way to gain a rank is to kill the assassin above you. The Rank is infamous and well paid for their trade so strong assassins are always waiting for a rank opening.",
      "Est. Value": "",
      "Name": "Blood Scroll",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Extract the consciousness of a pacified or willing being to be stored within. The consciousness can be injected into the still warm body of a dead being, giving them a new body to inhabit. ",
      "Est. Value": "",
      "Name": "Essence Extractor",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A person bandaged with this item will be unable to do anything for themselves and will rely on others for everything. They will not remove the bandage until the wound is healed. ",
      "Est. Value": "",
      "Name": "Helpless Bandage",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "The wearer of this necklace has a general feeling that he is safe. The opposite is, in fact, the case. Any time something bad happens to the group, the wearer of this necklace bears the brunt of the misfortune",
      "Est. Value": "",
      "Name": "Ill-Fated Necklace",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A damp rag which carries a faint musty smell.",
      "Est. Value": "",
      "Name": "Permanently Damp Rag",
      "Properties": "Can be wrung out infinitely to produce foul tasting water.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DangerousPuhson",
      "Category": "Quest Hook",
      "Description": "The potions are a polymorphed group of famous heroes transformed into oozes. Anyone with the ability to communicate telepathically are able to speak with them (and probably help them get back to normal).",
      "Est. Value": "",
      "Name": "Polymorphed Adventurers Potions",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Weapon",
      "Description": "You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the rarity of the ammunition. Once it hit a target, the ammunition is no longer magical. Value listed is for individual units.",
      "Est. Value": "400. gp",
      "Name": "1d20 Ammunition +3",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Weapon",
      "Description": "An arrow of slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both arrows of dragon slaying and arrows of blue dragon slaying. If a creature belonging to the type, race, or group associated with an arrow of slaying takes damage from the arrow, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one. Once an arrow of slaying deals its extra damage to a creature, it becomes a nonmagical arrow. Other types of magic ammunition of this kind exist, such as bolts of slaying meant for a crossbow, though arrows are most common. Value listed is for each arrow.",
      "Est. Value": "600. gp",
      "Name": "2d4 + 2 Arrows of Slaying",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this amulet, you can use an action to name a location that you are familiar with on another plane of existence. Then make a DC 15 Intelligence check. On a successful check, you cast the plane shift spell. On a failure , you and each creature and object within 15 feet of you travel to a random destination. Roll a dlOO. On a 1- 60, you travel to a random location on the plane you named. On a 61- 100, you travel to a randomly determined plane of existence. ",
      "Est. Value": "160,000. gp",
      "Name": "Amulet of the Planes",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "These two amulets are enchanted as a pair and both must be worn at the same time for the enchantment to work. Anything wearing it cannot be considered as food.",
      "Est. Value": "1,000. gp",
      "Name": "Amulets of Inedibility",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": "n/a"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "Once per day, you can remove AC of target granted by armor, last until end of your next turn. User takes -2 to AC for same duration. (I think lasting until the end of combat might be a bit op, also  I have named it after Hans Christian Anderson because it makes me thing of the Emperor's New Clothes)",
      "Est. Value": "400. gp",
      "Name": "Anderson's Medallion",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "Smart 50’ rope – obeys simple commands, animated like snake",
      "Est. Value": "50gp",
      "Name": "Animated Rope",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "While holding this shield, you can speak its command word as a bonus action to cause it to animate. The shield leaps into the air and hovers in your space to protect you as if you were wielding it, leaving your hands free. The shield remains animated for 1 minute, until you use a bonus action to end this effect, or until you are incapacitated or die, at which point the shield falls to the ground or into your hand if you have one free.",
      "Est. Value": "6,000. gp",
      "Name": "Animated Shield",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": "6 lb"
    },
    {
      "Author": "DMG",
      "Category": "Armor",
      "Description": "You have a +2 bonus to AC while wearing this armor.",
      "Est. Value": "6,000. gp",
      "Name": "Armor +2",
      "Properties": "Light, Medium or Heavy",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "8 - 60"
    },
    {
      "Author": "Uberbeard",
      "Category": "Ring",
      "Description": "When you take off this ring and it transports you to where you first put it on and disappears.",
      "Est. Value": "9,000. gp",
      "Name": "Back to the Beginning Ring",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This bag superficially resembles a bag of holding but is a feeding orifice for a gigantic extradimensional creature. Turning the bag inside out closes the orifice. The extradimensional creature attached to the bag can sense whatever is placed inside the bag. Animal or vegetable matter placed wholly in the bag is devoured and lost forever. When part of a living creature is placed in the bag, as happens when someone reaches inside it, there is a 50 percent chance that the creature is pulled inside the bag. A creature inside the bag can use its action to try to escape with a successful DC 15 Strength check. Another creature can use its action to reach into the bag to pull a creature out, doing so with a successful DC 20 Strength check (provided it isn't pulled inside the bag first). Any creature that starts its turn inside the bag is devoured, its body destroyed. Inanimate objects can be stored in the bag, which can hold a cubic foot of such material. However, once each day, the bag swallows any objects inside it and spits them out into another plane of existence. The DM determines the time and plane. If the bag is pierced or torn, it is destroyed, and anything contained within it is transported to a random location on the Astral Plane. ",
      "Est. Value": "10,000. gp",
      "Name": "Bag of Devouring",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "15 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A beautiful, vibrantly colorful cloth parasol with a light wooden handle. The object feels delicate and weightless.",
      "Est. Value": "1,500. gp",
      "Name": "Bardweave Parisol",
      "Properties": "As a reaction, you may open this parasol to defend you, provided it is easily reachable on your character. When you make a dexterity save, you may use your reaction to open the magical parasol, giving you resistance to all damage. If you suffer more than 10 damage after this resistance, the parasol is damaged and can no longer protect you. It can be repaired with a sewing kit or a proficient tailor.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this belt, your Strength score changes to 25. If your Strength is already equal to or greater than 25, the item has no effect on you.",
      "Est. Value": "24,000. gp",
      "Name": "Belt of Fire Giant Strength",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this belt, your Strength score changes to 23. If your Strength is already equal to or greater than 23, the item has no effect on you.",
      "Est. Value": "19,000. gp",
      "Name": "Belt of Frost Giant Strength",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "While wearing this belt, your Strength score changes to 23. If your Strength is already equal to or greater than 23, the item has no effect on you.",
      "Est. Value": "19,000. gp",
      "Name": "Belt of Stone Giant Strength",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": "1 lb"
    },
    {
      "Author": "PlatypusPal",
      "Category": "Wondrous Item",
      "Description": "A plain, unadorned black obelisk. If brought above ground and into the open, the obelisk will draw down a near-constant barrage of lightning to itself – even if the sky is clear.",
      "Est. Value": "17,500. gp",
      "Name": "Black Obelisk",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "1000 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A translucent lustrous black Sapphire with glowing highlights.",
      "Est. Value": "5,000. gp",
      "Name": "Black Sapphire",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Weapon",
      "Description": "Twice per day, whomever users this dagger can instantly teleport up to 30 ft in any direction. Cannot be used if you were attacked since your last turn.",
      "Est. Value": "7,000. gp",
      "Name": "Blink Dagger",
      "Properties": "1d4+2 Piercing | Finesse, Light",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "An old looking brass harp that has only 3 strings left. The strings are flecked with rust, or so it seems. Holding it gives you a feeling of cold anxiety.",
      "Est. Value": "2,500. gp",
      "Name": "Bloodied Harp",
      "Properties": "Plucking the harp strings causes you great pain and triggers magical effects. The first string deals 1d6 damage to you, and casts the 'sleep' spell at first level, using Charisma. The second string deals 2d6 damage to you, and 2d6 damage to all targets within 20 feet. The third string deals 3d6 damage to you, and heals a target in 20 feet for 4d6. You may pluck 3 strings each day.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "The wearer of the boots gains water-walking, with a twist. On any body of salt water, the boots generate a 30 ft. radius of dry, walkable sand beneath the wearer. Which means several party members could benefit from the effect. They functioned for an hour per day, but it didn't have to be continuous.",
      "Est. Value": "",
      "Name": "Boots of Dry Land",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Brazier of infinite imps. 1d4 imps spawn every 24 hours. If they are not killed by the time the brazier spawns a new set, the previous imps die and vanish.",
      "Est. Value": "500. gp",
      "Name": "Brazier of Infinite Imps",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Armor",
      "Description": "A wooden buckler with a burned-in sigil of a bee on the shield face. It vibrates ferociously when struck.",
      "Est. Value": "2,500. gp",
      "Name": "Buzzing Buckler",
      "Properties": "Adds no armor. If you are the victim of a ranged attacked, you may use your reaction to increase your AC by +1. If you choose to do this, and the attack fails to hit you, the projectile is deflected by your shield, and bursts into a cloud of angry bees that will seek the attacker and sting it relentlessly, causing 1d6 poison damage at the beginning of each of their turns for one minute, or until you recall the bees. The victim also suffers disadvantage on attack rolls and can no longer maintain concentration.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Wondrous Item",
      "Description": "This slender taper is dedicated to a deity and shares that deity's alignment. The candle's alignment can be detected with the detect evil and good spell. The DM chooses the god and associated alignment or determines the alignment randomly. The candle's magic is activated when the candle is lit, which requires an action. After burning for 4 hours, the candle is destroyed. You can snuff it out early for use at a later time. Deduct the time it burned in increments of 1 minute from the candle's total burn time. While lit, the candle sheds dim light in a 30-foot radius. Any creature within that light whose alignment matches that of the candle makes attack rolls, saving throws, and ability checks with advantage. In addition, a cleric or druid in the light whose alignment matches the candle's can cast 1st-level spells he or she has prepared without expending spell slots, though the spell's effect is as if cast with a 1st-level slot. Alternatively, when you light the candle for the first time, you can cast the gate spell with it. Doing so destroys the candle.",
      "Est. Value": "8,400. gp",
      "Name": "Candle of Invocation",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": "1/2 lb"
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "Two rings, user may opt to take damage for the other person wearing the ring",
      "Est. Value": "1,000. gp",
      "Name": "Companion Rings",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A crown of severed, mummified fingers. Each finger bears three jeweled rings.",
      "Est. Value": "2,200. gp",
      "Name": "Crown of Fingers",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "2 lbs."
    },
    {
      "Author": "",
      "Category": "Treasure",
      "Description": "A finely-crafted, clear crystal pyramid with no noticeable impurities.",
      "Est. Value": "",
      "Name": "Crystal Pyramid",
      "Properties": "If a creature focuses on the item for at least 30 seconds,  the creature sees a glimpse of a historical event in extraplanar history and takes 1d4 Int (psychic) damage. The image changes every 30 seconds of concentration and the creature takes 1d4 Int (psychic damage) for every event seen.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "asdf3011",
      "Category": "Wondrous Item",
      "Description": "Allows a blind user to see but at a cost. (will at random cause you to attack others)",
      "Est. Value": "",
      "Name": "Cursed Eye",
      "Properties": "May attack the player while not connected. (The player has to lack at least one eye) ",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A set of dark blue rings, which rotate freely against each other, but cannot be separated.",
      "Est. Value": "0. gp",
      "Name": "Dark Gemini Ring",
      "Properties": "Donning this ring will spawn a replica of you with inverse motivations. The replica will have dark blue eyes, and will seek to ruin you. The ring cannot come off as long as the clone survives, and you always know the direction of the clone.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Diamond is a hard clear gem which can be clear blue-white, rich blue, yelow or pink. The hardest of all the gemstones, and among the most valuable. Diamonds are usually found in northern mountains by underground races, and then traded to the surface world. ",
      "Est. Value": "5,000. gp",
      "Name": "Diamond",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/SPYROHAWK",
      "Category": "Wondrous Item",
      "Description": "These wooden donkey legs can be attached to anything  (but are not strong enough to carry literally anything).  Once attached, the thing will follow you around like a loyal donkey.  For example, you can attach them to a heavy statue and then have it walk itself out of the dungeon.  Donkey legs are as strong as two donkeys! ",
      "Est. Value": "",
      "Name": "Donkey Legs",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A thick shaft of wood with totemic carvings. It has a slight gradual spike shape, being thinner and sharper at one end, and thick and flat at the other.",
      "Est. Value": "1,500. gp",
      "Name": "Earthbreaker Totem",
      "Properties": "You may use your action to plant this into any reasonably soft ground. If the totem takes 15 bludgeoning damage (from being forcibly smashed deeper into the ground), it will trigger an earthquake, causing 4d12 thunder damage to all ground-bound targets within 200 feet. Constructs and buildings are considered vulnerable. Targets within 10 feet of the totem are unaffected.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "In the laboratory, vault, or home of the famed (and thought long dead) Eldhand the Scholar sits a small glass box. Across the lid is a grid of very tiny holes for air. The box contains a pink, slimy slug admidst some wet sawdust. A tag on the box reads “Eldhand.” The bug can be killed easily, like any slug. However, placing the slug near one's nose or mouth allows it to crawl up into the player's brain. The player will go into a coma for 3d4 hours and, upon awakening, will find that the voice of Eldhand the Scholar can be heard inside their head. He is quite sarcastic, pessimistic, and usually upset that someone so “pea-brained” ended up finding him. However, he can be convinced to give help in scholarly matters—granting the host +6 on all Knowledge Arcana, Knowledge History, and Spellcraft checks. He is reluctant to give out help unless you have proven yourself a more than worthy host. But he is generally willing to help in exchange for your player eating some odd or expensive food item (plums, goat cheese, and Ruby Port liquor tend to be his favorites).",
      "Est. Value": "0. gp",
      "Name": "Eldhand's Mind Slug",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/BardicFire",
      "Category": "Wondrous Item",
      "Description": "A large, unmarked blue tome. Every page inside is blank.",
      "Est. Value": "500. gp",
      "Name": "Encyclopedia Approximatus",
      "Properties": "Speak any subject to its spine and roll 1d4. On a 4, the reader is given a couple pages of accurate and detailed information on the subject (more accurate and detailed the most specific you are). All other rolls provides the user with approximate information, with regular errors. Regardless of accuracy, it's always written in a condescending tone.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Treasure",
      "Description": "A plain, heavy ring of dark metal. It seems occasionally heavy.",
      "Est. Value": "2,000. gp",
      "Name": "Fulcrum Ring",
      "Properties": "Mundane in most respects--except when pinched hard from the sides, it will refuse to move. It does not need to be worn for this to take effect.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Weapon",
      "Description": "A high quality, perfectly balanced gladius that is excessively comfortable to wield. The blade only seems to sharpen with use.",
      "Est. Value": "4,000. gp",
      "Name": "Gladiator's Prizeblade",
      "Properties": "1d8, +1 to hit. Whenever you kill a foe in combat, the blade gains an additional +1 slashing damage on a hit, up to 10 total bonus damage. If the wielder is reduced to 0 hit points, the blade dulls and loses its damage bonus in exchange for a -1 damage penalty. The bonus damage then accrues normally by slaying foes.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A jeweled gold crown of superb quality.",
      "Est. Value": "7,500. gp",
      "Name": "Gold Crown",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A solid gold jewelry box with a platinum filigree.",
      "Est. Value": "7,500. gp",
      "Name": "Gold Jewelry Box",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "5 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A small gold statuette of a man, set with rubies.",
      "Est. Value": "7,500. gp",
      "Name": "Gold Statuette",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A cloth tool-roll that contains six needles of varying thickness. A melody is embroidered on the inside of the roll.",
      "Est. Value": "500. gp",
      "Name": "Harkol's Agonizing Instruments",
      "Properties": "While humming the melody inscribed in the roll, the needles will move very slowly and very accurately according to the user's will. It would not be possible to cause bodily harm to an unrestrained creature by using these.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Armor",
      "Description": "A set of enhanced, heavenly armor. Powerful enough to protect and shield a hero on his journey through the the world, or even beyond the Gates of Hell itself. These armors are made for the most faithful and divine mortals and angels alike. While wearing this armor, you gain a +2 bonus to AC, you have advantage on all saving throws against effects caused by fiends, and it creates an aura in a 5-foot radius around you. Fiends in the aura have disadvantage on saving throws.",
      "Est. Value": "",
      "Name": "Heavenly Armor",
      "Properties": "Light, Medium or Heavy",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement Lawful Good",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A bejeweled ivory drinking horn with gold filigree.",
      "Est. Value": "7,500. gp",
      "Name": "Ivory Drinking Horn",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A transparent fiery orange gem variety of Zircon.",
      "Est. Value": "5,000. gp",
      "Name": "Jacinth",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "An ornate game board made of jade, with 40 solid gold playing pieces.",
      "Est. Value": "7,500. gp",
      "Name": "Jade Game Board",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "2 lb"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "King's Tears are very rare and are sometimes called frozen tears. Clear, teardrop-shaped, smooth surfaced, and totally unbreakable so far by any means. These stones are said to be the crystallized tears of long-dead necromancer kings. In each gem can be seen that which the weeping king loved long ago. Their true nature is unknown but suffice it to say that sages prize these gems above all others",
      "Est. Value": "5,000. gp",
      "Name": "King's Tears",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Armor",
      "Description": "Plain, but exceptionally clean chainmail that feels light, and always cold.",
      "Est. Value": "1,250. gp",
      "Name": "Links of Truth",
      "Properties": "Grants 13 AC +Dex. If the bearer tells a lie, the armor will fall into hundreds of metal rings. If the lie is redeemed, the armor will reassemble itself.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/BrainBlowX",
      "Category": "Wondrous Item",
      "Description": "A gold-rimmed cobalt locket inscribed with draconic runes. Inside is a small replaceable portrait.",
      "Est. Value": "1,250. gp",
      "Name": "Mother's Love",
      "Properties": "Requires attunement by someone of female sex. While wearing this magical item, the wearer gains the following benefits:  Whenever the wearer has to make a death saving throw, they can roll a 1d4 and add the rolled number to the total. This bonus is 1d4+2 if the wearer is pregnant.  The wearer can choose to turn a death saving throw roll into a critical success, but the locket's magic then fades for one full year. The locket can be restored if specifically targeted by a Greater Restoration spell after one month.  The wearer has advantage on Charisma-based skill checks and saving throws against individuals of early childhood.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Kokkusu",
      "Category": "Weapon",
      "Description": "A mysterious ornamental club hammer of dwarf origin, only someone with extensive knowledge of weapons or magic (Eg. Blacksmith, Enchanter, etc) can discover its true meaning.",
      "Est. Value": "2,700. gp",
      "Name": "Mysterious Dwarven Club Hammer",
      "Properties": "Glows when a mimic is near and occasionally at random. Instantly kills disguised mimics, forces undisguised mimics to return to hidden form. 1d3 Bludgeoning Damage.  [Before it is discovered what this item does, the PC knows that it does 1d3 Bludgeoning Damage and glows sometimes, other effects are still present yet the PC is not to be aware of them until true meaning is discovered]",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "4lb."
    },
    {
      "Author": "Fin Fen",
      "Category": "Wondrous Item",
      "Description": "This fiber necklace contains beads that separate several teeth from a variety of creatures. All together, it can support up to 7 teeth. ",
      "Est. Value": "5,000. gp",
      "Name": "Necklace of the Fang Pact",
      "Properties": "While wearing this amulet, you can use an action to sap the remaining essence from a creature that has been brought to 0 hit points. Doing so turns the creature's flesh into ash and forges its life force into a tooth appropriate for its type which magically binds itself to the amulet.  Each tooth has a type and a property. As a ritual, you can expend one tooth to gain its property for 24 hours or until a new ritual has been performed. Constructs, Oozes, and Plants are unaffected by this item. Undead whose essence you sap grant you a tooth with the type that it possessed in life rather than undeath.  *Aberrations: You can magically transmit simple messages and images to any creature within 120 ft. that can understand a Language. This form of telepathy doesn't allow the receiving creature to telepathically respond.  *Beasts: Your hit point maximum increases by an amount equal to twice your level.  *Celestials: As an action, you can touch a target and remove any curse, disease, poison, blindness, or deafness condition.  *Dragons: Your breath weapon gains a recharge of 6 and its damage die is increased to d8.  *Elemental: You choose acid, cold, fire, lightning, poison, or thunder and gain resistance to that element.  *Fey: Touching a creature, you magically know the creature's current emotional state. If the target fails a Charisma saving throw, you also know the creature's alignment. Celestials, Fiends, and Undead automatically fail the saving throw.  *Fiends: You gain advantage on saving throws against Spells and other magical effects.  *Giants: Your Strength score is 21. This property has no effect on you if your Strength is already 21 or higher without this necklace.  *Humanoids: You become proficient in any two skills. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.  *Monstrosities: You gain Darkvision 60 Ft. and Tremorsense 60 Ft. In addition, you gain a keen sense of hearing and smelling which grants you advantage on Wisdom (Perception) checks that rely on hearing or smell.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Potion",
      "Description": "A small pouch of tiny dry seeds that leave black soot on your fingers and smell of pungent incense.",
      "Est. Value": "350. gp",
      "Name": "Nevermore Seed",
      "Properties": "Throwing these seeds causes shadowy ravens to appear from thin air to invade a 15 ft area. The ravens create a cloud of inky soot that grants full cover to the affected area. The affected targets also take 2d6 damage at the beginning of each turn each turn inside the area. Lasts 1 minute, the pouch contains 5 handfuls.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "This is a small brass whistle, shaped like the head of a horse and stained with age. When the whistle is blown an extremely high-pitched note is emitted, summoning a magical steed that serves just like a Heavy Warhorse. It will stay until the whistle is blown again—at which time it unsummons. However, if the horse is slain, its body disappears, and the whistle will never emit a sound again.",
      "Est. Value": "4,600. gp",
      "Name": "Phamea's Pocket Steed",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Potion",
      "Description": "A thick, velvety flower petal of pastel pink and flecks of red. It leaves a fragrant, pleasant dust on your fingertips.",
      "Est. Value": "200. gp",
      "Name": "Pink Nayla Petal",
      "Properties": "Placing the petal over a wound causes it to meld with flesh, restoring half of the subject's maximum hit points. The recipient's skin color will permanently change to a pastel pink wherever this is applied.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A jeweled platinum ring.",
      "Est. Value": "7,500. gp",
      "Name": "Platinum Ring",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Potion",
      "Description": "A thick green potion in a small clear bottle. Closer examination reveals silver particles suspended in the liquid.",
      "Est. Value": "1000gp",
      "Name": "Potion of Lycanthropy Immunization",
      "Properties": "Drinking this potion will prevent you from being cursed with lycanthropy.  Effective for one day.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "D&D Wiki",
      "Category": "Potion",
      "Description": "Inside this strangely shaped vial swirls a blackish purple liquid. When used it will randomly and instantly teleport the user to a free spot up to 50 feet away. This includes through walls, into pits and between floors. However the potion will not work if you are otherwise prevented from teleporting either by Dimensional shackles or other by means.",
      "Est. Value": "",
      "Name": "Potion of Sudden Translocation",
      "Properties": "Teleport to a random spot up to 50 feet away. One use only.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Potion",
      "Description": "A large carry pouch made from the skin of a monkey. Inside are 1d6 Potions of Superior Healing. ",
      "Est. Value": "1,000. gp",
      "Name": "Pouch of Healing Potions",
      "Properties": "You regain 10d4 + 10 hit points when you drink this potion.  The potion's red liquid glimmers when agitated.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "1/2 lb"
    },
    {
      "Author": "asdf3011",
      "Category": "Weapon",
      "Description": "A gray powder that when thrown vastly increases speed and creates many small holes in the target",
      "Est. Value": "1,000. gp",
      "Name": "Powder of Piercing ",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "0-2"
    },
    {
      "Author": "Fin Fen",
      "Category": "Weapon",
      "Description": "'The handle was made of black leathers which connected two chains down to the head of a cylinder-shaped flail head. The head was like a cage that had interlocking strips of steel with spikes pointing outwards at every link. Inside, it contained a brilliant blue light that hummed which grew with intensity when spun.'",
      "Est. Value": "40,000. gp",
      "Name": "Remnant",
      "Properties": "You have a + 1 bonus to attack and damage rolls made with this magic weapon.  The Flail Head sheds dim light in a 10-foot radius.  When you roll a 20 on a weapon attack with Remnant, you may conjure forth a frost giant from a mist that flows out from the blue light in the head of this weapon. The creature appears in the same space you are in, using its height to leave the user room to move. If he cannot fit in the space, the creature refuses to be summoned.  After your turn ends, The creature immediately takes it's initiative. The creature hears what commands you have, but acts on it's own and is capable of making it's own decisions. After it's turn is over, the creature remains until the start of your next turn before returning to mist and binding itself to Remnant once more. Once this ability is used, it cannot be used again until you complete a short rest.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": "4 lb"
    },
    {
      "Author": "BGII",
      "Category": "Treasure",
      "Description": "A small, shifting, rainbow coloured, irridecent gemstone. The fluid shades of colour appear almost liquid under normal sunlight, it is truly a beautiful sight to behold. Rogue stones are extremely rare and are used for the gemjump spell, hence one of the most sought after gems in the Realms. ",
      "Est. Value": "5,000. gp",
      "Name": "Rogue Stone",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "Ruby is a pink to blood-red colored gemstone, a variety of the mineral corundum.",
      "Est. Value": "5,000. gp",
      "Name": "Ruby",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A painted gold child's sarcophagus. It is empty, but itself valuable.",
      "Est. Value": "7,500. gp",
      "Name": "Sarcophagus",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "50 lb"
    },
    {
      "Author": "DMG",
      "Category": "Treasure",
      "Description": "A set of golden cups, each set with emeralds.",
      "Est. Value": "7,500. gp",
      "Name": "Set of Golden Cups",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "6 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Weapon",
      "Description": "A knotted and well-worn walking stick with living vines that grow from it. There are druidic symbols for everlasting life etched near the handle.",
      "Est. Value": "2,500. gp",
      "Name": "Staff of the Verdant Grove",
      "Properties": "1d6. The vines that grow from the staff will aid the wielder, allowing you to grapple a target with a 10 foot reach, with a +4 bonus. You may also lash a target with the vines, like a whip (you don't need proficiency), dealing 1d6 damage at 10 feet. The staff increases the prosperity of plant life within 25 feet by twenty fold.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "Jeff C",
      "Category": "Weapon",
      "Description": "A dull, rather drab looking rapier inhabited with the intelligence of a hyper-particular grammarian.",
      "Est. Value": "",
      "Name": "Stern Sword of Grammar Correction",
      "Properties": "Acts as a +1 sword vs any creature speaking with poor grammar construction. On a successful hit, the creature must save or begin using immaculate grammar (spelling gets a bump too), after which the sword attacks the creature as a mundane weapon. Shocks the wielder for 1 hp damage each time he or she uses poor grammar.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A carved, thumb-width stick of great sturdiness. Holding it fills you with a furious urge to break it.",
      "Est. Value": "500. gp",
      "Name": "Stick of Rage",
      "Properties": "Holding this stick fills you with an insurmountable urge to try to break it. You must use your action and make a DC 22 Strength check to attempt to break it. If you fail, you throw the stick 20 feet in a random direction. If you succeed, your strength score becomes 20 for 24 hours, and you enter a Rage, as the Barbarian trait.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "A set of two Chakrams, one copper and the other bronze, both wrapped with old leather handles. Each deals 1d6 damage and an additional +2 Fire damage, when either thrown or swung in melee. If a Chakram is thrown and hits, it returns to the thrower's hand by magical means. Treated as an exotic weapon. 1.5lbs each",
      "Est. Value": "2,300. gp",
      "Name": "Sunfire Chakrams",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "3 lb"
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "This is a bag of shurikens, made of flat bronze blades with a large copper ball set in the center. They are very heavy, and suffer a -2 to attack rolls. However, once they are thrown, they explode upon touching anything substantial and deal 4d6 Fire damage within 10 feet. Survivors within 20 feet are deafened for 1d6 rounds. 0.5lb each",
      "Est. Value": "600. gp",
      "Name": "Sunfire Shurikens",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "1 lb"
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Wondrous Item",
      "Description": "A heavy, simple platinum torch that will not ignite under normal circumstances.",
      "Est. Value": "8,000. gp",
      "Name": "The Blaze of Glory",
      "Properties": "A willing creature holding this item may choose to ignite it at will. When you do, you are consumed by a brilliant white flame and you lose all of your remaining hit points, and then suffer damage equal to your maximum hit points. Up to 3 targets within 50 feet each take radiant damage equal to 1d10 damage per character level that you have, plus half of your maximum hit points, or half that amount on a successful Dexterity save (DC17). The torch becomes mundane after this effect takes place.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Armor",
      "Description": "A circular shield with an amber edge, and covered in a lustrous, gold-colored metal. On the face of the shield is a depiction of a man destroying a dragon while the dragon destroys the man, as in an ouroboros.",
      "Est. Value": "1,500. gp",
      "Name": "The Olm Shield",
      "Properties": "Grants +2 AC when equipped. While carried, it grants immunity to fear effects, and you have advantage on Charisma skill checks to inspire others. If the shield is struck with Dragonfire, the bearer is enveloped with amber scales, grants resistance to fire damage, increases size by 1 category, and grants a fly speed of 60 for as long as you remain in combat.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/gimme_some_sunshine",
      "Category": "Weapon",
      "Description": "Obviously mystical arrows of superior make. They have a metallic shaft etched with elegant marks of clouds and storms, and always glow with a pale shimmer. The markings occasionally gleam with bright light. A full set is 13 arrows or bolts.",
      "Est. Value": "150. gp",
      "Name": "Thunderhead Bolts",
      "Properties": "Whether inside or outdoors, these arrows grant +1 to attack as long as the sky is not clear. A full round after an arrow is launched, a bolt of lightning will strike the arrow, dealing 4d12 lightning damage to anything in its space. You must be outside on a clouded day for the latter effect to occur.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "/u/LittleDizzleDaGusha",
      "Category": "",
      "Description": "This extremely tiny Beholder creature has wings in addition to its ten eyed tentacles. It is made of delicate glass that is finely stained. Any arcane spellcaster can activate it, as can any creature that succeeds on a DC 20 Use Magic Device skill check. When activated, it will come to life in all respects—except that it is tethered to the mind of the activator. It cannot attack, move objects, or affect the physical setting in any way. However, it can fly up to 100 ft away at a speed of 10 ft per round. The activator can now see as though their head were the eye, and can ONLY see what the eye would see. This means the original PC is temporarily “blinded.” The eye can be deactived at any time from any distance within 100 ft. However, as soon as it is deactived, it turns back to delicate glass—wherever it was. Thus deactivating it before flying it back is not recommended.",
      "Est. Value": "6,400. gp",
      "Name": "Winged Eye",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Uberbeard",
      "Category": "Trap",
      "Description": "A simple white pearlescent ring. Curse: Lose 1d4 max health once per day. The effect stacks each day. Once worn, this ring cannot be removed. Any attempt to remove the ring sees it reappear after a few seconds. Any attempt to circumvent the curse by removing the ring finger sees it appear on a different finger. If the wearer removes every finger, the curse ends. Should they fail to get the curse removed before their health falls below 0 they become an undead thrall.",
      "Est. Value": "0. gp",
      "Name": "Zoltar's Pearlescent Ring",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "DOTA2",
      "Category": "Wondrous Item",
      "Description": "This axe appears to be like any other felling axe, but when used it will unerringly cut down any tree with one swing. Its formidable weight and uneven balancing make it a slow, inefficient weapon.",
      "Est. Value": "7,000. gp",
      "Name": "Quelling Axe",
      "Properties": "1d10 Slashing - Martial - Heavy, Two-Handed",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "Requires Attunement",
      "Weight": "10 lb"
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "Re-animation bomb",
      "Est. Value": "",
      "Name": "Reanimation Bomb",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Wondrous Item",
      "Description": "A miniature model of a pyramid, which glows a faint blue. If a deceased creature of Diminutive or Fine size is placed beneath the pyramid, they will be reincarnated in 1d20 hours. The pyramid can manifest this ability once per lunar month.",
      "Est. Value": "",
      "Name": "Pyramid Model",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": ""
    },
    {
      "Author": "",
      "Category": "Ring",
      "Description": "Ring of Sustenance – require no food/water/rations",
      "Est. Value": "",
      "Name": "Ring of Sustenance",
      "Properties": "",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "n/a"
    },
    {
      "Author": "Rutin75",
      "Category": "Wondrous Item",
      "Description": "A tall mirror in ornate silvery frame with perfectly reflecting surface. The ornaments depicting faceless humanoids locked in battle. ",
      "Est. Value": "15,000. gp",
      "Name": "Psyche of Strife",
      "Properties": "Anyone who looks into the mirror will see their own perfect reflection. However, when the first character takes a glimpse on someone else's image, they will see a horrifying visage of a powerful monster (lich, mind flayer, etc.), likely to be found in the complex where the Psyche is located. This effect is commanded by a demonic intelligence imprisoned in the shiny surface, and will occur in a manner to cause maximum confusion, mistrust and likely infighting to bands of adventurers. It's very easy to shatter the mirror, however all the fragments will have the same tendency to occasionally show your best friend as a rotting undead - only to you.",
      "Rarity": "Very Rare",
      "Rarity Number": "5",
      "Requirements": "",
      "Weight": "70 lb"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Arcane Gate spell.",
      "Name": "Arcane Gate Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Blade Barrier spell.",
      "Name": "Blade Barrier Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Bones of the Earth spell.",
      "Name": "Bones of the Earth Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Chain Lightning spell.",
      "Name": "Chain Lightning Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Circle of Death spell.",
      "Name": "Circle of Death Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Conjure Fey spell.",
      "Name": "Conjure Fey Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Contingency spell.",
      "Name": "Contingency Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Create Homunculus spell.",
      "Name": "Create Homunculus Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Create Undead spell.",
      "Name": "Create Undead Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Disintegrate spell.",
      "Name": "Disintegrate Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Drawmij's Instant Summons spell.",
      "Name": "Drawmij's Instant Summons Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Druid Grove spell.",
      "Name": "Druid Grove Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Eyebite spell.",
      "Name": "Eyebite Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Find the Path spell.",
      "Name": "Find the Path Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Flesh to Stone spell.",
      "Name": "Flesh to Stone Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Forbiddance spell.",
      "Name": "Forbiddance Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Globe of Invulnerability spell.",
      "Name": "Globe of Invulnerability Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Guards and Wards spell.",
      "Name": "Guards and Wards Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Harm spell.",
      "Name": "Harm Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Heal spell.",
      "Name": "Heal Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Heroes' Feast spell.",
      "Name": "Heroes' Feast Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Investiture of Flame spell.",
      "Name": "Investiture of Flame Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Investiture of Ice spell.",
      "Name": "Investiture of Ice Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Investiture of Stone spell.",
      "Name": "Investiture of Stone Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Investiture of Wind spell.",
      "Name": "Investiture of Wind Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Magic Jar spell.",
      "Name": "Magic Jar Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mass Suggestion spell.",
      "Name": "Mass Suggestion Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mental Prison spell.",
      "Name": "Mental Prison Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Move Earth spell.",
      "Name": "Move Earth Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Otiluke's Freezing Sphere spell.",
      "Name": "Otiluke's Freezing Sphere Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Otto's Irresistible Dance spell.",
      "Name": "Otto's Irresistible Dance Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Planar Ally spell.",
      "Name": "Planar Ally Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Primordial Ward spell.",
      "Name": "Primordial Ward Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Programmed Illusion spell.",
      "Name": "Programmed Illusion Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Scatter spell.",
      "Name": "Scatter Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Soul Cage spell.",
      "Name": "Soul Cage Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Sunbeam spell.",
      "Name": "Sunbeam Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Tenser's Transformation spell.",
      "Name": "Tenser's Transformation Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Transport via Plants spell.",
      "Name": "Transport via Plants Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the True Seeing spell.",
      "Name": "True Seeing Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wall of Ice spell.",
      "Name": "Wall of Ice Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wall of Thorns spell.",
      "Name": "Wall of Thorns Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Wind Walk spell.",
      "Name": "Wind Walk Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Word of Recall spell.",
      "Name": "Word of Recall Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Conjure Celestial spell.",
      "Name": "Conjure Celestial Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Crown of Stars spell.",
      "Name": "Crown of Stars Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Delayed Blast Fireball spell.",
      "Name": "Delayed Blast Fireball Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Divine Word spell.",
      "Name": "Divine Word Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Etherealness spell.",
      "Name": "Etherealness Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Finger of Death spell.",
      "Name": "Finger of Death Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Fire Storm spell.",
      "Name": "Fire Storm Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Forcecage spell.",
      "Name": "Forcecage Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mirage Arcane spell.",
      "Name": "Mirage Arcane Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mordenkainen's Magnificent Mansion spell.",
      "Name": "Mordenkainen's Magnificent Mansion Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Mordenkainen's Sword spell.",
      "Name": "Mordenkainen's Sword Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Plane Shift spell.",
      "Name": "Plane Shift Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Power Word Pain spell.",
      "Name": "Power Word Pain Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Prismatic Spray spell.",
      "Name": "Prismatic Spray Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Project Image spell.",
      "Name": "Project Image Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Regenerate spell.",
      "Name": "Regenerate Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Resurrection spell.",
      "Name": "Resurrection Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Reverse Gravity spell.",
      "Name": "Reverse Gravity Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Sequester spell.",
      "Name": "Sequester Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Simulacrum spell.",
      "Name": "Simulacrum Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Symbol spell.",
      "Name": "Symbol Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Teleport spell.",
      "Name": "Teleport Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Temple of the Gods spell.",
      "Name": "Temple of the Gods Spell Scroll",
      "Rarity": "Very Rare"
    },
    {
      "Category": "Scroll",
      "Description": "A scroll with the Whirlwind spell.",
      "Name": "Whirlwind Spell Scroll",
      "Rarity": "Very Rare"
    }
  ]
};

var RitualSpells = [{
	Name: "Alarm",
	Level: "1"
},
{
	Name: "Ceremony",
	Level: "1"
},
{
	Name: "Comprehend Languages",
	Level: "1"
},
{
	Name: "Detect Magic",
	Level: "1"
},
{
	Name: "Detect Poison and Disease",
	Level: "1"
},
{
	Name: "Find Familiar",
	Level: "1"
},
{
	Name: "Identify",
	Level: "1"
},
{
	Name: "Illusory Script",
	Level: "1"
},
{
	Name: "Purify Food and Drink",
	Level: "1"
},
{
	Name: "Speak with Animals",
	Level: "1"
},
{
	Name: "Tenser's Floating Disk",
	Level: "1"
},
{
	Name: "Unseen Servant",
	Level: "1"
},
{
	Name: "Animal Messenger",
	Level: "2"
},
{
	Name: "Augury",
	Level: "2"
},
{
	Name: "Beast Sense",
	Level: "2"
},
{
	Name: "Gentle Repose",
	Level: "2"
},
{
	Name: "Locate Animals or Plants",
	Level: "2"
},
{
	Name: "Magic Mouth",
	Level: "2"
},
{
	Name: "Silence",
	Level: "2"
},
{
	Name: "Skywrite",
	Level: "2"
},
{
	Name: "Feign Death",
	Level: "3"
},
{
	Name: "Leomund's Tiny Hut",
	Level: "3"
},
{
	Name: "Meld into Stone",
	Level: "3"
},
{
	Name: "Phantom Steed",
	Level: "3"
},
{
	Name: "Water Breathing",
	Level: "3"
},
{
	Name: "Water Walk",
	Level: "3"
},
{
	Name: "Divination",
	Level: "4"
},
{
	Name: "Commune",
	Level: "5"
},
{
	Name: "Commune with Nature",
	Level: "5"
},
{
	Name: "Contact Other Plane",
	Level: "5"
},
{
	Name: "Rary's Telepathic Bond",
	Level: "5"
},
{
	Name: "Drawmij's Instant Summons",
	Level: "6"
},
{
	Name: "Forbiddance",
	Level: "6"
}]