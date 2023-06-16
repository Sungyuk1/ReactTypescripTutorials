//Giving it undefined means it will change the format depending on where you live. So for example
//if you live in Spain the numbers might look a little different

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency:"USD",
    style: "currency"
}) 

//number: number - means this function takes in a parameter called number that is of type number
export function formatCurrency(number: number){
    return CURRENCY_FORMATTER.format(number)

}