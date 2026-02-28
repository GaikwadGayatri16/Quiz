const quizzes = {
    general: {
        stage1: [
            { question: "What is the capital city of Japan?", options: ["Tokyo", "Beijing", "Seoul", "Bangkok"], answer: "Tokyo" },
            { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" }
        ],
        stage2: [],
        stage3: []
    },
    math: {
        stage1: [
            { question: "What is 10 + 5?", options: ["12", "15", "20", "25"], answer: "15" }
        ],
        stage2: [],
        stage3: []
    },
    science: {
        stage1: [
            { question: "What is H2O commonly known as?", options: ["Oxygen", "Hydrogen", "Water", "Helium"], answer: "Water" }
        ],
        stage2: [],
        stage3: []
    }
};

let currentQuestionIndex = 0;
let score = 0;
let selectedQuiz = [];
let userAnswers = [];
let currentStage = 1;

function startQuiz(category) {
    selectedQuiz = quizzes[category];
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    currentStage = 1;

    document.getElementById('home').style.display = 'none';
    document.getElementById('stageSelection').style.display = 'block';
    showStageSelection();
}

function showStageSelection() {
    const stageSelection = document.getElementById('stageSelection');
    stageSelection.innerHTML = `
        <h2>Select Stage</h2>
        <button onclick="startStage(1)">Stage 1</button>
        <button onclick="startStage(2)">Stage 2</button>
        <button onclick="startStage(3)">Stage 3</button>
    `;
}

function startStage(stage) {
    currentStage = stage;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    document.getElementById('stageSelection').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = selectedQuiz[`stage${currentStage}`][currentQuestionIndex];
    const quizContainer = document.getElementById('quiz');

    quizContainer.innerHTML = `
        <div class="quiz-card">
            <div>${currentQuestion.question}</div>
            <ul class="options">
                ${currentQuestion.options.map(option => `
                    <li>
                        <input type="radio" id="${option}" name="answer" value="${option}">
                        <label for="${option}">${option}</label>
                    </li>
                `).join('')}
            </ul>
            <button onclick="nextQuestion()">Next</button>
        </div>
    `;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    userAnswers[currentQuestionIndex] = selectedOption.value;

    if (selectedOption.value === selectedQuiz[`stage${currentStage}`][currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuiz[`stage${currentStage}`].length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    const scoreContainer = document.getElementById('score');
    scoreContainer.style.display = 'block';
    scoreContainer.innerHTML = `
        <h2>Your Score: ${score}/${selectedQuiz[`stage${currentStage}`].length}</h2>
        <button onclick="goHome()">Back to Home</button>
    `;
}

function goHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('stageSelection').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'none';
}