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
                var sql = @"SELECT x.Id, x.Name, SUM(Total) AS TotalProducts FROM
                                (SELECT z.Id, z.Name, 0 as Total
                                FROM Category z
                                UNION
                                SELECT c.Id, c.Name, COUNT(*) AS Total
                                FROM Category c
                                LEFT JOIN Product p
                                ON c.Id = p.CategoryId
                                LEFT JOIN [User] u
                                ON p.SellerId = u.Id
                                WHERE (p.[Title] LIKE @regexTerm OR u.[BusinessName] LIKE @regexTerm)
                                GROUP BY c.Id, c.Name
                                ) x
                             GROUP BY x.id, x.name";
                var parameters = new { regexTerm };
                var categories = db.Query<CategoryProducts>(sql, parameters);
                return categories;
            }
        }
    }
}
