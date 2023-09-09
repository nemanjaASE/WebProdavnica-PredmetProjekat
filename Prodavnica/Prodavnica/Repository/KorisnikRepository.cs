using Microsoft.EntityFrameworkCore;
using Prodavnica.Data;
using Prodavnica.Interfaces.IRepository;
using Prodavnica.Models;

namespace Prodavnica.Repository
{
	public class KorisnikRepository : IKorisnikRepository
	{
		private readonly DataContext _dataContext;

		public KorisnikRepository(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		public async Task<Korisnik> AcceptVerification(int id)
		{
			try
			{
				Korisnik? korisnik = _dataContext.Korisniks.Find((int)id);

				korisnik.Verifikacija = Common.EStatusVerifikacije.PRIHVACENA;

				await _dataContext.SaveChangesAsync();

				return korisnik;
			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}

		public async Task<Korisnik> AddKorisnik(Korisnik noviKorisnik)
		{
			_dataContext.Korisniks.Add(noviKorisnik);

			try
			{
				await _dataContext.SaveChangesAsync();

				return noviKorisnik;
			}
			catch (Exception e)
			{
                await Console.Out.WriteLineAsync(e.Message);
				return null;
            }
		}

		public async Task<Korisnik> DenyVerification(int id)
		{
			try
			{
				Korisnik? korisnik = _dataContext.Korisniks.Find((int)id);

				korisnik.Verifikacija = Common.EStatusVerifikacije.ODBIJENA;

				await _dataContext.SaveChangesAsync();
				return korisnik;

			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}

		public async Task<List<Korisnik>> GetAll()
		{
			try
			{
				List<Korisnik> korisnici = await _dataContext.Korisniks.Include(k => k.Porudzbinas).ToListAsync();

				return korisnici;
			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}

		public async Task<List<Korisnik>> GetAllProdavce()
		{
			try
			{
				List<Korisnik> korisnici = 
					await _dataContext.Korisniks.Include(k => k.Proizvods).Where(p => p.Tip.Equals(Common.ETipKorisnika.PRODAVAC)).ToListAsync();

				return korisnici;
			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}

		public async Task<Korisnik> GetById(int id)
		{
			try
			{
				Korisnik korisnik = await _dataContext.Korisniks.Include(p => p.Porudzbinas).Where(p => p.Id.Equals(id)).FirstOrDefaultAsync();

				return korisnik;
			}
			catch (Exception e)
			{

				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}

		public async Task<Korisnik> UpdateProfile(Korisnik stariKorisnik)
		{
			try
			{
				_dataContext.Korisniks.Update(stariKorisnik);

				await _dataContext.SaveChangesAsync();

				return stariKorisnik;
			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}
	}
}
