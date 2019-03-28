using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StoreForBuisness.Models.Domain
{
    public class Company
    {
        public int Id { get; set; }

        public string CompanyName { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public string PhotoUrl { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime DateCreate { get; set; }

        public DateTime DateModified { get; set; }

        public int UserId { get; set; }
    }
}