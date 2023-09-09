using System.ComponentModel.DataAnnotations;

namespace Prodavnica.Dto
{
	public class IzmenaProizvodaDTO
	{
		[Required]
		public int Id { get; set; }
		public string? Naziv { get; set; }

		public int Cena { get; set; }

		public int Kolicina { get; set; }

		public string? Opis { get; set; }

		public IFormFile? ImageForm { get; set; }
	}
}
