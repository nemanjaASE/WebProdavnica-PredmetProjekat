using Prodavnica.Dto;

namespace Prodavnica.Interfaces.IService
{
	public interface IProizvodService
	{
		Task<List<ProizvodDTO>> GetAll();
		Task<ProizvodDTO> GetProductById(int id);
		Task<List<ProizvodDTO>> GetMyProducts(int id);
		Task<ProizvodDTO> CreateProduct(int id, KreiranjeProizvodaDTO noviProizvodDTO);
		Task<ProizvodDTO> UpdateProduct(int userId, int productId, IzmenaProizvodaDTO izmenjenProizvod);
		Task<bool> DeleteProduct(int userId, int productId);
	}
}
