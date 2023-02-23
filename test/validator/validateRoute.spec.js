const { validateRoute } = require("../../validator");

const { manyFiles, returnOfValidateRoute, returnFail } = require("./pathname");

describe("Everything related to the readFolder fuction", () => {
  it("sould return a promise", () => {
    validateRoute(manyFiles).then((data) => {
      expect(data).toStrictEqual(returnOfValidateRoute);
    });
  });
  it("if it returns an error", () => {
    validateRoute(returnFail).catch((error) => {
      expect(error).rejects.toThrowError();
    });
  });
});
