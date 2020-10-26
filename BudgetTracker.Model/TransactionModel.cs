using BudgetTracker.Model.Common;
using System;

namespace BudgetTracker.Model
{
    public class TransactionModel : BaseModel, ITransactionModel
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public float Value { get; set; }
        public Guid UserId { get; set; }
        public IApplicationUser User { get; set; }
        public Guid BudgetId { get; set; }
        public IBudgetModel Budget { get; set; }
    }
}
