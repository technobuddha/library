/**
  * Delete all own enumerable string properties from an object
..* @param input Object to clear all properties
  * @return Original {@code input} with all properties deleted.
  */
export function clearObject<T>(input: Record<string, T>): Record<string, T>
{
    Object.keys(input).forEach(key => delete input[key]);
    return input;
}

export default clearObject
