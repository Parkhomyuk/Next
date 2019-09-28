using Microsoft.EntityFrameworkCore;
using Next.API.Models;

namespace Next.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext (DbContextOptions <DataContext> options): base (options) {}
        
        public DbSet<Value> Values { get; set; }    
        
    }
}