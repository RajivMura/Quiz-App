const questions = [
    {
        questions: "Which is largest animal in the world ?",
        answers: [
            { text: "Sharlk", correct: false },
            { text: "Blue Whalw", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },

    {
        questions: "Which is the smallest country in the world ?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan ", correct: false },
            { text: "Nepal", correct: false },
            { text: "Shri Lanka", correct: false }
        ]

    },

    {
        questions: "Which is the largest desert in the world ?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi ", correct: false },
            { text: "Sahara", correct: true },
            { text: "Antarctica", correct: false }
        ]

    },


    {
        questions: "Which is the smallest continent in the world ?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australis ", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false }
        ]

    }

]



const questionElement = document.getElementById('question');
const answersButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();   // for reset the previous value of the button
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
        questions;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
          
    })
}



// this will remove the previous answer which was written in the html
function resetState() {
    nextButton.style.display = "none";
    while (answersButtons.firstChild) {
        answersButtons.removeChild(answersButtons.firstChild);
  
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");  //it will add the class name correct
        score++;
    } else {
        selectedBtn.classList.add("incorrect"); // it will add the class name incorrect
    }

    Array.from(answersButtons.children).forEach(button => {   //if user click on wrong answer it will automatically highlight the correct one.
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // disable all the option after after clicking on one
    });
    nextButton.style.display = "block"; // it will dispaly the nextbutton so the we can move on next questions
}



function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = " Play Again";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore();
    }
}


nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
        
})
startQuiz();