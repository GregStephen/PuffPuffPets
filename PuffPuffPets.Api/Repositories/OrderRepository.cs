using Microsoft.Data.SqlClient;
using PuffPuffPets.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PuffPuffPets.Api.Dtos;
using Microsoft.Extensions.Configuration;

namespace PuffPuffPets.Api.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        string _connectionString;

        public OrderRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public bool AddNewOrder(Order newOrder)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                            INSERT INTO [Order]
                                    (UserId,
                                    isCompleted,
                                    TotalPrice,
                                    PaymentTypeId,
                                    PurchaseDate,
                                    ShippingAddress)
                               OUTPUT INSERTED.*
                               VALUES
                                    (@userId,
                                    0,
                                    0,
                                    @paymentTypeId,
                                    null,
                                    null)";

                return db.Execute(sql, newOrder) == 1;
            }
        }

        public bool DeleteOrder(Guid orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                            DELETE FROM [Order]
                            WHERE [Id] = @orderId";
                var parameters = new { orderId };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public IEnumerable<Order> GetAllOrders()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var orders = db.Query<Order>(@"SELECT * 
                                            FROM [Order]");

                return orders.ToList();
            }
        }

        public Order GetOrderById(Guid orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * 
                            FROM [Order]
                            WHERE [Id] = @orderId";

                var parameters = new { orderId };
                return db.QueryFirst<Order>(sql, parameters);
            }
        }

        public IEnumerable<CustomerOrderHistoryDto> GetOrderHistoryByCustomerId(Guid customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = (@"SELECT P.Id AS ProductId
                                            ,P.SellerId
                                            ,P.Title
                                            ,P.ImgUrl
                                            ,P.TypeId
                                            ,P.Description
                                            ,P.Price AS IndividualPrice
                                            ,P.CategoryId
                                            ,PO.Id AS ProductOrderId
                                            ,PO.QuantityOrdered
                                            ,PO.OrderId
                                            ,O.TotalPrice
                                            ,O.PurchaseDate
                                            ,US.BusinessName
                                            FROM [Order] O
                                            JOIN [User] UC
                                            ON O.UserId = UC.Id AND UC.Id = @customerId AND O.IsCompleted = 1
                                            JOIN [ProductOrder] PO
                                            ON O.Id = PO.OrderId
                                            JOIN [Product] P
                                            ON PO.ProductId = P.Id
                                            JOIN [User] US
                                            ON US.Id = P.SellerId");

                var parameters = new { customerId };
                var orders = db.Query<CustomerOrderHistoryDto>(sql, parameters);
                return orders;
            }
        }

        public IEnumerable<UnshippedOrShippedProductDto> GetUnshippedProductsOrOrderHistoryBySellerId(Guid sellerId, int booleanValue)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT P.Id AS ProductId
                            ,P.SellerId
                            ,P.Title
                            ,P.ImgUrl
                            ,P.TypeId
                            ,P.Description
                            ,P.Price
                            ,P.CategoryId
                            ,P.QuantityInStock
                            ,PO.Id AS ProductOrderId
                            ,PO.QuantityOrdered
                            ,PO.OrderId
                            ,O.PurchaseDate
                            ,O.Id AS OrderId
                            ,U.FirstName
                            ,U.LastName
                            ,U.UserName
                            ,UA.AddressLine1
                            ,UA.City
                            ,UA.State
                            ,UA.ZipCode
                            FROM [Product] P
                            JOIN [ProductOrder] PO
                            ON PO.ProductId = P.Id
                            AND P.SellerId = @sellerId AND PO.isShipped = @booleanValue
                            JOIN [Order] O
                            ON PO.OrderId = O.Id AND O.IsCompleted = 1
                            JOIN [User] U
                            ON U.Id = O.UserId
                            JOIN [UserAddress] UA
                            ON U.Id = UA.UserId AND O.ShippingAddress = UA.AddressLine1
                            ORDER BY O.PurchaseDate DESC";

                var parameters = new { sellerId, booleanValue };
                var products = db.Query<UnshippedOrShippedProductDto>(sql, parameters);
                return products;
            }
        }

        public bool EditOrder(Order editedOrder)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Order]
                            SET IsCompleted = 1,
                            TotalPrice = @totalPrice,
                            PaymentTypeId = @paymentTypeId,
                            PurchaseDate = @purchaseDate,
                            ShippingAddress = @shippingAddress
                            WHERE [Id] = @id";

                return db.Execute(sql, editedOrder) == 1;
            }

        }

        public Guid FindCurrentOrder(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var SQL = @"SELECT Id FROM [Order] WHERE isCompleted = 0 AND UserId= @UserId";
                var Parameters = new { userId };
                return db.QueryFirst<Guid>(SQL, Parameters);
            }

        }
    }
}
