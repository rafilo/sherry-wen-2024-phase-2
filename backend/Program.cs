using Models;
using Services;
using Vite.AspNetCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Allow CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add Vite services.
builder.Services.AddViteServices();

// Using MongoDB as the database for this project
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserInfoService, UserInfoService>();
//builder.Services.AddScoped<IUserWebsitesServices, UserWebsitesService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // WebSockets support is required for HMR (hot module reload).
    // Uncomment the following line if your pipeline doesn't contain it.
    // app.UseWebSockets();
    // Enable all required features to use the Vite Development Server.
    // Pass true if you want to use the integrated middleware.
    app.UseViteDevelopmentServer(/* false */);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    //app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    //app.UseHsts();
    var webRootProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "wwwroot"));
    var distProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "dist"));
    var compositeProvider = new CompositeFileProvider(webRootProvider, distProvider);
    app.Environment.WebRootFileProvider = compositeProvider;
    app.Environment.WebRootPath = distProvider.Root;
}

app.UseCors("AllowReactApp");

// add swagger for API testing
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
