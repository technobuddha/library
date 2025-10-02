import { lancasterStemmer } from '../../../../standards/lancaster-stemmer.ts';

import { stem } from '../stem.ts';

const stdC = (value: string): string => lancasterStemmer(value, { style: 'c' });
const stdPaper = (value: string): string => lancasterStemmer(value, { style: 'paper' });
const lancasterC = (input: string): string => stem(input, 'lancaster', 'c');
const lancasterPaper = (input: string): string => stem(input, 'lancaster', 'paper');

describe('stemLancaster', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(lancasterC(word), word).toStrictEqual(stdC(word));
      }
    },
    60_000,
  );

  test.runIf(process.env.MODE === 'full')(
    'with master words (Paper)',
    () => {
      for (const word of fixtures.master) {
        expect(lancasterPaper(word), word).toStrictEqual(stdPaper(word));
      }
    },
    60_000,
  );

  test('returns empty string for empty input', () => {
    expect(lancasterC('')).toBe('');
  });

  test('handles single character input', () => {
    expect(lancasterC('a')).toBe('a');
    expect(lancasterC('i')).toBe('i');
  });

  test('handles short words', () => {
    expect(lancasterC('at')).toBe('at');
    expect(lancasterC('be')).toBe('be');
    expect(lancasterC('is')).toBe('is');
  });

  test('stems -ational suffix', () => {
    expect(lancasterC('national')).toBe('nat');
    expect(lancasterC('rational')).toBe('rat');
    expect(lancasterC('international')).toBe('intern');
  });

  test('stems -tional suffix', () => {
    expect(lancasterC('national')).toBe('nat');
    expect(lancasterC('conditional')).toBe('condit');
  });

  test('stems -fulness suffix', () => {
    expect(lancasterC('fulness')).toBe('ful');
    expect(lancasterC('usefulness')).toBe('us');
  });

  test('stems -ousness suffix', () => {
    expect(lancasterC('generousness')).toBe('gen');
    expect(lancasterC('consciousness')).toBe('conscy');
  });

  test('stems -iveness suffix', () => {
    expect(lancasterC('effectiveness')).toBe('effect');
    expect(lancasterC('decisiveness')).toBe('decid');
  });

  test('stems -ization suffix', () => {
    expect(lancasterC('organization')).toBe('org');
    expect(lancasterC('realization')).toBe('real');
  });

  test('handles rules with vowel check', () => {
    // Test edge case where base has no vowels after rule application
    // Words ending with 'ing' where base would have no vowels are not stemmed
    expect(lancasterC('ttring')).toBe('ttring'); // base 'ttr' has no vowels
    expect(lancasterC('xyzing')).toBe('xys'); // base 'xyz' has no vowels
    expect(lancasterC('xxxed')).toBe('xxxed'); // base 'xxx' has no vowels
  });

  test('stems -isation suffix', () => {
    expect(lancasterC('organisation')).toBe('org');
    expect(lancasterC('realisation')).toBe('real');
  });

  test('stems -biliti suffix', () => {
    expect(lancasterC('capability')).toBe('cap');
    expect(lancasterC('probability')).toBe('prob');
  });

  test('stems -lessli suffix', () => {
    expect(lancasterC('helplessly')).toBe('helpless');
    expect(lancasterC('endlessly')).toBe('endless');
  });

  test('stems -entli suffix', () => {
    expect(lancasterC('consistently')).toBe('consist');
    expect(lancasterC('apparently')).toBe('app');
  });

  test('stems -ation suffix', () => {
    expect(lancasterC('creation')).toBe('cre');
    expect(lancasterC('celebration')).toBe('celebr');
  });

  test('stems -ator suffix', () => {
    expect(lancasterC('creator')).toBe('cre');
    expect(lancasterC('elevator')).toBe('elev');
  });

  test('stems -alism suffix', () => {
    expect(lancasterC('realism')).toBe('real');
    expect(lancasterC('socialism')).toBe('soc');
  });

  test('stems -aliti suffix', () => {
    expect(lancasterC('formality')).toBe('form');
    expect(lancasterC('mortality')).toBe('mort');
  });

  test('stems -ousli suffix', () => {
    expect(lancasterC('obviously')).toBe('obvy');
    expect(lancasterC('seriously')).toBe('sery');
  });

  test('stems -iviti suffix', () => {
    expect(lancasterC('activity')).toBe('act');
    expect(lancasterC('sensitivity')).toBe('sensit');
  });

  test('stems -fulli suffix', () => {
    expect(lancasterC('carefully')).toBe('car');
    expect(lancasterC('beautifully')).toBe('beauty');
  });

  test('stems -enci suffix', () => {
    expect(lancasterC('frequency')).toBe('frequ');
    expect(lancasterC('efficiency')).toBe('efficy');
  });

  test('stems -anci suffix', () => {
    expect(lancasterC('vacancy')).toBe('vac');
    expect(lancasterC('buoyancy')).toBe('buoy');
  });

  test('stems -abli suffix', () => {
    expect(lancasterC('comfortably')).toBe('comfort');
    expect(lancasterC('reasonably')).toBe('reason');
  });

  test('stems -izer suffix', () => {
    expect(lancasterC('equalizer')).toBe('eq');
    expect(lancasterC('organizer')).toBe('org');
  });

  test('stems -iser suffix', () => {
    expect(lancasterC('organiser')).toBe('org');
    expect(lancasterC('equaliser')).toBe('eq');
  });

  test('stems -alli suffix', () => {
    expect(lancasterC('basically')).toBe('bas');
    expect(lancasterC('logically')).toBe('log');
  });

  test('stems -ical suffix', () => {
    expect(lancasterC('historical')).toBe('hist');
    expect(lancasterC('etical')).toBe('et');
  });

  test('stems -ement suffix', () => {
    expect(lancasterC('replacement')).toBe('replac');
    expect(lancasterC('excitement')).toBe('excit');
  });

  test('stems -ance suffix', () => {
    expect(lancasterC('performance')).toBe('perform');
    expect(lancasterC('acceptance')).toBe('acceiv');
  });

  test('stems -ence suffix', () => {
    expect(lancasterC('conference')).toBe('conf');
    expect(lancasterC('reference')).toBe('ref');
  });

  test('stems -able suffix', () => {
    expect(lancasterC('acceptable')).toBe('acceiv');
    expect(lancasterC('comfortable')).toBe('comfort');
  });

  test('stems -ible suffix', () => {
    expect(lancasterC('possible')).toBe('poss');
    expect(lancasterC('terrible')).toBe('terr');
  });

  test('stems -ment suffix', () => {
    expect(lancasterC('agreement')).toBe('agr');
    expect(lancasterC('development')).toBe('develop');
  });

  test('stems -ness suffix', () => {
    expect(lancasterC('happiness')).toBe('happy');
    expect(lancasterC('darkness')).toBe('dark');
  });

  test('stems -ful suffix', () => {
    expect(lancasterC('beautiful')).toBe('beauty');
    expect(lancasterC('helpful')).toBe('help');
  });

  test('stems -ous suffix', () => {
    expect(lancasterC('famous')).toBe('fam');
    expect(lancasterC('dangerous')).toBe('dang');
  });

  test('stems -ive suffix', () => {
    expect(lancasterC('active')).toBe('act');
    expect(lancasterC('creative')).toBe('cre');
  });

  test('stems -ize suffix', () => {
    expect(lancasterC('organize')).toBe('org');
    expect(lancasterC('realize')).toBe('real');
  });

  test('stems -ise suffix', () => {
    expect(lancasterC('organise')).toBe('org');
    expect(lancasterC('realise')).toBe('real');
  });

  test('stems -ing suffix with vowel constraint', () => {
    expect(lancasterC('running')).toBe('run');
    expect(lancasterC('walking')).toBe('walk');
    expect(lancasterC('reading')).toBe('read');
    expect(lancasterC('thing')).toBe('thing'); // Should not stem (no vowel in base)
  });

  test('stems -ed suffix with vowel constraint', () => {
    expect(lancasterC('walked')).toBe('walk');
    expect(lancasterC('created')).toBe('cre');
    expect(lancasterC('red')).toBe('red'); // Should not stem (no vowel in base)
  });

  test('stems -es suffix', () => {
    expect(lancasterC('boxes')).toBe('box');
    expect(lancasterC('wishes')).toBe('wish');
    expect(lancasterC('classes')).toBe('class');
  });

  test('stems -ly suffix', () => {
    expect(lancasterC('quickly')).toBe('quick');
    expect(lancasterC('slowly')).toBe('slow');
  });

  test('stems -li suffix', () => {
    expect(lancasterC('happily')).toBe('happy');
    expect(lancasterC('easily')).toBe('easy');
  });

  test('stems -ti suffix', () => {
    expect(lancasterC('multi')).toBe('mult');
    expect(lancasterC('anti')).toBe('ant');
  });

  test('stems -ci suffix', () => {
    expect(lancasterC('foci')).toBe('foc');
    expect(lancasterC('loci')).toBe('loc');
  });

  test('stems -gi suffix', () => {
    expect(lancasterC('fungi')).toBe('fung');
  });

  test('stems -si suffix', () => {
    expect(lancasterC('oasis')).toBe('oas');
  });

  test('stems -zi suffix', () => {
    expect(lancasterC('nazi')).toBe('naz');
  });

  test('stems -s suffix', () => {
    expect(lancasterC('cats')).toBe('cat');
    expect(lancasterC('dogs')).toBe('dog');
    expect(lancasterC('books')).toBe('book');
  });

  test('stems -e suffix', () => {
    expect(lancasterC('cake')).toBe('cak');
    expect(lancasterC('love')).toBe('lov');
  });

  test('stems double consonant suffixes with vowel constraint', () => {
    expect(lancasterC('running')).toBe('run');
    expect(lancasterC('hopping')).toBe('hop');
    expect(lancasterC('swimming')).toBe('swim');
    expect(lancasterC('getting')).toBe('get');
  });

  test('stems -bb suffix', () => {
    expect(lancasterC('ebb')).toBe('eb');
  });

  test('stems -dd suffix', () => {
    expect(lancasterC('add')).toBe('ad');
  });

  test('stems -ff suffix', () => {
    expect(lancasterC('off')).toBe('off');
  });

  test('stems -gg suffix', () => {
    expect(lancasterC('egg')).toBe('eg');
  });

  test('stems -ll suffix', () => {
    expect(lancasterC('fell')).toBe('fel');
    expect(lancasterC('tell')).toBe('tel');
  });

  test('stems -mm suffix', () => {
    expect(lancasterC('humm')).toBe('hum');
  });

  test('stems -nn suffix', () => {
    expect(lancasterC('inn')).toBe('in');
  });

  test('stems -pp suffix', () => {
    expect(lancasterC('app')).toBe('ap');
  });

  test('stems -rr suffix', () => {
    expect(lancasterC('err')).toBe('er');
  });

  test('stems -ss suffix', () => {
    expect(lancasterC('pass')).toBe('pass');
    expect(lancasterC('mess')).toBe('mess');
  });

  test('stems -tt suffix', () => {
    expect(lancasterC('mutt')).toBe('mut');
  });

  test('stems -zz suffix', () => {
    expect(lancasterC('buzz')).toBe('buzz');
    expect(lancasterC('jazz')).toBe('jazz');
  });

  test('stems -i suffix with vowel constraint', () => {
    expect(lancasterC('ski')).toBe('sky'); // No vowel in base
    expect(lancasterC('taxi')).toBe('tax');
  });

  test('stems -ant suffix', () => {
    expect(lancasterC('important')).toBe('import');
    expect(lancasterC('enant')).toBe('en');
  });

  test('stems -ent suffix', () => {
    expect(lancasterC('different')).toBe('diff');
    expect(lancasterC('student')).toBe('stud');
  });

  test('stems -ism suffix', () => {
    expect(lancasterC('capitalism')).toBe('capit');
    expect(lancasterC('tourism')).toBe('tour');
  });

  test('stems -ist suffix', () => {
    expect(lancasterC('artist')).toBe('art');
    expect(lancasterC('scientist')).toBe('scy');
  });

  test('stems -er suffix', () => {
    expect(lancasterC('teacher')).toBe('teach');
    expect(lancasterC('worker')).toBe('work');
  });

  test('stems -or suffix', () => {
    expect(lancasterC('doctor')).toBe('doct');
    expect(lancasterC('actor')).toBe('act');
  });

  test('stems -al suffix', () => {
    expect(lancasterC('national')).toBe('nat');
    expect(lancasterC('personal')).toBe('person');
  });

  test('stems -ic suffix', () => {
    expect(lancasterC('historic')).toBe('hist');
    expect(lancasterC('basic')).toBe('bas');
  });

  test('stems -at suffix', () => {
    expect(lancasterC('cat')).toBe('cat');
    expect(lancasterC('format')).toBe('form');
  });

  test('stems -en suffix', () => {
    expect(lancasterC('golden')).toBe('gold');
    expect(lancasterC('broken')).toBe('brok');
  });

  test('stems -um suffix', () => {
    expect(lancasterC('museum')).toBe('muse');
    expect(lancasterC('album')).toBe('alb');
  });

  test('stems -us suffix', () => {
    expect(lancasterC('focus')).toBe('foc');
    expect(lancasterC('virus')).toBe('vir');
  });

  test('stems -on suffix', () => {
    expect(lancasterC('person')).toBe('person');
    expect(lancasterC('reason')).toBe('reason');
  });

  test('stems -ar suffix', () => {
    expect(lancasterC('popular')).toBe('popul');
    expect(lancasterC('regular')).toBe('regul');
  });

  test('stems -el suffix', () => {
    expect(lancasterC('model')).toBe('model');
    expect(lancasterC('travel')).toBe('travel');
  });

  test('stems -em suffix', () => {
    expect(lancasterC('problem')).toBe('problem');
    expect(lancasterC('system')).toBe('system');
  });

  test('stems -in suffix', () => {
    expect(lancasterC('protein')).toBe('protein');
    expect(lancasterC('cabin')).toBe('cabin');
  });

  test('stems -it suffix', () => {
    expect(lancasterC('credit')).toBe('credit');
    expect(lancasterC('profit')).toBe('profit');
  });

  test('stems -ol suffix', () => {
    expect(lancasterC('control')).toBe('control');
    expect(lancasterC('symbol')).toBe('symbol');
  });

  test('stems -op suffix', () => {
    expect(lancasterC('develop')).toBe('develop');
  });

  test('stems -ot suffix', () => {
    expect(lancasterC('robot')).toBe('robot');
  });

  test('stems -un suffix', () => {
    expect(lancasterC('fun')).toBe('fun');
  });

  test('stems -up suffix', () => {
    expect(lancasterC('cup')).toBe('cup');
  });

  test('stems -ur suffix', () => {
    expect(lancasterC('fur')).toBe('fur');
  });

  test('stems -ut suffix', () => {
    expect(lancasterC('cut')).toBe('cut');
  });

  test('stems -ct suffix', () => {
    expect(lancasterC('fact')).toBe('fact');
    expect(lancasterC('contract')).toBe('contract');
  });

  test('stems -lt suffix', () => {
    expect(lancasterC('salt')).toBe('salt');
    expect(lancasterC('result')).toBe('result');
  });

  test('stems -nt suffix', () => {
    expect(lancasterC('plant')).toBe('plant');
    expect(lancasterC('front')).toBe('front');
  });

  test('stems -pt suffix', () => {
    expect(lancasterC('concept')).toBe('conceiv');
    expect(lancasterC('accept')).toBe('acceiv');
  });

  test('stems -rt suffix', () => {
    expect(lancasterC('part')).toBe('part');
    expect(lancasterC('start')).toBe('start');
  });

  test('stems -st suffix', () => {
    expect(lancasterC('test')).toBe('test');
    expect(lancasterC('best')).toBe('best');
  });

  test('stems -xt suffix', () => {
    expect(lancasterC('text')).toBe('text');
    expect(lancasterC('next')).toBe('next');
  });

  test('stems -y suffix with vowel constraint', () => {
    expect(lancasterC('happy')).toBe('happy');
    expect(lancasterC('city')).toBe('city');
  });

  test('handles case insensitivity', () => {
    expect(lancasterC('RUNNING')).toBe('run');
    expect(lancasterC('Walking')).toBe('walk');
    expect(lancasterC('CREATED')).toBe('cre');
  });

  test('handles recursive stemming', () => {
    expect(lancasterC('nationalizations')).toBe('nat');
    expect(lancasterC('organizationally')).toBe('org');
  });

  test('respects minimum length constraints', () => {
    expect(lancasterC('at')).toBe('at');
    expect(lancasterC('is')).toBe('is');
    expect(lancasterC('as')).toBe('as');
  });

  test('respects vowel constraints', () => {
    expect(lancasterC('thing')).toBe('thing');
    expect(lancasterC('strings')).toBe('string');
  });

  test('handles real-world examples', () => {
    expect(lancasterC('computer')).toBe('comput');
    expect(lancasterC('programming')).toBe('program');
    expect(lancasterC('running')).toBe('run');
    expect(lancasterC('jumped')).toBe('jump');
    expect(lancasterC('easily')).toBe('easy');
    expect(lancasterC('happiness')).toBe('happy');
    expect(lancasterC('beautiful')).toBe('beauty');
    expect(lancasterC('effectively')).toBe('effect');
  });

  test('handles words that should not be stemmed', () => {
    expect(lancasterC('the')).toBe('the');
    expect(lancasterC('and')).toBe('and');
    expect(lancasterC('but')).toBe('but');
  });

  test('handles common English words', () => {
    expect(lancasterC('working')).toBe('work');
    expect(lancasterC('worked')).toBe('work');
    expect(lancasterC('worker')).toBe('work');
    expect(lancasterC('works')).toBe('work');
  });

  test('handles words with multiple applicable rules', () => {
    expect(lancasterC('nationally')).toBe('nat');
    expect(lancasterC('conditional')).toBe('condit');
  });

  test('handles edge cases with minimum length', () => {
    expect(lancasterC('ab')).toBe('ab');
    expect(lancasterC('abc')).toBe('abc');
  });

  test('handles words ending with vowels', () => {
    expect(lancasterC('tree')).toBe('tre');
    expect(lancasterC('free')).toBe('fre');
  });

  test('handles compound word patterns', () => {
    expect(lancasterC('understanding')).toBe('understand');
    expect(lancasterC('relationship')).toBe('rel');
  });

  test('handles technical terms', () => {
    expect(lancasterC('algorithm')).toBe('algorithm');
    expect(lancasterC('processor')).toBe('process');
    expect(lancasterC('computational')).toBe('comput');
  });

  test('lancasterStemmer: "amuse" paper vs c style', () => {
    expect(lancasterC('amuse')).toBe('amu');
    expect(lancasterPaper('amuse')).toBe('amus');
  });

  test('lancasterStemmer: "chase" paper vs c style', () => {
    expect(lancasterC('chase')).toBe('cha');
    expect(lancasterPaper('chase')).toBe('chas');
  });

  test('lancasterStemmer: "noises" paper vs c style', () => {
    expect(lancasterC('noises')).toBe('noi');
    expect(lancasterPaper('noises')).toBe('nois');
  });
});
