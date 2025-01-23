using System.ComponentModel.DataAnnotations;

namespace MyPortfolio.Models
{
    public class ContactForm
    {
        internal DateTime SubmittedAt;

        [Required(ErrorMessage = "Name is required.")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Subject is required.")]
        public required string Subject { get; set; }

        [Required(ErrorMessage = "Message is required.")]
        public required string Message { get; set; }
    }
}