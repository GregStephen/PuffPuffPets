using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(Guid userId);
        User GetUserByEmailAndPassword(string email, string password);
        bool EditUser(EditUserDto editedUser);
        bool AddNewUser(AddNewUserDto newUser);
        bool DeleteUser(Guid userId);
    }
}
