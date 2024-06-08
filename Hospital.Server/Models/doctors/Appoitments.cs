using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace Hospital.Server.Models.doctors
{
    public class Appointments
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AppointmentID { get; set; }

        [ForeignKey("Customer")]
        public int CustomerID { get; set; }

        [ForeignKey("Doctor")]
        public int DoctorID { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        public Customers Customer { get; set; }
        public Doctors Doctor { get; set; }
    }
}
