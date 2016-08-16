using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace WebAppWeather.Models
{
    public class Settings
    {
        public static string ForeCastIoUrl
        {
            get {
                return WebConfigurationManager.AppSettings["foreCastIoUrl"];
            }
        }

        public static string ForeCastIoApiKey
        {
            get
            {
                return WebConfigurationManager.AppSettings["foreCastIoApiKey"];
            }
        }

        public static string WeatherUndergroundUrl
        {
            get
            {
                return WebConfigurationManager.AppSettings["weatherUndergroundUrl"];
            }
        }

        public static string WeatherUndergroundApiKey
        {
            get
            {
                return WebConfigurationManager.AppSettings["weatherUndergroundApiKey"];
            }
        }
    }
}