define(['app/helper','app/resources/icons_resource'], function (Helper,Icons_Resource) {
	 function weatherModel() {
            var me = {};
            me.code = ko.observable(null);
            me.name = ko.observable(null);
            me.temperature = ko.observable(null);
            me.description = ko.observable([]);
            me.summary = ko.observable([]);
            me.icon = ko.observable(null);
            me.days = ko.observableArray(null);
            me.maxTemperature = ko.observable(null);
			me.minTemperature = ko.observable(null);
			me.temperatureC = ko.observable(null);
			me.temperatureF = ko.observable(null);
			me.days =ko.observableArray(null);
			me.date =ko.observable(null);
            me.iconUrl=ko.observable(null);

            me.fillValues = function(options){               
          
                me.maxTemperature("");
                me.minTemperature("");  
                me.icon(options.type=="foreCast" ? Helper.getIconForest(Icons_Resource,options.icon): null); 
                
                options.callback(options);                    
                me.temperature(options.temperature);
                me.maxTemperature(options.maxTemperature);
                me.minTemperature(options.minTemperature);         
                me.iconUrl(options.iconUrl);                

                me.description(options.description);
                me.summary(options.summary);
                me.date(options.date);                 
                me.name(options.name);                

               
            };

            return {
                code: me.code,
                name: me.name,
                temperature: me.temperature,
                description: me.description,
                summary:me.summary,
                icon: me.icon,
                days : me.days,
                maxTemperature : me.maxTemperature,
                minTemperature : me.minTemperature,
                temperatureC : me.temperatureC,
                temperatureC : me.temperatureC,
                temperatureF : me.temperatureF,
                days : me.days,
                date : me.date,
                iconUrl:me.iconUrl,
                fillValues: me.fillValues
            };
     };
     return weatherModel;s
});