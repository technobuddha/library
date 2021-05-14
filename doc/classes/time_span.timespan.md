[@technobuddha/library](../..) / [Modules](../Modules.md) / [time-span](../modules/time_span.md) / TimeSpan

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

\+ **new TimeSpan**(`text`: *string*): [*TimeSpan*](time_span.timespan.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | *string* | formatted timespan (dd:hh:mm:ss.fff) leading zero fields can be omitted |

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [src/time-span.ts:10](../src/time-span.ts#L10)

\+ **new TimeSpan**(`ticks`: *number*): [*TimeSpan*](time_span.timespan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | *number* |

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [src/time-span.ts:21](../src/time-span.ts#L21)

\+ **new TimeSpan**(`h`: *number*, `m`: *number*, `s`: *number*): [*TimeSpan*](time_span.timespan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `h` | *number* |
| `m` | *number* |
| `s` | *number* |

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [src/time-span.ts:22](../src/time-span.ts#L22)

\+ **new TimeSpan**(`d`: *number*, `h`: *number*, `m`: *number*, `s`: *number*): [*TimeSpan*](time_span.timespan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `d` | *number* |
| `h` | *number* |
| `m` | *number* |
| `s` | *number* |

**Returns:** [*TimeSpan*](time_span.timespan.md)

Defined in: [src/time-span.ts:23](../src/time-span.ts#L23)

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

Defined in: [src/time-span.ts:24](../src/time-span.ts#L24)

## Accessors

### days

• get **days**(): *number*

Get the days portion

**Returns:** *number*

Defined in: [src/time-span.ts:88](../src/time-span.ts#L88)

___

### hours

• get **hours**(): *number*

Get the hours portion

**Returns:** *number*

Defined in: [src/time-span.ts:95](../src/time-span.ts#L95)

___

### milliseconds

• get **milliseconds**(): *number*

Get the milliseconds portion

**Returns:** *number*

Defined in: [src/time-span.ts:116](../src/time-span.ts#L116)

___

### minutes

• get **minutes**(): *number*

Get the minutes portion

**Returns:** *number*

Defined in: [src/time-span.ts:102](../src/time-span.ts#L102)

___

### seconds

• get **seconds**(): *number*

Get the seconds portion

**Returns:** *number*

Defined in: [src/time-span.ts:109](../src/time-span.ts#L109)

___

### ticks

• get **ticks**(): *number*

Get the total number of ticks (milliseconds)

**Returns:** *number*

Defined in: [src/time-span.ts:123](../src/time-span.ts#L123)

___

### totalDays

• get **totalDays**(): *number*

Get the total number of days

**Returns:** *number*

Defined in: [src/time-span.ts:130](../src/time-span.ts#L130)

___

### totalHours

• get **totalHours**(): *number*

Get the total number of hours

**Returns:** *number*

Defined in: [src/time-span.ts:137](../src/time-span.ts#L137)

___

### totalMilliseconds

• get **totalMilliseconds**(): *number*

Get the total number of milliseconds

**Returns:** *number*

Defined in: [src/time-span.ts:158](../src/time-span.ts#L158)

___

### totalMinutes

• get **totalMinutes**(): *number*

Get the total number of minutes

**Returns:** *number*

Defined in: [src/time-span.ts:144](../src/time-span.ts#L144)

___

### totalSeconds

• get **totalSeconds**(): *number*

Get the total number of seconds

**Returns:** *number*

Defined in: [src/time-span.ts:151](../src/time-span.ts#L151)

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

Defined in: [src/time-span.ts:225](../src/time-span.ts#L225)

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

Defined in: [src/time-span.ts:168](../src/time-span.ts#L168)

___

### toString

▸ **toString**(): *string*

Convert the TimeSpan to a string

**Returns:** *string*

formatted string

Defined in: [src/time-span.ts:215](../src/time-span.ts#L215)

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

Defined in: [src/time-span.ts:236](../src/time-span.ts#L236)
