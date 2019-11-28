using PuffPuffPets.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Repositories
{
    interface IProductOrder
    {
        IEnumerable<ProductOrder> GetAllProductOrders();
        IEnumerable<ProductOrder> GetProductOrdersByUserId(Guid userId);
        ProductOrder GetProductOrderById(Guid productOrderId);
        bool AddNewProductOrder(IProductOrder newProductOrder);
        bool DeleteProductOrder(Guid productOrderId);
        bool EditProductOrder(Guid productOrderId);
    }
}
