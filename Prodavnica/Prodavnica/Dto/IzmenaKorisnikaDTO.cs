namespace Prodavnica.Dto
{
	public class IzmenaKorisnikaDTO
	{
		public string? KorisnickoIme { get; set; }

		public string? Email { get; set; }

		public string? NovaSifra { get; set; }

		public string? StaraSifra { get; set; }

		public string? Ime { get; set; }

		public string? Prezime { get; set; }

		public DateTime DatumRodjenja { get; set; }

		public string? Adresa { get; set; }

		public IFormFile? ImageForm { get; set; }
	}
}
