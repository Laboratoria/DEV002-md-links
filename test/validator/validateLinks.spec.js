const axios = require("axios");
const { validateLinks } = require("../../validator");

jest.mock("axios");
beforeEach(() => {
  jest.resetAllMocks();
});
describe("everything related to the validateLinks function", () => {
  it("sould return an array of the objects", () => {
    const firsObject = {
      href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
    };
    const secondObject = {
      href: "https://i.postimg.cc/python.jpg",
    };
    const containerArrayObjects = [firsObject, secondObject];

    const objectResponseOne = { ...firsObject, status: 200, ok: "OK" };
    const objectResponseTwo = { ...secondObject, status: 404, ok: "fail" };

    axios.get
      .mockResolvedValueOnce({ data: {...objectResponseOne} })
      .mockRejectedValueOnce({ response: { status: 404 } });

    validateLinks(containerArrayObjects).then((data) => {
      expect(data).toHaveLength(2);

      console.log(data);
    });
  });
});
