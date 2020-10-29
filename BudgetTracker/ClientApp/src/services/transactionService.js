import authService from './../components/api-authorization/AuthorizeService';


export const transactionService = {
    create,
    getAll,
  };

async function create(transaction){
    const token = await authService.getAccessToken();
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(transaction),
    };
    const response = await fetch(`transaction/create`, requestOptions);
    const data = await response.json();
    return data;
}

async function getAll(budgetId, startDate, endDate, search, category){
    const token = await authService.getAccessToken();
    const requestOptions = {
        headers: { "Content-Type": "application/json",'Authorization': `Bearer ${token}`},
    };
    const response = await fetch(`transaction/getall/${budgetId}/${startDate.toISOString()}/${endDate.toISOString()}/${search}/${category}`, requestOptions);
    const data = await response.json();
    return data;
  }
  
  