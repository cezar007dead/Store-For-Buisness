using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StoreForBuisness.Models.Domain
{
    public class Product
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Body { get; set; }

        public int Price { get; set; }

        public string ContactPerson { get; set; }

        public int CompanyId { get; set; }

        public string PhoneNumber { get; set; }

        public string PhotoUrl { get; set; }

        public DateTime DateCreate { get; set; }

        public DateTime DateModified { get; set; }

        public int UserId { get; set; }
    }
}