// created by Steve Lee & Andy Hong - Oct 2020

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
    $("#submitform").attr("action", "http://comet.cs.brynmawr.edu/~cwlee/simon-says/submit-score.php");
    resizeButtons(); // resize the buttons to fit the screen during game play according to window size
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
    resizeButtons();
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
 * When button is pressed, add the color to the sequence and check the sequence.
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
        if (userPattern.length === gamePattern.length){ // the level is done
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } else 
            wait = 0; // no reason to wait
    } else{ // sequence[i] for user and game do not match
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

/*
 * when a level is complete, this function is called to start the next sequence.
 * It increases the level and chooses a random color to show the new button chosen.
 */
function nextSequence() {
    userPattern = []; // reset the user sequence
    //show next level
    level++;
    $("#level-title").text("Level " + level);
    // choose a random button
    var randomNumber = Math.floor(Math.random() * 9);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // show the next button
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
    $("#playdatetime").val(getMySQLTime());
    $("#submitform").submit();
});

/*
 * a function that ensures that the button height is equal to its width.
 */
function resizeButtons() {
    let header = document.getElementById('level-title');
    let style = window.getComputedStyle(header);
    let headerHeight = parseFloat(style.marginTop) + parseFloat(style.marginBottom) + parseFloat(style.height);
    
    const marginPerc = 0.015;
    const borderPerc = marginPerc/2;
    const btnPerc = (1-(6*marginPerc + 6*borderPerc))/3.2;
    // console.log(`btnPerc = ${btnPerc}`);

    let docElem = document.documentElement;
    let body = document.getElementsByTagName('body')[0];
    let width = body.clientWidth || window.innerWidth || docElem.clientWidth;
    let height = window.innerHeight || docElem.clientHeight || body.clientHeight;

    let remainHeight = height - headerHeight;
    let shorter = Math.min(width, remainHeight);
    // console.log(`remainingHeight ${remainHeight},  width = ${width}, shorter = ${shorter}`);

    let btnSize = Math.floor(shorter * btnPerc);
    let marginSize = Math.floor(shorter * marginPerc);
    let borderWidth = Math.floor(shorter * borderPerc)
    // console.log(`btnSize = ${btnSize}, marginSize = ${marginSize}`);

    for(bttn of document.querySelectorAll('.btn')) {
        bttn.style.height = btnSize + "px";
        bttn.style.width = btnSize + "px";
        bttn.style.margin = marginSize + "px";
        bttn.style.borderWidth = borderWidth + "px";
    }
}
window.addEventListener('resize', resizeButtons); // on window resize, resize the buttons