﻿using BudgetTracker.Model.Common;
using System;

namespace BudgetTracker.Model
{
    public class BudgetModel : BaseModel, IBudgetModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Currency { get; set; }
        public float Value { get; set; }
        public Guid UserId { get; set; }
        public IApplicationUser User { get; set; }
    }
}
