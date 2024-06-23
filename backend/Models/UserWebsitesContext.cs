using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;

public class UserWebsitesContext : DbContext{

    public UserWebsitesContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Models.UserInfo> UserInfo { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Models.UserInfo>().ToCollection("user_websites_dotnet");
        base.OnModelCreating(modelBuilder);
    }

}