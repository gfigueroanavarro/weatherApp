using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using WebAppWeather.Repositories;
using System.Threading.Tasks;
using WebAppWeather.Models;
using System.Net;
using System.Web.Http.Cors;

namespace WebAppWeather.Controllers
{
    [EnableCors(origins: "http://localhost:3909", headers: "*", methods: "*")]
    [RoutePrefix("api/weather")]
    public class WeatherApiController : ApiController
    {
        IForeCastIoRepository _foreCastIoRepository;
        IWeatherUnderground _iWeatherUndergroundRepository;
 
        public WeatherApiController(IForeCastIoRepository foreCastIoRepository,IWeatherUnderground iWeatherUndergroundRepository)
        {
            _foreCastIoRepository = foreCastIoRepository;
            _iWeatherUndergroundRepository = iWeatherUndergroundRepository;
        }

        // GET api/weather/forecastio
        [Route("forecastio")]
        [HttpGet]
        public HttpResponseMessage GetForeCastFromForeCastIoApi(string latitude, string longitude) 
        {
            var result = _foreCastIoRepository.GetForeCast(latitude, longitude);
            return Request.CreateResponse(HttpStatusCode.OK, result);
           
        }


        // GET api/weather/weatherUnderground
        [Route("weatherUnderground")]
        [HttpGet]
        public HttpResponseMessage GetConditionsFromWeatherUndergroundApi(string type, string country, string cityFullName)
        {
            var result = _iWeatherUndergroundRepository.GetForeCast(type, country, cityFullName);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

       
   
    }
}