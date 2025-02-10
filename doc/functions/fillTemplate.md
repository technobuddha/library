<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / fillTemplate

# Function: fillTemplate()

> **fillTemplate**(`input`, `values`, `__namedParameters`): `string`

Defined in: [fill-template.ts:21](https://github.com/technobuddha/library/blob/main/src/fill-template.ts#L21)

Fill a template with supplied values

## Parameters

### input

`string`

The template

### values

`Record`\<`string`, `undefined` \| `string`\>

A dictionary of name-values used to fill in values in the template

### \_\_namedParameters

[`FillTemplateOptions`](../type-aliases/FillTemplateOptions.md) = `{}`

see [FillTemplateOptions](../type-aliases/FillTemplateOptions.md)

## Returns

`string`

template with values replaced

## Default Value

```ts
open '{{'
```

## Default Value

```ts
close '}}'
```
