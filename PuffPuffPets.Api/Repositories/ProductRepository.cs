using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using PuffPuffPets.Api.DataModels;
using System.Threading.Tasks;
using Dapper;
using PuffPuffPets.Api.Dtos;
namespace PuffPuffPets.Api.Repositories
{
    public class ProductRepository: IProductRepository
    {
        string _connectionString = "Server=localhost;Database=PuffPuffPets;Trusted_Connection=True;";

        public AllProductsReturn GetAllProducts()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var productResults = new AllProductsReturn();
                var products = db.Query<Product>(@"SELECT * FROM [Product]");
                productResults.Products = products;
                productResults.TotalProducts = products.Count();
                return productResults;
            }

        }

        public SearchReturn SearchThruProducts(string term, string[] searchCategories)
       {
            using (var db = new SqlConnection(_connectionString))
            {
                var catRepo = new CategoryRepository();
                var searchResults = new SearchReturn();
            
                var sql = @"SELECT p.*
                            FROM [Product] p
                            JOIN [User] u
                            ON p.SellerId = u.Id";
                var whereStatement = "";
                var regex = "%";
                if (searchCategories.Length != 0)
                {
                    whereStatement = @" WHERE p.categoryId in @searchCategories";
                }
                if (term != null)
                {
      
                    char[] charArr = term.ToCharArray();
                    foreach (char ch in charArr)
                    {
                        regex += "[" + ch + "]";
                    }
                    regex += "%";
                    if (searchCategories.Length == 0)
                    {
                        whereStatement = " WHERE ([Title] LIKE @regex OR [BusinessName] LIKE @regex)";
                    }
                    else
                    {
                        whereStatement = @" WHERE ([Title] LIKE @regex OR [BusinessName] LIKE @regex)
                                        AND p.categoryId in @searchCategories";
                    }
                }
              
                
                sql += whereStatement;
                var parameters = new { regex, searchCategories };
                var productsSearched = db.Query<Product>(sql, parameters);
                var categoryTotalResults = catRepo.GetProductsInCategories(regex);
                searchResults.Products = productsSearched;
                searchResults.TotalProducts = productsSearched.Count();
                searchResults.TotalForEachCategory = categoryTotalResults;
                return searchResults;
            }
        }

        public IEnumerable<Product> GetAllProductsByCategory(Guid categoryId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Product]
                            WHERE [CategoryId] = @categoryId";
                var parameters = new { categoryId };
                var products = db.Query<Product>(sql, parameters);
                return products;
            }
        }
        public Product GetProductById(Guid productId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Product]
                            WHERE [Id] = @productId";
                var parameters = new { productId };
                var product = db.QueryFirst<Product>(sql, parameters);
                return product;
            }
        }

        public IEnumerable<Product> GetProductsByUid(Guid Uid)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Product]
                            WHERE [SellerId] = @Uid";
                var parameters = new { Uid };
                var products = db.Query<Product>(sql, parameters);
                return products;
            }
        }
        public bool AddNewProduct(AddProductDto newProduct)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                            INSERT INTO [Product]
                            ([Title]
                            ,[SellerId]
                            ,[ImgUrl]
                            ,[TypeId]
                            ,[Description]
                            ,[CategoryId]
                            ,[Price]
                            ,[QuantityInStock])
                           VALUES
                            (@title,
                             @sellerId,
                             @imgUrl,
                             @typeId,
                             @description,
                             @categoryId,
                             @price,
                             @quantityInStock
                                        )";

                return db.Execute(sql, newProduct) == 1;
            }
        }

        public bool EditProduct(EditProductDto updatedProduct, Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Update [Product]
                            SET [Title] = @title,
                                [ImgUrl] = @imgUrl,
                                [TypeId] = @typeId,
                                [QuantityInStock] = @quantityInStock,
                                [Description] = @description,
                                [Price] = @price,
                                [CategoryId] = @categoryId
                                Where Id = @id";
                updatedProduct.Id = id;
                return db.Execute(sql, updatedProduct) == 1;
            }
        }

        public bool DeleteProduct(Guid productId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE
                            FROM [Product]
                            WHERE Id = @productId";

                return db.Execute(sql, new { productId }) == 1;
            }
        }

        public IEnumerable<UnshippedProductDto> GetUnshippedProductsBySellerId(Guid sellerId)
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
                            INTO #tempP_PO
                            FROM [Product] P
                            JOIN [ProductOrder] PO
                            ON PO.ProductId = P.Id
                            WHERE P.SellerId = @sellerId AND PO.isShipped = 0

                            SELECT ProductId
                            ,SellerId
                            ,Title
                            ,ImgUrl
                            ,TypeId
                            ,Description
                            ,Price
                            ,CategoryId
                            ,QuantityInStock
                            ,QuantityOrdered
                            ,ProductOrderId
                            ,O.PurchaseDate
                            ,O.Id as OrderId
                            FROM #tempP_PO
                            JOIN [Order] O
                            ON #tempP_PO.OrderId = O.Id
                            WHERE O.IsCompleted = 1";
                var parameters = new { sellerId };
                var products = db.Query<UnshippedProductDto>(sql, parameters);
                return products;
            }
        }
    }
}