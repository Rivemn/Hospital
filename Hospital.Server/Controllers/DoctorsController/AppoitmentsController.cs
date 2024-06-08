using Hospital.Server.Database;
using Hospital.Server.Models.doctors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Hospital.Server.Controllers.DoctorsController
{
    public class AppointmentDTO
    {
        public int CustomerID { get; set; }
        public int DoctorID { get; set; }
        public DateTime AppointmentDate { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AppointmentsController(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet]
        public ActionResult<IEnumerable<AppointmentDTO>> GetAppointments()
        {
            var appointments = _context.Appointments.Select(a => new AppointmentDTO
            {
                CustomerID = a.CustomerID,
                DoctorID = a.DoctorID,
                AppointmentDate = a.AppointmentDate
            }).ToList();

            return Ok(appointments);
        }

        [HttpPost]
        public ActionResult<AppointmentDTO> CreateAppointment(AppointmentDTO appointmentDto)
        {
            var appointment = new Appointments
            {
                CustomerID = appointmentDto.CustomerID,
                DoctorID = appointmentDto.DoctorID,
                AppointmentDate = appointmentDto.AppointmentDate
            };

            _context.Appointments.Add(appointment);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetAppointments), new { id = appointment.AppointmentID }, appointmentDto);
        }

        [HttpGet("{id}")]
        public ActionResult<AppointmentDTO> GetAppointment(int id)
        {
            var appointment = _context.Appointments
                .Where(a => a.AppointmentID == id)
                .Select(a => new AppointmentDTO
                {
                    CustomerID = a.CustomerID,
                    DoctorID = a.DoctorID,
                    AppointmentDate = a.AppointmentDate
                })
                .FirstOrDefault();

            if (appointment == null)
            {
                return NotFound();
            }

            return Ok(appointment);
        }
    }
}
