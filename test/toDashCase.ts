import 'mocha';
import { expect } from 'chai';
import toDashCase from '../src/toDashCase';

describe(
    'toDashCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toDashCase('now is the time for all good men to come to the aid of their country'))
                .to.equal('now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country');
            }
        );

        it(
            'should not change remaining case',
            () => {
                expect(toDashCase('now IS the time for ALL good men to come to the AID of their country'))
                .to.equal('now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country');
            }
        );
    }
);
