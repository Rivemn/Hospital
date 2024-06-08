using Hospital.Server.Database;
using Hospital.Server.Models.doctors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Server.Controllers.DoctorsController
{
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
        public async Task<ActionResult<IEnumerable<Chats>>> GetChats()
        {
            var chats = await _context.Chats
                                      .Include(c => c.Customer)
                                      .Include(c => c.Doctor)
                                      .ToListAsync();
            return Ok(chats);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Chats>> GetChat(int id)
        {
            var chat = await _context.Chats
                                     .Include(c => c.Customer)
                                     .Include(c => c.Doctor)
                                     .FirstOrDefaultAsync(c => c.ChatID == id);

            if (chat == null)
            {
                return NotFound();
            }

            return Ok(chat);
        }
        [HttpGet("participants")]
        public async Task<ActionResult<Chats>> GetChatByParticipants(int customerID, int doctorID)
        {
            var chat = await _context.Chats
                .Where(c => c.CustomerID == customerID && c.DoctorID == doctorID)
                .FirstOrDefaultAsync();

            if (chat == null)
            {
                return NotFound();
            }

            return chat;
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

        [HttpPost]
        public async Task<ActionResult<Chats>> CreateChat([FromBody] CreateChatRequest request)
        {
            var chat = new Chats
            {
                CustomerID = request.CustomerID,
                DoctorID = request.DoctorID
            };

            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChatByParticipants), new { customerID = chat.CustomerID, doctorID = chat.DoctorID }, chat);
        }
    }

    public class CreateChatRequest
    {
        public int CustomerID { get; set; }
        public int DoctorID { get; set; }
    }
}