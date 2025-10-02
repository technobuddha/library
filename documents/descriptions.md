<!-- markdownlint-disable MD024 -->

# Library

A large library of useful functions.

- **Installation**

  ```shell
  npm install @technobuddha/library
  ```

- **Usage**

  ```ts
  import { plural, summarize } from '@technobuddha/library';

  plural('mouse'); // 'mice'
  summarize(Number.MAX_SAFE_INTEGER); // '9.01 quadrillion'
  ```

- **License**

  The Technobuddha Library is released under the MIT license.

## Array

Functions for working with arrays.

### Combinatorics

Compute combinations and permutations of elements within an array.

### Construction

Create a new populated array.

### Conversion

Convert other types to an array.

### Filtering

Remove selected elements from an array.

### Merging

Merge arrays together.

### Type Checking

Check if a value is an array.

### Types

Type definitions for arrays.

## Binary

Functions for working with binary numbers, bits, and bitwise operations.

### Analysis

Analyze the bits of a number.

### Arithmetic

Perform arithmetic operations on binary numbers.

### Conversion

Convert between binary and other formats.

### Representation

Represent binary numbers using custom classes.

### Types

Types for working with arrays.

## Boolean

Functions for working with boolean values.

### Conversion

Convert between boolean values and other types.

### Type Checking

Check if a value is a boolean.

## Case Conversion

Functions for converting text between different _cases_.

### Capitalization

Properly capitalize or uncapitalize text.

### Matching

Make text match a specific case style.

### Naming Conventions

Convert text to and from common naming conventions.

### Tokenization

Break text into tokens that can be used for case conversion.

## Comparison

Functions for comparing text and other entities.

### Distance

Determine how different two entities are.

### Fuzzy Match

Determine if two entities are similar enough to be considered a match.

### Object

Compare objects for equality.

### Pattern Matching

Search for patterns in text.

### Similarity

Determine how similar two entities are.

### String

Compare strings.

## Data Structures

Data not natively supported by JavaScript, or extensions to native data structures.

### Events

Event emitter and event handling.

### Map

Extensions to the native `Map` data structure.

### Queue

Queue (FIFO) data structure.

### Set

Extensions to the native `Set` data structure.

## DOM

Functions for working with the Document Object Model (DOM).

### Element

Functions for working with DOM elements.

### Window

Functions for working with the browser window.

## English

Functions for working with the English language.

### Articles

Determine the correct article for a word.

### Conjunctions

Functions for working with conjunctions.

### Hyphenation

Functions for hyphenating English words.

### Numbering

Functions for determining the correct form of a word based on a number.

### Possessives

Functions for dealing with possessive forms of English words.

### Stem

Functions for finding the stem of an English word.

## Escape

Function for escaping and unescaping text in various computer languages.

### C

Escape and unescape text for use in C, C++, and C# (and similar languages).

### HTML

Escape and unescape text for use in HTML.

### Java

Escape and unescape text for use in Java.

### JavaScript

Escape and unescape text for use in JavaScript or TypeScript.

### Python

Escape and unescape text for use in Python.

### RegExp

Escape text for use in regular expressions.

## Error

Functions for working with errors.

### Conversion

Convert between errors and other types.

## File System

Functions for working with the file system.

### Existence

Check if files or directories exist.

### Filename

Generate and manipulate filenames.

### Location

Find the location of files and directories.

### Relativity

Determine the relative position of files and directories.

### Utilities

General utilities for working with the file system.

## Function

Functions for working with functions.

### Memoization

Cache the results of function calls.

### Timing

Limit the rate at which a function can be called.

### Type Checking

Check if a value is a function.

## Geometry

Functions for working with geometric shapes and calculations.

### Angle

Functions for working with angles.

### Computation

Functions for computing geometric properties.

### Coordinates

Functions for working with and transforming coordinates.

### Distance

Functions for calculating distances.

### Line Segment

Functions for working with line segments.

### Polygon

Functions for working with polygons.

### Rectangle

Functions for working with rectangles and squares.

### Transformation

Functions for transforming geometric shapes.

## Graphics

Functions for working with graphics.

### Animation

Functions for working with animations.

## Hash

Generate the cryptographic hash of data.

### Base

Base class for hash functions.

### CRC

Classes for computing CRC (Cyclic Redundancy Check) hashes.

### SHA

Classes for computing SHA (Secure Hash Algorithm) hashes.

## IO

Function for basic input and output.

### Stdio

Functions for working with standard input, output, and error.

## Iteration

Functions for working with iterables.

### Chaining

Functions for chaining iterables together.

### Look-Ahead

Functions for looking ahead in an iterable.

### N-Grams

Functions for working breaking iterables into n-grams.

### Type Checking

Check if a value is an iterable.

## Math

Mathematical functions and constants.

### Comparison

Functions for comparing numbers.

### Complex Numbers

Class for working with complex numbers.

### Evaluation

Evaluate a mathematical expression.

### Number

Functions for working with numbers and numeric representations.

### Operations

Functions for performing mathematical operations.

### Statistics

Functions for calculating statistical properties of data.

## Network

Functions for working with network addresses and protocols.

### Type Checking

Check if a value is a valid network address.

## Number

Functions for working with numbers.

### Cardinal Numbers

Convert numbers to their cardinal form (e.g., "one", "two", "three").

### Number

Compare numbers.

### Conversion

Functions for converting between numbers and other types.

### Formatting

Functions for formatting numbers as text.

### Fractions

Convert numbers to their fractional form (e.g., "one half", "three quarters").

### Ordinal Numbers

Convert numbers to their ordinal form (e.g., "first", "second", "third").

### Roman Numerals

Convert numbers to and from Roman numerals (e.g., "I", "II", "III").

### Type Checking

Check if a value is a number.

## Object

Functions for working with objects.

### Comparison

Functions for comparing objects.

### Manipulation

Functions for extracting and updating properties of objects.

### Merging

Functions for merging objects together.

### Mutation

Functions for mutating objects.

### Type Checking

Check if a value is an object.

## Phonetic

Functions for working with phonetic representations of words.

### Algorithm

Functions and types to create phonetic algorithms.

### Alpha-SIS

Alpha-SIS phonetic algorithm.

### Caverphone

Caverphone phonetic algorithm.

### Cologne

Cologne phonetic algorithm.

### Eudex

Eudex phonetic algorithm.

### Lein

Lein phonetic algorithm.

### Metaphone

Metaphone phonetic algorithm.

### MRA

MRA phonetic algorithm.

### NYSIIS

NYSIIS phonetic algorithm.

### ONCA

ONCA phonetic algorithm.

### Phonex

Phonex phonetic algorithm.

### Roger Root

Roger Root phonetic algorithm.

### Sound-D

Sound D phonetic algorithm.

### Soundex

Soundex phonetic algorithm.

### StatCan

StatCan phonetic algorithm.

## Primitive

Functions for working with primitive values.

### Conversion

Functions for converting other types to primitive values.

### Type Checking

Check if a value is a primitive.

## Process

Functions for working with the Node.js process.

### Child Process

Functions for working with child processes.

## Random

Functions for generating random values.

### Classes

Random number generator classes.

### Draw

Draw random values from a set of options.

### Number Generation

Class for generating random numbers.

### Pick

Pick random elements from an array.

### Shuffle

Functions for shuffling arrays.

### Text Generation

Functions for generating random text.

## RegExp

Functions for working with regular expressions.

### Constants

Common regular expression patterns.

### Construction

Functions for constructing regular expressions.

### Type Checking

Check if a value is a regular expression.

### Validation

Functions for validating text against regular expressions.

## Serialization

Functions for serializing and deserializing data.

### Binary

Serialize and deserialize binary data.

### CSV

Serialize and deserialize data in CSV (Comma Separated Values) format.

### JSON

Serialize and deserialize data in JSON (JavaScript Object Notation) format.

### Normalization

Normalize data for serialization.

## Storage

Functions for working with data storage.

### Cookies

Functions for working with cookies.

## String

Functions for working with strings.

### Analysis

Functions for analyzing strings.

### Banner

Functions for creating text banners.

### Clean

Functions for cleaning strings.

### Commonality

Functions for finding common parts of strings.

### Construction

Functions for constructing strings.

### Correction

Functions for correcting strings.

### Deconstruction

Functions for breaking strings into parts.

### Difference

Find the differences between two strings.

### Indentation

Functions for working with string indentation.

### Parsing

Functions for parsing strings.

### Template

Functions for working with string templates.

### Type Checking

Functions for checking if a value is a string.

## Time

Functions for working with dates and times.

### Alteration

Functions for altering dates and times.

### Constants

Common date and time formats.

### Conversion

Functions for converting between date and time formats.

### Date

Functions for working with dates.

### Day

Functions for working with days of the week.

### Enumerations

Functions for working with date and time enumerations.

### Formatting

Functions for formatting dates and times.

### Julian

Functions for working with Julian dates.

### Month

Functions for working with months of the year.

### Parsing

Functions for parsing dates and times.

### Relative Time

Functions for working with relative time (e.g., "2 days ago", "in 3 hours").

### Time Span

Functions for working with time spans (e.g., "2 hours", "3 days").

### Time Zone

Functions for working with time zones.

### Type Checking

Check if a value is a date or time.

### Week

Functions for working with weeks of the year.

### Year

Functions for working with years.

## Tokenization

Functions for breaking text into tokens.

### Characters

Functions for breaking text into characters.

### Chunking

Functions for breaking text into chunks.

### Initials

Functions for extracting initials from text.

### Lines

Functions for breaking text into lines.

### Sort Order

Functions for determining the sort order of text.

## Unicode

Functions for working with Unicode characters and strings.

### Categorization

Functions for categorizing Unicode characters.

### Constants

Common Unicode character classes and properties.

### Encoding

Functions for encoding and decoding Unicode characters.

### Normalization

Functions for normalizing Unicode strings.

### Operations

Functions for performing operations on Unicode strings.

### Surrogates

Functions for working with Unicode surrogate pairs.
