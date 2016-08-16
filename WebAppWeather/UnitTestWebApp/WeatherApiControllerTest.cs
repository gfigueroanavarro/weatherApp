using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WebAppWeather.Controllers;
using WebAppWeather.Repositories;
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Web.Http.Hosting;
using System.Web.Http;

namespace UnitTestWebApp
{
    [TestClass]
    public class WeatherApiControllerTest
    {
        private Mock<IForeCastIoRepository> _foreCastRepository;
        private Mock<IWeatherUnderground> _weatherUndergroundRepository;



        [TestInitialize]
        public void Initialize()
        {
            _foreCastRepository = new Mock<IForeCastIoRepository>();
            _weatherUndergroundRepository = new Mock<IWeatherUnderground>();
        }


        [TestMethod]
        public void GetForeCastFromForeCastIoApi()
        {
           var latitude = "-12.0453";
           var longitude ="-77.0311";
           var jsonString = "{'latitude':-12.0453,'longitude':-77.0311,'timezone':'America/Lima'}";
           var jsonResultString = JsonConvert.DeserializeObject<object>(jsonString);

           _foreCastRepository.Setup(x => x.GetForeCast(It.IsAny<string>(), It.IsAny<string>())).Returns(() => jsonResultString);
           var weatherApicontroller = new WeatherApiController(_foreCastRepository.Object, _weatherUndergroundRepository.Object)
           {
               Request = new HttpRequestMessage { RequestUri = new Uri("http://localhost:3909/api") },
               Configuration = new HttpConfiguration()
           };

           var response = weatherApicontroller.GetForeCastFromForeCastIoApi(latitude, longitude);
           var resultReturned = JsonConvert.DeserializeObject<object>(response.Content.ReadAsStringAsync().Result);

           Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
           Assert.IsNotNull(resultReturned);
          

        }

        [TestMethod]
        public void GetConditionsFromWeatherUndergroundApi()
        {
            var type = "conditions";
            var country = "pe";
            var cityFullName = "Lima";
            var jsonString = "{'location' : { 'country_iso3166' : 'PE', 'city' : 'Lima', icon : 'clear-day' }}";
            var jsonResultString = JsonConvert.DeserializeObject<object>(jsonString);

            _weatherUndergroundRepository.Setup(x => x.GetForeCast(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).Returns(() => jsonResultString);
            var weatherApicontroller = new WeatherApiController(_foreCastRepository.Object, _weatherUndergroundRepository.Object)
            {
                Request = new HttpRequestMessage { RequestUri = new Uri("http://localhost:3909/api") },
                Configuration = new HttpConfiguration()
            };
            var response = weatherApicontroller.GetConditionsFromWeatherUndergroundApi(type, country, cityFullName);
            var resultReturned = JsonConvert.DeserializeObject<object>(response.Content.ReadAsStringAsync().Result).ToString();

            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);   
            Assert.IsNotNull(resultReturned);


        }
    }
}
