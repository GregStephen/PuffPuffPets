using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Dtos;
using PuffPuffPets.Api.Repositories;


namespace PuffPuffPets.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller

    {
        private readonly ILogger<ProductController> _logger;
        private readonly IProductRepository _repo;

        public ProductController(ILogger<ProductController> logger, IProductRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }


        // GET: api/<controller>
        [HttpGet]
        public AllProductsReturn GetAll()
        {
            return _repo.GetAllProducts();
        }

        // GET api/<controller>/5
        [HttpGet("{ProductId}")]
        public Product GetProduct(Guid ProductId)
        {
            return _repo.GetProductById(ProductId);
        }

        [HttpGet("user/{Uid}")]
        public IEnumerable<Product> GetProductByUid(Guid Uid)
        {
            return _repo.GetProductsByUid(Uid);
        }

        [HttpGet("search/q={term}/categories")]
        public SearchReturn GetAllSearchedProducts(string term, [FromQuery(Name="cat")]string[] searchCategories)
        {
            return _repo.SearchThruProducts(term, searchCategories);
        }

        [HttpGet("category/{categoryId}")]
        public IEnumerable<Product> GetAllProductsInCategory(Guid categoryId)
        {
            return _repo.GetAllProductsByCategory(categoryId);
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult AddProduct(AddProductDto newProduct)
        {
            if (_repo.AddNewProduct(newProduct))
            {
                return Created($"ProductId/{newProduct.Title}", newProduct);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public IActionResult EditTheProduct(EditProductDto editedProduct, Guid id)
        {
            _repo.EditProduct(editedProduct, id);
            return Ok();
        }

        // PUT api/<controller>/5
        [HttpPut("quantityInStock/{id}")]
        public IActionResult EditProduct(EditProductDto editedProduct, Guid id)
        {
            _repo.EditProduct(editedProduct, id);
            return Ok();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{productId}")]
        public IActionResult DeleteProduct(Guid productId)
        {
            _repo.DeleteProduct(productId);
            return Ok();
        }
    }
}