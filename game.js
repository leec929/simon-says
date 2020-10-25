// created by steve Lee & Andy Hong - Oct 2020

var buttonColors = ["green", "red", "cyan", "yellow", "ivory", "blue", "pink", "purple", "orange"];

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;
var score = 0;

var wait = 0; // to disable click event handler while nextsequence() is happening.

/*
 * When page is ready, hide the score element, set the form action for submitting score,
 * and ensure the buttons have a 1:1 aspect ratio
 */
$(document).ready( function () {
    $("#yourscore").hide();
    $("#submitform").attr("action", "http://comet.cs.brynmawr.edu/~cwlee/cs380-projects/submit-score.php");
    aspectButtons(); // make the button height be equal to width at startup regardless of device
}); 

/*
 * Start the game on keypress if "started" is false.
 */
$(document).keypress(function() {
    if(!started) {
        startGame();
    }
})

/*
 * Alternatively start the game when the start button is clicked and "started" is false
 * Added for mobile users.
 */
$("#playbtn").click(function() {
    if(!started) {
        startGame();
    }
});

/*
 * start the game by resetting the level and the sequence, and setting started to true.
 * also hide the elements that should not show during game.
 */
function startGame() {
    $("#endGame1").text("");
    $("#endGame2").text("");
    $("#yourscore").hide();
    started = true;
    $(".utilbtn").hide(); // start and submit buttons
    $("#playbtn").text("Restart"); // make the start button be "restart" after the first time playing
    // moved these lines up from startOver() since starting should be 0
    // but user presses a wrong button within the timeout of nextSequence() can mess it up
    // (also mitigated by not letting the user press a button during nextSequence() with wait variable)
    level = 0;
    gamePattern = [];
    $("#level-title").text("Level " + level);
    nextSequence();
}

/*
 * TODO: comment
 * "wait" added to disallow users from clicking when next sequence is happening -- see checkAnswer() & nextSequence()
 */
$(".btn").click(function() {
    if(started && !wait) {
        var userChosenColor = $(this).attr("id");
        userPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userPattern.length-1);
    }
})

function checkAnswer(currentLevel) {
    wait = 1; // checking and possibly moving to next sequence... don't allow clicking
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } else
            wait = 0; // no reason to wait
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over. Press Any Key to Restart");
        $("#endGame1").text("The correct sequence is: " + gamePattern.join(', '));
        $("#endGame2").text("Your selected sequence is: " + userPattern.join(', '));

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 9);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    wait = 0; // done showing the next sqeuence, stop waiting.
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// reset game
function startOver() {
    started = false; // finished
    score = level - 1; // current score = all levels passed - current level
    // set the score text and show score
    $("#yourscore").text("Your score: " + score);
    $("#yourscore").show();
    $(".utilbtn").show(); // show restart and submit buttons
}


/*
 * a function that ensures that the button height is equal to its width.
 */
function aspectButtons() {
    let buttons = document.querySelectorAll('.btn');
    for(bttn of buttons) {
        bttn.style.height = getComputedStyle(bttn).width;
    }
}
window.addEventListener('resize', aspectButtons); // on window resize, to make the buttons 1:1 aspect ratio (squares)

function getTwoDigits(num) { return ("0" + num).slice(-2); } // necessary for mysql datetime syntax?

/*
 * gets the current datetime and puts it in mysql syntax
 */
function getMySQLTime() {
    let now = new Date();
    return `${now.getFullYear()}-${getTwoDigits(now.getMonth()+1)}-${getTwoDigits(now.getDate())} ${getTwoDigits(now.getHours())}:${getTwoDigits(now.getMinutes())}:${getTwoDigits(now.getSeconds())}`;
}

/*
 * sets the score and datetime input values and submits them to
 * submit-score.php as specified by the action location
 */
$("#submitbtn").click(function() {
    $("#score").val(score);
    let now = new Date();
    $("#playdatetime").val(getMySQLTime());
    $("#submitform").submit();
});