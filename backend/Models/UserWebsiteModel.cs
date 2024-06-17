namespace Models;

public class UserWebsiteModel
{
    public int Id { get; set; }
    public string userEmail { get; set; }
    public string familyName { get; set; }
    public string givenName { get; set; }
    public object userData { get; set; }
}