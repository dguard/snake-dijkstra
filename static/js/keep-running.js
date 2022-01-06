/**
 *   Keep-Running.js
 *   github.com/dguard/snake-dijkstra
 *   Licensed under the MIT license.
 *
 *   Implementation By Alexander Serditov (keep@digitallyconstructed.ru)
 **/
var dijkstraDemo = new DijkstraDemo();
dijkstraDemo.init();

function keepRunning() {
    dijkstraDemo.doTurn(() => {
        setTimeout(() => {
            keepRunning();
        }, 0)
    });
}
keepRunning();


