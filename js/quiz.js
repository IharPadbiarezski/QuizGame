let correctAnswer;

document.addEventListener("DOMContentLoaded", function() {
  loadQuestion();
});

// load a new question from API
loadQuestion = () => {
  const url = "https://opentdb.com/api.php?amount=1";
  fetch(url)
    .then(data => data.json())
    .then(result => displayQuestion(result.results));
};

// Displays the questions HTML from API

displayQuestion = questions => {
  // Create the HTML Question
  const questionHTML = document.createElement("div");
  questionHTML.classList.add("col-12");

  questions.forEach(question => {
    // read the correctanswer

    correctAnswer = question.correct_answer;

    // inject the correct answer in the possible answers
    let possibleAnswers = question.incorrect_answers;
    possibleAnswers.splice(Math.floor(Math.random() * 3), 0, correctAnswer);

    // add the HTML for the Current question

    questionHTML.innerHTML = `
        <div class="row justify-content-between heading">
            <p class="category">Category: ${question.category}</p>
        </div
        <h2 class="text-center">${question.question}</h2>
    `;

    // generate the HTML for possible answers
    const answerDiv = document.createElement("div");
    answerDiv.classList.add(
      "questions",
      "row",
      "justify-content-around",
      "mt-4"
    );
    possibleAnswers.forEach(answer => {
      const answerHTML = document.createElement("li");
      answerHTML.classList.add("col-12", "col-md-5");
      answerHTML.textContent = answer;
      answerDiv.appendChild(answerHTML);
    });
    questionHTML.appendChild(answerDiv);

    // render in HTML
    document.querySelector("#app").appendChild(questionHTML);
  });
};
