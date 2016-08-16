define(['app/controller/forecastio','app/controller/weatherUnderground',
			'app/helper','app/controller/api'], 
	function (forecastio,weatherUnderground,helper,apiModel) {
 
    $(function () {

		
    	ko.applyBindings(apiModel,$("#header-weather-content")[0]);
    	apiModel.onApiChange();
    
    	$(".btn").on('click',function(){
    	 	
    	 	if(!$(this).hasClass('btn-active'))
    	 	{
				$(".btn").removeClass('btn-active');
				$(this).addClass('btn-active')
    	 	}
            apiModel.onApiChange();


    	 });
       
    });
  
});