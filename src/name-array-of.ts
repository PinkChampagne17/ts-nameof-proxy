import { separatedPathArrayOf } from "./separated-path-array-of";
import { CallBackForPropertyAccess } from "./types";

/**
 * @example
 * nameArrayOf(student, (s) => [s.age, s.name.length]);  // ["age", "length"]
 * nameArrayOf(student, (s) => (s.age, s.name.length));  // ["age", "length"]
 * nameArrayOf<Student>((s) => [s.age, s.name.length]);  // ["age", "length"]
 */
export function nameArrayOf<T>(
  callback: CallBackForPropertyAccess<T>
): string[];
export function nameArrayOf<T>(
  obj: T,
  callback: CallBackForPropertyAccess<T>
): string[];

export function nameArrayOf<T>(
  arg1: T | CallBackForPropertyAccess<T>,
  arg2?: CallBackForPropertyAccess<T>
): string[] {
  const separatedPaths = separatedPathArrayOf(arg1, arg2);
  if (separatedPaths.length === 0) {
    throw new Error("ts-nameArrayOf-proxy: No properties were read.");
  }
  return separatedPaths.map((path) => path[path.length - 1]);
}
