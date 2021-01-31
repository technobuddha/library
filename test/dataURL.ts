import 'mocha';
import { expect }  from 'chai';
import dataURL     from '../src/dataURL';

describe(
    'dataURL',
    () => {
        it(
            'should create dataURLs',
            () => {
                expect(dataURL(new Int8Array(5), 'image/jpeg')).to.equal('data:image/jpeg;base64,AAAAAAA=');
            }
        );
    }
);
