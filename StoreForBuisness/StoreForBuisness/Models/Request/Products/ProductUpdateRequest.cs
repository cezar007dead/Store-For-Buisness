using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StoreForBuisness.Models.Request.Products
{
    public class ProductUpdateRequest : ProductAddRequest
    {
        public int Id { get; set; }
    }
}