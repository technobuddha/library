import { startCase } from '../start-case.ts';

describe('startCase', () => {
  test('should convert sentences', () => {
    expect(
      startCase('Now, is the time for all good men to come to the aid of their country.'),
    ).toBe('Now, Is The Time For All Good Men To Come To The Aid Of Their Country.');
  });

  test('should convert to lower case', () => {
    expect(
      startCase('Now, IS the time for ALL good men to come to the AID of their country.'),
    ).toBe('Now, Is The Time For All Good Men To Come To The Aid Of Their Country.');
    expect(
      startCase('Now, is the time for All gOOd men to come to the aid of their country.'),
    ).toBe('Now, Is The Time For All Good Men To Come To The Aid Of Their Country.');
  });
});
