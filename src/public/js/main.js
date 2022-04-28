document.addEventListener("DOMContentLoaded", main);

// update daily and weekly reset times
function main () {
    const dateSpan  = document.querySelector('#currentDay'),
          daySpan   = document.querySelector('#resetDay'),
          weekSpan  = document.querySelector('#resetWeek'),
          date      = new Date(),
          day       = dayOfWeek(date.getDay());


    // change content to new day if it ever crosses into next day
    if (dateSpan.textContent !== day) {
        dateSpan.textContent = day;
    }
    
    // lower the time until
    const [timeUntilD, timeUntilW] = getResets(date);
    daySpan.textContent  = timeUntilD.dhours + 'h ' + 
                           timeUntilD.dminutes + 'm ' + 
                           timeUntilD.dseconds + 's';
    weekSpan.textContent = timeUntilW.wdays + 'd ' + 
                           timeUntilW.whours + 'h ' +
                           timeUntilW.wminutes + 'm'
                           timeUntilW.wseconds + 's';
}

function dayOfWeek(day) {
    return day === 0 ? 'Sunday' :
           day === 1 ? 'Monday' :
           day === 2 ? 'Tuesday' :
           day === 3 ? 'Wednesday' :
           day === 4 ? 'Thursday' :
           day === 5 ? 'Friday' :
                       'Saturday';
}