using StoreForBuisness.Interfaces;
using StoreForBuisness.Models.Domain;
using StoreForBuisness.Models.ProjectModals;
using StoreForBuisness.Models.Request.Products;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace StoreForBuisness.Services
{
    public class ProductService : IProductService
    {
        SqlConnection GetConnection()
        {
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["AuthContext"].ConnectionString);
            con.Open();
            return con;
        }

        public void Delete(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Products_Delete]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.ExecuteNonQuery();
            }
        }
        public int Insert(ProductAddRequest data, int userId)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "Products_Insert";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Title", data.Title);
                cmd.Parameters.AddWithValue("@Body", data.Body);
                cmd.Parameters.AddWithValue("@Price", data.Price);
                cmd.Parameters.AddWithValue("@ContactPerson", data.ContactPerson);
                cmd.Parameters.AddWithValue("@CompanyId", data.CompanyId);
                cmd.Parameters.AddWithValue("@PhoneNumber", data.PhoneNumber);
                cmd.Parameters.AddWithValue("@PhotoUrl", data.PhotoUrl);
                cmd.Parameters.AddWithValue("@UserId", userId);

                cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                return (int)cmd.Parameters["@Id"].Value;
            }

        }

        public void Update(ProductUpdateRequest data)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Products_Update]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", data.Id);
                cmd.Parameters.AddWithValue("@Title", data.Title);
                cmd.Parameters.AddWithValue("@Body", data.Body);
                cmd.Parameters.AddWithValue("@Price", data.Price);
                cmd.Parameters.AddWithValue("@ContactPerson", data.ContactPerson);
                cmd.Parameters.AddWithValue("@CompanyId", data.CompanyId);
                cmd.Parameters.AddWithValue("@PhoneNumber", data.PhoneNumber);
                cmd.Parameters.AddWithValue("@PhotoUrl", data.PhotoUrl);

                cmd.ExecuteNonQuery();
            }

        }

        public Paged<Product> SellectByPage(int pageIndex, int pageSize)
        {
            Paged<Product> paged = null;
            List<Product> list = null;
            int totalCount = 0;
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Product_GetByPageIndexPageSize]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PageNumber", pageIndex);
                cmd.Parameters.AddWithValue("@PageSize", pageSize);

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Product product = Mapper(reader);
                    if (list == null)
                    {
                        list = new List<Product>();
                    }
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetInt32(11);
                    }
                    list.Add(product);
                }


            }
            if (list != null)
            {
                paged = new Paged<Product>(list, pageIndex, pageSize, totalCount);
                return paged;
            }
            return paged;
        }

        public Paged<Product> SellectByPageSearch(int pageIndex, int pageSize, string query)
        {
            Paged<Product> paged = null;
            List<Product> list = null;
            int totalCount = 0;
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Products_SearchForGenericMatch]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PageNumber", pageIndex);
                cmd.Parameters.AddWithValue("@PageSize", pageSize);
                cmd.Parameters.AddWithValue("@Query", query);

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Product product = Mapper(reader);
                    if (list == null)
                    {
                        list = new List<Product>();
                    }
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetInt32(11);
                    }
                    list.Add(product);
                }


            }
            if (list != null)
            {
                paged = new Paged<Product>(list, pageIndex, pageSize, totalCount);
                return paged;
            }
            return paged;
        }

        public Product SellectById(int id)
        {
            Product product = null;
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Product_GetById]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    product = Mapper(reader);

                }
            }
            return product;
        }

        public List<Product> SellectByUserId(int userId)
        {
            List<Product> list = null;
            int totalCount = 0;
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Product_GetByUserId]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", userId);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Product product = Mapper(reader);
                    if (list == null)
                    {
                        list = new List<Product>();
                    }
                    list.Add(product);
                }


            }

            return list;
        }

        private Product Mapper(SqlDataReader reader)
        {
            Product product = new Product();
            int index = 0;
            product.Id = reader.GetInt32(index++);
            product.Title = reader.GetString(index++);
            product.Body = reader.GetString(index++);
            product.Price = reader.GetInt32(index++);
            product.ContactPerson = reader.GetString(index++);
            product.CompanyId = reader.GetInt32(index++);
            product.PhoneNumber = reader.GetString(index++);
            product.PhotoUrl = reader.GetString(index++);
            product.DateCreate = reader.GetDateTime(index++);
            product.DateModified = reader.GetDateTime(index++);
            product.UserId = reader.GetInt32(index++);

            return product;
        }

    }
}