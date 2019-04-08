

export function formatMoney(pennies){
    pennies=parseFloat(pennies);

    if (isNaN(pennies)){
        return 'TBA';
    }else{
        return `$ ${(pennies/100).toFixed(2)}`;
    }
}

export function toWords(name){
    let result = name.replace(/[A-Z]/g,function(letter){
        return ` ${letter}`
    })
    result = result[0].toUpperCase()+result.slice(1);
    return result;
}