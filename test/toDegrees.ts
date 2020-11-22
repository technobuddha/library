import 'mocha';
import { expect } from 'chai';
import toDegrees from '../src/toDegrees';

describe(
    'toDegrees',
    () => {
        it(
            'converts positive angles',
            () => {
                expect(toDegrees( 0*Math.PI/4)).to.almost.equal(  0.0);
                expect(toDegrees( 1*Math.PI/4)).to.almost.equal( 45.0);
                expect(toDegrees( 2*Math.PI/4)).to.almost.equal( 90.0);
                expect(toDegrees( 3*Math.PI/4)).to.almost.equal(135.0);
                expect(toDegrees( 4*Math.PI/4)).to.almost.equal(180.0);
                expect(toDegrees( 5*Math.PI/4)).to.almost.equal(225.0);
                expect(toDegrees( 6*Math.PI/4)).to.almost.equal(270.0);
                expect(toDegrees( 7*Math.PI/4)).to.almost.equal(315.0);
            }
        );

        it(
            'converts negative angles',
            () => {
                expect(toDegrees(-0*Math.PI/4)).to.almost.equal(-  0.0);
                expect(toDegrees(-1*Math.PI/4)).to.almost.equal(- 45.0);
                expect(toDegrees(-2*Math.PI/4)).to.almost.equal(- 90.0);
                expect(toDegrees(-3*Math.PI/4)).to.almost.equal(-135.0);
                expect(toDegrees(-4*Math.PI/4)).to.almost.equal(-180.0);
                expect(toDegrees(-5*Math.PI/4)).to.almost.equal(-225.0);
                expect(toDegrees(-6*Math.PI/4)).to.almost.equal(-270.0);
                expect(toDegrees(-7*Math.PI/4)).to.almost.equal(-315.0);
            }
        );

        it(
            'converts positive angles greater than full',
            () => {
                expect(toDegrees( 8*Math.PI/4)).to.almost.equal( 360.0);
                expect(toDegrees( 9*Math.PI/4)).to.almost.equal( 405.0);
                expect(toDegrees(10*Math.PI/4)).to.almost.equal( 450.0);
                expect(toDegrees(11*Math.PI/4)).to.almost.equal( 495.0);
                expect(toDegrees(12*Math.PI/4)).to.almost.equal( 540.0);
                expect(toDegrees(13*Math.PI/4)).to.almost.equal( 585.0);
                expect(toDegrees(14*Math.PI/4)).to.almost.equal( 630.0);
                expect(toDegrees(15*Math.PI/4)).to.almost.equal( 675.0);
            }
        );
    }
);
