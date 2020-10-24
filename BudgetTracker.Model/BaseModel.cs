using BudgetTracker.Model.Common;
using System;

namespace BudgetTracker.Model
{
    public class BaseModel : IBaseModel
    {
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
