using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebAppWeather.Models;
using WebAppWeather.Repositories;
using Microsoft.Practices.Unity;

namespace WebAppWeather
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.EnableCors();

            // Web API configuration and services
            var container = new UnityContainer();
            container.RegisterType<IForeCastIoRepository, ForeCastIoApiRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IWeatherUnderground, WeatherUndergroundApiRepository>(new HierarchicalLifetimeManager());
        
                
            config.DependencyResolver = new UnityResolver(container);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
