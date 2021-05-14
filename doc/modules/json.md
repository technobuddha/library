[@technobuddha/library](../..) / [Modules](../Modules.md) / json

# Module: json

## Table of contents

### Properties

- [default](json.md#default)

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

Defined in: [src/json.ts:16](../src/json.ts#L16)

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

Defined in: [src/json.ts:38](../src/json.ts#L38)
