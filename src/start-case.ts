export function startCase(input: string): string {
  return input.toLocaleLowerCase().replaceAll(/\b\w/gu, (l) => l.toLocaleUpperCase());
}
