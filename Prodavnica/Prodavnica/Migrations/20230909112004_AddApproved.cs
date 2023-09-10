using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Prodavnica.Migrations
{
    /// <inheritdoc />
    public partial class AddApproved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Approved",
                table: "Porudzbinas",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approved",
                table: "Porudzbinas");
        }
    }
}
