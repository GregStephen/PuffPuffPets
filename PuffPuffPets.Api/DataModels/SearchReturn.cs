using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class SearchReturn
    {
        public IEnumerable<Product> Products { get; set; }
        public int TotalProducts { get; set; }
        public IEnumerable<CategoryProducts> TotalForEachCategory { get; set; }
    }
}
