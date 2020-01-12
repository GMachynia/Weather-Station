using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace WeatherStationService.Entities
{
    [Table("Measurements")]
    public class MeasurementModel
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "Date")]
        public DateTime DateTime { get; set; }
        public float Moisture { get; set; }
        public float Pressure { get; set; }
        public float Altitude { get; set; }
        public float Temperature { get; set; }
    }
}
