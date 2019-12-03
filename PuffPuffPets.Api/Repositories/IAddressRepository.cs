using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Repositories
{
    public interface IAddressRepository
    {
        bool AddNewAddress(AddAddressDto newAddress);
        IEnumerable<Address> GetAddressesByUserId(Guid userId);
        Address GetPreferredAddressOfUserByUserId(Guid userId);
        void DeleteUserAddresses(Guid userId);
    }
}
