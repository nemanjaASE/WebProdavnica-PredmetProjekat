using AutoMapper;
using Google.Apis.Auth;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Prodavnica.Common;
using Prodavnica.Dto;
using Prodavnica.Exceptions;
using Prodavnica.Interfaces.IRepository;
using Prodavnica.Interfaces.IService;
using Prodavnica.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Prodavnica.Service
{
	public class AuthService : IAuthService
	{
		private readonly IMapper _mapper;
		private readonly IConfiguration _configuration;
		private readonly IKorisnikRepository _repositoryKorisnik;
		private readonly IConfigurationSection _googleClientId;

		public AuthService(IMapper mapper, IConfiguration configuration, IKorisnikRepository repo)
        {
			_mapper = mapper;
			_configuration = configuration;
			_repositoryKorisnik = repo;
			_googleClientId = configuration.GetSection("GoogleClientId");
		}
		public async Task<string> GoogleLogin(string token)
		{
			GoogleKorisnikDTO externalUser = await VerifyGoogleToken(token);

			if (externalUser == null)
			{ 
				throw new ConflictException("Neispravan google token."); 
			}

			List<Korisnik> korisnici = await _repositoryKorisnik.GetAll();

			Korisnik korisnik = korisnici.Find(k => k.Email.Equals(externalUser.Email));
			
			if (korisnik == null)
			{
				korisnik = new Korisnik()
				{
					Ime = externalUser.Ime,
					Prezime = externalUser.Prezime,
					KorisnickoIme = externalUser.KorisnickoIme,
					Email = externalUser.Email,
					Slika = externalUser.Slika,
					Password = "",
					Adresa = "",
					DatumRodjenja = DateTime.Now,
					Tip = ETipKorisnika.KUPAC,
					Verifikacija = EStatusVerifikacije.PRIHVACENA
				};

				await _repositoryKorisnik.AddKorisnik(korisnik);
			}

			var claims = new[] {
						new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
						new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
						new Claim("UserId", korisnik.Id.ToString()),
						new Claim("Email", korisnik.Email!),
						new Claim(ClaimTypes.Role, korisnik.Tip.ToString()),
						new Claim("Verification", korisnik.Verifikacija.ToString())

			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "default"));

			var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var tokenString = new JwtSecurityToken(
				_configuration["Jwt:Issuer"],
				_configuration["Jwt:Audience"],
				claims,
				expires: DateTime.UtcNow.AddDays(1),
				signingCredentials: signIn);

			return new JwtSecurityTokenHandler().WriteToken(tokenString);
		}

		public async Task<string> Login(LoginDTO loginDto)
		{
			var korisnici = await _repositoryKorisnik.GetAll();

			Korisnik? user = korisnici.Where(u => u.Email == loginDto.Email).FirstOrDefault();

			if (user == null)
			{
				throw new Exception($"Korisnik {loginDto.Email} ne postoji.");

			}else if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
			{
				throw new Exception($"Pogresna sifra.");
			}

			var claims = new[] {
						new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
						new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
						new Claim("UserId", user.Id.ToString()),
						new Claim("Email", user.Email!),
						new Claim(ClaimTypes.Role, user.Tip.ToString()),
						new Claim("Verification", user.Verifikacija.ToString())

			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "default"));

			var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				_configuration["Jwt:Issuer"],
				_configuration["Jwt:Audience"],
				claims,
				expires: DateTime.UtcNow.AddDays(1),
				signingCredentials: signIn);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		private async Task<GoogleKorisnikDTO> VerifyGoogleToken(string externalLoginToken)
		{
			try
			{
				var validationSettings = new GoogleJsonWebSignature.ValidationSettings()
				{
					Audience = new List<string>() { _googleClientId.Value }
				};

				var googleUserInfo = await GoogleJsonWebSignature.ValidateAsync(externalLoginToken, validationSettings);

				byte[] imageBytes = new byte[0];

				using (WebClient webClient = new WebClient())
				{
					imageBytes = webClient.DownloadData(googleUserInfo.Picture);

				}

				GoogleKorisnikDTO externalUser = new GoogleKorisnikDTO()
				{
					Email = googleUserInfo.Email,
					KorisnickoIme = googleUserInfo.Email.Split("@")[0],
					Ime = googleUserInfo.GivenName,
					Prezime = googleUserInfo.FamilyName,
					Slika = imageBytes,
				};

				return externalUser;
			}
			catch
			{
				return null;
			}
		}
	}
}
