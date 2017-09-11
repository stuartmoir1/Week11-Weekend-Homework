window.addEventListener('load', function(){

  var countrySelectView = new CountrySelectView(document.querySelector('#country-select'));
  var countryDetailedView = new CountryDetailedView(document.querySelector('#country-details'));
  var countryList = new CountryList();
  var countryCharts = new CountryCharts();

  countrySelectView.onChange = function(country, countries){
    countryDetailedView.display(country);
    lastCountry.save(country);
    countryCharts.display(country, countries)
  };

  countryList.onUpdate = function(countries){
    countrySelectView.populate(countries);
    var savedCountry = lastCountry.get();
    if (savedCountry){
      countrySelectView.setSelectedIndex(savedCountry.index);
      countryDetailedView.display(savedCountry);
      countryCharts.display(savedCountry, countries);
    }
  };

  countryList.populate();
});
