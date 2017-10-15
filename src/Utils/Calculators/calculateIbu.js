import assert from "assert";
import tinseth from "tinseth";

export default function calculateIbu(hops, boilSize, batchSize, postBoilGravity, maximumUtilizationValue) {
    function calculateIbuForAddition(
        postBoilGravity,
        boilSize,
        batchSize,
        alphaAcids,
        amount,
        time,
        isPellets,
        maximumUtilizationValue
    ) {
        let res = tinseth(
            postBoilGravity,
            boilSize,
            batchSize,
            alphaAcids,
            amount,
            time,
            maximumUtilizationValue
        );

        if (isPellets) {
            res = res * 1.1;
        }

        if (isNaN(res)) {
            return 0;
        }
        return res;
    }

    assert.ok(hops, "hops is required");
    assert.ok(postBoilGravity, "postBoilGravity is required");
    assert.ok(boilSize, "boilSize is required");
    assert.ok(batchSize, "batchSize is required");

    maximumUtilizationValue = maximumUtilizationValue || 4.15;

    return hops.reduce((sum, hop) => {
        if (hop.time === "DH") {
            return 0;
        }

        const isPellets = true;
        const ibuFromAddition = calculateIbuForAddition(
            postBoilGravity,
            boilSize,
            batchSize,
            hop.alpha_acids,
            hop.weight,
            hop.time,
            isPellets,
            maximumUtilizationValue
        )

        return sum += ibuFromAddition;
    }, 0);
}
