using Dapper;
using Microsoft.Data.SqlClient;
using PuffPuffPets.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Repositories
{
    public class PaymentTypeRepository : IPaymentTypeRepository
    {
        string _connectionString = "Server=localhost;Database=PuffPuffPets;Trusted_Connection=True;";

        public IEnumerable<PaymentType> GetAllPaymentTypes()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"";
                var paymentTypes = db.Query<PaymentType>(sql);
                return paymentTypes;
            }
        }
    }
}
