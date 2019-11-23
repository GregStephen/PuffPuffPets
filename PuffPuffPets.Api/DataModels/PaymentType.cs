using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class PaymentType
    {
        public string Type { get; set; }
        public int AccountNumber { get; set; }
        public Guid UserId { get; set; }
    }
}
