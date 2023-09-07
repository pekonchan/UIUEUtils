export function getDateDiff (date1: number, date2: number) {
    const begin = new Date(date1).getTime();
    const end = new Date(date2).getTime();
    return Math.ceil(Math.abs(begin - end) / 1000 / 3600 / 24);
}