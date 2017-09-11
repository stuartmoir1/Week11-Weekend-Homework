// Constructor
var CountrySelectView = function(selectElement){
  this.selectElement = selectElement;
  //console.log('selectElement:', selectElement);
  this.onChange = undefined;
  this.countries = [];

  this.selectElement.addEventListener('change', function(e){
    var index = e.target.selectedIndex;
    var country = this.countries[index];
    country.index = index;
    console.log('country:', country);
    this.onChange(country, this.countries);
  }.bind(this), false);
};

// Methods
CountrySelectView.prototype = {

  populate: function(countries){
    //console.log('populate...');
    this.selectElement.innerHTML = '';
    this.countries = countries;
    var index = 0;

    this.countries.forEach(function(country){
      this.addOption(country, index);
      index++;
    }.bind(this));
  },

  addOption: function(country, index){
    //console.log('addOption...');
    var option = document.createElement("option");
    option.value = index.toString();
    option.text = country.name;
    this.selectElement.appendChild(option);
  },

  setSelectedIndex: function (index) {
    //console.log('setSelectedIndex...');
    this.selectElement.selectedIndex = index;
  }
};