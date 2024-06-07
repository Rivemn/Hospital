using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Numerics;

namespace Hospital.Server.Models.doctors
{
    public class Messages
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MessageID { get; set; }

        [ForeignKey("Chat")]
        public int ChatID { get; set; }

        public int? SenderDoctorID { get; set; }

        public int? SenderCustomerID { get; set; }

        public string MessageText { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        public Chats Chat { get; set; }

        public virtual Doctors SenderDoctor { get; set; }
        public virtual Customers SenderCustomer { get; set; }


    }
}
