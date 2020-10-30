using AutoMapper;
using BudgetTracker.Model.Common;
using BudgetTracker.Models;
using BudgetTracker.Service.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BudgetTracker.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private IMapper mapper;
        private ITransactionService transactionService;

        public TransactionController(ILogger<TransactionController> logger, IMapper mapper, ITransactionService transactionService)
        {
            _logger = logger;
            this.mapper = mapper;
            this.transactionService = transactionService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] TransactionViewModel transactionViewModel)
        {
            ClaimsPrincipal currentUser = this.User;
            var userId = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            transactionViewModel.UserId = new Guid(userId);

            var transaction = mapper.Map<ITransactionModel>(transactionViewModel);
            var result = await transactionService.CreateAsync(transaction);
            return Ok(mapper.Map<TransactionViewModel>(result));
        }

        [HttpGet("getall/{budgetId}/{startDate}/{endDate}/{search?}/{category?}")]
        public async Task<IActionResult> GetTransactionList(Guid budgetId, DateTime startDate, DateTime endDate, string search = null, string category = null)
        {
            var result = await transactionService.GetAllAsync(budgetId, startDate, endDate, search, category);
            return Ok(mapper.Map<IEnumerable<TransactionViewModel>>(result));
        }

        [HttpGet("delete/{transactionId}")]
        public async Task<IActionResult> Delete(Guid transactionId)
        {
            var deletedTransaction = await transactionService.DeleteAsync(transactionId);
            return Ok(mapper.Map<TransactionViewModel>(deletedTransaction));
        }

        [HttpPut]
        public async Task<IActionResult> Update(TransactionViewModel transaction)
        {
            var mappedTransaction = mapper.Map<ITransactionModel>(transaction);
            var result = await transactionService.UpdateAsync(mappedTransaction);
            return Ok(mapper.Map<TransactionViewModel>(result));
        }
    }
}
