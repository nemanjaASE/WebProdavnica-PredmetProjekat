using System.ComponentModel.DataAnnotations;

namespace Prodavnica.Models
{
	public class PorudzbinaProizvod
	{
		public int NarudzbinaId { get; set; }

		public int ProizvodId { get; set; }

		public int Kolicina { get; set; }

		public Porudzbina Porudzbina { get; set; }

		public Proizvod Proizvod { get; set; }
	}
}
