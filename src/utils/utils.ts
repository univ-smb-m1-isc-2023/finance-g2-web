// function that transforms a Date to string YYYY-MM-DD

export function dateToString(date: Date): string {
    return date.toISOString().split('T')[0];
}
