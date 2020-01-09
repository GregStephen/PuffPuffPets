using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public bool isCompleted { get; set; }
        public int TotalPrice { get; set; }
        public Guid paymentTypeId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string ShippingAddress { get; set; }
    }
}
