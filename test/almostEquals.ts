import 'mocha';
import { expect }   from 'chai';
import almostEquals from '../almostEquals';

describe(
	'almostEquals',
	() => {
		it(
			'should handle numbers within EPSILON distance',
			() => {
				expect(almostEquals(1, 1 + Number.EPSILON*1)).to.equal(true);
				expect(almostEquals(1, 1 - Number.EPSILON*1)).to.equal(true);
				expect(almostEquals(1, 1 + Number.EPSILON*2)).to.equal(false);
				expect(almostEquals(1, 1 - Number.EPSILON*2)).to.equal(false);
			}
		);

		it(
			'should allow specification of tolerance',
			() => {
				expect(almostEquals(1, 1.001, {tolerance: 0.001})).to.equal(true);
				expect(almostEquals(1, 0.999, {tolerance: 0.001})).to.equal(true);
				expect(almostEquals(1, 1.002, {tolerance: 0.001})).to.equal(false);
				expect(almostEquals(1, 0.998, {tolerance: 0.001})).to.equal(false);
			}
		);
	}
);

