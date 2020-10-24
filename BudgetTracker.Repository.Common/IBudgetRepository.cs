﻿using BudgetTracker.Model.Common;
using DAL.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetTracker.Repository.Common
{
    public interface IBudgetRepository
    {
        Task<IBudgetModel> CreateAsync(IBudgetModel budget);
        Task<IEnumerable<IBudgetModel>> GetBudgetListAsync(Guid userId);
    }
}
