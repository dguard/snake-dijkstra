/**
 *   Dijkstra-Algo.js
 *   github.com/dguard/snake-dijkstra
 *   Licensed under the MIT license.
 *
 *   Implementation By Alexander Serditov (keep@digitallyconstructed.ru)
 **/
var DijkstraAlgo = {};
DijkstraAlgo.js = function () {

    var gridRowsLength = [
        8,
        9,
        10,
        11,
        12,
        13,
        14,

        13,
        12,
        11,
        10,
        9,
        8
    ];

    var grid;
    var instance = {};


    var startY;
    var startX;
    var endY;
    var endX;

    var nodeGrid = [];
    var DISTANCE = 10;

    this.setGrid = (newGrid) => {
        grid = newGrid;
    };
    this.putStartCell = (_startY, _startX) => {
        startY = _startY;
        startX = _startX;
        console.log(`Start Cell: ${startY}_${startX}`)
    };
    this.putEndCell = (_endY, _endX) => {
        endY = _endY;
        endX = _endX;

        console.log(`End Cell: ${endY}_${endX}`)
    };

    this.addNeighbour = (parent, nodeY, nodeX, neighbours) => {
        var distanceFromStart = parent.distanceFromStart + DISTANCE;

        var newNode = new HexagonNode(parent, nodeY, nodeX, distanceFromStart);
        neighbours.push(newNode);
    };

    this.getStartCell = () => {
        return {y: startY, x: startX};
    };

    this.getEndCell = () => {
        return {y: endY, x: endX};
    };


    this._openNode = (node) => {
        var nodeY = node.y;
        var nodeX = node.x;
        var distance = 10;

        var neighbours = [];

        if(nodeY === 0) {
            if(nodeX === 0) {
                //
                this.addNeighbour(node, nodeY+1, nodeX, neighbours);
                this.addNeighbour(node, nodeY+1, nodeX+1, neighbours);
                //
                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
            } else if(nodeX < gridRowsLength[nodeY]-1) {
                //
                this.addNeighbour(node, nodeY+1, nodeX, neighbours);
                this.addNeighbour(node, nodeY+1, nodeX+1, neighbours);
                //
                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
            } else if(nodeX === gridRowsLength[nodeY]-1) {
                //
                this.addNeighbour(node, nodeY+1, nodeX, neighbours);
                this.addNeighbour(node, nodeY+1, nodeX+1, neighbours);
                //
                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
            }
        } else if(nodeY < 6) {
            if(nodeX === 0) {
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);

                //
                this.addNeighbour(node, nodeY+1, nodeX, neighbours);
                this.addNeighbour(node, nodeY+1, nodeX+1, neighbours);
                //

                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
            } else if(nodeX < gridRowsLength[nodeY]-1) {
                //
                this.addNeighbour(node, nodeY-1, nodeX-1, neighbours);
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);

                this.addNeighbour(node, nodeY+1, nodeX, neighbours);
                this.addNeighbour(node, nodeY+1, nodeX+1, neighbours);

                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
                //
            } else if(nodeX === gridRowsLength[nodeY]-1) {
                this.addNeighbour(node, nodeY-1, nodeX-1, neighbours);

                //
                this.addNeighbour(node, nodeY+1, nodeX, neighbours);
                this.addNeighbour(node, nodeY+1, nodeX+1, neighbours);
                //

                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
            }
        } else if(nodeY === 6) {
            if(nodeX === 0) {
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);

                this.addNeighbour(node, nodeY+1, nodeX, neighbours);

                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
            } else if(nodeX < gridRowsLength[nodeY]-1) {
                this.addNeighbour(node, nodeY-1, nodeX-1, neighbours);
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);

                this.addNeighbour(node, nodeY+1, nodeX-1, neighbours);
                this.addNeighbour(node, nodeY+1, nodeX, neighbours);

                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
            } else if(nodeX === gridRowsLength[nodeY]-1) {
                this.addNeighbour(node, nodeY-1, nodeX-1, neighbours);

                this.addNeighbour(node, nodeY+1, nodeX-1, neighbours);

                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
            }
        } else if (nodeY < gridRowsLength.length-1) {
            if(nodeX === 0) {
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);
                this.addNeighbour(node, nodeY-1, nodeX+1, neighbours);

                this.addNeighbour(node, nodeY+1, nodeX, neighbours);

                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
            } else if(nodeX < gridRowsLength[nodeY]-1) {
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);
                this.addNeighbour(node, nodeY-1, nodeX+1, neighbours);

                this.addNeighbour(node, nodeY+1, nodeX-1, neighbours);
                this.addNeighbour(node, nodeY+1, nodeX, neighbours);

                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
            } else if(nodeX === gridRowsLength[nodeY]-1) {
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);
                this.addNeighbour(node, nodeY-1, nodeX+1, neighbours);

                this.addNeighbour(node, nodeY+1, nodeX-1, neighbours);

                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
            }
        } else if(nodeY === gridRowsLength.length-1) {
            if(nodeX === 0) {
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);
                this.addNeighbour(node, nodeY-1, nodeX+1, neighbours);

                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
            } else if(nodeX < gridRowsLength[nodeY]-1) {
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);
                this.addNeighbour(node, nodeY-1, nodeX+1, neighbours);

                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
                this.addNeighbour(node, nodeY, nodeX+1, neighbours);
            } else if(nodeX === gridRowsLength[nodeY]-1) {
                this.addNeighbour(node, nodeY-1, nodeX, neighbours);
                this.addNeighbour(node, nodeY-1, nodeX+1, neighbours);

                this.addNeighbour(node, nodeY, nodeX-1, neighbours);
            }
        }

        neighbours.map((neighbour) => {
            if(typeof instance.visitedList[`_${neighbour.y}_${neighbour.x}`] !== "undefined") {
                return;
            }
            if(neighbour.distanceFromStart < (node.distanceFromStart + distance)) {
                neighbour.parent = node;
            }
            if(typeof instance.openList[`_${neighbour.y}_${neighbour.x}`] === "undefined") {
                instance.openList[`_${neighbour.y}_${neighbour.x}`] = neighbour;
                nodeGrid[neighbour.y][neighbour.x] = neighbour;
            }
        });

        delete instance.openList[`_${nodeY}_${nodeX}`];
        instance.visitedList[`_${nodeY}_${nodeX}`] = node;
    };

    var getNextNode = () => {
        return instance.openList[Object.keys(instance.openList)[0]];
    };

    this.findPath = (_startY, _startX, _endY, _endX, callback) => {
        instance.openList = {};
        instance.visitedList = {};

        var startY = _startY;
        var startX = _startX;

        var endY = _endY;
        var endX = _endX;


        nodeGrid = [];
        for(var i = 0; i < grid.length; i++) {
            var row = [];

            for(var j = 0; j < grid[i].length; j++) {
                var cell = null;
                row.push(cell);
            }
            nodeGrid.push(row);
        }

        var distanceFromStart = 0;
        var startNode = new HexagonNode(null, startY, startX, distanceFromStart);
        instance.openList[`_${startNode.y}_${startNode.x}`] = startNode;
        nodeGrid[startY][startX] = startNode;

        var nodeFound = false;
        var iterationsCount = 10000;
        for(var i = 0; i < iterationsCount; i++) {
            var searchNode = getNextNode();

            if(nodeFound) {
                continue;
            }

            if(searchNode.y === endY && searchNode.x === endX) {
                var path = [];
                while(searchNode.parent !== null) {
                    path.push(searchNode);
                    searchNode = searchNode.parent;
                }
                path.push(startNode);

                path = path.reverse();
                callback(path);

                nodeFound = true;
            }

            this._openNode(searchNode);
        }

    }

};