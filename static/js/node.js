/**
 *   Node.js
 *   github.com/dguard/snake-dijkstra
 *   Licensed under the MIT license.
 *
 *   Implementation By Alexander Serditov (keep@digitallyconstructed.ru)
 **/
var HexagonNode = function (parent, nodeY, nodeX, distanceFromStart) {

    this.y = nodeY;
    this.x = nodeX;
    this.parent = parent;
    this.distanceFromStart = distanceFromStart;
};
