import isUndefined      from 'lodash/isUndefined';
import { empty, space } from './constants';
import matchCase        from './matchCase';

/**
 * Return the plural version of the input string
 *
 * @param input The word to pluralize
 * @param quantity The quantity to prepend to the word.  If omitted nothing is prepended.  If quantity is one the singular form is returned.
 * @returns The plural form of the input, or if a quantity is supplied - the quantity and the singular/plural form of the input (whichever is appropiate)
 */
export function plural(input: string, quantity?: number): string {
    if(quantity === 1 || quantity === -1)
        return quantity.toString() + space + input;

    let lc        = input.toLowerCase();
    let suffix    = empty;
    let prefix    = empty;
    let result    = null as string | null;

    for(const p of database.prefixes) {
        if(lc.startsWith(p)) {
            prefix = p;
            lc = lc.substr(p.length);
            break;
        }
    }

    for(const s of database.suffixes) {
        if(lc.endsWith(s)) {
            suffix = s;
            lc = lc.substr(0, lc.length - s.length);
            break;
        }
    }

    if(database.uncountableWords.includes(lc))
        result = matchCase(prefix + lc + suffix, input);

    if(!result) {
        if(lc in database.irregulars)
            result = matchCase(prefix + database.irregulars[lc] + suffix, input);
    }

    if(!result) {
        for(const v of database.uncountableRules) {
            if(v.test(lc)) {
                result = matchCase(prefix + lc + suffix, input);
                break;
            }
        }
    }

    if(!result) {
        for(const v of database.rules) {
            if(v[0].test(lc)) {
                result = matchCase(prefix + lc.replace(v[0], v[1]) + suffix, input);
                break;
            }
        }
    }

    if(!result)
        result = matchCase(prefix + lc + suffix, input);

    return isUndefined(quantity) ? result : (quantity.toString() + space + result);
}

type DBEntry =  {
    rules: [RegExp, string][];
    uncountableRules: RegExp[];
    uncountableWords: string[];
    prefixes: string[];
    suffixes: string[];
    irregulars: Record<string, string>;
};

const database: DBEntry =
{
    'rules': [
        [ /(stig|sto|dog|sche|anathe)ma$/ui,                                                                                 '$1mata' ],
        [ /(alumn|alg|antenn|ecclesi|faun|formul|larv|nebul|vertebr)a$/ui,                                                   '$1ae' ],

        [ /child$/ui,                                                                                                        'children' ],

        [ /(giraf|sa)fe$/ui,                                                                                                 '$1fes' ],
        [ /fe$/ui,                                                                                                           'ves' ],
        [ /(l|m)ouse$/ui,                                                                                                    '$1ice' ],
        [ /goose$/ui,                                                                                                        'geese' ],
        [ /zampone$/ui,                                                                                                      'zamponi' ],

        [ /ff$/ui,                                                                                                           'ffs' ],
        [ /(belie|brie|che|chie|cle|gul|i|proo|roo)f$/ui,                                                                    '$1fs' ],
        [ /(its|her|him|them)self$/ui,                                                                                       'themselves' ],
        [ /f$/ui,                                                                                                            'ves' ],

        [ /tooth$/ui,                                                                                                        'teeth' ],
        [ /(epo|matriar|patriar|stoma)ch$/ui,                                                                                '$1chs' ],
        [ /([sc])h$/ui,                                                                                                      '$1hes' ],

        [ /(aqua)rium$/ui,                                                                                                   '$1ira' ],
        [ /(seraph|cherub)im$/ui,                                                                                            '$1im' ],
        [ /(memorand|millenni|ov|quor|strat|symposi)um$/ui,                                                                  '$1a' ],
        [ /(addend|agend|automat|bacteri|curricul|dat|desiderat|endotheli|errat|extrem|fusari|medi)um$/ui,                   '$1a' ],

        [ /(m|wom)an/ui,                                                                                                     '$1en' ],
        [ /(criteri|hedr|heli|phenomen|prolegomen|organ)on$/ui,                                                              '$1a' ],
        [ /person$/ui,                                                                                                       'people' ],

        [ /(alt|armadill|boler|bong|bronc|cell|dynam|embarg|hal|hell|gazeb|gyr|jumb|kil|lim)o$/ui,                           '$1os' ],
        [ /(maestr|metr|mosquit|octav|pian|piccol|pint|phot|ponch|sil|sombrer|sopran|stere|stilett)o$/ui,                    '$1os' ],
        [ /(temp|tornad|tors|tw|volcan)o$/ui,                                                                                '$1os' ],
        [ /([^aeiou])o$/ui,                                                                                                  '$1oes' ],

        [ /(gen|visc)us$/ui,                                                                                                 '$1era' ],
        [ /(alumn|bacill|cirr|cact|foc|fung|hippopotam|loc|nucle|octop|radi|pegas|stimul|strat|syllab|termin|uter)us$/ui,    '$1i' ],
        [ /(ax|analys|antithes|bas|cris|diagnos|ellips|emphas|hypothes|neuros|oas|paralys|synthes|synops|test|thes)is$/ui,   '$1es' ],
        [ /(ephemer)is$/ui,                                                                                                  '$1ides' ],
        [ /(bu|ga)s$/ui,                                                                                                     '$1sses' ],
        [ /(corp)us$/ui,                                                                                                     '$1ora' ],
        [ /s$/ui,                                                                                                            'ses' ],

        [ /foot$/ui,                                                                                                         'feet' ],

        [ /(b|bur|chat|tabl)eau$/ui,                                                                                         '$1eaux' ],

        [ /(whisk)ey$/ui,                                                                                                    '$1ies' ],
        [ /([^aeiou]|qu)y$/ui,                                                                                               '$1ies' ],

        [ /(append|matr)ix$/ui,                                                                                              '$1ices' ],
        [ /(cod|ind|mur|vert)ex$/ui,                                                                                         '$1ices' ],
        [ /(ap)ex$/ui,                                                                                                       '$1ices' ],
        [ /x$/ui,                                                                                                            'xes' ],

        [ /(fez|qui)z$/ui,                                                                                                   '$1zzes' ],
        [ /z$/ui,                                                                                                            'zes' ],

        [ /$/ui,                                                                                                             's' ],
    ],
    'uncountableRules': [
        /(adult|child)hood$/ui,
        /craft$/ui,
        /deer$/ui,
        /fish$/ui,
        /measles$/ui,
        /pox$/ui,
        /sheep$/ui,
        /wood$/ui,
        /ographuy$/ui,
        /itis$/ui,
        /ology$/ui,
        /[hw]ealth$/ui,
        /bage$/ui,
        /llows$/ui,
        /ment$/ui,
        /friut$/ui,
        /tion$/ui,
        /work$/ui,
        /ing$/ui,
        /ism$/ui,
        /tics$/ui,
        /moose$/ui,
        /trout$/ui,
    ],
    'uncountableWords': [
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
    'irregulars': {
        'i':            'we',
        'me':           'us',
        'he':           'they',
        'she':          'they',
        'is':           'are',
        'was':          'were',
        'has':          'have',
        'this':         'these',
        'that':         'those',
        'die':          'dice',
        'ox':           'oxen',
    },
    'suffixes': [
        '-up',
        '-out',
        '-in-law',
        '-in-trade',
    ],
    'prefixes': [],
};
export default plural;
