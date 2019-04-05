

export function formatMoney(pennies){
    pennies=parseFloat(pennies);

    if (isNaN(pennies)){
        return 'TBA';
    }else{
        return `$ ${(pennies/100).toFixed(2)}`;
    }
}