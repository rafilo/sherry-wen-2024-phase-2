using Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Services;

public class UserInfoService: IUserInfoService {
    private readonly IMongoCollection<UserInfo> _userInfoCollection;


    public UserInfoService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _userInfoCollection = database.GetCollection<UserInfo>(mongoDBSettings.Value.UserInfoCollectionName);
    }

    public async Task<List<UserInfo>> GetUserInfoByEmailAsync(string userEmail) {
        return await _userInfoCollection.Find(x => x.userEmail == userEmail).ToListAsync();
    }

    public async Task<List<UserInfo>> GetAllUserInfoAsync() {
        return await _userInfoCollection.Find(x => true).ToListAsync();
    }

    public async Task CreateUserInfoAsync(UserInfo userInfo) {
        await _userInfoCollection.InsertOneAsync(userInfo);
        return;
    }
    public async Task UpdateUserInfoAsync(string userEmail, object userInfo) {

        FilterDefinition<UserInfo> filter = Builders<UserInfo>.Filter.Eq("userEmail", userEmail);
        UpdateDefinition<UserInfo> update = Builders<UserInfo>.Update.AddToSet<object>("userInfo", userInfo);
        await _userInfoCollection.UpdateOneAsync(filter, update);
        return;
    }
    public async Task DeleteUserInfoAsync(string userEmail) {
        FilterDefinition<UserInfo> filter = Builders<UserInfo>.Filter.Eq("userEmail", userEmail);
        await _userInfoCollection.DeleteOneAsync(filter);
        return;
     }
}