using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.Server.Models
{
    public class Doctors
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DoctorId { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public string Specialty { get; set; }

        [StringLength(15)]
        public string Phone { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(255)]
        public string Photo { get; set; }

        public string Bio { get; set; }

        [StringLength(100)]
        public string WorkingHours { get; set; }

        [StringLength(255)]
        public string PasswordHash { get; set; }
    }
}
