const { routExist } = require("../../validator");
const { routTestOne, routTestTwo } = require ("./pathname");


describe("the routExit function test", () => {
  it("should be a function", () => {
    expect(typeof routExist).toBe("function");
  });
  it("should be a false", () => {
    expect(routExist(routTestOne)).toBeFalsy();
  });
  it("should be a true", () => {
    expect(routExist(routTestTwo)).toBeTruthy();
  });
});
