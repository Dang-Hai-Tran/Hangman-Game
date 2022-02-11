const myArr = ["hello", "house", "game over"];
//for upper case use the toUpperCase() function
const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
const startButton = document.querySelector("button");
const letter = document.querySelector(".letters");
const puzzle = document.querySelector(".puzzle");
const score = document.querySelector(".score");
startButton.onclick = startGame;
function startGame() {
  startButton.style.display = "none";
  const word = myArr.shift().toUpperCase().split("");
  let countScore = 0;
  let totalScore = word.filter((item) => item !== " ").length;
  clearGame();
  builder(word, countScore, totalScore);
  playGame(countScore, totalScore);
}
function builder(word, countScore, totalScore) {
  alphabetArray.forEach((item) => {
    const boxChar = document.createElement("button");
    boxChar.setAttribute("class", "boxE alphabet");
    boxChar.innerText = item.toUpperCase();
    letter.append(boxChar);
  });
  word.forEach((item) => {
    const boxChar = document.createElement("button");
    boxChar.setAttribute("class", "boxE guessChar");
    boxChar.setAttribute("name", `${item}`);
    if (item !== " ") {
      boxChar.innerText = "-";
    } else {
      boxChar.innerText = "";
    }
    puzzle.append(boxChar);
  });
  score.innerText = `Your score is ${countScore}/${totalScore}`;
}
function clearGame() {
  letter.innerHTML = "";
  puzzle.innerHTML = "";
  score.innerHTML = "";
}
function playGame(countScore, totalScore) {
  const listAlphabetHTML = document.querySelectorAll(".alphabet");
  const listGuessChar = document.querySelectorAll(".guessChar");
  listAlphabetHTML.forEach((item) => {
    item.onclick = check;
    function check() {
      for (let char of listGuessChar) {
        if (char.name === item.innerText) {
          char.innerText = char.name;
          countScore += 1;
        }
      }
      score.innerText = `Your score is ${countScore}/${totalScore}`;
      item.disabled = true;
      if (countScore === totalScore) {
        clearGame();
        if (myArr.length !== 0) {
          startButton.style.display = "inline-block";
        } else {
          alert("Game finished!");
        }
      }
    }
  });
}
