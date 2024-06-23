using Models;

namespace Services;
    public interface IUserInfoService
    {
        // 获取用户信息
         Task<UserInfo> GetUserInfoByEmailAsync(string userEmail);
         Task<List<UserInfo>> GetAllUserInfoAsync();
         Task CreateUserInfoAsync(UserInfo userInfo);
         Task UpdateUserInfoAsync(UserInfo userInfo);
         Task DeleteUserInfoAsync(string userEmail);
         Task<bool> UserInfoExistsAsync(string userEmail);
    }