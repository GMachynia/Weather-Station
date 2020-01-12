using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;
using WebAPI.RequestDtos;

namespace WebAPI.Repositories
{
    public class MeasurementRepository
    {
        private readonly MeasurementContext context;

        public MeasurementRepository(MeasurementContext context)
        {
            this.context = context;
        }

        public async Task AddToDbAsync(Measurement measurement)
        {
            await context.Measurements.AddAsync(measurement);
            await context.SaveChangesAsync();
        }
        public IEnumerable<Measurement> GetRecordsFromDb(FromToDatesModel fromToDatesModel)
        {
            return context.Measurements.Where(x => x.DateTime >= fromToDatesModel.DateFrom && x.DateTime <= fromToDatesModel.DateTo);
        }
    }
}
