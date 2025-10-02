import { isObject } from './is-object.ts';

export function deepCopy<T>(main: T): T {
  if (Array.isArray(main)) {
    const result = Array.from({ length: main.length });

    for (const key of Reflect.ownKeys(main)) {
      const property = Object.getOwnPropertyDescriptor(main, key)!;
      Object.defineProperty(result, key, { ...property, value: deepCopy(property.value) });
    }

    return result as T;
  }

  if (isObject(main)) {
    const result = {} as T;

    for (const key of Reflect.ownKeys(main)) {
      const property = Object.getOwnPropertyDescriptor(main, key)!;
      Object.defineProperty(result, key, { ...property, value: deepCopy(property.value) });
    }

    Object.setPrototypeOf(result, Object.getPrototypeOf(main));
    return result;
  }

  return main;
}
