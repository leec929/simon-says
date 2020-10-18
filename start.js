document.getElementById("how-button").addEventListener("click", toggleInstructions)
document.getElementById("close-button").addEventListener("click", toggleInstructions)

document.getElementById("leader-button").addEventListener("click", function() {
    alert("TODO");
})

addEventListener('keydown', function(e) {
    // console.log("Key pressed was " + e.key);
    if(e.key == "Escape") {
        let instr = document.getElementById('how-to-wrapper');
        if(instr.style.visibility != "hidden") {
            instr.style.visibility = "hidden";
            instr.style.opacity = "0";
            console.log('closing instr')
        }
    }
});

function toggleInstructions() {
    let instructions = document.getElementById('how-to-wrapper');
    if(instructions.style.visibility == "hidden") {
        instructions.style.visibility = "visible";
        instructions.style.opacity = '1';
    } else {
        instructions.style.visibility = "hidden";
        instructions.style.opacity = '0';
    }
    // visibility sounds nice https://stackoverflow.com/questions/40446658/javascript-add-transition-between-displaynone-and-displayblock
    // if visible, make it none - and vice versa.
}