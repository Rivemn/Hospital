using Hospital.Server.Database;
using Hospital.Server.Models.doctors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Server.Controllers.DoctorsController
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public MessagesController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("chat/{chatId}")]
        public async Task<ActionResult<IEnumerable<Messages>>> GetMessages(int chatId)
        {
            var messages = await _context.Messages
                                         .Where(m => m.ChatID == chatId)
                                         .Include(m => m.SenderDoctor)
                                         .Include(m => m.SenderCustomer)
                                         .ToListAsync();

            return Ok(messages);
        }

        [HttpPost]
        public async Task<ActionResult<Messages>> SendMessage(Messages message)
        {
            message.Timestamp = DateTime.UtcNow;
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMessages), new { chatId = message.ChatID }, message);
        }
    }
}
