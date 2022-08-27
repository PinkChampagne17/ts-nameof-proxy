import { separatedPathArrayOf } from "./separated-path-array-of";
import { CallBackForPropertyAccess } from "./types";

/**
 * @example
 * separatedPathOf(student, (s) => s.age);          // ["age"]
 * separatedPathOf(student, (s) => s.name.length);  // ["name", "length"]
 * separatedPathOf<Student>((s) => s.name.length);  // ["name", "length"]
 */
export function separatedPathOf<T>(
  callback: CallBackForPropertyAccess<T>
): string[];
export function separatedPathOf<T>(
  obj: T,
  callback?: CallBackForPropertyAccess<T>
): string[];

export function separatedPathOf<T>(
  arg1: T | CallBackForPropertyAccess<T>,
  arg2?: CallBackForPropertyAccess<T>
): string[] {
  return separatedPathArrayOf(arg1, arg2)[0] ?? [];
}
