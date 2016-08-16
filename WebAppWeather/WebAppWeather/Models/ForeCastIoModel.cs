using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace WebAppWeather.Models
{
    [DataContract]
    public class ForeCastIoModel
    {
       
          [DataMember]
          public Currently currently { get; set; }
          
    }
    public class Currently
    {
        public string temperature { get; set; }
        public string icon { get; set; }
        public string summary { get; set; }
        public string date { get; set; }
    }
}