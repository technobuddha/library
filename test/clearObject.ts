import 'mocha';
import { expect }  from 'chai';
import clearObject from '../clearObject';


describe(
    'clearObject',
    () => {
        it(
            'should clear objects',
            () => {
                let obj = { a: 1, b: 2, c: 3 }
                expect(clearObject(obj)).to.deep.equal({});
                expect(obj).to.deep.equal({});
            }
        );

        it(
            'should not clear the prototype',
            () => {
                let obj   = { a: 1, b: 2, c: 3 }
                let proto = { d: 4, e: 5, f: 6 }
                Object.setPrototypeOf(obj, proto);
                expect(clearObject(obj)).to.deep.equal({ d: 4, e: 5, f: 6 });
                expect(obj).to.deep.equal({ d: 4, e: 5, f: 6 });
                expect(proto).to.deep.equal({ d: 4, e: 5, f: 6 });
            }
        );
    }
);

