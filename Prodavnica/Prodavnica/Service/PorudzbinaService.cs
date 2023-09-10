using AutoMapper;
using Prodavnica.Dto;
using Prodavnica.Exceptions;
using Prodavnica.Interfaces.IRepository;
using Prodavnica.Interfaces.IService;
using Prodavnica.Models;

namespace Prodavnica.Service
{
	public class PorudzbinaService : IPorudzbinaService
	{
		private readonly IMapper _mapper;

		private readonly IPorudzbinaRepository _porudzbinaRepo;

		private readonly IProizvodRepository _proizvodRepo;

		private readonly IKorisnikRepository _korisnikRepo;

		public PorudzbinaService(IMapper mapper, 
								 IPorudzbinaRepository porudzbinaRepo, 
								 IProizvodRepository proizvodRepo, 
								 IKorisnikRepository korisnikRepo)
		{
			_mapper = mapper;
			_porudzbinaRepo = porudzbinaRepo;
			_proizvodRepo = proizvodRepo;
			_korisnikRepo = korisnikRepo;
		}

		public async Task<List<PorudzbinaDTO>> GetAllDostavljenePorudzbine(int id)
		{
			Korisnik korisnik = await _korisnikRepo.GetById(id);

			if (korisnik == null)
			{
				throw new NotFoundException($"Korisnik sa ID={id} nepostoji.");
			}

			List<Porudzbina> svePorudzbine = await _porudzbinaRepo.GetAllPorudzbinas();

			svePorudzbine = svePorudzbine.Where(p => p.Status.Equals(Common.EStatusPorudzbine.DOSTAVLJENA)).ToList();

			if (svePorudzbine == null)
			{
				throw new Exception($"Nema dostavljenih porudzbina");
			}

			if (korisnik.Tip.Equals(Common.ETipKorisnika.KUPAC))
			{
				List<Porudzbina> porudzbineOdKupca = new List<Porudzbina>();

				porudzbineOdKupca = svePorudzbine.Where(p => p.KorisnikId.Equals(korisnik.Id)).ToList();

				return _mapper.Map<List<Porudzbina>, List<PorudzbinaDTO>>(porudzbineOdKupca);
			}
			else if (korisnik.Tip.Equals(Common.ETipKorisnika.PRODAVAC))
			{
				List<Porudzbina> porudzbineOdProdavca = new List<Porudzbina>();

				List<Proizvod> proizvodi = await _proizvodRepo.GetAllProducts();

				proizvodi = proizvodi.Where(p => p.KorisnikId.Equals(korisnik.Id)).ToList();

				foreach (Porudzbina porudzbina in svePorudzbine)
				{
					foreach (Proizvod proizvod in proizvodi)
					{
						foreach (PorudzbinaProizvod pp in porudzbina.PorudzbinaProizvods)
						{
							if (proizvod.Id.Equals(pp.ProizvodId))
							{
								porudzbineOdProdavca.Add(porudzbina);
							}
						}
					}
				}

				return _mapper.Map<List<Porudzbina>, List<PorudzbinaDTO>>(porudzbineOdProdavca);
			}

			return null;
		}

		public async Task<List<PorudzbinaDTO>> GetAllNedostavljenePorudzbine(int id)
		{
			Korisnik korisnik = await _korisnikRepo.GetById(id);

			if (korisnik == null)
			{
				throw new NotFoundException($"Korisnik sa ID={id} ne postoji.");
			}

			List<Porudzbina> svePorudzbine = await _porudzbinaRepo.GetAllPorudzbinas();

			svePorudzbine = svePorudzbine.Where(p => p.Status == Common.EStatusPorudzbine.UTOKU).ToList();

			if (svePorudzbine == null)
			{
				throw new Exception($"Nema porudzbina koje su u toku.");
			}

			if (korisnik.Tip.Equals(Common.ETipKorisnika.KUPAC))
			{
				List<Porudzbina> porudzbineOdKupca = new List<Porudzbina>();

				porudzbineOdKupca = svePorudzbine.Where(p => p.KorisnikId.Equals(korisnik.Id)).ToList();

				return _mapper.Map<List<Porudzbina>, List<PorudzbinaDTO>>(porudzbineOdKupca);
			}
			else if (korisnik.Tip.Equals(Common.ETipKorisnika.PRODAVAC))
			{
				List<Porudzbina> porudzbineOdProdavca = new List<Porudzbina>();

				List<Proizvod> proizvodiOdProdavca = await _proizvodRepo.GetAllProducts();

				proizvodiOdProdavca = proizvodiOdProdavca.Where(p => p.KorisnikId.Equals(korisnik.Id)).ToList();

				foreach (Porudzbina porudzbina in svePorudzbine)
				{
					foreach (PorudzbinaProizvod pp in porudzbina.PorudzbinaProizvods)
					{
						foreach (Proizvod proizvod in proizvodiOdProdavca)
						{
							if (proizvod.Id.Equals(pp.ProizvodId) && !porudzbineOdProdavca.Contains(porudzbina))
							{
								porudzbineOdProdavca.Add(porudzbina);
							}
						}
					}
				}
				return _mapper.Map<List<Porudzbina>, List<PorudzbinaDTO>>(porudzbineOdProdavca);
			}
			return null;
		}

		public async Task<List<PorudzbinaDTO>> GetAllPorudzbinas()
		{ 
			return _mapper.Map<List<Porudzbina>, List<PorudzbinaDTO>>(await _porudzbinaRepo.GetAllPorudzbinas());
		}

		public async Task<PorudzbinaDTO> GetPorudzbinaById(int id)
		{
			Porudzbina porudzbina = await _porudzbinaRepo.GetPorudzbinaById(id);

			if (porudzbina == null)
			{
				throw new Exception($"Porudzbina sa ID={id} nepostoji.");
			}

			return _mapper.Map<Porudzbina, PorudzbinaDTO>(porudzbina);
		}

		public async Task<PorudzbinaDTO> KreirajPorudzbinu(int korisnikId, KreiranjePorudzbineDTO porudzbinaDTO)
		{
			if (String.IsNullOrEmpty(porudzbinaDTO.Adresa))
			{
				throw new Exception($"Adresa je neophodna.");
			}

			Porudzbina novaPorudzbina = _mapper.Map<KreiranjePorudzbineDTO, Porudzbina>(porudzbinaDTO);

			novaPorudzbina.KorisnikId = korisnikId;
			novaPorudzbina.Status = Common.EStatusPorudzbine.UTOKU;
			novaPorudzbina.VremeNarudzbine = DateTime.Now;
			novaPorudzbina.VremeDostave = DateTime.Now.AddHours(1).AddMinutes(new Random().Next(60));
			novaPorudzbina.CenaZaDostavu = 4;
			novaPorudzbina.Approved = false;

			foreach (PorudzbinaProizvod pp in novaPorudzbina.PorudzbinaProizvods)
			{
				Proizvod proizvod = await _proizvodRepo.GetProductById(pp.ProizvodId);

				if (pp.Kolicina > proizvod.Kolicina)
				{
					throw new BadRequestException("Izabranog proizvoda nema dovoljno na stanju.");
				}
				else
				{
					pp.ProizvodId = proizvod.Id;
					proizvod.Kolicina -= pp.Kolicina;
					novaPorudzbina.Cena += pp.Kolicina * proizvod.Cena;
				}
			}

			return _mapper.Map<Porudzbina, PorudzbinaDTO>(await _porudzbinaRepo.CreatePorudzbina(novaPorudzbina));
		}

		public async Task<bool> OdbijPorudzbinu(int id)
		{
			Porudzbina porudzbina = await _porudzbinaRepo.GetPorudzbinaById(id);

			if (porudzbina == null)
			{
				throw new Exception($"Porudzbina sa ID={id} ne postoji.");
			}

			porudzbina.Status = Common.EStatusPorudzbine.ODBIJENA;

			List<Proizvod> proizvodi = await _proizvodRepo.GetAllProducts();

			foreach (PorudzbinaProizvod pp in porudzbina.PorudzbinaProizvods)
			{
				foreach (Proizvod proizvod in proizvodi)
				{
					if (proizvod.Id.Equals(pp.ProizvodId))
					{
						proizvod.Kolicina += pp.Kolicina;
					}
				}
			}

			await _porudzbinaRepo.SaveChanges();

			return true;
		}

		public async Task<bool> ApproveOrder(int id)
		{
			Porudzbina por = await _porudzbinaRepo.GetPorudzbinaById(id);

			if (por == null)
				throw new Exception($"Order with ID: {id} doesn't exist.");

			por.Approved = true;
			por.VremeDostave = por.VremeDostave.AddHours(1).AddMinutes(new Random().Next(60));

			await _porudzbinaRepo.SaveChanges();

			return true;
		}
	}
}
