angular-siri-wave
====================

An [AngularJS](https://angularjs.org/) directive for displaying a double circular progress arc with glow.
Inspired by [IceBob](http://codepen.io/icebob/pen/JYoQZg)

Features
========

- Displays a double arc with glow.
- Adjustable dimensions, color, strokes...
- No additional dependencies outside of AngularJS.

Installation
============

This module can be installed using bower:

```shell
bower angular-double-arc-glow --save
```

Otherwise, simply add the `angular-double-arc-glow.min.js` file to your project.

Usage
=====

Include the scripts in your application and include the `double-arc-glow` module as a dependency in your application module.

```javascript
angular.module('myApp', ['double-arc-glow']);
```

Add a `double-arc-glow` element to your application as required.

```html
<double-arc-glow
    width="{integer}"
    circleColor="{integer}"
    arcColor="{integer}"
    dotColor="{integer}"
    innerRadius="{integer}"
    outerRadius="{integer}"
    innerDotRadius="{integer}"
    outerDotRadius="{integer}"
    innerStrokeWidth="{integer}"
    outerStrokeWidth="{integer}"
    progressAngle="{string}">
</double-arc-glow>
```

Attributes
----------

- `width` defines the pixel width. This defaults to __min($window.innerWidth, $window.innerHeight)/2__.
- `circleColor` defines the circles color. This defaults to __#2a2a2a__.
- `arcColor` defines the arcs color. This defaults to __#1bbccb__.
- `dotColor` defines the dots color. This defaults to __#e9fafc__.
- `innerRadius` defines the inner circle radius. This defaults to __width/2 - 50__.
- `outerRadius` defines the outer circle radius. This defaults to __width/2 - 40__.
- `innerDotRadius` defines the inner dot radius. This defaults to __3__.
- `outerDotRadius` defines the outer circle radius. This defaults to __5__.
- `innerStrokeWidth` defines the inner stroke width. This defaults to __3__.
- `outerStrokeWidth` defines the outer stroke width. This defaults to __6__.
- `progressAngle` defines the progress angle. This defaults to __0__.

License
=======

angular-siri-wave is licensed under the MIT license. See LICENSE for details.
