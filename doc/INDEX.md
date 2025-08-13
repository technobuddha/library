# @technobuddha/library

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [Format](type-aliases/Format.md) | - |
| [FractionOptions](type-aliases/FractionOptions.md) | Options for configuring fraction output. |
| [LargestInscribedRectangleOptions](type-aliases/LargestInscribedRectangleOptions.md) | Configuration options for the largest inscribed rectangle algorithm. |
| [LookAheadOptions](type-aliases/LookAheadOptions.md) | Options for look-ahead operations. |
| [OrdinalOptions](type-aliases/OrdinalOptions.md) | - |
| [RotatedRect](type-aliases/RotatedRect.md) | Represents a rectangle that has been rotated by a certain angle. Extends the `Rect` type with additional properties for the area and rotation angle. |
| [ToRomanOptions](type-aliases/ToRomanOptions.md) | - |
| [TypedArray](type-aliases/TypedArray.md) | - |
| [Weighted](type-aliases/Weighted.md) | - |

## Functions

| Function | Description |
| ------ | ------ |
| [fraction](functions/fraction.md) | Converts a numeric input into a formatted fraction string, either in numeric or alphabetic form. |
| [isIntersecting](functions/isIntersecting.md) | Determines whether a given shape (either a LineSegment or a Polygon) intersects with a polygon. |
| [lookAhead](functions/lookAhead.md) | Generates pairs of consecutive elements from the input array, with optional handling for the last element. |
| [randomWeightedPick](functions/randomWeightedPick.md) | Selects a random item from a list, where each item has an associated weight that determines its likelihood of being picked. |
| [toSquare](functions/toSquare.md) | Converts a given rectangle to the largest possible square that fits within it, centered along the longer dimension. If the rectangle is already a square, it returns the original rectangle. |

## Array

### Create 2D Array

| Function | Description |
| ------ | ------ |
| [create2DArray](functions/create2DArray.md) | Create a two dimensional array with all elements initialized |

### Longest Common Subsequence

| Name | Description |
| ------ | ------ |
| [LongestCommonSubsequenceOptions](type-aliases/LongestCommonSubsequenceOptions.md) | - |
| [longestCommonSubsequence](functions/longestCommonSubsequence.md) | Determine the longest possible array that is subarray of both of given arrays. |

## Conversion

### To Error

| Function | Description |
| ------ | ------ |
| [toError](functions/toError.md) | Convert the entity to an Error object. |

### To Integer

| Function | Description |
| ------ | ------ |
| [toInteger](functions/toInteger.md) | Convert an entity to a integer number. |

### To Number

| Function | Description |
| ------ | ------ |
| [toNumber](functions/toNumber.md) | Convert an entity to a number. |

## Crypto

### CRC32

| Class | Description |
| ------ | ------ |
| [Crc32](classes/Crc32.md) | Compute the CRC32 checksum |

### Hash Base

| Name | Description |
| ------ | ------ |
| [HashBase](classes/HashBase.md) | The base class for most cryptographic hash functions |
| [HashClass](interfaces/HashClass.md) | The base interface for hash classes |

### SHA1

| Class | Description |
| ------ | ------ |
| [Sha1](classes/Sha1.md) | Secure Hash Algorithm, SHA-1 |

### SHA2: SHA224

| Class | Description |
| ------ | ------ |
| [Sha224](classes/Sha224.md) | Secure Hash Algorithm, SHA2 SHA-224 |

### SHA2: SHA256

| Class | Description |
| ------ | ------ |
| [Sha256](classes/Sha256.md) | Secure Hash Algorithm, SHA2 SHA-256 |

### SHA2: SHA384

| Class | Description |
| ------ | ------ |
| [Sha384](classes/Sha384.md) | Secure Hash Algorithm, SHA2 SHA-384 |

### SHA2: SHA512

| Class | Description |
| ------ | ------ |
| [Sha512](classes/Sha512.md) | Secure Hash Algorithm, SHA2 SHA-512 |

## Encoding

### Base64

| Name | Description |
| ------ | ------ |
| [Base64Configuration](type-aliases/Base64Configuration.md) | Configuration for Base64 based encoding schemes |
| [base64Config](variables/base64Config.md) | Configuration for Base64 encoding |
| [base64UrlConfig](variables/base64UrlConfig.md) | Configuration for Base64Url encoding |
| [decodeBase64](functions/decodeBase64.md) | Decodes a string of data which has been encoded using [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding. |
| [decodeBase64Url](functions/decodeBase64Url.md) | Decodes a string of data which has been encoded using [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding. You can use the btoa() method to encode and transmit data which may otherwise cause communication problems, then transmit it and use the atob() method to decode the data again. For example, you can encode, transmit, and decode control characters such as ASCII values 0 through 31. |
| [encodeBase64](functions/encodeBase64.md) | Creates a Base64-encoded ASCII string from a string. |
| [encodeBase64Url](functions/encodeBase64Url.md) | Creates a Base64-encoded ASCII string from a string. |

### Binary

| Name | Description |
| ------ | ------ |
| [BinaryEncoding](type-aliases/BinaryEncoding.md) | The binary encoding to use |
| [decodeBinary](functions/decodeBinary.md) | Decode a string into a binary object |
| [encodeBinary](functions/encodeBinary.md) | Encode an binary object into a string |

### C/C++

| Function | Description |
| ------ | ------ |
| [escapeC](functions/escapeC.md) | Escape a string for use in C/C++ |
| [unescapeC](functions/unescapeC.md) | Unescape a string encoded in C style |

### Data URL

| Name | Description |
| ------ | ------ |
| [BinaryObject](type-aliases/BinaryObject.md) | - |
| [dataURL](functions/dataURL.md) | Convert any binary object into a data URL |

### GraphQL

| Function | Description |
| ------ | ------ |
| [escapeGraphQL](functions/escapeGraphQL.md) | Escape a string for use in GraphQL |

### HTML

| Name | Description |
| ------ | ------ |
| [EscapeHtmlSettings](type-aliases/EscapeHtmlSettings.md) | Options for [escapeHTML](functions/escapeHTML.md) |
| [escapeHTML](functions/escapeHTML.md) | Escape a string for use in HTML |
| [unescapeHTML](functions/unescapeHTML.md) | Unescape a string encoded in HTML |

### JSON

| Name | Description |
| ------ | ------ |
| [specialBegin](variables/specialBegin.md) | The beginning of a special JSON value |
| [specialFinish](variables/specialFinish.md) | The end of a special JSON value |
| [replacer](functions/replacer.md) | Used with JSON.stringify to encode a wider range of objects into strings that can later be decoded with [reviver](functions/reviver.md) |
| [reviver](functions/reviver.md) | Used with JSON.parse to decode objected encoded by [replacer](functions/replacer.md) |

### Java

| Function | Description |
| ------ | ------ |
| [escapeJava](functions/escapeJava.md) | Escape a string for use in Java |
| [unescapeJava](functions/unescapeJava.md) | Unescape a string encoded in Java style |

### JavaScript / TypeScript

| Function | Description |
| ------ | ------ |
| [escapeJS](functions/escapeJS.md) | Escape a string for use in Javascript |
| [unescapeJS](functions/unescapeJS.md) | Unescape a string encoded in Javascript style |

### Python

| Function | Description |
| ------ | ------ |
| [escapePython](functions/escapePython.md) | Escape a string for use in Python |
| [unescapePython](functions/unescapePython.md) | Unescape a string encoded in Python style |

## English

### Coordinate

| Name | Description |
| ------ | ------ |
| [CoordinateOptions](type-aliases/CoordinateOptions.md) | - |
| [coordinate](functions/coordinate.md) | Create a string from an array, separating values and inserting a conjunction |

### Indefinite Article

| Name | Description |
| ------ | ------ |
| [IndefiniteArticleOptions](type-aliases/IndefiniteArticleOptions.md) | - |
| [indefiniteArticle](functions/indefiniteArticle.md) | Determine the appropriate indefinite article to use with a word. |

### Plural

| Function | Description |
| ------ | ------ |
| [plural](functions/plural.md) | Return the plural version of the input string |

### Possessive

| Function | Description |
| ------ | ------ |
| [possessive](functions/possessive.md) | Determine the possessive form of a word |

### Syllables

| Function | Description |
| ------ | ------ |
| [syllables](functions/syllables.md) | Approximate the number of syllables in a string |

## Geometry

### Angle

| Name | Description |
| ------ | ------ |
| [AngleUnit](type-aliases/AngleUnit.md) | Angle units. |
| [angleUnits](variables/angleUnits.md) | Angle units. |
| [angleBetweenPoints](functions/angleBetweenPoints.md) | Computes the angle between two points (x1,y1) and (x2,y2). Angle zero points in the +X direction, π/2 radians points in the +Y direction (down) and from there we grow clockwise towards π*2 radians. |
| [angleDifference](functions/angleDifference.md) | Computes the difference between startAngle and endAngle. |
| [angleOfLine](functions/angleOfLine.md) | Calculates the angle of a given line segment, relative to the horizontal axis |
| [angleReflection](functions/angleReflection.md) | Calculates the reflection of an angle across a specified axis. |
| [normalizeAngle](functions/normalizeAngle.md) | Normalizes an angle to be in range [0-π*2]. Angles outside this range will be normalized to be the equivalent angle with that range. |
| [toAngle](functions/toAngle.md) | Converts an angle from one unit to another. |
| [toDegrees](functions/toDegrees.md) | Convert an angle from radians to degrees |
| [toRadians](functions/toRadians.md) | Converts degrees to radians. |

### Coordinates

| Name | Description |
| ------ | ------ |
| [CartesianMap](classes/CartesianMap.md) | Represents a map with keys of cartesian coordinates, optimized for efficient storage and lookup. |
| [CartesianSet](classes/CartesianSet.md) | Represents a set of 2D cartesian, optimized for efficient storage and lookup. |
| [Cartesian](type-aliases/Cartesian.md) | - |
| [Polar](type-aliases/Polar.md) | - |
| [ORIGIN](variables/ORIGIN.md) | - |
| [isCartesian](functions/isCartesian.md) | Determines if the provided value is a Cartesian point. |
| [isPolar](functions/isPolar.md) | Determines if the provided value is a Polar point. |
| [toCartesian](functions/toCartesian.md) | Convert polar coordinates to cartesian |
| [toPolar](functions/toPolar.md) | Convert cartesian coordinates to polar |

### Line Segment

| Name | Description |
| ------ | ------ |
| [LineSegment](type-aliases/LineSegment.md) | - |
| [angleOfLine](functions/angleOfLine.md) | Calculates the angle of a given line segment, relative to the horizontal axis |
| [isLeftOfLine](functions/isLeftOfLine.md) | Determines whether a given point lies to the left of a specified line segment. |
| [isOnLine](functions/isOnLine.md) | Determines whether a given point lies on a specified line segment within a certain tolerance. |
| [isWithLine](functions/isWithLine.md) | Determines whether a given point lies on a specified line segment within a certain tolerance. |
| [lineIntersection](functions/lineIntersection.md) | Calculates the intersection point of two line segments. |
| [lineLength](functions/lineLength.md) | Calculates the length of a given line segment using the distance formula. |
| [midpoint](functions/midpoint.md) | Calculates a point at a given fraction (`part`) along a line segment. By default it returns the true midpoint of the line segment |
| [topPointFirst](functions/topPointFirst.md) | Returns a `LineSegment` where the point with the higher y-coordinate is always the starting point (x0, y0). If the original line's y1 is greater than y0, the line is returned as-is. Otherwise, the start and end points are swapped. |

### Point

| Function | Description |
| ------ | ------ |
| [isInPolygon](functions/isInPolygon.md) | Determines whether a given point or rectangle is inside or on the edge of a polygon. |
| [isLeftOfLine](functions/isLeftOfLine.md) | Determines whether a given point lies to the left of a specified line segment. |
| [isOnLine](functions/isOnLine.md) | Determines whether a given point lies on a specified line segment within a certain tolerance. |
| [isWithLine](functions/isWithLine.md) | Determines whether a given point lies on a specified line segment within a certain tolerance. |
| [manhattanDistance](functions/manhattanDistance.md) | Calculates the Manhattan distance between two points in Cartesian coordinates. |
| [rotate](functions/rotate.md) | Rotates a point or an array of points around a given origin by a specified angle. |
| [scale](functions/scale.md) | Scales a point or a polygon of points around a given origin by a specified amount. |
| [translate](functions/translate.md) | Translate a point or an array of points by a specified amount. |

### Polygon

| Name | Description |
| ------ | ------ |
| [Polygon](type-aliases/Polygon.md) | - |
| [area](functions/area.md) | Calculates the area of a polygon given its vertices. |
| [bounds](functions/bounds.md) | Calculates the axis-aligned bounding rectangle for a given polygon. |
| [centroid](functions/centroid.md) | Calculates the centroid (geometric center) of a polygon given its vertices. |
| [convexHull](functions/convexHull.md) | Computes the convex hull of a set of 2D points using the Monotone Chain algorithm. |
| [edgeAngles](functions/edgeAngles.md) | Generate normalized edge angles from polygon edges. |
| [isInPolygon](functions/isInPolygon.md) | Determines whether a given point or rectangle is inside or on the edge of a polygon. |
| [largestInscribedRectangle](functions/largestInscribedRectangle.md) | Computes the largest rectangle that can be inscribed within the given polygon. |
| [regularPolygon](functions/regularPolygon.md) | Generates the vertices of a regular polygon as an array of Cartesian points. |
| [rotate](functions/rotate.md) | Rotates a point or an array of points around a given origin by a specified angle. |
| [scale](functions/scale.md) | Scales a point or a polygon of points around a given origin by a specified amount. |
| [star](functions/star.md) | Generates the vertices of a star-shaped polygon. |
| [toPolygon](functions/toPolygon.md) | Converts two Cartesian points or a rectangle into a `Polygon` object. |
| [translate](functions/translate.md) | Translate a point or an array of points by a specified amount. |

### Rect

| Function | Description |
| ------ | ------ |
| [isRect](functions/isRect.md) | Determines if the provided value is a Rectangle. |

### Rectangle

| Name | Description |
| ------ | ------ |
| [Rect](type-aliases/Rect.md) | - |
| [largestInscribedRectangle](functions/largestInscribedRectangle.md) | Computes the largest rectangle that can be inscribed within the given polygon. |

### Utility

| Function | Description |
| ------ | ------ |
| [crossProduct](functions/crossProduct.md) | Calculates the cross product of vectors OA and OB, where O, A, and B are points in 2D Cartesian space. The result is positive if the sequence OAB makes a counter-clockwise turn, negative for a clockwise turn, and zero if the points are collinear. |

## Math

### Almost Equals

| Name | Description |
| ------ | ------ |
| [AlmostEqualsOptions](type-aliases/AlmostEqualsOptions.md) | - |
| [almostEquals](functions/almostEquals.md) | Tests whether the two values are equal to each other, within a certain tolerance, taking into account floating point errors (numbers within EPSILON). |

### Ceiling / Floor

| Name | Description |
| ------ | ------ |
| [CeilOptions](type-aliases/CeilOptions.md) | - |
| [FloorOptions](type-aliases/FloorOptions.md) | - |
| [ceil](functions/ceil.md) | A tweaked variant of |
| [floor](functions/floor.md) | A tweaked variant of |

### Comparison

| Function | Description |
| ------ | ------ |
| [compareNumbers](functions/compareNumbers.md) | Compare two numbers |

### Constants

| Variable | Description |
| ------ | ------ |
| [cardinalOnes](variables/cardinalOnes.md) | - |
| [cardinalTens](variables/cardinalTens.md) | - |
| [ordinalOnes](variables/ordinalOnes.md) | - |
| [ordinalTens](variables/ordinalTens.md) | - |

### English

| Type Alias | Description |
| ------ | ------ |
| [CardinalOptions](type-aliases/CardinalOptions.md) | - |

### Linear Interpolation

| Function | Description |
| ------ | ------ |
| [lerp](functions/lerp.md) | Performs linear interpolation between values a and b. Returns the value between a and b proportional to x (when x is between 0 and 1. When x is outside this range, the return value is a linear extrapolation). |

### Modulo

| Function | Description |
| ------ | ------ |
| [modulo](functions/modulo.md) | The % operator in JavaScript returns the remainder of a / b, but differs from some other languages in that the result will have the same sign as the dividend. For example, -1 % 8 == -1, whereas in some other languages (such as Python) the result would be 7. This function emulates the more correct modulo behavior, which is useful for certain applications such as calculating an offset index in a circular list. |

### Negative Zero

| Name | Description |
| ------ | ------ |
| [negativeZero](variables/negativeZero.md) | - |
| [isNegativeZero](functions/isNegativeZero.md) | Tests to see if the specified value is negative zero |

### Numbering

| Name | Description |
| ------ | ------ |
| [CardinalOptions](type-aliases/CardinalOptions.md) | - |
| [cardinal](functions/cardinal.md) | Convert a number into text (the cardinal number) |
| [orderOfMagnitude](functions/orderOfMagnitude.md) | Get the spelled out word for an exponent |
| [ordinal](functions/ordinal.md) | Convert a number into an ordinal number string (1st, 2nd, 3rd, etc). |
| [parseRoman](functions/parseRoman.md) | Parse a roman numeral string into it's integer value. |
| [summarize](functions/summarize.md) | Get a short description of a number |
| [toRoman](functions/toRoman.md) | Parse number into a roman numeral string |

### Parity

| Function | Description |
| ------ | ------ |
| [isEven](functions/isEven.md) | Tests to see if the specified value is an even integer |
| [isMultipleOf](functions/isMultipleOf.md) | Tests to see if the specified value is an multiple of *multiplier* |
| [isOdd](functions/isOdd.md) | Tests to see if the specified value is an odd integer |

### Statistics

| Function | Description |
| ------ | ------ |
| [standardDeviation](functions/standardDeviation.md) | Returns the sample [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the arguments. |
| [variance](functions/variance.md) | Returns the unbiased sample [Variance](https://en.wikipedia.org/wiki/Variance) of the arguments. |

## Number

### Format

| Name | Description |
| ------ | ------ |
| [FormatOptions](type-aliases/FormatOptions.md) | - |
| [formatNumber](functions/formatNumber.md) | - |
| [padNumber](functions/padNumber.md) | Add leading zeros to a number to ensure a string of a minimum length |

## Object

### Clear Object

| Function | Description |
| ------ | ------ |
| [clearObject](functions/clearObject.md) | Delete all own enumerable string properties from an object |

### Comparison

| Function | Description |
| ------ | ------ |
| [compare](functions/compare.md) | Compare two objects |
| [shallowEquals](functions/shallowEquals.md) | Compare two object for equality. Testing goes one level deep. |

### Primitive

| Function | Description |
| ------ | ------ |
| [isPrimitive](functions/isPrimitive.md) | Check to see if an object is a primitive |
| [toPrimitive](functions/toPrimitive.md) | Convert an object into its primitive (string, number, etc.) value |

## Random

### Mersenne Twister

| Class | Description |
| ------ | ------ |
| [MersenneTwister](classes/MersenneTwister.md) | - |

### Pick

| Function | Description |
| ------ | ------ |
| [randomDraw](functions/randomDraw.md) | Draw a random item from a list. Returning both the item and the list without the drawn item. |
| [randomPick](functions/randomPick.md) | Pick a random items from a list. |

### Shuffle

| Function | Description |
| ------ | ------ |
| [randomShuffle](functions/randomShuffle.md) | - |

## RegExp

### Date

| Variable | Description |
| ------ | ------ |
| [isoDate](variables/isoDate.md) | Validate a ISO formatted date |

### Email

| Variable | Description |
| ------ | ------ |
| [email](variables/email.md) | validate an valid email address |

### Internet Protocol

| Variable | Description |
| ------ | ------ |
| [domain](variables/domain.md) | - |
| [ipV4](variables/ipV4.md) | validate an IPv4 address |
| [ipV4Local](variables/ipV4Local.md) | determine if Ipv4 address is local |

### Matching

| Function | Description |
| ------ | ------ |
| [matches](functions/matches.md) | - |

### Number

| Variable | Description |
| ------ | ------ |
| [numeric](variables/numeric.md) | Validate a valid number |

## String

### Affix

| Name | Description |
| ------ | ------ |
| [RootOptions](type-aliases/RootOptions.md) | - |
| [ensurePrefix](functions/ensurePrefix.md) | Add a prefix to a string, if it does not already have the prefix |
| [ensureSuffix](functions/ensureSuffix.md) | Add a suffix to a string, if it does not already have the suffix |
| [root](functions/root.md) | Extract the root word, removing a prefix and/or suffix |

### Build

| Name | Description |
| ------ | ------ |
| [Stringy](type-aliases/Stringy.md) | - |
| [build](functions/build.md) | Concatenates strings and/or arrays of strings |

### Case Conversion

| Name | Description |
| ------ | ------ |
| [ToCapitalCaseOptions](type-aliases/ToCapitalCaseOptions.md) | - |
| [ToCapitalWordCaseOptions](type-aliases/ToCapitalWordCaseOptions.md) | - |
| [ToSmallCaseOptions](type-aliases/ToSmallCaseOptions.md) | - |
| [ToSmallWordsCaseOptions](type-aliases/ToSmallWordsCaseOptions.md) | - |
| [matchCase](functions/matchCase.md) | Attempt to convert the input string into the same case as the target string |
| [toCamelCase](functions/toCamelCase.md) | Convert an identifier string to a camel case |
| [toCapitalCase](functions/toCapitalCase.md) | Capitalize the first letter of a string |
| [toCapitalWordCase](functions/toCapitalWordCase.md) | Capitalize the first letter of each word in a string |
| [toDashCase](functions/toDashCase.md) | Convert an identifier string to a dash form |
| [toDotCase](functions/toDotCase.md) | Convert an identifier string to a dot form |
| [toHumanCase](functions/toHumanCase.md) | Convert an identifier string to human readable form |
| [toPascalCase](functions/toPascalCase.md) | Convert an identifier string to pascal case |
| [toSmallCase](functions/toSmallCase.md) | Convert the first letter of a string to lower case |
| [toSmallWordsCase](functions/toSmallWordsCase.md) | Convert the first letter of each word in a string to lower case |
| [toTitleCase](functions/toTitleCase.md) | Convert a string to a title, capitalizing each word, except for the small words |
| [toUnderscoreCase](functions/toUnderscoreCase.md) | Convert an identifier string to underscore case |

### Categorization

| Function | Description |
| ------ | ------ |
| [isAlpha](functions/isAlpha.md) | Test a string for all alphabetic characters |
| [isAlphaNumeric](functions/isAlphaNumeric.md) | Test a string for all alphanumeric characters |
| [isLowerCase](functions/isLowerCase.md) | Test a string for all lower case characters |
| [isNumeric](functions/isNumeric.md) | Test an object to see if it a number, or a string which can be converted into a number |
| [isPunctuation](functions/isPunctuation.md) | Test a string for all punctuation characters |
| [isUpperCase](functions/isUpperCase.md) | Test a string for all upper case characters |
| [isWhitespace](functions/isWhitespace.md) | Test a string for all white space characters |

### Chop

| Name | Description |
| ------ | ------ |
| [ChopOptions](type-aliases/ChopOptions.md) | - |
| [chop](functions/chop.md) | Break a string into equal sized segments of characters |

### Clean

| Function | Description |
| ------ | ------ |
| [clean](functions/clean.md) | Remove all occurrences of characters from the beginning and end of the string |
| [cleanEnd](functions/cleanEnd.md) | Remove all occurrences of characters from the end of the string |
| [cleanStart](functions/cleanStart.md) | Remove all occurrences of characters from the start of the string |

### Collapse

| Name | Description |
| ------ | ------ |
| [CollapseBreakingSpaceOptions](type-aliases/CollapseBreakingSpaceOptions.md) | - |
| [CollapseWhitespaceOptions](type-aliases/CollapseWhitespaceOptions.md) | - |
| [collapseBreakingSpace](functions/collapseBreakingSpace.md) | Replace all breaking space (space, tab, carriage return, new line) with a single space |
| [collapseWhitespace](functions/collapseWhitespace.md) | Replace all whitespace within a string with a single space |

### Comparison

| Name | Description |
| ------ | ------ |
| [CompareStringsOptions](type-aliases/CompareStringsOptions.md) | - |
| [compareStrings](functions/compareStrings.md) | Compare two strings |

### Constants

| Variable | Description |
| ------ | ------ |
| [empty](variables/empty.md) | - |
| [nbsp](variables/nbsp.md) | - |
| [space](variables/space.md) | - |
| [zwsp](variables/zwsp.md) | - |

### Conversion

| Name | Description |
| ------ | ------ |
| [ToBooleanOptions](type-aliases/ToBooleanOptions.md) | - |
| [ToFilenameOptions](type-aliases/ToFilenameOptions.md) | - |
| [toBoolean](functions/toBoolean.md) | Convert a string to a boolean value |
| [toEnumeration](functions/toEnumeration.md) | Convert a string to a numeric value |
| [toFilename](functions/toFilename.md) | Convert a string so that it can be used as a filename |

### Correction

| Function | Description |
| ------ | ------ |
| [correctMSWord](functions/correctMSWord.md) | Correct character sequences that Microsoft Word changes to make it look prettier |

### Delimited

| Name | Description |
| ------ | ------ |
| [CountOptions](type-aliases/CountOptions.md) | - |
| [count](functions/count.md) | Compute the number of times a substring occurs within a string |
| [delimited](functions/delimited.md) | Return a field from a delimited string |

### Extraction

| Function | Description |
| ------ | ------ |
| [extractDigits](functions/extractDigits.md) | Remove all non-digit characters from a string |
| [toASCII](functions/toASCII.md) | Change a string to be all from the basic latin unicode plane |

### Fuzzy Match

| Name | Description |
| ------ | ------ |
| [DiceCoefficientOptions](type-aliases/DiceCoefficientOptions.md) | - |
| [FuzzyMatchOptions](type-aliases/FuzzyMatchOptions.md) | - |
| [LevenshteinDistanceOptions](type-aliases/LevenshteinDistanceOptions.md) | - |
| [LongestCommonSubstringOptions](type-aliases/LongestCommonSubstringOptions.md) | - |
| [diceCoefficient](functions/diceCoefficient.md) | Compute the dice coefficient measure of similarity between two strings |
| [fuzzyMatch](functions/fuzzyMatch.md) | - |
| [levenshteinDistance](functions/levenshteinDistance.md) | Compute the levenshtein distance between two strings (similarity) |
| [longestCommonSubstring](functions/longestCommonSubstring.md) | Implementation of [Longest Common Substring](https://en.wikipedia.org/wiki/Longest_common_substring_problem) algorithm. |

### HTML

| Function | Description |
| ------ | ------ |
| [tag](functions/tag.md) | Surround text with an HTML tag |

### Indentation

| Name | Description |
| ------ | ------ |
| [GetIndentOptions](type-aliases/GetIndentOptions.md) | - |
| [IndentOptions](type-aliases/IndentOptions.md) | - |
| [UnindentOptions](type-aliases/UnindentOptions.md) | - |
| [getIndent](functions/getIndent.md) | Determine the indentation level of text |
| [indent](functions/indent.md) | Indent each line of a string |
| [unindent](functions/unindent.md) | Remove indentation from text |

### Mask

| Name | Description |
| ------ | ------ |
| [MaskOptions](type-aliases/MaskOptions.md) | - |
| [mask](functions/mask.md) | Use a simple mask to display a string |

### Quoting

| Name | Description |
| ------ | ------ |
| [QuoteOptions](type-aliases/QuoteOptions.md) | - |
| [UnquoteOptions](type-aliases/UnquoteOptions.md) | - |
| [quote](functions/quote.md) | Surround text with quotes |
| [unquote](functions/unquote.md) | Remove surrounding quotes from text |

### Sorting

| Name | Description |
| ------ | ------ |
| [NumberToLetterOptions](type-aliases/NumberToLetterOptions.md) | - |
| [SortOrderOptions](type-aliases/SortOrderOptions.md) | - |
| [groupCode](functions/groupCode.md) | Determine the group code (A-Z, [] or #) to place an item under |
| [numberToLetter](functions/numberToLetter.md) | Convert a number to a letter, using the alphabet (default: A-Z) |
| [sortOrder](functions/sortOrder.md) | Convert a string into a sortable string |

### Split

| Name | Description |
| ------ | ------ |
| [SplitWordsOptions](type-aliases/SplitWordsOptions.md) | - |
| [splitChars](functions/splitChars.md) | Split a string into an array of characters |
| [splitLines](functions/splitLines.md) | Split a string into an array of lines |
| [splitWords](functions/splitWords.md) | Split a string into an array of words |

### Templates

| Name | Description |
| ------ | ------ |
| [FillTemplateOptions](type-aliases/FillTemplateOptions.md) | - |
| [fillTemplate](functions/fillTemplate.md) | Fill a template with supplied values |

### Units

| Name | Description |
| ------ | ------ |
| [BinaryUnitsOptions](type-aliases/BinaryUnitsOptions.md) | - |
| [MetricUnitsOptions](type-aliases/MetricUnitsOptions.md) | - |
| [binaryUnits](functions/binaryUnits.md) | Abbreviate a binary number by adding a suffix for metric units (i.e. 1024 =\> 1K) |
| [metricUnits](functions/metricUnits.md) | Abbreviate a number by adding a suffix for metric units (i.e. 1000 =\> 1K, .0001 = 1m) |

### Word Wrapping

| Name | Description |
| ------ | ------ |
| [WordwrapOptions](type-aliases/WordwrapOptions.md) | - |
| [wordwrap](functions/wordwrap.md) | Wrap text so that it fits within a area of fixed width |

## Template

### GraphQl

| Name | Description |
| ------ | ------ |
| [GraphQLArray](type-aliases/GraphQLArray.md) | - |
| [GraphQLObject](type-aliases/GraphQLObject.md) | - |
| [GraphQLValue](type-aliases/GraphQLValue.md) | - |
| [graphQL](functions/graphQL.md) | - |

### RegExp

| Function | Description |
| ------ | ------ |
| [re](functions/re.md) | - |

### Single Line

| Function | Description |
| ------ | ------ |
| [singleLine](functions/singleLine.md) | - |

## Time

### Alteration

| Name | Description |
| ------ | ------ |
| [TimeIncrement](type-aliases/TimeIncrement.md) | - |
| [addTime](functions/addTime.md) | Add units of time to a Date |

### Constants

| Variable | Description |
| ------ | ------ |
| [daysPerWeek](variables/daysPerWeek.md) | - |
| [hoursPerDay](variables/hoursPerDay.md) | - |
| [hoursPerWeek](variables/hoursPerWeek.md) | - |
| [minutesPerDay](variables/minutesPerDay.md) | - |
| [minutesPerHour](variables/minutesPerHour.md) | - |
| [minutesPerWeek](variables/minutesPerWeek.md) | - |
| [secondsPerDay](variables/secondsPerDay.md) | - |
| [secondsPerHour](variables/secondsPerHour.md) | - |
| [secondsPerMinute](variables/secondsPerMinute.md) | - |
| [secondsPerWeek](variables/secondsPerWeek.md) | - |
| [ticksPerDay](variables/ticksPerDay.md) | - |
| [ticksPerHour](variables/ticksPerHour.md) | - |
| [ticksPerMinute](variables/ticksPerMinute.md) | - |
| [ticksPerSecond](variables/ticksPerSecond.md) | - |
| [ticksPerWeek](variables/ticksPerWeek.md) | - |

### Conversion

| Function | Description |
| ------ | ------ |
| [toDate](functions/toDate.md) | - |

### Day

| Name | Description |
| ------ | ------ |
| [GetBeginningOfDayOptions](type-aliases/GetBeginningOfDayOptions.md) | - |
| [GetOccurrenceInMonthOptions](type-aliases/GetOccurrenceInMonthOptions.md) | - |
| [IsMidnightOptions](type-aliases/IsMidnightOptions.md) | - |
| [IsSameDayOptions](type-aliases/IsSameDayOptions.md) | - |
| [getBeginningOfDay](functions/getBeginningOfDay.md) | Determine the start of the day for a date |
| [getOccurrenceInMonth](functions/getOccurrenceInMonth.md) | Determine the date of an occurrence of a weekday within a month |
| [isMidnight](functions/isMidnight.md) | Determine if a date is at midnight |
| [isSameDay](functions/isSameDay.md) | Determine if two dates occur on the same day |

### Enumerations

| Name | Description |
| ------ | ------ |
| [DayOfWeek](type-aliases/DayOfWeek.md) | - |
| [MonthOfYear](type-aliases/MonthOfYear.md) | - |
| [day](variables/day.md) | - |
| [month](variables/month.md) | - |

### Formatting

| Name | Description |
| ------ | ------ |
| [FormatDateOptions](type-aliases/FormatDateOptions.md) | Options for formatting a date |
| [formatDate](functions/formatDate.md) | Format a date |

### Julian

| Function | Description |
| ------ | ------ |
| [getJulian](functions/getJulian.md) | Get the Julian date (number of days since noon on Monday, January 1 4713 BCE) |

### Month

| Name | Description |
| ------ | ------ |
| [GetBeginningOfMonthOptions](type-aliases/GetBeginningOfMonthOptions.md) | - |
| [GetDaysInMonthOptions](type-aliases/GetDaysInMonthOptions.md) | - |
| [GetEndOfMonthOptions](type-aliases/GetEndOfMonthOptions.md) | - |
| [IsSameMonthOptions](type-aliases/IsSameMonthOptions.md) | - |
| [getBeginningOfMonth](functions/getBeginningOfMonth.md) | Determine the start of the month for a dateDetermine the start of the month for a date |
| [getDaysInMonth](functions/getDaysInMonth.md) | Determine the number of days in the month for a date |
| [getEndOfMonth](functions/getEndOfMonth.md) | Determine the last day of the month containing the input date |
| [isSameMonth](functions/isSameMonth.md) | Determine if two dates occur in the same month |

### Parsing

| Function | Description |
| ------ | ------ |
| [isValidDate](functions/isValidDate.md) | Determine if a date is valid |
| [parseDate](functions/parseDate.md) | Parse a string into a Date object |

### Relative Time

| Name | Description |
| ------ | ------ |
| [RelativeTimeOptions](type-aliases/RelativeTimeOptions.md) | - |
| [relativeTime](functions/relativeTime.md) | Describe the difference between two dates in a simple format |

### Time Span

| Class | Description |
| ------ | ------ |
| [TimeSpan](classes/TimeSpan.md) | Store and manipulate a duration of time |

### Time Zone

| Name | Description |
| ------ | ------ |
| [GetTimezoneOptions](type-aliases/GetTimezoneOptions.md) | - |
| [getTimezone](functions/getTimezone.md) | Determine the correct timezone string for a specified date using a local timezone, or an offset in minutes |

### Week

| Name | Description |
| ------ | ------ |
| [GetBeginningOfWeekOptions](type-aliases/GetBeginningOfWeekOptions.md) | - |
| [GetDayOfWeekOptions](type-aliases/GetDayOfWeekOptions.md) | - |
| [GetEndOfWeekOptions](type-aliases/GetEndOfWeekOptions.md) | - |
| [GetISOWeekOfYearOptions](type-aliases/GetISOWeekOfYearOptions.md) | - |
| [GetISOWeeksInYearOptions](type-aliases/GetISOWeeksInYearOptions.md) | - |
| [IsSameWeekOptions](type-aliases/IsSameWeekOptions.md) | - |
| [getBeginningOfWeek](functions/getBeginningOfWeek.md) | Determine the start of the week for a date |
| [getDayOfWeek](functions/getDayOfWeek.md) | Determine the day of the week for a specific date |
| [getEndOfWeek](functions/getEndOfWeek.md) | Determine the last day of the week containing a date |
| [getISOWeekOfYear](functions/getISOWeekOfYear.md) | Determine the ISO week number for a given date |
| [getISOWeeksInYear](functions/getISOWeeksInYear.md) | Determine the number of ISO weeks within a year |
| [isSameWeek](functions/isSameWeek.md) | Determine if two dates occur in the same week |

### Year

| Name | Description |
| ------ | ------ |
| [GetBeginningOfYearOptions](type-aliases/GetBeginningOfYearOptions.md) | - |
| [GetDayOfYearOptions](type-aliases/GetDayOfYearOptions.md) | - |
| [GetEndOfYearOptions](type-aliases/GetEndOfYearOptions.md) | - |
| [IsLeapYearOptions](type-aliases/IsLeapYearOptions.md) | - |
| [IsSameYearOptions](type-aliases/IsSameYearOptions.md) | - |
| [getBeginningOfYear](functions/getBeginningOfYear.md) | Determine the start of the year for a date |
| [getDayOfYear](functions/getDayOfYear.md) | - |
| [getEndOfYear](functions/getEndOfYear.md) | Determine the last day of the year containing a date |
| [isLeapYear](functions/isLeapYear.md) | Determine if a year is a leap year |
| [isSameYear](functions/isSameYear.md) | Determine if two dates occur in the same year |

## Unicode

### Encoding

| Name | Description |
| ------ | ------ |
| [TextEncoding](type-aliases/TextEncoding.md) | Valid Text Encoding Types |
| [decodeText](functions/decodeText.md) | Decode a UTF8 encoded string into unicode |
| [encodeText](functions/encodeText.md) | Encode a unicode (UTF-16 encoded javascript) string into UTF8 |

### Is Surrogate

| Name | Description |
| ------ | ------ |
| [IsSurrogateOptions](type-aliases/IsSurrogateOptions.md) | Options for [isSurrogate](functions/isSurrogate.md) |
| [isSurrogate](functions/isSurrogate.md) | Determine is a character is a surrogate |

### Normalization

| Function | Description |
| ------ | ------ |
| [removeDiacritics](functions/removeDiacritics.md) | Remove all diacritics from a string |

### String Length

| Function | Description |
| ------ | ------ |
| [unicodeLength](functions/unicodeLength.md) | Return the number of unicode code points in a string |

## Utility

### Classes

| Class | Description |
| ------ | ------ |
| [PriorityQueue](classes/PriorityQueue.md) | A simple priority queue |
