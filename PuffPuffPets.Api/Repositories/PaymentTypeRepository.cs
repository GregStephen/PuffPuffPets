using Dapper;
using Microsoft.Data.SqlClient;
using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Dtos;
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

        public bool AddNewPaymentType(AddPaymentTypeDto newPaymentType)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [PaymentType]
                                ([UserId],
                                 [AccountNumber],
                                 [Type])
                            VALUES
                                (@userId,
                                 @accountNumber,
                                 @type)";
                return db.Execute(sql, newPaymentType) == 1;
            }
        }
        public bool DeletePaymentType(Guid paymentTypeId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE
                            FROM [PaymentType]
                            WHERE [Id] = @paymentTypeId";
                var parameters = new { paymentTypeId };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public void DeleteAllPaymentTypesByUserId(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE
                            FROM [PaymentType]
                            WHERE [UserId] = @userId";
                var parameters = new { userId };
                db.Execute(sql, parameters);
            }
        }

    }
}
