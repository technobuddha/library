import { empty, space } from './constants.ts';
import { matchCase } from './match-case.ts';

/**
 * Return the plural version of the input string
 *
 * @param input - The word to pluralize
 * @param quantity - The quantity to prepend to the word.  If omitted nothing is prepended.  If quantity is one the singular form is returned.
 * @param include - If true and quantity is supplied, the quantity is prepended to the output.
 * @returns The plural form of the input, or if a quantity is supplied - the quantity and the singular/plural form of the input (whichever is appropriate)
 * @group English
 * @category Parts of Speech
 */
export function plural(input: string, quantity?: number, include = false): string {
  if (quantity === 1 || quantity === -1) {
    return include ? quantity.toString() + space + input : input;
  }

  let lc = input.toLocaleLowerCase();
  let suffix = empty;
  let prefix = empty;
  let result = null as string | null;

  for (const p of database.prefixes) {
    if (lc.startsWith(p)) {
      prefix = p;
      lc = lc.slice(p.length);
      break;
    }
  }

  for (const s of database.suffixes) {
    if (lc.endsWith(s)) {
      suffix = s;
      lc = lc.slice(0, Math.max(0, lc.length - s.length));
      break;
    }
  }

  if (database.uncountableWords.includes(lc)) {
    result = matchCase(prefix + lc + suffix, input);
  }

  if (!result && lc in database.irregulars) {
    result = matchCase(prefix + database.irregulars[lc] + suffix, input);
  }

  if (!result) {
    for (const v of database.uncountableRules) {
      if (v.test(lc)) {
        result = matchCase(prefix + lc + suffix, input);
        break;
      }
    }
  }

  if (!result) {
    for (const v of database.rules) {
      if (v[0].test(lc)) {
        result = matchCase(prefix + lc.replace(v[0], v[1]) + suffix, input);
        break;
      }
    }
  }

  result ??= matchCase(`${prefix}${lc}s${suffix}`, input);

  return include && quantity != null ? `${quantity}${space}${result}` : result;
}

type DBEntry = {
  rules: [RegExp, string][];
  uncountableRules: RegExp[];
  uncountableWords: string[];
  prefixes: string[];
  suffixes: string[];
  irregulars: Record<string, string>;
};

const database: DBEntry = {
  rules: [
    // cspell:disable
    [/(stig|sto|dog|sche|anathe)ma$/iu, '$1mata'],
    [/(alumn|alg|antenn|ecclesi|faun|formul|larv|nebul|vertebr)a$/iu, '$1ae'],

    [/child$/iu, 'children'],

    [/(giraf|sa)fe$/iu, '$1fes'],
    [/fe$/iu, 'ves'],
    [/(l|m)ouse$/iu, '$1ice'],
    [/goose$/iu, 'geese'],
    [/zampone$/iu, 'zamponi'],

    [/ff$/iu, 'ffs'],
    [/(belie|brie|che|chie|cle|gul|i|proo|roo)f$/iu, '$1fs'],
    [/(its|her|him|them)self$/iu, 'themselves'],
    [/f$/iu, 'ves'],

    [/tooth$/iu, 'teeth'],
    [/(epo|matriar|patriar|stoma)ch$/iu, '$1chs'],
    [/([sc])h$/iu, '$1hes'],

    [/(aqua)rium$/iu, '$1ira'],
    [/(seraph|cherub)im$/iu, '$1im'],
    [/(memorand|millenni|ov|quor|strat|symposi)um$/iu, '$1a'],
    [
      /(addend|agend|automat|bacteri|curricul|dat|desiderat|endotheli|errat|extrem|fusari|medi)um$/iu,
      '$1a',
    ],

    [/(m|wom)an/iu, '$1en'],
    [/(criteri|hedr|heli|phenomen|prolegomen|organ)on$/iu, '$1a'],
    [/person$/iu, 'people'],

    [
      /(alt|armadill|boler|bong|bronc|cell|dynam|embarg|hal|hell|gazeb|gyr|jumb|kil|lim)o$/iu,
      '$1os',
    ],
    [
      /(maestr|metr|mosquit|octav|pian|piccol|pint|phot|ponch|sil|sombrer|sopran|stere|stilett)o$/iu,
      '$1os',
    ],
    [/(temp|tornad|tors|tw|volcan)o$/iu, '$1os'],
    [/([^aeiou])o$/iu, '$1oes'],

    [/(gen|visc)us$/iu, '$1era'],
    [
      /(alumn|bacill|cirr|cact|foc|fung|hippopotam|loc|nucle|octop|radi|pegas|stimul|strat|syllab|termin|uter)us$/iu,
      '$1i',
    ],
    [
      /(ax|analys|antithes|bas|cris|diagnos|ellips|emphas|hypothes|neuros|oas|paralys|synthes|synops|test|thes)is$/iu,
      '$1es',
    ],
    [/(ephemer)is$/iu, '$1ides'],
    [/(bu|ga)s$/iu, '$1sses'],
    [/(corp)us$/iu, '$1ora'],
    [/s$/iu, 'ses'],

    [/foot$/iu, 'feet'],

    [/(b|bur|chat|tabl)eau$/iu, '$1eaux'],

    [/(whisk)ey$/iu, '$1ies'],
    [/([^aeiou]|qu)y$/iu, '$1ies'],

    [/(append|matr)ix$/iu, '$1ices'],
    [/(cod|ind|mur|vert)ex$/iu, '$1ices'],
    [/(ap)ex$/iu, '$1ices'],
    [/x$/iu, 'xes'],

    [/(fez|qui)z$/iu, '$1zzes'],
    [/z$/iu, 'zes'],
  ],
  uncountableRules: [
    /(adult|child)hood$/iu,
    /craft$/iu,
    /deer$/iu,
    /fish$/iu,
    /measles$/iu,
    /pox$/iu,
    /sheep$/iu,
    /wood$/iu,
    /ographuy$/iu,
    /itis$/iu,
    /ology$/iu,
    /[hw]ealth$/iu,
    /bage$/iu,
    /llows$/iu,
    /ment$/iu,
    /friut$/iu,
    /(?<!func)tion$/iu,
    /work$/iu,
    /ing$/iu,
    /ism$/iu,
    /tics$/iu,
    /moose$/iu,
    /trout$/iu,
  ],
  // cspell:enable

  uncountableWords: [
    'abroad',
    'acoustics',
    'advice',
    'aid',
    'air',
    'alcohol',
    'alms',
    'alpenglow',
    'aluminum',
    'ammo',
    'anger',
    'anime',
    'applause',
    'arithmetic',
    'art',
    'athletics',
    'audio',
    'awareness',
    'barracks',
    'bad',
    'bakeware',
    'beyond',
    'bifocals',
    'binoculars',
    'bison',
    'blood',
    'bloomers',
    'blouse',
    'boots',
    'bourgeois',
    'bowling',
    'bricklaying',
    'butter',
    'calculus',
    'cappuccino',
    'caribou',
    'carp',
    'cash',
    'casino',
    'castanets',
    'cattle',
    'celeriac',
    'chafe',
    'chalk',
    'chaos',
    'chassis',
    'chess',
    'children',
    'chino',
    'clippers',
    'cod',
    'commerce',
    'concrete',
    'corps',
    'courage',
    'deadness',
    'debris',
    'deer',
    'diabetes',
    'dirt',
    'disco',
    'doldrums',
    'dungarees',
    'economics',
    'egg',
    'electricity',
    'elk',
    'energy',
    'ethics',
    'expertise',
    'fauna',
    'faux pas',
    'fedelini',
    'fibre',
    'fiberglass',
    'flesh',
    'flounder',
    'forestry',
    'fun',
    'furniture',
    'gain',
    'glass',
    'glasses',
    'golf',
    'graffiti',
    'gratitude',
    'grief',
    'grouse',
    'guidance',
    'guilt',
    'haddock',
    'happiness',
    'hardware',
    'hair',
    'halibut',
    'headquarters',
    'helium',
    'helo',
    'help',
    'herpes',
    'high jinks',
    'homework',
    'housework',
    'humidity',
    'humour',
    'hypochondria',
    'hypothermia',
    'ides',
    'ikebana',
    'importance',
    'impudence',
    'incandescence',
    'indigence',
    'innocence',
    'insignia',
    'jeans',
    'jodhpur',
    'judo',
    'justice',
    'karate',
    'kendo',
    'knickers',
    'knowledge',
    'kudos',
    'labour',
    'laughter',
    'leisure',
    'legal',
    'literature',
    'livestock',
    'loneliness',
    'lycra',
    'lye',
    'macaroni',
    'machinery',
    'mackerel',
    'macrame',
    'magic',
    'mail',
    'manga',
    'mambo',
    'mankind',
    'math',
    'means',
    'media',
    'methane',
    'mews',
    'might',
    'most',
    'mud',
    'mullet',
    'multimedia',
    'music',
    'neon',
    'news',
    'nitrogen',
    'normal',
    'oatmeal',
    'obedience',
    'opium',
    'osmosis',
    'outback',
    'oxygen',
    'pants',
    'pantology',
    'pantyhose',
    'passion',
    'patience',
    'peace',
    'penicillin',
    'permafrost',
    'physics',
    'pike',
    'plankton',
    'platinum',
    'plenty',
    'pliers',
    'police',
    'polo',
    'premises',
    'propane',
    'prose',
    'pseudoscience',
    'pyjamas',
    'quicksand',
    'radio',
    'random',
    'rain',
    'rendezvous',
    'reinscription',
    'relief',
    'research',
    'rice',
    'salmon',
    'septicaemia',
    'school',
    'schoolchild',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shorts',
    'shrimp',
    'sick',
    'smithereens',
    'smog',
    'soccer',
    'software',
    'soot',
    'soy',
    'species',
    'squid',
    'staff',
    'stamina',
    'stupid',
    'subconscious',
    'subsidence',
    'sugar',
    'sunglasses',
    'sunshine',
    'sushi',
    'suspenders',
    'sweats',
    'sweet',
    'sweets',
    'swine',
    'temporariness',
    'terracotta',
    'tennis',
    'thanks',
    'them',
    'tights',
    'timpani',
    'titanium',
    'tongs',
    'tonight',
    'tortellini',
    'traffic',
    'trigonometry',
    'trousers',
    'tuna',
    'tweezers',
    'underclothes',
    'underneath',
    'underpants',
    'underwear',
    'veal',
    'vermicelli',
    'video',
    'vinyl',
    'virus',
    'violence',
    'viscose',
    'warmth',
    'weedkiller',
    'welfare',
    'wheat',
    'whitebait',
    'wildebeest',
    'wildlife',
    'worth',
    'yoga',
    'you',
    'young',
  ],
  irregulars: {
    i: 'we',
    me: 'us',
    he: 'they',
    she: 'they',
    is: 'are',
    was: 'were',
    has: 'have',
    this: 'these',
    that: 'those',
    die: 'dice',
    ox: 'oxen',
  },
  suffixes: ['-up', '-out', '-in-law', '-in-trade'],
  prefixes: ['anti-', 'bi-', 'co-', 'semi-', 'mal-', 'ex-', 'sub-', 'dis-', 'non-', 'un-', 'over-'],
};
