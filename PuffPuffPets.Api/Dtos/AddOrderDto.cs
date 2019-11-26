using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Dtos
{
    public class AddOrderDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public bool isCompleted { get; set; }
        public int TotalPrice { get; set; }
        public Guid PaymentTypeId { get; set; }
        public DateTime PurchaseDate { get; set; }

    }
}
