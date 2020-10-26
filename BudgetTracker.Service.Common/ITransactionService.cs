using BudgetTracker.Model.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetTracker.Service.Common
{
    public interface ITransactionService
    {
        Task<ITransactionModel> CreateAsync(ITransactionModel transaction);
        Task<IEnumerable<ITransactionModel>> GetAllAsync(Guid budgetId);
    }
}
