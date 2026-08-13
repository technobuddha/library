import { isMap } from '../is-map.ts';

describe('isMap', () => {
  test('returns true for Map instances', () => {
    expect(isMap(new Map())).toBeTrue();
    expect(isMap(new Map([['a', 1]]))).toBeTrue();
  });

  test('returns false for non-Map values', () => {
    expect(isMap(null)).toBeFalse();
    expect(isMap(undefined)).toBeFalse();
    expect(isMap({})).toBeFalse();
    expect(isMap([])).toBeFalse();
    expect(isMap(new Set())).toBeFalse();
    expect(isMap('map')).toBeFalse();
  });

  test('returns true for cross-realm Map objects', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    const map = iframe.contentWindow?.Map;
    if (!map) {
      return;
    }

    expect(isMap(new map())).toBeTrue();

    document.body.removeChild(iframe);
  });
});
