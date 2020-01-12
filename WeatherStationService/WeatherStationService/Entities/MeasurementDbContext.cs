using FluentAssertions.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace WeatherStationService.Entities
{
   public class MeasurementDbContext:DbContext
    {
        public virtual DbSet<MeasurementModel> Measurements { get; set; }

        public MeasurementDbContext(DbContextOptions<MeasurementDbContext> options) : base(options) { }
        public MeasurementDbContext() { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Data Source=C:\\Measurements\\measurementsDb.sqlite");
        }

   
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MeasurementModel>().ToTable("Measurements");

        }
    }
}
