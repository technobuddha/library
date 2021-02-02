import expect from '../util/expect';
import dataURL     from '../src/dataURL';

describe(
    'dataURL',
    () => {
        it(
            'should create dataURLs',
            () => {
                expect(dataURL(new Int8Array(5), 'image/jpeg')).toBe('data:image/jpeg;base64,AAAAAAA=');
            }
        );
    }
);
