using Microsoft.EntityFrameworkCore;
using Prodavnica.Models;

namespace Prodavnica.Data
{
	public class DataContext : DbContext
	{
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
		public DbSet<Korisnik> Korisniks { get; set; }

		public DbSet<Proizvod> Proizvods { get; set; }

		public DbSet<Porudzbina> Porudzbinas { get; set; }

		public DbSet<PorudzbinaProizvod> PorudzbinaProizvods { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

			base.OnModelCreating(modelBuilder);

			modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
		}
	}
}
