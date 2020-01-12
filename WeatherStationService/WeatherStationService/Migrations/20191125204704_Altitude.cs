using Microsoft.EntityFrameworkCore.Migrations;

namespace WeatherStationService.Migrations
{
    public partial class Altitude : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Altitude",
                table: "Measurements",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Altitude",
                table: "Measurements");
        }
    }
}
