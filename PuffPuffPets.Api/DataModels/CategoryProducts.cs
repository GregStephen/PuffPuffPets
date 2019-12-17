using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class CategoryProducts
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int TotalProducts { get; set; }
    }
}
