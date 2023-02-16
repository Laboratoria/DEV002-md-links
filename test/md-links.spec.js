const {
  routExist,
  validateAbsolute,
  converToAbsolute,
  isAdirectory,
} = require("../validator");
const routTestOne =
  "D:Backup ticket 3806EscritorioprogramaciónarchivosMD\rutauno.md";
const routTestTwo =
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/helloWorld.md";
const routRelOne = "JS/css.md";
const routRelTwo = "test/files/interna_one/holaDos.md";
const directoryS = "C:/Users/Usuario/Desktop/DEV002-md-links/test/files";
const directoryFalse = "C:/Users/Usuario/Desktop/Captura de pantalla 2023-02-14 194814.png";

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

describe("the converToabsolute function test", () => {
  it("should be a function", () => {
    expect(typeof converToAbsolute).toEqual("function");
  });
  it("should return an path absolute", () => {
    expect(converToAbsolute(routRelTwo)).toContain("C:\\Users\\Usuario\\Desktop\\DEV002-md-links\\test\\files\\interna_one\\holaDos.md");
  });
});

describe("should return an directory", () => {
  it("should be a function", () => {
    expect(typeof isAdirectory).toEqual("function");
  });
  it("should return true", () => {
    expect(isAdirectory(directoryS)).toBeTruthy();
  });
  it("should return false", () => {
    expect(isAdirectory(directoryFalse)).toBeFalsy();
  });
});

