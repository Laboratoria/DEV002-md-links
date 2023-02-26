const { returnBrokenLinks } = require("../../validator");

const { linksBrokenGoodAndrepeat } = require("./pathname");

describe("everything related to the statUnique function", () => {
  it("should be a function", () => {
    expect(typeof returnBrokenLinks).toBe("function");
  });

  it("should return an object", () => {
    const arrayObjects = [
      {
        file: "",
        href: "https://exampleBroke.com",
        text: "Intro a CSS",
        status: 404,
        ok: "fail",
      },
    ];

    const returnObjetc = returnBrokenLinks(arrayObjects);

    expect(typeof returnObjetc).toEqual("object");
  });

  it("should return the length of broken", () => {
    const resulBroken = returnBrokenLinks(linksBrokenGoodAndrepeat).broken;
    expect(resulBroken).toStrictEqual(2);
  });
});
