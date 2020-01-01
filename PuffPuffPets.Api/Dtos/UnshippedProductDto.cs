using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Dtos
{
    public class UnshippedProductDto
    {
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public string Title { get; set; }
        public Guid SellerId { get; set; }
        public string ImgUrl { get; set; }
        public Guid TypeId { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public int Price { get; set; }
        public int QuantityInStock { get; set; }
        public int QuantityOrdered { get; set; }
        public DateTime PurchaseDate { get; set; }
        public Guid ProductOrderId { get; set; }
    }
}
