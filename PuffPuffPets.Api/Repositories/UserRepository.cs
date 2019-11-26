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

        public User GetUserByEmailAndPassword(string email, string password)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE ([Password] = @password AND [Email] = @email)";
                var parameters = new { email, password };
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

        public bool UserEmailCheck(string newUserEmailCheck)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [Email] = @newUserEmailCheck";
                var parameters = new { newUserEmailCheck };
                var userEmailComesBack = db.Query<User>(sql, parameters);
                if (userEmailComesBack.Count() != 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public bool AddNewUser(AddNewUserDto newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var userNameExists = UserNameCheck(newUser.UserName);
                var userEmailExists = UserEmailCheck(newUser.Email);
                // if either of these are true then STOP 
                var addressRepo = new AddressRepository();
                var newAddress = new AddAddressDto();
                newAddress.AddressLine1 = newUser.AddressLine1;
                newAddress.AddressLine2 = newUser.AddressLine2;
                newAddress.City = newUser.City;
                newAddress.State = newUser.State;
                newAddress.ZipCode = newUser.ZipCode;
                var sql = @"
                            INSERT INTO [User]
                                ([IsSeller],
                                 [UserName],
                                 [FirstName],
                                 [LastName],
                                 [Email],
                                 [DateCreated],
                                 [Password],
                                 [BusinessName])
                            OUTPUT INSERTED.Id
                            VALUES
                                (@isSeller,
                                 @userName,
                                 @firstName,
                                 @lastName,
                                 @email,
                                 @dateCreated,
                                 @password,
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
                //var paymentTypeRepo = new PaymentTypeRepository();
                //paymentTypeRepo.DeleteUserPaymentTypes(userId);
                var sql = @"UPDATE [User]
                            SET [FirstName] = '',
                                [LastName] = '',
                                [Email] = '',
                                [Password] = ''
                            WHERE Id = @userId";
                var parameters = new { userId };
                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}
