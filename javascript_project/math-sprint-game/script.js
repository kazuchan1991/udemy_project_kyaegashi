// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');


// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0s';

// Scroll
let valueY = 0;


// reset event
const playAgain = () => {
  gamePage.addEventListener('click', startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  playerGuessArray = [];
  valueY = 0;
  playAgainBtn.hidden = true;
  document.querySelectorAll('.selected-item')[0].remove();
}

const showScorePage = () => {
  setTimeout(() => {playAgainBtn.hidden = false;}, 1000);
  scorePage.hidden = false;
  gamePage.hidden = true;
}

const scoresToDOM = () => {
  finalTimeDisplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);
  baseTimeEl.textContent = `Base Time: ${baseTime}s`;
  penaltyTimeEl.textContent = `Penalty: + ${penaltyTime}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;
  // scorll to top, go to score page
  itemContainer.scrollTo({ top: 0, behavior: 'instant' })
  showScorePage();
}

// stop timer, process results, go to score page
const checkTime = () => {
  console.log(timePlayed);
  if (playerGuessArray.length == questionAmount) {
    clearInterval(timer);
    playerGuessArray.forEach((guess, ind) => {
      if (guess !== equationsArray[ind].evaluated) {
        penaltyTime += 0.5;
      }
    });
    finalTime = timePlayed + penaltyTime;
    console.log(finalTime);
    scoresToDOM();
  }
}

// add a tenth of a second to timePlayed
const addTime = () => {
  timePlayed += 0.1;
  checkTime();
}

// start timer
const startTimer = () => {
  // reset times
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  gamePage.removeEventListener('click', startTimer);
  timer = setInterval(addTime, 100);
}

// scroll, store use selection
const select = (guessedTrue) => {
  console.log(playerGuessArray);
  // scroll 80 pix
  valueY += 80;
  itemContainer.scrollTo(0, valueY);
  // add player guess to array
  return (guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false'));
}


// display game page
const showGamePage = () => {
  gamePage.hidden = false;
  countdownPage.hidden = true;
}

// get random number
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  // shuffle the array
  shuffle(equationsArray);
  console.log('equations array:', equationsArray);
  //equationsToDOM();
}

// add equations to DOM
const equationsToDOM = () => {
  equationsArray.forEach((equation) => {
    // item
    const item = document.createElement('div');
    item.classList.add('item');
    // equation text
    const equationText = document.createElement('h1');
    equationText.textContent =equation.value;
    // append
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  })
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDOM();

  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}


// run countdown
const countdownStart = () => {
  let count = 3;
  countdown.textContent = count;
  //countdown.textContent = count;
  countdownActive = setInterval(() => {
    count -= 1;
    if (count === 0) {
      countdown.textContent = 'GO!';
      clearTimeout(countdownActive);
    } else {
      countdown.textContent = count;
    }
  }, 1000);
}

// splash to countdown page
const showCountdown = () => {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart();
  //createEquations();
  populateGamePage();
  setTimeout(showGamePage, 400);
}

// get the value from selected radio button
const getRadioValue = () => {
  let radioValue = 0;
  // radioInputs.forEach((radioInput) => {
  //   if (radioInput.checked) {
  //     radioValue = radioInput.value;
  //   }
  // });
  // return radioValue;
  for (let i = 0; i < radioInputs.length; i++) {
    if (radioInputs[i].checked) {
      radioValue = radioInputs[i].value;
      return radioValue;
    }
  }
}

// form that decides amount of questions
const selectQuestionAmount = (e) => {
  e.preventDefault();
  questionAmount = getRadioValue();
  console.log('questionAmount:', questionAmount);
  if (questionAmount) {
    showCountdown();
  }
}

// event listener
startForm.addEventListener('click', () => {
  radioContainers.forEach((radioEl) => {
    // remove selected label style
    radioEl.classList.remove('selected-label');
    // add it back if radio input is checked
    if (radioEl.children[1].checked) {
      radioEl.classList.add('selected-label');
    }
  });
});

startForm.addEventListener('submit', selectQuestionAmount);
gamePage.addEventListener('click', startTimer);
playAgainBtn.addEventListener('click', playAgain);