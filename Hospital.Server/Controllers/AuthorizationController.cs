using Hospital.Server.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Hospital.Server.Models;
namespace Hospital.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AuthorizationController(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost("customer")]
        public IActionResult AuthorizationCustomer([FromBody] UserLogin userLogin)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.Email == userLogin.Email && c.PasswordHash == userLogin.Password);
            if (customer != null)
            {
                // Авторизация прошла успешно, можно создать сессию или куки
                return Ok(new { message = "Login successful", userType = "Customer", firstName = customer.FirstName, lastName = customer.LastName, userId = customer.CustomerID, email = customer.Email, phone = customer.Phone, });
            }

            return Unauthorized(new { message = "Invalid credentials" });
        }

        [HttpPost("doctor")]
        public IActionResult AuthorizationDoctor([FromBody] UserLogin userLogin)
        {
            var doctor = _context.Doctors.FirstOrDefault(d => d.Email == userLogin.Email && d.PasswordHash == userLogin.Password);
            if (doctor != null)
            {
                // Авторизация прошла успешно, можно создать сессию или куки
                return Ok(new { message = "Login successful", userType = "Doctor", userName = doctor.FirstName });
            }

            return Unauthorized(new { message = "Invalid credentials" });
        }
    }
}