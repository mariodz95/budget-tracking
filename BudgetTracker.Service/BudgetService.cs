using AutoMapper;
using BudgetTracker.Model.Common;
using BudgetTracker.Repository.Common;
using BudgetTracker.Service.Common;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetTracker.Service
{
    public class BudgetService : IBudgetService
    {
        private IBudgetRepository budgetRepository;
        private IMapper mapper;

        public BudgetService(IBudgetRepository budgetRepository, IMapper mapper)
        {
            this.budgetRepository = budgetRepository;
            this.mapper = mapper;
        }

        public async Task<IBudgetModel> CreateAsync(IBudgetModel budget)
        {
            budget.DateCreated = DateTime.Now;
            budget.DateUpdated = DateTime.Now;
            budget.Id = Guid.NewGuid();
            return await budgetRepository.CreateAsync(budget);
        }

        public async Task<IEnumerable<IBudgetModel>> GetBudgetListAsync(Guid userId)
        {
            return await budgetRepository.GetBudgetListAsync(userId);
        }
    }
}
