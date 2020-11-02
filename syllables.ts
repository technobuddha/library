import { empty }					from './constants';
import toBasicLatin					from './toBasicLatin';
import splitWords					from './splitWords';

//let instructions:	{
//						affix:	{ expr: RegExp, syllables: number }[],
//						adjust: { expr: RegExp, syllables: number }[],
//						irregular: { [key: string]: number },
//					};

//let stripCharacters	= new RegExp('[^\\s' + unicode.Ll + unicode.Lu + ']', 'gu');

//function syllable
//	(	input: string
//	):	number
//{
//	if(input.length <= 3)
//		return 1;

//	if(input in instructions.irregular)
//		return instructions.irregular[input];

//	let		count	= 0;
//	const	inc		= (value: number) => (x: string) => { /*console.log("+", value, x);*/ count += value; return empty; };
//	let		start	= count;

//	do
//	{
//		start	= count;
//		for(let affix of instructions.affix)
//		{
//			input = input.replace(affix.expr, inc(affix.syllables));
//			//console.log(count, input);
//		}
//	}while(start !== count);

//	let word = input;
//	word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, empty).replace(/^y/, empty);
//	//console.log(word);
//	//console.log(word.match(/[aeiouy]{1,2}/g)!.length);

//	//console.log(_.split(input,  /[^aeiouy]+/));
//	count += sum(map(split(input, /[^aeiouy]+/), part => part.length ? 1 : 0));
//	//console.log(" ***", count);

//	for(let adjust of instructions.adjust)
//	{
//		input = input.replace(adjust.expr, inc(adjust.syllables));
//		//console.log(count, input);
//	}

//	return count || 1;
//}

/**
  * Count (approximently) the number of syllables in a string
  * @param input		The string
  */
//function syllables
//	(	input: string
//	):	number
//{
//	if(!instructions)
//	{
//		const json	= require('./syllables-data.json') as
//							{	affix:		{ e: string, s: number }[],
//								adjust:		{ e: string, s: number }[],
//								irregular:	{ [key: string]: number },
//							};
//		instructions =
//		{
//			affix:		map(json.affix,  a => ({ expr: new RegExp(a.e),      syllables: a.s })),
//			adjust:		map(json.adjust, a => ({ expr: new RegExp(a.e, 'g'), syllables: a.s })),
//			irregular:	json.irregular
//		};
//	}

//	return sum(map(splitWords(toBasicLatin(input.toLowerCase()).replace(stripCharacters, empty)), syllable));
//}

/**
  * Count (approximently) the number of syllables in a string
  * @param input		The string
  */
export function syllables(input: string): number {
	return splitWords(toBasicLatin(input.toLowerCase())).reduce(
        (count, word) => {
			if(word.length <= 3)
				count++;
			else {
				word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, empty).replace(/^y/, empty);
				var match = word.match(/[aeiouy]{1,2}/g);
				count += match === null ? 0 : match.length;
			}

			return count;
		},
		0
	);
}

export default syllables;

/*
{
    "affix": [
        {
            "e": "^(un|fore|ware|none?|out|post|sub|pr[eo]|dis|side)",
            "s": 1
        },
        {
            "e": "(ly|less|some|ful|ers?|ness|cians?|ments?|ettes?|villes?|ships?|sides?|ports?|shires?|tion(ed)?)$",
            "s": 1
        },
        {
            "e": "^(above|ant[ie]]|counter|hyper|afore|agri|in[ft]ra|inter|over|semi|ultra|under|extra|dia|m[ai]cro|mega|kilo|pico|nano)",
            "s": 2
        },
        {
            "e": "(fully|berry|wom[ae]n)$",
            "s": 2
        },
        {
            "e": "(o(log|nom)(y|ist))$",
            "s": 3
        }
    ],
    "adjust": [
        {
            "e": "cia(l|$)|tia|cio?us|[^aeiou]giu|[aeiouy][^aeiouy]ion|iou|sia$|eous$|[oa]gue$|[^aeiuoycgltdb]{2,}ed$|.ely$|^jua|uai|eau|^busi$",
            "s": -1
        },
        {
            "e": "[aeiouy](b|ch?|dg?|f|g[hn]?|k|l(l|v)?|mm?|n[cgn]?|p|r[cnsv]?|s(c|k|l|qu|s|t)?|th?|v|y|z)e$",
            "s": -1
        },
        {
            "e": "[aeiouy](b|ch?|dg|f|g[hn]?|k|l(ch|l|v)?|mm?|n(c|g|ch|n)?|p|r[cnsv]?|s(c|k|l|qu|s)?|th|v|y|z)ed$",
            "s": -1
        },
        {
            "e": "[aeiouy](b|ch|d|f|g[hn]|k|l(ch|l|v)?|mm?|n(ch|n)?|p|r[nsv]?|s(c|k|l|qu|s|t)?|th?|v|y)es$",
            "s": -1
        },
        {
            "e": "([^s]|^)ia|riet|dien|iu|io|eo($|b-df-hj-np-t-z])|ii|[ou]a$|[aeiouym]bl$|[aeiou]{3}|[aeiou]y[aeiou]|^mc|ism$|asm$|thm$|(aa|ee|ii|oo|uu|yy)l$|[^l]lien|^coa[dglx].|[^gq]ua[^auieo]|dnt$|uity$|[^aeiouy]ie(r|st|t)$|eings?$|[aeiouy]sh?e[rsd]$|iell|dea$|real|[^aeiou]y[ae]|gean$|uen",
            "s": 1
        }
    ],
    "irregular": {
        "abalone": 4,
        "abalones": 4,
        "abare": 3,
        "abed": 2,
        "abruzzese": 4,
        "abbruzzese": 4,
        "aborigine": 5,
        "aborigines": 5,
        "acreage": 3,
        "acreages": 3,
        "adame": 3,
        "adieu": 2,
        "adieux": 2,
        "adieus": 2,
        "adobe": 3,
        "adobes": 2,
        "anemone": 4,
        "anemones": 4,
        "apache": 3,
        "apaches": 3,
        "aphrodite": 4,
        "apostrophe": 4,
        "apostrophes": 4,
        "ariadne": 4,
        "cafe": 2,
        "cafes": 2,
        "calliope": 4,
        "calliopes": 4,
        "catastrophe": 4,
        "catastrophes": 4,
        "chile": 2,
        "chiles": 2,
        "chloe": 2,
        "circe": 2,
        "coyote": 3,
        "coyotes": 3,
        "epitome": 4,
        "epitomes": 4,
        "epitomai": 4,
        "forever": 3,
        "forevers": 3,
        "gethsemane": 4,
        "guacamole": 4,
        "guacamoles": 4,
        "hyperbole": 4,
        "hyperboles": 4,
        "jesse": 2,
        "jesses": 2,
        "jukebox": 2,
        "jukeboxes": 2,
        "karate": 3,
        "machete": 3,
        "machetes": 3,
        "maybe": 2,
        "maybes": 2,
        "people": 2,
        "peoples": 2,
        "recipe": 3,
        "recipes": 3,
        "sesame": 3,
        "sesames": 3,
        "shoreline": 2,
        "shorelines": 2,
        "simile": 3,
        "similes": 3,
        "similia": 3,
        "syncope": 3,
        "syncopes": 3,
        "tamale": 3,
        "tamales": 3,
        "yosemite": 4,
        "daphne": 2,
        "daphnes": 2,
        "eurydice": 4,
        "euterpe": 3,
        "hermione": 4,
        "penelope": 4,
        "persephone": 4,
        "phoebe": 2,
        "zoe": 2
    }
}
*/