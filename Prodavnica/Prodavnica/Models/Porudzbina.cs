using Prodavnica.Common;
using System.ComponentModel.DataAnnotations;

namespace Prodavnica.Models
{
	public class Porudzbina
	{
		public int Id { get; set; }

		public string? Komentar { get; set; }

		[Required, MaxLength(35)]
		public string? Adresa { get; set; }

		public double Cena { get; set; }

		public DateTime VremeNarudzbine { get; set; }

		public DateTime VremeDostave { get; set; }

		public EStatusPorudzbine Status { get; set; }

		public bool Approved { get; set; }

		public List<PorudzbinaProizvod>? PorudzbinaProizvods { get; set; }

		public Korisnik? Korisnik { get; set; }

		public int KorisnikId { get; set; }

		public int CenaZaDostavu { get; set; }
	}
}
