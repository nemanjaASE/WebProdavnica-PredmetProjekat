namespace Prodavnica.Dto
{
	public class PorudzbinaProizvodDTO
	{
		public int Id { get; set; }

		public int Kolicina { get; set; }

		public ProizvodDTO Proizvod { get; set; } = null!;
	}
}
