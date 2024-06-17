namespace Models;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

public class UserWebsites
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string UserEmail { get; set; }
   
    [BsonElement("items")]
    [JsonPropertyName("items")]
    public string UserWebsiteContent { get; set; } 
}