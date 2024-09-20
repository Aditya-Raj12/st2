const questionLabel = document.getElementById("question-label");
const answerBox = document.getElementById("answer-box");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const responseText = document.getElementById("response-text");

let QUESTIONS = [];
let currentQuestion = -1;
async function fetchQuestions() {
  const response = await fetch("/questions");
  const data = await response.json();
  QUESTIONS = data.questions;
  goToNextQuestion();
}
function checkBtnsVisibility() {
  previousBtn.style.display = currentQuestion > 0 ? "inline-block" : "none";
  nextBtn.style.display = currentQuestion < QUESTIONS.length - 1 ? "inline-block" : "none";
}
function goToNextQuestion() {
  currentQuestion++;
  questionLabel.innerText = `Question ${currentQuestion + 1}: ${QUESTIONS[currentQuestion]}`;
  checkBtnsVisibility();
}
function goToPreviousQuestion() {
  currentQuestion--;
  questionLabel.innerText = `Question ${currentQuestion + 1}: ${QUESTIONS[currentQuestion]}`;
  checkBtnsVisibility();
}
nextBtn.addEventListener("click", () => {
  goToNextQuestion();
});

previousBtn.addEventListener("click", () => {
  goToPreviousQuestion();
});

submitBtn.addEventListener("click", async () => {
  const question = QUESTIONS[currentQuestion];
  const answer = answerBox.value;
  const response = await fetch("/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question, answer })
  });

  const data = await response.json();
  responseText.innerText = data.evaluation;
});
fetchQuestions();
