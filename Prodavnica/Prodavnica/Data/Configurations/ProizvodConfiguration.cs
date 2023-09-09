using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prodavnica.Models;

namespace Prodavnica.Data.Configurations
{
	public class ProizvodConfiguration : IEntityTypeConfiguration<Proizvod>
	{
		public void Configure(EntityTypeBuilder<Proizvod> builder)
		{
			builder.HasKey(p => p.Id);

			builder.Property(p => p.Id).ValueGeneratedOnAdd();
			builder.Property(p => p.Naziv).IsRequired().HasMaxLength(30);
			builder.Property(p => p.Cena).IsRequired();

			builder.Property(p => p.Kolicina).IsRequired();

			builder.Property(p => p.Obrisan).HasDefaultValue(false);

			builder.HasOne(p => p.Korisnik)
				.WithMany(p => p.Proizvods)
				.HasForeignKey(p => p.KorisnikId)
				.OnDelete(DeleteBehavior.Restrict);
		}
	}
}
