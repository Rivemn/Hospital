using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.Server.Models.sales
{
    public class Orders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderID { get; set; }

        public int CustomerID { get; set; }
        public int CartID { get; set; }
        public DateTime OrderDate { get; set; }

        public string DeliveryPoint { get; set; }

        [ForeignKey("CustomerID")]
        public Customers Customer { get; set; }

        [ForeignKey("CartID")]
        public ShoppingCart ShoppingCart { get; set; }
    }
}
