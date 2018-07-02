// Define the variables used in the game
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;

//  Variable that will hold our setInterval that runs the time
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


//Defines a function to display a question and its possible answers to the user
displayQuestion = function (questionNumber) {

    //Clear the currently displayed information
    $('#question-area').empty();

    //Stop and reset the timer
    timer.stop();
    timer.reset();

    //Start the timer and display the time remaining
    timer.start();
    var timerDisplay = $('<p>');
    timerDisplay.attr("id", "timer-display");
    timerDisplay.attr("class", "text-center");
    timerDisplay.text("Time Remaining: 30 Seconds");
    $('#question-area').append(timerDisplay);

    //Display the question
    var questionStatement = $('<p>');
    questionStatement.attr("class", "text-center");
    questionStatement.text(questions[questionNumber].question);
    $('#question-area').append(questionStatement);

    //Loop through the answers and create a button for each
    for (var i = 0; i < 4; i++) {
        var button = $('<button>');
        button.attr("class", "btn btn-light btn-block" + " answer-choice" + i);
        button.text(questions[questionNumber].answerChoices[i]);
        $('#question-area').append(button);
    }
}

displayCorrecAnswer = function (questionNumber, correctAnswerChosen) {

    //Clear the currently displayed information
    $('#question-area').empty();

    //Stop and reset the timer
    timer.stop();
    timer.reset();

    //Display whether the user was correct or incorrect
    var wasItCorrect = $('<p>');
    wasItCorrect.attr("class", "text-center");
    if (correctAnswerChosen) {
        wasItCorrect.text("Correct!");
    } else {
        wasItCorrect.text("Incorrect!");
    }

    $('#question-area').append(wasItCorrect);
}


// Timer object
var timer = {
    time: 30,

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
        $("#timer-display").text("Time Remaining: " + timer.time + " Seconds");
    },
    reset: function () {
        timer.time = 30;
    },
};

//Start the game once the document is ready
$(document).ready(function () {

    //Display the first question
    displayQuestion(currentQuestion);

    //When the user clicks on an answer, take action
    $(document).on('click', '.btn', function () {

        timer.stop();
        timer.reset();

        // Determine which answer the user chose
        clickedButtonText = $(this)[0].innerText;
        correctAnwerText = questions[currentQuestion].correctAnswer;
        // console.log(clickedButtonText);
        // console.log("Correct Text: " + correctAnwerText);

        //Take action depending on whether the user selected the correct or incorrect answer
        if (clickedButtonText == correctAnwerText) {
            correctAnswerChosen = true;
            correctAnswers++;
        } else {
            correctAnswerChosen = false;
            incorrectAnswers++;
        }
        
        //Display whether the answer was correct on incorrect
        displayCorrecAnswer(currentQuestion, correctAnswerChosen);
                        
                if (currentQuestion === questions.length - 1) {
                    alert("End of Game!")
                } else {

            //Increment to the next question
            currentQuestion++;
            console.log("current question: " + currentQuestion);


            //Display the next question after 3 seconds
            setTimeout(function () {displayQuestion(currentQuestion)}, 3000);
        }

    });
});