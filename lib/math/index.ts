/**
 * Specifies how many decimal points to keep for rounding
 * @param value 
 * @param decimal 
 * @returns string
 */
export function decimalRound (value: number|string, decimal = 2) {
    value = +value
    const powNum = Math.pow(10, decimal);
    return (Math.round(value * powNum) / powNum).toFixed(decimal);
}
