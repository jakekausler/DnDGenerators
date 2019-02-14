var GetShopTypes = function() {
	return [
		"Alcohol and Refreshments",
		"Animals",
		"Books and Maps",
		"Flowers and Seeds",
		"Food and Animal Parts",
		"Furniture and Interior Decor",
		"High Fashion",
		"Jewelry and Gems",
		"Knick-Knacks",
		"Leatherworking",
		"Mechanical Contraptions",
		"Medium and Heavy Armor and Shields",
		"Potions, Poisons, and Herbs",
		"Religious Idols and Blessings",
		"Songs and Instruments",
		"Spell Tomes and Scrolls",
		"Thieving Supplies",
		"Tools",
		"Vehicles and Transportation",
		"Weapons",
		"Astral Traveller",
		"Enchantments",
		"Fey Bargins",
		"Magic Items",
		"Magical Creatures",
		"Necromancy",
		"Needful Things",
		"Time-Lost"
	];
};

var isLegendary = function(type) {
	return [
		"Astral Traveller",
		"Enchantments",
		"Fey Bargins",
		"Magic Items",
		"Magical Creatures",
		"Necromancy",
		"Needful Things",
		"Time-Lost"
	].includes(type);
};

var GetShopLocations = function() {
	return [
		"Remote",
		"Rural",
		"Urban",
		"Major"
	];
};

var GetShopQualities = function() {
	return [
		"Atrocious",
		"Poor",
		"Medium",
		"Good",
		"Excellent"
	];
};

var GetShop = function(useSeed, name, type, location) {
	var quality = GetQuality(useSeed, name, type, location);
	var shop = {
		Name: name,
		MoneyOnHand: GetMoneyOnHand(useSeed, name, type, location, quality),
		Type: type,
		Quality: quality,
		Inventory: GetInventory(useSeed, name, type, location, quality).sort(function(a, b) {
			return a.Name.localeCompare(b.Name);
		})
	};
	return shop;
};

var GetMoneyOnHand = function(useSeed, name, type, location, quality) {
	if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
	var money = Roll(1,10);
	switch (quality) {
	case "Atrocious":
		money *= Math.floor(Math.round(20 * ((Math.random() * 0.3) + 0.85) * 100) / 100);
		break;
	case "Poor":
		money *= Math.floor(Math.round(50 * ((Math.random() * 0.3) + 0.85) * 100) / 100);
		break;
	case "Medium":
		money *= Math.floor(Math.round(100 * ((Math.random() * 0.3) + 0.85) * 100) / 100);
		break;
	case "Good":
		money *= Math.floor(Math.round(250 * ((Math.random() * 0.3) + 0.85) * 100) / 100);
		break;
	case "Excellent":
		money *= Math.floor(Math.round(500 * ((Math.random() * 0.3) + 0.85) * 100) / 100);
		break;
	}
	return money;
};

var GetQuality = function(useSeed, name, type, location) {
	if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
	var quality = "";
	var rand = Roll(1,100);
	if (isLegendary(type)) {
		if (rand <= 30) {
			quality = GetShopQualities()[2];
		} else if (rand <= 85) {
			quality = GetShopQualities()[3];
		} else {
			quality = GetShopQualities()[4];
		}
	} else {
		switch (location) {
		case "Remote":
			if (rand <= 20) {
				quality = GetShopQualities()[0];
			} else if (rand <= 40) {
				quality = GetShopQualities()[1];
			} else if (rand <= 30) {
				quality = GetShopQualities()[2];
			} else {
				quality = GetShopQualities()[3];
			}
			break;
		case "Rural":
			if (rand <= 20) {
				quality = GetShopQualities()[0];
			} else if (rand <= 55) {
				quality = GetShopQualities()[1];
			} else {
				quality = GetShopQualities()[2];
			}
			break;
		case "Urban":
			if (rand <= 20) {
				quality = GetShopQualities()[0];
			} else if (rand <= 55) {
				quality = GetShopQualities()[1];
			} else if (rand <= 75) {
				quality = GetShopQualities()[2];
			} else if (rand <= 90) {
				quality = GetShopQualities()[3];
			} else {
				quality = GetShopQualities()[4];
			}
			break;
		case "Major":
			if (rand <= 15) {
				quality = GetShopQualities()[0];
			} else if (rand <= 35) {
				quality = GetShopQualities()[1];
			} else if (rand <= 60) {
				quality = GetShopQualities()[2];
			} else if (rand <= 85) {
				quality = GetShopQualities()[3];
			} else {
				quality = GetShopQualities()[4];
			}
			break;
		}
	}
	return quality;
};

var GetInventory = function(useSeed, name, type, location, quality) {
	if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
	var inventory = ShopGenerators[type](useSeed, name, type, location, quality);
	return inventory;
};

var MinorEnchantments = [
	"Beacon. Bonus action: Item sheds bright light in 10-foot radius, dim light for additional 10 feet. May extinguish with another bonus action.",
	"Compass. Action: Learn which way is north.",
	"Gleaming. This item never gets dirty.",
	"Guardian. Grants a +2 bonus to initiative.",
	"Language. This item grants knowledge of a specific language chosen by the DM.",
	"Sentinel. Item glows when within 120 feet of a specific type of creature chosen by the DM.",
	"Unbreakable. This item can only be broken by special means.",
	"Waterborne. Item can float in liquid, grants Advantage on checks to swim."
];

var MajorEnchantments = [
	"Transforming. Action: Item changes into another item of the same type. A sword may turn into a different sword, or a pair of boots may turn into shoes.",
	"Spider-Touched. Grants a climb speed equal to your movement speed.",
	"Unseen. Item is permanently invisible.",
	"Fleet. Grants a +10 foot bonus to movement speed.",
	"Flight. Action: Gain a flight speed equal to your movement speed until the end of your turn.",
	"Glibness. Action: Gain advantage on all Charisma checks made within the next minute. Refreshes with long rest.",
	"Night-Eye. Grants darkvision out to 60 feet, or increases it by 60 feet.",
	"Warding. Reaction: Gain advantage on a saving throw. Short rest refresh."
];

var LegendaryEnchantments = [
	"Fearful. Bonus action: Adjacent creature must make a DC 15 Wisdom saving throw or be frightened of you until the end of your next turn. Short rest refresh.",
	"Teleport. Bonus action: Teleport up to 15 feet in any direction.",
	"Silent. Grants a +10 bonus to Stealth.",
	"Lucky. Can add 1d10 to any check, save, or attack. Short rest refresh.",
	"Wall-Walker. Bonus action: Can pass through solid objects until end of turn, which ejects you. Short rest refresh.",
	"Vitality. Grants immunity to disease, poisons, and poison damage.",
	"True-Seeing. Grants truesight out to 60 feet, or increases it by 60 feet.",
	"Fortitude. Increases your hit point maximum by 15"
];

var RandomEnchantment = function(type) {
	var rand = Roll(1,8);
	switch (type) {
		case "Minor":
			return randomChoice(MinorEnchantments);
		case "Major":
			return randomChoice(MajorEnchantments);
		case "Legendary":
			return randomChoice(LegendaryEnchantments);
	}
};

var GeaList = [
	"Give your first-born child to the merchant.",
	"Slay a particular fey, bring the merchant their head.",
	"Play a harmless trick on a specific powerful ruler.",
	"Fake your own death, and assume a new identity.",
	"Give the merchant 1d4 of your happiest memories.",
	"Steal a specific powerful item for the merchant.",
	"Give the merchant a syllable of your name.",
	"Never touch iron, or take 10d10 radiant damage.",
	"Live as a fey hunting-dog for seven days.",
	"Become permanently charmed by the merchant.",
	"Trade the merchant a simple lock of your hair.",
	"Bring the merchant a specific child, not your own.",
	"Tell the merchant your single darkest secret.",
	"Betray your friends in a specific way.",
	"Drink a mysterious potion the merchant offers you.",
	"You can speak only in rhyme for the next seven days.",
	"Lose proficiency in one instrument or artisan's tools.",
	"Trade an aspect of your beauty to the merchant.",
	"Lose a specific, unmentioned, item on your person.",
	"If you use a specific word, a nearby object breaks."
];

var GetGeas = function(n=1) {
	var rand;
	var geas = [];
	gea = randomChoice(GeaList);
	while (geas.length < n) {
		if (geas.includes(gea)) {
			continue;
		}
		geas.push(gea);
		gea = randomChoice(GeaList);
	}
	return geas.join(" Also ");
};

var InconsequentialFavors = [
	"Dump a suspicious vial in a nearby well.",
	"Smear a pentagram of blood at a specific holy site.",
	"Loosen the wheels on a nearby wagon.",
	"Convince a child a prize awaits in the wilderness.",
	"Remove the head and hands of a specific statue.",
	"Toss a bag of mice into the local mill.",
	"Coat the inn's woodpile in lamp oil.",
	"Leave a slaughtered black goat in the town square.",
	"Publicly accuse a priest of practicing dark magic.",
	"Spread rumors of a married couple's infidelity.",
	"Eat whole a buzzing, wriggling, live horsefly.",
	"Say a specific fiend's name into the mirror, thrice.",
	"Kill a noble's pet, leave it where it will be found.",
	"Publicly set alight a specific holy book.",
	"Steal a local relic, leave it in a feed trough.",
	"Instigate a bloody fight between complete strangers.",
	"Set a specific bridge on fire.",
	"Dig up a specific corpse, hide its parts around town.",
	"Steal food from a specific poor family, throw it away.",
	"Roll twice again, disregarding 20. Favor involves both."
];

var ShopGenerators = {
	"Alcohol and Refreshments": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Ale, dwarven",
				Price: "25 gp / mug",
				Quantity: Roll(1,4) * 10 + " mugs",
				Page: "-",
				Notes: "Drink a mug: facial hair grows percepibly"
			},
			{
				Name: "Coffee, dwarven",
				Price: "15 gp / cup",
				Quantity: Roll(1,4) * 2 + " cups",
				Page: "-",
				Notes: "Drink a cup: immunne to sleep for 8 hours"
			},
			{
				Name: "Decanter of endless water",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 161",
				Notes: "-"
			},
			{
				Name: "Tea, portentous",
				Price: "20 gp / cup",
				Quantity: Roll(1,4) * 2 + " cups",
				Page: "-",
				Notes: "The leaves in the cup's bottom hint at the future"
			},
			{
				Name: "Wine, elven",
				Price: "25 gp / cup",
				Quantity: Roll(1,4) * 2 + " cups",
				Page: "-",
				Notes: "Drink a cup: Cures the poisoned condition"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Brandy",
				Price: "5 gp / bottle",
				Quantity: Roll(1,4) * 2 + " bottles",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Coffee",
				Price: "1sp / cup",
				Quantity: Roll(1,4) * 10 + " cups",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Hot chocolate",
				Price: "1sp / cup",
				Quantity: Roll(1,4) * 10 + " cups",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Mead",
				Price: "1sp / mug",
				Quantity: Roll(1,4) * 100 + " mugs",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Rum",
				Price: "8 gp / bottle",
				Quantity: Roll(1,4) * 2 + " bottles",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Tequila",
				Price: "8 gp / bottle",
				Quantity: Roll(1,4) * 2 + " bottles",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Vodka",
				Price: "8 gp / bottle",
				Quantity: Roll(1,4) * 3 + " bottles",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Whiskey",
				Price: "5 sp / bottle",
				Quantity: Roll(1,4) * 4 + " bottles",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Wine, common",
				Price: "5 sp / bottle",
				Quantity: Roll(1,4) * 5 + " bottles",
				Page: "PHB 158",
				Notes: "-"
			},
			{
				Name: "Wine, fine",
				Price: "10 gp / bottle",
				Quantity: Roll(1,4) * 4 + " bottles",
				Page: "PHB 158",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Brewer's supplies",
				Price: "20 gp",
				Quantity: Roll(1,4) ,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Cider",
				Price: "8 cp / mug",
				Quantity: Roll(1,4) * 100 + " mugs",
				Page: "-",
				Notes: "Either apple, pear, pineapple, peach, or berry"
			},
			{
				Name: "Juice, fruit",
				Price: "3 cp / cup",
				Quantity: Roll(1,4) * 25 + " cups",
				Page: "-",
				Notes: "Of any variety"
			},
			{
				Name: "Milk",
				Price: "1sp / bottle",
				Quantity: Roll(1,4) * 5 + " bottles",
				Page: "-",
				Notes: "Goat, cow, or other"
			},
			{
				Name: "Moonshine",
				Price: "3 sp / bottle",
				Quantity: Roll(1,4) * 5 + " bottles",
				Page: "-",
				Notes: "Disadvantage on saves to avoid intoxication"
			},
			{
				Name: "Tea, black",
				Price: "6 cp / cup",
				Quantity: Roll(1,4) * 10 + " cups",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Yeast",
				Price: "4 cp / lb.",
				Quantity: Roll(1,4) * 2 + "lbs.",
				Page: "-",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Ale",
				Price: "4 sp / mug",
				Quantity: Roll(1,4) * 100 + " mugs",
				Page: "PHB 158",
				Notes: "-"
			},
			{
				Name: "Flask or tankard",
				Price: "2 cp",
				Quantity: Roll(1,4) * 15 ,
				Page: "PGB 150",
				Notes: "Made of either pewter or treated wood"
			},
			{
				Name: "Tea, green",
				Price: "5 cp / cup",
				Quantity: Roll(1,4) * 10 + " cups",
				Page: "-",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Ale, inferior",
				Price: "2 cp / mug",
				Quantity: Roll(1,4) * 100 + " mugs",
				Page: "-",
				Notes: "Flavor will not leave mouth until next short rest"
			},
			{
				Name: "Ale, non-alcoholic",
				Price: "2 cp / mug",
				Quantity: Roll(1,4) * 100 + " mugs",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Water",
				Price: "1cp / cup",
				Quantity: Roll(1,4) * 100 + " cups",
				Page: "-",
				Notes: "Clean and Pure"
			}]);
		}
		return items;
	},
	"Animals": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Brown Bear",
				Price: "300 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 319",
				Notes: "Untamed; full-grown or cubs"
			},
			{
				Name: "Elephant",
				Price: "600 gp",
				Quantity: ld4 - 2,
				Page: "MM 322",
				Notes: "-"
			},
			{
				Name: "Mammoth",
				Price: "1,200 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 332",
				Notes: "-"
			},
			{
				Name: "Rhinoceros",
				Price: "500 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 336",
				Notes: "Untamed"
			},
			{
				Name: "Ring of Animal Influence",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 189",
				Notes: "-"
			},
			{
				Name: "Misc. CR 1 Beasts",
				Price: "50 gp to 300 gp",
				Quantity: Roll(1,4) - 2,
				Page: "-",
				Notes: "May be untamed"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Camel",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "MM 320",
				Notes: "-"
			},
			{
				Name: "Eagle",
				Price: "20 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 322",
				Notes: "-"
			},
			{
				Name: "Hawk",
				Price: "15 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 330",
				Notes: "-"
			},
			{
				Name: "Lion",
				Price: "200 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 337",
				Notes: "Untamed"
			},
			{
				Name: "Mastiff",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "MM 332",
				Notes: "Full-grown or pups"
			},
			{
				Name: "Monkey",
				Price: "25 gp",
				Quantity: Roll(1,4) - 2,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Owl",
				Price: "20 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 333",
				Notes: "-"
			},
			{
				Name: "Riding horse",
				Price: "75 gp",
				Quantity: Roll(1,4),
				Page: "MM 336",
				Notes: "-"
			},
			{
				Name: "Parrot, live",
				Price: "50 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Panther",
				Price: "150 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 333",
				Notes: "Untamed"
			},
			{
				Name: "Tiger",
				Price: "200 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 339",
				Notes: "Untamed"
			},
			{
				Name: "Warhorse",
				Price: "400 gp",
				Quantity: Roll(1,4),
				Page: "MM 340",
				Notes: "-"
			},
			{
				Name: "Wolf",
				Price: "50 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 341",
				Notes: "-"
			},
			{
				Name: "Misc. CR 1/2 Beasts",
				Price: "20 gp to 50 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "May be untamed"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Badger",
				Price: "5 sp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 318",
				Notes: "Untamed"
			},
			{
				Name: "Cow",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 157",
				Notes: "May instead be a bull, steer, or cow variant"
			},
			{
				Name: "Draft horse",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "MM 321",
				Notes: "-"
			},
			{
				Name: "Mule",
				Price: "8 gp",
				Quantity: Roll(1,4),
				Page: "MM 333",
				Notes: "May instead be a donkey"
			},
			{
				Name: "Ox",
				Price: "15 gp",
				Quantity: Roll(1,4),
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Pony",
				Price: "30 gp",
				Quantity: Roll(1,4),
				Page: "MM 335",
				Notes: "-"
			},
			{
				Name: "Raven",
				Price: "10 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 335",
				Notes: "-"
			},
			{
				Name: "Weasel",
				Price: "5 sp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 340",
				Notes: "-"
			},
			{
				Name: "Misc. CR 1/8 Beasts",
				Price: "1 gp to 10 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "May be untamed"
			},
			{
				Name: "Misc. CR 1/4 Beasts",
				Price: "5 gp to 25 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "May be untamed"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Bat",
				Price: "2 cp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 318",
				Notes: "-"
			},
			{
				Name: "Cat",
				Price: "2 sp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 320",
				Notes: "-"
			},
			{
				Name: "Chicken",
				Price: "2 cp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 157",
				Notes: "May instead be a rooster"
			},
			{
				Name: "Feed, animal",
				Price: "5 cp / day",
				Quantity: Roll(1,4) * 30 + " days",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Frog",
				Price: "1 cp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 322",
				Notes: "May instead be a toad"
			},
			{
				Name: "Goat",
				Price: "2 g",
				Quantity: Roll(1,4) * 2,
				Page: "MM 330",
				Notes: "May instead be a sheep"
			},
			{
				Name: "Lizard",
				Price: "1 cp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 332",
				Notes: "-"
			},
			{
				Name: "Pig",
				Price: "3 g",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Rat",
				Price: "1 cp",
				Quantity: Roll(1,4),
				Page: "MM 355",
				Notes: "-"
			},
			{
				Name: "Misc. CR O beasts",
				Price: "2 cp to 1 g",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "May be untamed"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Parrot, dead",
				Price: "1 cp",
				Quantity: "Only 7, ever",
				Page: "-",
				Notes: "Deceased"
			}]);
			break;
		}
		return items;
	},
	"Books and Maps": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Book, forgotten",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Example title: 'The Call of Y'chak'"
			},
			{
				Name: "Map, planar",
				Price: "1,00 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Accurately depicts a significant planar location"
			},
			{
				Name: "Treasure map, real",
				Price: "1,00 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Depicts an area within 7 days' travel"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Atlas, known world",
				Price: "500 gp",
				Quantity: Roll(1,4) - 2,
				Page: "-",
				Notes: "Very accurate, but not overly detailed"
			},
			{
				Name: "Book, classic",
				Price: "100 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Example title: 'Adventures of Sherlock Gnomes'"
			},
			{
				Name: "Book, novel",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Example title: 'The Drow in the High Castle'"
			},
			{
				Name: "Calligrapher's supplies",
				Price: "10 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Cartographer's tools",
				Price: "15 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Guidebook, monster",
				Price: "125 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Pertains to a specific monster type found nearby"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Book, blank",
				Price: "25 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Book, tawdry",
				Price: "25 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "Example title: 'My midnight Tiefling'"
			},
			{
				Name: "Case, map or scroll",
				Price: "1 gp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Guidebook, area",
				Price: "50 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Pertains to a nearby specific city or location"
			},
			{
				Name: "Map, accurate",
				Price: "25 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Portrays an important area within 7 days' travel"
			},
			{
				Name: "Newspaper",
				Price: "2 sp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "Printed with the weekly news from a nearby city"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Ink",
				Price: "10 gp / ounce",
				Quantity: Roll(1,4) * 10 + " ounces",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Ink pen",
				Price: "2 cp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Paper",
				Price: "2 sp / sheet",
				Quantity: Roll(1,4) * 20 + " sheets",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Parchment",
				Price: "1 sp / sheet",
				Quantity: Roll(1,4) * 20 + " sheets",
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Treasure Map, fake",
				Price: "1 sp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "A DC 10 Investigation check discovers it is fake"
			}]);
			break;
		}
		return items;
	},
	"Flowers and Seeds": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Dragon lily",
				Price: "5 gp / dozen",
				Quantity: Roll(1,4) + " dozen",
				Page: "-",
				Notes: "Contact instantly purifies up to 10 gal. of water"
			},
			{
				Name: "Quaal's feather token, tree",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 188",
				Notes: "-"
			},
			{
				Name: "Seeds, dragon lily",
				Price: "10 gp / handful",
				Quantity: Roll(1,4) + " handfuls",
				Page: "-",
				Notes: "Grows up to 60 dragon lillies in a shallow pond"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Glowblossom",
				Price: "1 sp / dozen",
				Quantity: Roll(1,4) * 3 + " dozen",
				Page: "-",
				Notes: "Emits dim light in a 10 foot radius"
			},
			{
				Name: "Phoenixbloom",
				Price: "1 gp / dozen",
				Quantity: Roll(1,4) * 3 + " dozen",
				Page: "-",
				Notes: "Burns as a torch, can set objects on fire"
			},
			{
				Name: "Seeds, fruit tree",
				Price: "3 sp / handful",
				Quantity: Roll(1,4) * 10 + " handfuls",
				Page: "-",
				Notes: "Grows up to 25 fruit trees; apple, pear, or similar"
			},
			{
				Name: "Seeds, glowblossom",
				Price: "2 sp / handful",
				Quantity: Roll(1,4) * 2 + " handfuls",
				Page: "-",
				Notes: "Grows up to 60 glowblossom flowers"
			},
			{
				Name: "Seeds, phoenixbloom",
				Price: "2 gp / handful",
				Quantity: Roll(1,4) * 2 + " handfuls",
				Page: "-",
				Notes: "Grows up to 60 phoenixbloom flowers"
			},
			{
				Name: "Seeds, whistleweed",
				Price: "2 sp / handful",
				Quantity: Roll(1,4) * 5 + " handfuls",
				Page: "-",
				Notes: "Grows up to 60 whistleweed stalks"
			},
			{
				Name: "Wistleweed",
				Price: "1 sp / dozen",
				Quantity: Roll(1,4) * 4 + " dozen",
				Page: "-",
				Notes: "Whistles loudly when brushed against"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Flowers, fine",
				Price: "4 cp / dozen",
				Quantity: Roll(1,4) * 5 + " dozen",
				Page: "-",
				Notes: "Roses, lavendar, tulips, or similar"
			},
			{
				Name: "Herbalism kit",
				Price: "5 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Seeds, fine flower",
				Price: "8 cp / handful",
				Quantity: Roll(1,4) * 10 + " handfuls",
				Page: "-",
				Notes: "Grows a group of up to 120 fine flowers"
			},
			{
				Name: "Seeds, tree",
				Price: "5 cp / handful",
				Quantity: Roll(1,4) * 10 + " handfuls",
				Page: "-",
				Notes: "Grows up to 25 trees; oak, birch, pine, or similar"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Mistletoe",
				Price: "1 gp / sprig",
				Quantity: Roll(1,4) * 5 + " sprigs",
				Page: "PHB 150",
				Notes: "Counts as a druidic focus"
			},
			{
				Name: "Mixed flowers",
				Price: "1 cp / dozen",
				Quantity: Roll(1,4) * 5 + " dozen",
				Page: "-",
				Notes: "A low-quality bouquet of common flowers"
			},
			{
				Name: "Seeds, crop",
				Price: "1 cp / handful",
				Quantity: Roll(1,4) * 20 + " handfuls",
				Page: "-",
				Notes: "Grows 10 lbs. of a staple, like rice or wheat"
			},
			{
				Name: "Seeds, wildflower",
				Price: "4 cp / handful",
				Quantity: Roll(1,4) * 10 + " handfuls",
				Page: "-",
				Notes: "Grows up to 60 wildflowers"
			},
			{
				Name: "Wildflowers",
				Price: "2 cp / dozen",
				Quantity: Roll(1,4) * 5 + " dozen",
				Page: "-",
				Notes: "A fresh bouquet of naturally local flowers"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Mixed flowers, dead",
				Price: "1 cp / dozen",
				Quantity: Roll(1,4) * 2 + " dozen",
				Page: "-",
				Notes: "Wilted and slightly browned"
			}]);
			break;
		}
		return items;
	},
	"Food and Animal Parts": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Bones, dragon",
				Price: "50 gp / lb.",
				Quantity: Roll(1,4) * 5 + "lbs.",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Horn, unicorn",
				Price: "1,000 gp",
				Quantity: "Roll(1,4) - 2",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Ioun Stone, sustenance",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 176",
				Notes: "-"
			},
			{
				Name: "Meal, aristocratic",
				Price: "2 gp / day",
				Quantity: Roll(1,4) * 20 + " days",
				Page: "PHB 158",
				Notes: "A most succulent cut of magical beast"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Cake",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Sumptuous and moist; feeds 8"
			},
			{
				Name: "Cook's utensils",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Fishing tackle",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Ginger",
				Price: "1 gp / lb.",
				Quantity: Roll(1,4) * 10 + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Hat, chef",
				Price: "3 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Meal, comfortable",
				Price: "5 sp / day",
				Quantity: Roll(1,4) * 20 + " days",
				Page: "PHB 158",
				Notes: "Lightly spiced meat served with a side dish"
			},
			{
				Name: "Meal, wealthy",
				Price: "8 sp / day",
				Quantity: Roll(1,4) * 20 + " days",
				Page: "PHB 158",
				Notes: "Well-prepared prime cut of meat, and dessert"
			},
			{
				Name: "Pie",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Sweet or savory, feeds 1-2"
			},
			{
				Name: "Saffron",
				Price: "15 gp / lb.",
				Quantity: Roll(1,4) + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Spices",
				Price: "2 gp / lb.",
				Quantity: Roll(1,4) * 5 + "lbs.",
				Page: "PHB 157",
				Notes: "Pepper, cinnamon, or similar"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Bones",
				Price: "5 gp / set",
				Quantity: Roll(1,4) + " sets",
				Page: "-",
				Notes: "Good for soup and maybe even necromancy"
			},
			{
				Name: "Hunting trap",
				Price: "5 gp",
				Quantity: ld4 * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Meal, modest",
				Price: "3 sp / day",
				Quantity: "ld4 * 20 days",
				Page: "PHB 158",
				Notes: "A hearty broth with real vegetables"
			},
			{
				Name: "Meat",
				Price: "3 sp / chunk",
				Quantity: Roll(1,4) * 15 + " chunks",
				Page: "PHB 158",
				Notes: "Beef, pork, chicken, venison or similar"
			},
			{
				Name: "Mess kit",
				Price: "2 sp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Pot, iron",
				Price: "2 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Rations",
				Price: "5 sp / day",
				Quantity: Roll(1,4) * 15 + " days",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Salt",
				Price: "5 cp / lb.",
				Quantity: Roll(1,4) * 10 + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Soap",
				Price: "2 cp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Bread",
				Price: "2 cp / loaf",
				Quantity: Roll(1,4) * 10 + " loaves",
				Page: "PHB 158",
				Notes: "-"
			},
			{
				Name: "Butter",
				Price: "3 cp / stick",
				Quantity: Roll(1,4) * 10 + " sticks",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Cheese",
				Price: "1 sp / hunk",
				Quantity: Roll(1,4) * 20 + " hunks",
				Page: "PHB 158",
				Notes: "-"
			},
			{
				Name: "Eggs",
				Price: "1 sp / dozen",
				Quantity: Roll(1,4) * 5 + " dozen",
				Page: "-",
				Notes: "Chicken, duck, or similar"
			},
			{
				Name: "Flour",
				Price: "2 cp / lb.",
				Quantity: Roll(1,4) * 10 + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Fruit",
				Price: "1 cp",
				Quantity: Roll(1,4) * 20,
				Page: "-",
				Notes: "Apples, plums, or similar; can also be vegetables"
			},
			{
				Name: "Meat, poor",
				Price: "6 cp / day",
				Quantity: Roll(1,4) * 20 + " days",
				Page: "PHB 158",
				Notes: "Gruel and greasy bits, smells like regret"
			},
			{
				Name: "Milk",
				Price: "1 sp / bottle",
				Quantity: Roll(1,4) * 5 + " bottles",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Wheat",
				Price: "1 cp / lb.",
				Quantity: Roll(1,4) * 25 + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Dung",
				Price: "1 cp / lb.",
				Quantity: d4 * 25 + "lbs.",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Lard",
				Price: "2 cp / lb.",
				Quantity: Roll(1,4) * 25 + "lbs.",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Meal, squalid",
				Price: "3 cp / day",
				Quantity: Roll(1,4) * 20 + " days",
				Page: "PHB 158",
				Notes: "Ripe, rancid, and the wrong kind of chewy"
			},
			{
				Name: "Teeth",
				Price: "1 cp / each",
				Quantity: Roll(1,4) * 30,
				Page: "-",
				Notes: "Either animal or (possibly) human"
			}]);
			break;
		}
		return items;
	},
	"Furniture and Interior Decor": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Chandelier, huge",
				Price: "1,500 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "Example: Astral crystal interlaced with mithral"
			},
			{
				Name: "Mirror of life trapping",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 181",
				Notes: "-"
			},
			{
				Name: "Statue, precious",
				Price: "2,000 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "Example: An enormous adamantine dragon"
			},
			{
				Name: "Tapestry",
				Price: "1,500 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "Example: Adventurers thwarting an ancient evil"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Altar",
				Price: "20 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "Contains holy symbols and space for rituals"
			},
			{
				Name: "Armchair",
				Price: "12 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Leather, well-stuffed, highly comfortable"
			},
			{
				Name: "Banner or flag",
				Price: "30 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "3 feet * 10 feet, comes with custom design"
			},
			{
				Name: "Bathtub, ornate",
				Price: "25 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Example: Worked steel with dragon-headed taps"
			},
			{
				Name: "Bed, four-poster",
				Price: "75 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "8 feet * 6 feet, filled with owlbear down"
			},
			{
				Name: "Desk, ornate",
				Price: "15 gp",
				Quantity: Roll(1,4) - 2,
				Page: "-",
				Notes: "Example: Intricate vines carved in smooth wood"
			},
			{
				Name: "Fountain",
				Price: "750 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "6 feet * 6 feet, 4 feet tall, marble or similar"
			},
			{
				Name: "Lamp, magic",
				Price: "100 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Turns off and on, triggered by a single clap"
			},
			{
				Name: "Mosaic, large",
				Price: "600 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "Example: Water elementals crashing on a coast"
			},
			{
				Name: "Painting, huge",
				Price: "550 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "Example: The artist's depiction of the Dawn War"
			},
			{
				Name: "Painting, large",
				Price: "50 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "Example: A courtly dragonborn and her consort"
			},
			{
				Name: "Statue, metal",
				Price: "1,000 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "Example: A brass statue of the goddess Avandra"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Chest, large",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "6 feet * 3 feet, 2 feet tall, holds approx 900 lbs."
			},
			{
				Name: "Jug or pitcher",
				Price: "2 cp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Painting, medium",
				Price: "10 gp",
				Quantity: "Made to order",
				Page: "-",
				Notes: "Example: Depicts a gnome & her pet giant bee"
			},
			{
				Name: "Rug, large",
				Price: "12 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "10 feet * 50 feet, really ties a room together"
			},
			{
				Name: "Wardrobe, wood",
				Price: "10 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "4 feet * 2.5 feet, 6 feet tall, holds approx 900 lbs."
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Bookcase",
				Price: "2 gp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "5 feet * 7 foot, 4 feet tall, holds approx 60 books"
			},
			{
				Name: "Chest, medium",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "6 feet * 2 feet, 7 foot tall, holds approx 300 lbs."
			},
			{
				Name: "Doghouse, large",
				Price: "3 gp",
				Quantity: Roll(1,4) - 2,
				Page: "-",
				Notes: "Capable of holding a dog or other large creature"
			},
			{
				Name: "Furnace, coal",
				Price: "8 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Can burn 7 lb. of coal per day"
			},
			{
				Name: "Table, wood",
				Price: "3 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "4 feet * 8 feet, 2.5 feet tall"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Barrel",
				Price: "2 gp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Basket",
				Price: "4 sp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			}]);
			break;
		}
		return items;
	},
	"High Fashion": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Boots of the winterlands",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 156",
				Notes: "-"
			},
			{
				Name: "Clothes, superior",
				Price: "150 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Enchanted, always the finest clothes in the room"
			},
			{
				Name: "Hat, superior",
				Price: "100 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Enchanted, always the finest hat in the room"
			},
			{
				Name: "Robe of scintillating colors",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 192",
				Notes: "-"
			},
			{
				Name: "Slippers of spider climbing",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 200",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Bow or bowtie",
				Price: "12 gp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "Soft silken cloth, plain or with festive pattern"
			},
			{
				Name: "Clothes, aristocratic",
				Price: "50 gp",
				Quantity: Roll(1,4) * 5,
				Page: "-",
				Notes: "The bleeding edge of modern fashion"
			},
			{
				Name: "Clothes, fine",
				Price: "15 gp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "Refined noble clothes, very fashionable"
			},
			{
				Name: "Cowl",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A face-wrap favored by vigilantes and assassins"
			},
			{
				Name: "Goggles",
				Price: "10 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Leather and glass, perfect for keeping eyes safe"
			},
			{
				Name: "Hat, adventurer's",
				Price: "15 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "A wide-brimmed leather hat favored by explorers"
			},
			{
				Name: "Hat, beret",
				Price: "3 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A simple circular hat, a staple of artists"
			},
			{
				Name: "Hat, fez",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Worn by distinguished individuals in arid lands"
			},
			{
				Name: "Hat, sea captain",
				Price: "20 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "A nautical cap that demands a crew's respect"
			},
			{
				Name: "Hat, ushanka",
				Price: "3 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A soft, warm hat, ideal for freezing conditions"
			},
			{
				Name: "Hat, wizard",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "The conical, wide-brimmed hat of a true wizard"
			},
			{
				Name: "Mask",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Secretive or festive, good for crimes and parties"
			},
			{
				Name: "Shaded glasses",
				Price: "350 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Negates disadvantage from Sunlight Sensitivity"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Clothes, costume",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "A finely made costume for a jester or actor"
			},
			{
				Name: "Cobbler's tools",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Hat, bowler",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A rounded hat with a short brim"
			},
			{
				Name: "Hood",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Perfume",
				Price: "5 gp / vial",
				Quantity: Roll(1,4) * 2 + " vials",
				Page: "PHB 150",
				Notes: "A faint floral aroma for the discerning nose"
			},
			{
				Name: "Weaver's tools",
				Price: "1 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Wig",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Beautiful or austere, good at hiding baldness"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Cap, leather",
				Price: "5 sp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A sturdy, if ugly, way to keep your head dry"
			},
			{
				Name: "Cap, bonnet",
				Price: "5 sp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A working woman's hat"
			},
			{
				Name: "Cap, stocking",
				Price: "4 sp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A long, conical cap for a cold winter's night"
			},
			{
				Name: "Clothes, common",
				Price: "5 sp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "Worn and patched, made of rough materials"
			},
			{
				Name: "Clothes, traveler's",
				Price: "2 gp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "Durable and well-made, but not exactly fancy"
			},
			{
				Name: "Robes",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "Simple, smooth, and clean, with many pockets"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Sack, wearable",
				Price: "1 cp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "Almost waterproof"
			}]);
			break;
		}
		return items;
	},
	"Jewelry and Gems": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Elemental gem",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 167",
				Notes: "-"
			},
			{
				Name: "Gems, legendary",
				Price: "5,000 gp each",
				Quantity: Roll(1,4),
				Page: "DMG 134",
				Notes: "Examples: black sapphire, diamond, jacinth"
			},
			{
				Name: "Platinum",
				Price: "500 gp",
				Quantity: Roll(1,4) + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Ring of protection",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 191",
				Notes: "-"
			},
			{
				Name: "Ring of telekinesis",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 193",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Brooch of shielding",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 156",
				Notes: "-"
			},
			{
				Name: "Crown",
				Price: "750 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Precious metal circlet inset with gemstones"
			},
			{
				Name: "Earring, elegant",
				Price: "200 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Ostentatiously gemmed stud or metal ring"
			},
			{
				Name: "Gems, exceptional",
				Price: "100 gp each",
				Quantity: Roll(1,4) * 4,
				Page: "DMG 134",
				Notes: "Examples: amber, amethyst, garnet, jade, pearl"
			},
			{
				Name: "Gem of brightness",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 171",
				Notes: "-"
			},
			{
				Name: "Gems, rare",
				Price: "500 gp each",
				Quantity: Roll(1,4) * 3,
				Page: "DMG 134",
				Notes: "Examples: alexandrite, peridot, topaz"
			},
			{
				Name: "Gems, very rare",
				Price: "1,000 gp each",
				Quantity: Roll(1,4) * 2,
				Page: "DMG 134",
				Notes: "Examples: emerald, opal, sapphire, ruby"
			},
			{
				Name: "Gold",
				Price: "50 gp / lb.",
				Quantity: Roll(1,4) + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Medallion of thoughts",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 181",
				Notes: "-"
			},
			{
				Name: "Ring, elegant",
				Price: "250 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Tooled metal band inset with precious gems"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Gems, uncommon",
				Price: "50 gp each",
				Quantity: Roll(1,4) * 5,
				Page: "DMG 134",
				Notes: "Examples: citrine, jasper, moonstone, quartz"
			},
			{
				Name: "Jeweler's Tools",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Necklace",
				Price: "150 gp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "Braided metal, including pendant with a gem"
			},
			{
				Name: "Signet ring",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Silver",
				Price: "5 gp / lb.",
				Quantity: Roll(1,4) + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Copper",
				Price: "5 sp / lb.",
				Quantity: Roll(1,4) * 2 + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Earring, simple",
				Price: "5 gp",
				Quantity: Roll(1,4) * 5,
				Page: "-",
				Notes: "Small stud or ring of semi-precious metal"
			},
			{
				Name: "Gems, common",
				Price: "10 gp each",
				Quantity: Roll(1,4) * 4,
				Page: "DMG 134",
				Notes: "Examples: agate, lapis lazuli, malachite, tiger eye"
			},
			{
				Name: "Iron",
				Price: "1 sp / lb.",
				Quantity: Roll(1,4) * 5 + "lbs.",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Locket, brass",
				Price: "4 sp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Pick, miner's",
				Price: "4 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Magnifying glass",
				Price: "100 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Ring, simple",
				Price: "5 gp",
				Quantity: Roll(1,4) * 4,
				Page: "-",
				Notes: "A small circle of polished semi-precious metal"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Geode, fake",
				Price: "2 sp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "No crystals within this rock. Only more rock."
			}]);
			break;
		}
		return items;
	},
	"Knick-Knacks": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Sovereign glue",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 200",
				Notes: "-"
			},
			{
				Name: "Universal solvent",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 209",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Alchemy jug",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 150",
				Notes: "-"
			},
			{
				Name: "Artisan's tools",
				Price: "varies",
				Quantity: Roll(1,4) + " + 2 sets",
				Page: "PHB 154",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Bell",
				Price: "1 gp",
				Quantity: Roll(1,4) + 1,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Caltrops",
				Price: "1 gp / 20",
				Quantity: Roll(1,4) * 40,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Dragonchess set",
				Price: "1 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Grappling hook",
				Price: "2 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Lantern of revealing",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 119",
				Notes: "-"
			},
			{
				Name: "Three-Dragon Ante set",
				Price: "1 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154 ",
				Notes: "-"
			},
			{
				Name: "Spyglass",
				Price: "1,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Amulet",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "Counts as a holy symbol"
			},
			{
				Name: "Ball bearings",
				Price: "1 gp / 1,000",
				Quantity: Roll(1,4) * 2000,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Cart",
				Price: "15 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Chain",
				Price: "5 gp / 10 ft.",
				Quantity: Roll(1,4) * 20 + " ft.",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Climber's kit",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Hourglass",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Lamp",
				Price: "5 sp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Lantern, bullseye",
				Price: "10 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Lantern, hooded",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Rope, hempen",
				Price: "1 gp / 50 ft.",
				Quantity: Roll(1,4) * 50 + "ft.",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Rowboat",
				Price: "50 gp",
				Quantity: Roll(1,4) - 2,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Scale, merchant's",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Tarokka deck",
				Price: "10 gp",
				Quantity: Roll(1,4) - 1,
				Page: "CoS 243",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Blanket",
				Price: "5 sp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Block and tackle",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Bucket",
				Price: "5 cp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Candle",
				Price: "1 cp",
				Quantity: Roll(1,4) * 10,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Chalk",
				Price: "1 cp / piece",
				Quantity: Roll(1,4) * 5 + " pieces",
				Page: "PHB 150",
				Notes: "Comes in a variety of colors"
			},
			{
				Name: "Dice set",
				Price: "1 sp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Flask or tankard",
				Price: "2 cp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "Made of either pewter or treated wood"
			},
			{
				Name: "Playing card set",
				Price: "5 sp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Signal whistle",
				Price: "5 cp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Tinderbox",
				Price: "5 sp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Pole (10-foot)",
				Price: "5 cp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 150",
				Notes: "-"
			}]);
			break;
		}
		return items;
	},
	"Leatherworking": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Belt of dwarvenkind",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 155",
				Notes: "-"
			},
			{
				Name: "Dragon scale mail, red",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 765",
				Notes: "-"
			},
			{
				Name: "Glamoured studded leather",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 172",
				Notes: "-"
			},
			{
				Name: "Saddle of the cavalier",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 199",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Bagpipes",
				Price: "30 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Bag of holding",
				Price: "500 gp",
				Quantity: "Only " + Roll(1,4) + ", ever",
				Page: "DMG 153",
				Notes: "-"
			},
			{
				Name: "Boots of elven kind",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 155",
				Notes: "-"
			},
			{
				Name: "Boots of the winterlands",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 156",
				Notes: "-"
			},
			{
				Name: "Drum",
				Price: "6 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Hat, adventurer's",
				Price: "15 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "A wide-brimmed leather hat favored by explorers"
			},
			{
				Name: "Hide armor",
				Price: "10 gp",
				Quantity: Roll(1,4),
				Page: "PHB 145",
				Notes: "-"
			},
			{
				Name: "Saddlebags",
				Price: "4 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Saddle, exotic",
				Price: "60 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Saddle, military",
				Price: "20 gp",
				Quantity: Roll(1,4) ,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Studded leather armor",
				Price: "45 gp",
				Quantity: Roll(1,4) - 1 ,
				Page: "PHB 145",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Backpack",
				Price: "2 gp",
				Quantity: Roll(1,4) * 3 ,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Clothes, traveler's",
				Price: "2 gp",
				Quantity: Roll(1,4) ,
				Page: "PHB 150",
				Notes: "Durable and well-made, stands punishment"
			},
			{
				Name: "Hunting trap",
				Price: "5 gp",
				Quantity: Roll(1,4) ,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Leather armor",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 145",
				Notes: "-"
			},
			{
				Name: "Leatherworker's tools",
				Price: "25 gp",
				Quantity: Roll(1,4) ,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Oil",
				Price: "1 sp / flask",
				Quantity: Roll(1,4) * 2 + " flasks",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Quiver",
				Price: "1 gp",
				Quantity: Roll(1,4) ,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Saddle, riding",
				Price: "10 gp",
				Quantity: Roll(1,4) ,
				Page: "PHB 157",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Bit and bridle",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2 ,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Cap, leather",
				Price: "5 sp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A sturdy way to keep your head dry"
			},
			{
				Name: "Meat",
				Price: "3 sp / chunk",
				Quantity: Roll(1,4) * 5 + " chunks",
				Page: "PHB 158",
				Notes: "-"
			},
			{
				Name: "Padded armor",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 145",
				Notes: "-"
			},
			{
				Name: "Pouch",
				Price: "5 sp",
				Quantity: Roll(1,4) * 4 ,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Saddle, pack",
				Price: "5 gp",
				Quantity: Roll(1,4) ,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Waterskin",
				Price: "2 sp",
				Quantity: Roll(1,4) * 3 ,
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Leather, cured",
				Price: "5 gp / sq. yd.",
				Quantity: Roll(1,4) * 4 + "sq. yds.",
				Page: "-",
				Notes: "-"
			}]);
			break;
		}
		return items;
	},
	"Mechanical Contraptions": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Clockwork rocket sled",
				Price: "2,500 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Moves 60 feet / round in one direction for 1 min"
			},
			{
				Name: "Iron bands of Bilarro",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 177",
				Notes: "-"
			},
			{
				Name: "Manual of golems, iron",
				Price: "25,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 780",
				Notes: "-"
			},
			{
				Name: "Wand of lighting bolts",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 211",
				Notes: "-"
			},
			{
				Name: "Winged boots",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 274",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Clockwork dragon",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "May breathe fire that can set objects alight"
			},
			{
				Name: "Clockwork mount",
				Price: "250 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 336",
				Notes: "Has the same statistics as a riding horse"
			},
			{
				Name: "Clockwork songbird",
				Price: "12 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Sings 1 of 3 songs on command; flightless"
			},
			{
				Name: "Dynamite",
				Price: "200 gp / stick",
				Quantity: Roll(1,4) * 4 + " sticks",
				Page: "DMG 267",
				Notes: "May not exist in settings w/o gunpowder"
			},
			{
				Name: "Goggles of night",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 172",
				Notes: "-"
			},
			{
				Name: "Gunpowder, keg",
				Price: "250 gp",
				Quantity: Roll(1,4) - 1,
				Page: "DMG 267",
				Notes: "May not exist in settings w/o gunpowder"
			},
			{
				Name: "Pocketwatch",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "When wound, reliably tells the time of day"
			},
			{
				Name: "Tinker's tools",
				Price: "50 gp",
				Quantity: Roll(1,4) + 1,
				Page: "PHB 154",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Barrel organ",
				Price: "30 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Musical instrument; turn the crank to play"
			},
			{
				Name: "Bomb",
				Price: "150 gp",
				Quantity: Roll(1,4) * 4,
				Page: "DMG 267",
				Notes: "May not exist in settings w/o gunpowder"
			},
			{
				Name: "Clockwork dog",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "When wound up, walks forward, barks, and flips"
			},
			{
				Name: "Clockwork dragonchess set",
				Price: "20 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Automatically plays dragonchess against you"
			},
			{
				Name: "Gunpowder, horn",
				Price: "35 gp",
				Quantity: Roll(1,4) * 4,
				Page: "DMG 267",
				Notes: "May not exist in settings w/o gunpowder"
			},
			{
				Name: "Hunting trap",
				Price: "5 gp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Lock",
				Price: "10 gp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Abacus",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Ball bearings",
				Price: "1 gp / 1,000",
				Quantity: Roll(1,4) * 2000,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Block and tackle",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Cogs",
				Price: "1 sp / handful",
				Quantity: Roll(1,4) * 5 + " handfuls",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Oil",
				Price: "1 sp / flask",
				Quantity: Roll(1,4) * 5 + " flasks",
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Hoop and stick",
				Price: "2 cp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "A pass-time from a simpler time"
			}]);
			break;
		}
		return items;
	},
	"Medium and Heavy Armor and Shields": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Arrow-catching shield",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Armor, +2",
				Price: "50,000 gp",
				Quantity: "Only " + Roll(1,4) + " - 2, ever",
				Page: "-",
				Notes: "Must also pay the cost of the base armor"
			},
			{
				Name: "Dwarven plate",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Elven chain",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Helm of teleportation",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Shield, +2",
				Price: "5,000 gp",
				Quantity: "Only " + Roll(1,4) + " - 2, ever",
				Page: "-",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Adamantine armor, any",
				Price: "500 gp",
				Quantity: "Only " + Roll(1,4) + " - 1, ever",
				Page: "-",
				Notes: "Must also pay the cost of the base armor"
			},
			{
				Name: "Armor,+ 1",
				Price: "5,000 gp",
				Quantity: "Only " + Roll(1,4) + " - 1, ever",
				Page: "-",
				Notes: "Must also pay the cost of the base armor"
			},
			{
				Name: "Half plate",
				Price: "750 gp",
				Quantity: Roll(1,4) + 3,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Helm, winged",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Gallant and flamboyant"
			},
			{
				Name: "Mithral armor, any",
				Price: "500 gp",
				Quantity: "Only " + Roll(1,4) + " - 1, ever",
				Page: "-",
				Notes: "Must also pay the cost of the base armor"
			},
			{
				Name: "Plate",
				Price: "1,500 gp",
				Quantity: Roll(1,4) + 2,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Shield, + 1",
				Price: "500 gp",
				Quantity: "Only " + Roll(1,4) + " - 1, ever",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Silver",
				Price: "5 gp / lb.",
				Quantity: Roll(1,4) * 2 + "lbs.",
				Page: "-",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Anvil",
				Price: "75 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Barding",
				Price: "varies",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Breastplate",
				Price: "400 gp",
				Quantity: Roll(1,4) + 4,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Helm, horned",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "While imposing, it is hard to get through doors"
			},
			{
				Name: "Smith's tools",
				Price: "20 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Splint",
				Price: "200 gp",
				Quantity: Roll(1,4) + 4,
				Page: "-",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Chain mail",
				Price: "75 gp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Chain shirt",
				Price: "50 gp",
				Quantity: Roll(1,4) * 4,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Copper",
				Price: "5 sp / lb.",
				Quantity: Roll(1,4) * 2 + "lbs.",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Iron",
				Price: "1 sp / lb.",
				Quantity: Roll(1,4) * 5 + "lbs.",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Ring mail",
				Price: "30 gp",
				Quantity: Roll(1,4) * 4,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Scale mail",
				Price: "50 gp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Shield",
				Price: "50 gp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Barrel, wearable",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Includes straps; does not include bottop"
			},
			{
				Name: "Bucket",
				Price: "5 cp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Anything is armor if you're foolhardy enough"
			}]);
			break;
		}
		return items;
	},
	"Potions, Poisons, and Herbs": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Burnt othur fumes",
				Price: "500 gp / dose",
				Quantity: Roll(1,4) + " - 1 doses",
				Page: "DMG 258",
				Notes: "Inhailed; can inflict persistent poison damage"
			},
			{
				Name: "Malice",
				Price: "250 gp / dose",
				Quantity: Roll(1,4) + " - 1 doses",
				Page: "DMG 258",
				Notes: "Inhailed; can blind affected creatures"
			},
			{
				Name: "Oil of sharpness",
				Price: "25,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "DMG 184",
				Notes: "Grants an item +3 to attack and damage"
			},
			{
				Name: "Potion of invisibility",
				Price: "25,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "DMG 188",
				Notes: "Grants invisibility for up to an hour"
			},
			{
				Name: "Potion of invulnerability",
				Price: "2,500 gp",
				Quantity: Roll(1,4) - 1,
				Page: "DMG 188",
				Notes: "Grants resistance to all damage"
			},
			{
				Name: "Potion of longevity",
				Price: "25,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "DMG 188",
				Notes: "Reduces your age by Roll(1,6) + 6 years, usually"
			},
			{
				Name: "Potion of supreme healing",
				Price: "25,000 gp",
				Quantity: Roll(1,4),
				Page: "DMG 187",
				Notes: "Regains Roll(10,4) + 20 hit points"
			},
			{
				Name: "Potion of vitality",
				Price: "25,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "DMG 188",
				Notes: "Cures exhaustion, disease, and poison"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Drow poison",
				Price: "200 gp / dose",
				Quantity: Roll(1,4) + " doses",
				Page: "DMG 258",
				Notes: "Injury; can render target unconscious"
			},
			{
				Name: "Elixir of health",
				Price: "2,500 gp",
				Quantity: Roll(1,4) + 1,
				Page: "DMG 168",
				Notes: "Curse disease, blind, deaf, paralyze, and poison"
			},
			{
				Name: "Herbs, rare",
				Price: "50 gp / lb.",
				Quantity: Roll(1,4) * 4 + "lbs.",
				Page: "-",
				Notes: "Ex: Devilroot, embertear; for rare potions"
			},
			{
				Name: "Herbs, very rare",
				Price: "500 gp / lb.",
				Quantity: Roll(1,4) * 2 + "lbs.",
				Page: "-",
				Notes: "Ex: Starspine, voidweave; for very rare potions"
			},
			{
				Name: "Potion of clairvoyance",
				Price: "2,500 gp",
				Quantity: Roll(1,4) + 1,
				Page: "DMG 187",
				Notes: "Grants the effect of the clairvoyance spel I"
			},
			{
				Name: "Potion of diminution",
				Price: "2,500 gp",
				Quantity: Roll(1,4) + 1,
				Page: "DMG 187",
				Notes: "Drink to be shrunk as if by enlarge/reduce"
			},
			{
				Name: "Potion of heroism",
				Price: "2,500 gp",
				Quantity: Roll(1,4),
				Page: "DMG 188",
				Notes: "Grants bless and 10 temporary hit points"
			},
			{
				Name: "Potion of mind reading",
				Price: "2,500 gp",
				Quantity: Roll(1,4),
				Page: "DMG 188",
				Notes: "Grants the effects of the detect thoughts spell"
			},
			{
				Name: "Potion of superior healing",
				Price: "2,500 gp",
				Quantity: Roll(1,4) + 1,
				Page: "DMG 188",
				Notes: "Regains Roll(8,4) + 8 hit points"
			},
			{
				Name: "Serpent venom",
				Price: "200 gp / dose",
				Quantity: Roll(1,4) + " doses",
				Page: "DMG 258",
				Notes: "Injury; can inflict Roll(3,6) poison damage"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Alchemist's supplies",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Assassin's blood",
				Price: "150 gp / dose",
				Quantity: Roll(1,4) + " + 1 doses",
				Page: "DMG 257",
				Notes: "Injested; can inflict Roll(1,12) poison damage"
			},
			{
				Name: "Oil of slipperiness",
				Price: "250 gp",
				Quantity: Roll(1,4) + 2,
				Page: "DMG 184",
				Notes: "Grants either freedom of movement or grease"
			},
			{
				Name: "Philter of love",
				Price: "250 gp",
				Quantity: Roll(1,4) + 1,
				Page: "DMG 184",
				Notes: "Charms the drinker for up to an hour"
			},
			{
				Name: "Poisoner's kit",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Potion of fire breath",
				Price: "250 gp",
				Quantity: Roll(1,4) + 2,
				Page: "DMG 187",
				Notes: "Allows you to exhale fire, dealing Roll(4,6) damage"
			},
			{
				Name: "Potion of greater healing",
				Price: "250 gp",
				Quantity: Roll(1,4) * 2,
				Page: "DMG 187",
				Notes: "Regains Roll(4,4) + 4 hit points"
			},
			{
				Name: "Potion of water breathing",
				Price: "250 gp",
				Quantity: Roll(1,4) * 2,
				Page: "DMG 188",
				Notes: "Allows you to breathe water for up to an hour"
			},
			{
				Name: "Truth serum",
				Price: "150 gp / dose",
				Quantity: Roll(1,4) + " + 1 doses",
				Page: "DMG 258",
				Notes: "Injested; target cannot knowingly speak a lie"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Herbalism kit",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Herbs, common",
				Price: "5 sp / lb.",
				Quantity: Roll(1,4) * 10 + "lbs.",
				Page: "-",
				Notes: "Ex: Mint, sage; often used in common potions"
			},
			{
				Name: "Herbs, uncommon",
				Price: "5 gp / lb.",
				Quantity: Roll(1,4) * 5 + "lbs.",
				Page: "-",
				Notes: "Ex: Horsetail, comfrey; for uncommon potions"
			},
			{
				Name: "Poison, basic",
				Price: "100 gp / vial",
				Quantity: Roll(1,4) * 2 + " vials",
				Page: "PHB 150",
				Notes: "Injury; can inflict Roll(1,4) poison damage"
			},
			{
				Name: "Potion of climbing",
				Price: "50 gp",
				Quantity: Roll(1,4) * 2,
				Page: "DMG 187",
				Notes: "Grants a climbing speed for 1 hour"
			},
			{
				Name: "Potion of healing",
				Price: "50 gp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 150",
				Notes: "Regains Roll(2,4) + 2 hit points"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Water",
				Price: "1 cp / cup",
				Quantity: Roll(1,4) * 100 + " cups",
				Page: "-",
				Notes: "An effective base for most potions"
			}]);
			break;
		}
		return items;
	},
	"Religious Idols and Blessings": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Candle of invocation",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 157",
				Notes: "-"
			},
			{
				Name: "Spell: Greater restoration",
				Price: "450 gp",
				Quantity: "3 spells / day",
				Page: "PHB 246",
				Notes: "Reduces exhaustion, removes charm, petrify, curse, or ability/hp reduction"
			},
			{
				Name: "Spell: Raise dead",
				Price: "1,250 gp",
				Quantity: "3 spells / day",
				Page: "PHB 270",
				Notes: "Returns a dead corpse to life"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Keoghtom's ointment",
				Price: "250 gp",
				Quantity: Roll(1,4) - 2,
				Page: "PHB 179",
				Notes: "-"
			},
			{
				Name: "Spell: Divination",
				Price: "210 gp",
				Quantity: "3 spells / day",
				Page: "PHB 234",
				Notes: "Grants guidance on a course of action"
			},
			{
				Name: "Spell: Remove curse",
				Price: "90 gp",
				Quantity: "3 spells / day",
				Page: "PHB 271",
				Notes: "Lifts curse or attunement to cursed item"
			},
			{
				Name: "Spell: Speak with dead",
				Price: "90 gp",
				Quantity: "3 spells / day",
				Page: "PHB 277",
				Notes: "Allows you to speak to one non-undead corpse"
			},
			{
				Name: "Staff of the Python",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 204",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Druidic focus",
				Price: "varies",
				Quantity: Roll(1,4) * 10 ,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Healer's kit",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2 ,
				Page: "PHB 150",
				Notes: "Thick, musky, and pungent"
			},
			{
				Name: "Holy water",
				Price: "25 gp / flask",
				Quantity: Roll(1,4) * 5 + " flasks",
				Page: "PHB 150",
				Notes: "Cast at 1st level; heals Roll(1,8) + 3 hit points"
			},
			{
				Name: "Quarterstaff",
				Price: "2 sp",
				Quantity: Roll(1,4) * 2 ,
				Page: "PHB 148",
				Notes: "Tells you the properties of a magic item"
			},
			{
				Name: "Robes",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2 ,
				Page: "PHB 150",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Spell: Lesser restoration",
				Price: "40 gp",
				Quantity: "3 spells / day",
				Page: "PHB 255",
				Notes: "Cures blind, deaf, paralyze, or poison"
			},
			{
				Name: "Spell: Prayer of healing",
				Price: "40 gp",
				Quantity: "3 spells / day",
				Page: "PHB 267",
				Notes: "Cast at 2nd level; heals Roll(2,8) + 3 hit points"
			},
			{
				Name: "Thurible",
				Price: "55 gp",
				Quantity: Roll(1,4) + 2,
				Page: "-",
				Notes: "A gilded censer for burning incense"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Book, holy",
				Price: "5 gp",
				Quantity: Roll(1,4) * 10 ,
				Page: "PHB 150",
				Notes: "From one of a variety of faiths"
			},
			{
				Name: "Chalk",
				Price: "1 cp / piece",
				Quantity: Roll(1,4) * 10 + " pieces",
				Page: "PHB 150",
				Notes: "Comes in a variety of colors"
			},
			{
				Name: "Dagger, ritual",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2 ,
				Page: "PHB 148",
				Notes: "Has an oddly curved design"
			},
			{
				Name: "Holy symbol",
				Price: "varies",
				Quantity: Roll(1,4) * 20 ,
				Page: "PHB 150",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Incense",
				Price: "1 sp / block",
				Quantity: Roll(1,4) * 20 + " blocks",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Spell: Cure wounds",
				Price: "10 gp",
				Quantity: "3 spells / day",
				Page: "PHB 230",
				Notes: "-"
			},
			{
				Name: "Spell: Identify",
				Price: "20 gp",
				Quantity: "3 spells / day",
				Page: "PHB 252",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Candle",
				Price: "1 cp",
				Quantity: Roll(1,4) * 10 ,
				Page: "PHB 150",
				Notes: "Comes in a variety of colors"
			}]);
			break;
		}
		return items;
	},
	"Songs and Instruments": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Chime of opening",
				Price: "2,500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 158",
				Notes: "-"
			},
			{
				Name: "Gnomish saxophone",
				Price: "250 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "A brass musical instrument covered in keys"
			},
			{
				Name: "Instrument of the bards, Canaith mandolin",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 176",
				Notes: "-"
			},
			{
				Name: "Instrument of the bards, Cli lyre",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 176",
				Notes: "-"
			},
			{
				Name: "Written song, epic",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Example: 'Faerunian Rhapsody'"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Adufe",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A square, drum-like instrument that rattles"
			},
			{
				Name: "Dulcimer",
				Price: "25 gp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Glockenspiel",
				Price: "35 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Instrument made of metal bars, struck with mallets"
			},
			{
				Name: "Instrument of the bards, Doss lute",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 176",
				Notes: "-"
			},
			{
				Name: "Lute",
				Price: "35 gp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Pipes of haunting",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 185",
				Notes: "-"
			},
			{
				Name: "Pipes of the sewers",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 185",
				Notes: "-"
			},
			{
				Name: "Rebab",
				Price: "32 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Long-necked wooden string instrument"
			},
			{
				Name: "Viol",
				Price: "30 gp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Written song, classic",
				Price: "5 gp",
				Quantity: Roll(1,4) + " copies",
				Page: "-",
				Notes: "Example: 'Ghost Azers in the Sky'"
			},
			{
				Name: "Written song, inspired",
				Price: "50 gp",
				Quantity: Roll(1,4) + " copies",
				Page: "-",
				Notes: "Example: '4`33'"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Bagpipes",
				Price: "30 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Chalumeau",
				Price: "15 gp",
				Quantity: Roll(1,4) * 3,
				Page: "-",
				Notes: "Straight, wooden musical instrument, with reed"
			},
			{
				Name: "Cymbals",
				Price: "20 gp / set",
				Quantity: Roll(1,4) * 3 + " sets",
				Page: "-",
				Notes: "-"
			},
			{
				Name: "Flute",
				Price: "2 gp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Lyre",
				Price: "30 gp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Pan Flute",
				Price: "12 gp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Strings",
				Price: "2 sp / 5 strings",
				Quantity: Roll(1,4) * 5 + " strings",
				Page: "-",
				Notes: "Good for restringing an instrument"
			},
			{
				Name: "Timbrel",
				Price: "13 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "A circular wood instrument with brass discs"
			},
			{
				Name: "Written song, catchy",
				Price: "5 sp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Example: 'A Tiefling Went Down to Cormyr'"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Bell",
				Price: "1 gp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Drum",
				Price: "6 gp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Horn",
				Price: "3 gp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Shawm",
				Price: "2 gp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Written song, derivative",
				Price: "5 cp",
				Quantity: Roll(1,4) + " copies",
				Page: "-",
				Notes: "Example: 'The Dwarf Lass's Beard'"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Written song, terrible",
				Price: "1 cp",
				Quantity: Roll(1,4) + " copies",
				Page: "-",
				Notes: "Example: 'Freeeform Jazz Odyssey No. 12'"
			}]);
			break;
		}
		return items;
	},
	"Spell Tomes and Scrolls": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Spellbook, backup",
				Price: "5,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Touched to a spell book: instantly copies it once"
			},
			{
				Name: "Manual of golems, clay",
				Price: "25,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 180",
				Notes: "-"
			},
			{
				Name: "Scroll: " + Spells1(),
				Price: "25,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "DMG 200",
				Notes: "-"
			},
			{
				Name: "Scroll: " + Spells8(),
				Price: "25,000 gp",
				Quantity: Roll(1,4) - 2,
				Page: "DMG 200",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Ritual book: " + GetRitualSpell(4),
				Price: "5,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Contains a 4th-level ritual spell; can be copied"
			},
			{
				Name: "Ritual book: " + GetRitualSpell(5),
				Price: "5,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Contains a 5th-level ritual spell; can be copied"
			},
			{
				Name: "Ritual book: " + GetRitualSpell(6),
				Price: "S0,000 gp",
				Quantity: Roll(1,4) - 2,
				Page: "-",
				Notes: "Contains a 6th-level ritual spell; can be copied"
			},
			{
				Name: "Scroll: " + Spells4(),
				Price: "2,500 gp",
				Quantity: Roll(1,4) * 3,
				Page: "DMG 200",
				Notes: "-"
			},
			{
				Name: "Scroll: " + Spells5(),
				Price: "2,500 gp",
				Quantity: Roll(1,4) * 2,
				Page: "DMG 200",
				Notes: "-"
			},
			{
				Name: "Scroll: " + Spells6(),
				Price: "25,000 gp",
				Quantity: Roll(1,4) * 2,
				Page: "DMG 200",
				Notes: "-"
			},
			{
				Name: "Scroll of protection, any",
				Price: "2,500 gp",
				Quantity: Roll(1,4) * 3,
				Page: "DMG 199",
				Notes: "This scroll can be used by anyone, and protects against a specific creature type"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Ritual book: " + GetRitualSpell(1),
				Price: "100 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Contains a 1st-level ritual spell; can be copied"
			},
			{
				Name: "Ritual book: " + GetRitualSpell(2),
				Price: "100 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Contains a 2nd-level ritual spell; can be copied"
			},
			{
				Name: "Ritual book: " + GetRitualSpell(3),
				Price: "500 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Contains a 3rd-level ritual spell; can be copied"
			},
			{
				Name: "Scroll: " + Spells0(),
				Price: "50 gp",
				Quantity: Roll(1,4) * 5,
				Page: "DMG 200",
				Notes: "-"
			},
			{
				Name: "Scroll: " + Spells1(),
				Price: "50 gp",
				Quantity: Roll(1,4) * 4,
				Page: "DMG 200",
				Notes: "-"
			},
			{
				Name: "Scroll: " + Spells2(),
				Price: "250 gp",
				Quantity: Roll(1,4) * 4,
				Page: "DMG 200",
				Notes: "-"
			},
			{
				Name: "Scroll: " + Spells3(),
				Price: "250 gp",
				Quantity: Roll(1,4) * 3,
				Page: "DMG 200",
				Notes: "-"
			},
			{
				Name: "Spell: Identify",
				Price: "20 gp",
				Quantity: "3 spells/ day",
				Page: "PHB 252",
				Notes: "Tells you the properties of a magic item"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Calligrapher's supplies",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Case, scroll",
				Price: "1 gp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Ink",
				Price: "10 gp / ounce",
				Quantity: Roll(1,4) * 10 + " ounces",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Ink pen",
				Price: "2 cp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Parchment",
				Price: "1 sp / sheet",
				Quantity: Roll(1,4) * 20 + " sheets",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Spellbook, blank",
				Price: "50 gp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Spell scroll, fake",
				Price: "25 sp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "A DC 10 Investigation check reveals it is fake"
			}]);
			break;
		}
		return items;
	},
	"Thieving Supplies": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Cloak of elvenkind",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 158",
				Notes: "-"
			},
			{
				Name: "Dagger of venom",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 167",
				Notes: "-"
			},
			{
				Name: "Gloves of thievery",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 172",
				Notes: "-"
			},
			{
				Name: "Wyvern poison",
				Price: "1,200 gp / dose",
				Quantity: Roll(1,4) + " - 2 doses",
				Page: "DMG 258",
				Notes: "Injury; can inflict Roll(1,6) poison damage"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Crossbow, hand",
				Price: "75 gp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 149",
				Notes: "-"
			},
			{
				Name: "Dice set",
				Price: "1 sp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "Also available weighted, for triple price"
			},
			{
				Name: "Drow poison",
				Price: "200 gp / dose",
				Quantity: Roll(1,4) + " - 1 doses",
				Page: "DMG 258",
				Notes: "Injury; can render target unconscious"
			},
			{
				Name: "Eversmoking bottle",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 168",
				Notes: "-"
			},
			{
				Name: "Forgery kit",
				Price: "15 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Hat of disguise",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 173",
				Notes: "-"
			},
			{
				Name: "Playing card set",
				Price: "5 sp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 154",
				Notes: "Also available marked, for double price"
			},
			{
				Name: "Rapier",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Shortsword",
				Price: "10 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Serpent venom",
				Price: "200 gp / dose",
				Quantity: Roll(1,4) + " - 1 doses",
				Page: "DMG 258",
				Notes: "Injury; can inflict Roll(3,6) poison damage"
			},
			{
				Name: "Spyglass",
				Price: "1,000 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Ammunition",
				Price: "varies",
				Quantity: Roll(1,4) * 50 + " pieces",
				Page: "PHB 150",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Crowbar",
				Price: "2 gp",
				Quantity: Roll(1,4) * 3,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Caltrops",
				Price: "1 gp / 20",
				Quantity: Roll(1,4) * 40,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Dagger",
				Price: "2 gp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 149",
				Notes: "-"
			},
			{
				Name: "Disguise kit",
				Price: "25 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Poison, basic",
				Price: "100 gp / vial",
				Quantity: Roll(1,4) + "x2 vials",
				Page: "PHB 150",
				Notes: "Injury; can inflict Roll(1,4) poison damage"
			},
			{
				Name: "Poisoner's kit",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Shortbow",
				Price: "25 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 149",
				Notes: "-"
			},
			{
				Name: "Signal whistle",
				Price: "5 cp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Thieves' tools",
				Price: "25 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Climber's kit",
				Price: "25 gp",
				Quantity: Roll(1,4) + 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Grappling hook",
				Price: "2 gp",
				Quantity: Roll(1,4) + 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Ladder, 10-foot",
				Price: "1 sp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Rope, hempen",
				Price: "1 gp / 50 ft.",
				Quantity: Roll(1,4) * 50 + " feet",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Sack",
				Price: "1 cp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Torch",
				Price: "1 cp",
				Quantity: Roll(1,4) * 5,
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Book, 'How to Steal'",
				Price: "25 gp",
				Quantity: "Only 1, ever",
				Page: "PHB 150",
				Notes: "The outside is locked, and the inside is blank"
			}]);
			break;
		}
		return items;
	},
	"Tools": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Gnomish army knife",
				Price: "100 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Unfolds into up to 5 artisan's tools (you pick)"
			},
			{
				Name: "Gnomish tinderbox",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Can instantly set alight small flammable objects"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Alchemist's supplies",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Cobbler's tools",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Crowbar",
				Price: "2 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Glassblower's tools",
				Price: "30 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Herbalism kit",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Magnifying glass",
				Price: "100 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Navigator's tools",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Painter's supplies",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Smith's tools",
				Price: "20 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Tinker's tools",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Abacus",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Carpenter's tools",
				Price: "8 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Cook's utensils",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Fishing tackle",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Hammer, sledge",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Hand axe",
				Price: "5 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 149",
				Notes: "-"
			},
			{
				Name: "Lantern, bullseye",
				Price: "10 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Lantern, hooded",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Mason's tools",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Mirror, steel",
				Price: "5 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Potter's tools",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Tinderbox",
				Price: "5 sp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Weaver's tools",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Woodcarver's tools",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 154",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Block and tackle",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Dagger",
				Price: "2 gp",
				Quantity: Roll(1,4),
				Page: "PHB 149",
				Notes: "-"
			},
			{
				Name: "Hammer",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Ladder, 10-foot",
				Price: "1 sp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Lamp",
				Price: "1 cp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Pick, miner's",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Pole, 10-foot",
				Price: "5 cp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Spikes, iron",
				Price: "1 gp / 10",
				Quantity: Roll(1,4) * 40,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Torch",
				Price: "5 sp",
				Quantity: Roll(1,4) * 4,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Wood",
				Price: "1 cp / plank",
				Quantity: Roll(1,4) * 15 + " planks",
				Page: "-",
				Notes: "Planks measure 2 in. * 4 in. * 5 ft. each"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Bucket",
				Price: "5 cp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Shovel",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			}]);
			break;
		}
		return items;
	},
	"Vehicles and Transportation": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Carpet ofjl yin g",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 157",
				Notes: "Size of the carpet is determined by the DM"
			},
			{
				Name: "Carriage",
				Price: "100 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Chariot",
				Price: "250 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Longs hip",
				Price: "10,000 gp",
				Quantity: Roll(1,4) - 2,
				Page: "PHB 157",
				Notes: "Only sold if adjacent to a body of water"
			},
			{
				Name: "Sailing ship",
				Price: "10,000 gp",
				Quantity: Roll(1,4) - 2,
				Page: "PHB 157",
				Notes: "Only sold if adjacent to a body of water"
			},
			{
				Name: "Warhorse",
				Price: "400 gp",
				Quantity: Roll(1,4),
				Page: "MM 340",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Camel",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "MM 320",
				Notes: "-"
			},
			{
				Name: "Folding boat",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 170",
				Notes: "-"
			},
			{
				Name: "Keel boat",
				Price: "3,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 157",
				Notes: "Only sold if adjacent to a body of water"
			},
			{
				Name: "Navigator's tools",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "Only sold if adjacent to a body of water"
			},
			{
				Name: "Riding horse",
				Price: "75 gp",
				Quantity: Roll(1,4),
				Page: "MM 336",
				Notes: "-"
			},
			{
				Name: "Saddle, military",
				Price: "20 gp",
				Quantity: Roll(1,4),
				Page: "PHB 157",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Backpack",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Bedroll",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Carpenter's tools",
				Price: "8 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Cartographer's tools",
				Price: "15 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			},
			{
				Name: "Draft horse",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "MM 321",
				Notes: "-"
			},
			{
				Name: "Rowboat",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "PHB 157",
				Notes: "Only sold if adjacent to a body of water"
			},
			{
				Name: "Saddle, riding",
				Price: "10 gp",
				Quantity: Roll(1,4),
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Saddlebags",
				Price: "4 gp",
				Quantity: Roll(1,4),
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Ship's passage, ride",
				Price: "1 sp / mile",
				Quantity: "-",
				Page: "PHB 159",
				Notes: "Only sold if adjacent to a body of water"
			},
			{
				Name: "Wagon",
				Price: "35 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Woodcarver's tools",
				Price: "1 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Bit and bridle",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Cart",
				Price: "15 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Coach cab, ride",
				Price: "varies",
				Quantity: "-",
				Page: "PHB 159",
				Notes: "Within a city: 1 cp; between towns: 3 cp / mile"
			},
			{
				Name: "Feed, animal",
				Price: "5 cp / day",
				Quantity: "Roll(1,4) * 30 days",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Messenger service",
				Price: "2 cp / mile",
				Quantity: "-",
				Page: "PHB 159",
				Notes: "-"
			},
			{
				Name: "Mule",
				Price: "8 gp",
				Quantity: Roll(1,4) * 2,
				Page: "MM 333",
				Notes: "May instead be a donkey"
			},
			{
				Name: "Ox",
				Price: "15 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Pony",
				Price: "30 gp",
				Quantity: Roll(1,4) * 2,
				Page: "MM 335",
				Notes: "-"
			},
			{
				Name: "Saddle, pack",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Sled",
				Price: "20 gp",
				Quantity: Roll(1,4) - 1,
				Page: "PHB 157",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Nag horse",
				Price: "5 cp",
				Quantity: Roll(1,4),
				Page: "-",
				Notes: "Has 8 Strength and a movement speed of 20 ft."
			}]);
			break;
		}
		return items;
	},
	"Weapons": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Ammunition, +2",
				Price: "5,000 gp / 20",
				Quantity: Roll(1,4) * 10,
				Page: "DMG 150",
				Notes: "Must also pay the cost of the base ammunition"
			},
			{
				Name: "Flame tongue, any",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 170",
				Notes: "Must also pay the cost of the base weapon"
			},
			{
				Name: "Frost brand, any",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 171",
				Notes: "Must also pay the cost of the base weapon"
			},
			{
				Name: "Oathbow",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 183",
				Notes: "-"
			},
			{
				Name: "Sword of sharpness, any",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 206",
				Notes: "Must also pay the cost of the base weapon"
			},
			{
				Name: "Vicious weapon, any",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 209",
				Notes: "Must also pay the cost of the base weapon"
			},
			{
				Name: "Weapon, +2",
				Price: "5,000 gp",
				Quantity: "Only " + Roll(1,4) + " - 1, ever",
				Page: "DMG 213",
				Notes: "Must also pay the cost of the base weapon"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Ammunition, + 1",
				Price: "500 gp / 20",
				Quantity: Roll(1,4) * 20,
				Page: "DMG 150",
				Notes: "Must also pay the cost of the base ammunition"
			},
			{
				Name: "Javelin of lightning",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 178",
				Notes: "-"
			},
			{
				Name: "Martial ranged weapons",
				Price: "varies",
				Quantity: Roll(1,4) * 10,
				Page: "PHB 149",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Quiver of Ehlonna",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 189",
				Notes: "-"
			},
			{
				Name: "Ram, portable",
				Price: "4 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Sheath",
				Price: "8 gp",
				Quantity: Roll(1,4) * 2,
				Page: "-",
				Notes: "Ornate leather holster for a dagger or sword"
			},
			{
				Name: "Shield",
				Price: "10 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 145",
				Notes: "-"
			},
			{
				Name: "Weapon,+ 1",
				Price: "500 gp",
				Quantity: "Only " + Roll(1,4) + ", ever",
				Page: "DMG 213",
				Notes: "Must also pay the cost of the base weapon"
			},
			{
				Name: "Weapon of warning, any",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 213",
				Notes: "Must also pay the cost of the base weapon"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Martial melee weapons",
				Price: "varies",
				Quantity: Roll(1,4) * 10,
				Page: "PHB 149",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Quiver",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Smith's tools",
				Price: "20 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			}]);
			/* falls through */
		case "Poor":
			items = items.concat([{
				Name: "Ammunition",
				Price: "varies",
				Quantity: Roll(1,4) * 40,
				Page: "PHB 150",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Simple melee weapons",
				Price: "varies",
				Quantity: Roll(1,4) * 15,
				Page: "PHB 149",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Simple ranged weapons",
				Price: "varies",
				Quantity: Roll(1,4) * 15,
				Page: "PHB 149",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Whetstone",
				Price: "1 cp",
				Quantity: Roll(1,4) * 10,
				Page: "PHB 150",
				Notes: "-"
			}]);
			/* falls through */
		case "Atrocious":
			items = items.concat([{
				Name: "Hammer",
				Price: "1 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Pole, 10-foot",
				Price: "5 cp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			}]);
			break;
		}
		return items;
	},
	"Astral Traveller": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Cubic gate",
				Price: "500,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 160",
				Notes: "-"
			},
			{
				Name: "Iron flask",
				Price: "500,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 178",
				Notes: "Your DM decides what is within the iron flask"
			},
			{
				Name: "Spell: Astral projection",
				Price: "3,010 gp",
				Quantity: "3 spells / day",
				Page: "PHB 215",
				Notes: "Add 2,200 gp to the cost for each creature this spell affects after the first, besides the caster"
			},
			{
				Name: "Spell: Gate",
				Price: "1,310 gp",
				Quantity: "3 spells / day",
				Page: "PHB 244",
				Notes: "Opens a stable portal to another plane"
			},
			{
				Name: "Well of many worlds",
				Price: "500,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 213",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Amulet of the planes",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 150",
				Notes: "-"
			},
			{
				Name: "Cube of force",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 159",
				Notes: "-"
			},
			{
				Name: "Disintegration chamber",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Anything fully within this 1 ft. * 1 ft. * 1 ft. box is affected by a casting of the s pel I disintegrate"
			},
			{
				Name: "Gem of seeing",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 172",
				Notes: "-"
			},
			{
				Name: "Portable hole",
				Price: "5,000 gp",
				Quantity: "Only " + Roll(1,4) + " - 1, ever",
				Page: "DMG 185",
				Notes: "-"
			},
			{
				Name: "Spell: Control weather",
				Price: "640 gp",
				Quantity: "3 spells / day",
				Page: "PHB 228",
				Notes: "Changes the weather to conditions you dictate"
			},
			{
				Name: "Spell: Planar ally",
				Price: "360 gp",
				Quantity: "3 spells / day",
				Page: "PHB 265",
				Notes: "Summoned creature is free to act as it pleases"
			},
			{
				Name: "Spell: Plane shift",
				Price: "515 gp",
				Quantity: "3 spells / day",
				Page: "PHB 266",
				Notes: "Teleports to a location on a different plane"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Astral diamond",
				Price: "10,000 gp / ea.",
				Quantity: "Unlimited",
				Page: "-",
				Notes: "May be used as a valid form of currency"
			},
			{
				Name: "Bag of holding",
				Price: "500 gp",
				Quantity: "Only " + Roll(1,4) + ", ever",
				Page: "DMG 153",
				Notes: "-"
			},
			{
				Name: "Elemental compass",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Points to nearest portal to an elemental plane"
			},
			{
				Name: "Everbountiful soup kettle",
				Price: "500 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Once per day: turns 2 gal. of water into enough soup to feed 6 people"
			},
			{
				Name: "Hourglass",
				Price: "25 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Jar of preserving",
				Price: "500 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Anything in jar does not age or require food/air"
			},
			{
				Name: "Mirror, steel",
				Price: "5 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Obsidian mortar and pestle",
				Price: "250 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Can grind any non-magical item to powder in Roll(1,4) rounds"
			},
			{
				Name: "Oil of etherealness",
				Price: "2,500 gp",
				Quantity: Roll(1,4) - 1,
				Page: "DMG 183",
				Notes: "Confers the effects of the etherealness spel I"
			},
			{
				Name: "Potion of gaseous form",
				Price: "2,500 gp",
				Quantity: Roll(1,4) - 1,
				Page: "DMG 187",
				Notes: "Confers the effects of the gaseous form spel I"
			},
			{
				Name: "Potion of water breathing",
				Price: "250 gp",
				Quantity: Roll(1,4),
				Page: "DMG 188",
				Notes: "Allows you to breathe water for up to an hour"
			},
			{
				Name: "Spell: Teleport",
				Price: "490 gp",
				Quantity: "3 spells / day",
				Page: "PHB 281",
				Notes: "Teleports to a location on the same plane"
			},
			{
				Name: "Spell: Teleportation circle",
				Price: "350 gp",
				Quantity: "3 spells / day",
				Page: "PHB 281",
				Notes: "Paying 20 times the cost allows you to create a permanent teleportation circle at your location"
			}]);
			break;
		}
		return items;
	},
	"Enchantments": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Chosen legendary enchantment",
				Price: "15,000 gp",
				Quantity: "3 enchants / day",
				Page: "-",
				Notes: "Chosen from the following: " + LegendaryEnchantments.join("; ")
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Chosen minor enchantment",
				Price: "300 gp",
				Quantity: "3 enchants / day",
				Page: "-",
				Notes: "Chosen from the following: " + MinorEnchantments.join("; ")
			},
			{
				Name: "Chosen major enchantment",
				Price: "1,500 gp",
				Quantity: "3 enchants / day",
				Page: "-",
				Notes: "Chosen from the following: " + MajorEnchantments.join("; ")
			},
			{
				Name: RandomEnchantment("Legendary"),
				Price: "5,000 gp",
				Quantity: "3 enchants / day",
				Page: "-",
				Notes: "Rolled from a table"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: RandomEnchantment("Major"),
				Price: "100 gp",
				Quantity: "3 enchants / day",
				Page: "-",
				Notes: "Rolled from a table"
			},
			{
				Name: RandomEnchantment("Minor"),
				Price: "500 gp",
				Quantity: "3 enchants / day",
				Page: "-",
				Notes: "Rolled from a table"
			}]);
			break;
		}
		return items;
	},
	"Fey Bargins": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Instrument of the bards, Anstruth harp",
				Price: GetGeas(2),
				Quantity: "Only 1, ever",
				Page: "DMG 116",
				Notes: "-"
			},
			{
				Name: "Oathbow",
				Price: GetGeas(2),
				Quantity: "Only 1, ever",
				Page: "DMG 183",
				Notes: "-"
			},
			{
				Name: "Ring of invisibility",
				Price: GetGeas(3),
				Quantity: "Only 1, ever",
				Page: "DMG 191",
				Notes: "-"
			},
			{
				Name: "Scimitar of speed",
				Price: GetGeas(2),
				Quantity: "Only 1, ever",
				Page: "DMG 199",
				Notes: "-"
			},
			{
				Name: "Vorpal sword, any",
				Price: GetGeas(3),
				Quantity: "Only 1, ever",
				Page: "DMG 209",
				Notes: "-"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Cloak of displacement",
				Price: GetGeas(2),
				Quantity: "Only 1, ever",
				Page: "DMG 158",
				Notes: "-"
			},
			{
				Name: "Glamored studded leather",
				Price: GetGeas(2),
				Quantity: "Only 1, ever",
				Page: "DMG 112",
				Notes: "-"
			},
			{
				Name: "Ring of animal influence",
				Price: GetGeas(2),
				Quantity: "Only 1, ever",
				Page: "DMG 189",
				Notes: "-"
			},
			{
				Name: "Rod of the pact keeper +2",
				Price: GetGeas(2),
				Quantity: "Only 1, ever",
				Page: "DMG 191",
				Notes: "-"
			},
			{
				Name: "Warlock pact",
				Price: GetGeas(3),
				Quantity: "Unlimited",
				Page: "PHB 105",
				Notes: "Grants 1 st level of warlock class, Archfey patron"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Bag of tricks, rust",
				Price: GetGeas(1),
				Quantity: "Only 1, ever",
				Page: "DMG 154",
				Notes: "-"
			},
			{
				Name: "Boots of elven kind",
				Price: GetGeas(1),
				Quantity: "Only 1, ever",
				Page: "DMG 155",
				Notes: "-"
			},
			{
				Name: "Bracers of archery",
				Price: GetGeas(1),
				Quantity: "Only 1, ever",
				Page: "DMG 156",
				Notes: "-"
			},
			{
				Name: "Cloak of elvenkind",
				Price: GetGeas(1),
				Quantity: "Only 1, ever",
				Page: "DMG 158",
				Notes: "-"
			},
			{
				Name: "Gloves of thievery",
				Price: GetGeas(1),
				Quantity: "Only 1, ever",
				Page: "DMG 112",
				Notes: "-"
			},
			{
				Name: "Quiver of Ehlonna",
				Price: GetGeas(1),
				Quantity: "Only 1, ever",
				Page: "DMG 189",
				Notes: "-"
			},
			{
				Name: "Sentinel shield",
				Price: GetGeas(1),
				Quantity: "Only 1, ever",
				Page: "DMG 199",
				Notes: "-"
			}]);
			break;
		}
		return items;
	},
	"Magic Items": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Animated shield",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 151",
				Notes: "-"
			},
			{
				Name: "Cloak of arachnida",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 158",
				Notes: "-"
			},
			{
				Name: "Dancing sword, any",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 161",
				Notes: "-"
			},
			{
				Name: "Nolzur's marvelous pigments",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 183",
				Notes: "-"
			},
			{
				Name: "Staff of fire",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 201",
				Notes: "-"
			},
			{
				Name: "Wand of the war mage +3",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 212",
				Notes: "-"
			},
			{
				Name: "Additional items",
				Price: "varies",
				Quantity: "-",
				Page: "DMG 148",
				Notes: "Up to 5 items found on Magic Item Table H"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Bag of beans",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 152",
				Notes: "-"
			},
			{
				Name: "Broom of flying",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 156",
				Notes: "-"
			},
			{
				Name: "Crystal ball",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 159",
				Notes: "-"
			},
			{
				Name: "Deck of illusions",
				Price: "500 gp",
				Quantity: "Only 1 set, ever",
				Page: "DMG 161",
				Notes: "-"
			},
			{
				Name: "Figurine of wondrous power, ivory goats",
				Price: "5,000 gp",
				Quantity: "Only 1 set, ever",
				Page: "DMG 169",
				Notes: "-"
			},
			{
				Name: "Figurine of wondrous power, onyx dog",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 170",
				Notes: "-"
			},
			{
				Name: "Portable hole",
				Price: "5,000 gp",
				Quantity: "Only " + Roll(1,4) + " - 1, ever",
				Page: "DMG 185",
				Notes: "-"
			},
			{
				Name: "Ring of feather falling",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 193",
				Notes: "-"
			},
			{
				Name: "Ring of free action",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 191",
				Notes: "-"
			},
			{
				Name: "Ring of the ram",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 191",
				Notes: "-"
			},
			{
				Name: "Staff of charming",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 201",
				Notes: "-"
			},
			{
				Name: "Wand of magic missiles",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 211",
				Notes: "-"
			},
			{
				Name: "Wand of wonder",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 212",
				Notes: "-"
			},
			{
				Name: "Additional items",
				Price: "varies",
				Quantity: "-",
				Page: "DMG 147",
				Notes: "Up to 5 items found on Magic Item Table G"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Bag of tricks, grey",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 154",
				Notes: "-"
			},
			{
				Name: "Dust of dryness",
				Price: "250 gp",
				Quantity: "Only " + Roll(1,4) + ", ever",
				Page: "DMG 166",
				Notes: "-"
			},
			{
				Name: "Figurine of wondrous power, silver raven",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 170",
				Notes: "-"
			},
			{
				Name: "Immovable rod",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 175",
				Notes: "-"
			},
			{
				Name: "Ring of mind shielding",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 191",
				Notes: "-"
			},
			{
				Name: "Robe of useful items",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 195",
				Notes: "-"
			},
			{
				Name: "Rope of climbing",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 197",
				Notes: "-"
			},
			{
				Name: "Sending stones",
				Price: "500 gp",
				Quantity: "Only 1 set, ever",
				Page: "DMG 199",
				Notes: "-"
			},
			{
				Name: "Wind fan",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 213",
				Notes: "-"
			},
			{
				Name: "Additional items",
				Price: "varies",
				Quantity: "-",
				Page: "DMG 146",
				Notes: "Up to 5 items found on Magic Item Table F"
			}]);
			break;
		}
		return items;
	},
	"Magical Creatures": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Basilisk",
				Price: "1,000 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 24",
				Notes: "Untamed"
			},
			{
				Name: "Bulette",
				Price: "1,500 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 34",
				Notes: "Untamed"
			},
			{
				Name: "Carrion crawler",
				Price: "800 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 37",
				Notes: "Untamed"
			},
			{
				Name: "Death dog",
				Price: "800 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 321",
				Notes: "Untamed"
			},
			{
				Name: "Displacer beast",
				Price: "1,250 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 81",
				Notes: "Untamed"
			},
			{
				Name: "Dragon wyrmling",
				Price: "2,500 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 88-118",
				Notes: "Untamed; may be of any color"
			},
			{
				Name: "Gorgon",
				Price: "1,500 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 171",
				Notes: "Untamed"
			},
			{
				Name: "Manticore",
				Price: "1,000 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 213",
				Notes: "Untamed"
			},
			{
				Name: "Mimic",
				Price: "800 gp",
				Quantity: Roll(1,4),
				Page: "MM 220",
				Notes: "Untamed"
			},
			{
				Name: "Otyugh",
				Price: "1,250 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 248",
				Notes: "Untamed"
			},
			{
				Name: "Rust monster",
				Price: "800 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 262",
				Notes: "Untamed"
			},
			{
				Name: "Unicorn",
				Price: "1,750 gp",
				Quantity: Roll(1,4) - 2,
				Page: "MM 294",
				Notes: "Untamed, except to those pure of heart"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Awakened shrub",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "MM 317",
				Notes: "-"
			},
			{
				Name: "Blink dog",
				Price: "250 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 318",
				Notes: "-"
			},
			{
				Name: "Cockatrice",
				Price: "650 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 42",
				Notes: "Untamed"
			},
			{
				Name: "Dragon egg",
				Price: "750 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Hatches with proper care after 90 days"
			},
			{
				Name: "Gelatinous cube",
				Price: "300 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 242",
				Notes: "Untamed"
			},
			{
				Name: "Giant bat",
				Price: "250 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 323",
				Notes: "-"
			},
			{
				Name: "Giant eagle",
				Price: "500 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 324",
				Notes: "-"
			},
			{
				Name: "Giant sea horse",
				Price: "500 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 328",
				Notes: "Only sold if adjacent to a body of water"
			},
			{
				Name: "Griffon",
				Price: "750 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 174",
				Notes: "-"
			},
			{
				Name: "Owlbear",
				Price: "750 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 249",
				Notes: "Untamed"
			},
			{
				Name: "Pegasus",
				Price: "750 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 250",
				Notes: "-"
			},
			{
				Name: "Pseudodragon",
				Price: "175 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 254",
				Notes: "-"
			},
			{
				Name: "Worg",
				Price: "300 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 341",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Bit and bridle",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Dire wolf",
				Price: "450 gp",
				Quantity: Roll(1,4),
				Page: "MM 321",
				Notes: "-"
			},
			{
				Name: "Elk",
				Price: "60 gp",
				Quantity: Roll(1,4),
				Page: "MM 322",
				Notes: "-"
			},
			{
				Name: "Feed, animal",
				Price: "5 cp / day",
				Quantity: Roll(1,4) * 30 + " days",
				Page: "PHB 157",
				Notes: "-"
			},
			{
				Name: "Flying snake",
				Price: "2 gp",
				Quantity: Roll(1,4),
				Page: "MM 322",
				Notes: "-"
			},
			{
				Name: "Giant fire beetle",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "MM 325",
				Notes: "-"
			},
			{
				Name: "Giant goat",
				Price: "300 gp",
				Quantity: Roll(1,4),
				Page: "MM 326",
				Notes: "-"
			},
			{
				Name: "Giant lizard",
				Price: "350 gp",
				Quantity: Roll(1,4),
				Page: "MM 326",
				Notes: "-"
			},
			{
				Name: "Giant wolf spider",
				Price: "400 gp",
				Quantity: Roll(1,4) - 1,
				Page: "MM 330",
				Notes: "-"
			},
			{
				Name: "Saddle, exotic",
				Price: "60 gp",
				Quantity: Roll(1,4) + 1,
				Page: "PHB 157",
				Notes: "-"
			}]);
			break;
		}
		return items;
	},
	"Necromancy": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Manual of golems, flesh",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 180",
				Notes: "-"
			},
			{
				Name: "Potion of longevity",
				Price: "25,000 gp",
				Quantity: "Only " + Roll(1,4) + ", ever",
				Page: "DMG 188",
				Notes: "Reduces your age by Roll(1,6) + 6 years, usually"
			},
			{
				Name: "Spell: Clone",
				Price: "2,840 gp",
				Quantity: "3 spells / day",
				Page: "PHB 222",
				Notes: "Safeguards against death after 120 days"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Amulet of health",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 150",
				Notes: "-"
			},
			{
				Name: "Cloak of the bat",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 159",
				Notes: "-"
			},
			{
				Name: "Bottomless bag of bones",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Contains an unlimited number of corpses only for use as raised minions in necromancy spells"
			},
			{
				Name: "Mask, plague doctor",
				Price: "50 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Durable leather, with a long beak"
			},
			{
				Name: "Mask, skull",
				Price: "45 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Made of actual bone"
			},
			{
				Name: "Pipes of haunting",
				Price: "500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 185",
				Notes: "-"
			},
			{
				Name: "Spell: Create undead",
				Price: "1,260 gp",
				Quantity: "3 spells/ day",
				Page: "PHB 229",
				Notes: "6th level; dead follow your commands for a day"
			},
			{
				Name: "Spell: Resurrection",
				Price: "2,490 gp",
				Quantity: "3 spells/ day",
				Page: "PHB 272",
				Notes: "More potent way of restoring the dead to life"
			},
			{
				Name: "Wand of fear",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 210",
				Notes: "-"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Acid",
				Price: "25 gp / vial",
				Quantity: Roll(1,4) * 5 + " vials",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Arcane focus",
				Price: "varies",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Dust of dryness",
				Price: "250 gp",
				Quantity: "Only " + Roll(1,4) + ", ever",
				Page: "DMG 166",
				Notes: "-"
			},
			{
				Name: "Candle",
				Price: "1 cp",
				Quantity: Roll(1,4) * 10,
				Page: "PHB 150",
				Notes: "Comes in black, grey, white, or red"
			},
			{
				Name: "Chain",
				Price: "5 gp / 10 feet",
				Quantity: Roll(1,4) * 20 + " feet",
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Chalk",
				Price: "1 cp / piece",
				Quantity: Roll(1,4) * 10 + " pieces",
				Page: "PHB 150",
				Notes: "Comes in black, grey, white, or red"
			},
			{
				Name: "Component pouch",
				Price: "25 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Corpse, dead",
				Price: "4 gp",
				Quantity: Roll(1,4) * 4,
				Page: "-",
				Notes: "An intact corpse perfect for necromancy"
			},
			{
				Name: "Dagger, ritual",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 148",
				Notes: "Has an oddly curved design"
			},
			{
				Name: "Flesh",
				Price: "1 sp / lb.",
				Quantity: Roll(1,4) * 20 + "lbs.",
				Page: "-",
				Notes: "Best not to ask ..."
			},
			{
				Name: "Holy symbol",
				Price: "varies",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "Prices are as listed in the PHB"
			},
			{
				Name: "Hourglass",
				Price: "25 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Incense",
				Price: "1 sp / block",
				Quantity: Roll(1,4) * 20 + " blocks",
				Page: "-",
				Notes: "Thick, musky, and pungent"
			},
			{
				Name: "Lock",
				Price: "10 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Manacles",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Poison, basic",
				Price: "100 gp / vial",
				Quantity: Roll(1,4) + " vials",
				Page: "PHB 150",
				Notes: "Injury; can inflict Roll(1,4) poison damage"
			},
			{
				Name: "Shovel",
				Price: "2 gp",
				Quantity: Roll(1,4) * 2,
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Spell: Animate dead",
				Price: "90 gp",
				Quantity: "3 spells/ day",
				Page: "PHB 212",
				Notes: "3rd level; dead follow your commands for a day"
			},
			{
				Name: "Spell: Gentle repose",
				Price: "40 gp",
				Quantity: "3 spells/ day",
				Page: "PHB 245",
				Notes: "Stops decay in a corpse, prevents undeath"
			},
			{
				Name: "Spell: Raise dead",
				Price: "1,250 gp",
				Quantity: "3 spells/ day",
				Page: "PHB 270",
				Notes: "Returns a dead corpse to life"
			},
			{
				Name: "Spell: Speak with dead",
				Price: "90 gp",
				Quantity: "3 spells/ day",
				Page: "PHB 277",
				Notes: "Allows you to speak to one non-undead corpse"
			},
			{
				Name: "Spellbook, blank",
				Price: "50 gp",
				Quantity: Roll(1,4),
				Page: "PHB 150",
				Notes: "-"
			},
			{
				Name: "Weaver's tools",
				Price: "1 gp",
				Quantity: Roll(1,4),
				Page: "PHB 154",
				Notes: "-"
			}]);
			break;
		}
		return items;
	},
	"Needful Things": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Instrument of the bards, ollamh harp",
				Price: "500,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 176",
				Notes: "-"
			},
			{
				Name: "Iron flask",
				Price: "500,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 178",
				Notes: "Your DM decides what is within the iron flask"
			},
			{
				Name: "Talisman of ultimate evil",
				Price: "500,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 207",
				Notes: "-"
			},
			{
				Name: "Any desired item",
				Price: "varies, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: Roll(1,4) + " additional items",
				Page: "-",
				Notes: "Whatever the purchaser desires, of any quality"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Belt of giant strength, fire",
				Price: "50,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 155",
				Notes: "-"
			},
			{
				Name: "Demon armor",
				Price: "50,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 167",
				Notes: "-"
			},
			{
				Name: "Figurine of wondrous power, obsidian steed",
				Price: "50,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 170",
				Notes: "-"
			},
			{
				Name: "loun stone, intellect",
				Price: "50,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 176",
				Notes: "-"
			},
			{
				Name: "Any desired item",
				Price: "varies, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: Roll(1,4) + " additional items",
				Page: "-",
				Notes: "Item quality no greater than very rare"
			},
			{
				Name: "Warlock pact",
				Price: "50,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors) + " They must also " + randomChoice(InconsequentialFavors),
				Quantity: "Unlimited",
				Page: "PHB 105",
				Notes: "Grants 1 st level of warlock class, Fiend patron"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Bag of holding",
				Price: "500 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors),
				Quantity: "Only " + Roll(1,4) + ", ever",
				Page: "DMG 153",
				Notes: "-"
			},
			{
				Name: "Bag of tricks, tan",
				Price: "500 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 154",
				Notes: "-"
			},
			{
				Name: "Daern's instant fortress",
				Price: "5,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 160",
				Notes: "-"
			},
			{
				Name: "Iron bands of Bilarro",
				Price: "5,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 177",
				Notes: "-"
			},
			{
				Name: "Mace of terror",
				Price: "5,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 180",
				Notes: "-"
			},
			{
				Name: "Rod of rulership",
				Price: "5,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 197",
				Notes: "-"
			},
			{
				Name: "Sword of life stealing",
				Price: "5,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 206",
				Notes: "-"
			},
			{
				Name: "Wand offi reballs",
				Price: "5,000 gp, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors),
				Quantity: "Only 1, ever",
				Page: "DMG 210",
				Notes: "-"
			},
			{
				Name: "Any desired item",
				Price: "varies, reduced by half if the buyer does the following: " + randomChoice(InconsequentialFavors),
				Quantity: Roll(1,4) + " additional items",
				Page: "-",
				Notes: "Item quality no greater than rare"
			}]);
			break;
		}
		return items;
	},
	"Time-Lost": function(useSeed, name, type, location, quality) {
		if (useSeed) {
			Math.seedrandom(name + type + location);
		} else {
			Math.seedrandom(new Date());
		}
		var items = [];
		switch (quality) {
		case "Excellent":
			items = items.concat([{
				Name: "Antimatter rifle",
				Price: "6,500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 268",
				Notes: "Tech (4)"
			},
			{
				Name: "Apparatus of Kwalish",
				Price: "500,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 159",
				Notes: "-"
			},
			{
				Name: "Cloak of invisibility",
				Price: "500,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 158",
				Notes: "-"
			},
			{
				Name: "Grenade launcher",
				Price: "5,500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 268",
				Notes: "Tech (4)"
			},
			{
				Name: "Screwdriver, acoustic",
				Price: "1,250 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Tech (3); Grants adv. on thieves' tools checks"
			},
			{
				Name: "Tome of clear thought",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 208",
				Notes: "Title: 'Introduction to Quantum Physics'"
			},
			{
				Name: "Tome of understanding",
				Price: "50,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 209",
				Notes: "Title: 'Farmer's Almanac'"
			}]);
			/* falls through */
		case "Good":
			items = items.concat([{
				Name: "Bead of force",
				Price: "5,000 gp / 6",
				Quantity: "Only 6, ever",
				Page: "DMG 154",
				Notes: "-"
			},
			{
				Name: "Boots of levitation",
				Price: "5,000 gp",
				Quantity: "Only 1 set, ever",
				Page: "DMG 155",
				Notes: "-"
			},
			{
				Name: "Cube of force",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 151",
				Notes: "-"
			},
			{
				Name: "Goggles of night",
				Price: "5,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 172",
				Notes: "-"
			},
			{
				Name: "Grenade, fragmentation",
				Price: "300 gp / each",
				Quantity: Roll(l,4) * 2,
				Page: "DMG 268",
				Notes: Tech (2)
			},
			{
				Name: "Grenade, smoke",
				Price: "250 gp / each",
				Quantity: Roll(1,4) * 2,
				Page: "DMG 268",
				Notes: "Tech (2)"
			},
			{
				Name: "Jetpack",
				Price: "3,500 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Tech (4)"
			},
			{
				Name: "Laser pistol",
				Price: "3,000 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 268",
				Notes: "Tech (4)"
			},
			{
				Name: "Laser rifle",
				Price: "4,500 gp",
				Quantity: "Only 1, ever",
				Page: "DMG 268",
				Notes: "Tech (4)"
			}]);
			/* falls through */
		case "Medium":
			items = items.concat([{
				Name: "Calculator",
				Price: "60 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Tech (2); performs mathematical functions"
			},
			{
				Name: "Electric torch",
				Price: "50 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Tech (l)"
			},
			{
				Name: "Entertainment pad",
				Price: "150 gp",
				Quantity: Roll(1,4) - 1,
				Page: "-",
				Notes: "Tech (3)"
			},
			{
				Name: "Energy cell",
				Price: "15 gp / each",
				Quantity: Roll(1,4) * 4,
				Page: "DMG 268",
				Notes: "-"
			},
			{
				Name: "Sending stones",
				Price: "500 gp",
				Quantity: "Only 1 set, ever",
				Page: "DMG 199",
				Notes: "Made of a strange, smooth, colored substance"
			},
			{
				Name: "Wristwatch",
				Price: "55 gp",
				Quantity: "Only 1, ever",
				Page: "-",
				Notes: "Reliably tells the time of day, runs on motion"
			}]);
			break;
		}
		return items;
	}
};