using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyPortfolio.Services;

namespace MyPortfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailJSController : ControllerBase
    {
        private readonly EmailJSOptions _options;

        public EmailJSController(IOptions<EmailJSOptions> options)
        {
            _options = options.Value;
        }

        [HttpGet("config")]
        public IActionResult GetConfig()
        {
            return Ok(new
            {
                publicKey = _options.PublicKey,
                serviceID = _options.ServiceID,
                templateID = _options.TemplateID
            });
        }
    }
}
