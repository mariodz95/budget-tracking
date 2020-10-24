
export function currencies(){
    let currencies = require('currency-formatter/currencies');
    let currenciesList = [];

    currencies.forEach(function(element)
    {
        currenciesList.push({ label:element.code, value: element.code })
    })
    
    return currenciesList;
}

export function formatBudgetForSelect(data){
    let budgetOptions = [];

    data.forEach(function(element)
    {
        budgetOptions.push({ label:element.name, value: element.id })
    })
    
    return budgetOptions;
}