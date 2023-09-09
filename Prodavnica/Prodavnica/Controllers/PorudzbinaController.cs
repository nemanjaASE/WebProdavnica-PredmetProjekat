using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prodavnica.Dto;
using Prodavnica.Interfaces.IService;
using System.Data;

namespace Prodavnica.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PorudzbinaController : ControllerBase
	{
		IPorudzbinaService _service;

		public PorudzbinaController(IPorudzbinaService service)
		{
			_service = service;
		}

		#region GET

		[HttpGet("get-all-porudzbinas")]
		[Authorize(Roles = "ADMINISTRATOR")]
		public async Task<IActionResult> GetAllOrders()
		{
			List<PorudzbinaDTO> porudzbine = await _service.GetAllPorudzbinas();

			if (porudzbine == null)
			{
				return BadRequest();
			}

			return Ok(porudzbine);
		}

		[HttpGet("get-porudzbine-kupca-u-toku")]
		[Authorize(Roles = "KUPAC")]
		public async Task<IActionResult> GetPoruzbinasUTokuKupac()
		{
			int id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			List<PorudzbinaDTO> porudzbine = await _service.GetAllNedostavljenePorudzbine(id);

			if (porudzbine == null)
			{
				return BadRequest();
			}

			return Ok(porudzbine);
		}

		[HttpGet("get-porudzbine-prodavca-u-toku")]
		[Authorize(Roles = "PRODAVAC", Policy = "VerifiedUserOnly")]
		public async Task<IActionResult> GetPorudzbinasUTokuProdavac()
		{
			int id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			List<PorudzbinaDTO> porudzbine = await _service.GetAllNedostavljenePorudzbine(id);

			if (porudzbine == null)
			{
				return BadRequest();
			}

			return Ok(porudzbine);
		}

		[HttpGet("get-porudzbine-kupca-dostavljene")]
		[Authorize(Roles = "KUPAC")]
		public async Task<IActionResult> GetPorudzbinasDostavljeneKupac()
		{
			int id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			List<PorudzbinaDTO> porudzbine = await _service.GetAllDostavljenePorudzbine(id);

			if (porudzbine == null)
			{
				return BadRequest();
			}

			return Ok(porudzbine);
		}

		[HttpGet("get-porudzbine-prodavca-dostavljene")]
		[Authorize(Roles = "PRODAVAC", Policy = "VerifiedUserOnly")]
		public async Task<IActionResult> GetPorudzbinasDostavljeneProdavac()
		{
			int id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			List<PorudzbinaDTO> porudzbine = await _service.GetAllDostavljenePorudzbine(id);

			if (porudzbine == null)
			{
				return BadRequest();
			}

			return Ok(porudzbine);
		}

		#endregion

		#region POST

		[HttpPost("kreiranje-porudzbine")]
		[Authorize(Roles = "KUPAC")]
		public async Task<IActionResult> CreateOrder(KreiranjePorudzbineDTO porudzbinaDTO)
		{
			int id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			PorudzbinaDTO order = await _service.KreirajPorudzbinu(id, porudzbinaDTO);

			if (order == null)
			{
				return BadRequest();
			}

			return Ok(order);
		}

		#endregion

		 #region PUT

		[HttpPut("odbij-porudzbinu/{id}")]
		[Authorize(Roles = "KUPAC")]
		public async Task<IActionResult> DenyOrder(int id)
		{
			bool odbijena = await _service.OdbijPorudzbinu(id);

			if (!odbijena)
			{
				return BadRequest();
			}

			return Ok();
		}

		#endregion
	}
}
