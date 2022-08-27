import { separatedPathArrayOf } from "../src/separated-path-array-of";
import { student } from "./fixtures";

describe("separatedPathArrayOf", () => {
  test("Do not use type parameter", () => {
    const paths = separatedPathArrayOf(student, (s) => (s.age, s.name.length));
    expect(paths).toStrictEqual([["age"], ["name", "length"]]);
  });

  test("Use type parameter", () => {
    const paths = separatedPathArrayOf<typeof student>(
      (s) => (s.age, s.name.length)
    );
    expect(paths).toStrictEqual([["age"], ["name", "length"]]);
  });

  test("Get the path of the function", () => {
    const paths = separatedPathArrayOf(
      () => {},
      (fn) => fn.call
    );
    expect(paths).toStrictEqual([["call"]]);
  });

  test("Do nothing", () => {
    const paths = separatedPathArrayOf(student, () => {});
    expect(paths).toStrictEqual([]);
  });

  test("Return a array contains empty", () => {
    const paths = separatedPathArrayOf(student, (s) => [
      ,
      s.age,
      ,
      s.name.length,
    ]);
    expect(paths).toStrictEqual([[], ["age"], [], ["name", "length"]]);
  });
});
