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
    }
}