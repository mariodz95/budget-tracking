using System;

namespace BudgetTracker.Models
{
    public class BudgetViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Currency { get; set; }
        public Guid UserId { get; set; }
    }
}
