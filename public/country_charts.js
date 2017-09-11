// Constructor
var CountryCharts = function(){
  // console.log('CountryCharts object created...');
}

// Methods
CountryCharts.prototype = {

  display: function(country, countries){
    // console.log('display...');

    console.log(country); 

    var countryData = this.getCountryData(country);
    var borderCountriesData = this.getBorderCountriesData(country, countries);
    var subregionCountriesData = this.getSubregionCountriesData(country, countries);

    new Chart('Country & Bordering Countries - Areas(km2)', countryData, borderCountriesData, 'area', 'pie', '#pie-chart1');
    new Chart('Country & Bordering Countries - Populations', countryData, borderCountriesData, 'population', 'pie', '#pie-chart2');
    new Chart('SubRegion Country Populations', countryData, subregionCountriesData, 'population', 'column', '#column-chart')
  },

  getCountryData: function(country){
    //console.log('getCountryData...');
    return {
      name: country.name,
      population: country.population,
      area: country.area,
      subregion: country.subregion
    }
  },

  getBorderCountriesData: function(country, countries){
    //console.log('getBorderCountriesData...');
    var data = new Array;
    country.borders.forEach(function(borderer){
      for (var country of countries){
        if (country.alpha3Code === borderer){     
          var details = {
            name: country.name,
            population: country.population,
            area: country.area
          }
          data.push(details);
          break;
        }
      }
    });
    return data;
  },

  getSubregionCountriesData: function(country, countries){
    //console.log('getBorderCountriesData...');
    var data = new Array;
    var subregionName = country.subregion
    for (var country of countries){
      if (country.subregion === subregionName){     
        var details = {
          name: country.name,
          population: country.population,
          area: country.area
        }
      data.push(details);
      }
    }
    return data;
  }
}