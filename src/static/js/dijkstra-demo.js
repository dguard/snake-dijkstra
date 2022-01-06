/**
 *   Dijkstra-Demo.js
 *   github.com/dguard/snake-dijkstra
 *   Licensed under the MIT license.
 *
 *   Implementation By Alexander Serditov (keep@digitallyconstructed.ru)
 **/

var DijkstraDemo = function () {

    var TOTAL_ROWS = 15;
    var TOTAL_COLS = 17;

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

    var dijkstraAlgo;

    var selectedImageIndex = 0;

    this._setDijkstraAlgo = (_dijkstraAlgo) => {
        dijkstraAlgo = _dijkstraAlgo;
    }

    this._renderGrid = function () {
        var grid = document.createElement('div');
        grid.classList.add('board');

        grid.style = `
            position: relative;
            transform: scale(0.3);
            margin-top: 650px;
            margin-left: 1400px;
        `;

        var marginLeft = {
            "even": {},
            "odd": {}
        };

        for(var i = 0; i < TOTAL_ROWS; i++) {
            var row = document.createElement('div');
            row.classList.add('row');

            var rowClass;

            if((i+1) % 2 !== 0) {
                row.style = `
                    display: flex;
                    position: absolute;
                    left: 0;
                    top: ${Math.trunc(i/2)*600};
                    margin-top: -${20*i + 4}px;
                `;
                rowClass = 'even';
            } else {
                row.style = `
                    display: flex;
                    position: absolute;
                    left: 0;
                    top: ${Math.trunc(i/2)*600+400};
                    margin-top: -${20*i + 4}px;
                `;
                rowClass = 'odd';
            }
            row.classList.add(rowClass);




            for(var j = 0; j < gridRowsLength[i]; j++) {
                var cell = document.createElement('div');
                cell.classList.add('cell');

                cell.style = `
                    width: 400px;
                    height: 410px;
                `;

                var hexagon = document.createElement('div');

                var hexagonShadow = document.createElement('div');
                var hexagonCell = document.createElement('div');

                var hexagonTop = document.createElement('div');
                var hexagonMiddle = document.createElement('div');
                var hexagonBottom = document.createElement('div');


                hexagonTop.classList.add('hexagon-top');
                hexagonMiddle.classList.add('hexagon-middle');
                hexagonBottom.classList.add('hexagon-bottom');

                if((i+1) % 2 !== 0) {
                //     hexagonTop.style = `
                //     border-color: transparent transparent #ffff8a transparent;
                //     border-width: 200px 200px 100px 200px;
                //     height: 0;
                //     width: 0;
                //     border-style: solid;
                // `;
                    hexagonMiddle.style = `
                    width: 400px;
                    height: 210px;
                    background: #ffff8a;
                    margin-top: -10px;
                    
                    
                    background: rgb(255, 255, 255);
                    margin-top: -10px;
                    color: #000;
                    font-size: 100px;
                `;
                //     hexagonBottom.style = `
                //     border-color: #ffff8a transparent transparent transparent;
                //     border-width: 100px 200px 200px 200px;
                //     height: 0;
                //     width: 0;
                //     border-style: solid;
                //     margin-top: -10px;
                // `;

                    hexagonMiddle.innerHTML = JSON.stringify([i, j]);
                } else {
                //     hexagonTop.style = `
                //     border-color: transparent transparent #ffffff transparent;
                //     border-width: 200px 200px 100px 200px;
                //     height: 0;
                //     width: 0;
                //     border-style: solid;
                // `;
                    hexagonMiddle.style = `
                    width: 400px;
                    height: 210px;
                    background: #ffffff;
                    margin-top: -10px;
                    
                    background: rgb(255, 255, 255);
                    margin-top: -10px;
                    color: #000;
                    font-size: 100px;
                `;
                    hexagonMiddle.innerHTML = JSON.stringify([i, j]);

                //     hexagonBottom.style = `
                //     border-color: #ffffff transparent transparent transparent;
                //     border-width: 100px 200px 200px 200px;
                //     height: 0;
                //     width: 0;
                //     border-style: solid;
                //     margin-top: -10px;
                // `;
                }
                hexagonCell.style = `
                    position: absolute;
                    transform: scale(0.95);
                    margin-top: -200px;
                `;
                hexagonCell.appendChild(hexagonTop);
                hexagonCell.appendChild(hexagonMiddle);
                hexagonCell.appendChild(hexagonBottom);


                var hexagonShadowTop = document.createElement('div');
                var hexagonShadowMiddle = document.createElement('div');
                var hexagonShadowBottom = document.createElement('div');

                // hexagonShadowTop.style = `
                //     border-color: transparent transparent #000 transparent;
                //     border-width: 200px 200px 100px 200px;
                //     height: 0;
                //     width: 0;
                //     border-style: solid;
                // `;
                hexagonShadowMiddle.style = `
                    width: 400px;
                    height: 210px;
                    background: #000;
                    margin-top: -5px;
                `;
                // hexagonShadowBottom.style = `
                //     border-color: #000 transparent transparent transparent;
                //     border-width: 100px 200px 200px 200px;
                //     height: 0;
                //     width: 0;
                //     border-style: solid;
                //     margin-top: -5px;
                // `;
                hexagonShadow.style = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    margin-top: -200px;
                `;


                hexagonShadow.appendChild(hexagonShadowTop);
                hexagonShadow.appendChild(hexagonShadowMiddle);
                hexagonShadow.appendChild(hexagonShadowBottom);

                hexagon.appendChild(hexagonShadow);
                hexagon.appendChild(hexagonCell);


                var hexagonClass;
                // 0,-1,-2,-3,-4,-5, -4, -3,-2,-1,0

                if((i+1) % 2 !== 0) { // even
                    if(i < 7) {
                        marginLeft['even'][i] = i === 0 ? 0 : (200*Math.trunc(i/2)+Math.ceil((i-1)/2)*200);
                        // 0, -1, -2, -3; -2, -1, 0
                        hexagonClass = `_+${7-i-1}_${j}`;
                    } else if(i === 7) {
                        marginLeft['even'][i] = (200*Math.trunc(i/2)+Math.ceil((i-1)/2)*200) - 400;
                        hexagonClass = `_${7-i-1}_${j}`;
                    } else {
                        marginLeft['even'][i] = marginLeft['even'][7-(i-7)] - 400;
                        hexagonClass = `_${7-i-1}_${j}`;
                    }


                    hexagon.style = `
                        position: relative;
                        width: 400px;
                        height: 400px;
                        margin-left: -${marginLeft['even'][i]}px;
                    `;
                    hexagon.classList.add(hexagonClass);
                } else if((i+1) % 2 === 0) { // odd
                    if(i < 7) {
                        marginLeft['odd'][i] = (200*Math.ceil(i/2)+Math.ceil((i-1)/2)*200);
                        // 0, -1, -2, -2, -1, 0
                        hexagonClass = `_+${7-i-1}_${j}`;
                    } else if(i === 7) {
                        marginLeft['odd'][i] = (200*Math.ceil(i/2)+Math.ceil((i-1)/2)*200) - 400;
                        hexagonClass = `_${7-i-1}_${j}`;
                    } else {
                        marginLeft['odd'][i] = marginLeft['odd'][7-(i-7)] - 400;
                        hexagonClass = `_${7-i-1}_${j}`;
                    }
                    hexagon.style = `
                        position: relative;
                        width: 400px;
                        height: 400px;
                        margin-top: -100px;
                        margin-left: -${marginLeft['odd'][i]}px;
                        
                    `;
                    hexagon.classList.add(hexagonClass);
                }

                cell.appendChild(hexagon);
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }

        document.querySelector('.board').outerHTML = grid.outerHTML;
    };

    var getRangomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max-min+1) + min);
    }
    var generateGoalCoordinates = () => {
        var startCell = dijkstraAlgo.getStartCell();

        var maxAttempts = 100;
        var attempts = 0;
        while(attempts <= maxAttempts) {
            var endY = getRangomInt(0, gridRowsLength.length-1);
            var endX = getRangomInt(0, gridRowsLength[endY]-1);

            if(startCell.y === endY && startCell.x === endX) {
                attempts++;
            } else {
                selectedImageIndex = getRangomInt(0, 2);
                return {y: endY, x: endX};
            }
        }
        if(attempts === maxAttempts) {
            return null;
        }
    };

    this._doMove = (startCell, pathCell, cb) => {
        var promise = Promise.resolve();

        if(pathCell.y === startCell.y && pathCell.x === startCell.x) {
            // keep
        } else {
            var img = document.querySelectorAll('.row')[startCell.y].querySelectorAll('.cell')[startCell.x].querySelector('img');
            promise = new Promise((resolve, reject) => {
                promise.then(() => {
                    img.parentElement.parentElement.classList.add('animated');
                    var translateAnimatedClass;

                    // if(pathCell.y === 0) {
                    //     if(pathCell.x === 0) {
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //         if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //     } else if(pathCell.x < gridRowsLength[pathCell.y]-1) {
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //         if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //     } else if(pathCell.x === gridRowsLength[pathCell.y]-1) {
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //         if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //     }
                    // } else if (pathCell.y < 6) {
                    //     if(pathCell.x === 0) {
                    //         if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //         if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //     } else if(pathCell.x < gridRowsLength[pathCell.y]-1) {
                    //         // this.addNeighbour(node, nodeY-1, nodeX-1, neighbours);
                    //         // this.addNeighbour(node, nodeY-1, nodeX, neighbours);
                    //         //
                    //         // this.addNeighbour(node, nodeY+1, nodeX, neighbours);
                    //         // this.addNeighbour(node, nodeY+1, nodeX+1, neighbours);
                    //         //
                    //         // this.addNeighbour(node, nodeY, nodeX+1, neighbours);
                    //         // this.addNeighbour(node, nodeY, nodeX-1, neighbours);
                    //
                    //         if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //         if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //         if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //
                    //
                    //     } else if(pathCell.x === gridRowsLength[pathCell.y]-1) {
                    //
                    //         if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //         if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //     }
                    // } else if (pathCell.y === 6) {
                    //     if(pathCell.x === 0) {
                    //         if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //     } else if(pathCell.x < gridRowsLength[pathCell.y]-1) {
                    //         // this.addNeighbour(node, nodeY-1, nodeX-1, neighbours);
                    //         // this.addNeighbour(node, nodeY-1, nodeX, neighbours);
                    //         //
                    //         // this.addNeighbour(node, nodeY+1, nodeX-1, neighbours);
                    //         // this.addNeighbour(node, nodeY+1, nodeX, neighbours);
                    //         //
                    //         // this.addNeighbour(node, nodeY, nodeX-1, neighbours);
                    //         // this.addNeighbour(node, nodeY, nodeX+1, neighbours);
                    //         if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //         if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y+1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //     } else if(pathCell.x === gridRowsLength[pathCell.y]-1) {
                    //         if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //
                    //         if(startCell.y+1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //     }
                    // } else if(pathCell.y < gridRowsLength.length-1) {
                    //     if(pathCell.x === 0) {
                    //         if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //         if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //     } else if(pathCell.x < gridRowsLength[pathCell.y]-1) {
                    //         // this.addNeighbour(node, nodeY-1, nodeX, neighbours);
                    //         // this.addNeighbour(node, nodeY-1, nodeX+1, neighbours);
                    //         //
                    //         // this.addNeighbour(node, nodeY+1, nodeX-1, neighbours);
                    //         // this.addNeighbour(node, nodeY+1, nodeX, neighbours);
                    //         //
                    //         // this.addNeighbour(node, nodeY, nodeX-1, neighbours);
                    //         // this.addNeighbour(node, nodeY, nodeX+1, neighbours);
                    //
                    //         if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //         if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y+1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //         if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //
                    //     } else if(pathCell.x === gridRowsLength[pathCell.y]-1) {
                    //         if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //         if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y+1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-bottom-left';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //     }
                    // } else if(pathCell.y === gridRowsLength.length-1) {
                    //     if(pathCell.x === 0) {
                    //         if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //         if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //     } else if(pathCell.x < gridRowsLength[pathCell.y]-1) {
                    //         if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //         if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //         if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-right';
                    //         }
                    //     } else if(pathCell.x === gridRowsLength[pathCell.y]-1) {
                    //         if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-left';
                    //         }
                    //         if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-top-right';
                    //         }
                    //
                    //         if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    //             translateAnimatedClass = 'animate-translate-left';
                    //         }
                    //     }
                    // }


                    // img.classList.add(translateAnimatedClass);

                    setTimeout(() => {
                        img.parentElement.parentElement.classList.remove('animated');
                        // img.classList.remove(translateAnimatedClass);
                        resolve();
                    }, 1000);
                });
            });

        }

        promise.then(() => {
            this._renderGrid();

            this._drawStartCellLayer(startCell, pathCell);

            var endCell = dijkstraAlgo.getEndCell();
            this._drawEndCellLayer(endCell);

            setTimeout(() => {
                cb();
            }, 100)
        });
    };
    this.doMove = (path, cb) => {
        var startCell = dijkstraAlgo.getStartCell();

        [Promise.resolve()].concat(path).reduce((prev, next, index, arr) => {
            return new Promise((resolve, reject) => {
                prev.then(() => {
                        if(index === 1) {
                            this._doMove(startCell, next, resolve);
                        } else if (index < arr.length -1) {
                            this._doMove(arr[index-1], next, resolve);
                        } else if(index === arr.length -1) {
                            dijkstraAlgo.putStartCell(next.y, next.x);

                            var goalCoords = generateGoalCoordinates();
                            dijkstraAlgo.putEndCell(goalCoords.y, goalCoords.x);
                            this._doMove(arr[index-1], next, resolve);
                        }
                })
            })
        }).then(cb);
    };

    this._drawStartCellLayer = (startCell, pathCell) => {
        var hexagon = document.querySelectorAll('.row')[pathCell.y].querySelectorAll('.cell')[pathCell.x];
        var img = document.createElement('img');
        img.classList.add('probe');
        img.style = `
            margin-top: -300px;
            margin-left: -100px;
        `;

        img.src = 'static/img/probe-center.png';

        if(startCell.y === 0) {
            if(startCell.x === 0) {
                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }
            } else if(pathCell.x < gridRowsLength[pathCell.y]-1) {
                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }
                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
            } else if(pathCell.x === gridRowsLength[pathCell.y]-1) {
                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
            }
        } else if(startCell.y < 6) {
            if(startCell.x === 0) {
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }
                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }
            } else if(startCell.x < gridRowsLength[startCell.y]-1) {
                if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }
                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }
                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
            } else if(startCell.x === gridRowsLength[startCell.y]-1) {
                if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }
                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
            }
        } else if(startCell.y === 6) {
            if(startCell.x === 0) {
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }

                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }
            } else if(startCell.x < gridRowsLength[startCell.y]-1) {
                if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }

                if(startCell.y+1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }
            } else if(startCell.x === gridRowsLength[startCell.y]-1) {
                if(startCell.y-1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }

                if(startCell.y+1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }

                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
            }
        } else if(startCell.y < gridRowsLength.length-1) {
            if(startCell.x === 0) {
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }
                if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }

                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }

            } else if(startCell.x < gridRowsLength[startCell.y]-1) {
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }
                if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }

                if(startCell.y+1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }
                if(startCell.y+1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-bottom-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }
            } else if(startCell.x === gridRowsLength[startCell.y]-1) {
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }
                if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }

                if(startCell.y+1 === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-bottom-left.png';
                }

                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
            }
        } else if(startCell.y === gridRowsLength.length-1) {
            if(startCell.x === 0) {
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }
                if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }
            } else if(startCell.x < gridRowsLength[startCell.y]-1) {
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }
                if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
                if(startCell.y === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-right.png';
                }
            } else if(startCell.x === gridRowsLength[startCell.y]-1) {
                if(startCell.y-1 === pathCell.y && startCell.x === pathCell.x) {
                    img.src = 'static/img/probe-top-left.png';
                }
                if(startCell.y-1 === pathCell.y && startCell.x+1 === pathCell.x) {
                    img.src = 'static/img/probe-top-right.png';
                }

                if(startCell.y === pathCell.y && startCell.x-1 === pathCell.x) {
                    img.src = 'static/img/probe-left.png';
                }
            }
        }

        hexagon.querySelector('.hexagon-middle').appendChild(img);
    };
    this._drawEndCellLayer = (endCell) => {
        var hexagon = document.querySelectorAll('.row')[endCell.y].querySelectorAll('.cell')[endCell.x];
        var img = document.createElement('img');
        img.style = `
            margin-top: -300px;
            margin-left: -100px;
            transform: scale(0.8);
        `;
        var availableImages = [
            'static/img/crystal-variant-1.png',
            'static/img/crystal-variant-2.png',
            'static/img/crystal-variant-3.png'
        ];
        img.src = availableImages[selectedImageIndex];

        hexagon.querySelector('.hexagon-middle').appendChild(img);
    };

    this.doTurn = (cb) => {
        var startCell = dijkstraAlgo.getStartCell();
        var endCell = dijkstraAlgo.getEndCell();

        dijkstraAlgo.findPath(startCell.y, startCell.x, endCell.y, endCell.x, (path) => {

            this.doMove(path, cb);
        });
    };

    this.init = function () {

        var grid = [];
        for(var i = 0; i < gridRowsLength.length; i++) {
            var row = [];
            for(var j = 0; j < gridRowsLength[j].length; j++) {
                var cell = null;
                row.push(cell);
            }
            grid.push(row);
        }
        dijkstraAlgo = new DijkstraAlgo.js();
        dijkstraAlgo.setGrid(grid);

        var startY = 10;
        var startX = 0;
        var endY = 5;
        var endX = 5;


        var startY = 6;
        var startX = 5;
        var endY = 11;
        var endX = 8;

        dijkstraAlgo.putStartCell(startY, startX);
        dijkstraAlgo.putEndCell(endY, endX);

        this._renderGrid();

        dijkstraAlgo.findPath(startY, startX, endY, endX, (path) => {
            this._drawStartCellLayer({y: startY, x: startX}, {y: startY, x: startX});

            selectedImageIndex = 0;
            this._drawEndCellLayer({y: endY, x: endX});
        });

    }
};