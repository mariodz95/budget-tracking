using BudgetTracker.Model.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetTracker.Repository.Common
{
    public interface ITransactionRepository
    {
        Task<ITransactionModel> CreateAsync(ITransactionModel transaction);
        Task<IEnumerable<ITransactionModel>> GetAllAsync(Guid budgetID, DateTime startDate, DateTime endDate, string search, string category);
        Task<ITransactionModel> DeleteAsync(Guid transactionId);
    }
}
