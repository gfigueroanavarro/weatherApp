define([], function () {
    return {
        getBody: function () {
            return $('body');
        },
        getDayName: function (date){
        	return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(date).getDay()];
        },
        getCelsius : function(temp,isInCelsius){       
            var temperature = temp;
            if(!isInCelsius)
            {
                temperature = (temp-32)*5/9;
            }    
        	return Math.floor(temperature) +" °C";
        },
        getFahrenheit : function(temp){
        	return Math.floor(temp)+" °F";
        },        
        convertTemperature : function(temperature,isCelsius,isInCelsius)
        {
            if(isCelsius)
            {
                return this.getCelsius(temperature,isInCelsius);
            }
            else
            {
                return this.getFahrenheit(temperature);
            }
        },

        getIconForest : function(icons,name)
        {   
            var icon = $.grep(icons, function (element, index) {                
                return element.name == name;
            });            
            if(icon.length>0)
            {
                return icon[0].icon;
            }
            return icons[0].icon;
        },
        getDate : function(date)
        {
        	var utcSeconds = date;
	        var date = new Date(0);
	        date.setUTCSeconds(utcSeconds);
	        return date;
        }


    }
});