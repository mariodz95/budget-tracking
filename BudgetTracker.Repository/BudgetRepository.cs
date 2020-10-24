using AutoMapper;
using BudgetTracker.Data;
using BudgetTracker.Model.Common;
using BudgetTracker.Repository.Common;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Repository
{
    public class BudgetRepository : IBudgetRepository
    {
        private ApplicationDbContext context;
        private IMapper mapper;

        public BudgetRepository(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<IBudgetModel> CreateAsync(IBudgetModel budget)
        {
            var newBudget = mapper.Map<Budget>(budget);
            await context.Budgets.AddAsync(newBudget);
            await context.SaveChangesAsync();
            return budget;
        }

        public async Task<IEnumerable<IBudgetModel>> GetBudgetListAsync(Guid userId)
        {
            var budgetList = await context.Budgets.Where(b => b.UserId == userId).ToListAsync();
            return mapper.Map<IEnumerable<IBudgetModel>>(budgetList);
        }
    }
}
