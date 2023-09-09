using Prodavnica.Dto;

namespace Prodavnica.Interfaces.IService
{
	public interface IKorisnikService
	{
		Task<KorisnikDTO> GetById(int id);
		Task<List<KorisnikDTO>> GetAll();
		Task<List<VerifikacijaKorisnikaDTO>> GetAllProdavacs();
		Task<KorisnikDTO> IzmenaProfila(int id, IzmenaKorisnikaDTO profilDTO);
		Task<KorisnikDTO> Register(RegistracijaDTO registerDto);
		Task<KorisnikDTO> PrihvatiVerifikaciju(int id);
		Task<KorisnikDTO> OdbijVerifikaciju(int id);
	}
}
