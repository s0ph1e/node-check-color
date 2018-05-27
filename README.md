## Introduction

[![Build Status](https://travis-ci.org/s0ph1e/node-check-color.svg?branch=master)](https://travis-ci.org/s0ph1e/node-check-color)
[![Test Coverage](https://codeclimate.com/github/s0ph1e/node-check-color/badges/coverage.svg)](https://codeclimate.com/github/s0ph1e/node-check-color/coverage)
[![Code Climate](https://codeclimate.com/github/s0ph1e/node-check-color/badges/gpa.svg)](https://codeclimate.com/github/s0ph1e/node-check-color)
[![Version](https://img.shields.io/npm/v/check-color.svg?style=flat)](https://www.npmjs.org/package/check-color) [![Greenkeeper badge](https://badges.greenkeeper.io/s0ph1e/node-check-color.svg)](https://greenkeeper.io/)

Module parses color and determines its shade by hue value.

![Default shades](https://raw.githubusercontent.com/s0ph1e/node-check-color/master/docs/default-shades.png)

By default it uses data from [WorkWithColor.com](http://www.workwithcolor.com/color-names-01.htm), but you can set custom rules for shades.
## Installation
```
npm install check-color
```

## Usage
```javascript
var color = require('check-color');

// lime == #00ff00
color.getShade('lime'); // 'green'
color.isGreen('lime');  // true
color.isPink('lime');   // false

// coral == #ff7f50 (base shades are true for intermediate colors)
color.getShade('coral');    // 'red-orange'
color.isRedOrange('coral'); // true
color.isRed('coral');       // true
color.isOrange('coral');    // true
color.isBlue('coral');      // false
```
*You can pass as argument everything that [parse-color](https://github.com/substack/parse-color) can parse (e.g `red`, `#ffff00`, `rgb(255, 0, 0)`)*

--------------

Methods of module depend on config. Default config is in [src/defaults.js](https://raw.githubusercontent.com/s0ph1e/node-check-color/master/src/defaults.js), default methods are:

**isRed, isRedOrange, isOrange, isOrangeYellow, isYellow, isYellowGreen, isGreen, isGreenCyan, isCyan, isCyanBlue, isBlue, isBlueMagenta, isMagenta, isMagentaPink, isPink, isPinkRed**

Also there is **getShade** method, that returns shade name for color based on config.

You can set custom config with **init** method.

```javascript
var color = require('check-color');
color.init({
  // key - shade name
  // value - array of hue ranges, first value of range - min hue, second - max hue
  a: [         
    {h: [0, 100]},
    {h: [201, 300]}
  ],     
  b: [{h: [101, 200]}],
  c: [{h: [301, 360]}]
});

// Here you can use methods 'isA', 'isB', 'isC'
console.log(color.isA('red'));
```
