using System;

namespace BudgetTracker.Model.Common
{
    public interface IBaseModel
    {
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
