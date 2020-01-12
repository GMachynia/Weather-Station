using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    public class Measurement
    {
        public float Temperature { get; set; }
        public float Pressure { get; set; }
        public float Moisture { get; set; }
        public float Altitude { get; set; }
        [Column(TypeName = "Date")]
        public DateTime DateTime { get; set; }
        [Key]
        public int Id { get; set; }
    }
}
