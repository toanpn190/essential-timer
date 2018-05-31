const TimerStates = {
  OFF: 0,
  ON: 1,
}

let timer = TimerStates.OFF;
let totalCountdown = 0;
let audio = new Audio("60832__pogotron__music-box.wav");

let countdownInterval = setInterval(() => {
  let hours = Math.floor(totalCountdown / 3600);
  let minutes = Math.floor((totalCountdown - 3600 * hours) / 60);
  let seconds = Math.floor(totalCountdown - 3600 * hours - 60 * minutes);

  document.getElementById("timer").innerHTML = hours.toString(10).padStart(2, "0") + ":" 
                                             + minutes.toString(10).padStart(2, "0") + ":"
                                             + seconds.toString(10).padStart(2, "0");

  if ((timer === TimerStates.ON) && (totalCountdown > 0)) {
    totalCountdown--;
    
    // The first time it reaches 0, alarm sound starts
    if (totalCountdown === 0) {
      audio.play();
    }
  }
}, 1000);


document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.getElementById("timer-start");

  startButton.onclick = () => {
    if (timer === TimerStates.OFF) {
      timer = TimerStates.ON;
      startButton.innerHTML = "Stop";
      
    } else {
      timer = TimerStates.OFF;
      totalCountdown = 0;
      startButton.innerHTML = "Start";
      audio.load();
    }
  };

  let buttons = document.querySelectorAll(".button-add-time");
  for (let i = 0; i < buttons.length; i++) {
    buttons.item(i).onclick = () => {
      totalCountdown += parseInt(buttons.item(i).innerHTML) * 60;
    };
  }
});