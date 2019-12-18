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

        public IEnumerable<Product> GetAllProducts()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var products = db.Query<Product>(@"SELECT * FROM [Product]");
                return products;
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
                            SET [Title] = @Title,
                                [ImgUrl] = @ImgUrl,
                                [TypeId] = @TypeId,
                                [Quantity] = @Quantity,
                                [Description] = @Description,
                                [Price] = @Price,
                                [CategoryId] = @Category
                                Where Id = @Id";
                updatedProduct.Id = id;
                return db.Execute(sql, updatedProduct) == 1;
            }
        }

        public bool DeleteProduct(Guid ProductId )
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"delete
                            from Members
                            where [Product] = @candyIdToDelete";

                return db.Execute(sql, new { ProductId }) == 1;
            }
        }
    }
}