console.log("script.js connected!");

const questions = [
  {
    text: "What's your ideal morning on vacation?",
    answers: [
      { text: "Sleeping in, then lounging by the water", spot: "beach" },
      { text: "Grabbing coffee and exploring the streets", spot: "city" },
      { text: "Sipping coffee on the porch at sunrise", spot: "cabin" },
      { text: "Getting up early to beat the lines for the rides", spot: "themepark" }
    ]
  },
  {
    text: "How much do you like having a plan?",
    answers: [
      { text: "A full schedule so I can see and do everything", spot: "city" },
      { text: "No plan at all, I’ll go wherever the day takes me", spot: "beach" },
      { text: "A loose plan with plenty of downtime to relax", spot: "cabin" },
      { text: "A must-do list with the big attractions first", spot: "themepark" }
    ]
  },
  {
    text: "Who would you most like to travel with?",
    answers: [
      { text: "Just me, I like the quiet", spot: "cabin" },
      { text: "My partner or best friend, somewhere relaxing", spot: "beach" },
      { text: "A big group of friends or family", spot: "themepark" },
      { text: "Someone who loves trying new places and foods", spot: "city" }
    ]
  },
  {
    text: "What souvenir would you bring home?",
    answers: [
      { text: "A cool shirt or a local treat from a little shop", spot: "city" },
      { text: "A plush toy or a photo from the best part of the trip", spot: "themepark" },
      { text: "A seashell or a souvenir tan", spot: "beach" },
      { text: "A carved wooden piece or a good book", spot: "cabin" }
    ]
  }
];

const resultDescriptions = {
  beach: "You are relaxed and easygoing. You like to take it slow and enjoy the sun.",
  city: "You are curious and energetic. You like to explore and try new things.",
  cabin: "You are calm and quiet. You like nature and time to recharge.",
  themepark: "You are fun and adventurous. You like excitement and being with people."
};

let answers = {};

// Build the quiz from the questions array
const quizContainer = document.getElementById("quiz-container");

questions.forEach(function (question) {
  const wrapper = document.createElement("div");
  wrapper.className = "container d-flex justify-content-center";

  const card = document.createElement("div");
  card.className = "card my-4 p-4 question-block";
  card.style.width = "75%";

  const title = document.createElement("h4");
  title.className = "mb-3";
  title.textContent = question.text;
  card.appendChild(title);

  const row = document.createElement("div");
  row.className = "row g-2";

  question.answers.forEach(function (answer) {
    const col = document.createElement("div");
    col.className = "col-6";

    const button = document.createElement("button");
    button.className = "btn btn-outline-primary w-100 answer-btn";
    button.dataset.answer = answer.spot;
    button.textContent = answer.text;

    col.appendChild(button);
    row.appendChild(col);
  });

  card.appendChild(row);
  wrapper.appendChild(card);
  quizContainer.appendChild(wrapper);
});

// Track selected answers
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