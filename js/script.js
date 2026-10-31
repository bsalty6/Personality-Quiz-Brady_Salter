console.log("script.js connected!");

let answers = {};   // stores one answer per question, like { 0: "beach", 1: "city" }

const questionBlocks = document.querySelectorAll(".question-block");

questionBlocks.forEach(function (block, index) {
  const blockButtons = block.querySelectorAll(".answer-btn");

  blockButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      blockButtons.forEach(function (b) {
        b.classList.remove("selected");
      });
      button.classList.add("selected");
      answers[index] = button.dataset.answer;
      console.log(answers);
    });
  });
});

const resultDescriptions = {
  beach: "You are relaxed and easygoing. You like to take it slow and enjoy the sun.",
  city: "You are curious and energetic. You like to explore and try new things.",
  cabin: "You are calm and quiet. You like nature and time to recharge.",
  themepark: "You are fun and adventurous. You like excitement and being with people."
};

function displayResult() {
  const resultText = document.getElementById("result-text");
  const resultContainer = document.getElementById("result-container");

  if (Object.keys(answers).length < questionBlocks.length) {
    resultText.textContent = "Please answer every question first.";
    resultContainer.style.display = "block";
    return;
  }

  let scores = { beach: 0, city: 0, cabin: 0, themepark: 0 };
  for (let q in answers) {
    scores[answers[q]]++;
  }

  let winner = "beach";
  for (let spot in scores) {
    if (scores[spot] > scores[winner]) {
      winner = spot;
    }
  }

  resultText.textContent = resultDescriptions[winner];
  resultContainer.style.display = "block";
}

document.getElementById("show-result").addEventListener("click", displayResult);

document.getElementById("retake").addEventListener("click", function () {
  answers = {};
  document.querySelectorAll(".answer-btn").forEach(function (b) {
    b.classList.remove("selected");
  });
  document.getElementById("result-container").style.display = "none";
  window.scrollTo(0, 0);
});