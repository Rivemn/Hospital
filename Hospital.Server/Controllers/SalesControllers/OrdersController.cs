using Hospital.Server.Database;
using Hospital.Server.Models.sales;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Server.Controllers.SalesControllers
{


    public class CreateOrderDTO
    {
        public int CustomerId { get; set; }
        public int CartID { get; set; }
        public string DeliveryPoint { get; set; }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public OrdersController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDTO orderDTO)
        {
            // Find the shopping cart using the provided ID in orderDTO
            var shoppingCart = await _context.ShoppingCart.FindAsync(orderDTO.CartID);
            if (shoppingCart == null)
            {
                return NotFound("Shopping cart not found.");
            }

            // Create a new order entity
            var newOrder = new Orders
            {

               
                // Map properties from orderDTO to the new order
                CustomerID = orderDTO.CustomerId,
                CartID = shoppingCart.CartID,
                OrderDate = DateTime.UtcNow,
                DeliveryPoint=orderDTO.DeliveryPoint
                // Assuming there are more properties to set...
                // TotalAmount = orderDTO.TotalAmount,
                // etc...
            };

            // Add the new order to the Orders DbSet
            _context.Orders.Add(newOrder);

            // Optionally, you might want to update the shopping cart, for example to mark it as processed
            // shoppingCart.IsProcessed = true;
            // _context.ShoppingCarts.Update(shoppingCart);

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Handle the exception, log it, and return an appropriate response
                // For example, you can log the error and return a BadRequest with the error message
                // _logger.LogError(ex, "An error occurred while saving the order.");
                return StatusCode(500, "An error occurred while creating the order.");
            }

            // Return a response indicating success, possibly including the new order details
            return Ok(newOrder);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Orders>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
    }
}