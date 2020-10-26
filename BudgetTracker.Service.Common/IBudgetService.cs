using BudgetTracker.Model.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetTracker.Service.Common
{
    public interface IBudgetService
    {
        Task<IBudgetModel> CreateAsync(IBudgetModel budget);
        Task<IEnumerable<IBudgetModel>> GetBudgetListAsync(Guid userId);
    }
}
