using Hospital.Server.Database;
using Hospital.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Server.Controllers.SalesController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ItemsController(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet(Name = "items")]
        public IEnumerable<dynamic> GetItems()
        {
            var items = _context.Items.Select(item => new
            {
                item.ItemId,
                item.ItemName,
                item.ItemDescription,
                item.UnitPrice,
                item.QuantityAvailable,
                item.ReleaseForm,
                item.CountryOfOrigin,
                item.SubcategoryId,
                item.Manufacturer,
                item.Photo
            }).ToList();

            return items;
        }

        [HttpGet("{subcategoryName}")]
        public ActionResult<IEnumerable<dynamic>> GetItemsBySubcategoryName(string subcategoryName)
        {
            var subcategory = _context.Subcategories
                .Where(sc => sc.SubcategoryName == subcategoryName)
                .Include(sc => sc.Items)
                .FirstOrDefault();

            if (subcategory == null)
            {
                return NotFound();
            }

            var items = subcategory.Items.Select(item => new
            {

                item.ItemId,
                item.ItemName,
                item.ItemDescription,
                item.UnitPrice,
                item.QuantityAvailable,
                item.ReleaseForm,
                item.CountryOfOrigin,
                item.SubcategoryId,
                item.Manufacturer,
                item.Photo
            }).ToList();

            return Ok(items);
        }


        [HttpGet("item/{itemName}")]
        [Produces("application/json")]
        public ActionResult<dynamic> GetItemByName(string itemName)
        {
            var item = _context.Items
                .Where(i => i.ItemName == itemName)
                .FirstOrDefault();

            if (item == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                item.ItemId,
                item.ItemName,
                item.ItemDescription,
                item.UnitPrice,
                item.QuantityAvailable,
                item.ReleaseForm,
                item.CountryOfOrigin,
                item.SubcategoryId,
                item.Manufacturer,
                item.Photo
            });
        }

    }
}