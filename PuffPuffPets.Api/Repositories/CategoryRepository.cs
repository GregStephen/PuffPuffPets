using Dapper;
using Microsoft.Data.SqlClient;
using PuffPuffPets.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        string _connectionString = "Server=localhost;Database=PuffPuffPets;Trusted_Connection=True;";

        public IEnumerable<Category> GetAllCategories()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var categories = db.Query<Category>(@"SELECT * FROM [Category]");
                return categories;
            }
        }

        public IEnumerable<CategoryProducts> GetProductsInCategories(string regexTerm)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT c.Id, c.Name, count(*) as TotalProducts
                            FROM Category c
                            LEFT JOIN Product p
                            ON c.Id = p.CategoryId
                            JOIN [User] u
                            ON p.SellerId = u.Id
                             WHERE (p.[Title] LIKE @regexTerm OR u.[BusinessName] LIKE @regexTerm)
                            GROUP BY c.Id, c.Name";
                var parameters = new { regexTerm };
                var categories = db.Query<CategoryProducts>(sql, parameters);
                return categories;
            }
        }
    }
}
