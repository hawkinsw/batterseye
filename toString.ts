export function toString(object: object): string {
  let result: string = "";
  for (const property of Object.getOwnPropertyNames(object)) {
    const v = (object as any)[property];
    result += `${property}: ${v}; `;
  }
  return result;
}
