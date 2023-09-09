using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore;
using Prodavnica.Models;
using Prodavnica.Common;

namespace Prodavnica.Data.Configurations
{
	public class PorudzbinaConfiguration : IEntityTypeConfiguration<Porudzbina>
	{
		public void Configure(EntityTypeBuilder<Porudzbina> builder)
		{
			builder.HasKey(o => o.Id);
			builder.Property(o => o.Id).ValueGeneratedOnAdd();

			builder.Property(o => o.Adresa).IsRequired().HasMaxLength(35);


			builder.Property(o => o.Status).HasConversion(new EnumToStringConverter<EStatusPorudzbine>());

			builder.HasOne(o => o.Korisnik)
				.WithMany(o => o.Porudzbinas)
				.HasForeignKey(o => o.KorisnikId)
				.OnDelete(DeleteBehavior.Restrict);
		}
	}
}
