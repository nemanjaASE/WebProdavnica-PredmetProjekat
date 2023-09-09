namespace Prodavnica.Dto
{
	public class RegistracijaDTO
	{
		public string KorisnickoIme { get; set; }

		public string Email { get; set; }

		public string Password { get; set; }

		public string PonovljenaSifra { get; set; }

		public string Ime { get; set; }

		public string Prezime { get; set; }

		public DateTime DatumRodjenja { get; set; }

		public string Adresa { get; set; }

		public IFormFile? ImageForm { get; set; }

		public string Tip { get; set; }
	}
}
