import calculatePreboilGravity from "./calculatePreboilGravity";

describe("calculatePreboilGravity", () => {
    it("should", () => {
        const expected = 1.043;

        const actual = calculatePreboilGravity(24, 20, 1.051);

        expect(actual).toEqual(expected);
    });
});
