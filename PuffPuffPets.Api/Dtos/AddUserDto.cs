﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Dtos
{
    public class AddUserDto
    {
        public bool IsSeller { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
        public string Password { get; set; }
        public string BusinessName { get; set; }
    }
}
