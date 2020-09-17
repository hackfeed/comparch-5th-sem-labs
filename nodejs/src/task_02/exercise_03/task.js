var n = 0;
var timerExecution = 2000;
var timer = function () {
    n++;
    console.log(n);
    if (n === 10) {
        timerExecution = 1000;
    }
    if (n === 20) {
        timerExecution = 2000;
        n = 0;
    }
    setTimeout(timer, timerExecution);
};
timer();
