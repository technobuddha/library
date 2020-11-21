import 'mocha';
import { expect } from 'chai';
import angleBetweenPoints from '../angleBetweenPoints';

describe(
    'angleBetweenPoints',
    () => {
        it(
            'call with objects',
            () => {
                expect(angleBetweenPoints({ x:   0, y:   0 }, { x:  10, y:   0 })).to.equal(0*Math.PI/4);
                expect(angleBetweenPoints({ x:   0, y:   0 }, { x:  10, y:  10 })).to.equal(1*Math.PI/4);
                expect(angleBetweenPoints({ x:   0, y:   0 }, { x:   0, y:  10 })).to.equal(2*Math.PI/4);
                expect(angleBetweenPoints({ x:   0, y:   0 }, { x: -10, y:  10 })).to.equal(3*Math.PI/4);
                expect(angleBetweenPoints({ x:   0, y:   0 }, { x: -10, y:   0 })).to.equal(4*Math.PI/4);
                expect(angleBetweenPoints({ x:   0, y:   0 }, { x: -10, y: -10 })).to.equal(5*Math.PI/4);
                expect(angleBetweenPoints({ x:   0, y:   0 }, { x:   0, y: -10 })).to.equal(6*Math.PI/4);
                expect(angleBetweenPoints({ x:   0, y:   0 }, { x:  10, y: -10 })).to.equal(7*Math.PI/4);
                expect(angleBetweenPoints({ x:  10, y:   0 }, { x:   0, y:   0 })).to.equal(4*Math.PI/4);
                expect(angleBetweenPoints({ x:  10, y:  10 }, { x:   0, y:   0 })).to.equal(5*Math.PI/4);
                expect(angleBetweenPoints({ x:   0, y:  10 }, { x:   0, y:   0 })).to.equal(6*Math.PI/4);
                expect(angleBetweenPoints({ x: -10, y:  10 }, { x:   0, y:   0 })).to.equal(7*Math.PI/4);
                expect(angleBetweenPoints({ x: -10, y:   0 }, { x:   0, y:   0 })).to.equal(0*Math.PI/4);
                expect(angleBetweenPoints({ x: -10, y: -10 }, { x:   0, y:   0 })).to.equal(1*Math.PI/4);
                expect(angleBetweenPoints({ x:   0, y: -10 }, { x:   0, y:   0 })).to.equal(2*Math.PI/4);
                expect(angleBetweenPoints({ x:  10, y: -10 }, { x:   0, y:   0 })).to.equal(3*Math.PI/4);
            }
        );
    }
);
