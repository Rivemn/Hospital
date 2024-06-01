using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.Server.Models
{
    public class Categories
    {
        [Key]
        [Column("CategoryId")]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        // Навигационное свойство для связи с подкатегориями
        public ICollection<Subcategories> Subcategories { get; set; }
    }
}
