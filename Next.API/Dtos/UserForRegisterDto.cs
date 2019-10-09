using System.ComponentModel.DataAnnotations;
namespace Next.API.Dtos
{
    public class UserForRegisterDto
    {
        public string UserNick { get; set; }
        [Required]
        public string Email { get; set; }
         [Required]
         [StringLength(8,MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 charse")]
        public string Password { get; set; }
    }
}