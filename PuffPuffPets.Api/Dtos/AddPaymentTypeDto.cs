
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Dtos
{
    public class AddPaymentTypeDto
    {
        public string Type { get; set; }
        public long AccountNumber { get; set; }
        public Guid UserId { get; set; }
    }
}
