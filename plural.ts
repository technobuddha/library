import isUndefined      from 'lodash/isUndefined';
import { empty, space } from './constants';
import matchCase        from './matchCase';

/**
  * Return the plural version of the input string
  * @param input        The word to pluralize
  * @param quantity        The quantity to prepend to the word.  If omitted nothing is prepended.  If quantity is one the singular form is returned.
  */
export function plural(input: string, quantity?: number): string {
    if(quantity === 1 || quantity === -1)
        return quantity + space + input;

    let lc        = input.toLowerCase();
    let suffix    = empty;
    let prefix    = empty;
    let result    = null as string | null;

    for(let p of database.prefixes) {
        if(lc.startsWith(p)) {
            prefix = p;
            lc = lc.substr(p.length);
            break;
        }
    }

    for(let s of database.suffixes) {
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
        for(let v of database.uncountableRules) {
            if(v.test(lc)) {
                result = matchCase(prefix + lc + suffix, input);
                break;
            }
        }
    }

    if(!result) {
        for(let v of database.rules) {
            if(v[0].test(lc)) {
                result = matchCase(prefix + lc.replace(v[0], v[1]) + suffix, input);
                break;
            }
        }
    }

    if(!result)
        result = matchCase(prefix + lc + suffix, input);

    return isUndefined(quantity) ? result : (quantity + space + result);
}

type DBEntry =  {
    rules: [RegExp, string][],
    uncountableRules: RegExp[],
    uncountableWords: string[],
    prefixes: string[],
    suffixes: string[],
    irregulars: Record<string, string>,
};

const database: DBEntry = 
{
    "rules": [
[/(stig|sto|dog|sche|anathe)ma$/i,                                                                                  "$1mata"],
[/(alumn|alg|antenn|ecclesi|faun|formul|larv|nebul|vertebr)a$/i,                                                    "$1ae"],

[/child$/i,                                                                                                         "children"],

[/(giraf|sa)fe$/i,                                                                                                  "$1fes"],
[/fe$/i,                                                                                                            "ves"],
[/(l|m)ouse$/i,                                                                                                     "$1ice"],
[/goose$/i,                                                                                                         "geese"],
[/zampone$/i,                                                                                                       "zamponi"],

[/ff$/i,                                                                                                            "ffs"],
[/(belie|brie|che|chie|cle|gul|i|proo|roo)f$/i,                                                                     "$1fs"],
[/(its|her|him|them)self$/i,                                                                                        "themselves"],
[/f$/i,                                                                                                             "ves"],

[/tooth$/i,                                                                                                         "teeth"],
[/(epo|matriar|patriar|stoma)ch$/i,                                                                                 "$1chs"],
[/([sc])h$/i,                                                                                                       "$1hes"],

[/(aqua)rium$/i,                                                                                                    "$1ira"],
[/(seraph|cherub)im$/i,                                                                                             "$1im"],
[/(memorand|millenni|ov|quor|strat|symposi)um$/i,                                                                   "$1a"],
[/(addend|agend|automat|bacteri|curricul|dat|desiderat|endotheli|errat|extrem|fusari|medi)um$/i,                    "$1a"],

[/(m|wom)an/i,                                                                                                      "$1en"],
[/(criteri|hedr|heli|phenomen|prolegomen|organ)on$/i,                                                               "$1a"],
[/person$/i,                                                                                                        "people"],

[/(alt|armadill|boler|bong|bronc|cell|dynam|embarg|hal|hell|gazeb|gyr|jumb|kil|lim)o$/i,                            "$1os"],
[/(maestr|metr|mosquit|octav|pian|piccol|pint|phot|ponch|sil|sombrer|sopran|stere|stilett)o$/i,                     "$1os"],
[/(temp|tornad|tors|tw|volcan)o$/i,                                                                                 "$1os"],
[/([^aeiou])o$/i,                                                                                                   "$1oes"],

[/(gen|visc)us$/i,                                                                                                  "$1era"],
[/(alumn|bacill|cirr|cact|foc|fung|hippopotam|loc|nucle|octop|radi|pegas|stimul|strat|syllab|termin|uter)us$/i,     "$1i"],
[/(ax|analys|antithes|bas|cris|diagnos|ellips|emphas|hypothes|neuros|oas|paralys|synthes|synops|test|thes)is$/i,    "$1es"],
[/(ephemer)is$/i,                                                                                                   "$1ides"],
[/(bu|ga)s$/i,                                                                                                      "$1sses"],
[/(corp)us$/i,                                                                                                      "$1ora"],
[/s$/i,                                                                                                             "ses"],

[/foot$/i,                                                                                                          "feet"],

[/(b|bur|chat|tabl)eau$/i,                                                                                          "$1eaux"],

[/(whisk)ey$/i,                                                                                                     "$1ies"],
[/([^aeiou]|qu)y$/i,                                                                                                "$1ies"],

[/(append|matr)ix$/i,                                                                                               "$1ices"],
[/(cod|ind|mur|vert)ex$/i,                                                                                          "$1ices"],
[/(ap)ex$/i,                                                                                                        "$1ices"],
[/x$/i,                                                                                                             "xes"],

[/(fez|qui)z$/i,                                                                                                    "$1zzes"],
[/z$/i,                                                                                                             "zes"],


[/$/i,                                                                                                              "s"],
],
    "uncountableRules": [
        /(adult|child)hood$/i,
        /craft$/i,
        /deer$/i,
        /fish$/i,
        /measles$/i,
        /pox$/i,
        /sheep$/i,
        /wood$/i,
        /ography$/i,
        /itis$/i,
        /ology$/i,
        /[hw]ealth$/i,
        /bage$/i,
        /llows$/i,
        /ment$/i,
        /friut$/i,
        /tion$/i,
        /work$/i,
        /ing$/i,
        /gage$/i,
        /ism$/i,
        /tics$/i,
        /moose$/i,
        /trout$/i,
    ],
    "uncountableWords": [
        "abroad",
        "acoustics",
        "advice",
        "aid",
        "air",
        "alcohol",
        "alms",
        "alpenglow",
        "aluminum",
        "ammo",
        "anger",
        "anime",
        "applause",
        "arithmetic",
        "art",
        "athletics",
        "audio",
        "awareness",
        "barracks",
        "bad",
        "bakeware",
        "beyond",
        "bifocals",
        "binoculars",
        "bison",
        "blood",
        "bloomers",
        "blouse",
        "boots",
        "bourgeois",
        "bowling",
        "bricklaying",
        "butter",
        "calculus",
        "cappuccino",
        "caribou",
        "carp",
        "cash",
        "casino",
        "castanets",
        "cattle",
        "celeriac",
        "chafe",
        "chalk",
        "chaos",
        "chassis",
        "chess",
        "children",
        "chino",
        "clippers",
        "cod",
        "commerce",
        "concrete",
        "corps",
        "courage",
        "deadness",
        "debris",
        "deer",
        "diabetes",
        "dirt",
        "disco",
        "doldrums",
        "dungarees",
        "economics",
        "egg",
        "electricity",
        "elk",
        "energy",
        "ethics",
        "expertise",
        "fauna",
        "faux pas",
        "fedelini",
        "fibre",
        "fiberglass",
        "flesh",
        "flounder",
        "forestry",
        "fun",
        "furniture",
        "gain",
        "glass",
        "glasses",
        "golf",
        "graffiti",
        "gratitude",
        "grief",
        "grouse",
        "guidance",
        "guilt",
        "haddock",
        "happiness",
        "hardware",
        "hair",
        "halibut",
        "headquarters",
        "helium",
        "helo",
        "help",
        "herpes",
        "high jinks",
        "homework",
        "housework",
        "humidity",
        "humour",
        "hypochondria",
        "hypothermia",
        "ides",
        "ikebana",
        "importance",
        "impudence",
        "incandescence",
        "indigence",
        "innocence",
        "insignia",
        "jeans",
        "jodhpur",
        "judo",
        "justice",
        "karate",
        "kendo",
        "knickers",
        "knowledge",
        "kudos",
        "labour",
        "laughter",
        "leisure",
        "legal",
        "literature",
        "livestock",
        "loneliness",
        "lycra",
        "lye",
        "macaroni",
        "machinery",
        "mackerel",
        "macrame",
        "magic",
        "mail",
        "manga",
        "mambo",
        "mankind",
        "math",
        "means",
        "media",
        "methane",
        "mews",
        "might",
        "most",
        "mud",
        "mullet",
        "multimedia",
        "music",
        "neon",
        "news",
        "nitrogen",
        "normal",
        "oatmeal",
        "obedience",
        "opium",
        "osmosis",
        "outback",
        "oxygen",
        "pants",
        "pantology",
        "pantyhose",
        "passion",
        "patience",
        "peace",
        "penicillin",
        "permafrost",
        "physics",
        "pike",
        "plankton",
        "platinum",
        "plenty",
        "pliers",
        "police",
        "polo",
        "premises",
        "propane",
        "prose",
        "pseudoscience",
        "pyjamas",
        "quicksand",
        "radio",
        "random",
        "rain",
        "rendezvous",
        "reinscription",
        "relief",
        "research",
        "rice",
        "salmon",
        "septicaemia",
        "school",
        "schoolchild",
        "scissors",
        "series",
        "sewage",
        "shambles",
        "shorts",
        "shrimp",
        "sick",
        "smithereens",
        "smog",
        "soccer",
        "software",
        "soot",
        "soy",
        "species",
        "squid",
        "staff",
        "stamina",
        "stupid",
        "subconscious",
        "subsidence",
        "sugar",
        "sunglasses",
        "sunshine",
        "sushi",
        "suspenders",
        "sweats",
        "sweet",
        "sweets",
        "swine",
        "temporariness",
        "terracotta",
        "tennis",
        "thanks",
        "them",
        "tights",
        "timpani",
        "titanium",
        "tongs",
        "tonight",
        "tortellini",
        "traffic",
        "trigonometry",
        "trousers",
        "tuna",
        "tweezers",
        "underclothes",
        "underneath",
        "underpants",
        "underwear",
        "veal",
        "vermicelli",
        "video",
        "vinyl",
        "virus",
        "violence",
        "viscose",
        "warmth",
        "weedkiller",
        "welfare",
        "wheat",
        "whitebait",
        "wildebeest",
        "wildlife",
        "worth",
        "yoga",
        "you",
        "young"
    ],
    "irregulars": {
        "i":            "we",
        "me":           "us",
        "he":           "they",
        "she":          "they",
        "is":           "are",
        "was":          "were",
        "has":          "have",
        "this":         "these",
        "that":         "those",
        "die":          "dice",
        "ox":           "oxen",
    },
    "suffixes": [
        "-up",
        "-out",
        "-in-law",
        "-in-trade"
    ],
    "prefixes": []
}
export default plural;
