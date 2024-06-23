using Models;

namespace Services;
    public interface IUserInfoService
    {
        // 获取用户信息
         Task<List<UserInfo>> GetUserInfoByEmailAsync(string userEmail);
         Task<List<UserInfo>> GetAllUserInfoAsync();
         Task CreateUserInfoAsync(UserInfo userInfo);
         Task UpdateUserInfoAsync(string userEmail, object userInfo);
         Task DeleteUserInfoAsync(string userEmail);
    }