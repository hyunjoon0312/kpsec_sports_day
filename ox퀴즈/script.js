let currentQuestionIndex = 0;
let timerObj = null;
let timeLeft = 10;
const CONST_TIMER = 10;

// DOM Elements
const screenWait = document.getElementById('screen-wait');
const screenQuestion = document.getElementById('screen-question');
const screenAnswer = document.getElementById('screen-answer');
const screenEnd = document.getElementById('screen-end');

const elQuestionNumber = document.getElementById('question-number');
const elQuestionContent = document.getElementById('question-content');
const elTimer = document.getElementById('timer');
const elTimerBar = document.getElementById('timer-bar');
const elAnswerMark = document.getElementById('answer-mark');
const elExplanation = document.getElementById('explanation');

// Buttons
const btnStartQuiz = document.getElementById('btn-start-quiz');
const btnStartTimer = document.getElementById('btn-start-timer');
const btnRevealAnswer = document.getElementById('btn-reveal-answer');
const btnNextQuestion = document.getElementById('btn-next-question');
const btnRestart = document.getElementById('btn-restart');

// Initialization
function init() {
    if (typeof quizData === 'undefined' || quizData.length === 0) {
        alert("문제가 없습니다. questions.js 파일을 확인해주세요.");
        return;
    }
    
    btnStartQuiz.addEventListener('click', showQuestionScreen);
    btnStartTimer.addEventListener('click', startTimer);
    btnRevealAnswer.addEventListener('click', showAnswerScreen);
    btnNextQuestion.addEventListener('click', nextQuestion);
    btnRestart.addEventListener('click', resetQuiz);
}

function showQuestionScreen() {
    clearTimeout(timerObj);
    screenWait.classList.add('hidden');
    screenAnswer.classList.add('hidden');
    screenEnd.classList.add('hidden');
    screenQuestion.classList.remove('hidden');

    const currentQ = quizData[currentQuestionIndex];
    elQuestionNumber.textContent = `Q${currentQuestionIndex + 1}.`;
    elQuestionContent.textContent = currentQ.question;
    
    // Reset Timer UI
    timeLeft = CONST_TIMER;
    elTimer.textContent = timeLeft;
    elTimer.classList.remove('warning');
    elTimer.classList.remove('hidden');
    elTimerBar.style.width = '100%';
    elTimerBar.classList.remove('warning');
    
    // Manage Buttons
    btnStartTimer.classList.remove('hidden');
    btnRevealAnswer.classList.add('hidden');
}

function startTimer() {
    btnStartTimer.classList.add('hidden');
    btnRevealAnswer.classList.remove('hidden');
    btnRevealAnswer.disabled = false;

    timeLeft = CONST_TIMER;
    elTimer.textContent = timeLeft;
    elTimer.classList.remove('warning');
    elTimerBar.style.width = '100%';
    elTimerBar.classList.remove('warning');
    
    const startTime = Date.now();
    
    clearInterval(timerObj);
    timerObj = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        timeLeft = CONST_TIMER - elapsed;
        
        if (timeLeft <= 0) {
            clearInterval(timerObj);
            timeLeft = 0;
            elTimer.textContent = "TIME OUT";
            elTimerBar.style.width = '0%';
        } else {
            elTimer.textContent = Math.ceil(timeLeft); // Show 10, 9, 8...
            
            // Update gauge
            const pct = (timeLeft / CONST_TIMER) * 100;
            elTimerBar.style.width = `${pct}%`;
            
            if (timeLeft <= 3) {
                elTimer.classList.add('warning');
                elTimerBar.classList.add('warning');
            }
        }
    }, 50);
}

function showAnswerScreen() {
    clearInterval(timerObj);
    const currentQ = quizData[currentQuestionIndex];
    
    screenQuestion.classList.add('hidden');
    screenAnswer.classList.remove('hidden');
    
    // Set Answer Mark
    elAnswerMark.textContent = currentQ.answer;
    
    // Reset classes to trigger animation again and set color
    elAnswerMark.className = 'answer-mark';
    void elAnswerMark.offsetWidth; // trigger reflow for animation restart
    if (currentQ.answer.toUpperCase() === 'O') {
        elAnswerMark.classList.add('o');
    } else {
        elAnswerMark.classList.add('x');
    }
    
    // Set Explanation
    elExplanation.textContent = currentQ.explanation;
    
    // Update Next Question button text if it's the last question
    if (currentQuestionIndex >= quizData.length - 1) {
        btnNextQuestion.textContent = "결과 확인";
    } else {
        btnNextQuestion.textContent = "다음 문제";
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizData.length) {
        // End of Quiz
        screenAnswer.classList.add('hidden');
        screenEnd.classList.remove('hidden');
    } else {
        showQuestionScreen();
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    screenEnd.classList.add('hidden');
    showQuestionScreen();
}

window.addEventListener('DOMContentLoaded', init);
