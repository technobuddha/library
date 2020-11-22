import 'mocha';
import { expect } from 'chai';
import indent     from '../src/indent';


describe(
    'indent',
    () => {
        it(
            'should indent lines',
            () => {
                expect(indent('It was the best of times.\nIt was the worst of times.')).to.equal(' It was the best of times.\n It was the worst of times.');
            }
        );

        it(
            'should allow to specify indenter',
            () => {
                expect(indent('It was the best of times.\nIt was the worst of times.', { indenter: '* ' })).to.equal('* It was the best of times.\n* It was the worst of times.');
            }
        );
    }
);

