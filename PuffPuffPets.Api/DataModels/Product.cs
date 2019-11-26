using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int SellerId { get; set; }
        public string ImgUrl { get; set; }
        public int TypeId { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }

    }
}