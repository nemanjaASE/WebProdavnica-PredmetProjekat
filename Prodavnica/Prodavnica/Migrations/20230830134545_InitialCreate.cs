using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Prodavnica.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korisniks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Slika = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Tip = table.Column<int>(type: "int", nullable: false),
                    Verifikacija = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisniks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Porudzbinas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Komentar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false),
                    Cena = table.Column<double>(type: "float", nullable: false),
                    VremeNarudzbine = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VremeDostave = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnikId = table.Column<int>(type: "int", nullable: false),
                    CenaZaDostavu = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Porudzbinas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Porudzbinas_Korisniks_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "Korisniks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Proizvods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Slika = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Obrisan = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    KorisnikId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proizvods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Proizvods_Korisniks_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "Korisniks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PorudzbinaProizvods",
                columns: table => new
                {
                    NarudzbinaId = table.Column<int>(type: "int", nullable: false),
                    ProizvodId = table.Column<int>(type: "int", nullable: false),
                    Kolicina = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PorudzbinaProizvods", x => new { x.NarudzbinaId, x.ProizvodId });
                    table.ForeignKey(
                        name: "FK_PorudzbinaProizvods_Porudzbinas_NarudzbinaId",
                        column: x => x.NarudzbinaId,
                        principalTable: "Porudzbinas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PorudzbinaProizvods_Proizvods_ProizvodId",
                        column: x => x.ProizvodId,
                        principalTable: "Proizvods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PorudzbinaProizvods_ProizvodId",
                table: "PorudzbinaProizvods",
                column: "ProizvodId");

            migrationBuilder.CreateIndex(
                name: "IX_Porudzbinas_KorisnikId",
                table: "Porudzbinas",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvods_KorisnikId",
                table: "Proizvods",
                column: "KorisnikId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PorudzbinaProizvods");

            migrationBuilder.DropTable(
                name: "Porudzbinas");

            migrationBuilder.DropTable(
                name: "Proizvods");

            migrationBuilder.DropTable(
                name: "Korisniks");
        }
    }
}
