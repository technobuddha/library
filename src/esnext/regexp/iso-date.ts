import { re } from './re.ts';

/**
 * Validate a year component in a date string.
 * @internal
 */
const ISO_YEAR = /^[0-9]{4}$/v;

/**
 * Validate a month component in a date string.
 * @internal
 */
const ISO_MONTH = /^(?:0[1-9]|1[0-2])$/v;

/**
 * Validate a day component in a date string.
 * @internal
 */
const ISO_DAY = /^(?:3[0-1]|[1-2][0-9]|0[1-9])$/v;

/**
 * Validate an hour component in a time string.
 * @internal
 */
const ISO_HOUR = /^(?:2[0-3]|[0-1][0-9])$/v;

/**
 * Validate a minute component in a time string.
 * @internal
 */
const ISO_MINUTE = /^[0-5][0-9]$/v;

/**
 * Validate a second component in a time string.
 * @internal
 */
const ISO_SECOND = ISO_MINUTE;

/**
 * Validate a fractional second component in a time string.
 * @internal
 */
const ISO_FRACTION = /^[0-9]+$/v;

/**
 * Validate a positive timezone offset hour.
 * @internal
 */
const ISO_ZONE_PLUS = /^[+](?:1[0-4]|0[0-9])$/v;

/**
 * Validate a negative timezone offset hour.
 * @internal
 */
const ISO_ZONE_MINUS = /^[\-](?:1[0-2]|0[0-9])$/v;

/**
 * Validate a timezone offset hour.
 * @internal
 */
const ISO_ZONE_HOUR = re`^${ISO_ZONE_PLUS}|${ISO_ZONE_MINUS}$`;

/**
 * Validate a timezone offset minute.
 * @internal
 */
const ISO_ZONE_MINUTE = /^[0-5][0-9]$/v;

/**
 * Validate a timezone offset minute.
 * @internal
 */
const ISO_TIMEZONE = re`^(?:(?:${ISO_ZONE_HOUR}(?::${ISO_ZONE_MINUTE})?)|Z)$`;

/**
 * Validate a ISO formatted date
 * @example
 * ```typescript
 * isoDate.test('2023-08-29T12:34:56Z'); // true
 * isoDate.test('2023-08-29T12:34:56.789+02:00'); // true
 * isoDate.test('2023-08-29T12:34'); // true
 * isoDate.test('2023-08-29'); // false
 * isoDate.test('not-a-date'); // false
 * ```
 * @group RegExp
 * @category Constants
 */
export const isoDate = re`^${ISO_YEAR}-${ISO_MONTH}-${ISO_DAY}T${ISO_HOUR}:${ISO_MINUTE}(?::${ISO_SECOND}(?:[.]${ISO_FRACTION})?)?${ISO_TIMEZONE}$`;
