using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Hospital.Server.Database;
using Hospital.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Server.Controllers.SalesController
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
                a.CategoryId,
                a.SubcategoryName
            }).ToList();

            return subcategories;
        }



        [HttpGet("{categoryName}")]
        public ActionResult<IEnumerable<dynamic>> GetSubcategoriesByCategoryName(string categoryName)
        {
            var category = _context.Categories
                .Where(c => c.CategoryName == categoryName)
                .Include(c => c.Subcategories)
                .FirstOrDefault();

            if (category == null)
            {
                return NotFound();
            }

            var subcategories = category.Subcategories.Select(sc => new
            {
               
                sc.SubcategoryName
            }).ToList();

            return Ok(subcategories);
        }
    }
}
