document.addEventListener("DOMContentLoaded", main);

// update daily and weekly reset times
function main () {
    const day = {
            hours   : document.querySelector('#dhours'),
            minutes : document.querySelector('#dminutes'),
            seconds : document.querySelector('#dseconds')
          },
          week = {
            days    : document.querySelector('#wdays'),
            hours   : document.querySelector('#whours'),
            minutes : document.querySelector('#wminutes'),
            seconds : document.querySelector('#wseconds')
          };
          
    setInterval(checkSeconds, 1000, day, false);
    setInterval(checkSeconds, 1000, week, false);
}

function checkSeconds(dW, week) {
    const sec = dW.seconds;
    if (sec.textContent === '0') {
        sec.textContent = '59';
        checkMinutes(dW, week);
    }
    else {
        sec.textContent  -= 1;
    }
}

function checkMinutes(dW, week) {
    const min = dW.minutes;
    if (min.textContent === '0') {
        min.textContent = '59';
        checkHours(dW, week);
    }
    else {
        min.textContent--;
    }
}

function checkHours(dW, week) {
    const hours = dW.hours;
    if (hours.textContent === '0') {
        hours.textContent = '23';
        if (week) {
            checkDays(dW, week);
        }
    }
    else {
        hours.textContent--;
    }
}

function checkDays(dW, week) {
    const days = dW.seconds;
    if (days.textContent === '0') {
        days.textContent = '6';
    }
    else {
        days.textContent--;
    }
}