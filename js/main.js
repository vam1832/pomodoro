let playButton = document.getElementById("play_button_container")
let resetButton = document.getElementById("reset_button_container")
let play = document.getElementById("play_button")
let minutes = document.getElementById("minutes")
let seconds = document.getElementById("seconds")
let pomodoro = false
let shortbreak = false
let silence = false

let audio = new Audio("audio/pomodoro.mp3")

function changeButton() {
  if (play.textContent === "play_arrow") {
    play.textContent = "pause"
    pomodoro = true
    audio.play()
    if (silence) {
      audio.pause()
      audio.currentTime = 0
    }
  }
  else {
    play.textContent = "play_arrow"
    pomodoro = false
    shortbreak = false
    audio.pause()
  }
}

function resetTimeByUser() {
  resetTime(true)
}

function resetTime(byUser) {
  if (pomodoro && !byUser) {
    minutes.textContent = "25"
    seconds.textContent = "00"
    document.body.style.backgroundColor = "#FF6961"
    audio.play()
  } else if (shortbreak && !byUser){
    minutes.textContent = "05"
    seconds.textContent = "01"
    document.body.style.backgroundColor = "#5495E1"
    audio.pause()
    audio.currentTime = 0;
  } else if (byUser){
    pomodoro = false
    shortbreak = false
    play.textContent = "play_arrow"
    minutes.textContent = "25"
    seconds.textContent = "00"
    document.body.style.backgroundColor = "#FF6961"
    audio.pause()
    audio.currentTime = 0;
  }
}

let interval = setInterval(timer, 1000)

function timer() {
  if (seconds.textContent >= 0 && pomodoro) {
    let newSec = seconds.textContent - 1
    if (newSec < 0 && minutes.textContent > 0) {
      let newMin = minutes.textContent - 1
      minutes.textContent = newMin.toString().padStart(2, "0")
      seconds.textContent = 59
    }
    else if (newSec === -1 && minutes.textContent <= 0 ) {
      seconds.textContent = "00"
      // changeButton()
      shortbreak = true
      silence = true
      pomodoro = false
      resetTime(false)
    }
    else {
      seconds.textContent = newSec.toString().padStart(2, "0")
    }
  } else {
    if (pomodoro) {
      changeButton()
    }
  }
  if (seconds.textContent >= 0 && shortbreak) {
    let newSec = seconds.textContent - 1
    if (newSec < 0 && minutes.textContent > 0) {
      let newMin = minutes.textContent - 1
      minutes.textContent = newMin.toString().padStart(2, "0")
      seconds.textContent = 59
    }
    else if (newSec === -1 && minutes.textContent <= 0 ) {
      seconds.textContent = "00"
      shortbreak = false
      pomodoro = true
      silence = false
      resetTime(false)
    }
    else {
      seconds.textContent = newSec.toString().padStart(2, "0")
    }
  } else {
    if (shortbreak) {
      changeButton()
    }
  }
}

playButton.addEventListener("click", changeButton);
resetButton.addEventListener("click", resetTimeByUser);