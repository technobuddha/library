[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [json](../README.md) / replacer

# Function: replacer()

> **replacer**(`this`, `key`, `value`): `unknown`

Used with JSON.stringify to encode a wider range of objects into strings that can later be decoded with revive

## Parameters

• **this**: `Record`\<`string`, `unknown`\>

The raw object being stringified

• **key**: `string`

The key for the field

• **value**: `unknown`

The value (may have already been encoded into a string)

## Returns

`unknown`

the encoded value

## Remarks

Will encode Date, RegExp and BigInt objects.  The numeric values 'Infinity' and 'NaN' are also encoded.

## Defined in

json.ts:15
