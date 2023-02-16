const { validateAbsolute } = require("../../validator");
const { routRelOne, routTestTwo } = require("./pathname");

describe("the absolute function test", () => {
  it("should be a function", () => {
    expect(typeof validateAbsolute).toBe("function");
  });
  it("should be a false", () => {
    expect(validateAbsolute(routRelOne)).toBeFalsy();
  });
  it("should be a true", () => {
    expect(validateAbsolute(routTestTwo)).toBeTruthy();
  });
});
