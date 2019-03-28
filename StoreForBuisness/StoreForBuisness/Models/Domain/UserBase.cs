﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StoreForBuisness.Models.Domain
{
    public class UserBase
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public string Password { get; set; }
    }
}