using Dapper;
using Microsoft.Data.SqlClient;
using PuffPuffPets.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace PuffPuffPets.Api.Repositories
{
    public class ProductTypeRepository : IProductTypeRepository
    {
        string _connectionString = "Server=localhost;Database=PuffPuffPets;Trusted_Connection=True;";

        public IEnumerable<ProductType> GetAllProductTypes()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var productTypes = db.Query<ProductType>(@"SELECT * FROM [ProductType]");
                return productTypes;
            }
        }
    }
}
