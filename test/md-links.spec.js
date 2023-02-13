const { routExist, validateAbsolute } = require("../validator");
const routTestOne =
  "D:Backup ticket 3806EscritorioprogramaciónarchivosMD\rutauno.md";
const routTestTwo =
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/helloWorld.md";
const routRelOne = "JS/css.md";

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
