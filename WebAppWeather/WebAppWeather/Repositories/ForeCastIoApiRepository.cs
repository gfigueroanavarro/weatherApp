using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Net.Http.Headers;
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
    public class ForeCastIoApiRepository : IForeCastIoRepository
    {
        #region IApiWeatherRepository Members   
        private string urlParameters = "?callback=?";

        public object GetForeCast(string latitude, string longitude)
        {
            object json;

            try
            {
                Uri uri = new Uri(Settings.ForeCastIoUrl + Settings.ForeCastIoApiKey + "/" + latitude + "," + longitude + "?callback=?"); //replace your url  
                var url = Settings.ForeCastIoUrl + Settings.ForeCastIoApiKey + "/" + latitude + "," + longitude ;

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