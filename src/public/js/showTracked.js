document.addEventListener("DOMContentLoaded", main);

// make the already tracked characters already selected
function main () {
    let trackedCharacters = document.querySelector('#trackedCharacters'),
        trackedWeapons    = document.querySelector('#trackedWeapons'),
        allCharacters     = document.querySelectorAll('input[name=character]'),
        allWeapons        = document.querySelectorAll('input[name=weapon]');

    trackedCharacters = trackedCharacters.value.split(',');
    trackedWeapons = trackedWeapons.value.split(',');
    
    Array.prototype.forEach.call(allCharacters, (ele) => {
        if (trackedCharacters.includes(ele.value)) {
            
            ele.setAttribute('checked', 'checked');
        }
    });

    Array.prototype.forEach.call(allWeapons, (ele) => {
        if (trackedWeapons.includes(ele.value)) {
            ele.setAttribute('checked', 'checked');
        }
    });
}