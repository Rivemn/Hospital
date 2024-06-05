using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.Server.Models.sales
{
    public class ShoppingCart
    {

        [Key]
        public int CartID { get; set; }

        public int? CustomerID { get; set; }

        [ForeignKey("CustomerID")]
        public virtual Customers Customer { get; set; }

        public virtual ICollection<ShoppingCartItems> ShoppingCartItems { get; set; }


    }
}
