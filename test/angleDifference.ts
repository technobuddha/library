import 'mocha';
import { expect }      from 'chai';
import angleDifference from '../angleDifference';


describe(
    'angleDifference',
    () => {
        it(
            'should compute positive angles',
            () => {
                expect(angleDifference(0*Math.PI/4, 0*Math.PI/4)).to.equal( 0*Math.PI/4);
                expect(angleDifference(0*Math.PI/4, 1*Math.PI/4)).to.equal( 1*Math.PI/4);
                expect(angleDifference(0*Math.PI/4, 2*Math.PI/4)).to.equal( 2*Math.PI/4);
                expect(angleDifference(0*Math.PI/4, 3*Math.PI/4)).to.equal( 3*Math.PI/4);
                expect(angleDifference(0*Math.PI/4, 4*Math.PI/4)).to.equal( 4*Math.PI/4);
                expect(angleDifference(0*Math.PI/4, 5*Math.PI/4)).to.equal(-3*Math.PI/4);
                expect(angleDifference(0*Math.PI/4, 6*Math.PI/4)).to.equal(-2*Math.PI/4);
                expect(angleDifference(0*Math.PI/4, 7*Math.PI/4)).to.equal(-1*Math.PI/4);
                expect(angleDifference(0*Math.PI/4, 8*Math.PI/4)).to.equal( 0*Math.PI/4);
            }
        );
    }
);

