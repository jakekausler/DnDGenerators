var GetNextWeather = function(wetness, averageTemperature, watch, advanceBy, previousWeather) {
	while (advanceBy > 0) {
		watch += 1;
		if (watch > 5) {
			watch = 0;
		}
		previousWeather = {
			wind: GetNextWind(previousWeather.wind),
	        precipitation: GetNextPrecipitation(wetness, previousWeather.precipitation),
	        temperature: GetNextTemperature(wetness, averageTemperature, watch)
		};
		advanceBy -= 1;
	}
	return previousWeather;
};

var GetNextWind = function(previousWind) {
	var wind = previousWind + Math.floor((Roll(1,8)+Roll(1,12)-12)/4);
	if (wind < 0) {
		wind = 0;
	} else if (wind > 7) {
		wind = 7;
	}
	return wind;
};

var GetNextPrecipitation = function(wetness, previousPrecipitation) {
	var rain;
	switch (wetness) {
	case "Arid":
		rain = previousPrecipitation + Math.floor((Roll(1,8)+Roll(1,12)-17)/3);
		break;
	case "Temperate":
		rain = previousPrecipitation + Math.floor((Roll(1,8)+Roll(1,12)-12)/3);
		break;
	case "Muggy":
		rain = previousPrecipitation + Math.floor((Roll(1,8)+Roll(2,12)-16)/6);
		break;
	case "Sea":
		rain = previousPrecipitation + Math.floor((Roll(2,8)+Roll(2,12)-21)/5);
		break;
	}
	if (rain < 0) {
		rain = 0;
	} else if (rain > 7) {
		rain = 7;
	}
	return rain;
};

var GetNextTemperature = function(wetness, averageTemperature, watch) {
	switch (wetness) {
	case "Arid":
		switch (watch) {
		case 0:
		case 5:
			return averageTemperature - Roll(3,8) - Roll(3,12);
		case 1:
		case 4:
			return averageTemperature + Roll(3,8) + Roll(3,12) - 33;
		case 2:
		case 3:
			return averageTemperature + Roll(3,8) + Roll(3,12);
		}
		break;
	case "Temperate":
		switch (watch) {
		case 0:
		case 5:
			return averageTemperature - Roll(2,8) - Roll(2,12);
		case 1:
		case 4:
			return averageTemperature + Roll(2,8) + Roll(2,12) - 22;
		case 2:
		case 3:
			return averageTemperature + Roll(2,8) + Roll(2,12);
		}
		break;
	case "Muggy":
		switch (watch) {
		case 0:
		case 5:
			return averageTemperature - Roll(1,8) - Roll(1,12);
		case 1:
		case 4:
			return averageTemperature + Roll(1,8) + Roll(1,12) - 11;
		case 2:
		case 3:
			return averageTemperature + Roll(1,8) + Roll(1,12);
		}
		break;
	case "Sea":
		switch (watch) {
		case 0:
		case 5:
			return averageTemperature - Roll(1,8);
		case 1:
		case 4:
			return averageTemperature + Roll(1,8) - 4;
		case 2:
		case 3:
			return averageTemperature + Roll(1,8);
		}
		break;
	}
};