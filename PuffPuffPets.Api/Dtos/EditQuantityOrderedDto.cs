using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Dtos
{
    public class EditQuantityOrderedDto
    {
        public Guid id { get; set; }
        public int quantityOrdered { get; set; }

    }
}
