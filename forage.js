var GetForageTerrains = function() {
	return [
		"Arctic",
		"Coastal",
		"Desert",
		"Forest",
		"Jungle",
		"Grassland",
		"Hills",
		"Mountains",
		"Extreme Mountains",
		"Swamp",
		"Underdark"
	];
};

var GetForage = function(type, terrain, checkValue, modifier) {
    switch (type) {
    case "Food":
    	return GetForageFood(terrain, checkValue, modifier);
    case "Water":
    	return GetForageWater(terrain, checkValue, modifier);
    case "Herbs":
    	return GetForageHerbs(terrain, checkValue, modifier);
    }
    return "";
};

var GetForageFood = function(terrain, checkValue, modifier) {
	var amountGathered = 0;
	switch (terrain) {
	case "Arctic":
		amountGathered += checkValue - 15;
		break;
	case "Coastal":
		amountGathered += checkValue - 10;
		break;
	case "Desert":
		amountGathered += checkValue - 18;
		break;
	case "Forest":
		amountGathered += checkValue - 10;
		break;
	case "Jungle":
		amountGathered += checkValue - 13;
		break;
	case "Grassland":
		amountGathered += checkValue - 10;
		break;
	case "Hills":
		amountGathered += checkValue - 13;
		break;
	case "Mountains":
		amountGathered += checkValue - 15;
		break;
	case "Extreme Mountains":
		amountGathered += checkValue - 18;
		break;
	case "Swamp":
		amountGathered += checkValue - 13;
		break;
	case "Underdark":
		amountGathered += checkValue - 15;
		break;
	}

	amountGathered += Roll(1,3);

	var gathered = {
		"Raw Meat": 0,
		"Nuts and Berries": 0
	};
	while (amountGathered > 0) {
		if (Math.random() > 0.35) {
			gathered["Raw Meat"]++;
		} else {
			gathered["Nuts and Berries"]++;
		}
		amountGathered--;
	}
	var s = "You found ";
	if (gathered["Raw Meat"] > 0) {
		s += gathered["Raw Meat"] + " lbs of raw meat";
	}
	if (gathered["Nuts and Berries"] > 0) {
		if (s !== "You found ") {
			s += " and ";
		}
		s += gathered["Nuts and Berries"] + " lbs of nuts and berries";
	}
	if (s === "You found ") {
		s += "nothing.";
	}
	return s + ".";
};

var GetForageWater = function(terrain, checkValue, modifier) {
	var amountGathered = 0;
	switch (terrain) {
	case "Arctic":
		amountGathered += checkValue - 13;
		break;
	case "Coastal":
		amountGathered += checkValue - 15;
		break;
	case "Desert":
		amountGathered += checkValue - 20;
		break;
	case "Forest":
		amountGathered += checkValue - 10;
		break;
	case "Jungle":
		amountGathered += checkValue - 10;
		break;
	case "Grassland":
		amountGathered += checkValue - 10;
		break;
	case "Hills":
		amountGathered += checkValue - 13;
		break;
	case "Mountains":
		amountGathered += checkValue - 15;
		break;
	case "Extreme Mountains":
		amountGathered += checkValue - 18;
		break;
	case "Swamp":
		amountGathered += checkValue - 13;
		break;
	case "Underdark":
		amountGathered += checkValue - 15;
		break;
	}

	amountGathered += Roll(1,4);

	var gathered = {
		"Clean Water": 0,
		"Pond/Puddle": 0,
		"Swamp/Brackish": 0
	};
	while (amountGathered > 0) {
		var rand;
		switch (terrain) {
		case "Arctic":
			rand = Math.random();
			if (rand >= 0.55) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.05) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Coastal":
			rand = Math.random();
			if (rand >= 0.9) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.6) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Desert":
			rand = Math.random();
			if (rand >= 0.98) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.75) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Forest":
			rand = Math.random();
			if (rand >= 0.75) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.1) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Jungle":
			rand = Math.random();
			if (rand >= 0.9) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.25) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Grassland":
			rand = Math.random();
			if (rand >= 0.85) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.1) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Hills":
			rand = Math.random();
			if (rand >= 0.7) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.05) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Mountains":
			rand = Math.random();
			if (rand >= 0.6) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.04) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Extreme Mountains":
			rand = Math.random();
			if (rand >= 0.5) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.03) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Swamp":
			rand = Math.random();
			if (rand >= 0.98) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.85) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		case "Underdark":
			rand = Math.random();
			if (rand >= 0.95) {
				gathered["Clean Water"]++;
			} else if (rand >= 0.2) {
				gathered["Pond/Puddle"]++;
			} else {
				gathered["Swamp/Brackish"]++;
			}
			break;
		}
		amountGathered--;
	}
	var s = "You found ";
	if (gathered["Clean Water"] > 0) {
		s += gathered["Clean Water"] + " gallons of clean water";
	}
	if (gathered["Pond/Puddle"] > 0) {
		if (s !== "You found ") {
			s += " and ";
		}
		s += gathered["Pond/Puddle"] + " gallons of pond/puddle water";
	}
	if (gathered["Swamp/Brackish"] > 0) {
		if (s !== "You found ") {
			s += " and ";
		}
		s += gathered["Swamp/Brackish"] + " gallons of swamp/brackish water";
	}
	if (s === "You found ") {
		s += "nothing";
	}
	return s + ".";
};

var GetForageHerbs = function(terrain, checkValue, modifier) {
	var amountGathered = 0;
	if (checkValue < 15) {
		amountGathered = Math.max(0, checkValue - 15 + Roll(1,3));
	} else {
		amountGathered = Math.max(0, Math.floor((checkValue - 15) / 3) + Roll(1,3));
	}
	console.log(amountGathered);
	gathered = [];
	while (gathered.length < amountGathered) {
		gathered = gathered.concat(ChooseRandomHerb(terrain));
	}
	gathered.sort();
	s = "You find<ul><li>";
	s += gathered.join("</li><li>");
	return s + "</li></ul>";
};

var ChooseRandomHerb = function(terrain) {
	var herbs = [];
	var rand = Roll(2,6);
	switch (terrain) {
	case "Arctic":
		if (rand <= 2) {
			return "Silver Hibiscus";
		} else if (rand <= 3) {
			return "Mortflesh Powder";
		} else if (rand <= 4) {
			return "Ironwood Heart";
		} else if (rand <= 5) {
			return "Frozen Seedlings";
		} else if (rand <= 8) {
			return ChooseRandomHerb("Common");
		} else if (rand <= 9) {
			return "Arctic Creeper";
		} else if (rand <= 10) {
			return "Fennel Silk";
		} else if (rand <= 11) {
			return "Fiend's Ivy";
		} else {
			return "Voidroot";
		}
		break;
	case "Coastal":
		if (rand <= 2) {
			return "Hydrathistle";
		} else if (rand <= 3) {
			return "Amanita Cap";
		} else if (rand <= 4) {
			return "Hyancinth Nectar";
		} else if (rand <= 5) {
			return "Chromus Slime";
		} else if (rand <= 8) {
			return ChooseRandomHerb("Common");
		} else if (rand <= 9) {
			return "Lavender Sprig";
		} else if (rand <= 10) {
			return "Blue Toadshade";
		} else if (rand <= 11) {
			return "Wrackwort Bulbs";
		} else {
			return "Cosmos Glond";
		}
		break;
	case "Desert":
		if (rand <= 2) {
			return "Cosmos Glond";
		} else if (rand <= 3) {
			return "Arrow Root";
		} else if (rand <= 4) {
			return "Dried Ephedra";
		} else if (rand <= 5) {
			return "Cactus Juice";
		} else if (rand <= 8) {
			return ChooseRandomHerb("Common");
		} else if (rand <= 9) {
			return "Drakus Flower";
		} else if (rand <= 10) {
			return "Scillia Beans";
		} else if (rand <= 11) {
			return "Spineflower Berries";
		} else {
			return "Voidroot";
		}
		break;
	case "Forest":
		if (rand <= 2) {
			return "Harrada Leaf";
		} else if (rand <= 3) {
			return "Nightshade Berrries";
		} else if (rand <= 4) {
			return "Emetic Wax";
		} else if (rand <= 5) {
			return "Verdant Nettle";
		} else if (rand <= 8) {
			return ChooseRandomHerb("Common");
		} else if (rand <= 9) {
			return "Arrow Root";
		} else if (rand <= 10) {
			return "Ironwood Heart";
		} else if (rand <= 11) {
			return "Blue Toadshade";
		} else {
			return "Wisp Stalks";
		}
		break;
	case "Grassland":
		if (rand <= 2) {
			return "Harrada Leaf";
		} else if (rand <= 3) {
			return "Drakus Flower";
		} else if (rand <= 4) {
			return "Lavender Sprig";
		} else if (rand <= 5) {
			return "Arrow Root";
		} else if (rand <= 8) {
			return ChooseRandomHerb("Common");
		} else if (rand <= 9) {
			return "Scillia Beans";
		} else if (rand <= 10) {
			return "Cactus Juice";
		} else if (rand <= 11) {
			return "Tail Leaf";
		} else {
			return "Hyancinth Nectar";
		}
		break;
	case "Hills":
		if (rand <= 2) {
			return "Devil's Bloodleaf";
		} else if (rand <= 3) {
			return "Nightshade Berries";
		} else if (rand <= 4) {
			return "Tail Leaf";
		} else if (rand <= 5) {
			return "Lavender Sprig";
		} else if (rand <= 8) {
			return ChooseRandomHerb("Common");
		} else if (rand <= 9) {
			return "Ironwood Heart";
		} else if (rand <= 10) {
			return "Gengko Brush";
		} else if (rand <= 11) {
			return "Rock Vine";
		} else {
			return "Harrada Leaf";
		}
		break;
	case "Mountains":
	case "Extreme Mountains":
		if (rand <= 2) {
			return "Basilisk's Breath";
		} else if (rand <= 3) {
			return "Frozen Seedlings";
		} else if (rand <= 4) {
			return "Arctic Creeper";
		} else if (rand <= 5) {
			return "Dried Ephedra";
		} else if (rand <= 8) {
			return ChooseRandomHerb("Common");
		} else if (rand <= 9) {
			return "Drakus Flower";
		} else if (rand <= 10) {
			return "Luminous Cap Dust";
		} else if (rand <= 11) {
			return "Rock Vine";
		} else {
			return "Primordial Balm";
		}
		break;
	case "Jungle":
	case "Swamp":
		if (rand <= 2) {
			return "Devil's Bloodleaf";
		} else if (rand <= 3) {
			return "Spineflower Berries";
		} else if (rand <= 4) {
			return "Emetic Wax";
		} else if (rand <= 5) {
			return "Amanita Cap";
		} else if (rand <= 8) {
			return ChooseRandomHerb("Common");
		} else if (rand <= 9) {
			return "Blue Toadshade";
		} else if (rand <= 10) {
			return "Wrackwort Bulb";
		} else if (rand <= 11) {
			return "Hydrathistle";
		} else {
			return "Primordial Balm";
		}
		break;
	case "Underdark":
		if (rand <= 2) {
			return "Primordial Balm";
		} else if (rand <= 3) {
			return "Silver Hibiscus";
		} else if (rand <= 4) {
			return "Devil's Bloodleaf";
		} else if (rand <= 5) {
			return "Chromus Slime";
		} else if (rand <= 6) {
			return "Mortflesh Powder";
		} else if (rand <= 7) {
			return "Fennel Silk";
		} else if (rand <= 8) {
			return "Fiend's Ivy";
		} else if (rand <= 9) {
			return "Gengko Brush";
		} else if (rand <= 10) {
			return "Luminous Cap Dust";
		} else if (rand <= 11) {
			return "Radiant Synthseed";
		} else {
			return "Wisp Stalks";
		}
		break;
	case "Common":
		if (rand <= 2) {
			return "Mandrake Root";
		} else if (rand <= 3) {
			return "Quicksilver Lichen";
		} else if (rand <= 4) {
			return "Quicksilver Lichen";
		} else if (rand <= 5) {
			return "Wild Sageroot";
		} else if (rand <= 6) {
			return "Wild Sageroot";
		} else if (rand <= 7) {
			return "Bloodgrass";
		} else if (rand <= 8) {
			return "Wyrmtongue Petals";
		} else if (rand <= 9) {
			return "Wyrmtongue Petals";
		} else if (rand <= 10) {
			return "Milkweed Seeds";
		} else if (rand <= 11) {
			return "Milkweed Seeds";
		} else {
			return "Mandrake Root";
		}
		break;
	}
	return herbs;
};