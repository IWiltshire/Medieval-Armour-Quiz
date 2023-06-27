// Dom querying
const question = document.getElementById('question'); 
const choices = Array.from(document.getElementsByClassName("choice-text"));
const illust = document.getElementById("pictures");
//console.log(choices);
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false; // variable for delay between answering questions
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = []; // Each question will be an object in this array

fetch("questions.json") // Fetching the questions from a JSON file
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        console.log(questions)
        startGame(); // It seems that in order for the game to recognise the question set as filled in, the function has to be called here. This is strange for an interpretted language (I think)
    })
    .catch(err => { // Good practive to display errors in case of mispelling the json file, or referring to a non-existant one.
        console.error(err);
    });


// CONSTANTS
const CORRECT_BONUS = 1; // How much is each question worth
const MAX_QUESTIONS = 7; 

// Using ESA4 syntax (arrow syntax)
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // Ellipsis is spread operator; This is needed because just setting availableQuestions = questions points to the same space in memory (similar to Python)
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score); // save score
        return window.location.assign("end.html"); // go to end page
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    // Used quote literals (similar to Python f-strings) above

    const questionIndex = Math.floor(Math.random() * availableQuestions.length); // Randomly getting a question index
    currentQuestion = availableQuestions[questionIndex]; // Getting question corresponding to index
    
    question.innerText = currentQuestion.question; // Filling in dummy text for question with proper question
    illust.src = `./images/${currentQuestion.picture}`; // Filling in dummy image with proper image

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    // I think I'll want to have the new images obtained within this function

    availableQuestions.splice(questionIndex, 1); // Removing the question we just used

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return; // If we aren't accepting answers, ignore the click
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']
        
        // Making classes for correct/incorrect answers
        let classToApply = 'incorrect'; // Have incorrect as default and only in cases where answer is correct
        if (selectedAnswer == currentQuestion.answer) { // double-equals works as in Python; triple-equals compares data types as well (comparable to Python 'is')
            classToApply = 'correct';
        }; // Can alternatively use ternary syntax

        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        };
        
        //console.log(classToApply);

        selectedChoice.parentElement.classList.add(classToApply); // Adding the class to the container (and not just the text)
        
        setTimeout( () => { // Delay between answering question and getting next one
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 1000); // 1000 milliseconds

        //console.log(e.target);
        // OUTDATED: As it stands, this only works if you click on the text, and not the entire button
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

//startGame();

// NOTES:
// Can change CSS properties using ".style."