namespace Hospital.Server.Models.sales
{
    public class Orders
    {
        public int OrderID { get; set; }
        public int CustomerID { get; set; }
        public int CartID { get; set; }
        public DateTime OrderDate { get; set; }
        public int OrderStatusID { get; set; }
        public string DeliveryPoint { get; set; }

        // Навигационные свойства
        public Customers Customer { get; set; }
        public ShoppingCart ShoppingCart { get; set; }
        public OrderStatuses OrderStatuses { get; set; }
    }
}
