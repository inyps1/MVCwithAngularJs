using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcWithAngulagJs.Models
{
    public class CustomerOrders
    {
        public Customer Customer { get; set; }
        public List<Order> Orders { get; set; } 
    }
}