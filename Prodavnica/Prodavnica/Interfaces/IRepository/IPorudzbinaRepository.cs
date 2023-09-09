using Prodavnica.Models;

namespace Prodavnica.Interfaces.IRepository
{
	public interface IPorudzbinaRepository
	{
		Task<Porudzbina> CreatePorudzbina(Porudzbina porudzbina);
		Task<List<Porudzbina>> GetAllPorudzbinas();
		Task<Porudzbina> GetPorudzbinaById(int id);
		Task SaveChanges();
	}
}
