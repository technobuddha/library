[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [time-span](../README.md) / TimeSpan

# Class: TimeSpan

Store and manipulate a duration of time

## Constructors

### new TimeSpan()

> **new TimeSpan**(): [`TimeSpan`](TimeSpan.md)

#### Returns

[`TimeSpan`](TimeSpan.md)

#### Defined in

[time-span.ts:28](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L28)

### new TimeSpan()

> **new TimeSpan**(`ticks`): [`TimeSpan`](TimeSpan.md)

#### Parameters

• **ticks**: `number`

#### Returns

[`TimeSpan`](TimeSpan.md)

#### Defined in

[time-span.ts:29](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L29)

### new TimeSpan()

> **new TimeSpan**(`h`, `m`, `s`): [`TimeSpan`](TimeSpan.md)

#### Parameters

• **h**: `number`

• **m**: `number`

• **s**: `number`

#### Returns

[`TimeSpan`](TimeSpan.md)

#### Defined in

[time-span.ts:30](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L30)

### new TimeSpan()

> **new TimeSpan**(`d`, `h`, `m`, `s`): [`TimeSpan`](TimeSpan.md)

#### Parameters

• **d**: `number`

• **h**: `number`

• **m**: `number`

• **s**: `number`

#### Returns

[`TimeSpan`](TimeSpan.md)

#### Defined in

[time-span.ts:31](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L31)

### new TimeSpan()

> **new TimeSpan**(`d`, `h`, `m`, `s`, `ms`): [`TimeSpan`](TimeSpan.md)

#### Parameters

• **d**: `number`

• **h**: `number`

• **m**: `number`

• **s**: `number`

• **ms**: `number`

#### Returns

[`TimeSpan`](TimeSpan.md)

#### Defined in

[time-span.ts:32](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L32)

### new TimeSpan()

> **new TimeSpan**(`text`): [`TimeSpan`](TimeSpan.md)

#### Parameters

• **text**: `string`

#### Returns

[`TimeSpan`](TimeSpan.md)

#### Defined in

[time-span.ts:33](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L33)

## Accessors

### days

> `get` **days**(): `number`

Get the days portion

#### Returns

`number`

#### Defined in

[time-span.ts:109](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L109)

***

### hours

> `get` **hours**(): `number`

Get the hours portion

#### Returns

`number`

#### Defined in

[time-span.ts:116](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L116)

***

### milliseconds

> `get` **milliseconds**(): `number`

Get the milliseconds portion

#### Returns

`number`

#### Defined in

[time-span.ts:144](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L144)

***

### minutes

> `get` **minutes**(): `number`

Get the minutes portion

#### Returns

`number`

#### Defined in

[time-span.ts:125](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L125)

***

### seconds

> `get` **seconds**(): `number`

Get the seconds portion

#### Returns

`number`

#### Defined in

[time-span.ts:134](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L134)

***

### ticks

> `get` **ticks**(): `number`

Get the total number of ticks (milliseconds)

#### Returns

`number`

#### Defined in

[time-span.ts:151](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L151)

***

### totalDays

> `get` **totalDays**(): `number`

Get the total number of days

#### Returns

`number`

#### Defined in

[time-span.ts:158](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L158)

***

### totalHours

> `get` **totalHours**(): `number`

Get the total number of hours

#### Returns

`number`

#### Defined in

[time-span.ts:165](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L165)

***

### totalMilliseconds

> `get` **totalMilliseconds**(): `number`

Get the total number of milliseconds

#### Returns

`number`

#### Defined in

[time-span.ts:186](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L186)

***

### totalMinutes

> `get` **totalMinutes**(): `number`

Get the total number of minutes

#### Returns

`number`

#### Defined in

[time-span.ts:172](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L172)

***

### totalSeconds

> `get` **totalSeconds**(): `number`

Get the total number of seconds

#### Returns

`number`

#### Defined in

[time-span.ts:179](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L179)

## Methods

### add()

> **add**(`other`): [`TimeSpan`](TimeSpan.md)

Add two timespans

#### Parameters

• **other**: [`TimeSpan`](TimeSpan.md)

TimeSpan to add to this

#### Returns

[`TimeSpan`](TimeSpan.md)

a TimeSpan that is the sum of two timespans

#### Defined in

[time-span.ts:260](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L260)

***

### format()

> **format**(`mask`?): `string`

Format the timespan using a mask

#### Parameters

• **mask?**: `string`

The mask

#### Returns

`string`

the formatted TimeSpan

#### Defined in

[time-span.ts:196](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L196)

***

### toString()

> **toString**(): `string`

Convert the TimeSpan to a string

#### Returns

`string`

formatted string

#### Defined in

[time-span.ts:250](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L250)

***

### compare()

> `static` **compare**(`t1`, `t2`): `number`

Compare two TimeSpans

#### Parameters

• **t1**: [`TimeSpan`](TimeSpan.md)

First TimeSpan

• **t2**: [`TimeSpan`](TimeSpan.md)

Second TimeSpan

#### Returns

`number`

-1 if the first time span is less then the second, 0 if they are equal, 1 if the first is greater

#### Defined in

[time-span.ts:271](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/time-span.ts#L271)
