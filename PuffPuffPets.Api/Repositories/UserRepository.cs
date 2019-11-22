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

        public bool AddNewUser(AddUserDto newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                // needs to do a check to see if the username already exists
                // needs to do a check to see if the email already exits
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
                            VALUES
                                ([@isSeller],
                                 [@userName],
                                 [@firstName],
                                 [@lastName],
                                 [@email],
                                 [@dateCreated],
                                 [@password],
                                 [@businessName])";
                return db.Execute(sql, newUser) == 1;
            }
        }
    }
}
