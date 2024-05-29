using Hospital.Server.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcategoriesController : ControllerBase
    {

        private readonly MyDbContext _context;

        public SubcategoriesController(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }




    }
}
