using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Models
{
    public class Filters
    {
        public Guid BudgetId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Search { get; set; }
        public string Category { get; set; }

    }
}
