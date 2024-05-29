using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.Server.Models
{
    public class Subcategories
    {
        [Key]
        [Column("SubcategoryId")]
        public int SubcategoryId { get; set; }
        public string SubcategoryName { get; set; }

        [ForeignKey("Categories")]
        public int CategoryId { get; set; }
    }
}
