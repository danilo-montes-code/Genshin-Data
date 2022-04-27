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
        dateSpan.textContent = day
    }
    
    const [timeUntilD, timeUntilW] = getResets(date);
    daySpan.textContent  = timeUntilD;
    weekSpan.textContent = timeUntilW;
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

// gets the 
function getResets(currentDate) {
    let tomorrow = new Date(),
        nextWeek = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1),
    nextWeek.setDate()

    tomorrow = currentDate()

    return [tomorrow, nextWeek];
}