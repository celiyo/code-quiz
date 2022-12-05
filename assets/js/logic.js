// Global variables
var startBtn = document.getElementById("start");
var questionTitle = document.getElementById("question-title");
var choices = document.getElementById("choices");
var feedback = document.getElementById("feedback");
var timer = document.getElementById("time");
var finalScore = document.getElementById("final-score");
var initials = document.getElementById("initials");
var submitBtn = document.getElementById("submit");

var currentQuestion = 1;
var score = 0;
var timeLeft;
var timeInterval;

var results = localStorage.getItem("results")
  ? JSON.parse(localStorage.getItem("results"))
  : [];
localStorage.setItem("results", JSON.stringify(results));

// Start the quiz
startBtn.addEventListener("click", start);

function start() {
  // Start countdown
  countdown();

  // Hide start screen and display current question
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");
  displayQuestion(currentQuestion);

  // Get next question
  choices.addEventListener("click", next);
}

function next(event) {
  var element = event.target;
  var count = parseInt(element.className);
  var answer = questions[count - 1].answer;

  displyFeedback(element, answer);

  if (element.matches("button")) {
    setTimeout(function () {
      if (count < questions.length) {
        currentQuestion++;
        clearContent();
        displayQuestion(currentQuestion);
      } else {
        stop();
      }
    }, 1000);
    if (element.textContent !== answer) {
      if (timeLeft >= 5) {
        timeLeft -= 5;
      } else {
        timeLeft = 0;
      }
    } else {
      score += 1;
    }
  }
}

function displayQuestion(index) {
  index -= 1;
  questionTitle.textContent = questions[index].title;
  for (var i = 0; i < questions[index].choices.length; i++) {
    var questionChoice = document.createElement("button");
    questionChoice.classList.add(questions[index].id);
    questionChoice.textContent = questions[index].choices[i];
    choices.appendChild(questionChoice);
  }
}

function displyFeedback(element, answer) {
  if (element.innerText == answer) {
    feedback.innerHTML = "Correct answer";
  } else {
    feedback.innerHTML = "Wrong answer";
  }
  feedback.classList.remove("hide");
}

function countdown() {
  timeLeft = 40;

  timeInterval = setInterval(function () {
    timer.textContent = timeLeft;
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      stop();
    }
  }, 1000);
}

function stop() {
  clearContent();
  clearInterval(timeInterval);
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
  finalScore.textContent = score;

  submitBtn.addEventListener("click", submit);
}

function submit(event) {
  event.preventDefault();

  var result = {};
  result.initials = initials.value;
  result.score = score;
  results.push(result);

  localStorage.setItem("results", JSON.stringify(results));

  window.location.href = "./highscores.html";
}

function clearContent() {
  questionTitle.textContent = "";
  choices.innerHTML = "";
  feedback.textContent = "";
  feedback.classList.add("hide");
}
