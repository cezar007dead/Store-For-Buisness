using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StoreForBuisness.Models.Request.Products
{
    public class ProductAddRequest
    {
        public string Title { get; set; }

        public string Body { get; set; }

        public int Price { get; set; }

        public string ContactPerson { get; set; }

        public int CompanyId { get; set; }

        public string PhoneNumber { get; set; }

        public string PhotoUrl { get; set; }

    }
}