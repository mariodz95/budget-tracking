using System;
using System.Collections.Generic;

namespace DAL.Entities
{
    public class Budget : BaseEntity
    {
        public string Name { get; set; }
        public string Currency { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public List<Transaction> Transactions { get; set; }
    }
}
