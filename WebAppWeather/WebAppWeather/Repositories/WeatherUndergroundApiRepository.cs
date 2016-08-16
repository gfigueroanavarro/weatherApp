using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAppWeather.Models;
using System.Threading.Tasks;
using System.Net;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using System.Web.Script.Serialization;

namespace WebAppWeather.Repositories
{
    public class WeatherUndergroundApiRepository : IWeatherUnderground
    {
        #region IApiWeatherRepository Members

        public object GetForeCast(string type,string country,string cityFullName)
        {
            object json;

            try
            {
                var url = Settings.WeatherUndergroundUrl + Settings.WeatherUndergroundApiKey + "/geolookup/" + type + "/q/" + country + "/" + cityFullName + ".json";

                WebClient client = new WebClient();
                string response = client.DownloadString(url);

                JavaScriptSerializer j = new JavaScriptSerializer();
                json = j.Deserialize(response, typeof(object));
            }
            catch (Exception)
            {
                throw new NotImplementedException();
            }
            return json;
        }

        #endregion
    }
}