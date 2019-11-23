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

        public IEnumerable<PaymentType> GetAllPaymentTypes(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * 
                            FROM [PaymentType]
                            WHERE [UserId] = @userId";
                var parameters = new { userId };
                var paymentTypes = db.Query<PaymentType>(sql, parameters);
                return paymentTypes;
            }
        }

        public PaymentType GetSinglePaymentType(Guid paymentTypeId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [PaymentType]
                            WHERE [Id] = @paymentTypeId";
                var parameters = new { paymentTypeId };
                var paymentType = db.QueryFirst<PaymentType>(sql, parameters);
                return paymentType;
            }
        }
    }
}
