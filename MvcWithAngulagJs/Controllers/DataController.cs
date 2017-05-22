using MvcWithAngulagJs.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcWithAngulagJs.Controllers
{
    public class DataController : Controller
    {
        //
        // GET: /Data/
        public ActionResult GetLastContact()
        {
            Contact c = null;
            using (MyDatabaseEntities db = new MyDatabaseEntities())
            {
                c = db.Contacts.OrderByDescending(a => a.ContactId).Take(1).FirstOrDefault();
            }
            return new JsonResult { Data = c, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public ActionResult UserLogin(LoginData d)
        {
            using (MyDatabaseEntities db = new MyDatabaseEntities())
            {
                var user = db.Users.Where(x => x.Username == d.Username && x.Password == d.Password).FirstOrDefault();
                return new JsonResult { Data = user, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
        public ActionResult GetEmployeeList()
        {
            List<Employee> employees = new List<Employee>();
            using (MyDatabaseEntities db = new MyDatabaseEntities())
            {
                employees = db.Employees.ToList();
            }
            return new JsonResult { Data = employees, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult GetCountries()
        {
            List<Country> countries = new List<Country>();
            using (MyDatabaseEntities db = new MyDatabaseEntities())
            {
                countries = db.Countries.OrderBy(x => x.CountryName).ToList();
            }
            return new JsonResult { Data = countries, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public ActionResult GetStates(int countryId)
        {
            List<State> states = new List<State>();
            using (MyDatabaseEntities db = new MyDatabaseEntities())
            {
                states = db.States.Where(x => x.CountryId == countryId).ToList();
            }
            return new JsonResult { Data = states, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public ActionResult Register(User u)
        {
            string message = "";
            //Here we will save data to database
            if (ModelState.IsValid)
            {
                using (MyDatabaseEntities db = new MyDatabaseEntities())
                {
                    var user = db.Users.Where(x => x.Username == u.Username).FirstOrDefault();
                    if (user == null)
                    {
                        db.Users.Add(u);
                        db.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Username already exists";
                    }
                }
            }
            else
            {
                message = "Failed";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult CustomerOrders()
        {
            List<CustomerOrders> CO = new List<CustomerOrders>();
            using (MyDatabaseEntities db = new MyDatabaseEntities())
            {
                var cust = db.Customers.OrderBy(x => x.ContactName).ToList();
                foreach (var i in cust)
                {
                    var order = db.Orders.Where(x => x.CustomerId == i.CustomerId).OrderBy(x => x.CustomerId).ToList();
                    CO.Add(new CustomerOrders { Customer = i, Orders = order });
                }
            }
            return new JsonResult { Data = CO, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult SaveFiles(string description)
        {
            string Message, fileName, actualFileName;
            Message = fileName = actualFileName = string.Empty;
            bool flag = false;
            if (Request.Files != null)
            {
                var file = Request.Files[0];
                actualFileName = file.FileName;
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                int size = file.ContentLength;
                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles"),fileName));
                    UploadedFile f = new UploadedFile
                    {
                        FileName = actualFileName,
                        FilePath = fileName,
                        Description = description,
                        FileSize = size
                    };
                    using (MyDatabaseEntities db = new MyDatabaseEntities())
                    {
                        db.UploadedFiles.Add(f);
                        db.SaveChanges();
                        Message = "File uploaded successfully";
                    }
                }
                catch (Exception)
                {

                    Message = "File upload failed !!!";
                }
            }

            return new JsonResult
            {
                Data = new
                {
                    Message = Message,
                    Status = flag
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

    }
}