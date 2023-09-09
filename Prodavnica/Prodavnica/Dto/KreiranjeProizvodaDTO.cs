namespace Prodavnica.Dto
{
	public class KreiranjeProizvodaDTO
	{
		public string Naziv { get; set; }

		public int Cena { get; set; }

		public int Kolicina { get; set; }

		public string Opis { get; set; }

		public IFormFile ImageForm { get; set; }
	}
}
