using System.ComponentModel.DataAnnotations;

namespace Prodavnica.Models
{
	public class Proizvod
	{
		public int Id { get; set; }

		[Required, MaxLength(30)]
		public string? Naziv { get; set; }

		[Required]
		public int Cena { get; set; }

		[Required]
		public int Kolicina { get; set; }

		public string? Opis { get; set; }

		public byte[]? Slika { get; set; }

		public List<PorudzbinaProizvod>? PorudzbinaProizvods { get; set; }

		public bool Obrisan { get; set; }

		public Korisnik? Korisnik { get; set; }

		public int KorisnikId { get; set; }
	}
}
