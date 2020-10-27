using System;

namespace BudgetTracker.Models
{
    public class TransactionViewModel
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public float Value { get; set; }
        public Guid UserId { get; set; }
        public Guid BudgetId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
