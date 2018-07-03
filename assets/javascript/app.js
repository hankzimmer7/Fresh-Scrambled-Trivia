//Define the variables used in the game
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;

// Declare and set the timing variables
var secondsPerQuestion = 15;
var correctAnswerDisplayTime = 15;

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
        additionalInfo: "An average chicken is able to lay eggs over a 2-year period and lays an average of 270-320 eggs per year."
    },
    {
        question: "Which country produces the most eggs each year?",
        answerChoices: ["The United States", "China", "Mexico", "Australia"],
        correctAnswer: "China",
        additionalInfo: "China produces about 160 billion eggs per year, making it the largest egg producer in the world."
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
        question: "Which factor is NOT part of determining an egg's grade?",
        answerChoices: ["Quality of the Shell", "Breed of the Chicken", "Quality of the Yolk", "Size of the Air Cell"],
        correctAnswer: "Breed of the Chicken",
        additionalInfo: "Egg grade refers to a measurement of the quality of the shell, quality of the white and yolk, and the size of the air cell."
    },
    {
        question: "What unique ingredient do chefs often add to turn egg whites into meringue?",
        answerChoices: ["Baking Soda", "Corn Syrup", "Cream of Tartar", "Heavy Cream"],
        correctAnswer: "Cream of Tartar",
        additionalInfo: "Adding a small amount of cream of tartar (an acidic by-product from wine making) helps stablilize and add volume to egg whites when whipping them."
    },
]

//Function to display the start button for when the page loads
function displayStartButton() {

    //Clear the game area
    $('#question-area').empty();

    //Display an image on the start screen
    var image = $('<img>');
    image.attr("class", "my-5 mx-auto d-block");
    image.attr("id", "start-image");
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
    questionTimer.start();
    var timerDisplay = $('<p>');
    timerDisplay.attr("id", "timer-display");
    timerDisplay.attr("class", "text-center");
    timerDisplay.text("Time remaining: " + questionTimer.time + " seconds");
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
        wasItCorrect.text("Watch that egg timer!")
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

    //Start the timer for when the next question is displayed
    answerDisplayTimer.start();

    //Display the next question button
    var nextButton = $('<button>');
    nextButton.attr("class", "btn btn-dark btn-block next-question-button");

    //Update the timer display. Display "Results in x seconds" if it is the last question. Otherwise display "next question in x seconds"
    if (currentQuestion === questions.length - 1) {
        nextButton.text("Results in " + answerDisplayTimer.time + " seconds");
    } else {
        nextButton.text("Next question in " + answerDisplayTimer.time + " seconds");
    }

    //Append the next question button to the page
    $('#question-area').append(nextButton);

    //Add a random gutetama gif
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=gudetama";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var imageUrl = response.data.image_original_url;
        var image = $("<img>");
        image.attr("src", imageUrl);
        image.attr("class", "img-fluid d-block mx-auto mt-4");
        image.attr("alt", "gudetama gif");
        $("#question-area").append(image);
      });
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
    unansweredParagraph.text("Questions Not Answered: " + unansweredQuestions);
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

//Function to determine what to do next, whether to move on to the next question or move on to the results. This function is called if the questionTimer has run out or if the user has clicked an answer
function nextQuestionOrResults() {

    // If this is the last question, display the results
    if (currentQuestion === questions.length - 1) {
        displayResults();
    }

    // If this isn't the last question, move on to the next question
    else {
        //Increment to the next question
        currentQuestion++;
        //Display the next question
        displayQuestion(currentQuestion);
    }
}

//Timer object for the countdown during questions
var questionTimer = {
    time: secondsPerQuestion,
    start: function () {
        //Use setInterval to start the countdown
        intervalId = setInterval(questionTimer.count, 1000);
    },
    stop: function () {
        //Use clearInterval to stop the count
        clearInterval(intervalId);
    },
    count: function () {
        //Decrement time by 1
        questionTimer.time--;
        //Display the time remaining
        if (questionTimer.time === 1) {
            $("#timer-display").text("Time remaining: " + questionTimer.time + " second");
        } else {
            $("#timer-display").text("Time remaining: " + questionTimer.time + " seconds");
        }
        //If the time runs out
        if (questionTimer.time === 0) {
            //Stop the timer
            questionTimer.stop();
            questionTimer.reset();
            //Count the question as unanswered
            unansweredQuestions++;
            //Display whether the answer was correct or incorrect
            displayCorrectAnswer(currentQuestion, "unanswered");
        }
    },
    reset: function () {
        questionTimer.time = secondsPerQuestion;
    },
};

//Timer object for the countdown during correct answer reveals
var answerDisplayTimer = {
    time: correctAnswerDisplayTime,
    start: function () {
        //Use setInterval to start the countdown
        answerDisplayInterval = setInterval(answerDisplayTimer.count, 1000);
    },
    stop: function () {
        //Use clearInterval to stop the count
        clearInterval(answerDisplayInterval);
    },
    count: function () {
        //Decrement time by 1
        answerDisplayTimer.time--;
        //Display the time remaining

        //Update the timer display. Display "Results in x seconds" if it is the last question. Otherwise display "next question in x seconds"
        if (currentQuestion === questions.length - 1) {
            if (answerDisplayTimer.time === 1) {
                $(".next-question-button").text("Results in " + answerDisplayTimer.time + " second");
            } else {
                $(".next-question-button").text("Results in " + answerDisplayTimer.time + " seconds");
            }
        } else {
            if (answerDisplayTimer.time === 1) {
                $(".next-question-button").text("Next question in " + answerDisplayTimer.time + " second");
            } else {
                $(".next-question-button").text("Next question in " + answerDisplayTimer.time + " seconds");
            }
        }
        //When the time runs out
        if (answerDisplayTimer.time === 0) {
            //Stop the timer
            answerDisplayTimer.stop();
            answerDisplayTimer.reset();
            //Move on to the next question or display the results
            nextQuestionOrResults();
        }
    },
    reset: function () {
        answerDisplayTimer.time = correctAnswerDisplayTime;
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

        questionTimer.stop();
        questionTimer.reset();

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
        //Display whether the answer was correct or incorrect
        displayCorrectAnswer(currentQuestion, answerCorrectness);
    });

    //When the user clicks the next question button, move on to the next question
    $(document).on('click', '.next-question-button', function () {
        answerDisplayTimer.stop();
        answerDisplayTimer.reset();
        nextQuestionOrResults();
    });

    //When the user clicks the reset button, restart the game
    $(document).on('click', '.reset-button', function () {
        resetGame();
    });
});