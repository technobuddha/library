const reWord = /(?:\p{Lu}\p{Ll}+)|(?:(?:\p{Lu}(?!\p{Ll}))+)|(?:\p{Ll}+)|(?:\p{N}+)/gu;

export function tokenize(input: string): string[] {
  return input.match(reWord) ?? [];
}
