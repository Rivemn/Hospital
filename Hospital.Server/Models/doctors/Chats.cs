using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace Hospital.Server.Models.doctors
{
    public class Chats
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ChatID { get; set; }

        [ForeignKey("Customer")]
        public int CustomerID { get; set; }

        [ForeignKey("Doctor")]
        public int DoctorID { get; set; }

        public Customers Customer { get; set; }
        public Doctors Doctor { get; set; }
    }
}
