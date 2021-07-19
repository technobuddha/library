[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / [time-span](../modules/time_span.md) / TimeSpan

# Class: TimeSpan

[time-span](../modules/time_span.md).TimeSpan

Store and manipulate a duration of time

## Table of contents

### Constructors

- [constructor](time_span.TimeSpan.md#constructor)

### Accessors

- [days](time_span.TimeSpan.md#days)
- [hours](time_span.TimeSpan.md#hours)
- [milliseconds](time_span.TimeSpan.md#milliseconds)
- [minutes](time_span.TimeSpan.md#minutes)
- [seconds](time_span.TimeSpan.md#seconds)
- [ticks](time_span.TimeSpan.md#ticks)
- [totalDays](time_span.TimeSpan.md#totaldays)
- [totalHours](time_span.TimeSpan.md#totalhours)
- [totalMilliseconds](time_span.TimeSpan.md#totalmilliseconds)
- [totalMinutes](time_span.TimeSpan.md#totalminutes)
- [totalSeconds](time_span.TimeSpan.md#totalseconds)

### Methods

- [add](time_span.TimeSpan.md#add)
- [format](time_span.TimeSpan.md#format)
- [toString](time_span.TimeSpan.md#tostring)
- [compare](time_span.TimeSpan.md#compare)

## Constructors

### constructor

• **new TimeSpan**()

#### Defined in

[time-span.ts:19](../../src/time-span.ts#L19)

• **new TimeSpan**(`ticks`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ticks` | `number` | the number of ticks (milliseconds) |

#### Defined in

[time-span.ts:20](../../src/time-span.ts#L20)

• **new TimeSpan**(`h`, `m`, `s`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `h` | `number` | Hours |
| `m` | `number` | minutes |
| `s` | `number` | seconds |

#### Defined in

[time-span.ts:21](../../src/time-span.ts#L21)

• **new TimeSpan**(`d`, `h`, `m`, `s`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `d` | `number` | Days |
| `h` | `number` | Hours |
| `m` | `number` | minutes |
| `s` | `number` | seconds |

#### Defined in

[time-span.ts:22](../../src/time-span.ts#L22)

• **new TimeSpan**(`d`, `h`, `m`, `s`, `ms`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `d` | `number` | Days |
| `h` | `number` | Hours |
| `m` | `number` | minutes |
| `s` | `number` | seconds |
| `ms` | `number` | milliseconds |

#### Defined in

[time-span.ts:23](../../src/time-span.ts#L23)

• **new TimeSpan**(`text`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | formatted timespan (dd:hh:mm:ss.fff) leading zero fields can be omitted |

#### Defined in

[time-span.ts:24](../../src/time-span.ts#L24)

## Accessors

### days

• `get` **days**(): `number`

Get the days portion

#### Returns

`number`

#### Defined in

[time-span.ts:87](../../src/time-span.ts#L87)

___

### hours

• `get` **hours**(): `number`

Get the hours portion

#### Returns

`number`

#### Defined in

[time-span.ts:94](../../src/time-span.ts#L94)

___

### milliseconds

• `get` **milliseconds**(): `number`

Get the milliseconds portion

#### Returns

`number`

#### Defined in

[time-span.ts:115](../../src/time-span.ts#L115)

___

### minutes

• `get` **minutes**(): `number`

Get the minutes portion

#### Returns

`number`

#### Defined in

[time-span.ts:101](../../src/time-span.ts#L101)

___

### seconds

• `get` **seconds**(): `number`

Get the seconds portion

#### Returns

`number`

#### Defined in

[time-span.ts:108](../../src/time-span.ts#L108)

___

### ticks

• `get` **ticks**(): `number`

Get the total number of ticks (milliseconds)

#### Returns

`number`

#### Defined in

[time-span.ts:122](../../src/time-span.ts#L122)

___

### totalDays

• `get` **totalDays**(): `number`

Get the total number of days

#### Returns

`number`

#### Defined in

[time-span.ts:129](../../src/time-span.ts#L129)

___

### totalHours

• `get` **totalHours**(): `number`

Get the total number of hours

#### Returns

`number`

#### Defined in

[time-span.ts:136](../../src/time-span.ts#L136)

___

### totalMilliseconds

• `get` **totalMilliseconds**(): `number`

Get the total number of milliseconds

#### Returns

`number`

#### Defined in

[time-span.ts:157](../../src/time-span.ts#L157)

___

### totalMinutes

• `get` **totalMinutes**(): `number`

Get the total number of minutes

#### Returns

`number`

#### Defined in

[time-span.ts:143](../../src/time-span.ts#L143)

___

### totalSeconds

• `get` **totalSeconds**(): `number`

Get the total number of seconds

#### Returns

`number`

#### Defined in

[time-span.ts:150](../../src/time-span.ts#L150)

## Methods

### add

▸ **add**(`other`): [`TimeSpan`](time_span.TimeSpan.md)

Add two timespans

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`TimeSpan`](time_span.TimeSpan.md) | TimeSpan to add to this |

#### Returns

[`TimeSpan`](time_span.TimeSpan.md)

a TimeSpan that is the sum of two timespans

#### Defined in

[time-span.ts:228](../../src/time-span.ts#L228)

___

### format

▸ **format**(`mask?`): `string`

Format the timespan using a mask

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mask?` | `string` | The mask |

#### Returns

`string`

the formatted TimeSpan

#### Defined in

[time-span.ts:167](../../src/time-span.ts#L167)

___

### toString

▸ **toString**(): `string`

Convert the TimeSpan to a string

#### Returns

`string`

formatted string

#### Defined in

[time-span.ts:218](../../src/time-span.ts#L218)

___

### compare

▸ `Static` **compare**(`t1`, `t2`): `number`

Compare two TimeSpans

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `t1` | [`TimeSpan`](time_span.TimeSpan.md) | First TimeSpan |
| `t2` | [`TimeSpan`](time_span.TimeSpan.md) | Second TimeSpan |

#### Returns

`number`

-1 if the first time span is less then the second, 0 if they are equal, 1 if the first is greater

#### Defined in

[time-span.ts:239](../../src/time-span.ts#L239)
