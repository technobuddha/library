<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / domain

# Variable: domain

> `const` **domain**: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

Defined in: [regexp.ts:118](https://github.com/technobuddha/library/blob/main/src/regexp.ts#L118)

Regular expression for matching a domain name composed of a host and a top-level domain (TLD).

## Remarks

This regular expression uses the `re` tagged template literal to construct the pattern.
The pattern expects one or more occurrences of `HOST` followed by `TLD`, anchored to the start and end of the string.

## Example

```ts
const isDomain = domain.test('example.com');
```
