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
    public class UserRepository : IUserRepository
    {
        string _connectionString = "Server=localhost;Database=PuffPuffPets;Trusted_Connection=True;";

        public IEnumerable<User> GetAllUsers()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>(@"SELECT * FROM [User]");
                return users;
            }
        }

        public User GetUserById(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [Id] = @userId";
                var parameters = new { userId };
                var user = db.QueryFirst<User>(sql, parameters);
                return user;
            }
        }

        public User GetUserByFirebaseUid(string firebaseUid)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [FirebaseUid] = @firebaseUid";
                var parameters = new { firebaseUid };
                var user = db.QueryFirst<User>(sql, parameters);
                return user;
            }
        }

        public bool UserNameCheck(string newUserNameCheck)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [UserName] = @newUserNameCheck";
                var parameters = new { newUserNameCheck };
                var userNamesComesBack = db.Query<User>(sql, parameters);
                if (userNamesComesBack.Count() != 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public bool EditUser(EditUserDto editedUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [User]
                            SET 
                                [UserName] = @userName,
                                [FirstName] = @firstName,
                                [LastName] = @lastName,
                            WHERE [Id] = @id";
                return db.Execute(sql, editedUser) == 1;
            }
        }
        public bool AddNewUser(AddNewUserDto newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var userNameExists = UserNameCheck(newUser.UserName);
                if (userNameExists)
                {
                    return false;
                }
                var addressRepo = new AddressRepository();
                var newAddress = new AddAddressDto();
                newAddress.AddressLine1 = newUser.AddressLine1;
                newAddress.AddressLine2 = newUser.AddressLine2;
                newAddress.City = newUser.City;
                newAddress.State = newUser.State;
                newAddress.ZipCode = newUser.ZipCode;
                newAddress.IsPreferred = true;
                var sql = @"
                            INSERT INTO [User]
                                ([IsSeller],
                                 [UserName],
                                 [FirstName],
                                 [LastName],
                                 [DateCreated],
                                 [FirebaseUid],
                                 [BusinessName])
                            OUTPUT INSERTED.Id
                            VALUES
                                (@isSeller,
                                 @userName,
                                 @firstName,
                                 @lastName,
                                 @dateCreated,
                                 @firebaseUid,
                                 @businessName)";
                var userId = db.QueryFirst<Guid>(sql, newUser);
                if (  userId != null)
                // This would be if there was no trouble creating the user
                {
                    newAddress.UserId = userId;
                    return addressRepo.AddNewAddress(newAddress);
                }
                else
                // This would be if there WAS trouble creating the user
                {
                    return false;
                }
            }
        }

        public bool DeleteUser(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var addressRepo = new AddressRepository();
                addressRepo.DeleteUserAddresses(userId);
                var paymentTypeRepo = new PaymentTypeRepository();
                paymentTypeRepo.DeleteAllPaymentTypesByUserId(userId);
                var sql = @"UPDATE [User]
                            SET [FirstName] = 'DELETED',
                                [LastName] = 'DELETED'
                            WHERE Id = @userId";
                var parameters = new { userId };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public TopProduct GetTopProduct(Guid sellerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT TOP(1) p.Id as MostSoldProduct, sum(po.QuantityOrdered) as MostSoldAmount
                            FROM ProductOrder po
                            JOIN Product p
                            ON po.ProductId = p.Id
                            WHERE p.SellerId = @sellerId
                            GROUP BY p.Id
                            ORDER BY MostSoldAmount DESC";
                var parameters = new { sellerId };
                return db.QueryFirst<TopProduct>(sql, parameters);
            }
        }
        public SellerStats GetSellerStats(Guid sellerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var productRepo = new ProductRepository();
                var sellerStats = new SellerStats();
                var topProductInfo= GetTopProduct(sellerId);
                var topProduct = productRepo.GetProductById(topProductInfo.MostSoldProduct);
                sellerStats.TopProduct = topProduct;
                sellerStats.TopProductAmountSold = topProductInfo.MostSoldAmount;
                var sql = @"";
                var parameters = new { sellerId };
                
                return sellerStats;
            }
        }
    }
}
