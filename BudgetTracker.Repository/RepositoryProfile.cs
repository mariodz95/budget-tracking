using AutoMapper;
using BudgetTracker.Model.Common;
using DAL.Entities;

namespace BudgetTracker.Repository
{
    public class RepositoryProfile : Profile
    {
        public RepositoryProfile()
        {
            CreateMap<Budget, IBudgetModel>().ReverseMap();
        }
    }
}
