using Microsoft.AspNetCore.Mvc;
using MyPortfolio.Models;
using System.Threading.Tasks;

namespace MyPortfolio.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult DownloadCV()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/files/RESUME_MARC_ANDREI_SANTOS.pdf");
            var fileType = "application/pdf";
            var fileName = "Resume.pdf";

            return PhysicalFile(filePath, fileType, fileName);
        }
    }
}
