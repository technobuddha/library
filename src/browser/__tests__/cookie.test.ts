import { cookies } from '../cookies.ts';

describe('cookies', () => {
  // One large test to avoid clearing cookies between tests

  test('all operations should work', () => {
    document.cookie = 'key1=value1';
    document.cookie = 'key2=value2';

    expect(cookies.get('key1')).toBe('value1');
    expect(cookies.get('key2')).toBe('value2');

    expect(cookies.names()).toEqual(['key1', 'key2']);

    cookies.set('key3', 'value3');
    expect(cookies.get('key3')).toBe('value3');
    expect(cookies.names()).toEqual(['key1', 'key2', 'key3']);

    cookies.set('key4', 'value4', new Date('9999-12-31'));
    expect(cookies.names()).toEqual(['key1', 'key2', 'key3', 'key4']);

    cookies.set('key5', 'value5', '9999-12-31');

    cookies.delete('key2');
    expect(cookies.names()).toEqual(['key1', 'key3', 'key4', 'key5']);

    cookies.clear();
    expect(cookies.names()).toEqual([]);
  });

  test('empty cookies', () => {
    expect(cookies.names()).toEqual([]);
  });
});
