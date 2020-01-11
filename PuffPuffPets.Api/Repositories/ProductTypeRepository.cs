using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PuffPuffPets.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace PuffPuffPets.Api.Repositories
{
    public class ProductTypeRepository : IProductTypeRepository
    {
        string _connectionString;

        public ProductTypeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

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
