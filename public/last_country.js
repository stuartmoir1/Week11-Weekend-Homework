var lastCountry = {

  storageKey: 'selectedCountry',

  save: function(country){
    //console.log('save...');
    if (!country) return;
    localStorage.setItem(this.storageKey, JSON.stringify(country));
  },

  get: function(){
    //console.log('get...');
    var countryString = localStorage.getItem('selectedCountry');
    if (!countryString) return;
    return JSON.parse(countryString);
  }
}