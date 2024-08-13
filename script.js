let random_num = Math.floor(Math.random() * 100 + 1);
let submit_button = document.getElementById("submit");
let the_input = document.getElementById("the_number");
let guessslot = document.querySelector(".guesses");
let remaining = document.querySelector(".lastresult");
let startover = document.querySelector("#result");
let loworhi = document.querySelector(".loworhi");
const p = document.createElement("p");

let lastguesses = [];
let numguesses = 1;
let play = true;

if (play) {
  submit_button.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(the_input.value);
    validateguess(guess);
  });
}

function validateguess(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    the_input.classList.add("shake");
    setTimeout(() => the_input.classList.remove("shake"), 500);
    return;
  }
  lastguesses.push(guess);
  if (numguesses == 10) {
    displayguesses(guess);
    displaymessage(`Game Over! The Number Was ${random_num}`);
    endgame();
  } else {
    displayguesses(guess);
    checkguess(guess);
  }
}

function checkguess(guess) {
  if (guess == random_num) {
    displaymessage(`You Found it!`);
    endgame();
  } else if (guess < random_num) {
    displaymessage(`Low! Try Again!`);
  } else if (guess > random_num) {
    displaymessage(`High! Try Again!`);
  }
}

function displayguesses(guess) {
  the_input.value = "";
  guessslot.innerHTML += `${guess} `;
  if (numguesses < 11) {
    numguesses++;
    remaining.innerHTML = `${11 - numguesses}`;
  }
  the_input.focus();
}

function displaymessage(message) {
  loworhi.innerHTML = `<h2>${message}</h2>`;
}

function endgame() {
  the_input.value = "";
  the_input.setAttribute("disabled", "");
  submit_button.setAttribute("disabled", "");
  submit_button.style.left = "70px";
  p.classList.add("button");
  p.innerHTML = `<button id="newgame">Start New Game!</button>`;
  startover.appendChild(p);
  const newgamebutton = document.querySelector("#newgame");
  newgamebutton.style.display = "block";
  setTimeout(() => {
    newgamebutton.style.opacity = 1;
  }, 10);
  play = false;
  newgame();
}

function newgame() {
  const newgamebutton = document.querySelector("#newgame");

  newgamebutton.addEventListener("click", function () {
    random_num = Math.floor(Math.random() * 100 + 1);
    lastguesses = [];
    numguesses = 1;
    guessslot.innerHTML = "";
    loworhi.innerHTML = "";
    remaining.innerHTML = `${11 - numguesses}`;
    the_input.removeAttribute("disabled");
    submit_button.removeAttribute("disabled");
    submit_button.style.left = "130px";
    startover.removeChild(p);
    play = true;
  });
}

//___________________________________________________________________________
//___________________________________________________________________________

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("the_number");
  const warningLow = document.getElementById("warning_low");
  const warningHigh = document.getElementById("warning_high");

  function formatValue(value) {
    let number = parseInt(value, 10);
    if (isNaN(number) || number < 1) number = 1;
    if (number > 100) number = 100;
    return number;
  }

  function showWarning(messageElement) {
    warningLow.style.display = "none";
    warningHigh.style.display = "none";
    messageElement.style.display = "block";
    inputField.classList.add("shake");
    setTimeout(() => {
      inputField.classList.remove("shake");
      messageElement.style.display = "none";
    }, 2000);
  }

  inputField.addEventListener("input", () => {
    let value = inputField.value.replace(/\D/g, "");
    if (parseInt(value) > 100) {
      showWarning(warningHigh);
      value = "100";
    } else if (parseInt(value) < 1) {
      showWarning(warningLow);
      value = "1";
    }
    inputField.value = value;
  });

  inputField.addEventListener("blur", () => {
    if (inputField.value.trim() === "") {
      inputField.value = "1";
    } else {
      inputField.value = formatValue(inputField.value);
    }
  });

  inputField.value = formatValue(inputField.value);
});
