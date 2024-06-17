using Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Services;

public class MongoDBService {

    private readonly IMongoCollection<User> _userlistCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _userlistCollection = database.GetCollection<User>(mongoDBSettings.Value.CollectionName);
    }

    // since only one user is expected, we can just use the first element of the list
    public async Task<User> GetAsync(string userEmail) {
        var filter = Builders<User>.Filter.Eq("userEmail", userEmail);
        var result = await _userlistCollection.Find(filter).ToListAsync();
        return result.FirstOrDefault();
    }

    public async Task CreateAsync(User userWebsite) {
        await _userlistCollection.InsertOneAsync(userWebsite);
    }
    public async Task UpdateAsync(string id, string movieId) {}
    public async Task DeleteAsync(string id) { }

}