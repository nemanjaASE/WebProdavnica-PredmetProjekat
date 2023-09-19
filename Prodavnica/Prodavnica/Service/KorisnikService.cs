using AutoMapper;
using Prodavnica.Dto;
using Prodavnica.Exceptions;
using Prodavnica.Interfaces.IRepository;
using Prodavnica.Interfaces.IService;
using Prodavnica.Models;
using Microsoft.IdentityModel.Tokens;
using Prodavnica.Common;
using Org.BouncyCastle.Crypto;
using Prodavnica.Repository;

namespace Prodavnica.Service
{
	public class KorisnikService : IKorisnikService
	{
		private readonly IMapper _mapper;
		private readonly IKorisnikRepository _korisnikRepo;
		private readonly IEmailService _email;

		public KorisnikService(IMapper mapper, IKorisnikRepository korisnikRepository, IEmailService email)
		{
			_korisnikRepo = korisnikRepository;
			_mapper = mapper;
			_email = email;
		}
		public async Task<KorisnikDTO> PrihvatiVerifikaciju(int id)
		{
			Korisnik korisnik = await _korisnikRepo.GetById(id);

			if (korisnik == null)
			{
				throw new NotFoundException($"Korisnik sa ID={id} nepostoji.");
			}

			if (korisnik.Verifikacija != EStatusVerifikacije.UTOKU)
			{
				throw new BadRequestException($"Status verifikacije nije moguce promeniti.");
			}

			korisnik = await _korisnikRepo.AcceptVerification(id);

			if (korisnik != null)
			{

				await _email.SendEmail(korisnik.Email, korisnik.Verifikacija.ToString());

			}

			return _mapper.Map<Korisnik, KorisnikDTO>(korisnik);
		}

		public async Task<KorisnikDTO> OdbijVerifikaciju(int id)
		{
			Korisnik korisnik = await _korisnikRepo.GetById(id);

			if (korisnik == null)
			{
				throw new NotFoundException($"Korisnik sa ID={id} nepostoji.");
			}

			if (korisnik.Verifikacija != EStatusVerifikacije.UTOKU)
			{
				throw new BadRequestException($"Status verifikacije nije moguce promeniti.");
			}

			korisnik = await _korisnikRepo.DenyVerification(id);

			if (korisnik != null)
			{
				await _email.SendEmail("vbnnp130595@gmail.com", korisnik.Verifikacija.ToString());
			}
			return _mapper.Map<Korisnik, KorisnikDTO>(korisnik);
		}

		public async Task<List<KorisnikDTO>> GetAll()
		{
			List<Korisnik> korisnici = await _korisnikRepo.GetAll();

			if (korisnici == null)
			{
				throw new NotFoundException($"Nema korisnika.");
			}

			return _mapper.Map<List<Korisnik>, List<KorisnikDTO>>(korisnici);
		}

		public async Task<List<VerifikacijaKorisnikaDTO>> GetAllProdavacs()
		{
			List<Korisnik> prodavci = await _korisnikRepo.GetAllProdavce();

			if (prodavci == null)
			{
				throw new NotFoundException($"Nema prodavaca.");
			}

			return _mapper.Map<List<Korisnik>, List<VerifikacijaKorisnikaDTO>>(prodavci);
		}

		public async Task<KorisnikDTO> GetById(int id)
		{
			Korisnik korisnik = await _korisnikRepo.GetById(id);

			if (korisnik == null)
			{
				throw new NotFoundException($"Korisnik sa ID={id} nepostoji.");
			}

			return _mapper.Map<Korisnik, KorisnikDTO>(korisnik);
		}

		public async Task<KorisnikDTO> Register(RegistracijaDTO registracijaDTO)
		{
			// Provera ulaznih podataka
			if (String.IsNullOrEmpty(registracijaDTO.KorisnickoIme) ||
				String.IsNullOrEmpty(registracijaDTO.Email) ||
				String.IsNullOrEmpty(registracijaDTO.Ime) ||
				String.IsNullOrEmpty(registracijaDTO.Prezime) ||
				String.IsNullOrEmpty(registracijaDTO.Adresa) ||
				String.IsNullOrEmpty(registracijaDTO.Password) ||
				String.IsNullOrEmpty(registracijaDTO.PonovljenaSifra) ||
				String.IsNullOrEmpty(registracijaDTO.Tip.ToString())
				)
			{
				throw new BadRequestException($"Sva ulazna polja moraju biti popunjena.");
			}

			// Dobavljamo sve korisnike
			List<Korisnik> korisnici = await _korisnikRepo.GetAll();

			// Provera korisnickog imena, email adrese i poklapanje sifara
			if (korisnici.Any(u => u.KorisnickoIme == registracijaDTO.KorisnickoIme))
			{
				throw new ConflictException("Korisnicko ime je zauzeto. Pokusajte ponovo!");
			}

			if (korisnici.Any(u => u.Email == registracijaDTO.Email))
			{
				throw new ConflictException("Email adresa je zauzeta. Pokusajte ponovo!");
			}

			if (registracijaDTO.PonovljenaSifra != registracijaDTO.Password)
			{
				throw new BadRequestException("Sifre se ne poklapaju. Pokusajte ponovo!");
			}

			// Mapiranje podataka
			Korisnik noviKorisnik = _mapper.Map<RegistracijaDTO, Korisnik>(registracijaDTO);

			if (registracijaDTO.ImageForm != null)
			{
				using (var memoryStream = new MemoryStream())
				{
					registracijaDTO.ImageForm.CopyTo(memoryStream);

					var imageBytes = memoryStream.ToArray();

					noviKorisnik.Slika = imageBytes;
				}
			}

			noviKorisnik.Tip = (ETipKorisnika)Enum.Parse(typeof(ETipKorisnika), registracijaDTO.Tip.ToUpper());

			if (noviKorisnik.Tip == ETipKorisnika.PRODAVAC)
			{
				noviKorisnik.Verifikacija = EStatusVerifikacije.UTOKU;
			}
			else
			{
				noviKorisnik.Verifikacija = EStatusVerifikacije.PRIHVACENA;
			}

			noviKorisnik.Password = BCrypt.Net.BCrypt.HashPassword(noviKorisnik.Password);

			return _mapper.Map<Korisnik, KorisnikDTO>(await _korisnikRepo.AddKorisnik(noviKorisnik));
		}

		public async Task<KorisnikDTO> IzmenaProfila(int id, IzmenaKorisnikaDTO profilDTO)
		{
			if (String.IsNullOrEmpty(profilDTO.Ime) ||
				String.IsNullOrEmpty(profilDTO.Prezime) ||
				String.IsNullOrEmpty(profilDTO.KorisnickoIme) ||
				String.IsNullOrEmpty(profilDTO.Email) ||
				String.IsNullOrEmpty(profilDTO.Adresa))
			{
					throw new BadRequestException($"Sva polja moraju biti popunjena.");
			}

			List<Korisnik> korisnici = await _korisnikRepo.GetAll();

			Korisnik korisnik = await _korisnikRepo.GetById(id) ?? throw new NotFoundException($"Korisnik sa ID={id} nepostoji.");

			if (!profilDTO.KorisnickoIme.Equals(korisnik.KorisnickoIme))
			{
				if (korisnici.Any(k => k.KorisnickoIme.Equals(profilDTO.KorisnickoIme)))
				{
					throw new ConflictException("Korisnicko ime je vec u upotrebi.");
				}
			}

			if (!profilDTO.Email.Equals(korisnik.Email))
			{
				if (korisnici.Any(k => k.Email.Equals(profilDTO.Email)))
				{
					throw new ConflictException("Email je vec u upotrebi.");
				}
			}

			if (!String.IsNullOrEmpty(profilDTO.NovaSifra))
			{
				if (String.IsNullOrEmpty(profilDTO.StaraSifra))
				{
					throw new BadRequestException("Morate uneti staru sifru.");
				}

				if (!BCrypt.Net.BCrypt.Verify(profilDTO.StaraSifra, korisnik.Password.TrimEnd()))
				{
					throw new BadRequestException("Pogresna stara sifra.");
				}

				korisnik.Password = BCrypt.Net.BCrypt.HashPassword(profilDTO.NovaSifra);
			}

			if (!String.IsNullOrEmpty(profilDTO.StaraSifra))
			{
				if (String.IsNullOrEmpty(profilDTO.NovaSifra))
				{
					throw new BadRequestException("Morate uneti novu sifru.");
				}
			}

			if (String.IsNullOrEmpty(profilDTO.NovaSifra) && String.IsNullOrEmpty(profilDTO.StaraSifra))
			{
				profilDTO.NovaSifra = korisnik.Password;
			}

			_mapper.Map(profilDTO, korisnik);

			if (profilDTO.ImageForm != null)
			{
				using (var memoryStream = new MemoryStream())
				{
					profilDTO.ImageForm.CopyTo(memoryStream);

					var imageBytes = memoryStream.ToArray();

					korisnik.Slika = imageBytes;
				}
			}

			korisnik.DatumRodjenja = korisnik.DatumRodjenja.Date;

			KorisnikDTO korisnikDTO = _mapper.Map<Korisnik, KorisnikDTO>(await _korisnikRepo.UpdateProfile(korisnik));

			return korisnikDTO;
		}
	}
}
