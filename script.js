const allQuestions = [
    { question: "Where was a Green cat born?", answers: ["Denmark", "Turkey", "Iceland", "United States"], correctAnswer: 0 },
    { question: "How many toes cats have?", answers: ["20", "18", "16", "22"], correctAnswer: 1 },
    { question: "What is a group of cats called?", answers: ["Pack", "Clowder", "Herd", "Swarm"], correctAnswer: 1 },
    { question: "Which breed of cat is known for its lack of fur?", answers: ["Maine Coon", "Siamese", "Sphynx", "Persian"], correctAnswer: 2 },
    { question: "Which of the following foods is toxic to cats?", answers: ["Chicken", "Cheese", "Tuna", "Chocolate"], correctAnswer: 3 },
    { question: "What percentage of a cat's bones are in its tail?", answers: ["5%", "10%", "15%", "20%"], correctAnswer: 1 },
    { question: "Approximately how many muscles does a cat have in each ear?", answers: ["12", "22", "32", "42"], correctAnswer: 2 },
    { question: "Which ancient civilization first domesticated cats?", answers: ["Egyptian", "Greek", "Roman", "Persian"], correctAnswer: 0 },
    { question: "What is a cat's top running speed?", answers: ["15 mph", "20 mph", "25 mph", "10 mph"], correctAnswer: 2 },
    { question: "What is the phenomenon called when a cat rubs its head against objects or people?", answers: ["Bunting", "Snuzzling", "Nuzzling", "Rubbism"], correctAnswer: 0 }
];

const colors = ["#5d8292", "#fcc35b", "#a1d4db", "#f9b1b2", "#586a74"]

let numberOfQuestions = 5;
let questionsInGame = [];
let currentQuestionIndex = 0;
let correctAnswersCounter = 0;
let incorrectAnswers = [];

// Random questions function
function topQuestions(array, nr) {
    finalArray = [];
    copyArray = [...array];
    for (let i = nr - 1; i >= 0; i--) {
        maxNumber = copyArray.length;
        const j = Math.floor(Math.random() * maxNumber);
        finalArray[i] = copyArray[j];
        copyArray.splice(j, 1);
    }
    return finalArray;
}

// All HTML elements needed
const questionElement = document.getElementById("question");
const buttons = document.querySelectorAll(".answer-button");
const footerElement = document.getElementById("footer");
const resultContainer = document.getElementById("result-container");
const finalResultElement = document.getElementById("final-result");
const incorrectAnswersElement = document.getElementById("incorrect-answers");
const playAgainButton = document.getElementById("play-again-button");
const startGameButton = document.getElementById("start-game-button");
const answersButton = document.getElementById("show-incorrect-answers-button");
const quizContainer = document.getElementById("quiz-container");
const initialContainer = document.getElementById("initial-page");
const pawResult = document.getElementById("final-result-number");
const bodyContainer = document.body;

// Function to start the quiz
function initializeQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCounter = 0;
    incorrectAnswers = [];

    questionsInGame = topQuestions(allQuestions, numberOfQuestions);

    showCurrentQuestion(currentQuestionIndex);
    updateFooterCounter();
}

// Function to show a question and the anwsers
function showCurrentQuestion(index) {
    const currentQuestion = questionsInGame[index];
    questionElement.innerText = currentQuestion.question;
    buttons.forEach((button, i) => {
        quizContainer.style.borderColor = colors[index];
        quizContainer.style.boxShadow = "10px 10px 10px " + colors[index];

        button.style.borderColor = colors[i];

        button.innerText = currentQuestion.answers[i];
        button.classList.remove("correct", "incorrect");
        button.disabled = false;

    });
}

// Function to update the footer
function updateFooterCounter() {
    footerElement.innerText = `Question ${currentQuestionIndex + 1} of ${numberOfQuestions}`;
}

// Function to handle answer click
function handleAnswerClick(event) {
    const selectedButton = event.target;
    const selectedIndex = Array.from(buttons).indexOf(selectedButton);
    const currentQuestion = questionsInGame[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
        selectedButton.classList.add("correct");
        correctAnswersCounter++;
    } else {
        selectedButton.classList.add("incorrect");
        incorrectAnswers.push({
            question: currentQuestion.question,
            selectedAnswer: currentQuestion.answers[selectedIndex],
            correctAnswer: currentQuestion.answers[currentQuestion.correctAnswer]
        });
    }

    buttons.forEach(button => button.disabled = true);

    // Move to the next question or show the result
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < numberOfQuestions) {
            showCurrentQuestion(currentQuestionIndex);
            updateFooterCounter();
        } else {
            showResult();
        }
    }, 500);
}

// Function to show the final result
function showResult() {
    prepEndGame();
    finalResultElement.innerText = "You got:"
    pawResult.innerText = correctAnswersCounter

}

// Function display incorrect answers
function showAnswers() {
    incorrectAnswersElement.innerHTML = "";
    incorrectAnswers.forEach(item => {
        const div = document.createElement("div");
        const question = document.createElement("p");
        const answer = document.createElement("p");
        question.textContent = `Question: ${item.question}`;
        answer.textContent = `Correct Answer: ${item.correctAnswer}`;
        div.appendChild(question);
        div.appendChild(answer);
        incorrectAnswersElement.appendChild(div);
    });
}

// Function to prep the game
function prepStartGame() {
    bodyContainer.style.backgroundBlendMode = "lighten";
    bodyContainer.style.backgroundColor = "rgba(255, 255, 255, 0.651)";
    buttons.forEach(button => { button.style.display = "block"; });
    footerElement.style.display = "block";
    incorrectAnswersElement.style.display = "none";
    initialContainer.style.display = "none";
    quizContainer.style.display = "flex";
    resultContainer.style.display = "none";
}

// Function to prep the results
function prepEndGame() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "flex";
    answersButton.style.display = "block";
    buttons.forEach((button) => button.style.display = "none");
    footerElement.style.display = "none";
    bodyContainer.style.backgroundColor = "rgba(255, 255, 255, 0)";
}

// Add click event listeners to each button
buttons.forEach(button => {
    button.addEventListener("click", handleAnswerClick);
});

answersButton.addEventListener("click", () => {
    answersButton.style.display = "none";
    showAnswers()
    incorrectAnswersElement.style.display = "block";
});



// Click event listener to play again button
playAgainButton.addEventListener("click", () => {
    prepStartGame()
    initializeQuiz();
});

//Click event listener to start play button
startGameButton.addEventListener("click", () => {
    prepStartGame()
    initializeQuiz();
});