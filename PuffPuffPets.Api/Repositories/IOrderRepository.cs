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
        IEnumerable<Order> GetOrdersByUserId(Guid userId);
        Order GetOrderById(Guid orderId);
        bool AddNewOrder(AddOrderDto newOrder);
        bool DeleteOrder(Guid orderId);

    }
}
