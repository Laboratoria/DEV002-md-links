const { statUnique } = require("../../validator");

describe("everything related to the statUnique function", () => {
  it("should return an object", () => {
    //cumpliendo con AAA, ésta primera parte es el Arrange
    const arrayObjects = [
      {
        href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
        status: 200,
        ok: "OK",
      },
      {
        href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro",
        status: 200,
        ok: "OK",
      },
      {
        href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
        status: 200,
        ok: "OK",
      },
    ];
    //Act: se ejecuta el código
    const result = statUnique(arrayObjects);
    //Assert:se comprueba el resultado de la ejecución
    expect(typeof result).toBe("object")
  });

  it("should return the length", () => {
    const arrayObjects = [
        {
          href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
          status: 200,
          ok: "OK",
        },
        {
          href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro",
          status: 200,
          ok: "OK",
        },
        {
          href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
          status: 200,
          ok: "OK",
        },
      ];
      const result = statUnique(arrayObjects);

      expect(result.totalFiles).toBe(3);
      expect(result.totalUnique).toBe(2);
  })

});
