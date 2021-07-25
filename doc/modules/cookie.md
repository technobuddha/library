[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / cookie

# Module: cookie

## Table of contents

### Properties

- [default](cookie.md#default)

### Functions

- [add](cookie.md#add)
- [del](cookie.md#del)
- [get](cookie.md#get)
- [init](cookie.md#init)
- [names](cookie.md#names)

## Properties

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`name`: `string`, `value`: `string`, `expires?`: `string` \| `Date`) => `void` |
| `del` | (`name`: `string`) => `void` |
| `get` | (`name`: `string`) => `string` \| `undefined` |
| `init` | (`input`: `string`) => `void` |
| `names` | () => `string`[] |

## Functions

### add

▸ **add**(`name`, `value`, `expires?`): `void`

Add or update a cookie

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the cookie |
| `value` | `string` | value of the cookie |
| `expires?` | `string` \| `Date` | Expiration date |

#### Returns

`void`

#### Defined in

[cookie.ts:47](../../src/cookie.ts#L47)

___

### del

▸ **del**(`name`): `void`

Delete a cookie

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[cookie.ts:62](../../src/cookie.ts#L62)

___

### get

▸ **get**(`name`): `string` \| `undefined`

Get the value of a cookie

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of a cookie |

#### Returns

`string` \| `undefined`

#### Defined in

[cookie.ts:25](../../src/cookie.ts#L25)

___

### init

▸ **init**(`input?`): `void`

Initialize the cookie system with the browsers cookies
Parse a string containing cookies for use by other cookie method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | string to be decoded |

#### Returns

`void`

#### Defined in

[cookie.ts:12](../../src/cookie.ts#L12)

___

### names

▸ **names**(): `string`[]

Get the names of all cookies

#### Returns

`string`[]

array of cookie names

#### Defined in

[cookie.ts:35](../../src/cookie.ts#L35)
