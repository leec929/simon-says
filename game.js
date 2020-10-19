var buttonColors = ["green", "red", "cyan", "yellow", "ivory", "blue", "pink", "purple", "orange"];

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    $("#endGame1").text("");
    $("#endGame2").text("");
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userPattern.length-1);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over. Press Any Key to Restart");
        $("#endGame1").text("The correct sequence is: " + gamePattern.toString());
        $("#endGame2").text("Your selected seuence is: " + userPattern.toString());

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
    level = 0;
    gamePattern = [];
    started = false;
}


// what's the problem here? ts1005 "," expected
// $(document).keypress(funciton() {
//     if (!started) {
//         $("#level-title").text("Level " + level);
//         nextSequence();
//         started = true;
//     }
// })
