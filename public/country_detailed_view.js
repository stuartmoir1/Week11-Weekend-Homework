//Constructor
var CountryDetailedView = function(element){
  this.element = element
};

// Methods
CountryDetailedView.prototype = {

  display: function(country){
    //console.log('display...');

    this.country = country;

    // Remove previous country details.
    while (this.element.hasChildNodes()) {
      this.element.removeChild(this.element.firstChild);
    }

    this.addH2Title(country.name, this.element);
    this.addFlag(country.flag, country.name, this.element);

    var ul = document.createElement('ul');
    this.element.appendChild(ul);

    this.addListItemText('Native Name', country.nativeName, ul);
    this.addListItemText('Capital', country.capital, ul);
    this.addParagraph(ul);
    this.addListItemText('Region', country.region, ul);
    this.addListItemText('Subregion', country.subregion, ul); 
    this.addListItemFromArrayObjs('Regional Blocs: ', country.regionalBlocs, 'name', ul);
    this.addListItemFromArray('Timezones: ', country.timezones, ul);
    this.addParagraph(ul);
    this.addListItemNumber('Population', country.population, ul);
    this.addListItemNumber('Area (km2)', country.area, ul);
    this.addParagraph(ul);
    this.addListItemFromArrayObjs('Languages: ', country.languages, 'name', ul);
    this.addListItemFromArrayObjs('Currencies: ', country.currencies, 'name', ul);

    this.addMap(country);
  },

  addH2Title: function(countryName, parent){
    //console.log('addH2Title...');
    var h2Name = document.createElement('h2');
    h2Name.innerText = countryName;
    parent.appendChild(h2Name);
  },

  addFlag: function(flag, countryName, parent){
    //console.log('addFlag...');
    var imgFlag = document.createElement('img');
    imgFlag.src = flag;
    imgFlag.alt = 'Flag of ' + countryName;
    imgFlag.width = 150;
    imgFlag.border = 1;
    parent.appendChild(imgFlag);
  },

  addListItemText: function(description, text, ul){
    //console.log('addListItemText...');
    var li = document.createElement('li');
    li.innerText = description + ': ' + text;
    ul.appendChild(li);
  },

  addListItemNumber: function(description, number, ul){
    //console.log('addListItemNumber...');
    var li = document.createElement('li');
    li.innerText = description + ': ' + this.addCommas(number);
    ul.appendChild(li); 
  },

  addListItemFromArray: function(description, array, ul){
    //console.log('addListItemFromArray...');
    var li = document.createElement('li');
    this.list = description;
    array.forEach(function(element, index){
      this.list += element
      if (index < array.length - 1) this.list += ', ';
    }.bind(this));
    li.innerText = this.list;
    ul.appendChild(li);
  },

  addListItemFromArrayObjs: function(description, array, reference, ul){
    //console.log('addListItemFromArrayObjs...');
    var li = document.createElement('li');
    this.list = description;
    array.forEach(function(element, index){
      this.list += element[reference];
      // For currency only.
      if (element.symbol) this.list += ' (' + element.symbol.toUpperCase() + ')';
      if (index < array.length - 1) this.list += ', ';
    }.bind(this));
    this.list !== description ? li.innerText = this.list : li.innerText = description + 'none';
    ul.appendChild(li);
  },

  addParagraph: function(parent){
    //console.log('addParagraph...');
    var p = document.createElement('p');
    parent.appendChild(p);
  },

  addCommas: function(number){
    //console.log('addCommas...');
    // Attribute: http://cwestblog.com/2011/06/23/javascript-add-commas-to-numbers/
    return (number + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  },

  addMap: function(country){
    //console.log('addMap...');

    var latlng = {lat: country.latlng[0], lng: country.latlng[1]};
    var map = new google.maps.Map(document.querySelector('#map'), {
      center: latlng,
      zoom: 5
    });

    var addMarker = function () {
      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
      });
      
      var addInfoWindow = function(){
        marker.addListener('click', function () {
          var infowindow = new google.maps.InfoWindow({
            content: "<h2>"+ country.name +"</h2><p>" + country.subregion + "</p>"
          });
          infowindow.open(map, marker);
        });
      }
      addInfoWindow();
    }
    addMarker();
  }
};