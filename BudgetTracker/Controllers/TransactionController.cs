using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BudgetTracker.Model.Common;
using BudgetTracker.Models;
using BudgetTracker.Service.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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

        [HttpGet("getall/{budgetId}")]
        public async Task<IActionResult> GetTransactionList(Guid budgetId)
        {
            var result = await transactionService.GetAllAsync(budgetId);
            return Ok(mapper.Map<IEnumerable<TransactionViewModel>>(result));
        }
    }
}
