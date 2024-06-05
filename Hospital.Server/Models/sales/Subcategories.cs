using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.Server.Models.sales
{
    public class Subcategories
    {
        [Key]
        [Column("SubcategoryId")]
        public int SubcategoryId { get; set; }

        [Column("SubcategoryName")]
        public string SubcategoryName { get; set; }

        [ForeignKey("Categories")]
        public int CategoryId { get; set; }
        public Categories Categories { get; set; }

        public ICollection<Items> Items { get; set; }

    }
}
