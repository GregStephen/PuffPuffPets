﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Repositories;

namespace PuffPuffPets.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductOrderController : ControllerBase
    {
        private readonly ILogger<ProductOrderController> _logger;
        private readonly IProductOrderRepository _repo;

        public ProductOrderController(ILogger<ProductOrderController> logger, IProductOrderRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<ProductOrder> GetAll()
        {
            return _repo.GetAllProductOrders();
        }

        [HttpGet("{productOrderId}")]
        public ProductOrder GetProductOrderById(Guid orderId)
        {
            return _repo.GetProductOrderById(orderId);
        }

        [HttpGet("user/{userId}")]
        public IEnumerable<ProductOrder> GetByUserId(Guid userId)
        {
            return _repo.GetOrdersByUserId(userId).Where(productOrder => productOrder.UserId == userId);
        }

        [HttpPost]
        public void Add(ProductOrder newProductOrder)
        {
            _repo.AddNewProductOrder(newProductOrder);
        }

        [HttpDelete("delete/{productOrderIdToDelete}")]
        public void Delete(Guid productOrderIdToDelete)
        {
            _repo.DeleteProductOrder(productOrderIdToDelete);
        }
    }
}
