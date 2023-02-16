const {
    isAdirectory,
  } = require("../../validator");
  
const {
    directoryS,
    directoryFalse,
} = require("./pathname");
  
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
  