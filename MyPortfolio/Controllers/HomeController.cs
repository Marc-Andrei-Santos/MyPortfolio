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
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/files/MyCV.pdf");
            var fileType = "application/pdf";
            var fileName = "MyCV.pdf";

            return PhysicalFile(filePath, fileType, fileName);
        }

        [HttpPost]
        public IActionResult Submit(ContactForm model)
        {
            if (ModelState.IsValid)
            {
                // Redirect back to the Index page
                return RedirectToAction("Index");
            }

            // If form is invalid, return to Index view with model
            return View("Index", model);
        }
    }
}
