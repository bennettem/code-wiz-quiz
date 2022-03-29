// timer and score vars
var timer = 5;
var score = 0;

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
var quizAnswersEl = document.getElementById("quiz-answers");
var submitBtn = document.getElementById("submit-btn");
var quizEndEl = document.getElementById("quiz-end");

// function to start timer/quiz

function countDown() {
  var countDownTimer = setInterval(function () {
    countDownEl.textContent = timer;
    timer--;
    if (timer === 0) {
      clearInterval(countDownTimer);
    }
  }, 1000);
  startPEl.classList.add("hidden");
}

function quizContent() {
  var quizQuestions = questions[currentQuestionIndex].question;
  quizQuestionEl.textContent = quizQuestions;
  var quizChoices = questions[currentQuestionIndex].choices;
  for (var i = 0; i < quizChoices.length; i++) {
    var quizChoice = quizChoices[i];
    var listItemEl = document.createElement("li");
    listItemEl.className = "list-choices";
    var selectButton = document.createElement("button");
    selectButton.className = "button-choice";
    selectButton.textContent = quizChoice;
    selectButton.setAttribute("selectedIndex", i);
    selectButton.addEventListener("click", choiceClicked);
    listItemEl.appendChild(selectButton);
    quizAnswersEl.appendChild(listItemEl);
  }
}

function choiceClicked() {
  var buttonEl = event.target;
  if (buttonEl) {
    var buttonChoice = parseInt(buttonEl.getAttribute("selectedIndex"));
    var answerChoice = questions[currentQuestionIndex].answer;
    if (buttonChosen === answerChoice) {
      score++;
      ++currentQuestionIndex;
      clearAnswers();
      quizContent();
    } else {
    }
  }
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
  }
}

startBtn.addEventListener("click", countDown);
