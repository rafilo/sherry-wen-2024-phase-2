using Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;

namespace Services;

public class UserInfoService: IUserInfoService {
    //private readonly IMongoCollection<UserInfo> _userInfoCollection;
    private readonly UserInfoContext _userInfoCollection;


    public UserInfoService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        //IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        //UserInfoContext database = UserInfoContext.Create(client.GetDatabase(mongoDBSettings.Value.DatabaseName));
        //_userInfoCollection = UserInfoContext.GetDB(database, mongoDBSettings.Value.UserInfoCollectionName);
        //_userInfoCollection = database.GetCollection<UserInfo>(mongoDBSettings.Value.UserInfoCollectionName);
        var dbContextOptions =
            new DbContextOptionsBuilder<UserInfoContext>().UseMongoDB(client,mongoDBSettings.Value.DatabaseName);
        _userInfoCollection = new UserInfoContext(dbContextOptions.Options);
    }

    public async Task<UserInfo> GetUserInfoByEmailAsync(string userEmail) {
        var userInfo = await _userInfoCollection.UserInfo.SingleOrDefaultAsync(user => user.userEmail == userEmail);
        if (userInfo == null){
            return null;
        }
        return userInfo;
    }

    public async Task<List<UserInfo>> GetAllUserInfoAsync() {
        return await _userInfoCollection.UserInfo.ToListAsync();
    }

    public async Task CreateUserInfoAsync(UserInfo userInfo) {
        _userInfoCollection.UserInfo.Add(userInfo);
        await _userInfoCollection.SaveChangesAsync();
    }
    public async Task UpdateUserInfoAsync(UserInfo userInfo) {
        _userInfoCollection.Entry(userInfo).State = EntityState.Modified;
        await _userInfoCollection.SaveChangesAsync();
    }
    public async Task DeleteUserInfoAsync(string userEmail) {
        var user = await _userInfoCollection.UserInfo.SingleOrDefaultAsync(user => user.userEmail == userEmail);
        if (user != null)
            {
                _userInfoCollection.UserInfo.Remove(user);
                await _userInfoCollection.SaveChangesAsync();
            }
     }
     public async Task<bool> UserInfoExistsAsync(string userEmail){
        return await _userInfoCollection.UserInfo.AnyAsync(e => e.userEmail == userEmail);
     }
}