using StoreForBuisness.Interfaces;
using StoreForBuisness.Models.Domain;
using StoreForBuisness.Models.Request.Company;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace StoreForBuisness.Services
{
    public class CompanyService : ICompanyService
    {
        private IJwtAuthService _authenticationService;

        public CompanyService(IJwtAuthService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        SqlConnection GetConnection()
        {
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["AuthContext"].ConnectionString);
            con.Open();
            return con;
        }
        public int Insert(CompanyAddRequest data, int userId)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Company_Insert]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CompanyName", data.CompanyName);
                cmd.Parameters.AddWithValue("@Url", data.Url);
                cmd.Parameters.AddWithValue("@Description", data.Description);
                cmd.Parameters.AddWithValue("@PhotoUrl", data.PhotoUrl);
                cmd.Parameters.AddWithValue("@PhoneNumber", data.PhoneNumber);
                cmd.Parameters.AddWithValue("@UserId", userId);

                cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                return (int)cmd.Parameters["@Id"].Value;
            }

        }

        public List<Company> SellectByUserId(int id)
        {
            List<Company> list = null;
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Company_GetByUserId]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Company company = null;
                    company = Mapper(reader);
                    if (list == null)
                    {
                        list = new List<Company>();
                    }
                    list.Add(company);
                }
            }
            return list;
        }

        public Company SellectById(int id)
        {
            Company company = null;
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Company_GetById]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {

                    company = Mapper(reader);

                }
            }
            return company;
        }

        private Company Mapper(SqlDataReader reader)
        {
            Company company = new Company();
            int index = 0;
            company.Id = reader.GetInt32(index++);
            company.CompanyName = reader.GetString(index++);
            company.Url = reader.GetString(index++);
            company.Description = reader.GetString(index++);
            company.PhotoUrl = reader.GetString(index++);
            company.PhoneNumber = reader.GetString(index++);
            company.DateCreate = reader.GetDateTime(index++);
            company.DateModified = reader.GetDateTime(index++);
            company.UserId = reader.GetInt32(index++);
            return company;
        }
    }
}