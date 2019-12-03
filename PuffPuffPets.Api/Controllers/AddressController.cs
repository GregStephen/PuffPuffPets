using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Repositories;

namespace PuffPuffPets.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly ILogger<AddressController> _logger;
        private readonly IAddressRepository _repo;

        public AddressController(ILogger<AddressController> logger, IAddressRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("{userId}")]
        public IEnumerable<Address> GetAllAddressesByUserId(Guid userId)
        {
            return _repo.GetAddressesByUserId(userId);
        }

        [HttpGet("prefered/{userId}")]
        public Address GetPreferredAddressesByUserId(Guid userId)
        {
            return _repo.GetPreferredAddressOfUserByUserId(userId);
        }
    }
}