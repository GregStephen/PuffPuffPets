using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Repositories
{
    public interface IProductOrderRepository
    {
        IEnumerable<ProductOrder> GetAllProductOrders();
        IEnumerable<Order_ProductOrder> GetProductOrdersByUserId(Guid userId);
        ProductOrder GetProductOrderById(Guid productOrderId);
        bool AddNewProductOrder(ProductOrder newProductOrder);
        bool DeleteProductOrder(Guid productOrderId);
        bool EditQuantityOrdered(EditQuantityOrderedDto quantityOrdered);
    }
}
