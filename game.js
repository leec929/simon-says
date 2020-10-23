var buttonColors = ["green", "red", "cyan", "yellow", "ivory", "blue", "pink", "purple", "orange"];

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;
var score = 0;

var wait = 0; // to disable click event handler while nextsequence() is happening.

$(document).ready( function () {
    $("#yourscore").hide();
    $("#submitform").attr("action", "http://comet.cs.brynmawr.edu/~cwlee/cs380-projects/submit-score.php");
    aspectButtons();
}); // make the button height be equal to width at startup regardless of device

$(document).keypress(function() { startGame(); })

$("#playbtn").click(function() {
    startGame();
});

function startGame() {
    $("#endGame1").text("");
    $("#endGame2").text("");
    $("#yourscore").hide();
    $("#level-title").text("Level " + level);
    started = true;
    $(".utilbtn").hide();
    $("#playbtn").text("Restart");
    // move these up in case user presses a wrong button within the timeout of nextSequence()
    level = 0;
    gamePattern = [];
    nextSequence();
}

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
    wait = 1;
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } else
            wait = 0;
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
    wait = 0;
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

function startOver() {
    started = false;
    score = level - 1;
    $("#yourscore").text("Your score: " + score);
    $("#yourscore").show();
    $(".utilbtn").show();
}


// what's the problem here? ts1005 "," expected
// $(document).keypress(funciton() {
//     if (!started) {
//         $("#level-title").text("Level " + level);
//         nextSequence();
//         started = true;
//     }
// })

function aspectButtons() {
    let buttons = document.querySelectorAll('.btn');
    for(bttn of buttons) {
        bttn.style.height = getComputedStyle(bttn).width;
    }
}
// on window resize, to make the buttons 1:1 aspect ratio
window.addEventListener('resize', aspectButtons); 

function getTwoDigits(num) { return ("0" + num).slice(-2); }
function getMySQLTime() {
    let now = new Date();
    return `${now.getFullYear()}-${getTwoDigits(now.getMonth()+1)}-${getTwoDigits(now.getDate())} ${getTwoDigits(now.getHours())}:${getTwoDigits(now.getMinutes())}:${getTwoDigits(now.getSeconds())}`;
}

$("#submitbtn").click(function() {
    $("#score").val(score);
    let now = new Date();
    $("#playdatetime").val(getMySQLTime());
    $("#submitform").submit();
});