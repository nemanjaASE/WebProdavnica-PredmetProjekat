using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Prodavnica.Models;

namespace Prodavnica.Data.Configurations
{
	public class PorudzbinaProizvodConfiguration : IEntityTypeConfiguration<PorudzbinaProizvod>
	{
		public void Configure(EntityTypeBuilder<PorudzbinaProizvod> builder)
		{
			builder.HasKey(op => new { op.NarudzbinaId, op.ProizvodId });

			builder.HasOne(op => op.Proizvod)
				.WithMany(op => op.PorudzbinaProizvods)
				.HasForeignKey(op => op.ProizvodId)
				.IsRequired()
				.OnDelete(DeleteBehavior.Restrict);

			builder.HasOne(op => op.Porudzbina)
				.WithMany(op => op.PorudzbinaProizvods)
				.HasForeignKey(op => op.NarudzbinaId)
				.IsRequired()
				.OnDelete(DeleteBehavior.Restrict);
		}
	}
}
