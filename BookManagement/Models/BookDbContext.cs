using Microsoft.EntityFrameworkCore;

namespace BookManagement.Models
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {

        }

        public DbSet<Book> Books { get; set; }
        public object Book { get; internal set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=localhost; initial Catalog=book; User Id=sa; password=Ishan#5411696; TrustServerCertificate=True");
        }
    }
}
