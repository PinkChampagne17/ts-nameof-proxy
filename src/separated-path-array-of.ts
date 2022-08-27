import { CallBackForPropertyAccess } from "./types";

/**
 * @example
 * separatedPathArrayOf(student, (s) => [s.age, s.name.length]);  // [["age"], ["name", "length"]]
 * separatedPathArrayOf(student, (s) => (s.age, s.name.length));  // [["age"], ["name", "length"]]
 * separatedPathArrayOf(student, (s) => [, s.age, ,]);            // [[], ["age"], []]
 * separatedPathArrayOf(student, (s) => [, s.age, ,]);            // [["age"]]
 * separatedPathArrayOf<Student>((s) => [s.age, s.name.length]);  // [["age"], ["name", "length"]]
 */
export function separatedPathArrayOf<T>(
  callback: CallBackForPropertyAccess<T>
): string[][];
export function separatedPathArrayOf<T>(
  obj: T,
  callback?: CallBackForPropertyAccess<T>
): string[][];

export function separatedPathArrayOf<T>(
  arg1: T | CallBackForPropertyAccess<T>,
  arg2?: CallBackForPropertyAccess<T>
): string[][] {
  const paths: string[][] = [];

  const generateHandler = (isFirst: boolean): ProxyHandler<Object> => {
    return {
      get(_target, property, receiver) {
        if (typeof property === "symbol") {
          throw new Error(
            `ts-nameof-proxy: The path cannot contain ${property.toString()}.`
          );
        }
        if (isFirst) {
          paths.push([property]);
          return new Proxy({}, generateHandler(false));
        } else {
          paths[paths.length - 1].push(property);
          return receiver;
        }
      },
    };
  };

  const proxy = new Proxy({}, generateHandler(true));
  const callback = (
    typeof arg2 === "function" ? arg2 : arg1
  ) as CallBackForPropertyAccess<T>;

  const result = callback(proxy as T);

  if (Array.isArray(result)) {
    return new Array(result.length).fill(0).map((_, index) => {
      const element = result[index];
      return [undefined, null].includes(element) ? [] : paths.shift() ?? [];
    });
  }

  return paths;
}
