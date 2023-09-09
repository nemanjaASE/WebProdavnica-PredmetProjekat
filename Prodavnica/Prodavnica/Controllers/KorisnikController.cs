using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prodavnica.Dto;
using Prodavnica.Interfaces.IService;

namespace Prodavnica.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class KorisnikController : ControllerBase
	{
		private readonly IKorisnikService _service;
		public KorisnikController(IKorisnikService service)
		{
			_service = service;
		}

		#region POST

		[HttpPost]
		[Consumes("multipart/form-data")]
		[AllowAnonymous]
		public async Task<IActionResult> Post([FromForm] RegistracijaDTO registracijaDto)
		{
			KorisnikDTO korisnik = await _service.Register(registracijaDto);

			if (korisnik == null)
			{
				return BadRequest();
			}

			return Ok(korisnik);
		}

		#endregion

		#region GET

		[HttpGet("get-korisnici")]
		[Authorize(Roles = "ADMINISTRATOR")]
		public async Task<IActionResult> GetAll()
		{
			List<KorisnikDTO> korisnici = await _service.GetAll();

			if (korisnici == null)
			{
				return BadRequest();
			}

			return Ok(korisnici);
		}

		[Authorize]
		[HttpGet("get-profil")]
		public async Task<IActionResult> GetMyProfile()
		{
			int id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			KorisnikDTO korisnik = await _service.GetById(id);

			if (korisnik == null)
			{
				return BadRequest();
			}

			return Ok(korisnik);
		}

		[HttpGet("get-prodavci")]
		[Authorize(Roles = "ADMINISTRATOR")]
		public async Task<IActionResult> GetAllSalesmans()
		{
			List<VerifikacijaKorisnikaDTO> prodavci = await _service.GetAllProdavacs();

			if (prodavci == null)
			{
				return BadRequest();
			}

			return Ok(prodavci);
		}

		#endregion

		#region PUT

		[HttpPut]
		[Consumes("multipart/form-data")]
		[Authorize]
		public async Task<IActionResult> Put([FromForm] IzmenaKorisnikaDTO izmenaDto)
		{
			int id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			KorisnikDTO user = await _service.IzmenaProfila(id, izmenaDto);

			if (user == null)
			{
				return BadRequest();
			}

			return Ok(user);
		}

		[HttpPut("prihvati-verifikaciju/{id}")]
		[Authorize(Roles = "ADMINISTRATOR")]
		public async Task<IActionResult> AcceptVerification(int id)
		{
			KorisnikDTO korisnik = await _service.PrihvatiVerifikaciju(id);

			if (korisnik == null)
			{
				return BadRequest();
			}

			return Ok(korisnik);
		}

		[HttpPut("odbij-verifikaciju/{id}")]
		[Authorize(Roles = "ADMINISTRATOR")]
		public async Task<IActionResult> DenyVerification(int id)
		{
			KorisnikDTO korisnik = await _service.OdbijVerifikaciju(id);

			if (korisnik == null)
			{
				return BadRequest();
			}

			return Ok(korisnik);
		}

		#endregion

	}
}
