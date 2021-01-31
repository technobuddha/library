import 'mocha';
import { expect } from 'chai';
import toRadians from '../src/toRadians';

describe(
    'toRadians',
    () => {
        it(
            'converts positive angles',
            () => {
                expect(toRadians(0)).to.equal(0 * Math.PI / 2);
                expect(toRadians(90)).to.equal(Number(Math.PI) / 2);
                expect(toRadians(180)).to.equal(2 * Math.PI / 2);
                expect(toRadians(270)).to.equal(3 * Math.PI / 2);
                expect(toRadians(360)).to.equal(4 * Math.PI / 2);
                expect(toRadians(450)).to.equal(5 * Math.PI / 2);
                expect(toRadians(540)).to.equal(6 * Math.PI / 2);
                expect(toRadians(630)).to.equal(7 * Math.PI / 2);
                expect(toRadians(720)).to.equal(8 * Math.PI / 2);
            }
        );

        it(
            'converts negative angles',
            () => {
                expect(toRadians(-0)).to.equal(0 * Math.PI / 2);
                expect(toRadians(-90)).to.equal(-1 * Math.PI / 2);
                expect(toRadians(-180)).to.equal(-2 * Math.PI / 2);
                expect(toRadians(-270)).to.equal(-3 * Math.PI / 2);
                expect(toRadians(-360)).to.equal(-4 * Math.PI / 2);
                expect(toRadians(-450)).to.equal(-5 * Math.PI / 2);
                expect(toRadians(-540)).to.equal(-6 * Math.PI / 2);
                expect(toRadians(-630)).to.equal(-7 * Math.PI / 2);
                expect(toRadians(-720)).to.equal(-8 * Math.PI / 2);
            }
        );
    }
);
