using System;
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
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypeController : ControllerBase
    {
        private readonly ILogger<PaymentTypeController> _logger;
        private readonly IPaymentTypeRepository _repo;

        public PaymentTypeController(ILogger<PaymentTypeController> logger, IPaymentTypeRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<PaymentType> GetAll()
        {
            return _repo.GetAllPaymentTypes();
        }
    }
}