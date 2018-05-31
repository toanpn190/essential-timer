const TimerStates = {
  OFF: 0,
  ON: 1,
}

let timer = TimerStates.OFF;
let totalCountdown = 0;

let countdownInterval = setInterval(() => {
  let hours = Math.floor(totalCountdown / 3600);
  let minutes = Math.floor((totalCountdown - 3600 * hours) / 60);
  let seconds = Math.floor(totalCountdown - 3600 * hours - 60 * minutes);

  document.getElementById("timer").innerHTML = hours.toString(10).padStart(2, "0") + ":" 
                                             + minutes.toString(10).padStart(2, "0") + ":"
                                             + seconds.toString(10).padStart(2, "0");

  if ((timer === TimerStates.ON) && (totalCountdown > 0)) {
    totalCountdown--;
  }
}, 1000);


document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.getElementById("timer-start");
  startButton.onclick = () => {
    timer = (timer === TimerStates.ON) ? TimerStates.OFF : TimerStates.ON;
  }

  let buttons = document.querySelectorAll(".button-add-time");
  for (let i = 0; i < buttons.length; i++) {
    buttons.item(i).onclick = () => {
      totalCountdown += parseInt(buttons.item(i).innerHTML) * 60;
    };
  }
});