using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyPortfolio.Services;

namespace MyPortfolio.Controllers
{
    [Route("[controller]")]
    public class ChatbotController : Controller
    {
        private readonly AIChatbotService _chatbotService;
        private readonly ILogger<ChatbotController> _logger;

        public ChatbotController(AIChatbotService chatbotService, ILogger<ChatbotController> logger)
        {
            _chatbotService = chatbotService;
            _logger = logger;
        }

        // POST /Chatbot/Ask
        [HttpPost("Ask")]
        public async Task<IActionResult> Ask([FromBody] ChatRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new { error = "Message cannot be empty." });
            }

            string message = request.Message.Trim();
            if (string.IsNullOrWhiteSpace(message))
            {
                return Json(new { answer = "I think you might have mistyped something. Could you try rephrasing your message?" });
            }

            try
            {
                var response = await _chatbotService.GetChatbotResponseAsync(message);
                if (string.IsNullOrWhiteSpace(response))
                    return StatusCode(502, new { error = "AI returned empty response." });

                return Json(new { answer = response });
            } 
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error", details = ex.Message });
            }
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }
}
