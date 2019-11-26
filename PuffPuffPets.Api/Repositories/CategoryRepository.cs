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
    }
}
