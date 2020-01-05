using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class SellerStats
    {
        public int TotalSales { get; set; }
        public int MonthSales { get; set; }
        public Product TopProduct { get; set; }
        public int TopProductAmountSold { get; set; }
    }
}
