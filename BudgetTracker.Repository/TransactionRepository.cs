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
    public class TransactionRepository : ITransactionRepository
    {
        private ApplicationDbContext context;
        private IMapper mapper;

        public TransactionRepository(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }


        public async Task<ITransactionModel> CreateAsync(ITransactionModel transaction)
        {

            var newTransaction = mapper.Map<Transaction>(transaction);
            await context.Transactions.AddAsync(newTransaction);
            await context.SaveChangesAsync();
            return transaction;
        }

        public async Task<IEnumerable<ITransactionModel>> GetAllAsync(Guid budgetId, DateTime startDate, DateTime endDate, string search, string category)
        {
            IQueryable<Transaction> query = context.Transactions;

            if (search != "null" && search != null)
            {
                query = query.Where(t => t.Name.Contains(search));
            }

            if (category != "null" && category != null)
            {
                query = query.Where(t => t.Category == category);
            }

            var transactionList = await query.AsNoTracking()
                .Where(t => t.BudgetId == budgetId && t.DateCreated > startDate && t.DateCreated < endDate)
                 .OrderByDescending(t => t.DateCreated).ToListAsync();

            return mapper.Map<IEnumerable<ITransactionModel>>(transactionList);
        }
    }
}
