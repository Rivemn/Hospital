using Hospital.Server.Database;
using Hospital.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Server.Controllers.DoctorsController
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public DoctorsController(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet(Name = "doctors")]
        public async Task<ActionResult<IEnumerable<object>>> GetDoctors()
        {
            var doctors = await _context.Doctors
                .Select(d => new
                {
                    d.DoctorId,
                    d.FirstName,
                    d.LastName,
                    d.Specialty,
                    d.Phone,
                    d.Email,
                    d.Photo,
                    d.Bio,
                    d.WorkingHours
                })
                .ToListAsync();

            return Ok(doctors);
        }
    
    [HttpGet("{firstName}/{lastName}", Name = "doctorByName")]
    public async Task<ActionResult<object>> GetDoctorByName(string firstName, string lastName)
    {
        var doctor = await _context.Doctors
            .Where(d => d.FirstName == firstName && d.LastName == lastName)
            .Select(d => new
            {
                d.FirstName,
                d.LastName,
                d.Specialty,
                d.Phone,
                d.Email,
                d.Photo,
                d.Bio,
                d.WorkingHours
            })
            .FirstOrDefaultAsync();

        if (doctor == null)
        {
            return NotFound();
        }

        return Ok(doctor);
    }
}
}