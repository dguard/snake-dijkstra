
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


