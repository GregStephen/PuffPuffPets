﻿using Microsoft.Data.SqlClient;
using PuffPuffPets.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PuffPuffPets.Api.Dtos;

namespace PuffPuffPets.Api.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        string _connectionString = "Server=localhost;Database=PuffPuffPets;Trusted_Connection=True;";

        public bool AddNewOrder(AddOrderDto newOrder)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                            INSERT INTO [Order]
                                    (UserId,
                                    isCompleted,
                                    TotalPrice,
                                    PaymentTypeId,
                                    PurchaseDate)
                               OUTPUT INSERTED.*
                               VALUES
                                    (@UserId,
                                    @isCompleted,
                                    @TotalPrice,
                                    @PaymentTypeId,
                                    @PurchaseDate)";

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

        public IEnumerable<Order> GetOrdersByUserId(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var orders = db.Query<Order>(@"SELECT *
                                            FROM [Order] JOIN [User]
                                            ON [Order].UserId = [User].Id");

                return orders.ToList();
            }
        }
    }
}