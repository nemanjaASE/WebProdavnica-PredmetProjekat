using Prodavnica.Models;

namespace Prodavnica.Interfaces.IRepository
{
	public interface IProizvodRepository
	{
		Task<List<Proizvod>> GetAllProducts();
		Task<Proizvod> GetProductById(int id);
		Task<Proizvod> CreateProduct(Proizvod proizvod);
		Task<Proizvod> UpdateProduct(Proizvod proizvod);
		Task<bool> DeleteProduct(int proizvodId);
	}
}
