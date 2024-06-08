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

        public bool SenderDoctorID { get; set; } // Changed type to bool
        public bool SenderCustomerID { get; set; } // Changed type to bool

        public string MessageText { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        public Chats Chat { get; set; }

       


    }
}
