import authService from './../components/api-authorization/AuthorizeService';


export const budgetService = {
    create,
    getAll,
  };

async function create(budget){
    const token = await authService.getAccessToken();
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`   },
        body: JSON.stringify(budget),
    };
    const response = await fetch(`budget/create`, requestOptions);
    const data = await response.json();
    return data;
}

async function getAll(){
  const token = await authService.getAccessToken();
  const requestOptions = {
      headers: { "Content-Type": "application/json",'Authorization': `Bearer ${token}`   },
  };
  const response = await fetch(`budget`, requestOptions);
  const data = await response.json();
  return data;
}

