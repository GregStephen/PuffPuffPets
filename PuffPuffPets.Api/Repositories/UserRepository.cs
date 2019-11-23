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

        public bool AddNewUser(AddNewUserDto newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                // needs to do a check to see if the username already exists
                // needs to do a check to see if the email already exits
                var addressRepo = new AddressRepository();
                var newAddress = new AddAddressDto();
                var user = new AddUserDto();
                user.UserName = newUser.UserName;
                user.FirstName = newUser.FirstName;
                user.LastName = newUser.LastName;
                user.IsSeller = newUser.IsSeller;
                user.Email = newUser.Email;
                user.DateCreated = newUser.DateCreated;
                user.Password = newUser.Password;
                user.BusinessName = newUser.BusinessName;

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
    }
}
