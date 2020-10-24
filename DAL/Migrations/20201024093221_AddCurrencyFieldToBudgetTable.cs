using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class AddCurrencyFieldToBudgetTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budget_AspNetUsers_UserId1",
                table: "Budget");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Budget",
                table: "Budget");

            migrationBuilder.RenameTable(
                name: "Budget",
                newName: "Budgets");

            migrationBuilder.RenameIndex(
                name: "IX_Budget_Name_Value",
                table: "Budgets",
                newName: "IX_Budgets_Name_Value");

            migrationBuilder.RenameIndex(
                name: "IX_Budget_UserId1",
                table: "Budgets",
                newName: "IX_Budgets_UserId1");

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Budgets",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Budgets",
                table: "Budgets",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_AspNetUsers_UserId1",
                table: "Budgets",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_AspNetUsers_UserId1",
                table: "Budgets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Budgets",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Budgets");

            migrationBuilder.RenameTable(
                name: "Budgets",
                newName: "Budget");

            migrationBuilder.RenameIndex(
                name: "IX_Budgets_Name_Value",
                table: "Budget",
                newName: "IX_Budget_Name_Value");

            migrationBuilder.RenameIndex(
                name: "IX_Budgets_UserId1",
                table: "Budget",
                newName: "IX_Budget_UserId1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Budget",
                table: "Budget",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Budget_AspNetUsers_UserId1",
                table: "Budget",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
