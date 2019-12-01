using Microsoft.Data.SqlClient;
using PuffPuffPets.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PuffPuffPets.Api.Dtos;
namespace PuffPuffPets.Api.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        string _connectionString = "Server=localhost;Database=PuffPuffPets;Trusted_Connection=True;";

        public bool AddNewAddress(AddAddressDto newAddress)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                            INSERT INTO [UserAddress]
                                ([UserId],
                                 [AddressLine1],
                                 [AddressLine2],
                                 [City],
                                 [State],
                                 [ZipCode])
                            VALUES
                                (@userId,
                                 @addressLine1,
                                 @addressLine2,
                                 @city,
                                 @state,
                                 @zipCode)";
                return db.Execute(sql, newAddress) == 1;
            }
        }
        public IEnumerable<Address> GetAddressesByUserId(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [UserAddress]
                            WHERE [UserId] = @userId";
                var parameters = new { userId };
                var addresses = db.Query<Address>(sql, parameters);
                return addresses;
            }
        }

        public Address GetPreferredAddressOfUserByUserId(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [UserAddress]
                            WHERE ([UserId] = @userId AND [Preferred] = 1)";
                var parameters = new { userId };
                return db.QueryFirst<Address>(sql, parameters);
            }
        }
        public void DeleteUserAddresses(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE
                            FROM [UserAddress]
                            WHERE [UserId] = @userId";
                var parameters = new { userId };
                db.Execute(sql, parameters);
            }
        }
    }


}
