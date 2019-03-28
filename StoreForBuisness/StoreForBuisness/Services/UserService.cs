using Microsoft.AspNet.Identity;
using StoreForBuisness.Models.Domain;
using StoreForBuisness.Models.Request;
using StoreForBuisness.Models.Request.Users;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using StoreForBuisness.Services;

namespace StoreForBuisness.Services
{
    public class UserService : IUserService
    {
        private IJwtAuthService _authenticationService;

        public UserService(IJwtAuthService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        public int AddUser(AddUserRequest data)
        {
            using (var conn = GetConnection())
            {
                var cmd = conn.CreateCommand();
                cmd.CommandText = "[dbo].[Users_Register]";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                string encryptedPassword = BCrypt.Net.BCrypt.HashPassword(data.Password);
                cmd.Parameters.AddWithValue("@EmailAddress", data.Email);
                cmd.Parameters.AddWithValue("@Password", encryptedPassword);
                cmd.Parameters.AddWithValue("@TypeId", 1);
                cmd.Parameters.AddWithValue("@IsConfirmed", false);
                cmd.Parameters.AddWithValue("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
                return (int)cmd.Parameters["@Id"].Value;
            }

        }

        public bool LogIn(UserLogInRequest user)
        {
            bool isSuccessful = false;
            UserBase response = Get(user.EmailAddress, user.Password);
            if (response != null)
            {
                _authenticationService.LogIn(response);
                isSuccessful = true;
            }
            return isSuccessful;
        }

        public void LogOut()
        {
            _authenticationService.LogOut();
        }

        public User GetById(int id)
        {
            User user = null;
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "[dbo].[Users_GetById]";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    user = Mapper(reader);

                }
                return user;
            }
        }

        public UserBase Get(string email, string password)
        {


            using (var conn = GetConnection())
            {
                var cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.Users_SelectByEmail";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@EmailAddress", email);

                using (var reader = cmd.ExecuteReader())
                {
                    var authUser = new UserBase();
                    while (reader.Read())
                    {
                        authUser.Email = (string)reader["EmailAddress"];
                        authUser.Id = (int)reader["Id"];
                        authUser.Password = (string)reader["Password"];
                    }
                    bool isSuccessful = BCrypt.Net.BCrypt.Verify(password, authUser.Password);
                    //bool isSuccessful = false;
                    if (password == authUser.Password)
                    {
                        isSuccessful = true;
                    }
                    if (!isSuccessful)
                    {
                        authUser = null;
                        return authUser;
                    }
                    return authUser;
                }
            }
        }

        // Helper method to create and open a DB connection
        private SqlConnection GetConnection()
        {
            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["AuthContext"].ConnectionString);
            conn.Open();
            return conn;
        }

        private User Mapper(SqlDataReader reader)
        {
            User user = new User();
            int index = 0;

            user.Id = reader.GetInt32(index++);
            if (!reader.IsDBNull(index))
                user.EmailAddress = reader.GetString(index++);
            else
            {
                user.EmailAddress = string.Empty;
                index++;
            }
            if (!reader.IsDBNull(index))
                user.TypeId = reader.GetInt32(index++);
            else
            {
                user.TypeId = 0;
                index++;
            }
            if (!reader.IsDBNull(index))
                user.IsConfirmed = reader.GetBoolean(index++);
            else
            {
                user.IsConfirmed = false;
                index++;
            }
            if (!reader.IsDBNull(index))
                user.FirstName = reader.GetString(index++);
            else
            {
                user.FirstName = string.Empty;
                index++;
            }
            if (!reader.IsDBNull(index))
                user.LastName = reader.GetString(index++);
            else
            {
                user.LastName = string.Empty;
                index++;
            }
            if (!reader.IsDBNull(index))
                user.Description = reader.GetString(index++);
            else
            {
                user.Description = string.Empty;
                index++;
            }
            if (!reader.IsDBNull(index))
                user.PhotoUrl = reader.GetString(index++);
            else
            {
                user.PhotoUrl = string.Empty;
                index++;
            }
            if (!reader.IsDBNull(index))
                user.DateCreated = reader.GetDateTime(index++);
            else
            {
                user.DateCreated = default(DateTime);
                index++;
            }
            if (!reader.IsDBNull(index))
                user.DateModified = reader.GetDateTime(index++);
            else
            {
                user.DateModified = default(DateTime);
                index++;
            }
            if (!reader.IsDBNull(index))
                user.IsOnline = reader.GetBoolean(index++);
            else
            {
                user.IsOnline = false;
                index++;
            }
            return user;
        }
    }
}