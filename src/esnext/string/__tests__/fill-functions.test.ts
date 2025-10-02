import { fillFunctions } from '../fill-functions.ts';
import { toString } from '../to-string.ts';

describe('fillFunctions', () => {
  test('should replace a single function call', () => {
    const input = 'Hello upper(world)';
    const result = fillFunctions(input, ['upper'], ([body]) => body.toUpperCase());
    expect(result).toBe('Hello WORLD');
  });

  test('should handle multiple function calls', () => {
    const input = 'upper(hello) and upper(world)';
    const result = fillFunctions(input, ['upper'], ([body]) => body.toUpperCase());
    expect(result).toBe('HELLO and WORLD');
  });

  test('should handle multiple function names', () => {
    const input = 'upper(hello) and lower(WORLD)';
    const result = fillFunctions(input, ['upper', 'lower'], ([body], name) => {
      if (name === 'upper') {
        return body.toUpperCase();
      }
      if (name === 'lower') {
        return body.toLowerCase();
      }
      return body;
    });
    expect(result).toBe('HELLO and world');
  });

  test('should handle nested parentheses in function arguments', () => {
    const input = 'fn(outer(inner))';
    const result = fillFunctions(input, ['fn'], ([body]) => `[${body}]`);
    expect(result).toBe('[outer(inner)]');
  });

  test('should handle deeply nested parentheses', () => {
    const input = 'fn(a(b(c)))';
    const result = fillFunctions(input, ['fn'], ([body]) => `<${body}>`);
    expect(result).toBe('<a(b(c))>');
  });

  test('should handle function with multiple arguments', () => {
    const input = 'add(1, 2, 3)';
    const result = fillFunctions(input, ['add'], (args) => {
      const nums = args.map((n) => Number.parseInt(n.trim()));
      return toString(nums.reduce((a, b) => a + b, 0));
    });
    expect(result).toBe('6');
  });

  test('should process multiple different functions', () => {
    const input = 'Value: add(1, 2) and multiply(3, 4)';
    const result = fillFunctions(input, ['add', 'multiply'], (args, name) => {
      const nums = args.map((n) => Number.parseInt(n.trim()));
      if (name === 'add') {
        return toString(nums[0] + nums[1]);
      }
      if (name === 'multiply') {
        return toString(nums[0] * nums[1]);
      }
      return '?';
    });
    expect(result).toBe('Value: 3 and 12');
  });

  test('should handle empty function arguments', () => {
    const input = 'test()';
    const result = fillFunctions(input, ['test'], (body) => `empty:${body}`);
    expect(result).toBe('empty:');
  });

  test('should preserve text without matching functions', () => {
    const input = 'no functions here';
    const result = fillFunctions(input, ['fn'], () => 'replaced');
    expect(result).toBe('no functions here');
  });

  test('should handle function at start of string', () => {
    const input = 'upper(start) text';
    const result = fillFunctions(input, ['upper'], ([body]) => body.toUpperCase());
    expect(result).toBe('START text');
  });

  test('should handle function at end of string', () => {
    const input = 'text upper(end)';
    const result = fillFunctions(input, ['upper'], ([body]) => body.toUpperCase());
    expect(result).toBe('text END');
  });

  test('should handle entire string as function call', () => {
    const input = 'upper(everything)';
    const result = fillFunctions(input, ['upper'], ([body]) => body.toUpperCase());
    expect(result).toBe('EVERYTHING');
  });

  test('should handle whitespace after function name', () => {
    const input = 'upper (hello)';
    const result = fillFunctions(input, ['upper'], ([body]) => body.toUpperCase());
    expect(result).toBe('HELLO');
  });

  test('should handle function name with special characters requiring escape', () => {
    const input = 'fn.test(hello)';
    const result = fillFunctions(input, ['fn.test'], ([body]) => body.toUpperCase());
    expect(result).toBe('HELLO');
  });

  test('should preserve non-matching function names', () => {
    const input = 'upper(hello) other(world)';
    const result = fillFunctions(input, ['upper'], ([body]) => body.toUpperCase());
    expect(result).toBe('HELLO other(world)');
  });

  test('should handle consecutive function calls', () => {
    const input = 'fn(a)fn(b)fn(c)';
    const result = fillFunctions(input, ['fn'], ([body]) => `[${body}]`);
    expect(result).toBe('[a][b][c]');
  });

  test('should use callback name parameter correctly', () => {
    const names: string[] = [];
    const input = 'fn1(a) fn2(b) fn1(c)';
    fillFunctions(input, ['fn1', 'fn2'], ([body], name) => {
      names.push(name);
      return body;
    });
    expect(names).toEqual(['fn1', 'fn2', 'fn1']);
  });

  test('should handle complex nested structure', () => {
    const input = 'outer(inner1(a), inner2(b))';
    const result = fillFunctions(input, ['outer'], (args) => `<${args.join(', ')}>`);
    expect(result).toBe('<inner1(a), inner2(b)>');
  });

  test('should handle quoted strings in arguments', () => {
    const input = 'fn("hello (world)")';
    const result = fillFunctions(input, ['fn'], ([body]) => body.toUpperCase());
    expect(result).toBe('"HELLO (WORLD)"');
  });

  test('should handle empty string', () => {
    const input = '';
    const result = fillFunctions(input, ['fn'], () => 'replaced');
    expect(result).toBe('');
  });

  test('should handle function with no closing parenthesis', () => {
    const input = 'fn(unclosed';
    const result = fillFunctions(input, ['fn'], () => 'replaced');
    expect(result).toBe('fn(unclosed');
  });

  test('should handle callback that returns empty string', () => {
    const input = 'text fn(remove) more';
    const result = fillFunctions(input, ['fn'], () => '');
    expect(result).toBe('text  more');
  });

  test('should handle callback that returns longer replacement', () => {
    const input = 'fn(x)';
    const result = fillFunctions(input, ['fn'], () => 'very long replacement text');
    expect(result).toBe('very long replacement text');
  });

  test('should trim function name in callback', () => {
    const input = 'upper  (hello)';
    const result = fillFunctions(input, ['upper'], ([body], name) => {
      expect(name).toBe('upper');
      return body.toUpperCase();
    });
    expect(result).toBe('HELLO');
  });

  test('should handle multiple functions with overlapping names', () => {
    const input = 'test(a) testing(b)';
    const result = fillFunctions(input, ['test', 'testing'], ([body], name) => `[${name}:${body}]`);
    expect(result).toBe('[test:a] [testing:b]');
  });

  test('should process functions in order they appear', () => {
    const order: string[] = [];
    const input = 'fn(first) fn(second) fn(third)';
    fillFunctions(input, ['fn'], ([body]) => {
      order.push(body);
      return body;
    });
    expect(order).toEqual(['first', 'second', 'third']);
  });

  test('should handle Unicode in function arguments', () => {
    const input = 'fn(hello 世界)';
    const result = fillFunctions(input, ['fn'], ([body]) => body.toUpperCase());
    expect(result).toBe('HELLO 世界');
  });

  test('should handle newlines in function arguments', () => {
    const input = 'fn(line1\nline2)';
    const result = fillFunctions(input, ['fn'], ([body]) => body.replace('\n', ' '));
    expect(result).toBe('line1 line2');
  });

  test('should handle complex real-world example', () => {
    const input = 'Calculate: add(5, 3) minus subtract(10, 4) equals add(2, 6)';
    const result = fillFunctions(input, ['add', 'subtract'], (args, name) => {
      const [a, b] = args.map((n) => Number.parseInt(n.trim()));
      if (name === 'add') {
        return toString(a + b);
      }
      if (name === 'subtract') {
        return toString(a - b);
      }
      return args.join(',');
    });
    expect(result).toBe('Calculate: 8 minus 6 equals 8');
  });

  test('should recursively process nested function calls', () => {
    const input = 'outer(inner(x))';
    const result = fillFunctions(input, ['outer', 'inner'], ([body], name) => {
      if (name === 'inner') {
        return `[${body}]`;
      }
      if (name === 'outer') {
        return `<${body}>`;
      }
      return body;
    });
    expect(result).toBe('<[x]>');
  });

  test('should handle deeply nested recursive function calls', () => {
    const input = 'fn(fn(fn(a)))';
    const result = fillFunctions(input, ['fn'], (body) => `[${body}]`);
    expect(result).toBe('[[[a]]]');
  });

  test('should handle multiple nested functions with different names', () => {
    const input = 'add(multiply(2, 3), subtract(10, 5))';
    const result = fillFunctions(input, ['add', 'multiply', 'subtract'], (args, name) => {
      const parts = args.map((n) => n.trim());
      const nums = parts.map((n) => Number.parseInt(n));

      if (name === 'add' && nums.length === 2) {
        return toString(nums[0] + nums[1]);
      }
      if (name === 'multiply' && nums.length === 2) {
        return toString(nums[0] * nums[1]);
      }
      if (name === 'subtract' && nums.length === 2) {
        return toString(nums[0] - nums[1]);
      }
      return args.join(',');
    });
    expect(result).toBe('11');
  });

  test('should process nested calls from innermost to outermost', () => {
    const calls: string[] = [];
    const input = 'outer(middle(inner(x)))';
    fillFunctions(input, ['outer', 'middle', 'inner'], ([body], name) => {
      calls.push(`${name}:${body}`);
      return `[${name}:${body}]`;
    });
    expect(calls).toEqual(['inner:x', 'middle:[inner:x]', 'outer:[middle:[inner:x]]']);
  });

  test('should handle recursive functions with mixed content', () => {
    const input = 'add(1, add(2, 3))';
    const result = fillFunctions(input, ['add'], (args) => {
      const parts = args.map((n) => n.trim());
      const nums = parts.map((n) => Number.parseInt(n));
      if (nums.every((n) => !Number.isNaN(n))) {
        return toString(nums.reduce((a, b) => a + b, 0));
      }
      return args.join(',');
    });
    expect(result).toBe('6');
  });

  test('should handle multiple recursion levels with different functions', () => {
    const input = 'format(upper(trim(  hello  )))';
    const result = fillFunctions(input, ['format', 'upper', 'trim'], ([body], name) => {
      if (name === 'trim') {
        return body.trim();
      }
      if (name === 'upper') {
        return body.toUpperCase();
      }
      if (name === 'format') {
        return `[${body}]`;
      }
      return body;
    });
    expect(result).toBe('[HELLO]');
  });

  test('should handle sibling nested calls', () => {
    const input = 'concat(upper(a), lower(B))';
    const result = fillFunctions(input, ['concat', 'upper', 'lower'], (args, name) => {
      const [body] = args;
      if (name === 'upper') {
        return body.toUpperCase();
      }
      if (name === 'lower') {
        return body.toLowerCase();
      }
      if (name === 'concat') {
        return args.join('');
      }
      return body;
    });
    expect(result).toBe('Ab');
  });
});
