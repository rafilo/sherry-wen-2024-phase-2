using Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Services;
public class UserWebsitesService: IUserWebsitesService {
    private readonly IMongoCollection<UserInfo> _userWebsiteCollection;


    public UserWebsitesService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _userWebsiteCollection = database.GetCollection<UserInfo>(mongoDBSettings.Value.UserWebsitesCollectionName);
    }
    
    //public async Task<UserWebsites> GetUserWebsitesByEmailAsync(string userEmail) { }
    //public async Task CreateUserWebsitesAsync(UserWebsites userWebsites) { }
    //public async Task UpdateUserWebsitesAsync(string userEmail, string userWebsite) {}
    //public async Task DeleteUserWebsitesAsync(string userEmail) { }
}