<!-- markdownlint-disable -->

![image](https://img.shields.io/github/last-commit/technobuddha/library)
![image](https://img.shields.io/npm/d18m/%40technobuddha%2Flibrary.svg)
![image](https://img.shields.io/github/license/technobuddha/library)
![image](https://img.shields.io/npm/v/%40technobuddha%2Flibrary)
![image](https://img.shields.io/badge/code%20coverage-100%-4fc921)
![image](https://snyk.io/test/npm/@technobuddha/library/badge.svg)

![image](https://doc.technobuddha.com/banner-library.png)

## Introduction

This is a part of the large library of many things that the
[Technobuddha](https://technobuddha.com)
has found useful over the years.

There is a plethora of functions and classes for working with
arrays, strings, numbers, dates, objects, and more. Ranging from the simple
([clamp](https://doc.technobuddha.com/library/clamp.html))
to the complex
([largestInscribedRectangle](https://doc.technobuddha.com/library/largestInscribedRectangle.html)),
this library has something for everyone.

## Contents

{{groups}}

## Installation

Using npm:

```shell
npm install @technobuddha/library
```

## Usage

Most modern build systems will now do proper tree-shaking, so you can import only the functions you need:

```ts
import { plural, summarize } from '@technobuddha/library';

plural('mouse'); // 'mice'
summarize(Number.MAX_SAFE_INTEGER); // '9.01 quadrillion'
```

## License

The Technobuddha Library is released under the [MIT license](LICENSE).

## Documentation

[Dive into the Technobuddha Library documentation](https://doc.technobuddha.com/library.html)

The documentation is written by the `Technobuddha` assisted by AI. Some of what the AI has written is good, some not so much. If you find something that is incorrect or could be improved, please [raise an issue](https://github.com/technobuddha/library/issues) or [make a pull request](https://github.com/technobuddha/library/pulls).

## History

In one form or another, this library has been around since the later part of the 20th century. I ported my library to `Typescript` in 2021, version 2 brings many improvements and new features, as well as a complete rewrite of the documentation.
