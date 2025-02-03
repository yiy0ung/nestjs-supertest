/* Union Type */
type ValueType = string | number | boolean;
export type Union<T extends { [key: string]: ValueType } | ReadonlyArray<ValueType>> =
  T extends ReadonlyArray<ValueType> ? T[number] : T extends { [key: string]: infer U } ? U : never;

export function hasElements(arr: string[], ...items: string[]): boolean {
  return items.every((item) => arr.find((ele) => ele === item) !== undefined);
}

export function equalArrayElement<T extends string | number>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

export function findBetweenString(str: string, start: string, end: string): string[] {
  const arrStr = str.split(start);
  arrStr.splice(0, 1);

  return arrStr.map((ele) => ele.split(end)[0]);
}

const PRIMITIVE_TYPE_STRINGS = [
  'string',
  'number',
  'boolean',
  'bigint',
  'symbol',
  'null',
  'undefined',
] as const;

export function isPrimitiveTypeString(str: string): boolean {
  return PRIMITIVE_TYPE_STRINGS.includes(str as any);
}
