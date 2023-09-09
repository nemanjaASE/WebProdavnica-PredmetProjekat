using Microsoft.EntityFrameworkCore;
using Prodavnica.Data;
using Prodavnica.Interfaces.IRepository;
using Prodavnica.Models;

namespace Prodavnica.Repository
{
	public class ProizvodRepository : IProizvodRepository
	{
		private readonly DataContext _dataContext;
		public ProizvodRepository(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		public async Task<Proizvod> CreateProduct(Proizvod proizvod)
		{
			try
			{
				_dataContext.Proizvods.Add(proizvod);

				await _dataContext.SaveChangesAsync();

				return proizvod;
			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}

		public async Task<bool> DeleteProduct(int proizvodId)
		{
			try
			{
				Proizvod product = await _dataContext.Proizvods.FindAsync(proizvodId);

				product.Obrisan = true;

				await _dataContext.SaveChangesAsync();

				return true;
			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return false;
			}
		}

		public async Task<List<Proizvod>> GetAllProducts()
		{
			try
			{
				List<Proizvod> proizvodi = await _dataContext.Proizvods.ToListAsync();

				return proizvodi;
			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}

		public async Task<Proizvod> GetProductById(int id)
		{
			try
			{
				Proizvod proizvod = await _dataContext.Proizvods.FindAsync(id);

				if(proizvod == null)
				{
					return null;
				}

				if (proizvod.Obrisan)
				{
					return null;
				}

				return proizvod;

			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}

		public async Task<Proizvod> UpdateProduct(Proizvod proizvod)
		{
			try
			{
				_dataContext.Proizvods.Update(proizvod);

				await _dataContext.SaveChangesAsync();

				return proizvod;
			}
			catch (Exception e)
			{
				await Console.Out.WriteLineAsync(e.Message);
				return null;
			}
		}
	}
}
