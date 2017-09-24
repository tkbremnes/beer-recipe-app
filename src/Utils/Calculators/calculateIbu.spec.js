import calculateIbu from "./calculateIbu";

describe("Utils/Calculators/calculateIbu", () => {
    it("should return the correct result (1)", () => {
        const hops = [
            {
                weight: 50,
                alpha_acids: 0.06,
                time: 60,
            },
            {
                weight: 60,
                alpha_acids: 0.14,
                time: 15,
            }
        ];
        const boilSize = 25;
        const batchSize = 20;
        const gravity = 1.046;

        expect(calculateIbu(hops, boilSize, batchSize, gravity)).toBeCloseTo(102, 0);
    });

    it("should return the correct result (2)", () => {
        const hops = [
            {
                weight: 30,
                alpha_acids: 0.03,
                time: 60,
            },
            {
                weight: 30,
                alpha_acids: 0.04,
                time: 60,
            }
        ];
        const boilSize = 25;
        const batchSize = 20;
        const gravity = 1.046;

        expect(calculateIbu(hops, boilSize, batchSize, gravity)).toBeCloseTo(30, 0);
    });
});
