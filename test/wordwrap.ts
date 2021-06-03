import expect from '../util/expect';
import wordwrap from '../src/wordwrap';

describe(
    'wordwrap',
    () => {
        test(
            'wrap words',
            () => {
                expect(
                    wordwrap(
                        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
                    )
                )
                .toBe("If you set your goals ridiculously high and it's a failure, you will fail\nabove everyone else's success.");
            }
        );

        test(
            'wrap specify width',
            () => {
                expect(
                    wordwrap(
                        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
                        { width: 60 },
                    )
                )
                .toBe("If you set your goals ridiculously high and it's a failure,\nyou will fail above everyone else's success.");
            }
        );

        test(
            'wrap specify line separator',
            () => {
                expect(
                    wordwrap(
                        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
                        { separator: '|' },
                    )
                )
                .toBe("If you set your goals ridiculously high and it's a failure, you will fail|above everyone else's success.");
            }
        );

        test(
            'turn off word boundaries',
            () => {
                expect(
                    wordwrap(
                        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
                        { cut: true },
                    )
                )
                .toBe("If you set your goals ridiculously high and it's a failure, you will fail a\nbove everyone else's success.");
            }
        );

        test(
            'add trailing spaces',
            () => {
                expect(
                    wordwrap(
                        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
                        { trailingSpaces: true },
                    )
                )
                .toBe("If you set your goals ridiculously high and it's a failure, you will fail  \nabove everyone else's success.                                             ");
            }
        );

        test(
            'turn off word boundaries & add trailing spaces',
            () => {
                expect(
                    wordwrap(
                        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
                        { cut: true, trailingSpaces: true },
                    )
                )
                .toBe("If you set your goals ridiculously high and it's a failure, you will fail a\nbove everyone else's success.                                              ");
            }
        );

        test(
            'handle width 0',
            () => {
                expect(
                    wordwrap(
                        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
                        { width: 0 },
                    )
                )
                .toBe("If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.");
            }
        );
    }
);
