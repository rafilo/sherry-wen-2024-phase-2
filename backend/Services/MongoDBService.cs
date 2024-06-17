using Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Services;

public class MongoDBService {

    private readonly IMongoCollection<UserInfo> _userlistCollection;
    private readonly IMongoCollection<UserWebsites> _userwebsiteCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _userlistCollection = database.GetCollection<UserInfo>(mongoDBSettings.Value.UserInfoCollectionName);
        _userwebsiteCollection = database.GetCollection<UserWebsites>(mongoDBSettings.Value.UserWebsitesCollectionName);
    }

    public async Task<List<UserInfo>> GetUserInfoByEmailAsync(string userEmail) {
        return await _userlistCollection.Find(x => x.userEmail == userEmail).ToListAsync();
     }
    public async Task CreateUserInfoAsync(UserInfo userInfo) {
        await _userlistCollection.InsertOneAsync(userInfo);
        return;
    }
    public async Task UpdateUserInfoAsync(string userEmail, object userInfo) {

        FilterDefinition<UserInfo> filter = Builders<UserInfo>.Filter.Eq("userEmail", userEmail);
        UpdateDefinition<UserInfo> update = Builders<UserInfo>.Update.AddToSet<object>("userInfo", userInfo);
        await _userlistCollection.UpdateOneAsync(filter, update);
        return;
    }
    public async Task DeleteUserInfoAsync(string userEmail) {
        FilterDefinition<UserInfo> filter = Builders<UserInfo>.Filter.Eq("userEmail", userEmail);
        await _userlistCollection.DeleteOneAsync(filter);
        return;
     }

    //public async Task<UserWebsites> GetUserWebsitesByEmailAsync(string userEmail) { }
    //public async Task CreateUserWebsitesAsync(UserWebsites userWebsites) { }
    //public async Task UpdateUserWebsitesAsync(string userEmail, string userWebsite) {}
    //public async Task DeleteUserWebsitesAsync(string userEmail) { }

}