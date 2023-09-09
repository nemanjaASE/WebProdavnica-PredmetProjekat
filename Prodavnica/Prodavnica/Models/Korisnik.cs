using System.ComponentModel.DataAnnotations;
using Prodavnica.Common;
namespace Prodavnica.Models
{
	public class Korisnik
	{
		public int Id { get; set; }

		[Required, RegularExpression(@"^[a-zA-Z0-9_]$")]
		public string? KorisnickoIme { get; set; }

		[Required, EmailAddress]
		public string? Email { get; set; }

		[Required]
		public string? Password { get; set; }

		[Required, MaxLength(35)]
		public string? Ime { get; set; }

		[Required, MaxLength(35)]
		public string? Prezime { get; set; }

		[Required, DataType(DataType.Date)]
		public DateTime DatumRodjenja { get; set; }

		[Required, MaxLength(30)]
		public string? Adresa { get; set; }

		public byte[]? Slika { get; set; }

		public ETipKorisnika Tip { get; set; }

		public EStatusVerifikacije Verifikacija { get; set; }

		public List<Porudzbina>? Porudzbinas { get; set; }

		public List<Proizvod>? Proizvods { get; set; }
	}
}
