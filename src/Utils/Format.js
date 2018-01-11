export function formatPercent(number, precision) {
    if (!number) {
        return "0%";
    }

    return `${(number * 100).toPrecision(precision || 2)}%`;
}

export function formatSpecificGravity(floatingPointNumber) {
    return floatingPointNumber.toPrecision(4);
}
