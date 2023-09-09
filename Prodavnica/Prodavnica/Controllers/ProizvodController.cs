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
	public class ProizvodController : ControllerBase
	{
		private readonly IProizvodService _service;

		public ProizvodController(IProizvodService service)
		{
			_service = service;
		}

		#region GET

		[HttpGet("get-sve-proizvode")]
		[Authorize(Roles = "KUPAC")]
		public async Task<IActionResult> GetAllProizvods()
		{
			List<ProizvodDTO> proizvodi = await _service.GetAll();

			if (proizvodi == null)
			{
				return BadRequest();
			}

			return Ok(proizvodi);
		}

		[HttpGet("{id}")]
		[Authorize(Roles = "PRODAVAC")]
		public async Task<IActionResult> Get(int id)
		{
			ProizvodDTO proizvodDTO = await _service.GetProductById(id);

			if (proizvodDTO == null)
			{
				return BadRequest();
			}

			return Ok(proizvodDTO);
		}

		[HttpGet("get-moje-proizvode")]
		[Authorize(Roles = "PRODAVAC", Policy = "VerifiedUserOnly")]
		public async Task<IActionResult> GetMyProizvods()
		{
			int id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			List<ProizvodDTO> proizvodi = await _service.GetMyProducts(id);

			if (proizvodi == null)
			{
				return BadRequest();
			}

			return Ok(proizvodi);
		}

		#endregion

		#region POST

		[HttpPost]
		[Authorize(Roles = "PRODAVAC", Policy = "VerifiedUserOnly")]
		public async Task<IActionResult> Post([FromForm] KreiranjeProizvodaDTO noviProizvod)
		{
			int id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			ProizvodDTO proizvod = await _service.CreateProduct(id, noviProizvod);

			if (proizvod == null)
			{
				return BadRequest();
			}

			return Ok(proizvod);
		}

		#endregion

		#region PUT

		[HttpPut]
		[Authorize(Roles = "PRODAVAC", Policy = "VerifiedUserOnly")]
		public async Task<IActionResult> Put([FromForm] IzmenaProizvodaDTO proizvodDto)
		{
            int userId = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			ProizvodDTO proizvod = await _service.UpdateProduct(userId, proizvodDto.Id, proizvodDto);

			if (proizvod == null)
			{
				return BadRequest();
			}

			return Ok(proizvod);
		}

		#endregion

		#region DELETE

		[HttpDelete("{id}")]
		[Authorize(Roles = "PRODAVAC", Policy = "VerifiedUserOnly")]
		public async Task<IActionResult> Delete(int id)
		{
			int korisnikId = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);

			bool obrisan = await _service.DeleteProduct(korisnikId, id);

			if (obrisan == false)
			{
				return BadRequest();
			}

			return Ok();
		}

		#endregion

	}
}
