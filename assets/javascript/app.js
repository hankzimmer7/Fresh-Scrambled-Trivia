//TODO:

//Add random gudetama gifs to the displayCorrectAnswer function

//Link assignment to portfolio

//Define the variables used in the game
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;

// Declare and set the timing variables
var secondsPerQuestion = 10;
var correctAnswerDisplayTime = 10;

// Variable that will hold our setInterval that runs the time
var intervalId;

//Define an array of questions
var questions = [{
        question: "Eggshells can be used in treating osteoporosis due to containing what chemical compound?",
        answerChoices: ["Vitamin D", "Calcium Carbonate", "Calcium Bicarbonate", "Sodium Flouride"],
        correctAnswer: "Calcium Carbonate",
        additionalInfo: "Calcium carbonate is a helpful supplement in treating osteoporosis. It also can help reduce acidity in coffee. Just add a few eggshells to your cup!"
    },
    {
        question: "Chickens what lay brown eggs typically have what color of feathers?",
        answerChoices: ["Red", "White", "Black", "Brown"],
        correctAnswer: "Red",
        additionalInfo: "Typically chickens with red feathers and earlobes lay brown eggs. They are usually larger, which is why brown eggs are more expensive."
    },
    {
        question: "The edible portion of a chicken's egg is what percentage water?",
        answerChoices: ["15%", "57%", "74%", "86%"],
        correctAnswer: "74%",
        additionalInfo: "The edible part of a chicken's egg is approximately 74% water, 12% protein, and 11% fat."
    },
    {
        question: "What color is a fresh egg white?",
        answerChoices: ["Clear", "Light Yellow", "Shiny Pink", "Cloudy White"],
        correctAnswer: "Cloudy White",
        additionalInfo: "As far as egg white color goes, cloud means it's fresh. Clear indicated it's aging. Pink, iridescent, or any other color means throw it away!"
    },
    {
        question: "An average chicken produces eggs for what period of their life?",
        answerChoices: ["6 months", "12 months", "24 months", "36 months"],
        correctAnswer: "24 months",
        additionalInfo: "An average chicken is able to lay eggs over a 2 year period and lays an average of 270-320 eggs per year."
    },
    {
        question: "Which country produces the most eggs each year?",
        answerChoices: ["The United States", "China", "Mexico", "Australia"],
        correctAnswer: "China",
        additionalInfo: "China produces about 160 billion eggs per year, making it the largest egg producer in the world"
    },
    {
        question: "The oldest recipes containing eggs are for what type of dish?",
        answerChoices: ["Breads", "Sauces", "Casseroles", "Eggs On Their Own"],
        correctAnswer: "Breads",
        additionalInfo: "While use of eggs dates back to prehistoric times, culinary evidence suggests the first documented recipes using eggs were for breads and cakes (as a binding agent)."
    },
    {
        question: "The thickness of an egg's shell primarily depends upon what factor?",
        answerChoices: ["Chicken Breed", "Chicken Size", "Chicken Age", "Egg Color"],
        correctAnswer: "Chicken Age",
        additionalInfo: "The thickness of an egg depends on the age of the chicken. While young chickens lay eggs with thicker shells, old chickens lay eggs with thinner shells. This is the case regardless of the chicken breed or egg color."
    },
    {
        question: "Which factor is NOT part of determingn an egg's grade?",
        answerChoices: ["Quality of the Shell", "Breed of the Chicken", "Quality of the Yolk", "Size of the Air Cell"],
        correctAnswer: "Breed of the Chicken",
        additionalInfo: "Egg grade refers to a measurement of the quality of the shell, quality of the white and yolk, and the size of the air cell."
    },
    {
        question: "What unique ingredient do chefs often add to turn egg whites into meringue?",
        answerChoices: ["Baking", "Corn Syrup", "Cream of Tartar", "Heavy Cream"],
        correctAnswer: "Cream of Tartar",
        additionalInfo: "Adding a small amount of cream of tartar (an acidic by-product from wine making) helps stablilize and add volume to egg whites when whipping them."
    },
]

//Function to determine what to do next, whether the timer has run out or whether the user has clicked an answer
function determineNextAction(answerCorrectness) {

    //Display whether the answer was correct on incorrect
    displayCorrectAnswer(currentQuestion, answerCorrectness);

    // If this is the last question, display the results
    if (currentQuestion === questions.length - 1) {
        setTimeout(function () {
            displayResults()
        }, correctAnswerDisplayTime * 1000);
    }

    // If this isn't the last question, move on to the next question
    else {
        //Increment to the next question
        currentQuestion++;

        //Display the next question after 3 seconds
        setTimeout(function () {
            displayQuestion(currentQuestion)
        }, correctAnswerDisplayTime * 1000);
    }
}

//Function to display the start button for when the page loads
function displayStartButton() {

    //Clear the game area
    $('#question-area').empty();

    //Display an image on the start screen
    var image = $('<img>');
    image.attr("class", "img-fluid my-5");
    image.attr("src", "assets/images/start-game.jpg");
    $('#question-area').append(image);

    //Display the game start button
    var startButton = $('<button>');
    startButton.attr("class", "btn btn-dark btn-block btn-lg start-button");
    startButton.text("Take a crack at it!")
    $('#question-area').append(startButton);
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
        button.attr("class", "btn btn-outline-warning btn-block answer-choice-button font-weight-bold answer-choice" + i);
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
    wasItCorrect.attr("class", "text-center display-4 text-warning");
    if (answerCorrectness === "correct") {
        wasItCorrect.text("Egg-cellent answer!");
    } else if (answerCorrectness === "incorrect") {
        wasItCorrect.text("That answer was a little rotten...");
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
    var correctAnswerParagraph = $('<p>');
    correctAnswerParagraph.attr("class", "text-center");
    correctAnswerParagraph.text("Correct Answer: " + questions[questionNumber].correctAnswer);
    $('#question-area').append(correctAnswerParagraph);

    // Display additional info
    var additionalInfoParagraph = $('<p>');
    additionalInfoParagraph.attr("class", "text-center");
    additionalInfoParagraph.text(questions[questionNumber].additionalInfo);
    $('#question-area').append(additionalInfoParagraph);

}

//Function to display the final score after the user has answered all of the questions
function displayResults() {

    //Clear the currently displayed information
    $('#question-area').empty();

    //Create a paragraph to hold the results
    var resultsParagraph = $('<p>');
    resultsParagraph.attr("class", "text-center display-4 text-warning");

    //Create an image tag to hold the image
    var image = $('<img>');
    image.attr("class", "mx-auto my-2 d-block");

    //If the player answered half or more correct
    if (correctAnswers >= 5) {
        resultsParagraph.text("Wasn't that (over)EASY??");
        image.attr("src", "assets/images/good-results.png");
    } else {
        resultsParagraph.text("That was a HARD(boiled) one!!");
        image.attr("src", "assets/images/poor-results.png");
    }

    //Append the results paragraph and image to the page
    $('#question-area').append(resultsParagraph);
    $('#question-area').append(image);


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
    time: secondsPerQuestion,

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
        timer.time = secondsPerQuestion;
    },
};

//Start the game once the document is ready
$(document).ready(function () {

    //Display the start button
    displayStartButton();

    //When the start button is clicked
    $(document).on('click', '.start-button', function () {

        //Display the first question
        displayQuestion(currentQuestion);

    });

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