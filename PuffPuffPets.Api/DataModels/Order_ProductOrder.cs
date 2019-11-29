using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class Order_ProductOrder
    {
        public Guid ProductOrderId { get; set; }
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }
        public bool isShipped { get; set; }
        public DateTime ShippedDate { get; set; }
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public bool isCompleted { get; set; }
        public int TotalPrice { get; set; }
        public Guid PaymentTypeId { get; set; }
        public DateTime PurchaseDate { get; set; }

    }
}
