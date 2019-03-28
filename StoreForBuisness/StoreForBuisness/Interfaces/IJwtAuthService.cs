using System.Security.Claims;
using StoreForBuisness.Models.Domain;

namespace StoreForBuisness.Services
{
    public interface IJwtAuthService
    {
        UserBase GetCurrentUser();
        int GetCurrentUserid();
        bool IsLoggedIn();
        void LogIn(UserBase user, params Claim[] extraCalims);
        void LogOut();
    }
}