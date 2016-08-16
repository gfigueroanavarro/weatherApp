using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAppWeather.Repositories
{
    public interface IWeatherUnderground
    {
        object GetForeCast(string type, string country, string cityFullName);
    
    }
}