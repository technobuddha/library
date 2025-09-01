[@technobuddha/library](../modules.md) / domain

# Variable: domain

```ts
const domain: RegExp;
```

Defined in: [src/regexp.ts:188](https://github.com/technobuddha/library/blob/main/src/regexp.ts#L188)

Regular expression for matching a domain name composed of a host and a top-level domain (TLD).

## Example

```typescript
domain.test('example.com'); // true
domain.test('sub.example.co'); // true
domain.test('invalid_domain'); // false
```
