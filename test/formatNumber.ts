import 'mocha';
import { expect }   from 'chai';
import formatNumber from '../src/formatNumber';

describe(
    'formatNumber',
    () => {
        it(
            'should support the C (Currency) format',
            () => {
                expect(formatNumber(123.456, 'C')).to.equal('$123.46');
                expect(formatNumber(123.456, 'C2')).to.equal('$123.46');
                expect(formatNumber(0.456, 'C')).to.equal('$0.46');
                expect(formatNumber(1234.5678, 'C')).to.equal('$1,234.57');
                expect(formatNumber(-123.456, 'C3')).to.equal('($123.456)');
                expect(formatNumber(-1234.5678, 'C3')).to.equal('($1,234.568)');
                expect(formatNumber(0, 'C')).to.equal('$0.00');
                expect(formatNumber(12345.6789, 'C')).to.equal('$12,345.68');
                expect(formatNumber(12345.6789, 'C3')).to.equal('$12,345.679');
            }
        );

        it(
            'should support the D (Decimal) format',
            () => {
                expect(formatNumber(1234, 'D')).to.equal('1234');
                expect(formatNumber(-1234, 'D6')).to.equal('-001234');
                expect(formatNumber(0, 'D6')).to.equal('000000');
                expect(formatNumber(12345, 'D')).to.equal('12345');
                expect(formatNumber(12345, 'D8')).to.equal('00012345');
                expect(formatNumber(-12345, 'D')).to.equal('-12345');
                expect(formatNumber(-12345, 'D8')).to.equal('-00012345');
            }
        );

        it(
            'should support the E (Exponential) format',
            () => {
                expect(formatNumber(1052.0329112756, 'E')).to.equal('1.052033E+003');
                expect(formatNumber(-1052.0329112756, 'e2')).to.equal('-1.05e+003');
                expect(formatNumber(0, 'E')).to.equal('0.000000E+000');
                expect(formatNumber(12345.6789, 'E')).to.equal('1.234568E+004');
                expect(formatNumber(12345.6789, 'E10')).to.equal('1.2345678900E+004');
                expect(formatNumber(12345.6789, 'e4')).to.equal('1.2346e+004');
            }
        );

        it(
            'should support the F (Fixed) format',
            () => {
                expect(formatNumber(1234.567, 'F')).to.equal('1234.57');
                expect(formatNumber(1234, 'F1')).to.equal('1234.0');
                expect(formatNumber(0.045, 'F')).to.equal('0.05');
                expect(formatNumber(-1234.56, 'F4')).to.equal('-1234.5600');
                expect(formatNumber(1.23456e100, 'F')).to.equal('12345600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000.00');
                expect(formatNumber(0, 'F4')).to.equal('0.0000');
                expect(formatNumber(17843, 'F')).to.equal('17843.00');
                expect(formatNumber(-29541, 'F3')).to.equal('-29541.000');
                expect(formatNumber(18934.1879, 'F')).to.equal('18934.19');
                expect(formatNumber(18934.1879, 'F0')).to.equal('18934');
                expect(formatNumber(-1898300.1987, 'F1')).to.equal('-1898300.2');
            }
        );

        it(
            'should support the G (General) format',
            () => {
                expect(formatNumber(-123.456, 'G')).to.equal('-123.456');
                expect(formatNumber(123.4546, 'G4')).to.equal('123.5');
                expect(formatNumber(-1.234567890e-25, 'G')).to.equal('-1.23456789E-25');
                expect(formatNumber(12345.6789, 'G')).to.equal('12345.6789');
                expect(formatNumber(12345.6789, 'G7')).to.equal('12345.68');
                expect(formatNumber(0.0000023, 'G')).to.equal('2.3E-06');
                expect(formatNumber(0.0023, 'G')).to.equal('0.0023');
                expect(formatNumber(1234, 'G2')).to.equal('1200');
                expect(formatNumber(Math.PI, 'G5')).to.equal('3.1416');
            }
        );

        it(
            'should support the N (Number) format',
            () => {
                expect(formatNumber(1234.567, 'N')).to.equal('1,234.57');
                expect(formatNumber(1234, 'N1')).to.equal('1,234.0');
                expect(formatNumber(-1234.56, 'N3')).to.equal('-1,234.560');
                expect(formatNumber(-12445.6789, 'N')).to.equal('-12,445.68');
                expect(formatNumber(-12445.6789, 'N1')).to.equal('-12,445.7');
                expect(formatNumber(123456789, 'N1')).to.equal('123,456,789.0');
            }
        );

        it(
            'should support the P (Percent) format',
            () => {
                expect(formatNumber(1, 'P')).to.equal('100.00 %');
                expect(formatNumber(-0.39678, 'P1')).to.equal('-39.7 %');
                expect(formatNumber(0.2468013, 'P')).to.equal('24.68 %');
                expect(formatNumber(0.2468013, 'P1')).to.equal('24.7 %');
            }
        );

        it(
            'should support the R (Round-trip) format',
            () => {
                expect(formatNumber(123456789.12345678, 'R')).to.equal('123456789.12345678');
                expect(formatNumber(-123456789.12345678, 'R')).to.equal('-123456789.12345678');
                expect(formatNumber(0.6822871999174, 'R')).to.equal('0.6822871999174');
            }
        );

        it(
            'should support the X (Hexadecimal) format',
            () => {
                expect(formatNumber(255, 'X')).to.equal('FF');
                expect(formatNumber(-1, 'x')).to.equal('ffffffff');
                expect(formatNumber(255, 'X4')).to.equal('00FF');
                expect(formatNumber(-1, 'X4')).to.equal('FFFFFFFF');
                expect(formatNumber(0x2045e, 'x')).to.equal('2045e');
                expect(formatNumber(0x2045e, 'X')).to.equal('2045E');
                expect(formatNumber(0x2045e, 'X8')).to.equal('0002045E');
                expect(formatNumber(123456789, 'X')).to.equal('75BCD15');
                expect(formatNumber(123456789, 'X2')).to.equal('75BCD15');
            }
        );

        it(
            'should support the Zero placeholder',
            () => {
                expect(formatNumber(1234.5678, '00000')).to.equal('01235');
                expect(formatNumber(0.45678, '0.00')).to.equal('0.46');
                expect(formatNumber(123, '00000')).to.equal('00123');
                expect(formatNumber(1.2, '0.00')).to.equal('1.20');
                expect(formatNumber(1.2, '00.00')).to.equal('01.20');
                expect(formatNumber(0.56, '0.0')).to.equal('0.6');
                expect(formatNumber(1234567890, '0,0')).to.equal('1,234,567,890');
                expect(formatNumber(1234.567890, '0,0.00')).to.equal('1,234.57');
            }
        );

        it(
            'should support the Digit placeholder',
            () => {
                expect(formatNumber(1234.5678, '#####')).to.equal('1235');
                expect(formatNumber(0.45678, '#.##')).to.equal('.46');
                expect(formatNumber(1.2, '#.##')).to.equal('1.2');
                expect(formatNumber(123, '#####')).to.equal('123');
                expect(formatNumber(123456, '[##-##-##]')).to.equal('[12-34-56]');
                expect(formatNumber(1234567890, '#')).to.equal('1234567890');
                expect(formatNumber(1234567890, '(###) ###-####')).to.equal('(123) 456-7890');
            }
        );

        it(
            'should support the Decimal Point',
            () => {
                expect(formatNumber(0.45678, '0.00')).to.equal('0.46');
                expect(formatNumber(1.2, '0.00')).to.equal('1.20');
                expect(formatNumber(1.2, '00.00')).to.equal('01.20');
                expect(formatNumber(0.086, '#0.##%')).to.equal('8.6%');
                expect(formatNumber(86000, '0.###E+0')).to.equal('8.6E+4');
            }
        );

        it(
            'should support the Group Separator',
            () => {
                expect(formatNumber(2147483647, '##,#')).to.equal('2,147,483,647');
                expect(formatNumber(2147483647, '#,#,,')).to.equal('2,147');
                expect(formatNumber(1234567890, '#,#')).to.equal('1,234,567,890');
                expect(formatNumber(1234567890, '#,##0,,')).to.equal('1,235');
            }
        );

        it(
            'should support the Percentage Placeholder',
            () => {
                expect(formatNumber(0.3697, '%#0.00')).to.equal('%36.97');
                expect(formatNumber(0.3697, '##.0%')).to.equal('37.0%');
                expect(formatNumber(0.086, '#0.##%')).to.equal('8.6%');
            }
        );

        it(
            'should support the Per mille Placeholder',
            () => {
                expect(formatNumber(0.03697, '#0.00‰')).to.equal('36.97‰');
                expect(formatNumber(0.00354, '#0.## ‰')).to.equal('3.54 ‰');
            }
        );

        it(
            'should support the Exponential',
            () => {
                expect(formatNumber(987654, '#0.0e0')).to.equal('98.8e4');
                expect(formatNumber(1503.92311, '0.0##e+00')).to.equal('1.504e+03');
                expect(formatNumber(1.89011385E-16, '0.0e+00')).to.equal('1.9e-16');
                expect(formatNumber(86000, '0.###E+0')).to.equal('8.6E+4');
                expect(formatNumber(86000, '0.###E+000')).to.equal('8.6E+004');
                expect(formatNumber(86000, '0.###E-000')).to.equal('8.6E004');
            }
        );

        it(
            'should support the Escape Character',
            () => {
                expect(formatNumber(987654, '\\###00\\#')).to.equal('#987654#');
                expect(formatNumber(123, '\\#\\#\\# ##0 dollars and \\0\\0 cents \\#\\#\\#')).to.equal('### 123 dollars and 00 cents ###');
                expect(formatNumber(123, '\\\\\\\\\\\\ ##0 dollars and \\0\\0 cents \\\\\\\\\\\\')).to.equal('\\\\\\ 123 dollars and 00 cents \\\\\\');
            }
        );

        it(
            'should support the Literal String delimiter',
            () => {
                expect(formatNumber(68, "# 'degrees'")).to.equal('68 degrees');
                expect(formatNumber(68, "#' degrees'")).to.equal('68 degrees');
                expect(formatNumber(123.8, '#,##0.0K')).to.equal('123.8K');
                expect(formatNumber(9.3, '##.0\\%')).to.equal('9.3%');
                expect(formatNumber(9.3, "\\'##\\'")).to.equal("'9'");
                expect(formatNumber(9.3, '\\\\##\\\\')).to.equal('\\9\\');
                expect(formatNumber(9.3, "##.0'%'")).to.equal('9.3%');
                expect(formatNumber(9.3, "'\\'##'\\'")).to.equal('\\9\\');
            }
        );

        it(
            'should support the Section separator',
            () => {
                expect(formatNumber(12.345, '#0.0#;(#0.0#);-\\0-')).to.equal('12.35');
                expect(formatNumber(0, '#0.0#;(#0.0#);-\\0-')).to.equal('-0-');
                expect(formatNumber(-12.345, '#0.0#;(#0.0#);-\\0-')).to.equal('(12.35)');
                expect(formatNumber(12.345, '#0.0#;(#0.0#)')).to.equal('12.35');
                expect(formatNumber(0, '#0.0#;(#0.0#)')).to.equal('0.0');
                expect(formatNumber(-12.345, '#0.0#;(#0.0#)')).to.equal('(12.35)');
                expect(formatNumber(1234, '##;(##);**Zero**')).to.equal('1234');
                expect(formatNumber(-1234, '##;(##);**Zero**')).to.equal('(1234)');
                expect(formatNumber(0, '##;(##);**Zero**')).to.equal('**Zero**');
            }
        );

        it(
            'should support the Other characters',
            () => {
                expect(formatNumber(68, '# °')).to.equal('68 °');
            }
        );
    }
);
