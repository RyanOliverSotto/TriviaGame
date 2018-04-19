/*___________________Technology Division____________________
Languages used: jQuery, Javascript, HTML, CSS
Option One: Basic Triva Quiz (Timed Form)

_____________________Project Requirements___________________
You'll create a trivia form with multiple choice or true/false options (your choice).

The player will have a limited amount of time to finish the quiz. 


The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.


Don't let the player pick more than one answer per question.
Don't forget to include a countdown timer.

_____________________Pseudocode Division______________________
One the landing page there will be a simple header and button.
Upon the submit event of the button, the quiz will start.

Division1 will display a timer.

Division2 will contain 2 nested for loops.
Loop 1 for the length of the array of questions
    $write the html for the questions to the page
        Loop 2 for the length of the radio buttons
            $write the html of the radio buttons to the page
At the end of the loop $write a submit button
The game will end upon the countdown = 0 or if user hits submit.
$write the results to the html page
Provide option to reset the game and start over.

3 variables to
1) Right 
2) Wrong 
3) Unanswered 
4) Hold the user selection

An object with 2 arrays
Question 1 array
Radio Buttons 2 Array
Right Answer
*/
let userPick = [];
let correctAnswers = 0;
let wrongAnswers = 0;
let missedAnswers = 0;
let timeDisplay;
let counter = 61;
let intervalID;
let questions = [{
    question: "What was is Shaggy's real first name?",
    choices: ["Michael", "Johnathan", "Norville", "Elmer"],
    answer: 2
},
{
    question: "What breed of dog is Scooby Doo?",
    choices: ["Great Dane", "Irish Wolfhound", "German Shepard", "Bloodhound"],
    answer: 0
},
{
    question: "Which of the Scooby Doo gang has the catchphrase 'JINKIES!'",
    choices: ["Fred", "Velma", "Daphne", "Scooby Doo"],
    answer: 1
},
{
    question: "What is the last name of Fred?",
    choices: ["Johnson", "Smith", "Jones", "Appleton"],
    answer: 2
},
{
    question: "What is the name of the van the Scooby gang travels in?",
    choices: ["Mystery Busters", "Mystery Machine", "Ghost Adventures", "BloodHound Gang"],
    answer: 1
},
{
    question: "In what year did Scooby Doo debut on national television?",
    choices: ["1972", "1965", "1969", "1970"],
    answer: 3
},
{
    question: "Which television network was the first to air Scooby Doo?",
    choices: ["CBS", "ABC", "NBC", "PBS"],
    answer: 0
},
{
    question: "1985s Thirteen Ghosts of Scooby Doo featured which new character?",
    choices: ["Bill the Cat", "Scrappy Doo", "Scooby Dee", "Vincent Van Ghoul"],
    answer: 3
},
{
    question: "What is the full name of Scooby Doo?",
    choices: ["Prince Scooby", "Scooby Dooby Do", "Scoobert", "Scooby Rex"],
    answer: 2
},
{
    question: "What was the catchphrase of Scrappy Doo?",
    choices: ["Puppy Power", "Lemme at him!", "Clobbering Time!", "Paw Paw Paw Punch!"],
    answer: 0
}
];
//To capture the missed responses, populate the userPick array with all nulls equal to the length of the questions object
for (var i = 0; i < questions.length; i++) {
    userPick[i] = null;
}

//Optional sounds
let audioClick = new Audio("assets/sounds/mouse_click.wav");

//Quiz starts here with ready function
$(document).ready(function () {
    $("#startGame").click(function () {
        audioClick.play();
        //Attach the setInterval object to a variable so that we can stop it later
        intervalID = setInterval(decrement, 1000);
        //Use jQuery to call the function to write the questions to the html
        writeQuestions();
        $("#startGame").hide();
        writeSubmitButton();

        $("#submitQuiz").click(function () {
            //alert("I was clicked!");
            audioClick.play();
            showResults();
        });
        //This is the listener that will record the function that tracks what the user has clicked
        //This works because we structured the radio button groups with index x and i
        //This allows me to know what question the user picked (i) and the response (value).
        $("input").click(function () {
            audioClick.play();
            userPick[this.name] = this.value;
        });


    });
});

//Use a nested for loop to go through each question and each radio button option and write to page
function writeQuestions() {
    for (var i = 0; i < questions.length; i++) {
        $("#formQuiz").append(questions[i].question + "</br></br>");
        for (var x = 0; x < questions[i].choices.length; x++) {
            $("#formQuiz").append("<label class='radio-inline'><input value='" + x + "' type='radio' name='" + i + "'>" + questions[i].choices[x] + "</label></br></br>");
        }
    }
}
//Write the button to submit the form 
function writeSubmitButton() {
    $("#formSubmit").append("<button id='submitQuiz' class='btn btn-primary btn-lg'>Submit</button>");
}

//Taken directely from the class exercises
function decrement() {
    counter--;
    $("#timeRemaining").html("<h2><mark>" + counter + " seconds remaining.</mark></h2>");
    if (counter === 0) {
        alert("Time Up!");
        //Do additional logic and process the quiz results
        showResults();
    }
}
//Write the results to the HTML
function showResults() {
    $("#formQuiz").hide();
    $("#timeRemaining").hide();
    $("#submitQuiz").hide();
    for (i = 0; i < questions.length; i++) {
        if (questions[i].answer == userPick[i]) {
            correctAnswers++;
        }
        else if (userPick[i] === null) {
            missedAnswers++;
        }
        else {
            wrongAnswers++;
        }
    }
    let qR = $("#quizResults");
    qR.append("<p>ALL DONE!</p>");
    qR.append("<p>Correct Answers: " + correctAnswers + "</p>");
    qR.append("<p>Incorrect Answers: " + wrongAnswers + "</p>");
    qR.append("<p>Unanswered: " + missedAnswers + "</p>");
    clearInterval(intervalID);
}

