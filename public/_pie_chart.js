// Constructor
var Chart = function(title, countryData, borderCountriesData, dataType, chartType, id){

  this.title = title;
  this.chartType = chartType;
  this.id = id;
  
  // Workaround: to stop array borderCountriesData being modified within 
  // this function (and adding country twice to array). To show what happens
  // without this workaround, comment out the workaround and uncomment the
  // the following line.
  // var data = borderCountriesData;
  var data = [];
  for (country of borderCountriesData){
    data.push(country);
  }
  data.push(countryData);

  console.log(data);

  if (chartType === 'pie'){
    var setupData = this.pieChartDataSetup(data, dataType);
    this.makePieChart(setupData);
  } else if (chartType === 'column'){
    var setupData = this.columnChartDataSetup(data, dataType);
    this.makeColumnChart(setupData);
  } else {
    console.log('Chart type not suppport.');
    return;
  }
};

Chart.prototype = {

  pieChartDataSetup: function(data, dataType){
    //console.log('pieChartDataSetup...')
    var setupData = data.map(function(country){
      return {
        name: country.name,
        y: country[dataType]
      }
    });
    return setupData;
  },

  columnChartDataSetup: function(data, dataType){
    //console.log('columnChartDataSetup...')

    console.log(data);

    var categories = [];
    var numbers = [];
    var setupData = [categories, numbers];


    for (var i = 0; i < data.length - 1; i++){
      categories[i] = data[i].name;
      numbers[i] = data[i].population;
    }

    return setupData;
  },

  makePieChart: function(data){
    //console.log('makePieChart...');
    var container = document.querySelector(this.id);
    var chart = new Highcharts.Chart({
      chart: {
        type: this.chartType,
        renderTo: container
      },
      title: {
        text: this.title
      },
      series: [
        {
          data: data 
        }
      ]
    });
  },

  makeColumnChart: function(data){
    //console.log('makeColumnChart...');

    console.log(data);
    var numbers = {
      name: this.title,
      data: data[1]
    }
    var categories = data[0];

    var container = document.querySelector(this.id);
    var chart = new Highcharts.Chart({ 
      chart: {
        type: this.chartType,
        renderTo: container
      },
      title: { 
        text: this.title 
      },
      series: [numbers],
          xAxis: { 
            categories: categories
          },
    });
  }
}





























