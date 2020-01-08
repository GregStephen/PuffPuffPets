using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class SellerStats
    {
        public string TotalSales { get; set; }
        public string MonthSales { get; set; }
        public Product TopProduct { get; set; }
        public int TopProductAmountSold { get; set; }
        public Product TopMonthProduct { get; set;}
        public int TopMonthProductAmountSold { get; set; }
    }
}
