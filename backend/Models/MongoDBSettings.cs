namespace Models;

public class MongoDBSettings
{
    public string ConnectionURI { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string UserInfoCollectionName { get; set; } = null!;
    public string UserWebsitesCollectionName { get; set; } = null!;
}
