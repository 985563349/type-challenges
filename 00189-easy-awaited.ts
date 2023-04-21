// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

type Thenable<T> = { then: (onfulfilled: (arg: T) => any) => any };

// ============= Your Code Here =============
type MyAwaited<T extends Promise<any> | Thenable<any>> = T extends Promise<infer Value>
  ? Value extends Promise<any>
    ? MyAwaited<Value>
    : Value
  : T extends Thenable<infer Arg>
  ? Arg
  : never;

type R = MyAwaited<T>;
