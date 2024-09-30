// import expect from '#util/expect';
import ensureSuffix from './ensure-suffix';

describe('ensureSuffix', () => {
  test('should add Suffixes when needed', () => {
    expect(ensureSuffix('bletch', '-foobie')).toBe('bletch-foobie');
    expect(ensureSuffix('bletch-foobie', '-foobie')).toBe('bletch-foobie');
    expect(ensureSuffix('bletchfoobie', '-foobie')).toBe('bletchfoobie-foobie');
  });
});
