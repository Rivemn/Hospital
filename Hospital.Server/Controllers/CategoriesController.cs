using Hospital.Server.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CategoriesController(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        [HttpGet(Name = "categories")]
        public IEnumerable<dynamic> GetCategories()
        {
            var categories = _context.Categories.Select(a => new
            {
                CategoryName = a.CategoryName
            })  .ToList();

            return categories;
        }



    }
}
