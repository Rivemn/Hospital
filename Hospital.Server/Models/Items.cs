using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.Server.Models
{
    public class Items
    {
        [Key]
        [Column("ItemID")]
        public int ItemId { get; set; }

        [Required]
        [MaxLength(100)]
        public string ItemName { get; set; }

        public string ItemDescription { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal UnitPrice { get; set; }

        [Required]
        public int QuantityAvailable { get; set; }

        [MaxLength(50)]
        public string ReleaseForm { get; set; }

        [MaxLength(50)]
        public string CountryOfOrigin { get; set; }

        [Required]
        [ForeignKey("SubcategoryId")]
        public int SubcategoryId { get; set; }
        public Subcategories Subcategory { get; set; }

        [MaxLength(100)]
        public string Manufacturer { get; set; }

        public string Photo { get; set; }

        
       
    }
}
