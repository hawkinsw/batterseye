export function toString(object: object): string {
  let result: string = "";
  for (const property of Object.getOwnPropertyNames(object)) {
    const prop_only_object = object as { [_: string]: unknown };
    result += `${property}: ${prop_only_object[property]}`;
  }
  return result;
}

export function zip<T, U>(a: Array<T>, b: Array<U>): Array<[T, U]> {
  return a.map((v, i, _) => {
    return [v, b[i]];
  });
}
