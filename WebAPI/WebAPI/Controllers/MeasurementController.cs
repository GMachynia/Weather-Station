using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAPI.Entities;
using WebAPI.Repositories;
using WebAPI.RequestDtos;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MeasurementController : ControllerBase
    {
        private readonly MeasurementRepository _repository;

        public MeasurementController(MeasurementRepository measurementRepository)
        {         
            _repository = measurementRepository;
        }

        [HttpPost]
        public ActionResult<IEnumerable<Measurement>> Post([FromBody]FromToDatesModel datesModel)
        {
            var records = _repository.GetRecordsFromDb(datesModel);
            return Ok(records);
        }
    }
}

