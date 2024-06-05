using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.Server.Models.sales
{
    public class ShoppingCartItems
    {
        [Key]
        public int CartItemID { get; set; }

        public int CartID { get; set; }

        public int ItemID { get; set; }

        public int Quantity { get; set; }

        [ForeignKey("CartID")]
        public virtual ShoppingCart ShoppingCart { get; set; }

        [ForeignKey("ItemID")]
        public virtual Items Items { get; set; }




    }
}
