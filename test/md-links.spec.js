const { routExist } = require("../validator");
const routTestOne =
  "D:Backup ticket 3806EscritorioprogramaciónarchivosMD\rutauno.md";
const routTestTwo =
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/helloWorld.md";

describe("function test routExist", () => {
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
