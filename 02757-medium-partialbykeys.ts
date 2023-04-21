// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>
];

type Merge<T> = {
  [P in keyof T]: T[P];
};

// ============= Your Code Here =============
type PartialByKeys<T, K extends keyof T = keyof T> = Merge<Partial<Pick<T, K>> & Omit<T, K>>;
