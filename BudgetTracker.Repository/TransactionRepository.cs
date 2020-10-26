using AutoMapper;
using BudgetTracker.Data;
using BudgetTracker.Model.Common;
using BudgetTracker.Repository.Common;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
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

        public async Task<IEnumerable<ITransactionModel>> GetAllAsync(Guid budgetID)
        {
           var transactionList = await context.Transactions.Where(t => t.BudgetId == budgetID).ToListAsync();
            return mapper.Map<IEnumerable<ITransactionModel>>(transactionList);
        }
    }
}
