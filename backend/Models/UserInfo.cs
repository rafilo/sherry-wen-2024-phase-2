namespace Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class UserInfo
{   
    public required string userEmail { get; set; }

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId? _id { get; set; }


    public UserInfo(){
        _id = ObjectId.GenerateNewId();
    }
}