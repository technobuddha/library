[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / json

# Module: json

## Table of contents

### Properties

- [default](json.md#default)

### Variables

- [specialBegin](json.md#specialbegin)
- [specialFinish](json.md#specialfinish)

### Functions

- [replacer](json.md#replacer)
- [reviver](json.md#reviver)

## Properties

### default

• **default**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `replacer` | (`key`: *string*, `value`: *unknown*) => *unknown* |
| `reviver` | (`_key`: *string*, `value`: *unknown*) => *unknown* |

## Variables

### specialBegin

• `Const` **specialBegin**: ``"﴾"``= '﴾'

Defined in: [json.ts:4](../../src/json.ts#L4)

___

### specialFinish

• `Const` **specialFinish**: ``"﴿"``= '﴿'

Defined in: [json.ts:5](../../src/json.ts#L5)

## Functions

### replacer

▸ **replacer**(`key`: *string*, `value`: *unknown*): *unknown*

Used with JSON.stringify to encode a wider range of objects into strings that can later be decoded with {@link revive}

**`remarks`** Will encode Date, RegExp and BigInt objects.  The numeric values 'Infinity' and 'NaN' are also encoded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | *string* | The key for the field |
| `value` | *unknown* | The value (may have already been encoded into a string) |

**Returns:** *unknown*

the encoded value

Defined in: [json.ts:16](../../src/json.ts#L16)

___

### reviver

▸ **reviver**(`_key`: *string*, `value`: *unknown*): *unknown*

Used with JSON.parse to decode objected encoded by [replacer](json.md#replacer)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_key` | *string* | The key |
| `value` | *unknown* | The value |

**Returns:** *unknown*

the decoded value

Defined in: [json.ts:38](../../src/json.ts#L38)
