using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DAL.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public List<Budget> Budgets { get; set; }
        public List<Transaction> Transactions { get; set; }
    }
}
