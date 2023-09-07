export function formatMoney (
    value: number|string,
    places: number,
    symbol: string,
    thousand: string,
    decimal: string
) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : '￥';
    thousand = thousand || ',';
    decimal = decimal || '.';
    const negative = +value < 0 ? '-' : '';
    const i = parseInt(value = Math.abs(+value || 0).toFixed(places), 10) + '';
    const j = i.length > 3 ? i.length % 3 : 0;
    return symbol + ' ' + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(+value - i).toFixed(places).slice(2) : '');
};