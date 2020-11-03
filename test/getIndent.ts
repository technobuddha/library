import 'mocha';
import { expect } from 'chai';
import getIndent  from '../getIndent';


describe(
    'getgetIndent',
    () => {
        it(
            'should getIndent lines',
            () => {
                expect(getIndent('It was the best of times.\nIt was the worst of times.')).to.equal(0);
                expect(getIndent('\tIt was the best of times.\n\tIt was the worst of times.')).to.equal(1);
                expect(getIndent('\tIt was the best of times.\n\t\tIt was the worst of times.')).to.equal(1);
            }
        );

        it(
            'should allow to specify indenter',
            () => {
                expect(getIndent('It was the best of times.\nIt was the worst of times.', { indenter: '* ' })).to.equal(0);
                expect(getIndent('* It was the best of times.\n* It was the worst of times.', { indenter: '* ' })).to.equal(1);
                expect(getIndent('* It was the best of times.\n* * It was the worst of times.', { indenter: '* ' })).to.equal(1);
            }
        );
    }
);

