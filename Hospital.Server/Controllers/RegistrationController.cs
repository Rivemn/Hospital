using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Hospital.Server.Models;
using Hospital.Server.Database;


namespace Hospital.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly MyDbContext _context;

        public RegistrationController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost("customer")]
        public IActionResult Register([FromBody] CustomerDto customerDto)
        {
            if (ModelState.IsValid)
            {
                var customer = new Customers
                {
                    FirstName = customerDto.FirstName,
                    LastName = customerDto.LastName,
                    Email = customerDto.Email,
                    Phone = customerDto.Phone,
                    Address = customerDto.Address,
                    PasswordHash = customerDto.PasswordHash // Предполагаем, что пароль уже хэширован
                };

                _context.Customers.Add(customer);
                _context.SaveChanges();
                return Ok(new { message = "Registration successful" });
            }

            return BadRequest(ModelState);
        }
    }
}