namespace Hospital.Server.Models.sales
{
    public class OrderStatuses
    {
        public int StatusID { get; set; }
        public string StatusName { get; set; }

        // Навигационные свойства
        public ICollection<Orders> Orders { get; set; }
    }
}
