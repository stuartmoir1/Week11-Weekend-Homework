var app = function(){
  var url = 'https://restcountries.eu/rest/v2/all';
  var displayCountriesButton = document.querySelector('#button-display-countries');
  displayCountriesButton.addEventListener('click', function(){
    makeRequest(url, requestComplete);
  });
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var countries =JSON.parse(this.responseText)
  populateList(countries);
}

//var populateList = function(countries){
//  var ul = document.querySelector('#country-list');
//  countries.forEach(function(country){
//    var li = document.createElement('li');
//    li.innerText = country.name;
//    ul.appendChild(li);
//  });
//}

window.addEventListener('load', app);