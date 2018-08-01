const timer = document.getElementById('mainTimer');
const start = document.getElementById('play');
const reset = document.getElementById('refresh');
const pause = document.getElementById('pause');
const stop = document.getElementById('stop');
const sessionDown = document.getElementById('sessionDown');
const sessionUp = document.getElementById('sessionUp');
const breakDown = document.getElementById('breakDown');
const breakUp = document.getElementById('breakUp');
const audio = new Audio('sounds/ding.wav');
const sessionDisplay = document.getElementById('sessionTimer');
const breakDisplay = document.getElementById('breakTimer');
const textBox = document.getElementById('textBox');
textBox.textContent = "Press Start To Begin Session";

// initialize timers
let sessionTimer = 25;
let breakTimer = 5;
let mainTimer = sessionTimer;

// initialize displays to show times
sessionDisplay.textContent = sessionTimer;
breakDisplay.textContent = breakTimer;
timer.textContent = mainTimer + ':00';

let sessionTime = sessionTimer * 60;
let breakTime = breakTimer * 60;
let timeInterval = 1;
let cancelled = true;
let onBreak = false;
let timeRemaining = sessionTime;

// event listeners for when the user clicks
start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer);
sessionDown.addEventListener('click', decreaseSession);
sessionUp.addEventListener('click', increaseSession);
breakDown.addEventListener('click', decreaseBreak);
breakUp.addEventListener('click', increaseBreak);

function displayTime(timeRemaining) {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = Math.floor(timeRemaining % 60);
  
  if (minutes < 10) {
    minutes = 0 + String(minutes);
  }
  if (seconds < 10) {
    seconds = 0 + String(seconds);
  }
  
  return `${minutes}:${seconds}`;
}

// convert "MM:SS" (string) into seconds (integer)
function timeConvert(str) {
  var p = str.split(':');
      s = 0, m = 1;
  
  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }
  
  return s;
}

function startTimer() {
  if (onBreak === false) {
    textBox.textContent = "Get To Work";
    textBox.style.color = "rgb(210, 50, 0)";
  }
  if (onBreak === true) {
    textBox.textContent = "Take A Break";
  }
  if (cancelled === true) {
    cancelled = false;
    timeRemaining = timeConvert(timer.textContent);
    decreaseTimer();
  }
}

// countdown
function decreaseTimer() {
  const decreaser = setInterval(function() {
    if (cancelled === false) {
      timeRemaining -= 1;
      timer.textContent = displayTime(timeRemaining);
    
      if (timeRemaining === 0) {
        audio.play();
        if (onBreak === false){
          takeBreak();
        } else {
          startSession();
        }
      }
    } else {
      clearInterval(decreaser);
      return;
    }
  }, 1000);
}

function stopTimer() {
  cancelled = true;
  textBox.textContent = "Press Start To Resume";
  if (onBreak === false) {
    timeRemaining = sessionTimer * 60;
    sessionTime = timeRemaining;
  }
  if (onBreak === true) {
    timeRemaining = breakTimer * 60;
    breakTime = timeRemaining;
  }
  
  timer.textContent = displayTime(timeRemaining);
}

function pauseTimer() {
  cancelled = true;
  textBox.textContent = "Press Start To Resume";
}

// reset everything back to original settings
function resetTimer() {
  cancelled = true;
  timeRemaining = sessionTime;
  sessionDisplay.textContent = "25";
  sessionTimer = parseInt(sessionDisplay.textContent);
  sessionTime = sessionTimer * 60;
  timer.textContent = sessionTimer + ':00';
  sessionDisplay.textContent = sessionTimer;
  breakDisplay.textContent = "5";
  breakTimer = parseInt(breakDisplay.textContent);
  breakTime = breakTimer * 60
  textBox.textContent = "Press Start To Begin Session";
  textBox.style.color = "white";
}

function decreaseSession() {
  cancelled = true;
  if (sessionTimer > 1) {
    sessionTimer -= 1;
    sessionTime -= 60;
    sessionDisplay.textContent = sessionTimer;
    timer.textContent = sessionDisplay.textContent + ':00';
  }
  // consonle.log(sessionTimer);
  // consonle.log(sessionTime);
}

function increaseSession() {
  cancelled = true;
  sessionTimer += 1;
  sessionTime += 60;
  sessionDisplay.textContent = sessionTimer;
  timer.textContent = sessionDisplay.textContent + ':00';
  // consonle.log(sessionTimer);
  // consonle.log(sessionTime);
}

function decreaseBreak() {
  cancelled = true;
  if (breakTimer > 1) {
    breakTimer -= 1;
    breakTime -= 60;
    breakDisplay.textContent = breakTimer;
  }
  // consonle.log(breakTimer);
  // consonle.log(breakTime);
}

function increaseBreak() {
  cancelled = true;
  breakTimer += 1;
  breakTime += 60;
  breakDisplay.textContent = breakTimer;
  // consonle.log(breakTimer);
  // consonle.log(breakTime);
}

function takeBreak() {
  onBreak = true;
  timeRemaining = breakTime + 1;
  textBox.textContent = "Take A Break";
  textBox.style.color = "green";
}

function startSession() {
  onBreak = false;
  timeRemaining = sessionTime + 1;
}