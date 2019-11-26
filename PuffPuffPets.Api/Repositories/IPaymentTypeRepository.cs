using PuffPuffPets.Api.DataModels;
using PuffPuffPets.Api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuffPuffPets.Api.Repositories
{
    public interface IPaymentTypeRepository
    {
        IEnumerable<PaymentType> GetAllPaymentTypes(Guid userId);
        PaymentType GetSinglePaymentType(Guid paymentTypeId);
        bool AddNewPaymentType(AddPaymentTypeDto newPaymentType);
        bool DeletePaymentType(Guid paymentTypeId);
    }
}
