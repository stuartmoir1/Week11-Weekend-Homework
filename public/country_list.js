// Constructor
var CountryList = function(){
  this.countries = [];
  this.onUpdate = null;
}

// Methods
CountryList.prototype = {

  populate: function(){
    //console.log('populate...');
    var url = 'https://restcountries.eu/rest/v2/all';
    this.makeRequest(url, this.requestComplete.bind(this));
  },

  makeRequest: function(url, callback){
    //console.log('makeRequest...');
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
  },

  requestComplete: function(){
    //console.log('requestComplete...');
    var request = event.target;
    if (request.status !== 200) return; // Request failed.
    var countries = JSON.parse(request.responseText);
    this.onUpdate(countries);
  }
}