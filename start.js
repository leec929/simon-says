// leaderboard always goes to comet since it's a php file
document.getElementById("leader-button").addEventListener("click", function() {location.href="http://comet.cs.brynmawr.edu/~cwlee/cs380-projects/leaderboard.php";})

// go to the game page when the start button is clicked
document.getElementById("start-button").addEventListener("click", function() { location.href = "./game.html"; })

// open or close the instructions pop-up
document.getElementById("how-button").addEventListener("click", toggleInstructions)
document.getElementById("close-button").addEventListener("click", toggleInstructions)

// if esc was pressed and the how-to page is shown, don't show it
addEventListener('keydown', function(e) {
    if(e.key == "Escape") {
        let instr = document.getElementById('how-to-wrapper');
        if(instr.style.visibility != "hidden") {
            instr.style.visibility = "hidden";
            instr.style.opacity = "0";
        }
    }
});

// if it's visible, don't make it visible. otherwise, make it visible.
function toggleInstructions() {
    let instructions = document.getElementById('how-to-wrapper');
    if(instructions.style.visibility == "hidden") {
        instructions.style.visibility = "visible";
        instructions.style.opacity = '1';
    } else {
        instructions.style.visibility = "hidden";
        instructions.style.opacity = '0';
    }
    // visibility reference https://stackoverflow.com/questions/40446658/javascript-add-transition-between-displaynone-and-displayblock
}

// close the instructions when clicked outside
addEventListener('click', function(e) {
    if(e.target.id !== "how-button") {
        if (!e.target.closest("#how-to")) {
            document.getElementById('how-to-wrapper').style.visibility = "hidden";
        }
    }
});