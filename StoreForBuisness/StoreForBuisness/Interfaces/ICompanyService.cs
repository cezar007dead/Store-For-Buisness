using StoreForBuisness.Models.Domain;
using StoreForBuisness.Models.Request.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreForBuisness.Interfaces
{
    public interface ICompanyService
    {
        int Insert(CompanyAddRequest data, int userId);

        List<Company> SellectByUserId(int id);

        Company SellectById(int id);
    }
}
