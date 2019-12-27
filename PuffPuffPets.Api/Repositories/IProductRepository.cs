using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Repositories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAllProducts();

        Product GetProductById(Guid productId);

        bool AddNewProduct(AddProductDto newProduct);

        bool EditProduct(EditProductDto updatedProduct, Guid id);

        public bool DeleteProduct(Guid productId);

        public SearchReturn SearchThruProducts(string term, string[] searchCategories);

        public IEnumerable<Product> GetAllProductsByCategory(Guid categoryId);
        IEnumerable<Product> GetProductsByUid(Guid Uid);
    }


}
       