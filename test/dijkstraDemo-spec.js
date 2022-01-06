
describe('dijkstraAlgo', () => {


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
    beforeAll(() => {
        var container = document.createElement('div');
        container.classList.add('container');
        document.body.appendChild(container);

        container.outerHTML = `
            <div class="main-container">
            
                <img src="static/img/desert-bg.png" style="max-height: 100%;">
            
            <div style="display: table; width: 100%;position: absolute; left: 0; top: 0;">
            <div style="display: table-cell; width: 40%"></div>
            
            <div style="display: table-cell; position: relative;">
                <div style="opacity: inherit;">
            
                    <div class="board-container" style="
                transform: scale(0.4);
            "><div style="
            "><div class="board"></div></div></div>
                </div>
            
            </div>
            
            </div>
            
            </div>
        `;


        grid = [];
        for(var i = 0; i < gridRowsLength.length; i++) {
            var row = [];
            for(var j = 0; j < gridRowsLength[j].length; j++) {
                cell = null;
                row.push(cell);
            }
            grid.push(row);
        }

    });

    // right, bottom-left, bottom-right; left,right,bottom-left,bottom-right; left,bottom-left,bottom-right

    // right, bottom-left, bottom-right, top-right; left,right,bottom-left,bottom-right,top-left,top-right; left,bottom-left,bottom-right,top-left

    // right, bottom-right, top-right; left,right,bottom-left,bottom-right,top-left,top-right; left,bottom-left,top-left

    // mirror
    // right, bottom-right, top-left, top-right; left,right,bottom-left,bottom-right,top-left,top-right; left,bottom-left,top-left,top-right

    // right, top-left, top-right; left,right,bottom-left,bottom-right; left,top-left,top-right

    var cases = [
        [0, 0, "right", 0, 1, 'animate-translate-right'],
        [0, 0, "bottom-left", 1, 0, 'animate-translate-bottom-left'],
        [0, 0, "bottom-right", 1, 1, 'animate-translate-bottom-right'],

        [0, 1, "left", 0, 0, 'animate-translate-left'],
        [0, 1, "right", 0, 2, 'animate-translate-right'],
        [0, 1, "left", 1, 1, 'animate-translate-bottom-left'],
        [0, 1, "left", 1, 2, 'animate-translate-bottom-right'],

        [0, gridRowsLength[0]-1, 'left', 0, gridRowsLength[0]-1-1, 'animate-translate-left'],
        [0, gridRowsLength[0]-1, 'bottom-left', 1, gridRowsLength[0]-1, 'animate-translate-bottom-left'],
        [0, gridRowsLength[0]-1, 'bottom-right', 1, gridRowsLength[0]-1+1, 'animate-translate-bottom-right'],


        [1, 0, "right", 1, 1, 'animate-translate-right'],
        [1, 0, "bottom-left", 2, 0, 'animate-translate-bottom-left'],
        [1, 0, "bottom-right", 2, 1, 'animate-translate-bottom-right'],
        [1, 0, "top-right", 0, 0, 'animate-translate-top-right'],

    ];


    describe('animation 0,0:', () => {

        cases.map((caseArgs) => {
            it(`{y:${caseArgs[0]},x:${caseArgs[1]}} should translate to {y:${caseArgs[3]},x:${caseArgs[4]}} via translate-${caseArgs[2]}`, (done) => {
                var dijkstraAlgo = new DijkstraAlgo.js();
                dijkstraAlgo.setGrid(grid);

                var startY = caseArgs[0];
                var startX = caseArgs[1];
                var endY = caseArgs[3];
                var endX = caseArgs[4];

                var dijkstraDemo = new DijkstraDemo();
                dijkstraDemo._renderGrid();

                dijkstraAlgo.putStartCell(startY, startX);
                dijkstraAlgo.putEndCell(endY, endX);


                dijkstraDemo._setDijkstraAlgo(dijkstraAlgo);

                dijkstraAlgo.findPath(startY, startX, endY, endX, (path) => {
                    dijkstraDemo._drawStartCellLayer({y: startY, x: startX}, {y: startY, x: startX});

                    dijkstraDemo._drawEndCellLayer({y: endY, x: endX});

                    dijkstraDemo._doMove(path[0], path[1], () => {
                    });
                    setTimeout(() => {
                        expect(document.querySelector('.probe').classList.contains(caseArgs[5])).toBe(true);
                        done();
                    }, 10);
                });
            });
        });
    })

});