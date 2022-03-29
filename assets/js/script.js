// timer and score var
var score = 0;
var savedScores = [];
var countDownTimer;

// question arrays
var questions = [
  {
    question: "What does CSS stand for?",
    choices: [
      "a. Computer Styling Sheets",
      "b. Creative Sheet Styling",
      "c. Cascading Style Sheets",
      "d. Cascading Sheet Stylings",
    ],
    answer: 2,
  },
  {
    question: "Arrays in JavaScript can be used to store what?",
    choices: [
      "a. Numbers in strings",
      "b. Booleans",
      "c. Other Arrays",
      "d. All of the above",
    ],
    answer: 3,
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "a. Hyper Text Markup Language",
      "b. Home Tool Markup Language",
      "c. HyperLink Markup Language",
      "d. Hocus Magic Language",
    ],
    answer: 0,
  },
  {
    question: "How do you create a function in Javascript?",
    choices: [
      "a. function = myfunction()",
      "b. function myfunction()",
      "c. myFunction = function()",
      "d. function myfunction{}",
    ],
    answer: 1,
  },
  {
    question: "How would you set a link to open to a new browser window?",
    choices: [
      "a. <a href'url' target='new'>",
      "b. <a href='url' target='_blank'>",
      "c. <a href='url' new>",
      "d. <a href='url' target='new.window'>",
    ],
    answer: 1,
  },
  {
    question: "What are string values enclosed with?",
    choices: ["a. Commas", "b. Curly brackets", "c. Quotes", "d. Parentheses"],
    answer: 2,
  },
];

var currentQuestionIndex = 0;
var startBtn = document.querySelector("#start-btn");
var startPEl = document.getElementById("start-p");
var countDownEl = document.querySelector("#timer");
var quizEl = document.getElementById("quiz");
var quizQuestionEl = document.getElementById("quiz-question");
var quizAnswersEl = document.getElementById("quiz-answer");
var submitBtn = document.getElementById("submit-btn");
var quizEndEl = document.getElementById("quiz-end");
var backBtn = document.querySelector("#back");
var clearResultbtn = document.querySelector("#clear-reset");
var scoreName = "endscore";
// function to start timer/quiz

function countDown() {
  var viewHighScoreEl = document.querySelector("#view-champions");
  viewHighScoreEl.textContent = retreiveHighScore();
  timer = questions.length * 15;
  countDownTimer = setInterval(function () {
    countDownEl.textContent = timer;
    timer--;
    if (timer === 0) {
      roundOver();
    }
  }, 1000);
  startPEl.classList.add("hidden");
  quizContent();
}

function retreiveHighScore() {
  var lastHighScore = localStorage.getItem(scoreName);
  var lastHighScoreArray = JSON.parse(lastHighScore);
  if (lastHighScoreArray) {
    return (retreivedHighScore = lastHighScoreArray[0].newScore);
  } else return 0;
}

function quizContent() {
  quizQuestionEl.classList.remove("hidden");
  var quizQuestion = questions[currentQuestionIndex].question;
  quizQuestionEl.textContent = quizQuestion;
  var quizChoices = questions[currentQuestionIndex].choices;
  for (var i = 0; i < quizChoices.length; i++) {
    var quizChoice = quizChoices[i];
    var listItemEl = document.createElement("li");
    listItemEl.className = "list-choice";
    var selectButton = document.createElement("button");
    selectButton.className = "button-choice";
    selectButton.textContent = quizChoice;
    selectButton.setAttribute("selectedIndex", i);
    selectButton.addEventListener("click", choiceClicked);
    listItemEl.appendChild(selectButton);
    quizAnswersEl.appendChild(listItemEl);
  }
}

function choiceClicked(event) {
  var buttonEl = event.target;
  if (buttonEl) {
    var buttonChoice = parseInt(buttonEl.getAttribute("selectedIndex"));
    var buttonChosen = parseInt(buttonEl.getAttribute("selectedIndex"));
    var answerChoice = questions[currentQuestionIndex].answer;
    if (buttonChosen === answerChoice) {
      feedbackEl.textContent = "Right 😎";
      score++;
    } else if (buttonChosen != answerChoice) {
      feedbackEl.textContent = "Wrong 👎";
      timer -= 10;
      if (timer <= 0) {
        roundOver();
      }
      countDownEl.textContent = timer;
    }
    if (timer > 0) {
      feedbackEl.removeAttribute("class", "hidden");
      feedbackEl.setAttribute("class", "feed");
      setTimeout(feedBackTimeout, 500);
    }
  }
}

var feedbackEl = document.getElementById("question-feed");

function feedBackTimeout() {
  feedbackEl.setAttribute("class", "hidden");
  getNextQuestion();
}

function getNextQuestion() {
  if (timer <= 0) {
    roundOver();
    return;
  } else {
    ++currentQuestionIndex;
  }
  if (currentQuestionIndex >= questions.length) {
    roundOver();
  } else {
    clearAnswers();
    quizContent();
  }
}

function roundOver() {
  timer = 0;
  countDownEl.textContent = "Times up!";
  clearInterval(countDownTimer);
  clearAnswers();
  endQuiz();
}

function clearAnswers() {
  var count = quizAnswersEl.childElementCount;
  for (var i = 0; i < count; i++) {
    quizAnswersEl.removeChild(quizAnswersEl.childNodes[0]);
  }
}

function endQuiz() {
  quizQuestionEl.classList.add("hidden");
  quizEndEl.classList.remove("hidden");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = score;
}
function getInitials() {
  var initialsEl = document.getElementById("initals");
  if (!initialsEl || initialsEl.value === "") {
    alert("Please enter initials");
  } else {
    var lastHighScore = localStorage.getItem(scoreName);
    var lastHighScoreArray = JSON.parse(lastHighScore);
    if (!lastHighScoreArray || score > lastHighScoreArray[0].newScore) {
      var scoreData = {
        name: initialsEl.value,
        newScore: score,
      };
      if (!lastHighScoreArray) lastHighScoreArray = [];
      lastHighScoreArray.push(scoreData);
      lastHighScoreArray.sort(function (a, b) {
        return -(a.newScore - b.newScore);
      });
      localStorage.setItem(scoreName, JSON.stringify(lastHighScoreArray));
    }
  }
  showResults();
}

var highresultEl = document.getElementById("show-result");

function showResults() {
  quizEndEl.classList.add("hidden");
  var showHighResultEl = document.querySelector("#show-high-result");
  var lastHighScore = localStorage.getItem(scoreName);
  lastHighScoreArray = JSON.parse(lastHighScore);
  if (lastHighScoreArray) {
    showHighResultEl.value =
      "1. " + lastHighScoreArray[0].name + ":" + lastHighScoreArray[0].newScore;
  }
}

function clearLocalStorage() {
  document.querySelector("#show-high-result").value = "";
  document.querySelector("#view-champions").textContent = 0;
  localStorage.clear(lastHighScoreArray);
}

function startGameOver() {
  highresultEl.classList.add("hidden");
  startPEl.classList.remove("hidden");
  initialsEl.value = "";
  currentQuestionIndex = 0;
  score = 0;
}

startBtn.addEventListener("click", countDown);
backBtn.addEventListener("click", startGameOver);
clearResultbtn.addEventListener("click", clearLocalStorage);
