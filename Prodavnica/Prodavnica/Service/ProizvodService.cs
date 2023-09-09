using AutoMapper;
using Org.BouncyCastle.Crypto;
using Prodavnica.Dto;
using Prodavnica.Exceptions;
using Prodavnica.Interfaces.IRepository;
using Prodavnica.Interfaces.IService;
using Prodavnica.Models;

namespace Prodavnica.Service
{
	public class ProizvodService : IProizvodService
	{
		private readonly IMapper _mapper;
		private readonly IProizvodRepository _proizvodRepo;
		private readonly IKorisnikRepository _korisnikRepo;

		public ProizvodService(IMapper mapper, IProizvodRepository proizvodRepo, IKorisnikRepository korisnikRepo)
		{
			_mapper = mapper;
			_proizvodRepo = proizvodRepo;
			_korisnikRepo = korisnikRepo;
		}

		public async Task<ProizvodDTO> CreateProduct(int id, KreiranjeProizvodaDTO noviProizvodDTO)
		{
			if (String.IsNullOrEmpty(noviProizvodDTO.Naziv) ||
				String.IsNullOrEmpty(noviProizvodDTO.Kolicina.ToString()) ||
				String.IsNullOrEmpty(noviProizvodDTO.Cena.ToString()) ||
				String.IsNullOrEmpty(noviProizvodDTO.Opis)
				)
			{ 
				throw new BadRequestException($"Sva polja prilikom dodavanja proizvoda moraju biti popunjena."); 
			}


			if (noviProizvodDTO.Kolicina < 1 || noviProizvodDTO.Cena < 1)
			{
				throw new BadRequestException($"Kolicina proizvoda i cena moraju biti pozitivni brojevi.");
			}

			List<Korisnik> korisnici = await _korisnikRepo.GetAll();

			Korisnik prodavac = korisnici.Where(k => k.Id == id).FirstOrDefault();

			if (prodavac == null)
			{
				throw new NotFoundException($"Prodavac sa ID={id} ne postoji.");
			}

			Proizvod noviProizvod = _mapper.Map<Proizvod>(noviProizvodDTO);

			using (var memoryStream = new MemoryStream())
			{
				noviProizvodDTO.ImageForm.CopyTo(memoryStream);
				var imageBytes = memoryStream.ToArray();
				noviProizvod.Slika = imageBytes;
			}

			noviProizvod.Korisnik = prodavac;

			noviProizvod.KorisnikId = id;

			noviProizvod.Obrisan = false;

			return _mapper.Map<Proizvod, ProizvodDTO>(await _proizvodRepo.CreateProduct(noviProizvod));
		}

		public async Task<bool> DeleteProduct(int userId, int productId)
		{
			List<Proizvod> proizvodi = await _proizvodRepo.GetAllProducts();

			proizvodi = proizvodi.Where(p => p.KorisnikId.Equals(userId)).ToList();

			Proizvod proizvod = proizvodi.Where(p => p.Id == productId).FirstOrDefault();

			if (proizvod == null)
			{
				throw new NotFoundException($"Proizvod sa ID={productId} ne postoji.");
			}

			return await _proizvodRepo.DeleteProduct(productId);
		}

		public async Task<List<ProizvodDTO>> GetAll()
		{
			List<Proizvod> proizvodi = await _proizvodRepo.GetAllProducts();

			proizvodi = proizvodi.Where(p => p.Obrisan.Equals(false)).ToList();

			return _mapper.Map<List<Proizvod>, List<ProizvodDTO>>(proizvodi);
		}

		public async Task<List<ProizvodDTO>> GetMyProducts(int id)
		{
			List<Proizvod> proizvodi = await _proizvodRepo.GetAllProducts();

			proizvodi = proizvodi.Where(p => p.KorisnikId.Equals(id) && p.Obrisan.Equals(false)).ToList();

			if (proizvodi == null)
			{
				throw new NotFoundException($"Nema proizvoda.");
			}

			List<ProizvodDTO> proizvodiDTOs = _mapper.Map<List<Proizvod>, List<ProizvodDTO>>(proizvodi);

			return proizvodiDTOs;
		}

		public async Task<ProizvodDTO> GetProductById(int id)
		{
			Proizvod proizvod = await _proizvodRepo.GetProductById(id);

			if (proizvod == null)
			{
				throw new NotFoundException($"Proizvod sa ID={id} ne postoji.");
			}

			return _mapper.Map<Proizvod, ProizvodDTO>(proizvod) ;
		}

		public async Task<ProizvodDTO> UpdateProduct(int korisnikId, int proizvodId, IzmenaProizvodaDTO izmenjenProizvod)
		{
			if (String.IsNullOrEmpty(izmenjenProizvod.Naziv) ||
				String.IsNullOrEmpty(izmenjenProizvod.Kolicina.ToString()) ||
				String.IsNullOrEmpty(izmenjenProizvod.Cena.ToString()) ||
				String.IsNullOrEmpty(izmenjenProizvod.Opis)
				)
			{
				throw new BadRequestException($"Sva polja za proizvod moraju biti popunjena");
			}

			if (izmenjenProizvod.Cena < 1 || izmenjenProizvod.Kolicina < 1)
			{
				throw new BadRequestException($"Cena i kolicina moraju biti pozitivni brojevi.");
			}

			Proizvod proizvod = await _proizvodRepo.GetProductById(proizvodId);

			if (proizvod == null)
			{
				throw new NotFoundException($"Proizvod sa ID={proizvodId} nepostoji.");
			}

			if (!proizvod.KorisnikId.Equals(korisnikId))
			{
				throw new BadRequestException($"Nemate pravo da menjate ovaj proizvod.");
			}

			_mapper.Map(izmenjenProizvod, proizvod);

			if (izmenjenProizvod.ImageForm != null)
			{
				using (var memoryStream = new MemoryStream())
				{
					izmenjenProizvod.ImageForm.CopyTo(memoryStream);
					var imageBytes = memoryStream.ToArray();
					proizvod.Slika = imageBytes;
				}
			}

			return _mapper.Map<Proizvod, ProizvodDTO>(await _proizvodRepo.UpdateProduct(proizvod));
		}
	}
}
