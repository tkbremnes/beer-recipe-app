const isMetric = true;

export function getPrimingSugar(volume, volumesOfCo2, temperature) {
    if (!(volume && volumesOfCo2 && temperature)) {
        return;
    }

    const temperatureInFahrenheit = (temperature * (9/5)) + 32;
    const cFlat = 3.0378 - (0.050062 * temperatureInFahrenheit) + (0.00026555 * (temperatureInFahrenheit * temperatureInFahrenheit))

    const volumeInGallons = volume * 0.264172052;

    const res = (15.195 * volumeInGallons) * ( volumesOfCo2 - cFlat );

    if (isMetric) {
        return res;
    }

    // PS (grams) = 15.195 Vb ( CD - 3.0378 + .050062 * T - .00026555 * T * T ).
    // Vb is beer volume and CD is desired volumes of CO2. I don't know how this equation was derived (if someone knows, that would be great to see).

//        volumesOfCo2 = cFlat + ((0.5 * result) / volume);

    //volumesOfCo2 - cFlat = ((0.5 * result) / volume);
    //volume * (volumesOfCo2 - cFlat) = 0.5 * result;
    // return (volume * (volumesOfCo2 - cFlat)) * 2;
}

export default {
    getPrimingSugar
}
