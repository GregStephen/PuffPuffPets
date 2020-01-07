using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Dtos;
using PuffPuffPets.Api.Repositories;

namespace PuffPuffPets.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class UserController : FirebaseEnabledController
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserRepository _repo;

        public UserController(ILogger<UserController> logger, IUserRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<User> GetAll()
        {
            return _repo.GetAllUsers();
        }

        [HttpGet("{userId}")]
        public User GetUser(Guid userId)
        {
            return _repo.GetUserById(userId);
        }

        [HttpGet("uid/{firebaseUid}")]
        public User Get(string firebaseUid)
        {
            return _repo.GetUserByFirebaseUid(firebaseUid);
        }

        [HttpGet("stats/{userId}")]
        public SellerStats GetSellerStats(Guid userId)
        {
            return _repo.GetSellerStats(userId);
        }

        [HttpPut]
        public IActionResult EditUser(EditUserDto editUserDto)
        {
            var editedUser = editUserDto;
            if(_repo.EditUser(editedUser))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult AddUser(AddNewUserDto newUser)
        {
            if (_repo.AddNewUser(newUser))
            {
                return Created($"user/{newUser.FirstName}", newUser);
            }
            else
            {
                return BadRequest();
            }

        }
        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(Guid userId)
        {
            _repo.DeleteUser(userId);
            return Ok();
        }
    }
}