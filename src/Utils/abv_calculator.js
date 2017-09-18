function calculateAbw(originalGravity, measuredGravity) {
    // TODO
    const res = (76.08 * (originalGravity-measuredGravity) / (1.775-originalGravity)) * (measuredGravity / 0.794);
    return res / 100;
}

export function calculateAbv(originalGravity, measuredGravity) {
    if (measuredGravity > originalGravity) {
        return null;
    }

    // TODO: modularize, npm-ize and error handlize

    // SG = 1+ (plato / (258.6 – ( (plato/258.2) *227.1) ) )
    // plato = (-1 * 616.868) + (1111.14 * sg) – (630.272 * sg^2) + (135.997 * sg^3)

    const res = (76.08 * (originalGravity-measuredGravity) / (1.775-originalGravity)) * (measuredGravity / 0.794);
    return res / 100;
}

export default {
    getAbv: calculateAbv,
    getAbw: calculateAbw,
    getAlcohol: (originalGravity, measuredGravity) => {
        return {
            abv: calculateAbv(originalGravity, measuredGravity) || 0,
            abw: calculateAbw(originalGravity, measuredGravity) || 0
        }
    }
}
