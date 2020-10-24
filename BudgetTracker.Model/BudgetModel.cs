using BudgetTracker.Model.Common;
using System;

namespace BudgetTracker.Model
{
    public class BudgetModel : IBudgetModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Currency { get; set; }
        public float Value { get; set; }
        public Guid UserId { get; set; }
        public IApplicationUser User { get; set; }
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
