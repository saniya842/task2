let hours = 0;
let minutes = 0;
let seconds = 0;
let laps = [];

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapsList = document.querySelector('.laps');

let intervalId;

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

function startStopwatch() {
  intervalId = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    displayTime();
  }, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pauseStopwatch() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetStopwatch() {
  clearInterval(intervalId);
  hours = 0;
  minutes = 0;
  seconds = 0;
  laps = [];
  displayTime();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapsList.innerHTML = '';
}

function displayTime() {
  display.innerHTML = `
    <span class="hours">${padZero(hours)}</span>:
    <span class="minutes">${padZero(minutes)}</span>:
    <span class="seconds">${padZero(seconds)}</span>
  `;
}

function padZero(time) {
  return time.toString().padStart(2, '0');
}



// Add lap functionality
const lapBtn = document.createElement('button');
lapBtn.textContent = 'Lap';
lapBtn.disabled = true;
document.querySelector('.stopwatch').appendChild(lapBtn);

lapBtn.addEventListener('click', () => {
  const lapTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  laps.push(lapTime);
  const lapListItem = document.createElement('li');
  lapListItem.textContent = `Lap ${laps.length}: ${lapTime}`;
  lapsList.appendChild(lapListItem);
});

startBtn.addEventListener('click', () => {
  lapBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
  lapBtn.disabled = true;
  lapsList.innerHTML = '';
  laps = [];
});
