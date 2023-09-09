using Prodavnica.Models;

namespace Prodavnica.Interfaces.IRepository
{
	public interface IKorisnikRepository
	{
		Task<Korisnik> GetById(int id);
		Task<Korisnik> UpdateProfile(Korisnik stariKorisnik);
		Task<Korisnik> AddKorisnik(Korisnik noviKorisnik);
		Task<List<Korisnik>> GetAll();
		Task<List<Korisnik>> GetAllProdavce();
		Task<Korisnik> AcceptVerification(int id);
		Task<Korisnik> DenyVerification(int id);
	}
}
