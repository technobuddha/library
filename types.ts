
/** Make some attributes of an object optional */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Make some attriutes of an objects required */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Get the type of an object, if the object is a promise get the promise type */
export type PromiseType<T> = T extends Promise<infer U> ? U : T;
