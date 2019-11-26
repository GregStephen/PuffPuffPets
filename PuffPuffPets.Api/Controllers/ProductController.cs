﻿using System;
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
    public class ProductController : Controller

    {
        private readonly ILogger<ProductController> _logger;
        private readonly ProductRepository _repo;

        public ProductController(ILogger<ProductController> logger, ProductRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }


        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            return _repo.GetAllProducts();
        }

        // GET api/<controller>/5
        [HttpGet("{ProductId}")]
        public Product GetProduct(Guid ProductId)
        {
            return _repo.GetProductById(ProductId);
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

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult EditProduct(Guid ProductId)
        {
            _repo.EditProduct(ProductId);
            return Ok();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(Guid ProductId)
        {
            _repo.DeleteProduct(ProductId);
            return Ok();
        }
    }
}