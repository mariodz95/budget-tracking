using System;

namespace BudgetTracker.Model.Common
{
    public interface IBudgetModel : IBaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Currency { get; set; }
        public float Value { get; set; }
        public Guid UserId { get; set; }
        public IApplicationUser User { get; set; }
    }
}
