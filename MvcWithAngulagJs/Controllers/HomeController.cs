using MvcWithAngulagJs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcWithAngulagJs.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Part2() // fetch and show Database Data
        {
            return View();
        }
        public ActionResult Part3() // Create Login Page
        {
            return View();
        }
        public ActionResult Part4() // Retrive and Display Tabular Data
        {
            return View();
        }
        public ActionResult Part5() //Cascade dropdown
        {
            return View();
        }
        public ActionResult Part6() // simple registration
        {
            return View();
        }
        public ActionResult Part7() // Nested Tabular Data
        {
            return View();
        }
        public ActionResult Part8() // Upload file with Data
        {
            return View();
        }
        public ActionResult Part9()//routing
        {
            return View();
        }
        public ActionResult Part10Index()//google maps : return view to show google maps
        {
            return View();
        }
        public ActionResult Part10GetAllLocatio()//google maps
        {
            using (MyDatabaseEntities db = new MyDatabaseEntities())
            {
                var v = db.Locations.OrderBy(x => x.Title).ToList();
                return new JsonResult { Data = v, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
        // for getting google marker information from the database to show in the map.
        public JsonResult Part10GetMarkerInfo(int locationID)
        {
            using (MyDatabaseEntities dc = new MyDatabaseEntities())
            {
                Location l = null;
                l = dc.Locations.Where(a => a.LocationId.Equals(locationID)).FirstOrDefault();
                return new JsonResult { Data = l, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
        public ActionResult Part11() // Dynamic menus
        {
            return View();
        }
        public JsonResult GetSiteMenu()
        {
            using (MyDatabaseEntities dc = new MyDatabaseEntities())
            {
                var menu = dc.SiteMenus.ToList();
                return new JsonResult { Data = menu, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

    }
}