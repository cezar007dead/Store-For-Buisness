using StoreForBuisness.Models.Domain;
using StoreForBuisness.Models.Request;
using StoreForBuisness.Models.Request.Users;

namespace StoreForBuisness.Services
{
    public interface IUserService
    {
        int AddUser(AddUserRequest data);
        bool LogIn(UserLogInRequest user);
        UserBase Get(string email, string password);

        User GetById(int id);

        void LogOut();
    }
}