using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Repositories
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAllOrders();
        IEnumerable<CustomerOrderHistoryDto> GetOrderHistoryByCustomerId(Guid customerId);
        IEnumerable<UnshippedOrShippedProductDto> GetUnshippedProductsOrOrderHistoryBySellerId(Guid sellerId, int booleanValue);
        Order GetOrderById(Guid orderId);
        bool AddNewOrder(Order newOrder);
        bool DeleteOrder(Guid orderId);
        bool EditOrder(Order editedOrder);

    }
}
