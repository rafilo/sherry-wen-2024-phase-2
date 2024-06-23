namespace Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class UserInfo
{   
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId _id { get; set; }

    
    public required string userEmail { get; set; }
}