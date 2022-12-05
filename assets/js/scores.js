var results = JSON.parse(localStorage.getItem("results"));
var highScores = document.getElementById("highscores");
var clear = document.getElementById("clear");

results.sort(function (a, b) {
  return parseFloat(b.score) - parseFloat(a.score);
});

for (var i = 0; i < results.length; i++) {
  test(results[i].initials, results[i].score);
}

function test(initials, score) {
  var resultItem = document.createElement("li");
  resultItem.textContent = `${initials} - ${score}`;
  highScores.appendChild(resultItem);
}

clear.addEventListener("click", function () {
  localStorage.clear();
  highScores.innerHTML = "";
});
