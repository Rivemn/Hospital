using Hospital.Server.Database;
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
               
                item.ItemName,
                item.ItemDescription,
                item.UnitPrice,
                item.QuantityAvailable,
                item.ReleaseForm,
                item.CountryOfOrigin,
                item.Manufacturer,
                item.Photo
            }).ToList();

            return Ok(items);
        }




    }
}
