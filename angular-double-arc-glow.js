(function (angular) {

    'use strict';

    var app = angular.module('angular-double-arc-glow', []);

    app.directive('doubleArcGlow', ['$window', function ($window) {
        return {
            restrict: 'E',
            scope: {
                width:              '@',
                circleColor:        '@',
                arcColor:           '@',
                dotColor:           '@',
                innerRadius:        '@',
                outerRadius:        '@',
                innerDotRadius:     '@',
                outerDotRadius:     '@',
                innerStrokeWidth:   '@',
                outerStrokeWidth:   '@',
                progressAngle:      '@'
            },
            compile: function (element, attr) {
                return function (scope, element, attr) {
                    var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
                        var angleInRadians;

                        angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
                        return {
                            x: centerX + radius * Math.cos(angleInRadians),
                            y: centerY + radius * Math.sin(angleInRadians)
                        };
                    };

                    var describeArc = function(x, y, radius, startAngle, endAngle) {
                        var arcSweep, end, start;

                        start = polarToCartesian(x, y, radius, endAngle);
                        end = polarToCartesian(x, y, radius, startAngle);
                        arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

                        return ['M', start.x, start.y, 'A', radius, radius, 0, arcSweep, 0, end.x, end.y].join(' ');
                    };

                    scope.width             = scope.width               || ((($window.innerWidth < $window.innerHeight) ? $window.innerWidth : $window.innerHeight) / 2);
                    scope.circleColor       = scope.circleColor         || '#2a2a2a';
                    scope.arcColor          = scope.arcColor            || '#1bbccb';
                    scope.dotColor          = scope.dotColor            || '#e9fafc';
                    scope.innerRadius       = scope.innerRadius         || ((scope.width / 2) - 50);
                    scope.outerRadius       = scope.outerRadius         || ((scope.width / 2) - 40);
                    scope.innerDotRadius    = scope.innerDotRadius      || 3;
                    scope.outerDotRadius    = scope.outerDotRadius      || 5;
                    scope.innerStrokeWidth  = scope.innerStrokeWidth    || 3;
                    scope.outerStrokeWidth  = scope.outerStrokeWidth    || 6;
                    scope.progressAngle     = scope.progressAngle       || 0;

                    scope.width_2   = scope.width/2;

                    var positionHour    = polarToCartesian(scope.width_2, scope.width_2, scope.innerRadius, scope.progressAngle);
                    var positionMinute  = polarToCartesian(scope.width_2, scope.width_2, scope.outerRadius, scope.progressAngle);

                    scope.hourArcPath   = describeArc(scope.width_2, scope.width_2, scope.innerRadius, 0, scope.progressAngle);
                    scope.minuteArcPath = describeArc(scope.width_2, scope.width_2, scope.outerRadius, 0, scope.progressAngle);

                    scope.hourDotPath   = describeArc(scope.width_2, scope.width_2, scope.innerRadius, scope.progressAngle - 3, scope.progressAngle);
                    scope.hourDotX      = positionHour.x;
                    scope.hourDotY      = positionHour.y;

                    scope.minuteDotPath = describeArc(scope.width_2, scope.width_2, scope.outerRadius, scope.progressAngle - 1, scope.progressAngle);
                    scope.minuteDotX    = positionMinute.x;
                    scope.minuteDotY    = positionMinute.y;
                };
            },
            template:
                '<svg ng-attr-width="{{ width }}" ng-attr-height="{{ width }}">' +
                    '<defs>' +
                        '<radialGradient id="backHoleBelowClock" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">' +
                            '<stop offset="50%" style="stop-color:rgb(0,0,0);stop-opacity:0.7"/>' +
                            '<stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0"/>' +
                        '</radialGradient>' +
                        '<filter id="glow">' +
                            '<feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>' +
                            '<feMerge>' +
                                '<feMergeNode in="coloredBlur"/>' +
                                '<feMergeNode in="SourceGraphic"/>' +
                            '</feMerge>' +
                        '</filter>' +
                        '<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">' +
                            '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="shadow"/>' +
                            '<feOffset dx="1" dy="1"/>' +
                            '<feMerge>' +
                                '<feMergeNode/>' +
                                '<feMergeNode in="SourceGraphic"/>' +
                            '</feMerge>' +
                        '</filter>' +
                    '</defs>' +
                    '<ellipse ng-attr-cx="{{ width_2 }}" ng-attr-cy="{{ width_2 }}" ng-attr-rx="{{ width_2 }}" ng-attr-ry="{{ width_2 }}" fill="url(#backHoleBelowClock)"/>' +
                    '<circle stroke-width="{{ innerStrokeWidth }}" fill="none" ng-attr-cx="{{ width_2 }}" ng-attr-cy="{{ width_2 }}" ng-attr-stroke="{{ circleColor }}" ng-attr-r="{{ innerRadius }}" />' +
                    '<path stroke-width="{{ innerStrokeWidth }}" fill="none" stroke-linecap="round" ng-attr-stroke="{{ arcColor }}" ng-attr-d="{{ hourArcPath }}" filter="url(#glow)" />' +
                    '<circle ng-attr-cx="{{ hourDotX }}" ng-attr-cy="{{ hourDotY }}" ng-attr-r="{{ innerDotRadius }}" ng-attr-fill="{{ dotColor }}" ng-attr-d="{{ hourDotPath }}" filter="url(#glow)" />' +
                    '<circle stroke-width="{{ outerStrokeWidth }}" fill="none" ng-attr-cx="{{ width_2 }}" ng-attr-cy="{{ width_2 }}" ng-attr-stroke="{{ circleColor }}" ng-attr-r="{{ outerRadius }}" />' +
                    '<path stroke-width="{{ outerStrokeWidth }}" fill="none" stroke-linecap="round" ng-attr-stroke="{{ arcColor }}" ng-attr-d="{{ minuteArcPath }}" filter="url(#glow)" />' +
                    '<circle ng-attr-cx="{{ minuteDotX }}" ng-attr-cy="{{ minuteDotY }}" ng-attr-r="{{ outerDotRadius }}" ng-attr-fill="{{ dotColor }}" ng-attr-d="{{ minuteDotPath }}" filter="url(#glow)" />' +
                '</svg>'
        };
    }]);

})(window.angular);
