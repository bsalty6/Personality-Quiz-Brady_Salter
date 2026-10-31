console.log("script.js connected!");

let scores = { beach: 0, city: 0, cabin: 0, themepark: 0 };

const buttons = document.querySelectorAll(".answer-btn");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    let choice = button.dataset.answer;      // read this button's data-answer value
    scores[choice]++;                   // add 1 to that spot in scores
    console.log(scores);    // so you can watch it change
  
    // lock this question and highlight the pick
    let block = button.closest(".question-block");
    let blockButtons = block.querySelectorAll(".answer-btn");
    blockButtons.forEach(function (b) {
      b.disabled = true;
    });
    button.classList.add("active");   // add the Bootstrap class "active" to the clicked button
  });
});

const resultDescriptions = {
  beach: "The Beach! You are relaxed and easygoing. You like to take it slow and enjoy the sun.",
  city: "The City! You are curious and energetic. You like to explore and try new things.",
  cabin: "The Cabin! You are calm and quiet. You like nature and time to recharge.",
  themepark: "The Theme Park! You are fun and adventurous. You like excitement and being with people."
};

document.getElementById("show-result").addEventListener("click", function () {
  let winner = "beach";   // start by assuming beach is winning

  for (let spot in scores) {
    if (scores[spot] > scores[winner]) {   // is this spot's score higher than the current winner's score?
      winner = spot;
    }
  }

  document.getElementById("result-text").textContent = resultDescriptions[winner];
  document.getElementById("result-container").style.display = "block";
});


document.getElementById("retake").addEventListener("click", function () {
  scores = { beach: 0, city: 0, cabin: 0, themepark: 0 };

  buttons.forEach(function (b) {
    b.disabled = false;
    b.classList.remove("active");
  });

  document.getElementById("result-container").style.display = "none";
  window.scrollTo(0, 0);
});