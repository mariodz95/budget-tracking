﻿using System;

namespace DAL.Entities
{
    public class Transaction : BaseEntity
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public float Value { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid BudgetId { get; set; }
        public Budget Budget { get; set; }
    }
}
