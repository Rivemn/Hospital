using System.ComponentModel.DataAnnotations;

namespace Hospital.Server.Models
{
    public class CustomerDto
    {
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        [MaxLength(200)]
        public string Address { get; set; }

        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; }
    }
}
