define(['app/helper','app/model/weather','app/settings'], function (Helper,Weather,Settings) {

	var forecast = new function() {
	    this.apiKey = "2f1e217a21ce850617f0994214622a41";
	    this.url = "https://api.forecast.io/forecast/";
	    var me = this;

	    this.setForeCastTemperature = function(options)
        {
                if(options.temperature!=null)
                {
                    options.temperature = Helper.convertTemperature(options.temperature,options.isCelsius,false);               
                }
                
                options.maxTemperature = "Max: " + Helper.convertTemperature(options.maxTemperature,options.isCelsius,false);
                options.minTemperature = "Min: " + Helper.convertTemperature(options.minTemperature,options.isCelsius,false);

                return options;

        };

	    this.getForeCast = function (city,weather,isCelsius) {
	       var myself = this;
	       var url = Settings.apiRoot + "weather/forecastio";

	       $.getJSON(url, {latitude:city.lat, longitude: city.longi}, function(data) {
	       		var whichDay = Helper.getDayName(Helper.getDate(data.currently.time));
	        	var options = {
	        	  	temperature : data.currently.temperature,
	        	  	maxTemperature : data.daily.data[0].temperatureMax,
	        	  	minTemperature : data.daily.data[0].temperatureMin,
	        	  	icon :data.currently.icon,
	        	  	description: data.daily.summary,
	        	  	summary:data.currently.summary,
	        	  	date:whichDay,
	        	  	name:city.name,
	        	  	isCelsius :isCelsius,
	        	  	type : "foreCast",
	        	  	callback : myself.setForeCastTemperature,
	        	  	iconUrl : null
	        	  };
	        	  weather.fillValues(options);

				  weather.days.removeAll();
	              for (var i = 1; i < data.daily.data.length; ++i) { 
	              	
	              	var weatherModel = new Weather();
	              	var date = Helper.getDayName(Helper.getDate(data.daily.data[i].time));
	              	var optionsModel = {
		        	  	temperature : null,
		        	  	maxTemperature : data.daily.data[i].temperatureMax,
		        	  	minTemperature : data.daily.data[i].temperatureMin,
		        	  	icon :data.daily.data[i].icon,
		        	  	description: data.daily.data[i].summary,
		        	  	summary:data.daily.data[i].summary,
		        	  	date:date,
		        	  	name:city.name,
		        	  	isCelsius :isCelsius,
		        	  	type : "foreCast",
		        	  	callback : myself.setForeCastTemperature,
		        	  	iconUrl:null

	        	  	};
	        	  	weatherModel.fillValues(optionsModel);	        	
	        	  	weather.days.push(weatherModel);

	              }
	              weather.days.valueHasMutated()
	             
	          	
	       });
	     
	    };
	};

    return forecast;
});
