using Domain;
using Microsoft.EntityFrameworkCore;

//dotnet ef migrations add InitialCreate -p Persistence -s API
namespace Persistence
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public required DbSet<Activity> Activities { get; set; }
    }
}