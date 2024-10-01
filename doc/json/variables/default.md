[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [json](../README.md) / default

# Variable: default

> **default**: `object`

## Type declaration

### replacer()

> **replacer**: (`this`, `key`, `value`) => `unknown`

Used with JSON.stringify to encode a wider range of objects into strings that can later be decoded with revive

#### Parameters

• **this**: `Record`\<`string`, `unknown`\>

The raw object being stringified

• **key**: `string`

The key for the field

• **value**: `unknown`

The value (may have already been encoded into a string)

#### Returns

`unknown`

the encoded value

#### Remarks

Will encode Date, RegExp and BigInt objects.  The numeric values 'Infinity' and 'NaN' are also encoded.

### reviver()

> **reviver**: (`this`, `_key`, `value`) => `unknown`

Used with JSON.parse to decode objected encoded by [replacer](../functions/replacer.md)

#### Parameters

• **this**: `unknown`

The raw object

• **\_key**: `string`

The key

• **value**: `unknown`

The value

#### Returns

`unknown`

the decoded value

## Defined in

[json.ts:65](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/json.ts#L65)
