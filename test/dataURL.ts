import expect from '../util/expect';
import dataURL     from '../src/dataURL';

describe(
    'dataURL',
    () => {
        test(
            'should create dataURLs',
            () => {
                expect(dataURL(new Int8Array(5), 'image/jpeg')).toBe('data:image/jpeg;base64,AAAAAAA=');
            }
        );

        test(
            'should work with raw ArrayBuffers',
            () => {
                expect(dataURL(new ArrayBuffer(5), 'image/jpeg')).toBe('data:image/jpeg;base64,AAAAAAA=');
            }
        );
    }
);
