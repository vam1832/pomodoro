let playButton = document.getElementById("play_button_container")
let resetButton = document.getElementById("reset_button_container")
let play = document.getElementById("play_button")
let minutes = document.getElementById("minutes")
let seconds = document.getElementById("seconds")
let running = false


function changeButton() {
  if (play.textContent === "play_arrow") {
    play.textContent = "pause"
    running = true
  }
  else {
    play.textContent = "play_arrow"
    running = false
    resetTime()
  }
}

function resetTime() {
  minutes.textContent = "25"
  seconds.textContent = "00"
  running = false
  play.textContent = "play_arrow"
}

let interval = setInterval(timer, 1000)

function timer() {
  if (seconds.textContent >= 0 && running) {
    let newSec = seconds.textContent - 1
    if (newSec < 0 && minutes.textContent > 0) {
      let newMin = minutes.textContent - 1
      minutes.textContent = newMin.toString().padStart(2, "0")
      seconds.textContent = 59
    }
    else if (newSec === -1 && minutes.textContent <= 0 ) {
      seconds.textContent = "00"
      changeButton()
    }
    else {
      seconds.textContent = newSec.toString().padStart(2, "0")
    }
  } else {
    if (running) {changeButton()}
  }
}

playButton.addEventListener("click", changeButton);
resetButton.addEventListener("click", resetTime);