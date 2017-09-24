import assert from "assert";

export default function (batchSize, boilTime, evaporationRate) {
    assert.ok(batchSize, "batchSize is required");
    assert.ok(boilTime, "boilTime is required");
    assert.ok(evaporationRate, "evaporationRate is required");

    const MINUTES_IN_HOUR = 60;

    const whole = boilTime / MINUTES_IN_HOUR;
    const rest = (boilTime%MINUTES_IN_HOUR)/MINUTES_IN_HOUR;

    return batchSize +
        (evaporationRate*whole) +(evaporationRate*rest);
}
