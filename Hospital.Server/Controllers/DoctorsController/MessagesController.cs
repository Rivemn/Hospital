using Hospital.Server.Database;
using Hospital.Server.Models.doctors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Server.Controllers.DoctorsController
{
    public class SendMessageDTO
    {
        public int ChatID { get; set; }
        public bool SenderDoctorID { get; set; }
        public bool SenderCustomerID { get; set; }
        public string MessageText { get; set; }
        public DateTime Timestamp { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public MessagesController(MyDbContext context)
        {
            _context = context;
        }
        [HttpGet("{chatId}")]
        public async Task<ActionResult<IEnumerable<SendMessageDTO>>> GetMessages(int chatId)
        {
            var messages = await _context.Messages
                .Where(m => m.ChatID == chatId)
                .OrderBy(m => m.Timestamp)
                .Select(m => new SendMessageDTO
                {
                    ChatID = m.ChatID,
                    SenderDoctorID = m.SenderDoctorID,
                    SenderCustomerID = m.SenderCustomerID,
                    MessageText = m.MessageText,
                    Timestamp = m.Timestamp
                })
                .ToListAsync();

            return Ok(messages);
        }


        [HttpPost]
        [HttpPost]
        public async Task<ActionResult> SendMessage([FromBody] SendMessageDTO messageDTO)
        {
            if (messageDTO == null || string.IsNullOrEmpty(messageDTO.MessageText))
            {
                return BadRequest("Invalid message data.");
            }

            var message = new Messages
            {
                ChatID = messageDTO.ChatID,
                SenderDoctorID = messageDTO.SenderDoctorID,
                SenderCustomerID = messageDTO.SenderCustomerID,
                MessageText = messageDTO.MessageText,
                Timestamp = messageDTO.Timestamp
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}