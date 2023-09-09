namespace Prodavnica.Dto
{
	public class KreiranjePorudzbineDTO
	{
		public List<KreiranjePorudzbinaProizvodDTO> PorudzbinaProizvods { get; set; } = null!;

		public string Adresa { get; set; } = null!;

		public string? Komentar { get; set; }
	}
}
