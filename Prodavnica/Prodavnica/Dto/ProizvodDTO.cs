namespace Prodavnica.Dto
{
	public class ProizvodDTO
	{
		public int Id { get; set; }

		public string Naziv { get; set; }

		public byte[] Slika { get; set; }

		public string Opis { get; set; }

		public int Kolicina { get; set; }

		public int Cena { get; set; }
	}
}
