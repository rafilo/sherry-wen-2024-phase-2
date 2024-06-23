namespace Models;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

public class UserWebsites
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId _id { get; set; }

    public string UserEmail { get; set; }
    
    [BsonElement("items")]
    [JsonPropertyName("items")]
    public string UserWebsiteContent { get; set; } 

    public UserWebsites(){
        _id = ObjectId.GenerateNewId();
    }
}