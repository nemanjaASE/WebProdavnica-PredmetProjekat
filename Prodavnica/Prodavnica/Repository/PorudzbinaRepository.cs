using Microsoft.EntityFrameworkCore;
using Prodavnica.Data;
using Prodavnica.Interfaces.IRepository;
using Prodavnica.Models;

namespace Prodavnica.Repository
{
	public class PorudzbinaRepository : IPorudzbinaRepository
	{
		private readonly DataContext _dataContext;

		public PorudzbinaRepository(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		public async Task<Porudzbina> CreatePorudzbina(Porudzbina porudzbina)
		{
			_dataContext.Porudzbinas.Add(porudzbina);

			try
			{
				await SaveChanges();

				return porudzbina;
			}
			catch (Exception e)
			{
				return null;
			}
		}

		public async Task<List<Porudzbina>> GetAllPorudzbinas()
		{
			try
			{
				List<Porudzbina> porudzbine 
					= await _dataContext.Porudzbinas.Include(p => p.PorudzbinaProizvods).ThenInclude(pr => pr.Proizvod).ToListAsync();

				return porudzbine;
			}
			catch (Exception e)
			{
				return null;
			}
		}

		public async Task<Porudzbina> GetPorudzbinaById(int id)
		{
			try
			{
				Porudzbina porudzbina 
					= await _dataContext.Porudzbinas.Include(p => p.PorudzbinaProizvods).Where(o => o.Id == id).FirstOrDefaultAsync();

				return porudzbina;
			}
			catch (Exception e)
			{
				return null;
			}
		}

		public async Task SaveChanges()
		{
			await _dataContext.SaveChangesAsync();
		}
	}
}
