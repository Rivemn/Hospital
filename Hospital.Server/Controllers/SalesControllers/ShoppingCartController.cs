using Hospital.Server.Database;
using Hospital.Server.Models.sales;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.Server.Controllers.SalesControllers
{

    public class CreateShoppingCartDTO
    {
        public int CustomerId { get; set; }
        public List<CartItemDTO> CartItems { get; set; }
    }

    public class CartItemDTO
    {
        public int ItemId { get; set; }
        public int Quantity { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {

        private readonly MyDbContext _context;

        public ShoppingCartController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> CreateShoppingCart([FromBody] CreateShoppingCartDTO cartDTO)
        {
            if (cartDTO == null || !cartDTO.CartItems.Any())
            {
                return BadRequest("Invalid cart data.");
            }

            var shoppingCart = new ShoppingCart
            {
                CustomerID = cartDTO.CustomerId,
                ShoppingCartItems = cartDTO.CartItems.Select(i => new ShoppingCartItems
                {
                    ItemID = i.ItemId,
                    Quantity = i.Quantity
                }).ToList()
            };

            _context.ShoppingCart.Add(shoppingCart);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShoppingCart), new { id = shoppingCart.CartID }, shoppingCart);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCart(int id)
        {
            var shoppingCart = await _context.ShoppingCart.FindAsync(id);

            if (shoppingCart == null)
            {
                return NotFound();
            }

            return shoppingCart;
        }
    }
}