import { re } from './re.ts';

/**
 * Matches alphanumeric characters (case-insensitive).
 * @internal
 */
const az09 = /[a-z0-9]/iv;

/**
 * Matches alphanumeric characters and hyphens (case-insensitive).
 * @internal
 */
const az09Dash = /[a-z0-9\-]/iv;

/**
 * Regular expression to match a valid domain label (hostname component).
 *
 * A domain label must be 1-63 characters long, contain only alphanumeric characters and hyphens,
 * and cannot start or end with a hyphen. This matches both single-character labels and
 * multi-character labels that follow RFC 1035 naming conventions.
 *
 * @internal
 */
const DOMAIN_NAME = re`(?:${az09}${az09Dash}{0,61}${az09})|(?:${az09})`;

/**
 * Regular expression to match a valid Punycode-encoded domain label.
 *
 * Punycode labels start with 'xn--' and can be up to 63 characters total (59 after the prefix).
 * Used for internationalized domain names (IDNs) encoded in ASCII-compatible format per RFC 3492.
 *
 * @internal
 */
const DOMAIN_PUNY = re`(?:xn--${az09Dash}{1,59})`;

/**
 * Matches a single domain label (either regular or Punycode-encoded).
 * @internal
 */
const DOMAIN_LABEL = re`(?:${DOMAIN_PUNY}|${DOMAIN_NAME})`;

/**
 * Matches the hostname portion of a domain (one or more labels separated by dots).
 * @internal
 */
const DOMAIN_HOST = re`(?:${DOMAIN_LABEL}\.)+`;

/**
 * Negative lookahead to prevent all-numeric strings.
 * @internal
 */
const ALL_NUMBERS = /\d+/v;

/**
 * Negative lookahead to prevent strings starting with a hyphen.
 * @internal
 */
const LEADING_DASH = /-.*/v;

/**
 * Negative lookahead to prevent strings ending with a hyphen.
 * @internal
 */
const TRAILING_DASH = /.*-/v;

/**
 * Regular expression to match a valid top-level domain (TLD).
 *
 * TLDs must be 2-63 characters long, cannot be all numeric (per ICANN rules),
 * and cannot start or end with a hyphen. DNS is case-insensitive.
 *
 * @internal
 */
const DOMAIN_FINAL = re`(?!${ALL_NUMBERS}$)(?!${LEADING_DASH}$)(?!${TRAILING_DASH}$)${az09Dash}{2,63}`;

/**
 * Matches a top-level domain (either Punycode-encoded or regular).
 * @internal
 */
const DOMAIN_TLD = re`${DOMAIN_PUNY}|${DOMAIN_FINAL}`;

// cspell:ignore acufc
/**
 * Regular expression for validating fully qualified domain names (FQDNs).
 *
 * This pattern matches domain names composed of one or more hostname labels followed by
 * a top-level domain (TLD). It supports:
 * - Standard ASCII domain names (e.g., `example.com`, `sub.example.org`)
 * - Punycode-encoded internationalized domain names (e.g., `xn--d1acufc.xn--p1ai`)
 * - Multi-level subdomains (e.g., `api.staging.example.com`)
 *
 * The pattern enforces:
 * - Labels are 1-63 characters long
 * - Labels contain only alphanumeric characters and hyphens
 * - Labels cannot start or end with hyphens
 * - TLDs must be at least 2 characters
 * - TLDs cannot be purely numeric
 * - No consecutive dots or trailing dots
 *
 * @example
 * Valid domains:
 * ```ts
 * domain.test('example.com');                    // true
 * domain.test('sub.example.co.uk');              // true
 * domain.test('api.staging.example.com');        // true
 * domain.test('xn--d1acufc.xn--p1ai');           // true (мойдомен.рф in Punycode)
 * domain.test('test-domain.io');                 // true
 * ```
 *
 * @example
 * Invalid domains:
 * ```ts
 * domain.test('invalid_domain');                 // false (underscore not allowed)
 * domain.test('example..com');                   // false (consecutive dots)
 * domain.test('example.com.');                   // false (trailing dot)
 * domain.test('-example.com');                   // false (label starts with hyphen)
 * domain.test('example-.com');                   // false (label ends with hyphen)
 * domain.test('example.c');                      // false (TLD too short)
 * domain.test('example.123');                    // false (all-numeric TLD)
 * ```
 *
 * @group RegExp
 * @category Constants
 */
export const domain = re`^(?:${DOMAIN_HOST})(?:${DOMAIN_TLD})$`;
