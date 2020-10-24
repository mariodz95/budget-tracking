using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BudgetTracker.Model.Common
{
    public interface IApplicationUser 
    {
        public List<IBudgetModel> Budgets { get; set; }
    }
}
