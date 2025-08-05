using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
//If you sepcify options in here you need to specify the options in the class as well and pass it to the dbcontext. 
//We use the options here to supply the connection string defined in appsettings.development.json
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline. middle ware, we can do things with the request, we can manipulate it, authenticate it

app.UseCors(x => x.AllowAnyHeader().AllowAnyHeader()
.WithOrigins("http://localhost:3000", "https://localhost:3000"));
app.MapControllers(); //provides routing,when we do a api request it passes that on to a specific controller

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();

    logger.LogError(ex,"An error occured during mirgation");
}
app.Run();
