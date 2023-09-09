namespace Prodavnica.Dto
{
	public class KorisnikDTO
	{
		public int Id { get; set; }

		public string KorisnickoIme { get; set; }

		public string Email { get; set; }

		public string Ime { get; set; }

		public string Prezime { get; set; }

		public DateTime DatumRodjenja { get; set; }

		public string Adresa { get; set; }

		public byte[] Slika { get; set; }
	}
}
