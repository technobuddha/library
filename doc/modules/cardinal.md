[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / cardinal

# Module: cardinal

## Table of contents

### References

- [default](cardinal.md#default)

### Type aliases

- [Options](cardinal.md#options)
- [OptionsCardinal](cardinal.md#optionscardinal)
- [OptionsIllion](cardinal.md#optionsillion)

### Functions

- [cardinal](cardinal.md#cardinal)
- [orderOfMagnitude](cardinal.md#orderofmagnitude)
- [summarize](cardinal.md#summarize)

## References

### default

Renames and exports: [cardinal](cardinal.md#cardinal)

## Type aliases

### Options

Ƭ **Options**: [*OptionsCardinal*](cardinal.md#optionscardinal) & [*OptionsIllion*](cardinal.md#optionsillion)

Defined in: [src/cardinal.ts:5](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/cardinal.ts#L5)

___

### OptionsCardinal

Ƭ **OptionsCardinal**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digits?` | *boolean* | Use numbers instead of words for the group value, the group name is still output as text |
| `groups?` | *number* | The number of groups to output, each group consists of three digits. |

Defined in: [src/cardinal.ts:7](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/cardinal.ts#L7)

___

### OptionsIllion

Ƭ **OptionsIllion**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `and?` | *string* | Word to place after the hundreds.  "one hundred and one" vs. "one hundred one" |
| `hyphen?` | *string* | Places a character between the tens units and the ones units.  "twenty-one" vs. "twenty one" |

Defined in: [src/cardinal.ts:14](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/cardinal.ts#L14)

## Functions

### cardinal

▸ **cardinal**(`input`: *number*, `__namedParameters?`: [*Options*](cardinal.md#options)): *string*

Convert a number into text (the cardinal number)

**`remark`** There is no limit to the numbers that can be expressed, however Javascript/Typescript can only represent numbers
up to uncentillions (1e308).

**`default`** groups Infinity

**`default`** digits false

**`default`** and (empty)

**`default`** hyphen (space)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *number* | - | The number |
| `__namedParameters` | [*Options*](cardinal.md#options) | {} | see [Options](cardinal.md#options) |

**Returns:** *string*

The number spelled out

Defined in: [src/cardinal.ts:63](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/cardinal.ts#L63)

___

### orderOfMagnitude

▸ **orderOfMagnitude**(`exponent`: *number*): *string* \| ``null``

Get the spelled out word for an exponent

**`remarks`** This is only using the exponent, There is no limit to the numbers this function can represents, however Javascript/Typescript can only represent
numbers up to 1e308, which limits the numbers that this method can represent to 10^10^308 which is really really big.

**`example`** 6 is "million"

**`example`** 303 is "centillion"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `exponent` | *number* | The exponent to convert |

**Returns:** *string* \| ``null``

Order of Magnitude as text

Defined in: [src/cardinal.ts:244](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/cardinal.ts#L244)

___

### summarize

▸ **summarize**(`input`: *number*, `options?`: [*OptionsIllion*](cardinal.md#optionsillion)): *string*

Get a short description of a number

**`remarks`** this is a shortcut to calling cardinal with options {groups: 1, digits: true}

**`example`** 1000000 "1 million"

**`example`** 101323847382459 "101 trillion"

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *number* | - | number to convert |
| `options` | [*OptionsIllion*](cardinal.md#optionsillion) | {} | see [OptionsIllion](cardinal.md#optionsillion) |

**Returns:** *string*

number as text

Defined in: [src/cardinal.ts:260](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/cardinal.ts#L260)
