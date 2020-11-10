import 'mocha';
import { expect }  from 'chai';
import isPrimitive from '../isPrimitive';


describe(
    'isPrimitive',
    () => {
        it(
            'should detect primitives',
            () => {
                expect(isPrimitive(null)).to.equal(true);
                expect(isPrimitive(undefined)).to.equal(true);
                expect(isPrimitive("jabberwocky")).to.equal(true);
                expect(isPrimitive(0)).to.equal(true);
                expect(isPrimitive(Symbol())).to.equal(true);
                expect(isPrimitive({})).to.equal(false);
                expect(isPrimitive([])).to.equal(false);
                expect(isPrimitive(new Date())).to.equal(false);
            }
        );
    }
);

