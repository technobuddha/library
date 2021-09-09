import expect from '#util/expect';
import formatNumber from '../src/formatNumber';

describe(
    'formatNumber',
    () => {
        test(
            'should support the C (Currency) format',
            () => {
                expect(formatNumber(123.456, 'C')).toBe('$123.46');
                expect(formatNumber(123.456, 'C2')).toBe('$123.46');
                expect(formatNumber(0.456, 'C')).toBe('$0.46');
                expect(formatNumber(1234.5678, 'C')).toBe('$1,234.57');
                expect(formatNumber(-123.456, 'C3')).toBe('($123.456)');
                expect(formatNumber(-1234.5678, 'C3')).toBe('($1,234.568)');
                expect(formatNumber(0, 'C')).toBe('$0.00');
                expect(formatNumber(12345.6789, 'C')).toBe('$12,345.68');
                expect(formatNumber(12345.6789, 'C3')).toBe('$12,345.679');
            }
        );

        test(
            'should support the D (Decimal) format',
            () => {
                expect(formatNumber(1234, 'D')).toBe('1234');
                expect(formatNumber(-1234, 'D6')).toBe('-001234');
                expect(formatNumber(0, 'D6')).toBe('000000');
                expect(formatNumber(12345, 'D')).toBe('12345');
                expect(formatNumber(12345, 'D8')).toBe('00012345');
                expect(formatNumber(-12345, 'D')).toBe('-12345');
                expect(formatNumber(-12345, 'D8')).toBe('-00012345');
            }
        );

        test(
            'should support the E (Exponential) format',
            () => {
                expect(formatNumber(1052.0329112756, 'E')).toBe('1.052033E+003');
                expect(formatNumber(-1052.0329112756, 'e2')).toBe('-1.05e+003');
                expect(formatNumber(0, 'E')).toBe('0.000000E+000');
                expect(formatNumber(12345.6789, 'E')).toBe('1.234568E+004');
                expect(formatNumber(12345.6789, 'E10')).toBe('1.2345678900E+004');
                expect(formatNumber(12345.6789, 'e4')).toBe('1.2346e+004');
            }
        );

        test(
            'should support the F (Fixed) format',
            () => {
                expect(formatNumber(1234.567, 'F')).toBe('1234.57');
                expect(formatNumber(1234, 'F1')).toBe('1234.0');
                expect(formatNumber(0.045, 'F')).toBe('0.05');
                expect(formatNumber(-1234.56, 'F4')).toBe('-1234.5600');
                expect(formatNumber(1.23456e100, 'F')).toBe(
                    '12345600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000.00'
                );
                expect(formatNumber(0, 'F4')).toBe('0.0000');
                expect(formatNumber(17843, 'F')).toBe('17843.00');
                expect(formatNumber(-29541, 'F3')).toBe('-29541.000');
                expect(formatNumber(18934.1879, 'F')).toBe('18934.19');
                expect(formatNumber(18934.1879, 'F0')).toBe('18934');
                expect(formatNumber(-1898300.1987, 'F1')).toBe('-1898300.2');
                expect(formatNumber(0.9, 'F0')).toBe('1');
                expect(formatNumber(1.9, 'F0')).toBe('2');
                expect(formatNumber(2.9, 'F0')).toBe('3');
                expect(formatNumber(3.9, 'F0')).toBe('4');
                expect(formatNumber(4.9, 'F0')).toBe('5');
                expect(formatNumber(5.9, 'F0')).toBe('6');
                expect(formatNumber(6.9, 'F0')).toBe('7');
                expect(formatNumber(7.9, 'F0')).toBe('8');
                expect(formatNumber(8.9, 'F0')).toBe('9');
                expect(formatNumber(9.9, 'F0')).toBe('10');
            }
        );

        test(
            'should support the G (General) format',
            () => {
                expect(formatNumber(-123.456, 'G')).toBe('-123.456');
                expect(formatNumber(123.4546, 'G4')).toBe('123.5');
                expect(formatNumber(-1.234567890e-25, 'G')).toBe('-1.23456789E-25');
                expect(formatNumber(-1.234567890e-25, 'g')).toBe('-1.23456789e-25');
                expect(formatNumber(12345.6789, 'G')).toBe('12345.6789');
                expect(formatNumber(12345.6789, 'G7')).toBe('12345.68');
                expect(formatNumber(0.0000023, 'G')).toBe('2.3E-06');
                expect(formatNumber(0.0023, 'G')).toBe('0.0023');
                expect(formatNumber(1234, 'G2')).toBe('1200');
                expect(formatNumber(Math.PI, 'G5')).toBe('3.1416');
            }
        );

        test(
            'should support the N (Number) format',
            () => {
                expect(formatNumber(1234.567, 'N')).toBe('1,234.57');
                expect(formatNumber(1234, 'N1')).toBe('1,234.0');
                expect(formatNumber(-1234.56, 'N3')).toBe('-1,234.560');
                expect(formatNumber(-12445.6789, 'N')).toBe('-12,445.68');
                expect(formatNumber(-12445.6789, 'N1')).toBe('-12,445.7');
                expect(formatNumber(123456789, 'N1')).toBe('123,456,789.0');
            }
        );

        test(
            'should support the P (Percent) format',
            () => {
                expect(formatNumber(1, 'P')).toBe('100.00 %');
                expect(formatNumber(-0.39678, 'P1')).toBe('-39.7 %');
                expect(formatNumber(0.2468013, 'P')).toBe('24.68 %');
                expect(formatNumber(0.2468013, 'P1')).toBe('24.7 %');
            }
        );

        test(
            'should support the R (Round-trip) format',
            () => {
                expect(formatNumber(123456789.12345678, 'R')).toBe('123456789.12345678');
                expect(formatNumber(-123456789.12345678, 'R')).toBe('-123456789.12345678');
                expect(formatNumber(0.6822871999174, 'R')).toBe('0.6822871999174');
                expect(formatNumber(123e200, 'R')).toBe('1.23e+202');
            }
        );

        test(
            'should support the X (Hexadecimal) format',
            () => {
                expect(formatNumber(255, 'X')).toBe('FF');
                expect(formatNumber(-1, 'x')).toBe('ffffffff');
                expect(formatNumber(255, 'X4')).toBe('00FF');
                expect(formatNumber(-1, 'X4')).toBe('FFFFFFFF');
                expect(formatNumber(0x2045e, 'x')).toBe('2045e');
                expect(formatNumber(0x2045e, 'X')).toBe('2045E');
                expect(formatNumber(0x2045e, 'X8')).toBe('0002045E');
                expect(formatNumber(123456789, 'X')).toBe('75BCD15');
                expect(formatNumber(123456789, 'X2')).toBe('75BCD15');
            }
        );

        test(
            'should support the Zero placeholder',
            () => {
                expect(formatNumber(1234.5678, '00000')).toBe('01235');
                expect(formatNumber(0.45678, '0.00')).toBe('0.46');
                expect(formatNumber(123, '00000')).toBe('00123');
                expect(formatNumber(1.2, '0.00')).toBe('1.20');
                expect(formatNumber(1.2, '00.00')).toBe('01.20');
                expect(formatNumber(0.56, '0.0')).toBe('0.6');
                expect(formatNumber(1234567890, '0,0')).toBe('1,234,567,890');
                expect(formatNumber(1234.567890, '0,0.00')).toBe('1,234.57');
            }
        );

        test(
            'should support the Digit placeholder',
            () => {
                expect(formatNumber(1234.5678, '#####')).toBe('1235');
                expect(formatNumber(0.45678, '#.##')).toBe('.46');
                expect(formatNumber(1.2, '#.##')).toBe('1.2');
                expect(formatNumber(123, '#####')).toBe('123');
                expect(formatNumber(123456, '[##-##-##]')).toBe('[12-34-56]');
                expect(formatNumber(1234567890, '#')).toBe('1234567890');
                expect(formatNumber(1234567890, '(###) ###-####')).toBe('(123) 456-7890');
            }
        );

        test(
            'should support the Decimal Point',
            () => {
                expect(formatNumber(0.45678, '0.00')).toBe('0.46');
                expect(formatNumber(1.2, '0.00')).toBe('1.20');
                expect(formatNumber(1.2, '00.00')).toBe('01.20');
                expect(formatNumber(1.2, '0#.00')).toBe('01.20');
                expect(formatNumber(1.2, '00.#0')).toBe('01.20');
                expect(formatNumber(0.086, '#0.##%')).toBe('8.6%');
                expect(formatNumber(86000, '0.###E+0')).toBe('8.6E+4');
            }
        );

        test(
            'should support the Group Separator',
            () => {
                expect(formatNumber(2147483647, '##,#')).toBe('2,147,483,647');
                expect(formatNumber(2147483647, '#.#,#')).toBe('2147483647');
                expect(formatNumber(2147483647, '#,#,,')).toBe('2,147');
                expect(formatNumber(1234567890, '#,#')).toBe('1,234,567,890');
                expect(formatNumber(1234567890, '#,##0,,')).toBe('1,235');
            }
        );

        test(
            'should support the Percentage Placeholder',
            () => {
                expect(formatNumber(0.3697, '%#0.00')).toBe('%36.97');
                expect(formatNumber(0.3697, '#0.%00')).toBe('36.%97');
                expect(formatNumber(0.3697, '##.0%')).toBe('37.0%');
                expect(formatNumber(0.086, '#0.##%')).toBe('8.6%');
            }
        );

        test(
            'should support the Per mille Placeholder',
            () => {
                expect(formatNumber(0.03697, '#0.00‰')).toBe('36.97‰');
                expect(formatNumber(0.00354, '#0.## ‰')).toBe('3.54 ‰');
                expect(formatNumber(0.00354, '‰#0.##')).toBe('‰3.54');
            }
        );

        test(
            'should support the Per Ten Thousand Placeholder',
            () => {
                expect(formatNumber(0.03697, '#0.00‱')).toBe('369.70‱');
                expect(formatNumber(0.00354, '#0.## ‱')).toBe('35.4 ‱');
                expect(formatNumber(0.00354, '‱#0.##')).toBe('‱35.4');
            }
        );

        test(
            'should support the Exponential',
            () => {
                expect(formatNumber(987654, '#0.0e0')).toBe('98.8e4');
                expect(formatNumber(1503.92311, '0.0##e+00')).toBe('1.504e+03');
                expect(formatNumber(1503.92311, '0.0##e00')).toBe('1.504e03');
                expect(formatNumber(1.89011385E-16, '0.0e+00')).toBe('1.9e-16');
                expect(formatNumber(1.89011385E-16, '0.0e00')).toBe('1.9e-16');
                expect(formatNumber(86000, '0.###E+0')).toBe('8.6E+4');
                expect(formatNumber(86000, '0.###E+000')).toBe('8.6E+004');
                expect(formatNumber(86000, '0.###E-001')).toBe('8.6E041');
                expect(formatNumber(86000, '0.###E+')).toBe('86000E+');
                expect(formatNumber(1.89011385E-16, '00e+00.00')).toBe('18e-17.90');
                expect(formatNumber(1.89011385E-16, '00e+01.00')).toBe('18e-171.90');
                expect(formatNumber(1.89011385E-16, '00e+1.00')).toBe('00e+1.00');
            }
        );

        test(
            'should support the Escape Character',
            () => {
                expect(formatNumber(987654, '\\###00\\#')).toBe('#987654#');
                expect(formatNumber(123, '\\#\\#\\# ##0 dollars and \\0\\0 cents \\#\\#\\#')).toBe('### 123 dollars and 00 cents ###');
                expect(formatNumber(123, '\\\\\\\\\\\\ ##0 dollars and \\0\\0 cents \\\\\\\\\\\\')).toBe('\\\\\\ 123 dollars and 00 cents \\\\\\');
                expect(formatNumber(987654, '0\\')).toBe('987654\\');
                expect(formatNumber(987654, '0.0\\')).toBe('987654.0\\');
            }
        );

        test(
            'should support the Literal String (\') delimiter',
            () => {
                expect(formatNumber(68, "# 'degrees'")).toBe('68 degrees');
                expect(formatNumber(68, "#' degrees'")).toBe('68 degrees');
                expect(formatNumber(123.8, '#,##0.0K')).toBe('123.8K');
                expect(formatNumber(9.3, '##.0\\%')).toBe('9.3%');
                expect(formatNumber(9.3, "\\'##\\'")).toBe("'9'");
                expect(formatNumber(9.3, '\\\\##\\\\')).toBe('\\9\\');
                expect(formatNumber(9.3, "##.0'%'")).toBe('9.3%');
                expect(formatNumber(9.3, "'\\'##'\\'")).toBe('\\9\\');
            }
        );

        test(
            'should support the Literal String (") delimiter',
            () => {
                expect(formatNumber(68, '# "degrees"')).toBe('68 degrees');
                expect(formatNumber(68, '#" degrees"')).toBe('68 degrees');
                expect(formatNumber(9.3, '\\"##\\"')).toBe('"9"');
            }
        );

        test(
            'should support the Section separator',
            () => {
                expect(formatNumber(12.345, '#0.0#;(#0.0#);-\\0-')).toBe('12.35');
                expect(formatNumber(0, '#0.0#;(#0.0#);-\\0-')).toBe('-0-');
                expect(formatNumber(-12.345, '#0.0#;(#0.0#);-\\0-')).toBe('(12.35)');
                expect(formatNumber(12.345, '#0.0#;(#0.0#)')).toBe('12.35');
                expect(formatNumber(0, '#0.0#;(#0.0#)')).toBe('0.0');
                expect(formatNumber(-12.345, '#0.0#;(#0.0#)')).toBe('(12.35)');
                expect(formatNumber(1234, '##;(##);**Zero**')).toBe('1234');
                expect(formatNumber(-1234, '##;(##);**Zero**')).toBe('(1234)');
                expect(formatNumber(0, '##;(##);**Zero**')).toBe('**Zero**');
            }
        );

        test(
            'should support the Other characters',
            () => {
                expect(formatNumber(68, '# °')).toBe('68 °');
            }
        );

        test(
            'should support multiple formats',
            () => {
                expect(formatNumber(-1, '"plus";"minus";"zero"')).toBe('minus');
                expect(formatNumber(0,  '"plus";"minus";"zero"')).toBe('zero');
                expect(formatNumber(1,  '"plus";"minus";"zero"')).toBe('plus');
                expect(formatNumber(-1, '"plus";"minus"')).toBe('minus');
                expect(formatNumber(0,  '"plus";"minus"')).toBe('plus');
                expect(formatNumber(1,  '"plus";"minus"')).toBe('plus');
                expect(formatNumber(-1, '"plus"')).toBe('-plus');
                expect(formatNumber(0,  '"plus"')).toBe('plus');
                expect(formatNumber(1,  '"plus"')).toBe('plus');
            }
        );

        test(
            'should support big numbers',
            () => {
                expect(formatNumber(1.23e50, '0')).toBe('123000000000000000000000000000000000000000000000000');
            }
        );
    }
);
