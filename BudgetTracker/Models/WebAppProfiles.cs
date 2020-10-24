using AutoMapper;
using BudgetTracker.Model.Common;

namespace BudgetTracker.Models
{
    public class WebAppProfiles : Profile
    {
        public WebAppProfiles()
        {
            CreateMap<IBudgetModel, BudgetViewModel>().ReverseMap();
        }
    }
}
