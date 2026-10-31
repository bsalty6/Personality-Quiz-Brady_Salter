console.log("script.js connected!");

let scores = { beach: 0, city: 0, cabin: 0, themepark: 0 };

const buttons = document.querySelectorAll(".answer-btn");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    let choice = button.dataset.answer;      // read this button's data-answer value
    scores[choice]++;                   // add 1 to that spot in scores
    console.log(scores);    // so you can watch it change
  });
});