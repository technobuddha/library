import expect from '../util/expect';
import tag  from '../src/tag';

describe(
    'tag',
    () => {
        test(
            'create a tag',
            () => {
                expect(tag('text')).toEqual('<span>text</span>');
            }
        );

        test(
            'should escape HTML',
            () => {
                expect(tag('<tag>')).toBe('<span>&lt;tag&gt;</span>');
            }
        );

        test(
            'can specify tag name',
            () => {
                expect(tag('text', 'div')).toBe('<div>text</div>');
            }
        );

        test(
            'can specify attributes',
            () => {
                expect(tag('text', 'tag', { a: 'a', gt: '>' })).toBe('<tag a="a" gt="&gt;">text</tag>');
            }
        );
    }
);
