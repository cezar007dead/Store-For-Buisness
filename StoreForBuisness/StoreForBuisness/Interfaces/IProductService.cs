using StoreForBuisness.Models.Domain;
using StoreForBuisness.Models.ProjectModals;
using StoreForBuisness.Models.Request.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace StoreForBuisness.Interfaces
{
    public interface IProductService
    {
        int Insert(ProductAddRequest data, int userId);

        Paged<Product> SellectByPage(int pageIndex, int pageSize);

        Paged<Product> SellectByPageSearch(int pageIndex, int pageSize, string query);

        void Delete(int id);

        Product SellectById(int id);

        void Update(ProductUpdateRequest data);

        List<Product> SellectByUserId(int userId);
    }
}
