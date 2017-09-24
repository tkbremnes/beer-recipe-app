import calculateColor from "./calculateColor";

describe("Utils/Calculators/calculateColor", () => {
    it("should return the correct result", () => {
        const fermentables = [
            {
                weight: 4000,
                color: 6,
            },
            {
                weight: 2000,
                color: 60,
            }
        ];
        const volume = 51;

        expect(calculateColor(fermentables, volume)).toBeCloseTo(8.17, 1);
    });
});
