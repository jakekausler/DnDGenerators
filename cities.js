function kingdomName()
{
  var sKingdom = document.formDomesday.kingdom_name.value;
  document.formDomesday.kingdom_001.value = sKingdom;
  document.formDomesday.kingdom_002.value = sKingdom;
  document.formDomesday.kingdom_003.value = sKingdom;
  document.formDomesday.kingdom_004.value = sKingdom;
  document.formDomesday.kingdom_005.value = sKingdom;
  document.formDomesday.kingdom_006.value = sKingdom;
  document.formDomesday.kingdom_007.value = sKingdom;
}

function hexareaCalc()
{
  document.formDomesday.hexarea_km2.value = Math.round(Math.pow(document.formDomesday.hexwidth_km.value * 0.9305347,2));
  if (document.formDomesday.hexarea_km2.value > 0)
  {
    if ((document.formDomesday.kingdomarea_km2.value / document.formDomesday.hexarea_km2.value) >= 1)
    {
      document.formDomesday.kingdomhexes.value = Math.round(document.formDomesday.kingdomarea_km2.value / document.formDomesday.hexarea_km2.value);
    }
    else
    {
      document.formDomesday.kingdomhexes.value = Math.round(10*(document.formDomesday.kingdomarea_km2.value / document.formDomesday.hexarea_km2.value))/10;
    }
  }
  else
  {
    document.formDomesday.kingdomhexes.value = 0;
  }
  populationCalc();
}

function populationCalc()
{
  document.formDomesday.pop_kingdom.value = (document.formDomesday.density_km2.options[document.formDomesday.density_km2.selectedIndex].value * document.formDomesday.kingdomarea_km2.value);
  document.formDomesday.arable_km2.value = parseInt(document.formDomesday.pop_kingdom.value / 69.5);
  document.formDomesday.wilderness_km2.value = parseInt(document.formDomesday.kingdomarea_km2.value) - parseInt(document.formDomesday.arable_km2.value);
  document.formDomesday.arable_percent.value = (parseInt((parseInt(document.formDomesday.arable_km2.value) / parseInt(document.formDomesday.kingdomarea_km2.value)) * 100) + "%");

  if (document.formDomesday.pop_kingdom.value < 20)
  {
    document.formDomesday.pop_villages.value = 0;
    document.formDomesday.pop_towns.value = 0;
    document.formDomesday.pop_cities.value = 0;
    document.formDomesday.pop_bigcities.value = 0;
  }
  else if (document.formDomesday.pop_kingdom.value < 15000)
  {
    document.formDomesday.pop_villages.value = parseInt(document.formDomesday.pop_kingdom.value * .98);
    document.formDomesday.pop_towns.value = 0;
    document.formDomesday.pop_cities.value = 0;
    document.formDomesday.pop_bigcities.value = 0;
  }
  else if (document.formDomesday.pop_kingdom.value < 300000)
  {
    document.formDomesday.pop_villages.value = parseInt(document.formDomesday.pop_kingdom.value * .89);
    document.formDomesday.pop_towns.value = parseInt(document.formDomesday.pop_kingdom.value * .09);
    document.formDomesday.pop_cities.value = 0;
    document.formDomesday.pop_bigcities.value = 0;
  }
  else if (document.formDomesday.pop_kingdom.value < 2400000)
  {
    document.formDomesday.pop_villages.value = parseInt(document.formDomesday.pop_kingdom.value * .89);
    document.formDomesday.pop_towns.value = parseInt(document.formDomesday.pop_kingdom.value * .06);
    document.formDomesday.pop_cities.value = parseInt(document.formDomesday.pop_kingdom.value * .03);
    document.formDomesday.pop_bigcities.value = 0;
  }
  else
  {
    document.formDomesday.pop_villages.value = parseInt(document.formDomesday.pop_kingdom.value * .89);
    document.formDomesday.pop_towns.value = parseInt(document.formDomesday.pop_kingdom.value * .06);
    document.formDomesday.pop_cities.value = parseInt(document.formDomesday.pop_kingdom.value * .025);
    document.formDomesday.pop_bigcities.value = parseInt(document.formDomesday.pop_kingdom.value * .005);
  }
  document.formDomesday.pop_hermits.value = document.formDomesday.pop_kingdom.value - (parseInt(document.formDomesday.pop_villages.value) + parseInt(document.formDomesday.pop_towns.value) + parseInt(document.formDomesday.pop_cities.value) + parseInt(document.formDomesday.pop_bigcities.value));

  document.formDomesday.num_villages.value = Math.ceil(document.formDomesday.pop_villages.value / 450);
  document.formDomesday.num_towns.value = Math.ceil(document.formDomesday.pop_towns.value / 5000);
  document.formDomesday.num_cities.value = Math.ceil(document.formDomesday.pop_cities.value / 12000);
  if (Math.sqrt(document.formDomesday.pop_kingdom.value) > 0)
  {
    document.formDomesday.num_bigcities.value = Math.ceil(document.formDomesday.pop_bigcities.value / (Math.sqrt(document.formDomesday.pop_kingdom.value) * 15));
  }
  else
  {
    document.formDomesday.num_bigcities.value = 0;
  }

  if (document.formDomesday.num_villages.value > 1)
  {
    document.formDomesday.dist_villages.value = Math.round(Math.sqrt(document.formDomesday.kingdomarea_km2.value / document.formDomesday.num_villages.value));
  }
  else
  {
    document.formDomesday.dist_villages.value = "N/A";
  }

  if (document.formDomesday.num_towns.value > 1)
  {
    document.formDomesday.dist_towns.value = Math.round(Math.sqrt(document.formDomesday.kingdomarea_km2.value / document.formDomesday.num_towns.value));
  }
  else
  {
    document.formDomesday.dist_towns.value = "N/A";
  }

  if (document.formDomesday.num_cities.value > 1)
  {
    document.formDomesday.dist_cities.value = Math.round(Math.sqrt(document.formDomesday.kingdomarea_km2.value / (parseInt(document.formDomesday.num_cities.value) + parseInt(document.formDomesday.num_bigcities.value))));
  }
  else
  {
    document.formDomesday.dist_cities.value = "N/A";
  }

  if (document.formDomesday.pop_kingdom.value >= 27300000)
  {
    document.formDomesday.num_universities.value = parseInt(document.formDomesday.pop_kingdom.value / 27300000);
  }
  else
  {
    document.formDomesday.num_universities.value = 0;
  }

  document.formDomesday.num_livestock.value = parseInt(document.formDomesday.pop_kingdom.value * 2.2);
  document.formDomesday.num_fowl.value = parseInt(document.formDomesday.num_livestock.value * .68);
  document.formDomesday.num_meat.value = parseInt(document.formDomesday.num_livestock.value) - parseInt(document.formDomesday.num_fowl.value);

  castleCalc();
}

function cityDesc()
{
  city_description = document.formDomesday.cities.options[document.formDomesday.cities.selectedIndex].value;
  document.formDomesday.city_text.value = city_description;
  return true;
}

function businessAutoCalc()
{
  document.formDomesday.pop_business.value=document.formDomesday.pop_city.options[document.formDomesday.pop_city.selectedIndex].value;
  businessCalc();
}

function roundOrPercent(bizPercent)
{
  if (bizPercent < 1)
  {
    bizPercent = Math.round(bizPercent * 100) + "%";
  }
  else
  {
    bizPercent = Math.round(bizPercent);
  }
  return bizPercent;
}

function businessCalc()
{
  var iCityDensity = 15000
  var iCityArea = (document.formDomesday.pop_business.value / iCityDensity)
  if (iCityArea < 1)
  {
    document.formDomesday.citysize_km2.value = Math.ceil(iCityArea * 100) / 100;
  }
  else
  {
    document.formDomesday.citysize_km2.value = Math.ceil(iCityArea * 10) / 10;
  }
  document.formDomesday.citysize_acres.value = Math.ceil(iCityArea * 1000000 / 4047);

  document.formDomesday.num_thugs.value = roundOrPercent(document.formDomesday.pop_business.value * document.formDomesday.thug_zeal.options[document.formDomesday.thug_zeal.selectedIndex].value / 150 );

  document.formDomesday.num_clergy.value = roundOrPercent(document.formDomesday.pop_business.value / 40);
  document.formDomesday.num_shoemakers.value = roundOrPercent(document.formDomesday.pop_business.value / 150);
  document.formDomesday.num_nobles.value = roundOrPercent(document.formDomesday.pop_business.value / 200);
  document.formDomesday.num_furriers.value = roundOrPercent(document.formDomesday.pop_business.value / 250);
  document.formDomesday.num_maidservants.value = roundOrPercent(document.formDomesday.pop_business.value / 250);
  document.formDomesday.num_tailors.value = roundOrPercent(document.formDomesday.pop_business.value / 250);
  document.formDomesday.num_barbers.value = roundOrPercent(document.formDomesday.pop_business.value / 350);
  document.formDomesday.num_jewelers.value = roundOrPercent(document.formDomesday.pop_business.value / 400);
  document.formDomesday.num_taverns.value = roundOrPercent(document.formDomesday.pop_business.value / 400);
  document.formDomesday.num_oldclothes.value = roundOrPercent(document.formDomesday.pop_business.value / 400);
  document.formDomesday.num_pastrycooks.value = roundOrPercent(document.formDomesday.pop_business.value / 500);
  document.formDomesday.num_masons.value = roundOrPercent(document.formDomesday.pop_business.value / 500);
  document.formDomesday.num_carpenters.value = roundOrPercent(document.formDomesday.pop_business.value / 550);
  document.formDomesday.num_weavers.value = roundOrPercent(document.formDomesday.pop_business.value / 600);
  document.formDomesday.num_lawyers.value = roundOrPercent(document.formDomesday.pop_business.value / 650);
  document.formDomesday.num_chandlers.value = roundOrPercent(document.formDomesday.pop_business.value / 700);
  document.formDomesday.num_mercers.value = roundOrPercent(document.formDomesday.pop_business.value / 700);
  document.formDomesday.num_coopers.value = roundOrPercent(document.formDomesday.pop_business.value / 700);
  document.formDomesday.num_woodsellers.value = roundOrPercent(document.formDomesday.pop_business.value / 700);
  document.formDomesday.num_bakers.value = roundOrPercent(document.formDomesday.pop_business.value / 800);
  document.formDomesday.num_watercarriers.value = roundOrPercent(document.formDomesday.pop_business.value / 850);
  document.formDomesday.num_scabbardmakers.value = roundOrPercent(document.formDomesday.pop_business.value / 850);
  document.formDomesday.num_winesellers.value = roundOrPercent(document.formDomesday.pop_business.value / 900);
  document.formDomesday.num_hatmakers.value = roundOrPercent(document.formDomesday.pop_business.value / 950);
  document.formDomesday.num_saddlers.value = roundOrPercent(document.formDomesday.pop_business.value / 1000);
  document.formDomesday.num_chickenbutchers.value = roundOrPercent(document.formDomesday.pop_business.value / 1000);
  document.formDomesday.num_pursemakers.value = roundOrPercent(document.formDomesday.pop_business.value / 1100);
  document.formDomesday.num_butchers.value = roundOrPercent(document.formDomesday.pop_business.value / 1200);
  document.formDomesday.num_fishmongers.value = roundOrPercent(document.formDomesday.pop_business.value / 1200);
  document.formDomesday.num_priests.value = roundOrPercent(document.formDomesday.pop_business.value / 1200);
  document.formDomesday.num_beersellers.value = roundOrPercent(document.formDomesday.pop_business.value / 1400);
  document.formDomesday.num_bucklemakers.value = roundOrPercent(document.formDomesday.pop_business.value / 1400);
  document.formDomesday.num_plasterers.value = roundOrPercent(document.formDomesday.pop_business.value / 1400);
  document.formDomesday.num_spicemerchants.value = roundOrPercent(document.formDomesday.pop_business.value / 1400);
  document.formDomesday.num_blacksmiths.value = roundOrPercent(document.formDomesday.pop_business.value / 1500);
  document.formDomesday.num_painters.value = roundOrPercent(document.formDomesday.pop_business.value / 1500);
  document.formDomesday.num_doctors.value = roundOrPercent(document.formDomesday.pop_business.value / 1700);
  document.formDomesday.num_roofers.value = roundOrPercent(document.formDomesday.pop_business.value / 1800);
  document.formDomesday.num_locksmiths.value = roundOrPercent(document.formDomesday.pop_business.value / 1900);
  document.formDomesday.num_bathers.value = roundOrPercent(document.formDomesday.pop_business.value / 1900);
  document.formDomesday.num_ropemakers.value = roundOrPercent(document.formDomesday.pop_business.value / 1900);
  document.formDomesday.num_inns.value = roundOrPercent(document.formDomesday.pop_business.value / 2000);
  document.formDomesday.num_tanners.value = roundOrPercent(document.formDomesday.pop_business.value / 2000);
  document.formDomesday.num_copyists.value = roundOrPercent(document.formDomesday.pop_business.value / 2000);
  document.formDomesday.num_sculptors.value = roundOrPercent(document.formDomesday.pop_business.value / 2000);
  document.formDomesday.num_rugmakers.value = roundOrPercent(document.formDomesday.pop_business.value / 2000);
  document.formDomesday.num_harnessmakers.value = roundOrPercent(document.formDomesday.pop_business.value / 2000);
  document.formDomesday.num_bleachers.value = roundOrPercent(document.formDomesday.pop_business.value / 2100);
  document.formDomesday.num_haymerchants.value = roundOrPercent(document.formDomesday.pop_business.value / 2300);
  document.formDomesday.num_cutlers.value = roundOrPercent(document.formDomesday.pop_business.value / 2300);
  document.formDomesday.num_glovemakers.value = roundOrPercent(document.formDomesday.pop_business.value / 2400);
  document.formDomesday.num_woodcarvers.value = roundOrPercent(document.formDomesday.pop_business.value / 2400);
  document.formDomesday.num_apothecaries.value = roundOrPercent(document.formDomesday.pop_business.value / 2800);
  document.formDomesday.num_bookbinders.value = roundOrPercent(document.formDomesday.pop_business.value / 3000);
  document.formDomesday.num_illuminators.value = roundOrPercent(document.formDomesday.pop_business.value / 3900);
  document.formDomesday.num_booksellers.value = roundOrPercent(document.formDomesday.pop_business.value / 6300);
}

function castleCalc()
{
  document.formDomesday.num_ruins.value = Math.round((document.formDomesday.pop_kingdom.value / 5000000) * (Math.sqrt(document.formDomesday.age_kingdom.value)));
  document.formDomesday.num_castles.value = Math.round(document.formDomesday.pop_kingdom.value / 50000);
  document.formDomesday.num_allcastles.value = parseInt(document.formDomesday.num_castles.value) + parseInt(document.formDomesday.num_ruins.value);
  document.formDomesday.num_civcastles.value = Math.round(document.formDomesday.num_allcastles.value * .75);
  document.formDomesday.num_wildcastles.value = parseInt(document.formDomesday.num_allcastles.value) - parseInt(document.formDomesday.num_civcastles.value);
}

function initialize()
{
  hexareaCalc();
  populationCalc();
  businessAutoCalc();
  castleCalc();
  cityDesc();
}
