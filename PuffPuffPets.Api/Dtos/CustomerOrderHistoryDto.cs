using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Dtos
{
    public class CustomerOrderHistoryDto
    {
        public Guid ProductId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public Guid OrderId { get; set; }
        public int QuantityOrdered { get; set; }
        public string BusinessName { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }
        public int IndividualPrice { get; set; }
        public int TotalPrice { get; set; }
    }
}
