/**
 *   DijkstraAlgo-Spec.js
 *   github.com/dguard/snake-dijkstra
 *   Licensed under the MIT license.
 *
 *   Implementation By Alexander Serditov (keep@digitallyconstructed.ru)
 **/
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
    var grid = [];
    for(var i = 0; i < gridRowsLength.length; i++) {
        var row = [];
        for(var j = 0; j < gridRowsLength[j].length; j++) {
            cell = null;
            row.push(cell);
        }
        grid.push(row);
    }

    it('it should go to the goal', ()=> {
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

    it('it should go to the goal', (done) => {
        var dijkstraAlgo = new DijkstraAlgo.js();
        dijkstraAlgo.setGrid(grid);

        var startY = 10;
        var startX = 4;
        var endY = 12;
        var endX = 5;

        dijkstraAlgo.findPath(startY, startX, endY, endX, (path) => {
            done();
        });
    });

    it('it should go to the goal', (done) => {
        var dijkstraAlgo = new DijkstraAlgo.js();
        dijkstraAlgo.setGrid(grid);

        var startY = 6;
        var startX = 5;
        var endY = 11;
        var endX = 8;

        dijkstraAlgo.findPath(startY, startX, endY, endX, (path) => {
            done();
        });
    });

});