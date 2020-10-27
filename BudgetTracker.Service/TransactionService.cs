using AutoMapper;
using BudgetTracker.Model.Common;
using BudgetTracker.Repository.Common;
using BudgetTracker.Service.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetTracker.Service
{
    public class TransactionService : ITransactionService
    {
        private ITransactionRepository transactionRepository;
        private IMapper mapper;

        public TransactionService(ITransactionRepository transactionRepository, IMapper mapper)
        {
            this.transactionRepository = transactionRepository;
            this.mapper = mapper;
        }

        public async Task<ITransactionModel> CreateAsync(ITransactionModel transaction)
        {
            transaction.DateCreated = DateTime.Now;
            transaction.DateUpdated = DateTime.Now;
            transaction.Id = Guid.NewGuid();
            return await transactionRepository.CreateAsync(transaction);
        }

        public async Task<IEnumerable<ITransactionModel>> GetAllAsync(Guid budgetId, DateTime startDate, DateTime endDate, string search, string category)
        {
            return await transactionRepository.GetAllAsync(budgetId, startDate, endDate, search, category);
        }
    }
}
