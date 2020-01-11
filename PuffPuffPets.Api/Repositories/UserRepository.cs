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
    public class UserRepository : IUserRepository
    {
        string _connectionString;
        private IAddressRepository _addressRepo;
        private IPaymentTypeRepository _paymentTypeRepo;
        private IProductRepository _productRepo;
        private IOrderRepository _orderRepo;
        private IProductOrderRepository _productOrderRepo;

        public UserRepository(IConfiguration configuration, IAddressRepository addressRepo, IProductOrderRepository productOrderRepo, IPaymentTypeRepository paymentTypeRepo, IProductRepository productRepo, IOrderRepository orderRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _addressRepo = addressRepo;
            _productRepo = productRepo;
            _paymentTypeRepo = paymentTypeRepo;
            _orderRepo = orderRepo;
            _productOrderRepo = productOrderRepo;
        }

        public IEnumerable<User> GetAllUsers()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>(@"SELECT * FROM [User]");
                return users;
            }
        }

        public User GetUserById(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [Id] = @userId";
                var parameters = new { userId };
                var user = db.QueryFirst<User>(sql, parameters);
                return user;
            }
        }

        public User GetUserByFirebaseUid(string firebaseUid)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [FirebaseUid] = @firebaseUid";
                var parameters = new { firebaseUid };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);
                return user;
            }
        }



        public bool UserNameCheck(string newUserNameCheck)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [UserName] = @newUserNameCheck";
                var parameters = new { newUserNameCheck };
                var userNamesComesBack = db.Query<User>(sql, parameters);
                if (userNamesComesBack.Count() != 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public bool EditUser(EditUserDto editedUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [User]
                            SET 
                                [UserName] = @userName,
                                [FirstName] = @firstName,
                                [LastName] = @lastName,
                                [BusinessName] = @businessName
                            WHERE [Id] = @id";
                return db.Execute(sql, editedUser) == 1;
            }
        }
        public bool AddNewUser(AddNewUserDto newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var userNameExists = UserNameCheck(newUser.UserName);
                if (userNameExists)
                {
                    return false;
                }
                var newAddress = new AddAddressDto();
                newAddress.AddressLine1 = newUser.AddressLine1;
                newAddress.AddressLine2 = newUser.AddressLine2;
                newAddress.City = newUser.City;
                newAddress.State = newUser.State;
                newAddress.ZipCode = newUser.ZipCode;
                newAddress.IsPreferred = true;
                var sql = @"
                            INSERT INTO [User]
                                ([IsSeller],
                                 [UserName],
                                 [FirstName],
                                 [LastName],
                                 [DateCreated],
                                 [FirebaseUid],
                                 [BusinessName])
                            OUTPUT INSERTED.Id
                            VALUES
                                (@isSeller,
                                 @userName,
                                 @firstName,
                                 @lastName,
                                 @dateCreated,
                                 @firebaseUid,
                                 @businessName)";
                var userId = db.QueryFirst<Guid>(sql, newUser);
                if (  userId != null)
                // This would be if there was no trouble creating the user
                {
                    newAddress.UserId = userId;
                    return _addressRepo.AddNewAddress(newAddress);
                }
                else
                // This would be if there WAS trouble creating the user
                {
                    return false;
                }
            }
        }

        public bool DeleteUser(Guid userId, bool isSeller)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                _addressRepo.DeleteUserAddresses(userId);
                _paymentTypeRepo.DeleteAllPaymentTypesByUserId(userId);
                if (isSeller)
                {
                    var productsToDelete = _productRepo.GetProductsByUid(userId);
                    foreach(Product product in productsToDelete)
                    {
                        _productRepo.DeleteProduct(product.Id);
                    }
                }
                var sql = @"UPDATE [User]
                            SET [FirstName] = 'DELETED',
                                [LastName] = 'DELETED'
                            WHERE Id = @userId";
                var parameters = new { userId };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public TopProduct GetTopProduct(Guid sellerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT TOP(1) p.Id as MostSoldProduct, sum(po.QuantityOrdered) as MostSoldAmount
                            FROM ProductOrder po
                            JOIN Product p
                            ON po.ProductId = p.Id
                            WHERE p.SellerId = @sellerId
                            GROUP BY p.Id
                            ORDER BY MostSoldAmount DESC";
                var parameters = new { sellerId };
                return db.QueryFirstOrDefault<TopProduct>(sql, parameters);
            }
        }

        public TopProduct GetTopProductForMonth(Guid sellerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT TOP(1) p.Id as MostSoldProduct, sum(po.QuantityOrdered) as MostSoldAmount
                            FROM ProductOrder po
                            JOIN Product p
                            ON po.ProductId = p.Id
                            WHERE p.SellerId = @sellerId AND MONTH(po.ShippedDate) = (MONTH(getDate()))
                            GROUP BY p.Id
                            ORDER BY MostSoldAmount DESC";
                var parameters = new { sellerId };
                return db.QueryFirstOrDefault<TopProduct>(sql, parameters);
            }
        }
        public string GetTotalSales(Guid sellerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT FORMAT( SUM(p.Price * po.QuantityOrdered)/100.00, 'C') as TotalSales
                            FROM ProductOrder po
                            JOIN Product p
                            ON po.ProductId = p.Id
                            WHERE p.SellerId = @sellerId
                            GROUP BY p.SellerId";
                var parameters = new { sellerId };
                return db.QueryFirstOrDefault<string>(sql, parameters);
            }
        }

        public string GetTotalSalesForTheMonth(Guid sellerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT FORMAT( SUM(p.Price * po.QuantityOrdered)/100.00, 'C') as TotalSales
                            FROM ProductOrder po
                            JOIN Product p
                            ON po.ProductId = p.Id
                            WHERE p.SellerId = @sellerId AND MONTH(po.ShippedDate) = (MONTH(getDate()))
                            GROUP BY p.SellerId";
                var parameters = new { sellerId };
                return db.QueryFirstOrDefault<string>(sql, parameters);
            }
        }
        public SellerStats GetSellerStats(Guid sellerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sellerStats = new SellerStats();

                var topProductInfo= GetTopProduct(sellerId);

                if (topProductInfo != null)
                {
                    var topProduct = _productRepo.GetProductById(topProductInfo.MostSoldProduct);
                    sellerStats.TopProduct = topProduct;
                    sellerStats.TopProductAmountSold = topProductInfo.MostSoldAmount;
                }

                var topMonthProductInfo = GetTopProductForMonth(sellerId);

                if (topMonthProductInfo != null)
                {
                    var topMonthProduct = _productRepo.GetProductById(topMonthProductInfo.MostSoldProduct);
                    sellerStats.TopMonthProduct = topMonthProduct;
                    sellerStats.TopMonthProductAmountSold = topMonthProductInfo.MostSoldAmount;
                }

                var totalSales = GetTotalSales(sellerId);
                var monthSales = GetTotalSalesForTheMonth(sellerId);
                sellerStats.TotalSales = totalSales;
                sellerStats.MonthSales = monthSales;

                return sellerStats;
            }
        }

        public bool AddProductOrder(AddProductOrderDTO NewProductOrder)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var OrderId = _orderRepo.FindCurrentOrder(NewProductOrder.UserId);
                var NewPO = new NewProductOrderDTO();
                NewPO.OrderId = OrderId;
                NewPO.ProductId = NewProductOrder.ProductId;
                NewPO.QuantityOrdered = NewProductOrder.QuantityOrdered;
                NewPO.isShipped = false;
                return _productOrderRepo.AddNewProductOrder(NewPO);
            }
        }
    }
}
