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
var questionsContainer = document.querySelector("#quesContainer");
var wrapper = document.querySelector("#wrapper");
var timer = document.querySelector("#timer-clock");
//declared variables for timer
var secondsLeft = 76;
var holdTimer = 0;
var penalty = 10;
//Timer starts on the click of start button
startTimer.addEventListener("click", function () {
  if (holdTimer === 0) {
    // setting interval of 1s and then reducing timer by 1s
    holdTimer = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Time: " + secondsLeft;

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
  questionsContainer.innerHTML = "";
  ulCreate.innerHTML = "";

  var userQuestion = questions[questionIndex].ques;
  var userChoices = questions[questionIndex].choices;
  questionsContainer.textContent = userQuestion;

  //appending choices in a list

  userChoices.forEach(function (newItem) {
    var listChoice = document.createElement("li");
    listChoice.textContent = newItem;
    questionsContainer.appendChild(ulCreate);
    ulCreate.appendChild(listChoice);
    listChoice.addEventListener("click", compare);
  });
}
// comapring the userchoice to correct answer
function compare(event) {
  var selection = event.target;
  if (selection.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "newDiv");
    if (selection.textContent === questions[questionIndex].answer) {
      score++;
      createDiv.textContent =
        "You got it Correct! The answer is: " + questions[questionIndex].answer;
    } else {
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent =
        "Wrong Answer. The Correct answer is: " +
        questions[questionIndex].answer;
    }
  }
  questionIndex++;

  if (questionIndex >= questions.length) {
    done();
    createDiv.textContent =
      "End of Quiz!" +
      " " +
      "Your Score is : " +
      score +
      "/" +
      questions.length;
  } else {
    render(questionIndex);
  }
  questionsContainer.appendChild(createDiv);
}

// making the display for  when the quiz is finished
function done() {
  questionsContainer.innerHTML = "";
  timer.innerHTML = "";

  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "newH1");
  createH1.textContent = "All Done!";

  questionsContainer.appendChild(createH1);

  var createP = document.createElement("p");
  createP.setAttribute("id", "newP");

  questionsContainer.appendChild(createP);

  //we add the remaining seconds as score
  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdTimer);
    createP2.textContent = "Your final score is: " + timeRemaining;

    questionsContainer.appendChild(createP2);
  }

  // Label for input
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsContainer.appendChild(createLabel);

  // input for saving intials
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsContainer.appendChild(createInput);

  // submit to submit score and intials
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsContainer.appendChild(createSubmit);

  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
      console.log("No Value Entered!");
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      // moves to scores page
      window.location.replace("./highscores.html");
    }
  });
}
