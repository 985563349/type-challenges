// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
];

// ============= Your Code Here =============

// type LengthOfString<
//   S extends string,
//   Result extends any[] = []
// > = S extends `${infer First}${infer Rest}`
//   ? LengthOfString<Rest, [...Result, First]>
//   : Result['length'];

type ToArray<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...ToArray<Rest>]
  : [];

type LengthOfString<S extends string> = ToArray<S>['length'];
