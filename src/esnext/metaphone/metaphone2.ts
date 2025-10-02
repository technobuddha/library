// cspell: disable
import { createAlgorithm } from '../phonetic/algorithm.ts';

const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Y'];
const CH_FOR_KH = [' ', 'B', 'F', 'H', 'L', 'M', 'N', 'R', 'V', 'W'];
const J_FOR_J_EXCEPTION = ['L', 'T', 'K', 'S', 'N', 'M', 'B', 'Z'];

// prettier-ignore
export const algorithm = createAlgorithm({
  forking: 2,
  removeDuplicates: 'none',
  charSet: 'full-unicode',
  padding: true,
  setQueries(text: string): string[] {
    const res: string[] = [];
    if(/^(VAN |VON |SCH)/v.test(text)) {
      res.push('germanic');
    }
    if(/W|K|CZ|WITZ/v.test(text)) {
      res.push('slavo-germanic');
    }
    return res;
  },
  // prettier-ignore
  scan: [
    // initialExceptions
    // Match initial values of which the first character should be skipped.
    { m: 'G',     i: 'b', n: 'N'                                                                        },
    { m: 'K',     i: 'b', n: 'N'                                                                        },
    { m: 'P',     i: 'b', n: 'N'                                                                        },
    { m: 'W',     i: 'b', n: 'R'                                                                        },
    { m: 'P',     i: 'b', n: 'S'                                                                        },
    // Initial X is pronounced Z, which maps to S. Such as `Xavier`.
    { m: 'X',     i: 'b',                                                             o: 'S'            },
    { m: 'A',     i: 'b',                                                             o: 'A'            },
    { m: 'E',     i: 'b',                                                             o: 'A'            },
    { m: 'I',     i: 'b',                                                             o: 'A'            },
    { m: 'O',     i: 'b',                                                             o: 'A'            },
    { m: 'U',     i: 'b',                                                             o: 'A'            },
    { m: 'Y',     i: 'b',                                                             o: 'A'            },
    { m: 'A',     i: 'b',                                                             o: 'A'            },
    { m: 'Ê',     i: 'b',                                                             o: 'A'            },
    { m: 'É',     i: 'b',                                                             o: 'A'            },
    { m: 'A'                                                                                            },
    { m: 'E'                                                                                            },
    { m: 'I'                                                                                            },
    { m: 'O'                                                                                            },
    { m: 'U'                                                                                            },
    { m: 'Y'                                                                                            },
    { m: 'A'                                                                                            },
    { m: 'Ê'                                                                                            },
    { m: 'É'                                                                                            },
    // B
    { m: 'BB',                                                                        o: 'P'            },
    { m: 'B',                                                                         o: 'P'            },
    // Ç
    { m: 'Ç',                                                                         o: 'S'            },
    // C
    // Various Germanic:
    { m: 'CH',            p: 'A', ṅ: ['I','E'], ṗ1: VOWELS,                           o: 'K'            },
    { m: 'CH',            p: ['BA', 'MA'], ṅ: 'I', n: 'ER',                           o: 'K'            },
    // Special case for `Caesar`.
    { m: 'CA',    i: 'b', n: 'ESAR',                                                  o: 'S'            },
    // Italian `Chianti`
    { m: 'CH',            n: 'IA',                                                    o: 'K'            },
    // Find Michael
    { m: 'CH',    i: 'B', n: 'AE',                                                    o: ['K','X']      },

    // Greek roots such as `chemistry`, `chorus`.
    { m: 'CH',    i: 'b', n: ['IA', 'EM', 'OR', 'YM', 'ARAC', 'ARIS'], ṅ: 'ORE',      o: 'K'            },
    // Germanic, Greek, or otherwise `CH` for `KH` sound.
    { m: 'CH',            q: 'germanic',                                              o: 'K'            },
    // Such as 'architect' but not 'arch', orchestra', 'orchid'.
    { m: 'CH',            p: 'OR', n: 'ES',                                           o: 'K'            },  // ORCHES
    { m: 'CH',            p: 'AR', n: 'IT',                                           o: 'K'            },   // ARCHIT
    { m: 'CH',            p: 'OR', n: 'ID',                                           o: 'K'            },   // ORCHID
    { m: 'CH',            n: ['T', 'S'],                                              o: 'K'            },
    { m: 'CH',    i: 'b', n: CH_FOR_KH,                                               o: 'K'            },
    { m: 'CH',            p: ['A', 'E', 'O', 'U'], n: CH_FOR_KH,                      o: 'K'            },
    { m: 'CH',    i: 'b',                                                             o: 'X'            },
    { m: 'CH',            b: 'MC',                                                    o: 'K'            },
    // B u g ? Why matching absolute? what about McHiccup?
    { m: 'CH',                                                                        o: ['X', 'K']     },
    // Such as `Czerny`.
    { m: 'CZ',            ṗ: 'WI',                                                    o: ['S', 'X']     },
    // Such as `Focaccia`.
    { m: 'CCI',           n:'A',                                                      o: 'X'            },
    // Double `C`, but not `McClellan`.
    { m: 'C',     i: 'ḃ', p: 'M', n: 'C',                                             o: 'K'            },
    // Such as `Accident`, `Accede`, `Succeed`.
    { m: 'CCI',   i: 'ḃ', p: 'A',                                                     o: 'KS'           },
    { m: 'CCE',   i: 'ḃ', p: 'A',                                                     o: 'KS'           },
    { m: 'CCH',   i: 'ḃ', p: 'A', ṅ: 'U',                                             o: 'KS'           },
    { m: 'CCE',           p: 'U', n: ['E', 'S'],                                      o: 'KS'           },
    // Such as `Bellocchio`, but not `Bacchus`.
    { m: 'CC',            n: ['I', 'E', 'H'], ṅ: 'HU',                                o: 'X'            },
    // Pierce's rule.
    { m: 'CC',            ṅ: ['I', 'E', 'H'],                                         o: 'K'            },
    { m: 'CC',            n: 'HU',                                                    o: 'K'            },
    { m: 'CG',                                                                        o: 'K'            },
    { m: 'CK',                                                                        o: 'K'            },
    { m: 'CQ',                                                                        o: 'K'            },
    // Italian
    { m: 'CI',            n: ['E', 'O'],                                              o: ['S', 'X']     },
    { m: 'CI',                                                                        o: 'S'            },
    { m: 'CE',                                                                        o: 'S'            },
    { m: 'CY',                                                                        o: 'S'            },
    // Skip two extra characters ahead in `Mac Caffrey`, `Mac Gregor`.
    { m: 'C C',                                                                       o: 'K'            },
    { m: 'C G',                                                                       o: 'K'            },
    { m: 'C Q',                                                                       o: 'K'            },
    { m: 'C',                                                                         o: 'K'            },
    /// D
    // Such as `edge`
    { m: 'DGE',                                                                       o: 'J'            },
    { m: 'DGI',                                                                       o: 'J'            },
    { m: 'DGY',                                                                       o: 'J'            },
    // Such as `Edgar`.
    { m: 'DG',                                                                        o: 'TK'           },
    { m: 'DT',                                                                        o: 'T'            },
    { m: 'DD',                                                                        o: 'T'            },
    { m: 'D',                                                                         o: 'T'            },
    // F
    { m: 'FF',                                                                        o: 'F'            },
    { m: 'F',                                                                         o: 'F'            },
    // G
    { m: 'GH',    i: 'B', ṗ: VOWELS,                                                  o: 'K'            },
    // Such as `Ghislane`, `Ghiradelli`.
    { m: 'GH',    i: 'b', n: 'I',                                                     o: 'J'            },
    { m: 'GH',    i: 'b', ṅ: 'I',                                                     o: 'K'            },
    // Parker's rule (with some further refinements).
    // Such as `Hugh`.
    { m: 'GH',            p1: ['B', 'H', 'D']                                                           },
    // Such as `bough`.
    { m: 'GH',            p2: ['B', 'H', 'D']                                                           },
    // Such as `Broughton`.
    { m: 'GH',            p3: ['B', 'H']                                                                },
    // Such as `laugh`, `McLaughlin`, `cough`, `gough`, `rough`, `tough`.
    { m: 'GH',    i: 'B', p: 'U', p2: ['C','G','L','R','T'],                          o: 'F'            },
    { m: 'GH',    i: 'B', ṗ: 'I',                                                     o: 'K'            },
    { m: 'GH'                                                                                           },
    { m: 'GN',    i: 'ḃ', p: VOWELS, q: '!slavo-germanic',                            o: ['KN', 'N']    },
    // Not like `Cagney`.
    { m: 'GN',            ṅ: ['EY'], q: '!slavo-germanic',                            o: ['N', 'KN']    },
    { m: 'GN',                                                                        o: 'KN'           },
    // Such as `Tagliaro`.
    { m: 'GL',            n: 'I', q: '!slavo-germanic',                               o: ['KL', 'L']    },
    // -ges-, -gep-, -gel- at beginning.
    { m: 'GY',    i: 'b',                                                             o: ['K', 'J']     },
    { m: 'GE',    i: 'b', n: ['B', 'I', 'L', 'P', 'R', 'S', 'Y'],                     o: ['K', 'J']     },
    { m: 'GI',    i: 'b', n: ['B', 'E', 'L', 'N'],                                    o: ['K', 'J']     },
    // -ger-, -gy-.
    { m: 'GE',            ṗ: ['I', 'E'], n: 'R', ḃ: ['DANGER', 'MANGER', 'RANGER'],   o: ['K', 'J']     },
    { m: 'GY',            ṗ: ['E', 'G', 'I', 'R'],                                    o: ['K', 'J']     },
    // Italian such as `biaggi`.
    // Obvious Germanic.
    { m: 'GE',            n: 'T',                                                     o: 'K'            },
    { m: 'GE',            q: 'germanic',                                              o: 'K'            },
    { m: 'GE',                                                                        o: ['J', 'K']     },
    { m: 'GI',            q: 'germanic',                                              o: 'K'            },
    // Always soft if French ending.
    { m: 'GI',            n: 'ER ',                                                   o: 'J'            },
    { m: 'GI',                                                                        o: ['J', 'K']     },
    { m: 'GY',            q: 'germanic',                                              o: 'K'            },
    { m: 'GY',                                                                        o: ['J', 'K']     },
    { m: 'GG',            p: ['A', 'O'], n: 'I', q: 'germanic',                       o: 'K'            },
    { m: 'GG',            p: ['A', 'O'], n: 'I',                                      o: ['J', 'K']     },
    { m: 'GG',                                                                        o: 'K'            },
    { m: 'G',                                                                         o: 'K'            },
    // H
    // Only keep if first & before vowel or btw. 2 vowels.
    { m: 'H',     i: 'b', n: VOWELS,                                                  o: 'H'            },
    { m: 'H',             n: VOWELS, p: VOWELS,                                       o: 'H'            },
    { m: 'H'                                                                                            },
    // J
    // Obvious Spanish, `jose`, `San Jacinto`.
    { m: 'J',             b: 'SAN ',                                                  o: 'H'            },
    { m: 'J',             n: 'OSE', b: 'SAN ',                                        o: 'H'            },
    { m: 'J',     i: 'b', n: 'OSE ',                                                  o: 'H'            },
    { m: 'J',             n: 'OSE',                                                   o: ['J', 'H']     },
    // Such as `Yankelovich` or `Jankelowicz`.
    { m: 'J',     i: 'b',                                                             o: ['J', 'A']     },
    { m: 'J',     i: 'B', q: '!slavo-germanic', n: ['A', 'O'], p: VOWELS,             o: ['J', 'H']     },
    { m: 'J',     i: 'e',                                                             o: ['J', '-']     },
    { m: 'J',             ṗ: ['S', 'K', 'L'], ṅ: J_FOR_J_EXCEPTION,                   o: 'J'            },
    { m: 'J'                                                                                            },
    // K
    { m: 'KK',                                                                        o: 'K'            },
    { m: 'K',                                                                         o: 'K'            },
    // L
    // Spanish such as `cabrillo`, `gallegos`.
    { m: 'LLE',   i: 'e', p: 'A',                                                     o: ['L','-']      },
    { m: 'LLO',   i: 'e', p: 'I',                                                     o: ['L','-']      },
    { m: 'LLA',   i: 'e', p: 'I',                                                     o: ['L','-']      },
    { m: 'LL',            p: 'A', n: 'E', e: ['AS','OS','A','O'],                     o: ['L', '-']     },
    { m: 'LL',                                                                        o: 'L'            },
    { m: 'L',                                                                         o: 'L'            },
    // M
    { m: 'MB',    i: 'e', p: 'U',                                                     o: 'M'            },
    { m: 'MB',            n: 'ER', p: 'U',                                            o: 'M'            },
    { m: 'MM',                                                                        o: 'M'            },
    { m: 'M',                                                                         o: 'M'            },
    // N
    { m: 'NN',                                                                        o: 'N'            },
    { m: 'N',                                                                         o: 'N'            },
    // Ñ
    { m: 'Ñ',                                                                         o: 'N'            },
    // P
    { m: 'PH',                                                                        o: 'F'            },
    { m: 'PP',                                                                        o: 'P'            },
    { m: 'PB',                                                                        o: 'P'            },
    { m: 'P',                                                                         o: 'P'            },
    // Q
    { m: 'QQ',                                                                        o: 'K'            },
    { m: 'Q',                                                                         o: 'K'            },
    // R
    // French such as `Rogier`, but exclude `Hochmeier`.
    { m: 'R',     i: 'e', q: '!slavo-germanic', p: 'IE', ṗ3: ['M'], ṗ2: ['E', 'A'],   o: ['-', 'R']     },
    { m: 'RR',                                                                        o: 'R'            },
    { m: 'R',                                                                         o: 'R'            },
    // S
    // Special cases `island`, `isle`, `carlisle`, `carlysle`.
    { m: 'S',             n: 'L', p: ['I', 'Y']                                                         },
    // Special case `sugar-`.
    { m: 'S',     i:'b',  n: 'UGAR',                                                  o: ['X', 'S']     },
    // Germanic.
    { m: 'SH',            n: ['EIM','OEK','OLM','OLZ'],                               o: 'S'            },
    { m: 'SH',                                                                        o: 'X'            },
    { m: 'SIO',           q: 'slavo-germanic',                                        o: 'S'            },
    { m: 'SIO',                                                                       o: ['S','X']      },
    { m: 'SIA',           q: 'slavo-germanic',                                        o: 'S'            },
    { m: 'SIA',                                                                       o: ['S','X']      },
    // German & Anglicization's, such as `Smith` match `Schmidt`, `snider`
    // match `Schneider`. Also, -sz- in slavic language although in
    // hungarian it is pronounced `s`.
    { m: 'SZ',                                                                        o: ['S', 'X']     },
    { m: 'S',     i: 'b', n: ['L', 'M', 'N', 'W'],                                    o: ['S', 'X']     },
    // Schlesinger's rule.
    // Such as `schermerhorn`, `schenker`.
    { m: 'SCH',           n: [ 'EN', 'ER'],                                           o: ['X', 'SK']    },
    // Dutch origin, such as `school`, `schooner`.
    { m: 'SCH',           n: ['ED', 'EM', 'UY', 'OO'],                                o: 'SK'           },
    { m: 'SCH',   i: 'b', ṅ: [...VOWELS, 'W'],                                        o: ['X', 'S']     },
    { m: 'SCH',                                                                       o: 'X'            },
    { m: 'SCI',                                                                       o: 'S'            },
    { m: 'SCE',                                                                       o: 'S'            },
    { m: 'SCY',                                                                       o: 'S'            },
    { m: 'SC',                                                                        o: 'SK', l:3      },
    // French such as `resnais`, `artois`.
    { m: 'S',     i: 'e', p: ['AI', 'OI'],                                            o: ['-', 'S']     },
    { m: 'SS',                                                                        o: 'S'            },
    { m: 'S',                                                                         o: 'S'            },
    // T
    { m: 'TIO',           n: 'N',                                                     o: 'X'            },
    { m: 'TIA',                                                                       o: 'X'            },
    { m: 'TCH',                                                                       o: 'X'            },
    // Special case `Thomas`, `Thames` or Germanic.
    { m: 'TH',            q: 'germanic',                                              o: 'T'            },
    { m: 'TT',            n: 'H', q: 'germanic',                                      o: 'T'            },
    { m: 'TH',            n: ['OM', 'AM'],                                            o: 'T'            },
    { m: 'TT',            n: 'H',                                                     o: ['0', 'T']     },
    { m: 'TH',            o: ['0', 'T']                                                                 },
    { m: 'TT',                                                                        o: 'T'            },
    { m: 'TD',                                                                        o: 'T'            },
    { m: 'T',                                                                         o: 'T'            },
    // V
    { m: 'VV',                                                                        o: 'F'            },
    { m: 'V',                                                                         o: 'F'            },
    // W
    { m: 'WR',                                                                        o: 'R'            },
    // `Wasserman` should match `Vasserman`.
    { m: 'W',     i: 'b', n: VOWELS,                                                  o: ['A', 'F']     },
    { m: 'W',     i: 'b', n: 'H',                                                     o: 'A'            },
    // `Arnow` should match `Arnoff`.
    { m: 'W',             p: ['E', 'O'], n: ['SKI', 'SKY'],                           o: ['-', 'F']     },
    { m: 'W',             b: 'SCH',                                                   o: ['-', 'F']     },
    { m: 'W',     i: 'e', p: VOWELS,                                                  o: ['-', 'F']     },
    // Polish such as `Filipowicz`.
    { m: 'WICZ',                                                                      o: ['TS', 'FX']   },
    { m: 'WITZ',                                                                      o: ['TS', 'FX']   },
    { m: 'W'                                                                                            },
    // X
    // French such as `breaux`.
    { m: 'X',     i: 'e', p: ['AU', 'OU']                                                               },
    { m: 'XC',                                                                        o: 'KS'           },
    { m: 'XX',                                                                        o: 'KS'           },
    { m: 'X',                                                                         o: 'KS'           },
    // Z
    // Chinese pinyin such as `Zhao`.
    { m: 'ZH',                                                                        o: 'J'            },
    { m: 'ZZ',            n: ['A', 'I', 'O'],                                         o: ['S', 'TS']    },
    { m: 'ZZ',    i: 'B', q: 'slavo-germanic', ṗ: 'T',                                o: ['S', 'TS']    },
    { m: 'Z',     i: 'B', q: 'slavo-germanic', ṗ: 'T',                                o: ['S', 'TS']    },
    { m: 'ZZ',                                                                        o: 'S'            },
    { m: 'Z',                                                                         o: 'S'            }
  ]
});

/*

C

success → /səkˈsɛs/ (first c = /k/, second c = /s/)
accent → /ækˌsɛnt/
circumcise → /sɜːrkəmsaɪz/

S

desist → /dɪˈzɪst/ (first s = /z/, second s = /s/)
possess → /pəˈzɛs/
transgress → /trænzˈgrɛs/

G

exaggerate → /ɪgˈzædʒəˌreɪt/ (first g = /g/, second g = /dʒ/)

T

institution → /ˌɪnstɪˈtʃuːʃən/ (first t = /t/, second t = /tʃ/)

*/
