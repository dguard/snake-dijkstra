

var DijkstraDemo = function () {

    var TOTAL_ROWS = 15;
    var TOTAL_COLS = 17;


    var gridRowsLength = [
        8,
        9,
        /*9,*/ 10,
        11,
        12,
        13,
        14, // seventh

        13, // mirror edged
        12,
        11,
        10,
        9,
        8
    ];

    var dijkstraAlgo;

    var selectedImageIndex;

    var renderGrid = function () {
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
                    hexagonTop.style = `
                    border-color: transparent transparent #ffff8a transparent;
                    border-width: 200px 200px 100px 200px;
                    height: 0;
                    width: 0;
                    border-style: solid;
                `;
                    hexagonMiddle.style = `
                    width: 400px;
                    height: 210px;
                    background: #ffff8a;
                    margin-top: -10px;
                `;
                    hexagonBottom.style = `
                    border-color: #ffff8a transparent transparent transparent;
                    border-width: 100px 200px 200px 200px;
                    height: 0;
                    width: 0;
                    border-style: solid;
                    margin-top: -10px;
                `;
                } else {
                    hexagonTop.style = `
                    border-color: transparent transparent #ffffff transparent;
                    border-width: 200px 200px 100px 200px;
                    height: 0;
                    width: 0;
                    border-style: solid;
                `;
                    hexagonMiddle.style = `
                    width: 400px;
                    height: 210px;
                    background: #ffffff;
                    margin-top: -10px;
                `;
                    hexagonBottom.style = `
                    border-color: #ffffff transparent transparent transparent;
                    border-width: 100px 200px 200px 200px;
                    height: 0;
                    width: 0;
                    border-style: solid;
                    margin-top: -10px;
                `;
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

                hexagonShadowTop.style = `
                    border-color: transparent transparent #000 transparent;
                    border-width: 200px 200px 100px 200px;
                    height: 0;
                    width: 0;
                    border-style: solid;
                `;
                hexagonShadowMiddle.style = `
                    width: 400px;
                    height: 210px;
                    background: #000;
                    margin-top: -5px;
                `;
                hexagonShadowBottom.style = `
                    border-color: #000 transparent transparent transparent;
                    border-width: 100px 200px 200px 200px;
                    height: 0;
                    width: 0;
                    border-style: solid;
                    margin-top: -5px;
                `;
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
                        // overflow: hidden;
                        
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
                        // overflow: hidden;
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

    this._doMove = (prevCell, currentCell, cb) => {
        renderGrid();

        drawStartCellLayer(prevCell, currentCell);

        var endCell = dijkstraAlgo.getEndCell();
        drawEndCellLayer(endCell);

        setTimeout(() => {
            cb();
        }, 100)
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

    var drawStartCellLayer = (startCell, pathCell) => {
        var hexagon = document.querySelectorAll('.row')[pathCell.y].querySelectorAll('.cell')[pathCell.x];
        var img = document.createElement('img');
        img.style = `
            margin-top: -300px;
            margin-left: -100px;
        `;

        if(pathCell.y === startCell.y && pathCell.x === startCell.x) {
            // center view
            img.src = 'static/img/probe-center.png';
        } else if(pathCell.y === (startCell.y-1) && pathCell.x === (startCell.x-1)) {
            // top left view
            img.src = 'static/img/probe-top-left.png';
        } else if(pathCell.y === (startCell.y-1) && pathCell.x === startCell.x) {
            // top right view
            img.src = 'static/img/probe-top-right.png';
        } else if(pathCell.y === (startCell.y+1) && pathCell.x === (startCell.x-1)) {
            // bottom left view
            img.src = 'static/img/probe-bottom-left.png';
        } else if(pathCell.y === (startCell.y+1) && pathCell.x === startCell.x) {
            // bottom right view
            img.src = 'static/img/probe-bottom-right.png';
        } else if(pathCell.y === startCell.y && pathCell.x === (startCell.x-1)) {
            // left view
            img.src = 'static/img/probe-left.png';
        } else if(pathCell.y === startCell.y && pathCell.x === (startCell.x+1)) {
            // right view
            img.src = 'static/img/probe-right.png';
        }
        else if(pathCell.y === (startCell.y-1) && pathCell.x === (startCell.x+1)) {
            // bottom left view
            img.src = 'static/img/probe-bottom-left.png';
        }
        else if(pathCell.y === (startCell.y+1) && pathCell.x === (startCell.x+1)) {
            // bottom right view
            img.src = 'static/img/probe-bottom-right.png';
        }

        hexagon.querySelector('.hexagon-middle').appendChild(img);
    };
    var drawEndCellLayer = (endCell) => {
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
                cell = null;
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

        dijkstraAlgo.putStartCell(startY, startX);
        dijkstraAlgo.putEndCell(endY, endX);

        renderGrid();

        dijkstraAlgo.findPath(startY, startX, endY, endX, (path) => {
            drawStartCellLayer({y: startY, x: startX}, {y: startY, x: startX});

            selectedImageIndex = 0;
            drawEndCellLayer({y: endY, x: endX});
        });

    }
};