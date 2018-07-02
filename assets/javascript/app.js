//TODO:
//Create questions

//Link assignment to portfolio

//Define the variables used in the game
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;

// Variable that will hold our setInterval that runs the time
var intervalId;

//Define an array of questions
var questions = [{
        question: "What is 1+1?",
        answerChoices: [3, 5, 2, 7],
        correctAnswer: 2
    },
    {
        question: "What is 11+4?",
        answerChoices: [15, 1, 6, 3],
        correctAnswer: 15
    },
    {
        question: "What color is the sky?",
        answerChoices: ["red", "pink", "blue", "yellow"],
        correctAnswer: "blue"
    }
]

//Function to determine what to do next, whether the timer has run out or whether the user has clicked an answer
function determineNextAction(answerCorrectness) {

    //Display whether the answer was correct on incorrect
    displayCorrectAnswer(currentQuestion, answerCorrectness);

    // If this is the last question, display the results
    if (currentQuestion === questions.length - 1) {
        setTimeout(function () {
            displayResults()
        }, 300);
    }

    // If this isn't the last question, move on to the next question
    else {

        //Increment to the next question
        currentQuestion++;

        //Display the next question after 3 seconds
        setTimeout(function () {
            displayQuestion(currentQuestion)
        }, 300);
    }
}

//Function to display a question and its possible answers to the user
function displayQuestion(questionNumber) {

    //Clear the currently displayed information
    $('#question-area').empty();

    //Start the timer and display the time remaining
    timer.start();
    var timerDisplay = $('<p>');
    timerDisplay.attr("id", "timer-display");
    timerDisplay.attr("class", "text-center");
    timerDisplay.text("Time Remaining: " + timer.time + " Seconds");
    $('#question-area').append(timerDisplay);

    //Display the question
    var questionStatement = $('<p>');
    questionStatement.attr("class", "text-center");
    questionStatement.text(questions[questionNumber].question);
    $('#question-area').append(questionStatement);

    //Loop through the answers and create a button for each
    for (var i = 0; i < 4; i++) {
        var button = $('<button>');
        button.attr("class", "btn btn-light btn-block answer-choice-button" + " answer-choice" + i);
        button.text(questions[questionNumber].answerChoices[i]);
        $('#question-area').append(button);
    }
}

//Function to display whther the user was correct or incorrect
function displayCorrectAnswer(questionNumber, answerCorrectness) {

    //Clear the currently displayed information
    $('#question-area').empty();

    //Display whether the user was correct or incorrect
    var wasItCorrect = $('<p>');
    wasItCorrect.attr("class", "text-center display-4");
    if (answerCorrectness === "correct") {
        wasItCorrect.text("Correct!");
    } else if (answerCorrectness === "incorrect") {
        wasItCorrect.text("Incorrect!");
    } else if (answerCorrectness === "unanswered") {
        wasItCorrect.text("Time is Up!")
    }
    $('#question-area').append(wasItCorrect);

    //Display the question again
    var questionStatement = $('<p>');
    questionStatement.attr("class", "text-center");
    questionStatement.text(questions[questionNumber].question);
    $('#question-area').append(questionStatement);

    // Display the correct answer
    var correctAnswer = $('<p>');
    correctAnswer.attr("class", "text-center");
    correctAnswer.text(questions[questionNumber].correctAnswer);
    $('#question-area').append(correctAnswer);

}

//Function to display the final score after the user has answered all of the questions
function displayResults() {

    //Clear the currently displayed information
    $('#question-area').empty();

    //Display final results
    var resultsParagraph = $('<p>');
    resultsParagraph.attr("class", "text-center display-4");
    resultsParagraph.text("Final Results");
    $('#question-area').append(resultsParagraph);

    //Display the number of questions answered correctly
    var correctAnswersParagraph = $('<p>');
    correctAnswersParagraph.attr("class", "text-center");
    correctAnswersParagraph.text("Correct Answers: " + correctAnswers);
    $('#question-area').append(correctAnswersParagraph);

    // Display the number of questions answered incorrectly
    var incorrectAnswersParagraph = $('<p>');
    incorrectAnswersParagraph.attr("class", "text-center");
    incorrectAnswersParagraph.text("Incorrect Answers: " + incorrectAnswers);
    $('#question-area').append(incorrectAnswersParagraph);

    // Display the number of questions not answered
    var unansweredParagraph = $('<p>');
    unansweredParagraph.attr("class", "text-center");
    unansweredParagraph.text("Questions not answered: " + unansweredQuestions);
    $('#question-area').append(unansweredParagraph);

    //Display the game reset button
    var resetButton = $('<button>');
    resetButton.attr("class", "btn btn-dark btn-block reset-button");
    resetButton.attr('onclick', "location.href='index.html'")
    resetButton.text("Restart Game")
    $('#question-area').append(resetButton);
}

//Function resets the game
function resetGame() {
    //Resets the initial game variables
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredQuestions = 0;

    //Display the first question
    displayQuestion(currentQuestion);
}

// Timer object
var timer = {
    time: 3,

    start: function () {
        //Use setInterval to start the countdown
        intervalId = setInterval(timer.count, 1000);
    },
    stop: function () {
        //Use clearInterval to stop the count
        clearInterval(intervalId);
    },
    count: function () {
        //Decrement time by 1
        timer.time--;
        //Display the time remaining
        if (timer.time === 1) {
            $("#timer-display").text("Time Remaining: " + timer.time + " Second");
        } else {
            $("#timer-display").text("Time Remaining: " + timer.time + " Seconds");
        }

        //If the time runs out
        if (timer.time === 0) {

            //Stop the timer
            timer.stop();
            timer.reset();

            //Count the question as unanswered
            unansweredQuestions++;
            determineNextAction("unanswered");
        }
    },
    reset: function () {
        timer.time = 3;
    },
};

//Start the game once the document is ready
$(document).ready(function () {

    //Display the first question
    displayQuestion(currentQuestion);

    //When the user clicks on an answer, take action
    $(document).on('click', '.answer-choice-button', function () {

        timer.stop();
        timer.reset();

        // Determine which answer the user chose
        clickedButtonText = $(this)[0].innerText;
        correctAnwerText = questions[currentQuestion].correctAnswer;

        //Determine whether the user selected the correct or incorrect answer
        if (clickedButtonText == correctAnwerText) {
            answerCorrectness = "correct";
            correctAnswers++;
        } else {
            answerCorrectness = "incorrect";
            incorrectAnswers++;
        }

        determineNextAction(answerCorrectness);
    });

    //When the user clicks the reset button, restart the game
    $(document).on('click', '.reset-button', function () {
        resetGame();
    });
});