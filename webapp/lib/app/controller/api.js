define(['app/model/apiType','app/model/city','./forecastio','./weatherUnderground','app/model/weather'], 
		function (ApiType,City,ForeCast,WeatherUndeground,weatherModel) {


	var api = function () {
        var me = {};
        me.weather = new weatherModel();

        me.availableApis = ko.observableArray([
            new ApiType("for", "ForeCast.io",ForeCast),
            new ApiType("we", "WeatherUndeground",WeatherUndeground)
        ]);

        me.availableCities = ko.observableArray([
            new City("li", "Lima",-12.0453,-77.0311,'pe','Lima'),
            new City("tok", "Tokyo",35.6894,139.692,'jp','Tokyo'),
            new City("la", "Los Angeles",34.0194,-118.411,'ca','Los_Angeles'),
            new City("lo", "London",26.1833,-103.4167,'gb','london')
        ]);

        me.selectedApi = ko.observable("for");

        me.selectedCity = ko.observable("li");

        me.getTemperatureType = function(){
            if($(".btn.btn-active").hasClass("celsius"))
            {
                return true;
            }
            return false;
        };

        me.getCity = function (code) {
                return ko.utils.arrayFilter(me.availableCities(), function (city) {
                    if(city.code==code)
                    {
                        return city;
                    }
                    return false;
                });
        };

        me.getApi = function (code) {
                return ko.utils.arrayFilter(me.availableApis(), function (apiItem) {
                    if(apiItem.code==code)
                    {
                        return apiItem;
                    }
                    return false;
                });
        };

        me.onApiChange = function () {
        	var apiCode =  $("#apiSelect").val(); 
        	var cities = me.getCity( $("#citySelect").val());  
            var isCelsius = me.getTemperatureType();
         

        	if(cities.length>0)
        	{
        		var city = cities[0];
	        	if(apiCode == 'for')
	        	{
	        		var fore = ForeCast.getForeCast(city,me.weather,me.getTemperatureType());
	        	
	        	}
	        	else if(apiCode == 'we')
	        	{
	        		WeatherUndeground.getForeCast('conditions',city,me.weather,me.getTemperatureType());
                    WeatherUndeground.getForeCast('forecast10day',city,me.weather,me.getTemperatureType());
	        		
	        	}
        	}
        };

        me.onCityChange = function () {
        	var cityCode = $("#citySelect").val(); 
        	var city = me.getCity(cityCode);
        	var apies = me.getApi($("#apiSelect").val());
     
        	if(city.length>0 && apies.length>0)
        	{
                var apiCode = apies[0];
                me.weather.name(null);
                if(apiCode.code == 'for')
                {
                    var fore = ForeCast.getForeCast(city[0],me.weather,me.getTemperatureType());
                
                }
                else if(apiCode.code == 'we')
                {
                    WeatherUndeground.getForeCast('conditions',city[0],me.weather,me.getTemperatureType());
                    WeatherUndeground.getForeCast('forecast10day',city[0],me.weather,me.getTemperatureType());
                    
                }

	        	
        	}
        };

       
        return {
            availableApis: me.availableApis,
            availableCities : me.availableCities,
            selectedApi: me.selectedApi,
            selectedCity : me.selectedCity,
            onApiChange : me.onApiChange,
            onCityChange: me.onCityChange,
            weather : me.weather,
            getTemperatureType : me.getTemperatureType
        };
    }();

    return api;
});