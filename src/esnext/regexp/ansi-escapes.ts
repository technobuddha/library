// Valid string terminator sequences are BEL, ESC\, and 0x9c (String Terminator))

import { re } from './re.ts';

/**
 * Matches ANSI terminator: Bell (BEL), String Terminator (ST), ESC\\
 * @internal
 */
const ANSI_ST = re`\u0007|\u001b\u005c|\u009c`;

/**
 * OSC sequences only: ESC ] ... ST (non-greedy until the first ST)
 * @internal
 */
const ANSI_OSC = re`\u001B\][\s\S]*?${ANSI_ST}`;

/**
 * CSI and related: ESC/C1, optional intermediates, optional params (supports ; and :) then final byte
 * @internal
 */
const ANSI_CSI = re`[\u001B\u009B][\[\]\(\)#;?]*(?:\d{1,4}(?:[;:]\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]`;

/**
 * Regular expression that matches ANSI escape sequences, including OSC (Operating System Command)
 * and CSI (Control Sequence Introducer) patterns. Useful for stripping or identifying ANSI codes
 * in strings, such as those used for terminal text formatting.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code
 * @group RegExp
 * @category Constants
 */
export const ansiEscapes = re('g')`${ANSI_OSC}|${ANSI_CSI}`;
