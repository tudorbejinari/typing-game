const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const words = [
  'volvo',
  'devolved',
  'moment',
  'evolvements',
  'wolves',
  'devolving',
  'devon',
  'vonian',
  'portable',
  'devonports',
  'computer',
  'deployment',
  'sores',
  'devot',
  'smart',
  'vote',
  'devotedly',
  'kindness',
  'devotednesses',
  'teen',
  'devotees',
  'devotement'
];
//Init word
let randomWord;
//Init score
let score = 0;
//Init time
let time = 10;

//set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//focus on text on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//update the score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

//Game over, show end scree
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
  endgameEl.style.display = 'flex';
}

addWordToDOM();
//Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //Clear input
    e.target.value = '';
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});
//Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Setting select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
