using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using WebAppWeather.Models;

namespace WebAppWeather.Repositories
{
    public interface IForeCastIoRepository
    {
        object GetForeCast(string latitude,string longitude);
    }
}