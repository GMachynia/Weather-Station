using Microsoft.EntityFrameworkCore;

namespace WebAPI.Entities
{
    public class MeasurementContext : DbContext
    {
        public virtual DbSet<Measurement> Measurements { get; set; }

        public MeasurementContext(DbContextOptions<MeasurementContext> options) : base(options) { }
        public MeasurementContext() { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Data Source=C:\\Measurements\\measurementsDb.sqlite");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Measurement>().ToTable("Measurements");
        }
    }
}
