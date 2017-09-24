import calculateBoilSize from "./calculateBoilSize";

describe("Utils/Calculators/calculateBoilSize", () => {
    it("should return the correct result (1)", () => {
        const batchSize = 20;
        const boilTime = 60;
        const evaporationRate = 4;

        expect(calculateBoilSize(batchSize, boilTime, evaporationRate)).toEqual(24, 0);
    });

    it("should return the correct result (2)", () => {
        const batchSize = 20;
        const boilTime = 60;
        const evaporationRate = 5;

        expect(calculateBoilSize(batchSize, boilTime, evaporationRate)).toEqual(25, 0);
    });

    it("should return the correct result (3)", () => {
        const batchSize = 20;
        const boilTime = 90;
        const evaporationRate = 4;

        expect(calculateBoilSize(batchSize, boilTime, evaporationRate)).toEqual(26, 0);
    });

    it("should return the correct result (4)", () => {
        const batchSize = 25;
        const boilTime = 75;
        const evaporationRate = 4;

        expect(calculateBoilSize(batchSize, boilTime, evaporationRate)).toEqual(30, 0);
    });
});
