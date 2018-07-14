const States = {
  OFF: 0,
  ON: 1,
}

let timer = States.OFF;
let testSound = States.OFF;
let totalCountdown = 0;
let audio = new Audio("60832__pogotron__music-box.wav");


function changeDisplayTime() {
  let hours = Math.floor(totalCountdown / 3600);
  let minutes = Math.floor((totalCountdown - 3600 * hours) / 60);
  let seconds = Math.floor(totalCountdown - 3600 * hours - 60 * minutes);

  document.getElementById("timer").innerHTML = hours.toString(10).padStart(2, "0") + ":" 
                                             + minutes.toString(10).padStart(2, "0") + ":"
                                             + seconds.toString(10).padStart(2, "0");
}


let countdownInterval = setInterval(() => {
  if ((timer === States.ON) && (totalCountdown > 0)) {
    totalCountdown--;
    changeDisplayTime();

    // The first time it reaches 0, alarm sound starts
    if (totalCountdown === 0) {
      audio.load();
      audio.play();
    }
  }
}, 1000);


document.addEventListener("DOMContentLoaded", function() {

  // Modifying START/STOP button & reset timer when STOP
  let startButton = document.getElementById("timer-start");
  startButton.onclick = () => {
    if ((timer === States.OFF) && (totalCountdown > 0)) {
      timer = States.ON;
      startButton.innerHTML = "Stop";
    } else {
      timer = States.OFF;
      totalCountdown = 0;
      changeDisplayTime(); // Change display time back to 0
      startButton.innerHTML = "Start";
      audio.pause();
    }
  };

  // Modify SOUND TEST/STOP button when click on
  let soundButton = document.getElementById("sound-test");
  soundButton.onclick = () => {
    if (testSound === States.OFF) {
      testSound = States.ON;
      soundButton.innerHTML = "Stop";
      audio.load();
      audio.play();
    } else {
      testSound = States.OFF;
      soundButton.innerHTML = "Sound Test";
      audio.pause();
    }
  }

  // Modify time displayed when click on add time buttons
  let buttons = document.querySelectorAll(".button-add-time");
  for (let i = 0; i < buttons.length; i++) {
    buttons.item(i).onclick = () => {
      if (timer == States.OFF) {
        totalCountdown += parseInt(buttons.item(i).innerHTML) * 60;
        changeDisplayTime();
      }
    };
  }
});