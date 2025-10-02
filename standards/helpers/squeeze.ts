export function squeeze(target: string): string {
  return target.replaceAll(/(.)\1+/gv, '$1');
}
