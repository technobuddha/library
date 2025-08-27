<!-- markdownlint-disable -->
Technobuddha Library
---


# Index

## Array

### Creation

| Function | Description |
| ------ | ------ |
| [create2DArray](Array/create2DArray.md) | Create a two dimensional array with all elements initialized |

### Iteration

| Name | Description |
| ------ | ------ |
| [LookAheadOptions](Array/LookAheadOptions.md) | Options for [lookAhead](Array/lookAhead.md) operations. |
| [lookAhead](Array/lookAhead.md) | Generates pairs of consecutive elements from the input array, with optional handling for the last element. |

### Methods

| Name | Description |
| ------ | ------ |
| [Collapsible](Array/Collapsible.md) | Represents a value that can be "collapsed" into a flat sequence of values of type `T`. |
| [CollapsiblePrimitive](Array/CollapsiblePrimitive.md) | Represents a primitive type that excludes `null` and `undefined`. |
| [CollapsibleValue](Array/CollapsibleValue.md) | Represents a primitive value including `null` and `undefined`. |
| [LongestCommonSubsequenceOptions](Array/LongestCommonSubsequenceOptions.md) | Options for configuring the [longestCommonSubsequence](Array/longestCommonSubsequence.md) calculation. |
| [collapse](Array/collapse.md) | Collapses an array of values into a flat array with `null` and `undefined` elements removed. |
| [longestCommonSubsequence](Array/longestCommonSubsequence.md) | Determine the longest possible array that is subsequence of both of given arrays. |
| [zipperMerge](Array/zipperMerge.md) | Merges multiple arrays into a single array by interleaving their elements at each index. |

### Type Check

| Function | Description |
| ------ | ------ |
| [isArrayLike](Array/isArrayLike.md) | Determines whether the provided value is array-like. |

## Encoding

### Binary

| Name | Description |
| ------ | ------ |
| [BinaryEncoding](Encoding/BinaryEncoding.md) | Formats for binary encoding |
| [BinaryObject](Encoding/BinaryObject.md) | A type that represents various binary object types in JavaScript. |
| [dataURL](Encoding/dataURL.md) | Convert any binary object into a data URL |
| [decodeBase64](Encoding/decodeBase64.md) | Decodes a string of data which has been encoded using [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding. |
| [decodeBase64Url](Encoding/decodeBase64Url.md) | Decodes a string of data which has been encoded using [Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding. |
| [decodeBinary](Encoding/decodeBinary.md) | Decode a string into a binary object |
| [encodeBase64](Encoding/encodeBase64.md) | Creates a encoded ASCII string from a string using [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding. |
| [encodeBase64Url](Encoding/encodeBase64Url.md) | Creates a encoded ASCII string from a string using [Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding. |
| [encodeBinary](Encoding/encodeBinary.md) | Encode an binary object into a string |
| [normalizeBinary](Encoding/normalizeBinary.md) | Normalizes various binary object types to a `Uint8Array`. |

### Escaping

| Name | Description |
| ------ | ------ |
| [EscapeHtmlOptions](Encoding/EscapeHtmlOptions.md) | Options for [escapeHTML](Encoding/escapeHTML.md) |
| [escapeC](Encoding/escapeC.md) | Escape a string for use in C/C++ |
| [escapeGraphQL](Encoding/escapeGraphQL.md) | Escape a string for use in GraphQL |
| [escapeHTML](Encoding/escapeHTML.md) | Escape a string for use in HTML |
| [escapeJava](Encoding/escapeJava.md) | Escape a string for use in Java |
| [escapeJS](Encoding/escapeJS.md) | Escape a string for use in Javascript |
| [escapePython](Encoding/escapePython.md) | Escape a string for use in Python |
| [unescapeC](Encoding/unescapeC.md) | Unescape a string encoded in C style |
| [unescapeHTML](Encoding/unescapeHTML.md) | Unescape a string encoded in HTML |
| [unescapeJava](Encoding/unescapeJava.md) | Unescape a string encoded in Java style |
| [unescapeJS](Encoding/unescapeJS.md) | Unescape a string encoded in Javascript style |
| [unescapePython](Encoding/unescapePython.md) | Unescape a string encoded in Python style |

### Hash

| Class | Description |
| ------ | ------ |
| [Crc32](Encoding/Crc32.md) | Compute the CRC32 checksum of a binary object |
| [HashBase](Encoding/HashBase.md) | Abstract base class for hash algorithm implementations. |
| [Sha1](Encoding/Sha1.md) | Secure Hash Algorithm, SHA-1 |
| [Sha224](Encoding/Sha224.md) | Secure Hash Algorithm, SHA2 SHA-224 |
| [Sha256](Encoding/Sha256.md) | Secure Hash Algorithm, SHA2 SHA-256 |
| [Sha384](Encoding/Sha384.md) | Secure Hash Algorithm, SHA2 SHA-384 |
| [Sha512](Encoding/Sha512.md) | Secure Hash Algorithm, SHA2 SHA-512 |
| [ShaBase](Encoding/ShaBase.md) | The base class for sha based cryptographic hash functions |

## English

### Analysis

| Function | Description |
| ------ | ------ |
| [readability](English/readability.md) | Calculates the Flesch-Kincaid readability score for a given text. |
| [splitSentences](English/splitSentences.md) | Splits the input string into an array of sentences. |
| [splitWords](English/splitWords.md) | Split a string into an array of words |
| [syllables](English/syllables.md) | Approximate the number of syllables in a string |

### Parts of Speech

| Name | Description |
| ------ | ------ |
| [ConjoinOptions](English/ConjoinOptions.md) | Options for creating a coordinated list with [conjoin](English/conjoin.md) |
| [IndefiniteArticleOptions](English/IndefiniteArticleOptions.md) | Options for [indefiniteArticle](English/indefiniteArticle.md) to determine the indefinite article to use with a word. |
| [conjoin](English/conjoin.md) | Create a list from an array, separating values and inserting a conjunction |
| [indefiniteArticle](English/indefiniteArticle.md) | Determine the appropriate indefinite article to use with a word. |
| [plural](English/plural.md) | Return the plural version of the input string |
| [possessive](English/possessive.md) | Determine the possessive form of a word |

## Geometry

### Angle

| Name | Description |
| ------ | ------ |
| [AngleUnit](Geometry/AngleUnit.md) | Types of angle units |
| [OriginOptions](Geometry/OriginOptions.md) | Options for origin-related functions |
| [UnitOptions](Geometry/UnitOptions.md) | Options for angle-related functions |
| [angleUnits](Geometry/angleUnits.md) | Number of units in a circle |
| [angleBetweenPoints](Geometry/angleBetweenPoints.md) | Computes the angle between two points (x1,y1) and (x2,y2). Angle zero points in the +X direction, π/2 radians points in the +Y direction (down) and from there we grow clockwise towards π*2 radians. |
| [angleDifference](Geometry/angleDifference.md) | Computes the difference between startAngle and endAngle. |
| [angleOfLine](Geometry/angleOfLine.md) | Calculates the angle of a given line segment, relative to the horizontal axis |
| [angleReflection](Geometry/angleReflection.md) | Calculates the reflection of an angle across a specified axis. |
| [normalizeAngle](Geometry/normalizeAngle.md) | Normalizes an angle to be in range 0-1 turns. |
| [toAngle](Geometry/toAngle.md) | Converts an angle from one unit to another. |
| [toDegrees](Geometry/toDegrees.md) | Convert an angle from radians to degrees |
| [toRadians](Geometry/toRadians.md) | Converts degrees to radians. |

### Coordinates

| Name | Description |
| ------ | ------ |
| [Cartesian](Geometry/Cartesian.md) | Represents a point in 2D Cartesian coordinate space. |
| [Polar](Geometry/Polar.md) | Polar coordinate (angle, radius) |
| [XY](Geometry/XY.md) | Represents a two-dimensional amount `x` and `y` aspects. |
| [Origin](Geometry/Origin.md) | The origin of cartesian coordinates (0, 0) |
| [isCartesian](Geometry/isCartesian.md) | Determines if the provided value is a Cartesian point. |
| [isPolar](Geometry/isPolar.md) | Determines if the provided value is a Polar point. |
| [toCartesian](Geometry/toCartesian.md) | Convert polar coordinates to cartesian |
| [toPolar](Geometry/toPolar.md) | Convert cartesian coordinates to polar |

### Line Segment

| Name | Description |
| ------ | ------ |
| [LineSegment](Geometry/LineSegment.md) | Represents a line segment in 2D space, defined by its start and end points. |
| [OnLineOptions](Geometry/OnLineOptions.md) | Options for the [isOnLine](Geometry/isOnLine.md) function |
| [angleOfLine](Geometry/angleOfLine.md) | Calculates the angle of a given line segment, relative to the horizontal axis |
| [isIntersecting](Geometry/isIntersecting.md) | Determines whether a given shape (either a LineSegment or a Polygon) intersects with a polygon. |
| [isLeftOfLine](Geometry/isLeftOfLine.md) | Determines whether a given point lies to the left of a specified line segment. |
| [isOnLine](Geometry/isOnLine.md) | Determines whether a given point lies on a specified line segment or its extension. |
| [isRightOfLine](Geometry/isRightOfLine.md) | Determines whether a given point lies to the right of a specified line segment. |
| [lineIntersection](Geometry/lineIntersection.md) | Calculates the intersection point of two line segments. |
| [lineLength](Geometry/lineLength.md) | Calculates the length of a line segment. |
| [midpoint](Geometry/midpoint.md) | Calculates a point at a given fraction (`part`) along a line segment. By default it returns the true midpoint of the line segment |
| [normalizeLineSegment](Geometry/normalizeLineSegment.md) | Returns a [LineSegment](Geometry/LineSegment.md) where the point with the higher y-coordinate is always the starting point (x0, y0). If the original line's y1 is greater than y0, the line is returned as-is. Otherwise, the start and end points are swapped. |

### Point

| Function | Description |
| ------ | ------ |
| [isInPolygon](Geometry/isInPolygon.md) | Determines whether a given point or rectangle is inside or on the edge of a polygon. |
| [isLeftOfLine](Geometry/isLeftOfLine.md) | Determines whether a given point lies to the left of a specified line segment. |
| [isOnLine](Geometry/isOnLine.md) | Determines whether a given point lies on a specified line segment or its extension. |
| [isRightOfLine](Geometry/isRightOfLine.md) | Determines whether a given point lies to the right of a specified line segment. |
| [manhattanDistance](Geometry/manhattanDistance.md) | Calculates the Manhattan Distance between two points in Cartesian coordinates. |
| [rotate](Geometry/rotate.md) | Rotates a point or a polygon around a given origin by a specified angle. |
| [scale](Geometry/scale.md) | Scales a point or a polygon of points around a given origin by a specified amount. |
| [translate](Geometry/translate.md) | Translate a point or polygon by a specified amount. |

### Polygon

| Name | Description |
| ------ | ------ |
| [Polygon](Geometry/Polygon.md) | A polygon (a set of cartesian coordinates) |
| [area](Geometry/area.md) | Calculates the area of a polygon given its vertices. |
| [bounds](Geometry/bounds.md) | Calculates the axis-aligned bounding rectangle for a given polygon. |
| [centroid](Geometry/centroid.md) | Calculates the centroid (geometric center) of a polygon given its vertices. |
| [convexHull](Geometry/convexHull.md) | Computes the convex hull of a set of 2D points using the Monotone Chain algorithm. |
| [edgeAngles](Geometry/edgeAngles.md) | Generate normalized edge angles from polygon edges. |
| [isInPolygon](Geometry/isInPolygon.md) | Determines whether a given point or rectangle is inside or on the edge of a polygon. |
| [isIntersecting](Geometry/isIntersecting.md) | Determines whether a given shape (either a LineSegment or a Polygon) intersects with a polygon. |
| [largestInscribedRectangle](Geometry/largestInscribedRectangle.md) | Computes the largest rectangle that can be inscribed within the given polygon. |
| [perimeter](Geometry/perimeter.md) | Calculates the perimeter of a polygon given its vertices. |
| [regularPolygon](Geometry/regularPolygon.md) | Generates the vertices of a regular polygon as an array of Cartesian points. |
| [rotate](Geometry/rotate.md) | Rotates a point or a polygon around a given origin by a specified angle. |
| [scale](Geometry/scale.md) | Scales a point or a polygon of points around a given origin by a specified amount. |
| [star](Geometry/star.md) | Generates the vertices of a star-shaped polygon. |
| [toPolygon](Geometry/toPolygon.md) | Converts two Cartesian points or a rectangle into a `Polygon` object. |
| [translate](Geometry/translate.md) | Translate a point or polygon by a specified amount. |

### Rectangle

| Name | Description |
| ------ | ------ |
| [LargestInscribedRectUnitOptions](Geometry/LargestInscribedRectUnitOptions.md) | Configuration options for the largest inscribed rectangle algorithm. |
| [Rect](Geometry/Rect.md) | A rectangle (defined by its top-left corner, width and height) |
| [RotatedRect](Geometry/RotatedRect.md) | Represents a rectangle that has been rotated by a certain angle. Extends the `Rect` type with additional properties for the area and rotation angle. |
| [isInPolygon](Geometry/isInPolygon.md) | Determines whether a given point or rectangle is inside or on the edge of a polygon. |
| [isRect](Geometry/isRect.md) | Determines if the provided value is a Rectangle. |
| [largestInscribedRectangle](Geometry/largestInscribedRectangle.md) | Computes the largest rectangle that can be inscribed within the given polygon. |
| [toSquare](Geometry/toSquare.md) | Converts a given rectangle to the largest possible square that fits within it, centered along the longer dimension. If the rectangle is already a square, it returns the original rectangle. |

## JSON

### Data Structures

| Class | Description |
| ------ | ------ |
| [JSONMap](JSON/JSONMap.md) | A Map-like data structure that allows objects conforming to `JsonObject` as keys. |
| [JSONSet](JSON/JSONSet.md) | A Set-like collection for objects that can be serialized to JSON. |

### Serialization

| Name | Description |
| ------ | ------ |
| [specialBegin](JSON/specialBegin.md) | The beginning of a special JSON value |
| [specialFinish](JSON/specialFinish.md) | The end of a special JSON value |
| [replacer](JSON/replacer.md) | Used with JSON.stringify to encode a wider range of objects into strings that can later be decoded with [reviver](JSON/reviver.md) |
| [reviver](JSON/reviver.md) | Used with JSON.parse to decode objected encoded by [replacer](JSON/replacer.md) |

## Math

### Arithmetic

| Name | Description |
| ------ | ------ |
| [CeilOptions](Math/CeilOptions.md) | Options for the [ceil](Math/ceil.md) function |
| [FloorOptions](Math/FloorOptions.md) | Options for the [floor](Math/floor.md) function |
| [RoundOptions](Math/RoundOptions.md) | Options for the [round](Math/round.md) function |
| [ceil](Math/ceil.md) | Returns the smallest integer greater than or equal to the given number, with optional tolerance and precision adjustments. |
| [clamp](Math/clamp.md) | Clamps a number within the inclusive range specified by `min` and `max`. |
| [crossProduct](Math/crossProduct.md) | Calculates the cross product of vectors OA and OB, where O, A, and B are points in 2D Cartesian space. The result is positive if the sequence OAB makes a counter-clockwise turn, negative for a clockwise turn, and zero if the points are collinear. |
| [floor](Math/floor.md) | Returns the largest integer less than or equal to the given number, with optional tolerance and precision adjustments. |
| [lerp](Math/lerp.md) | Performs linear interpolation between values a and b. Returns the value between a and b proportional to x (when x is between 0 and 1. When x is outside this range, the return value is a linear extrapolation). |
| [modulo](Math/modulo.md) | The % operator in JavaScript returns the remainder of a / b, but differs from some other languages in that the result will have the same sign as the dividend. For example, -1 % 8 == -1, whereas in some other languages (such as Python) the result would be 7. This function emulates the more correct modulo behavior, which is useful for certain applications such as calculating an offset index in a circular list. |
| [round](Math/round.md) | Returns the nearest integer to the given number, with optional precision adjustments. |

### Comparison

| Name | Description |
| ------ | ------ |
| [ApproximatelyEqualsOptions](Math/ApproximatelyEqualsOptions.md) | Options for the [approximatelyEquals](Math/approximatelyEquals.md) function |
| [approximatelyEquals](Math/approximatelyEquals.md) | Tests whether the two values are equal to each other, within a certain tolerance, taking into account floating point errors (numbers within EPSILON). |
| [compareNumbers](Math/compareNumbers.md) | Compare two numbers |
| [isNegativeZero](Math/isNegativeZero.md) | Tests to see if the specified value is negative zero |

### Constants

| Variable | Description |
| ------ | ------ |
| [cardinalOnes](Math/cardinalOnes.md) | Words for unit numbers 0-19 |
| [cardinalTens](Math/cardinalTens.md) | Words for tens 20-90 |
| [negativeZero](Math/negativeZero.md) | Negative Zero |
| [ordinalOnes](Math/ordinalOnes.md) | Words for ordinal numbers 0-19 |
| [ordinalTens](Math/ordinalTens.md) | Words for ordinal tens 20-90 |

### Number

| Function | Description |
| ------ | ------ |
| [constructNumber](Math/constructNumber.md) | Reconstructs a number from its deconstructed representation. |

### Numbers

| Name | Description |
| ------ | ------ |
| [CardinalOptions](Math/CardinalOptions.md) | Configuration options for cardinal number conversion. |
| [DeconstructedNumber](Math/DeconstructedNumber.md) | Represents a number that has been deconstructed into its mathematical components. |
| [FractionOptions](Math/FractionOptions.md) | Options for customizing the output and behavior of fraction number representations. |
| [Numbering](Math/Numbering.md) | Options for controlling how numbers are converted to words or symbols. |
| [OrdinalOptions](Math/OrdinalOptions.md) | Options for formatting ordinal numbers. |
| [RomanOptions](Math/RomanOptions.md) | Options for converting numbers to Roman numerals. |
| [cardinal](Math/cardinal.md) | Convert a number into text (the cardinal number) |
| [deconstructNumber](Math/deconstructNumber.md) | Deconstructs a number into its sign, value, mantissa, and exponent, and separates its whole and fractional parts. |
| [formatNumber](Math/formatNumber.md) | Formats a number according to the specified mask. |
| [fraction](Math/fraction.md) | Converts a numeric input into a formatted fraction string, either in numeric or alphabetic form. |
| [orderOfMagnitude](Math/orderOfMagnitude.md) | Get the spelled out word for an exponent |
| [ordinal](Math/ordinal.md) | Convert a number into an ordinal number string (1st, 2nd, 3rd, etc). |
| [padNumber](Math/padNumber.md) | Add leading zeros to a number to ensure a string of a minimum length |
| [parseRoman](Math/parseRoman.md) | Parse a roman numeral string into it's integer value. |
| [summarize](Math/summarize.md) | Get a short description of a number |
| [toRoman](Math/toRoman.md) | Parse number into a roman numeral string |

### Parity

| Function | Description |
| ------ | ------ |
| [isEven](Math/isEven.md) | Tests to see if the specified value is an even integer |
| [isMultipleOf](Math/isMultipleOf.md) | Tests to see if the specified value is an multiple of *multiplier* |
| [isOdd](Math/isOdd.md) | Tests to see if the specified value is an odd integer |

### Statistics

| Function | Description |
| ------ | ------ |
| [mean](Math/mean.md) | Calculates the arithmetic mean (average) of an array of numbers. |
| [median](Math/median.md) | Calculates the median value of an array of numbers. |
| [mode](Math/mode.md) | Returns the mode (the most frequently occurring element) of the given array. If multiple elements have the same highest frequency, the first encountered is returned. Returns `undefined` if the array is empty. |
| [standardDeviation](Math/standardDeviation.md) | Returns the sample [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the arguments. |
| [sum](Math/sum.md) | Calculates the sum of an array of numbers. |
| [variance](Math/variance.md) | Returns the unbiased sample [Variance](https://en.wikipedia.org/wiki/Variance) of the arguments. |

## Object

### Clear Object

| Function | Description |
| ------ | ------ |
| [clearObject](Object/clearObject.md) | Delete all own enumerable string properties from an object |

### Comparison

| Function | Description |
| ------ | ------ |
| [compare](Object/compare.md) | Compare two objects |
| [shallowEquals](Object/shallowEquals.md) | Compare two object for equality. Testing goes one level deep. |

### Utility

| Function | Description |
| ------ | ------ |
| [sortKeys](Object/sortKeys.md) | Recursively sorts the keys of an object in lexicographical order. |

## Primitive

### Conversion

| Function | Description |
| ------ | ------ |
| [toError](Primitive/toError.md) | Convert the entity to an Error object. |
| [toInteger](Primitive/toInteger.md) | Convert an entity to a integer number. |
| [toNumber](Primitive/toNumber.md) | Convert an entity to a number. |
| [toPrimitive](Primitive/toPrimitive.md) | Convert an object into its primitive (string, number, etc.) value |

### Testing

| Function | Description |
| ------ | ------ |
| [isPrimitive](Primitive/isPrimitive.md) | Check to see if an object is a primitive |

## Programming

### Case Conversion

| Function | Description |
| ------ | ------ |
| [startCase](Programming/startCase.md) | Converts a given string to start case, capitalizing the first letter of each word and converting the rest to lowercase. |
| [tokenize](Programming/tokenize.md) | Splits the input string into an array of words. |

## Random

### Number Generation

| Class | Description |
| ------ | ------ |
| [MersenneTwister](Random/MersenneTwister.md) | Implements the Mersenne Twister pseudorandom number generator (MT19937). |

### Pick

| Name | Description |
| ------ | ------ |
| [Weighted](Random/Weighted.md) | Represents an object with an associated weight value. |
| [randomDraw](Random/randomDraw.md) | Draw a random item from a list. Returning both the item and the list without the drawn item. |
| [randomPick](Random/randomPick.md) | Pick a random items from a list. |
| [randomWeightedPick](Random/randomWeightedPick.md) | Selects a random item from a list, where each item has an associated weight that determines its likelihood of being picked. |

### Shuffle

| Function | Description |
| ------ | ------ |
| [randomShuffle](Random/randomShuffle.md) | Returns a new array with the elements of the input array shuffled in random order. |

## RegExp

### Matching

| Function | Description |
| ------ | ------ |
| [matches](RegExp/matches.md) | Determines if the given `text` matches the provided `match` criteria. |

### Template

| Function | Description |
| ------ | ------ |
| [re](RegExp/re.md) | Constructs a new `RegExp` by interpolating template strings and provided regular expressions. |

### Validation

| Variable | Description |
| ------ | ------ |
| [domain](RegExp/domain.md) | Regular expression for matching a domain name composed of a host and a top-level domain (TLD). |
| [email](RegExp/email.md) | validate an valid email address |
| [ipV4](RegExp/ipV4.md) | validate an IPv4 address |
| [ipV4Local](RegExp/ipV4Local.md) | determine if Ipv4 address is local |
| [isoDate](RegExp/isoDate.md) | Validate a ISO formatted date |
| [numeric](RegExp/numeric.md) | Validate a valid number |

## String

### Affix

| Name | Description |
| ------ | ------ |
| [RootOptions](String/RootOptions.md) | Options for the [root](String/root.md) function |
| [ensurePrefix](String/ensurePrefix.md) | Add a prefix to a string, if it does not already have the prefix |
| [ensureSuffix](String/ensureSuffix.md) | Add a suffix to a string, if it does not already have the suffix |
| [root](String/root.md) | Extract the root word, removing a prefix and/or suffix |

### Build

| Function | Description |
| ------ | ------ |
| [build](String/build.md) | Concatenates strings and/or arrays of strings |

### Case Conversion

| Function | Description |
| ------ | ------ |
| [camelCase](String/camelCase.md) | Convert an identifier string to a camel case |
| [capitalize](String/capitalize.md) | Capitalize the first word in a sentence, or capitalize a single word. |
| [dotCase](String/dotCase.md) | Convert an identifier string to a dot form |
| [humanCase](String/humanCase.md) | Convert an identifier string to a human case |
| [kebabCase](String/kebabCase.md) | Convert an identifier string to a kebab-case form |
| [macroCase](String/macroCase.md) | Convert an identifier string to macro case |
| [matchCase](String/matchCase.md) | Attempt to convert the input string into the same case as the target string |
| [pascalCase](String/pascalCase.md) | Convert an identifier string to pascal case |
| [snakeCase](String/snakeCase.md) | Convert an identifier string to snake case |
| [title](String/title.md) | Convert a string to a title, capitalizing each word, except for the small words |
| [uncapitalize](String/uncapitalize.md) | Capitalize the first word in a sentence, or capitalize a single word. |

### Categorization

| Function | Description |
| ------ | ------ |
| [isAlpha](String/isAlpha.md) | Test a string for all alphabetic characters |
| [isAlphaNumeric](String/isAlphaNumeric.md) | Test a string for all alphanumeric characters |
| [isLowerCase](String/isLowerCase.md) | Test a string for all lower case characters |
| [isNumeric](String/isNumeric.md) | Test an object to see if it a number, or a string which can be converted into a number |
| [isPunctuation](String/isPunctuation.md) | Test a string for all punctuation characters |
| [isUpperCase](String/isUpperCase.md) | Test a string for all upper case characters |
| [isWhitespace](String/isWhitespace.md) | Test a string for all white space characters |

### Chop

| Name | Description |
| ------ | ------ |
| [ChopOptions](String/ChopOptions.md) | Options for the [chop](String/chop.md) function |
| [chop](String/chop.md) | Break a string into equal sized segments of characters |

### Clean

| Function | Description |
| ------ | ------ |
| [clean](String/clean.md) | Remove all occurrences of characters from the beginning and end of the string |

### Collapse

| Name | Description |
| ------ | ------ |
| [CollapseBreakingSpaceOptions](String/CollapseBreakingSpaceOptions.md) | Options for the [collapseBreakingSpace](String/collapseBreakingSpace.md) function |
| [CollapseWhitespaceOptions](String/CollapseWhitespaceOptions.md) | Options for the [collapseWhitespace](String/collapseWhitespace.md) function |
| [collapseBreakingSpace](String/collapseBreakingSpace.md) | Replace all breaking space (space, tab, carriage return, new line) with a single space |
| [collapseWhitespace](String/collapseWhitespace.md) | Replace all whitespace within a string with a single space |

### Comparison

| Name | Description |
| ------ | ------ |
| [CompareStringsOptions](String/CompareStringsOptions.md) | Options for the [compareStrings](String/compareStrings.md) function |
| [compareStrings](String/compareStrings.md) | Compare two strings |

### Constants

| Variable | Description |
| ------ | ------ |
| [trimEquivalent](String/trimEquivalent.md) | Regular expression that matches any whitespace character, including standard spaces, non-breaking spaces (`\u00A0`), and zero-width no-break spaces (`\uFEFF`). Useful for trimming or identifying whitespace-equivalent characters in strings. |

### Conversion

| Name | Description |
| ------ | ------ |
| [BooleanOptions](String/BooleanOptions.md) | Options for the [toBoolean](String/toBoolean.md) function |
| [FilenameOptions](String/FilenameOptions.md) | Options for the [toFilename](String/toFilename.md) function |
| [toBoolean](String/toBoolean.md) | Convert a string to a boolean value |
| [toEnumeration](String/toEnumeration.md) | Convert a string to a numeric value |
| [toFilename](String/toFilename.md) | Convert a string so that it can be used as a filename |

### Correction

| Function | Description |
| ------ | ------ |
| [correctMSWord](String/correctMSWord.md) | Correct character sequences that Microsoft Word changes to make it look prettier |

### Delimited

| Name | Description |
| ------ | ------ |
| [CountOptions](String/CountOptions.md) | Options for the [count](String/count.md) function |
| [count](String/count.md) | Compute the number of times a substring occurs within a string |
| [delimited](String/delimited.md) | Return a field from a delimited string |

### Extraction

| Function | Description |
| ------ | ------ |
| [extractDigits](String/extractDigits.md) | Remove all non-digit characters from a string |
| [toASCII](String/toASCII.md) | Change a string to be all from the basic latin unicode plane |

### Fuzzy Match

| Name | Description |
| ------ | ------ |
| [DiceCoefficientOptions](String/DiceCoefficientOptions.md) | Options for the [diceCoefficient](String/diceCoefficient.md) function |
| [FuzzyMatchOptions](String/FuzzyMatchOptions.md) | Options for the [fuzzyMatch](String/fuzzyMatch.md) function |
| [LevenshteinDistanceOptions](String/LevenshteinDistanceOptions.md) | Options for the [levenshteinDistance](String/levenshteinDistance.md) function |
| [LongestCommonSubstringOptions](String/LongestCommonSubstringOptions.md) | Options for configuring the longest common substring calculation. |
| [diceCoefficient](String/diceCoefficient.md) | Compute the dice coefficient measure of similarity between two strings |
| [fuzzyMatch](String/fuzzyMatch.md) | Computes a fuzzy similarity score between two strings using a weighted combination of Levenshtein distance, Dice coefficient, and longest common substring metrics. |
| [levenshteinDistance](String/levenshteinDistance.md) | Compute the levenshtein distance between two strings (similarity) |
| [longestCommonSubstring](String/longestCommonSubstring.md) | Implementation of [Longest Common Substring](https://en.wikipedia.org/wiki/Longest_common_substring_problem) algorithm. |

### HTML

| Function | Description |
| ------ | ------ |
| [tag](String/tag.md) | Surround text with an HTML tag |

### Indentation

| Name | Description |
| ------ | ------ |
| [IndentOptions](String/IndentOptions.md) | Options for the indentation functions: [getIndent](String/getIndent.md), [indent](String/indent.md), and [unindent](String/unindent.md) |
| [getIndent](String/getIndent.md) | Determine the indentation level of text |
| [indent](String/indent.md) | Indent each line of a string |
| [unindent](String/unindent.md) | Remove indentation from text |

### Mask

| Name | Description |
| ------ | ------ |
| [MaskOptions](String/MaskOptions.md) | Options for the [mask](String/mask.md) function |
| [mask](String/mask.md) | Use a simple mask to display a string |

### Quoting

| Name | Description |
| ------ | ------ |
| [QuoteOptions](String/QuoteOptions.md) | Options for the [quote](String/quote.md) and [unquote](String/unquote.md) function |
| [quote](String/quote.md) | Surround text with quotes |
| [unquote](String/unquote.md) | Remove surrounding quotes from text |

### Sorting

| Name | Description |
| ------ | ------ |
| [NumberToLetterOptions](String/NumberToLetterOptions.md) | Options for the [numberToLetter](String/numberToLetter.md) function |
| [SortOrderOptions](String/SortOrderOptions.md) | Options for the [sortOrder](String/sortOrder.md) function |
| [groupCode](String/groupCode.md) | Determine the group code (A-Z, [] or #) to place an item under |
| [numberToLetter](String/numberToLetter.md) | Convert a number to a letter, using the alphabet (default: A-Z) |
| [sortOrder](String/sortOrder.md) | Convert a string into a sortable string |

### Split

| Name | Description |
| ------ | ------ |
| [SplitWordsOptions](String/SplitWordsOptions.md) | Options for the [splitWords](English/splitWords.md) function |
| [splitChars](String/splitChars.md) | Split a string into an array of characters |
| [splitLines](String/splitLines.md) | Split a string into an array of lines |

### Templates

| Name | Description |
| ------ | ------ |
| [FillTemplateOptions](String/FillTemplateOptions.md) | Options for the [fillTemplate](String/fillTemplate.md) function |
| [fillTemplate](String/fillTemplate.md) | Fill a template with supplied values |

### Units

| Name | Description |
| ------ | ------ |
| [BinaryUnitsOptions](String/BinaryUnitsOptions.md) | Options for the [binaryUnits](String/binaryUnits.md) function |
| [MetricUnitsOptions](String/MetricUnitsOptions.md) | Options for the [metricUnits](String/metricUnits.md) function w |
| [binaryUnits](String/binaryUnits.md) | Abbreviate a binary number by adding a suffix for metric units (i.e. 1024 =\> 1K) |
| [metricUnits](String/metricUnits.md) | Abbreviate a number by adding a suffix for metric units (i.e. 1000 =\> 1K, .0001 = 1m) |

### Word Wrapping

| Name | Description |
| ------ | ------ |
| [WordwrapOptions](String/WordwrapOptions.md) | Options for the [wordwrap](String/wordwrap.md) function |
| [wordwrap](String/wordwrap.md) | Wrap text so that it fits within a area of fixed width |

## Template

### GraphQl

| Name | Description |
| ------ | ------ |
| [GraphQLArray](Template/GraphQLArray.md) | A GraphQL Array, similar to a JSONArray |
| [GraphQLObject](Template/GraphQLObject.md) | A GraphQL Object, similar to a JSONObject |
| [GraphQLValue](Template/GraphQLValue.md) | A GraphQL Value, similar to a JSONValue |
| [graphQL](Template/graphQL.md) | Tagged template function for constructing GraphQL queries or mutations. |

### Single Line

| Function | Description |
| ------ | ------ |
| [singleLine](Template/singleLine.md) | Joins a template literal into a single line string by removing line breaks and leading whitespace, then interleaving the provided arguments. The result is a trimmed, single-line string. |

## Time

### Alteration

| Name | Description |
| ------ | ------ |
| [TimeIncrement](Time/TimeIncrement.md) | Represents amount of time to use for [addTime](Time/addTime.md) |
| [addTime](Time/addTime.md) | Add units of time to a Date |

### Constants

| Variable | Description |
| ------ | ------ |
| [daysPerWeek](Time/daysPerWeek.md) | Number of days in a week [7] |
| [hoursPerDay](Time/hoursPerDay.md) | Number of hours in a day [24] |
| [hoursPerWeek](Time/hoursPerWeek.md) | Number of hours in a week [168] |
| [minutesPerDay](Time/minutesPerDay.md) | Number of minutes in a day [1440] |
| [minutesPerHour](Time/minutesPerHour.md) | Number of minutes in an hour [60] |
| [minutesPerWeek](Time/minutesPerWeek.md) | Number of minutes in a week [10080] |
| [secondsPerDay](Time/secondsPerDay.md) | Number of seconds in a day [86400] |
| [secondsPerHour](Time/secondsPerHour.md) | Number of seconds in an hour [3600] |
| [secondsPerMinute](Time/secondsPerMinute.md) | Number of seconds in a minute [60] |
| [secondsPerWeek](Time/secondsPerWeek.md) | Number of seconds in a week [604800] |
| [ticksPerDay](Time/ticksPerDay.md) | Number of ticks in a day [86400000] |
| [ticksPerHour](Time/ticksPerHour.md) | Number of ticks in an hour [3600000] |
| [ticksPerMinute](Time/ticksPerMinute.md) | Number of ticks in a minute [60000] |
| [ticksPerSecond](Time/ticksPerSecond.md) | Number of ticks in a second [1000] |
| [ticksPerWeek](Time/ticksPerWeek.md) | Number of ticks in a week [604800000] |

### Conversion

| Function | Description |
| ------ | ------ |
| [toDate](Time/toDate.md) | Converts an unknown entity to a `Date` object. |

### Day

| Name | Description |
| ------ | ------ |
| [BeginningOfDayOptions](Time/BeginningOfDayOptions.md) | Options for [beginningOfDay](Time/beginningOfDay.md) |
| [GetOccurrenceInMonthOptions](Time/GetOccurrenceInMonthOptions.md) | Options for [occurrenceInMonth](Time/occurrenceInMonth.md) |
| [MidnightOptions](Time/MidnightOptions.md) | Options for the [isMidnight](Time/isMidnight.md) function |
| [SameDayOptions](Time/SameDayOptions.md) | Options for the [isSameDay](Time/isSameDay.md) function |
| [beginningOfDay](Time/beginningOfDay.md) | Determine the start of the day for a date |
| [isMidnight](Time/isMidnight.md) | Determine if a date is at midnight |
| [isSameDay](Time/isSameDay.md) | Determine if two dates occur on the same day |
| [occurrenceInMonth](Time/occurrenceInMonth.md) | Determine the date of an occurrence of a weekday within a month |

### Enumerations

| Name | Description |
| ------ | ------ |
| [DayOfWeek](Time/DayOfWeek.md) | Days of the week |
| [MonthOfYear](Time/MonthOfYear.md) | Months of the year |
| [day](Time/day.md) | Translation object for name of day to day number. |
| [month](Time/month.md) | Translation object for name of month to month number |

### Formatting

| Name | Description |
| ------ | ------ |
| [FormatDateOptions](Time/FormatDateOptions.md) | Options for formatting a date |
| [formatDate](Time/formatDate.md) | Format a date |

### Julian

| Function | Description |
| ------ | ------ |
| [julian](Time/julian.md) | Get the Julian date (number of days since noon on Monday, January 1 4713 BCE) |

### Month

| Name | Description |
| ------ | ------ |
| [BeginningOfMonthOptions](Time/BeginningOfMonthOptions.md) | Options for the [beginningOfMonth](Time/beginningOfMonth.md) function |
| [DaysInMonthOptions](Time/DaysInMonthOptions.md) | Options for the [daysInMonth](Time/daysInMonth.md) function |
| [EndOfMonthOptions](Time/EndOfMonthOptions.md) | Options for the [endOfMonth](Time/endOfMonth.md) function |
| [SameMonthOptions](Time/SameMonthOptions.md) | Options for the [isSameMonth](Time/isSameMonth.md) function |
| [beginningOfMonth](Time/beginningOfMonth.md) | Determine the start of the month for a dateDetermine the start of the month for a date |
| [daysInMonth](Time/daysInMonth.md) | Determine the number of days in the month for a date |
| [endOfMonth](Time/endOfMonth.md) | Determine the last day of the month containing the input date |
| [isSameMonth](Time/isSameMonth.md) | Determine if two dates occur in the same month |

### Parsing

| Function | Description |
| ------ | ------ |
| [isValidDate](Time/isValidDate.md) | Determine if a date is valid |
| [parseDate](Time/parseDate.md) | Parse a string into a Date object |

### Relative Time

| Name | Description |
| ------ | ------ |
| [RelativeTimeOptions](Time/RelativeTimeOptions.md) | Options for the [relativeTime](Time/relativeTime.md) function |
| [relativeTime](Time/relativeTime.md) | Describe the difference between two dates in a simple format |

### Time Span

| Class | Description |
| ------ | ------ |
| [TimeSpan](Time/TimeSpan.md) | Store and manipulate a duration of time |

### Time Zone

| Name | Description |
| ------ | ------ |
| [TimezoneOptions](Time/TimezoneOptions.md) | Options for the [timezone](Time/timezone.md) function |
| [timezone](Time/timezone.md) | Determine the correct timezone string for a specified date using a local timezone, or an offset in minutes |

### Type Check

| Function | Description |
| ------ | ------ |
| [isDate](Time/isDate.md) | Determines whether the provided value is a `Date` object. |

### Week

| Name | Description |
| ------ | ------ |
| [BeginningOfWeekOptions](Time/BeginningOfWeekOptions.md) | Options for the [beginningOfWeek](Time/beginningOfWeek.md) function |
| [DayOfWeekOptions](Time/DayOfWeekOptions.md) | Options for the [dayOfWeek](Time/dayOfWeek-1.md) function |
| [EndOfWeekOptions](Time/EndOfWeekOptions.md) | Options for the [endOfWeek](Time/endOfWeek.md) function |
| [ISOWeekOfYearOptions](Time/ISOWeekOfYearOptions.md) | Options for the [isoWeekOfYear](Time/isoWeekOfYear.md) function |
| [ISOWeeksInYearOptions](Time/ISOWeeksInYearOptions.md) | Options for the [isoWeeksInYear](Time/isoWeeksInYear.md) function |
| [SameWeekOptions](Time/SameWeekOptions.md) | Options for the [isSameWeek](Time/isSameWeek.md) function |
| [beginningOfWeek](Time/beginningOfWeek.md) | Determine the start of the week for a date |
| [dayOfWeek](Time/dayOfWeek-1.md) | Determine the day of the week for a specific date |
| [endOfWeek](Time/endOfWeek.md) | Determine the last day of the week containing a date |
| [isoWeekOfYear](Time/isoWeekOfYear.md) | Determine the ISO week number for a given date |
| [isoWeeksInYear](Time/isoWeeksInYear.md) | Determine the number of ISO weeks within a year |
| [isSameWeek](Time/isSameWeek.md) | Determine if two dates occur in the same week |

### Year

| Name | Description |
| ------ | ------ |
| [BeginningOfYearOptions](Time/BeginningOfYearOptions.md) | Options for the [beginningOfYear](Time/beginningOfYear.md) function |
| [DayOfYearOptions](Time/DayOfYearOptions.md) | Options for the [dayOfYear](Time/dayOfYear.md) function |
| [EndOfYearOptions](Time/EndOfYearOptions.md) | Options for the [endOfYear](Time/endOfYear.md) function |
| [LeapYearOptions](Time/LeapYearOptions.md) | Options for the [isLeapYear](Time/isLeapYear.md) function |
| [SameYearOptions](Time/SameYearOptions.md) | Options for the [isSameYear](Time/isSameYear.md) function |
| [beginningOfYear](Time/beginningOfYear.md) | Determine the start of the year for a date |
| [dayOfYear](Time/dayOfYear.md) | Calculates the day of the year for a given date. |
| [endOfYear](Time/endOfYear.md) | Determine the last day of the year containing a date |
| [isLeapYear](Time/isLeapYear.md) | Determine if a year is a leap year |
| [isSameYear](Time/isSameYear.md) | Determine if two dates occur in the same year |

## Unicode

### Characters

| Variable | Description |
| ------ | ------ |
| [fractionSlash](Unicode/fractionSlash.md) | Fraction Slash |
| [hyphen](Unicode/hyphen.md) | Hyphen |
| [invisiblePlus](Unicode/invisiblePlus.md) | Invisible Plus sign |
| [nbHyphen](Unicode/nbHyphen.md) | Non-Breaking Hyphen |
| [negativeSign](Unicode/negativeSign.md) | Negative Sign |
| [positiveSign](Unicode/positiveSign.md) | Positive Sign |
| [softHyphen](Unicode/softHyphen.md) | Soft Hyphen |
| [subNegative](Unicode/subNegative.md) | Subscript Negative |
| [subPositive](Unicode/subPositive.md) | Subscript Positive |
| [supNegative](Unicode/supNegative.md) | Superscript Negative |
| [supPositive](Unicode/supPositive.md) | Superscript Positive |

### Constants

| Variable | Description |
| ------ | ------ |
| [empty](Unicode/empty.md) | The empty string |
| [nbsp](Unicode/nbsp.md) | Non-breaking space |
| [replacementCharacter](Unicode/replacementCharacter.md) | Unicode replacement character (U+FFFD), used to represent an unknown, unrecognized, or unrepresentable character. |
| [space](Unicode/space.md) | Space |
| [zwsp](Unicode/zwsp.md) | Zero-width space |

### Encoding

| Name | Description |
| ------ | ------ |
| [TextEncoding](Unicode/TextEncoding.md) | Valid Text Encoding Types |
| [decodeText](Unicode/decodeText.md) | Decode a UTF8 encoded string into unicode |
| [encodeText](Unicode/encodeText.md) | Encode a unicode (UTF-16 encoded javascript) string into UTF8 |

### Is Surrogate

| Name | Description |
| ------ | ------ |
| [IsSurrogateOptions](Unicode/IsSurrogateOptions.md) | Options for [isSurrogate](Unicode/isSurrogate.md) |
| [isSurrogate](Unicode/isSurrogate.md) | Determine is a character is a surrogate |

### Normalization

| Function | Description |
| ------ | ------ |
| [removeDiacritics](Unicode/removeDiacritics.md) | Remove all diacritics from a string |

### String Length

| Function | Description |
| ------ | ------ |
| [unicodeLength](Unicode/unicodeLength.md) | Return the number of unicode code points in a string |

## Utility

### Classes

| Class | Description |
| ------ | ------ |
| [PriorityQueue](Utility/PriorityQueue.md) | A simple priority queue |

### Conversion

| Function | Description |
| ------ | ------ |
| [toString](Utility/toString.md) | Converts an unknown value to its string representation. |

### Global Types

| Type Alias | Description |
| ------ | ------ |
| [TypedArray](Utility/TypedArray.md) | Any of the built-in typed array types in JavaScript. |

### Type Checking

| Function | Description |
| ------ | ------ |
| [isBoolean](Utility/isBoolean.md) | Determines whether the provided value is a boolean or a Boolean object. |
| [isFunction](Utility/isFunction.md) | Determines whether the provided value is a function. |
| [isNumber](Utility/isNumber.md) | Determines whether the provided value is a number or a Number object. |
| [isObject](Utility/isObject.md) | Determines whether the provided value is a non-null object. |
| [isRegExp](Utility/isRegExp.md) | Determines whether the provided value is a `RegExp` object. |
| [isString](Utility/isString.md) | Determines whether the provided value is a string. |

