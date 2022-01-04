
describe('dijkstraAlgo', () => {

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

    it('it should go to goal', ()=> {
        var grid = [];
        for(var i = 0; i < gridRowsLength.length; i++) {
            var row = [];
            for(var j = 0; j < gridRowsLength[j].length; j++) {
                cell = null;
                row.push(cell);
            }
            grid.push(row);
        }
        var dijkstraAlgo = new DijkstraAlgo.js();
        dijkstraAlgo.setGrid(grid);

        var startY = 3;
        var startX = 2;
        var endY = 3;
        var endX = 4;

        dijkstraAlgo.findPath(startY, startX, endY, endX, (path) => {
            expect(path[0].y).toBe(3);
            expect(path[0].x).toBe(2);

            expect(path[1].y).toBe(3);
            expect(path[1].x).toBe(3);
            //
            expect(path[2].y).toBe(3);
            expect(path[2].x).toBe(4);
        });

    });

})