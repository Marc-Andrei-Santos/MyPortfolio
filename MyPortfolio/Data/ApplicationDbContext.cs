using Microsoft.EntityFrameworkCore;
using MyPortfolio.Models;

namespace MyPortfolio.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public required DbSet<ContactForm> ContactForms { get; set; }
    }
}