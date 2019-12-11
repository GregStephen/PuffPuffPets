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

        public IEnumerable<Product> SearchThruProducts(string term)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var regex = "%";
                char[] charArr = term.ToCharArray();
                foreach (char ch in charArr)
                {
                    regex += "[" + ch + "]";
                }
                regex += "%";
                var sql = @"SELECT p.*
                            FROM [Product] p
                            JOIN [User] u
                            ON p.SellerId = u.Id
                            WHERE [Title] LIKE @regex OR [BusinessName] LIKE @regex";
                var parameters = new { regex };
                var productsSearched = db.Query<Product>(sql, parameters);
                return productsSearched;
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

        public bool AddNewProduct(AddProductDto newProduct)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                            INSERT INTO [Product]
                            (,[Title]
                            ,[SellerId]
                            ,[ImgUrl]
                            ,[TypeId]
                            ,[Description]
                            ,[CategoryId])
                            
                            output inserted.*
                           VALUES
                            (@Title,
                             @SellerId,
                             @ImgUrl,
                             @TypeId,
                             @Description,
                             @CategoryId,
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