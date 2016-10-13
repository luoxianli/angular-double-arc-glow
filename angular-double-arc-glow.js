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
                innerProgressAngle: '@',
                outerProgressAngle: '@'
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

                    scope.width                 = scope.width               || ((($window.innerWidth < $window.innerHeight) ? $window.innerWidth : $window.innerHeight) / 2);
                    scope.circleColor           = scope.circleColor         || '#2a2a2a';
                    scope.arcColor              = scope.arcColor            || '#1bbccb';
                    scope.dotColor              = scope.dotColor            || '#e9fafc';
                    scope.innerRadius           = scope.innerRadius         || ((scope.width / 2) - 50);
                    scope.outerRadius           = scope.outerRadius         || ((scope.width / 2) - 30);
                    scope.innerDotRadius        = scope.innerDotRadius      || 8;
                    scope.outerDotRadius        = scope.outerDotRadius      || 5;
                    scope.innerStrokeWidth      = scope.innerStrokeWidth    || 6;
                    scope.outerStrokeWidth      = scope.outerStrokeWidth    || 3;
                    scope.innerProgressAngle    = scope.innerProgressAngle  || 0;
                    scope.outerProgressAngle    = scope.outerProgressAngle  || 0;

                    scope.width_2   = scope.width/2;

                    var innerPosition   = polarToCartesian(scope.width_2, scope.width_2, scope.innerRadius, scope.innerProgressAngle);
                    var outerPosition   = polarToCartesian(scope.width_2, scope.width_2, scope.outerRadius, scope.outerProgressAngle);

                    scope.innerArcPath  = describeArc(scope.width_2, scope.width_2, scope.innerRadius, 0, scope.innerProgressAngle);
                    scope.outerArcPath  = describeArc(scope.width_2, scope.width_2, scope.outerRadius, 0, scope.outerProgressAngle);

                    scope.innerDotPath  = describeArc(scope.width_2, scope.width_2, scope.innerRadius, scope.innerProgressAngle - 3, scope.innerProgressAngle);
                    scope.innerDotX     = innerPosition.x;
                    scope.innerDotY     = innerPosition.y;

                    scope.outerDotPath  = describeArc(scope.width_2, scope.width_2, scope.outerRadius, scope.outerProgressAngle - 1, scope.outerProgressAngle);
                    scope.outerDotX     = outerPosition.x;
                    scope.outerDotY     = outerPosition.y;
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
                    '<path stroke-width="{{ innerStrokeWidth }}" fill="none" stroke-linecap="round" ng-attr-stroke="{{ arcColor }}" ng-attr-d="{{ innerArcPath }}" filter="url(#glow)" />' +
                    '<circle ng-attr-cx="{{ innerDotX }}" ng-attr-cy="{{ innerDotY }}" ng-attr-r="{{ innerDotRadius }}" ng-attr-fill="{{ dotColor }}" ng-attr-d="{{ innerDotPath }}" filter="url(#glow)" />' +
                    '<circle stroke-width="{{ outerStrokeWidth }}" fill="none" ng-attr-cx="{{ width_2 }}" ng-attr-cy="{{ width_2 }}" ng-attr-stroke="{{ circleColor }}" ng-attr-r="{{ outerRadius }}" />' +
                    '<path stroke-width="{{ outerStrokeWidth }}" fill="none" stroke-linecap="round" ng-attr-stroke="{{ arcColor }}" ng-attr-d="{{ outerArcPath }}" filter="url(#glow)" />' +
                    '<circle ng-attr-cx="{{ outerDotX }}" ng-attr-cy="{{ outerDotY }}" ng-attr-r="{{ outerDotRadius }}" ng-attr-fill="{{ dotColor }}" ng-attr-d="{{ outerDotPath }}" filter="url(#glow)" />' +
                '</svg>'
        };
    }]);

})(window.angular);
