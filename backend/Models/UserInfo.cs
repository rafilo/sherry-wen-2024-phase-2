namespace Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class UserInfo
{   
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public int Id { get; set; }

    
    public string userEmail { get; set; }
}