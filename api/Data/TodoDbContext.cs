using Microsoft.EntityFrameworkCore;

public class TodoDbContext : DbContext
{
    public DbSet<TodoItem> Todos { get; set;}
    

    static TodoDbContext() {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
    
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
    }

}