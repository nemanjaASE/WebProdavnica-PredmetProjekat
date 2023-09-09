using Prodavnica.Models;

namespace Prodavnica.Dto
{
	public class PorudzbinaDTO
	{
		public int Id { get; set; }

		public string? Komentar { get; set; }

		public string? Adresa { get; set; }

		public double Cena { get; set; }

		public DateTime VremeNarudzbine { get; set; }

		public DateTime VremeDostave { get; set; }

		public string Status { get; set; }

		public List<PorudzbinaProizvodDTO>? porudzbinaProizvods { get; set; }

		public int KorisnikId { get; set; }

		public int CenaZaDostavu { get; set; }
	}
}
