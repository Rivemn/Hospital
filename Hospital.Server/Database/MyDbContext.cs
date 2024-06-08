using Hospital.Server.Controllers.SalesControllers;
using Hospital.Server.Models;
using Hospital.Server.Models.doctors;
using Hospital.Server.Models.sales;
using Microsoft.EntityFrameworkCore;



namespace Hospital.Server.Database
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }


        public DbSet<Categories> Categories { get; set; }
        public DbSet<Subcategories> Subcategories { get; set; }
        public DbSet<Items> Items { get; set; }

        public DbSet<Customers> Customers { get; set; }
        public DbSet<ShoppingCart> ShoppingCart { get; set; }
        public DbSet<ShoppingCartItems> ShoppingCartItems { get; set; }

        public DbSet<Doctors> Doctors { get; set; }


        public DbSet<Chats> Chats { get; set; }
        public DbSet<Messages> Messages { get; set; }

        public DbSet<Appointments> Appointments { get; set; }

        public DbSet<Orders> Orders { get; set; }
     
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine);
        }

    }
}

