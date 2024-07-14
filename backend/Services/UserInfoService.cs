using Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;

namespace Services;

public class UserInfoService : IUserInfoService
{
    //private readonly IMongoCollection<UserInfo> _userInfoCollection;
    private readonly UserInfoContext _userInfoCollection;


    public UserInfoService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        var dbContextOptions =
            new DbContextOptionsBuilder<UserInfoContext>().UseMongoDB(client, mongoDBSettings.Value.DatabaseName);
        _userInfoCollection = new UserInfoContext(dbContextOptions.Options);
    }

    public async Task<UserInfo> GetUserInfoByEmailAsync(string userEmail)
    {
        var userInfo = await _userInfoCollection.UserInfo.SingleOrDefaultAsync(user => user.userEmail == userEmail);
        if (userInfo == null)
        {
            return null;
        }
        return userInfo;
    }

    public async Task<List<UserInfo>> GetAllUserInfoAsync()
    {
        return await _userInfoCollection.UserInfo.ToListAsync();
    }

    public async Task CreateUserInfoAsync(UserInfo userInfo)
    {
        _userInfoCollection.UserInfo.Add(userInfo);
        await _userInfoCollection.SaveChangesAsync();
    }
    public async Task UpdateUserInfoAsync(UserInfo userInfo)
    {
        var targetUser = (await _userInfoCollection.UserInfo.SingleOrDefaultAsync(user => user.userEmail == userInfo.userEmail))!;
        targetUser.userWebsite = userInfo.userWebsite;
        await _userInfoCollection.SaveChangesAsync();
    }
    public async Task DeleteUserInfoAsync(UserInfo userInfo)
    {
        var user = await _userInfoCollection.UserInfo.SingleOrDefaultAsync(user => user.userEmail == userInfo.userEmail);
        if (user != null)
        {
            _userInfoCollection.UserInfo.Remove(user);
            await _userInfoCollection.SaveChangesAsync();
        }
    }
    public async Task<bool> UserInfoExistsAsync(string userEmail)
    {
        return await _userInfoCollection.UserInfo.AnyAsync(e => e.userEmail == userEmail);
    }
}