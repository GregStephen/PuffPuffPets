using Microsoft.Data.SqlClient;
using PuffPuffPets.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace PuffPuffPets.Api.Repositories
{
    public class ProductOrderRepository : IProductOrderRepository
    {
        string _connectionString = "Server=localhost;Database=PuffPuffPets;Trusted_Connection=True;";

        public bool AddNewProductOrder(ProductOrder newProductOrder)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                            INSERT INTO [ProductOrder]
                                    (ProductId,
                                    OrderId,
                                    Quantity,
                                    isShipped,
                                    ShippedDate)
                               OUTPUT INSERTED.*
                               VALUES
                                    (@ProductId,
                                    @OrderId,
                                    @Quantity,
                                    @isShipped,
                                    @ShippedDate)";

                return db.Execute(sql, newProductOrder) == 1;
            }
        }

        public bool DeleteProductOrder(Guid productOrderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                            DELETE FROM [ProductOrder]
                            WHERE [Id] = @productOrderId";
                var parameters = new { productOrderId };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public IEnumerable<ProductOrder> GetAllProductOrders()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var productOrders = db.Query<ProductOrder>(@"SELECT * 
                                            FROM [ProductOrder]");

                return productOrders.ToList();
            }
        }

        public ProductOrder GetProductOrderById(Guid productOrderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * 
                            FROM [ProductOrder]
                            WHERE [Id] = @ProductOrderId";

                var parameters = new { productOrderId };
                return db.QueryFirst<ProductOrder>(sql, parameters);
            }
        }

        public IEnumerable<Order_ProductOrder> GetProductOrdersByUserId(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var productOrders = db.Query<Order_ProductOrder>(@"SELECT [Id] AS ProductOrderId
                                                                ,[ProductId]
                                                                ,[OrderId]
                                                                ,[Quantity]
                                                                ,[IsShipped]
                                                                ,[ShippedDate]
                                                            INTO #tempPO
                                                            FROM ProductOrder
                                                            
                                                            SELECT *
                                                            FROM #tempPO
                                                            FULL JOIN [Order]
                                                            ON #tempPO.OrderId = [Order].Id
                                                            WHERE UserId = @UserId

                                                            DROP TABLE #tempPO", new { userId });

                return productOrders.ToList();
            }
        }

        public ProductOrder EditProductOrder(ProductOrder updatedProductOrder, Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"update ProductOrder
                            set Quantity = @Quantity,
                            	isShipped = @isShipped,
                            	ShippedDate = @ShippedDate
                            output inserted.*
                            where [id] = @id";

                updatedProductOrder.Id = id;

                var candy = db.QueryFirst<ProductOrder>(sql, updatedProductOrder);
                return candy;
            }
        }
    }
}
