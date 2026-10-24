const questions = [
    {
        question: "Which languege is used to struture a web page?",
        options: ["CSS", "HTML", "Python", "Java" ],
        answer: "HTML"
    },
    {
        question: "Which languege is used to style a web page?",
        options: [ "HTML", "SQL", "CSS", "C"],
        answer: "CSS"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["let", "print", "echo", "define"],
        answer: "let"
    },
    {
        question: "Which methos displeys a message in the brower console?",
        options: ["console.log()", "print()", "show()", "display()" ],
        answer: "console.log()"
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        options: ["<p>", "<a>", "<img>", "<h1>"],
        answer: "<a>"
    },
    {
        question:"Which methos adds an item to the end of an array?",
        options: ["pop()", "shift()", "push()", "slice()"],
        answer: "push()"
    },
    { 
    question: " Which value represents a Boolean true value?",
    options:[' "true" ', "1", "true", "yes"],
    answer: "true"
   },
   {
question: "Which CSS property changes text color?",
options: ["font-size", "color",  "background", "spacing"],
answer: "color"
   },
   {
    question: "Which keyword  defines a contant in javaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const"
   }
]

const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");
const resultMessage  = document.getElementById("result-message");

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

function showQuestion() {
    answerSelected = false ;

    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
    `Question ${currentQuestionIndex + 1} of ${question.length};`

    scoreDisplay.textContent =  `Score; ${score}`;

    progressBar.style.width = 
    `${(currentQuestionIndex / question.length) * 100}%`;

    questionElement.textContent = currentQuestion.question;
    answersContainer.replaceChildren();
    feedback.textContent = "";
    nextButton.disabled = true;

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent= option;
        button.addEventListener("click", () => {
            selectAnswer(button, option, currentQuestion.answer);
        });
        answersContainer.appendChild(button);
    });
}

function selectAnswer(button, selected, correctAnswer){
    if (answerSelected) return;

    answerSelected = true;

    const answerButtons = 
    answersContainer.querySelectorAll(".answer-btn");

    answerButtons.forEach((answerButton) => {
        answerButton.disabled = true;

        if (answerButton.textContent === correctAnswer){
            answerButton.classList.add("correct");
        }
    });
     
    if (selected === correctAnswer) {
        score++;
        feedback.textContent = "Correct answer1";
        feedback.style.color   =  "#16864b";
    } else {
        button.classList.add("wrong");
        feedback.textContent = `Incorrect! Correct answer: ${correctAnswer}`;
        feedback.style.color = "#d93045";
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}
function showResults(){
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    progressBar.style.width = "100%";

    finalScore.textContent = 
    `Your score: ${score}/ ${questions.length}`;

    const percentage = (score / questions.length) * 100;

    if (percentage >= 80){
        resultMessage.textContent = "Excellent work! keep it up!";
    }else if (percentage>=50) {
        resultMessage.textContent  = "Good effort! keep practicing!";
    } else {
        resultMessage.textContent = "keep learnig . you can improve!";
        }
    }

    nextButton.addEventListener("click", () => {
        if (!answerSelected)return;

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        }else{
            showResults();
        }
    });
    restartButton.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;

        resultScreen.hidden = true;
        quizScreen.hidden = false;

        showQuestion();
    });
    showQuestion();