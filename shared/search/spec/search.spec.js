let sort = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

let midSearchTime = [];
let linearSearchTime = [];
let rval = Math.floor(Math.random() * 101);

describe("midpoint search", function() {
    it("finds a random value in a sorted array", function() {
        let result = search(rval, sort);
        midSearchTime.push(result[1]);
        expect(result[0]).toEqual(rval);
    });
    it("finds the last value in a sorted array", function() {
        let result = search(100, sort);
        midSearchTime.push(result[1]);
        expect(result[0]).toEqual(100);
    });
    it("finds the first value in a sorted array", function() {
        let result = search(0, sort);
        midSearchTime.push(result[1]);
        expect(result[0]).toEqual(0);
    });
});
describe("linear search", function() {
    it("finds a random value in a sorted array", function() {
        console.log("");
        let result = linearSearch(rval, sort);
        linearSearchTime.push(result);
        expect(result).toEqual(rval);
    });
    it("finds the last value in a sorted array", function() {
        let result = linearSearch(100, sort);
        linearSearchTime.push(result);
        expect(result).toEqual(100);
    });
    it("finds the first value in a sorted array", function() {
        let result = linearSearch(0, sort);
        linearSearchTime.push(result);
        expect(result).toEqual(0);
    });
});
describe("midpoint search is (almost always) faster than linear search", function() {
    it("when finding a random value", function() {
        expect(midSearchTime[0]).toBeLessThanOrEqual(linearSearchTime[0]);
    });
    it("when finding the last value", function() {
        expect(midSearchTime[1]).toBeLessThanOrEqual(linearSearchTime[1]);
    });
    it("but NEVER when finding the first value", function() {
        expect(midSearchTime[2]).toBeGreaterThan(linearSearchTime[2]);
    });
});
describe("Check the console for exact comparisons",function() {});