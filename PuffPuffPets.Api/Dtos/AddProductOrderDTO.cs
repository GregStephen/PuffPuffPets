using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Dtos
{
    public class AddProductOrderDTO
    {
        public Guid ProductId { get; set; }
        public int QuantityOrdered { get; set; }
        public Guid UserId { get; set; }
    }
}
