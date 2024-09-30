import { isError , toString } from 'lodash-es';

export function toError(entity: unknown): Error {
  return isError(entity) ? entity : new Error(toString(entity));
}

export default toError;
