using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace WeatherStationService.Entities
{
   public class MeasurementRepository
    {
        private readonly MeasurementDbContext context;

        public MeasurementRepository()
        {
            context = new MeasurementDbContext();
        }
        public async Task AddToDbAsync(MeasurementModel measurement)
        {
            context.Database.EnsureCreated();
            await context.Measurements.AddAsync(measurement);
            await context.SaveChangesAsync();
        }
      
    }
}
