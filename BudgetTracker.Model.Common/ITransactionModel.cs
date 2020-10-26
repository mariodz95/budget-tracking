using System;
using System.Collections.Generic;
using System.Text;

namespace BudgetTracker.Model.Common
{
    public interface ITransactionModel : IBaseModel
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
