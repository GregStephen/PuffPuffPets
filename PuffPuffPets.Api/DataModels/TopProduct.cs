﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.DataModels
{
    public class TopProduct
    {
        public Guid MostSoldProduct { get; set; }
        public int MostSoldAmount { get; set; }
    }
}
