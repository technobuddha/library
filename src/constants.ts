export const empty              = '';
export const space              = ' ';
export const nbsp               = '\u00A0';
export const zwsp               = '\u200B';

export const negativeZero       = -0;

export const ticksPerSecond     = 1000;
export const secondsPerMinute   =   60;
export const minutesPerHour     =   60;
export const hoursPerDay        =   24;
export const daysPerWeek        =    7;

export const ticksPerMinute     = ticksPerSecond    * secondsPerMinute;
export const ticksPerHour       = ticksPerMinute    * minutesPerHour;
export const ticksPerDay        = ticksPerHour      * hoursPerDay;
export const ticksPerWeek       = ticksPerDay       * daysPerWeek;

export const secondsPerHour     = secondsPerMinute  * minutesPerHour;
export const secondsPerDay      = secondsPerHour    * hoursPerDay;
export const secondsPerWeek     = secondsPerDay     * daysPerWeek;

export const minutesPerDay      = minutesPerHour    * hoursPerDay;
export const minutesPerWeek     = minutesPerDay     * daysPerWeek;

export const hoursPerWeek       = hoursPerDay       * daysPerWeek;

export type DayOfWeek           = (0 | 1 | 2 | 3 | 4 | 5 | 6);

export const day                = Object.freeze({
    sunday:     0, sun: 0, su: 0,
    monday:     1, mon: 1, mo: 1,
    tuesday:    2, tue: 2, tu: 2, tues: 2,
    wednesday:  3, wed: 3, we: 3,
    thursday:   4, thu: 4, th: 4, thur: 4, thurs: 4,
    friday:     5, fri: 5, fr: 5,
    saturday: 6, sat: 6, sa: 6,
} as Record<string, DayOfWeek>);

export type MonthOfYear         = (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11);

export const month = Object.freeze({
    january:     0, jan:   0,
    february:    1, feb:   1,
    march:       2, mar:   2,
    april:       3, apr:   3,
    may:         4,
    june:        5, jun:   5,
    july:        6, jul:   6,
    august:      7, aug:   7,
    september:   8, sept:  8, sep: 8,
    october:     9, oct:   9,
    november:   10, nov:  10,
    december:   11, dec:  11,
} as Record<string, MonthOfYear>);

export const charcode = Object.freeze({
    ' ':   32, '!':   33, '"':   34, '#':   35, '$':   36, '%':   37, '&':   38, "'":   39,
    '(':   40, ')':   41, '*':   42, '+':   43, ',':   44, '-':   45, '.':   46, '/':   47,
    '0':   48, '1':   49, '2':   50, '3':   51, '4':   52, '5':   53, '6':   54, '7':   55,
    '8':   56, '9':   57, ':':   58, ';':   59, '<':   60, '=':   61, '>':   62, '?':   63,
    '@':   64, 'A':   65, 'B':   66, 'C':   67, 'D':   68, 'E':   69, 'F':   70, 'G':   71,
    'H':   72, 'I':   73, 'J':   74, 'K':   75, 'L':   76, 'M':   77, 'N':   78, 'O':   79,
    'P':   80, 'Q':   81, 'R':   82, 'S':   83, 'T':   84, 'U':   85, 'V':   86, 'W':   87,
    'X':   88, 'Y':   89, 'Z':   90, '[':   91, '\\':  92, ']':   93, '^':   94, '_':   95,
    '`':   96, 'a':   97, 'b':   98, 'c':   99, 'd':  100, 'e':  101, 'f':  102, 'g':  103,
    'h':  104, 'i':  105, 'j':  106, 'k':  107, 'l':  108, 'm':  109, 'n':  110, 'o':  111,
    'p':  112, 'q':  113, 'r':  114, 's':  115, 't':  116, 'u':  117, 'v':  118, 'w':  119,
    'x':  120, 'y':  121, 'z':  122, '{':  123, '|':  124, '}':  125, '~':  126
});

export const mouseButton = Object.freeze({
    left:   1,
    middle: 2,
    right:  3,
});

export const keycode = Object.freeze({
    escape:             27,
    f1:                112,
    f2:                113,
    f3:                114,
    f4:                115,
    f5:                116,
    f6:                117,
    f7:                118,
    f8:                119,
    f9:                120,
    f10:               121,
    f11:               122,
    f12:               123,
    prtScr:             44,
    scrollLock:        145,
    pause:              19,
    grave:             192,
    key1:               49,
    key2:               50,
    key3:               51,
    key4:               52,
    key5:               53,
    key6:               54,
    key7:               55,
    key8:               56,
    key9:               57,
    key0:               48,
    dash:              189,
    equals:            187,
    backspace:           8,
    tab:                 9,
    q:                  81,
    w:                  87,
    e:                  69,
    r:                  82,
    t:                  84,
    y:                  89,
    u:                  85,
    i:                  73,
    o:                  79,
    p:                  80,
    openBracket:       219,
    closeBracket:      221,
    backSlash:         220,
    capsLock:           20,
    a:                  65,
    s:                  83,
    d:                  68,
    f:                  70,
    g:                  71,
    h:                  72,
    j:                  74,
    k:                  75,
    l:                  76,
    semiColon:         186,
    quote:             222,
    enter:              13,
    shift:              16,
    z:                  90,
    x:                  88,
    c:                  67,
    v:                  86,
    b:                  66,
    n:                  78,
    m:                  77,
    comma:             188,
    period:            190,
    slash:             191,
    ctrl:               17,
    leftWindow:         91,
    alt:                18,
    space:              32,
    rightWindow:        92,
    menu:               93,
    ins:                45,
    home:               36,
    pageUp:             33,
    del:                46,
    end:                35,
    pageDown:           34,
    arrowUp:            38,
    arrowLeft:          37,
    arrowDown:          40,
    arrowRight:         39,
    numLock:           144,
    divide:            111,
    multiply:          106,
    subtract:          109,
    numpad7:           103,
    numpad8:           104,
    numpad9:           105,
    add:               107,
    numpad4:           100,
    numpad5:           101,
    numpad6:           102,
    numpad1:            97,
    numpad2:            98,
    numpad3:            99,
    numpad0:            96,
    decimalPoint:      110,
});

export default {
    empty, space, nbsp, zwsp,
    ticksPerSecond, secondsPerMinute, minutesPerHour, hoursPerDay, daysPerWeek,
    ticksPerMinute, ticksPerHour, ticksPerDay, ticksPerWeek,
    secondsPerHour, secondsPerDay, secondsPerWeek,
    minutesPerDay, minutesPerWeek,
    hoursPerWeek,
    day, month,
    charcode, mouseButton, keycode
 };