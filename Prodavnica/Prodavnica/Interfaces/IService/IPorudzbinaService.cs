using Prodavnica.Dto;

namespace Prodavnica.Interfaces.IService
{
	public interface IPorudzbinaService
	{
		Task<PorudzbinaDTO> KreirajPorudzbinu(int korisnikId, KreiranjePorudzbineDTO porudzbinaDTO);
		Task<List<PorudzbinaDTO>> GetAllPorudzbinas();
		Task<PorudzbinaDTO> GetPorudzbinaById(int id);
		Task<List<PorudzbinaDTO>> GetAllDostavljenePorudzbine(int id);
		Task<List<PorudzbinaDTO>> GetAllNedostavljenePorudzbine(int id);
		Task<bool> OdbijPorudzbinu(int id);
		Task<bool> ApproveOrder(int id);
	}
}
