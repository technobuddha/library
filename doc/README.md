<!-- markdownlint-disable -->

![image](https://img.shields.io/github/last-commit/technobuddha/library)
![image](https://img.shields.io/npm/d18m/%40technobuddha%2Flibrary.svg)
![image](https://img.shields.io/github/license/technobuddha/library)
![image](https://img.shields.io/npm/v/%40technobuddha%2Flibrary)
![image](https://img.shields.io/badge/code%20coverage-100%-4fc921)
![image](https://snyk.io/test/npm/@technobuddha/library/badge.svg)

<center>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="72"
    height="36"
    viewBox="0 0 360 180"
    version="1.1"
  >
      <g>
          <rect x="170" y="0"   width="20"  height="10" fill="#d0f2fa" />
          <rect x="160" y="10"  width="40"  height="10" fill="#d0f2fa" />
          <rect x="150" y="20"  width="60"  height="10" fill="#a3e1f6" />
          <rect x="140" y="30"  width="80"  height="10" fill="#a3e1f6" />
          <rect x="130" y="40"  width="100" height="10" fill="#70c0e4" />
          <rect x="120" y="50"  width="120" height="10" fill="#70c0e4" />
          <rect x="110" y="60"  width="140" height="10" fill="#4b98ca" />
          <rect x="100" y="70"  width="160" height="10" fill="#4b98ca" />
          <rect x="90"  y="80"  width="180" height="10" fill="#1b5ca8" />
          <rect x="80"  y="90"  width="200" height="10" fill="#1b5ca8" />
          <rect x="70"  y="100" width="220" height="10" fill="#135490" />
          <rect x="60"  y="110" width="240" height="10" fill="#135490" />
          <rect x="50"  y="120" width="260" height="10" fill="#0d3f78" />
          <rect x="40"  y="130" width="280" height="10" fill="#0d3f78" />
          <rect x="30"  y="140" width="300" height="10" fill="#082c61" />
          <rect x="20"  y="150" width="320" height="10" fill="#082c61" />
          <rect x="10"  y="160" width="340" height="10" fill="#051f50" />
          <rect x="0"   y="170" width="360" height="10" fill="#051f50" />
    </g>
  </svg>
  <font size="6">Technobuddha Library</font>
  <br/>
  <font size="4">13 Classes, 49 Constants, 241 Functions, and 75 Types</font>
  <br/>
  <font color="#4fc921" size="5">0 dependencies</font>
</center>

## Introduction

This is a large library of many things that the
[Technobuddha](https://technobuddha.com)
has found useful over the years. There is a plethora of functions and classes for working with
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
