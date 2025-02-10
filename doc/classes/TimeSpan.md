<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / TimeSpan

# Class: TimeSpan

Defined in: [time-span.ts:17](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L17)

Store and manipulate a duration of time

## Constructors

### new TimeSpan()

> **new TimeSpan**(): [`TimeSpan`](TimeSpan.md)

Defined in: [time-span.ts:21](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L21)

#### Returns

[`TimeSpan`](TimeSpan.md)

### new TimeSpan()

> **new TimeSpan**(`ticks`): [`TimeSpan`](TimeSpan.md)

Defined in: [time-span.ts:26](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L26)

#### Parameters

##### ticks

`number`

the number of ticks (milliseconds)

#### Returns

[`TimeSpan`](TimeSpan.md)

### new TimeSpan()

> **new TimeSpan**(`h`, `m`, `s`): [`TimeSpan`](TimeSpan.md)

Defined in: [time-span.ts:33](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L33)

#### Parameters

##### h

`number`

Hours

##### m

`number`

minutes

##### s

`number`

seconds

#### Returns

[`TimeSpan`](TimeSpan.md)

### new TimeSpan()

> **new TimeSpan**(`d`, `h`, `m`, `s`): [`TimeSpan`](TimeSpan.md)

Defined in: [time-span.ts:41](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L41)

#### Parameters

##### d

`number`

Days

##### h

`number`

Hours

##### m

`number`

minutes

##### s

`number`

seconds

#### Returns

[`TimeSpan`](TimeSpan.md)

### new TimeSpan()

> **new TimeSpan**(`d`, `h`, `m`, `s`, `ms`): [`TimeSpan`](TimeSpan.md)

Defined in: [time-span.ts:50](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L50)

#### Parameters

##### d

`number`

Days

##### h

`number`

Hours

##### m

`number`

minutes

##### s

`number`

seconds

##### ms

`number`

milliseconds

#### Returns

[`TimeSpan`](TimeSpan.md)

### new TimeSpan()

> **new TimeSpan**(`text`): [`TimeSpan`](TimeSpan.md)

Defined in: [time-span.ts:55](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L55)

#### Parameters

##### text

`string`

formatted timespan (dd:hh:mm:ss.fff) leading zero fields can be omitted

#### Returns

[`TimeSpan`](TimeSpan.md)

## Accessors

### days

#### Get Signature

> **get** **days**(): `number`

Defined in: [time-span.ts:148](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L148)

Get the days portion

##### Returns

`number`

***

### hours

#### Get Signature

> **get** **hours**(): `number`

Defined in: [time-span.ts:155](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L155)

Get the hours portion

##### Returns

`number`

***

### milliseconds

#### Get Signature

> **get** **milliseconds**(): `number`

Defined in: [time-span.ts:183](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L183)

Get the milliseconds portion

##### Returns

`number`

***

### minutes

#### Get Signature

> **get** **minutes**(): `number`

Defined in: [time-span.ts:164](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L164)

Get the minutes portion

##### Returns

`number`

***

### seconds

#### Get Signature

> **get** **seconds**(): `number`

Defined in: [time-span.ts:173](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L173)

Get the seconds portion

##### Returns

`number`

***

### ticks

#### Get Signature

> **get** **ticks**(): `number`

Defined in: [time-span.ts:190](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L190)

Get the total number of ticks (milliseconds)

##### Returns

`number`

***

### totalDays

#### Get Signature

> **get** **totalDays**(): `number`

Defined in: [time-span.ts:197](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L197)

Get the total number of days

##### Returns

`number`

***

### totalHours

#### Get Signature

> **get** **totalHours**(): `number`

Defined in: [time-span.ts:204](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L204)

Get the total number of hours

##### Returns

`number`

***

### totalMilliseconds

#### Get Signature

> **get** **totalMilliseconds**(): `number`

Defined in: [time-span.ts:225](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L225)

Get the total number of milliseconds

##### Returns

`number`

***

### totalMinutes

#### Get Signature

> **get** **totalMinutes**(): `number`

Defined in: [time-span.ts:211](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L211)

Get the total number of minutes

##### Returns

`number`

***

### totalSeconds

#### Get Signature

> **get** **totalSeconds**(): `number`

Defined in: [time-span.ts:218](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L218)

Get the total number of seconds

##### Returns

`number`

## Methods

### add()

> **add**(`other`): [`TimeSpan`](TimeSpan.md)

Defined in: [time-span.ts:294](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L294)

Add two timespans

#### Parameters

##### other

[`TimeSpan`](TimeSpan.md)

TimeSpan to add to this

#### Returns

[`TimeSpan`](TimeSpan.md)

a TimeSpan that is the sum of two timespans

***

### format()

> **format**(`mask`?): `string`

Defined in: [time-span.ts:235](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L235)

Format the timespan using a mask

#### Parameters

##### mask?

`string`

The mask

#### Returns

`string`

the formatted TimeSpan

***

### toString()

> **toString**(): `string`

Defined in: [time-span.ts:284](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L284)

Convert the TimeSpan to a string

#### Returns

`string`

formatted string

***

### compare()

> `static` **compare**(`t1`, `t2`): `number`

Defined in: [time-span.ts:305](https://github.com/technobuddha/library/blob/main/src/time-span.ts#L305)

Compare two TimeSpans

#### Parameters

##### t1

[`TimeSpan`](TimeSpan.md)

First TimeSpan

##### t2

[`TimeSpan`](TimeSpan.md)

Second TimeSpan

#### Returns

`number`

-1 if the first time span is less then the second, 0 if they are equal, 1 if the first is greater
