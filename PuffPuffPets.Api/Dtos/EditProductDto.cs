﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Dtos
{
    public class EditProductDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public Guid TypeId { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public int Price { get; set; }
        public int QuantityInStock { get; set; }
    }
}
