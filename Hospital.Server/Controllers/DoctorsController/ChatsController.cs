using Hospital.Server.Database;
using Hospital.Server.Models.doctors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Server.Controllers.DoctorsController
{
    public class ChatDto
    {
        public int ChatId { get; set; }
        public int CustomerId { get; set; }
        public int DoctorId { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ChatsController(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChatDto>>> GetChats()
        {
            var chats = await _context.Chats
                .Include(c => c.Customer)
                .Include(c => c.Doctor)

                .Select(c => new ChatDto
                {
                    ChatId = c.ChatID,
                    CustomerId = c.CustomerID,
                    DoctorId = c.DoctorID,

                })
                .ToListAsync();
            return Ok(chats);
        }

        [HttpGet("participants")]
        public async Task<ActionResult> GetChatByParticipants(int customerID)
        {
            var chat = await _context.Chats
                .Where(c => c.CustomerID == customerID )
                .Select(c => new
                {
                    c.ChatID,
                    c.CustomerID,
                    c.DoctorID
                })
                .ToListAsync(); ;

            if (chat == null)
            {
                return NotFound();
            }

            return Ok(chat);
        }

        [HttpGet("by-names")]
        public async Task<ActionResult<object>> GetChatIdByNames(string customerFirstName, string customerLastName, string doctorFirstName, string doctorLastName)
        {
            try
            {
                var chat = await _context.Chats
                    .Include(c => c.Customer)
                    .Include(c => c.Doctor)
                    .Where(c => c.Customer.FirstName == customerFirstName && c.Customer.LastName == customerLastName
                             && c.Doctor.FirstName == doctorFirstName && c.Doctor.LastName == doctorLastName)
                    .FirstOrDefaultAsync();

                if (chat == null)
                {
                    return NotFound(new { message = "Chat not found" });
                }

                return Ok(new { chatId = chat.ChatID });
            }
            catch (Exception ex)
            {
                // Log the exception details
              
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("{customerId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetChatsByCustomer(int customerId)
        {
            var chats = await _context.Chats
                .Include(c => c.Customer)
                .Include(c => c.Doctor)
                .Where(c => c.CustomerID == customerId)
                .Select(c => new
                {
                   chatId= c.ChatID,
                    customerId=c.CustomerID,
                   doctorId= c.DoctorID,

                })
                .ToListAsync();

            return Ok(chats);
        }
    }
    public class CreateChatRequest
    {
        public int CustomerID { get; set; }
        public int DoctorID { get; set; }
    }
  
}


