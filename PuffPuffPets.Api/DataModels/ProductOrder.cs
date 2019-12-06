using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class ProductOrder
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int QuantityOrdered { get; set; }
        public bool isShipped { get; set; }
        public DateTime ShippedDate { get; set; }
    }
}
