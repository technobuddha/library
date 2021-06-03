[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / [time-span](../modules/time_span.md) / TimeSpan

# Class: TimeSpan

[time-span](../modules/time_span.md).TimeSpan

Store and manipulate a duration of time

## Table of contents

### Constructors

- [constructor](time_span.timespan.md#constructor)

### Accessors

- [days](time_span.timespan.md#days)
- [hours](time_span.timespan.md#hours)
- [milliseconds](time_span.timespan.md#milliseconds)
- [minutes](time_span.timespan.md#minutes)
- [seconds](time_span.timespan.md#seconds)
- [ticks](time_span.timespan.md#ticks)
- [totalDays](time_span.timespan.md#totaldays)
- [totalHours](time_span.timespan.md#totalhours)
- [totalMilliseconds](time_span.timespan.md#totalmilliseconds)
- [totalMinutes](time_span.timespan.md#totalminutes)
- [totalSeconds](time_span.timespan.md#totalseconds)

### Methods

- [add](time_span.timespan.md#add)
- [format](time_span.timespan.md#format)
- [toString](time_span.timespan.md#tostring)
- [compare](time_span.timespan.md#compare)

## Constructors

### constructor

\+ **new TimeSpan**(): [*TimeSpan*](time_span.timespan.md)

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [time-span.ts:8](../../src/time-span.ts#L8)

\+ **new TimeSpan**(`ticks`: *number*): [*TimeSpan*](time_span.timespan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | *number* |

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [time-span.ts:19](../../src/time-span.ts#L19)

\+ **new TimeSpan**(`h`: *number*, `m`: *number*, `s`: *number*): [*TimeSpan*](time_span.timespan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `h` | *number* |
| `m` | *number* |
| `s` | *number* |

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [time-span.ts:20](../../src/time-span.ts#L20)

\+ **new TimeSpan**(`d`: *number*, `h`: *number*, `m`: *number*, `s`: *number*): [*TimeSpan*](time_span.timespan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `d` | *number* |
| `h` | *number* |
| `m` | *number* |
| `s` | *number* |

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [time-span.ts:21](../../src/time-span.ts#L21)

\+ **new TimeSpan**(`d`: *number*, `h`: *number*, `m`: *number*, `s`: *number*, `ms`: *number*): [*TimeSpan*](time_span.timespan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `d` | *number* |
| `h` | *number* |
| `m` | *number* |
| `s` | *number* |
| `ms` | *number* |

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [time-span.ts:22](../../src/time-span.ts#L22)

\+ **new TimeSpan**(`text`: *string*): [*TimeSpan*](time_span.timespan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [time-span.ts:23](../../src/time-span.ts#L23)

## Accessors

### days

• get **days**(): *number*

Get the days portion

**Returns:** *number*

Defined in: [time-span.ts:87](../../src/time-span.ts#L87)

___

### hours

• get **hours**(): *number*

Get the hours portion

**Returns:** *number*

Defined in: [time-span.ts:94](../../src/time-span.ts#L94)

___

### milliseconds

• get **milliseconds**(): *number*

Get the milliseconds portion

**Returns:** *number*

Defined in: [time-span.ts:115](../../src/time-span.ts#L115)

___

### minutes

• get **minutes**(): *number*

Get the minutes portion

**Returns:** *number*

Defined in: [time-span.ts:101](../../src/time-span.ts#L101)

___

### seconds

• get **seconds**(): *number*

Get the seconds portion

**Returns:** *number*

Defined in: [time-span.ts:108](../../src/time-span.ts#L108)

___

### ticks

• get **ticks**(): *number*

Get the total number of ticks (milliseconds)

**Returns:** *number*

Defined in: [time-span.ts:122](../../src/time-span.ts#L122)

___

### totalDays

• get **totalDays**(): *number*

Get the total number of days

**Returns:** *number*

Defined in: [time-span.ts:129](../../src/time-span.ts#L129)

___

### totalHours

• get **totalHours**(): *number*

Get the total number of hours

**Returns:** *number*

Defined in: [time-span.ts:136](../../src/time-span.ts#L136)

___

### totalMilliseconds

• get **totalMilliseconds**(): *number*

Get the total number of milliseconds

**Returns:** *number*

Defined in: [time-span.ts:157](../../src/time-span.ts#L157)

___

### totalMinutes

• get **totalMinutes**(): *number*

Get the total number of minutes

**Returns:** *number*

Defined in: [time-span.ts:143](../../src/time-span.ts#L143)

___

### totalSeconds

• get **totalSeconds**(): *number*

Get the total number of seconds

**Returns:** *number*

Defined in: [time-span.ts:150](../../src/time-span.ts#L150)

## Methods

### add

▸ **add**(`other`: [*TimeSpan*](time_span.timespan.md)): [*TimeSpan*](time_span.timespan.md)

Add two timespans

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [*TimeSpan*](time_span.timespan.md) | TimeSpan to add to this |

**Returns:** [*TimeSpan*](time_span.timespan.md)

a TimeSpan that is the sum of two timespans

Defined in: [time-span.ts:228](../../src/time-span.ts#L228)

___

### format

▸ **format**(`mask?`: *string*): *string*

Format the timespan using a mask

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mask?` | *string* | The mask |

**Returns:** *string*

the formatted TimeSpan

Defined in: [time-span.ts:167](../../src/time-span.ts#L167)

___

### toString

▸ **toString**(): *string*

Convert the TimeSpan to a string

**Returns:** *string*

formatted string

Defined in: [time-span.ts:218](../../src/time-span.ts#L218)

___

### compare

▸ `Static` **compare**(`t1`: [*TimeSpan*](time_span.timespan.md), `t2`: [*TimeSpan*](time_span.timespan.md)): *number*

Compare two TimeSpans

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `t1` | [*TimeSpan*](time_span.timespan.md) | First TimeSpan |
| `t2` | [*TimeSpan*](time_span.timespan.md) | Second TimeSpan |

**Returns:** *number*

-1 if the first time span is less then the second, 0 if they are equal, 1 if the first is greater

Defined in: [time-span.ts:239](../../src/time-span.ts#L239)
