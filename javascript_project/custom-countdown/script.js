const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let now = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input min
const today = new Date().toISOString().split('T')[0];
console.log(today);
//dateEl.setAttribute('value', today);
dateEl.setAttribute('min', today);


const updateDOM = () => {
    countdownActive = setInterval( () => {
        now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // hide input
        inputContainer.hidden = true;

        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // show the countdown in progress
            // populate countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            // show countdown
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}

const updateCountdown = (e) => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    // save to local
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.')
    } else {
        // get number version of current date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// reset all values
const reset = () => {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    // reset values
    countdownTitile = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

const restorePreviousCountdown = () => {
    // get countdown from localstorage
    if (localStorage.getItem('countdown')) {
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}


// event listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// on load, check the local storage
//window.addEventListener('load', restorePreviousCountdown);
restorePreviousCountdown()


/*
const getDate = () => {
    let today = new Date();
    today.setDate(today.getDate());
    const yyyy = today.getFullYear();
    const mm = ("0"+(today.getMonth()+1)).slice(-2);
    const dd = ("0"+today.getDate()).slice(-2);
    console.log(yyyy+'-'+mm+'-'+dd);
    dateEl.value=yyyy+'-'+mm+'-'+dd;
    dateEl.min=yyyy+'-'+mm+'-'+dd;
}
*/

//getDate();