const { mdLink } = require("../index");

describe("mdLink", () => {
  it("sould return a promise", () => {
    let result = mdLink()
    expect(result instanceof Promise).toBeTruthy();
  });
});
