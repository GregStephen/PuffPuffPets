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
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IOrderRepository _repo;

        public OrderController(ILogger<OrderController> logger, IOrderRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<Order> GetAll()
        {
            return _repo.GetAllOrders();
        }

        [HttpGet("{orderId}")]
        public Order GetOrderById(Guid orderId)
        {
            return _repo.GetOrderById(orderId);
        }

        [HttpGet("customerOrderHistory/{customerId}")]
        public IEnumerable<CustomerOrderHistoryDto> GetByUserId(Guid customerId)
        {
            return _repo.GetOrderHistoryByCustomerId(customerId);
        }

        [HttpGet("sellerOrders/{SellerId}/{booleanValue}")]
        public IEnumerable<UnshippedOrShippedProductDto> GetUnshippedProductsBySellerId(Guid SellerId, int booleanValue)
        {
            return _repo.GetUnshippedProductsOrOrderHistoryBySellerId(SellerId, booleanValue);
        }

        [HttpPost]
        public void Add(Order newOrder)
        {
            _repo.AddNewOrder(newOrder);
        }

        [HttpDelete("delete/{orderIdToDelete}")]
        public void Delete(Guid orderIdToDelete)
        {
            _repo.DeleteOrder(orderIdToDelete);
        }

        [HttpPut("edit/{orderIdToEdit}")]
        public IActionResult EditOrder(Order editedOrder)
        {

            if (_repo.EditOrder(editedOrder))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
