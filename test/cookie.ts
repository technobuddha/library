/* eslint-disable unicorn/no-document-cookie */
import expect from '#util/expect';
import cookie from '../src/cookie';

describe(
    'cookie',
    () => {
        document.cookie = 'key1=value1';
        document.cookie = 'key2=value2';

        test(
            'should get cookies',
            () => {
                expect(cookie.get('key1')).toEqual('value1');
                expect(cookie.get('key2')).toEqual('value2');
            }
        );

        test(
            'find all cookie names',
            () => {
                expect(cookie.names()).toEqual([ 'key1', 'key2' ]);
            }
        );

        test(
            'Should add cookies',
            () => {
                cookie.add('key3', 'value3');
                expect(cookie.get('key3')).toEqual('value3');
            }
        );

        test(
            'Should add cookies with Date expire',
            () => {
                cookie.add('key3', 'value3', new Date('9999-12-31'));
                expect(cookie.get('key3')).toEqual('value3');
            }
        );

        test(
            'Should add cookies with string expire',
            () => {
                cookie.add('key3', 'value3', '9999-12-31');
                expect(cookie.get('key3')).toEqual('value3');
            }
        );

        test(
            'Should delete cookies',
            () => {
                cookie.del('key2');
                expect(cookie.get('key2')).toBeUndefined();
            }
        );
    }
);
