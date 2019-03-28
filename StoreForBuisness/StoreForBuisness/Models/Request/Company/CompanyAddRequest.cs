using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StoreForBuisness.Models.Request.Company
{
    public class CompanyAddRequest
    {
        public string CompanyName { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public string PhotoUrl { get; set; }

        public string PhoneNumber { get; set; }

        public int UserId { get; set; }
    }
}