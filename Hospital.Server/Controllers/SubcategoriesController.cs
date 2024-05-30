using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Hospital.Server.Database;
using Hospital.Server.Models;

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

        [HttpGet(Name = "subcategories")]
        public IEnumerable<dynamic> GetCategories()
        {
            var subcategories = _context.Subcategories.Select(a => new
            {
                CategoryId = a.CategoryId,
                SubcategoryName = a.SubcategoryName
            }).ToList();

            return subcategories;
        }
    }
}
