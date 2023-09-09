using AutoMapper;
using Prodavnica.Dto;
using Prodavnica.Models;

namespace Prodavnica.Helper
{
	public class MappingProfiles : Profile
	{
        public MappingProfiles()
        {
			CreateMap<Korisnik, KorisnikDTO>().ReverseMap();

			CreateMap<Korisnik, VerifikacijaKorisnikaDTO>().ReverseMap();

			CreateMap<Korisnik, IzmenaKorisnikaDTO>().ReverseMap();

			CreateMap<Korisnik, RegistracijaDTO>().ReverseMap();

			CreateMap<Proizvod, ProizvodDTO>().ReverseMap();

			CreateMap<Proizvod, KreiranjeProizvodaDTO>().ReverseMap();

			CreateMap<Proizvod, IzmenaProizvodaDTO>().ReverseMap();

			CreateMap<Porudzbina, PorudzbinaDTO>().ReverseMap();

			CreateMap<Porudzbina, KreiranjePorudzbineDTO>().ReverseMap();

			CreateMap<PorudzbinaProizvod, PorudzbinaProizvodDTO>().ReverseMap();

			CreateMap<PorudzbinaProizvod, KreiranjePorudzbinaProizvodDTO>().ReverseMap();

			CreateMap<IFormFile, byte[]>().ConvertUsing((file, _, context) => ConvertIFormFileToByteArray(file, context));
			CreateMap<byte[], IFormFile>().ConvertUsing((byteArray, _, context) => ConvertByteArrayToIFormFile(byteArray, context));
		}

		public byte[] ConvertIFormFileToByteArray(IFormFile file, ResolutionContext context)
		{
			using (var m = new MemoryStream())
			{
				file.CopyTo(m);

				return m.ToArray();
			}
		}

		public IFormFile ConvertByteArrayToIFormFile(byte[] nizBajtova, ResolutionContext context)
		{

			var memory = new MemoryStream(nizBajtova);
			var file = new FormFile(memory, 0, nizBajtova.Length, null, "file");

			return file;
		}
	}
}
