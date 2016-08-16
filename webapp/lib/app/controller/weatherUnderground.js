define(['app/helper','app/model/weather','app/settings'], function (Helper,Weather,Settings) {

	var weatherUnderground = new function() {
	    this.apiKey = "038cb55773b0e399";
	    this.url = "http://api.wunderground.com/api/";

	    this.setForeCastTemperature = function(options)
        {
            
            options.temperature = options.temperature !=null ? Helper.convertTemperature(options.temperature,options.isCelsius,true) : null;           
           
            options.maxTemperature = options.maxTemperature !=null ? "Max: " + Helper.convertTemperature( options.maxTemperature,options.isCelsius,true) : null;

            options.minTemperature = options.minTemperature !=null ? "Min: " + Helper.convertTemperature(options.minTemperature,options.isCelsius,true): null;
             
            return options;
        };

	    this.getForeCast = function (type,city,weather,isCelsius) {
	        var myself = this;
	        var url = Settings.apiRoot + "weather/weatherUnderground";
	        $.getJSON(url, {type:type, country: city.country,cityFullName :city.fullName }, function(data) {
	        	if(type=="conditions")
	        	{
	        	   	 
	        	  	  var whichDay = Helper.getDayName(Helper.getDate( data.current_observation.observation_epoch));
	        	  	  var options = {
		        	  	temperature_c : data.current_observation.temp_c,
		        	  	temperature_f : data.current_observation.temp_f,
		        	  	maxTemperature_c : null,
		        	  	maxTemperature_f : null,
		        	  	minTemperature_c : null,
		        	  	minTemperature_f : null,
		        	  	temperature: isCelsius ? data.current_observation.temp_c : data.current_observation.temp_f,
		        	  	maxTemperature : null,
		        	  	minTemperature:null,
		        	  	icon : null,
		        	  	description:data.current_observation.weather,
		        	  	iconUrl : data.current_observation.icon_url,
		        	  	summary:data.current_observation.weather,
		        	  	date:whichDay,
		        	  	name:data.current_observation.city,
		        	  	isCelsius :isCelsius,
	        	  		type : "weatherUnderground",
	        	  		callback : myself.setForeCastTemperature
	        	  	  };

	        	  	  weather.fillValues(options);	              	  
				}
				else
				{
						weather.days.removeAll();
						for (var i = 1; i < 8; ++i) { 
	              	
			              	var weatherModel = new Weather();
			              	var weatherItem= data.forecast.simpleforecast.forecastday[i];
			              	var date = Helper.getDayName(Helper.getDate( weatherItem.date.epoch));
			              	
			              	var optionsModel = {
				        	  	temperature : null,
				        	  	maxTemperature_c : weatherItem.high.celsius,
				        	  	maxTemperature_f : weatherItem.high.fahrenheit,
				        	  	minTemperature_c:weatherItem.low.celsius,
				        	  	minTemperature_f:weatherItem.low.fahrenheit,				        	  
		        	  			maxTemperature : isCelsius ? weatherItem.high.celsius :  weatherItem.high.fahrenheit,
		        	  			minTemperature:isCelsius? weatherItem.low.celsius : weatherItem.low.fahrenheit,
				        	  	icon :null,
				        	  	iconUrl :weatherItem.icon_url,
				        	  	description: "",
				        	  	summary:weatherItem.icon,
				        	  	date:weatherItem.date.weekday,
				        	  	name:"",
				        	  	isCelsius :isCelsius,
				        	  	type : "weatherUnderground",
				        	  	callback : myself.setForeCastTemperature
			        	  	};
			        	  	weatherModel.fillValues(optionsModel);	        	
			        	  	weather.days.push(weatherModel);

	              		}	              		
						
				}	             
	          	
	        });
	       
	    };
	};

    return weatherUnderground;
});