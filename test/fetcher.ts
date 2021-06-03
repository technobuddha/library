import expect  from '../util/expect';
import fetcher from '../src/fetcher';
import fetch   from 'node-fetch';

const URL_SUCCESS = 'http://www.google.com:80';
const URL_TIMEOUT = 'http://www.google.com:81';

describe(
    'fetcher',
    () => {
        beforeEach(
            () => {
                global.fetch = fetch as any;
            }
        );

        test(
            'fetch data',
            async () => {
                return fetcher(URL_SUCCESS).then(
                    response =>
                        expect(response.status).toBe(200)
                );
            }
        );

        test(
            'timeout',
            async () => {
                return fetcher(URL_TIMEOUT, { timeout: 100 }).then(
                    _response => {
                        fail('Response should timeout');
                    }
                ).catch(
                    err =>
                        expect(err.name).toBe('TimeoutError')
                );
            }
        );

        test(
            'supply user AbortController',
            async () => {
                const ac = new AbortController();

                setTimeout(() => { ac.abort(); }, 100);
                return fetcher(URL_TIMEOUT, { signal: ac.signal }).then(
                    _response => {
                        fail('Response should timeout');
                    }
                ).catch(
                    err =>
                        expect(err.name).toBe('AbortError')
                );
            }

        )
    }
);
