using Models;

namespace Services;
    public interface IUserInfoService
    {
         Task<UserInfo> GetUserInfoByEmailAsync(string userEmail);
         Task<List<UserInfo>> GetAllUserInfoAsync();
         Task CreateUserInfoAsync(UserInfo userInfo);
         Task UpdateUserInfoAsync(UserInfo userInfo);
         Task DeleteUserInfoAsync(UserInfo userInfo);
         Task<bool> UserInfoExistsAsync(string userEmail);
    }