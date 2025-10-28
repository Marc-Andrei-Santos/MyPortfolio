using System.ComponentModel.DataAnnotations;

namespace MyPortfolio.Models
{
    public class ContactFormModel
    {
        [Required(ErrorMessage = "Please enter your name")]
        [StringLength(100, ErrorMessage = "Name must be less than 100 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter your email address")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter your message")]
        [StringLength(1000, ErrorMessage = "Message must be less than 1000 characters")]
        public string Message { get; set; }
    }
}
