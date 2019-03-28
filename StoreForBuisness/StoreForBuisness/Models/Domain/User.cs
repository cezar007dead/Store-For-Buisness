using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StoreForBuisness.Models.Domain
{
    public class User
    {
        public int Id { get; set; }

        public string EmailAddress { get; set; }

        public int TypeId { get; set; }

        public bool IsConfirmed { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Description { get; set; }

        public string PhotoUrl { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public bool IsOnline { get; set; }
    }
}