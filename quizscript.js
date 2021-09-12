var questions = [
  {
    ques: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    ques: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    ques: "Arrays in Javascript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    ques: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
  {
    ques: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log",
  },
];
//declared variables for quiz
var questionIndex = 0;
var score = 0;
var ulCreate = document.createElement("ul");
var startTimer = document.querySelector("#start");
var questions = document.querySelector("#quesContainer");
var wrapper = document.querySelector("#wrapper");
var timer = document.querySelector("#timer-clock");
//declared variables for timer
var secondsLeft = 75;
var holdTimer = 0;
var penalty = 10;
//Timer starts on the click of start button
startTimer.addEventListener("click", function () {
  if (holdTimer === 0) {
    // setting interval of 1s and then reducing timer by 1s
    holdTimer = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Time: " + secondsLeft + "seconds left";

      if (secondsLeft <= 0) {
        clearInterval(holdTimer);
        done();
        timer.textContent = "Time's Up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

function render(questionIndex) {
  quesContainer.innerHTML = "";
  ulCreate.innerHTML = "";
  for (var i = 0; i <= questions.length; i++) {
    var userQuestion = questions[questionIndex].ques;
    var UserChoice = questions[questionIndex].choices;
    quesContainer.textContent = userQuestion;
  }
  //appending choices in a list
  UserChoice.forEach(function (newChoice) {
    var listChoice = document.createElement("li");
    listChoice.textContent = newChoice;
    quesContainer.appendChild(ulCreate);
    ulCreate.appendChild(listChoice);
    listChoice.addEventListener("click", compare);
  });

  // comapring the userchoice to correct answer
  function compare(event) {}
}
