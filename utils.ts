const describable_symbol = Symbol("__describable__");

export function describe(klass: object, property: string) {
  let property_desc = Object.getOwnPropertyDescriptor(
    klass,
    describable_symbol,
  );
  if (property_desc == undefined) {
    Object.defineProperty(klass, describable_symbol, {
      value: [],
      writable: true,
    });
    property_desc = Object.getOwnPropertyDescriptor(klass, describable_symbol)!;
  }
  const existing: Array<string> = property_desc.value;
  property_desc!.value! = existing.concat([property]);
}

export function toString(object: object): string {
  let result: string = "";

  let describable_property = Object.getOwnPropertyDescriptor(
    object,
    describable_symbol,
  );
  let describables: Array<string> | undefined = describable_property?.value;

  for (const property of Object.getOwnPropertyNames(object)) {
    const prop_only_object = object as { [_: string]: unknown };
    let include = true;
    if (describables != undefined) {
      if (
        !describables.some((value) => {
          return value == property;
        })
      ) {
        include = false;
      }
    }
    if (include) {
      result += `${property}: ${prop_only_object[property]}; `;
    }
  }
  return result;
}

export function zip<T, U>(a: Array<T>, b: Array<U>): Array<[T, U]> {
  return a.map((v, i, _) => {
    return [v, b[i]];
  });
}
