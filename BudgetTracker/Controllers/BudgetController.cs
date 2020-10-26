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

namespace BudgetTracker.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class BudgetController : ControllerBase
    {
        private readonly ILogger<BudgetController> _logger;
        private IMapper mapper;
        private IBudgetService budgetService;

        public BudgetController(ILogger<BudgetController> logger, IMapper mapper, IBudgetService budgetService)
        {
            _logger = logger;
            this.mapper = mapper;
            this.budgetService = budgetService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] BudgetViewModel budgetViewModel)
        {
            ClaimsPrincipal currentUser = this.User;
            var userId = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            budgetViewModel.UserId = new Guid(userId);

            var budget = mapper.Map<IBudgetModel>(budgetViewModel);
            var result = await budgetService.CreateAsync(budget);
            return Ok(mapper.Map<BudgetViewModel>(result));
        }

        [HttpGet]
        public async Task<IActionResult> GetBudgetList()
        {
            ClaimsPrincipal currentUser = this.User;
            var userId = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            var result = await budgetService.GetBudgetListAsync(new Guid(userId));
            return Ok(mapper.Map<IEnumerable<BudgetViewModel>>(result));
        }
    }
}
