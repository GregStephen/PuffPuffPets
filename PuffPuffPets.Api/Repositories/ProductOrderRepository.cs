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
                                    QuantityOrdered,
                                    isShipped,
                                    ShippedDate)
                               OUTPUT INSERTED.*
                               VALUES
                                    (@ProductId,
                                    @OrderId,
                                    @QuantityOrdered,
                                    @isShipped,
                                    @ShippedDate)";

                return db.Execute(sql, newProductOrder) == 1;
            }
        }

        public bool DeleteProductOrder(Guid productOrderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DECLARE @varOrderId varchar(max)
                            SET @varOrderId = (SELECT OrderId
                            FROM [ProductOrder]
                            WHERE [Id] = @productOrderId)

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
                var productOrders = db.Query<Order_ProductOrder>(@"SELECT PO.[Id] AS ProductOrderId
                                                                      ,PO.[ProductId]
                                                                      ,PO.[OrderId]
                                                                      ,PO.[QuantityOrdered]
                                                                      ,PO.[IsShipped]
                                                                      ,PO.[ShippedDate]
                                                                      ,O.[Id] AS OId
                                                                      ,O.[UserId]
                                                                      ,O.[PaymentTypeId]
                                                                      ,O.[TotalPrice]
                                                                      ,O.[IsCompleted]
                                                                      ,O.[PurchaseDate]
                                                                  INTO #tempPOO
                                                                  FROM [Order] O
                                                                  JOIN ProductOrder PO
                                                                  ON PO.OrderId = O.Id
                                                                  WHERE O.UserId = @UserId
                                                                  SELECT *
                                                                  FROM (
                                                                  SELECT [Title]
                                                                      ,[SellerId]
                                                                      ,[ImgUrl]
                                                                      ,[TypeId]
                                                                      ,[Description]
                                                                      ,[CategoryId]
                                                                      ,[Price]
                                                                      ,[QuantityInStock]
                                                                	  ,t.*
                                                                      ,ROW_NUMBER() OVER(PARTITION BY P.Id ORDER BY P.Id DESC) rn
                                                                  FROM Product P
                                                                  JOIN #tempPOO AS t
                                                                  ON t.productId = P.Id
                                                                  WHERE t.isCompleted = 0
                                                                  ) a
                                                                  WHERE rn = 1

                                                                  DROP TABLE #tempPOO",
                                                                new { userId });

                return productOrders.ToList();
            }
        }

        public ProductOrder EditProductOrder(ProductOrder updatedProductOrder, Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"update ProductOrder
                            set QuantityOrdered = @QuantityOrdered,
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
