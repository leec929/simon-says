document.getElementById("how-button").addEventListener("click", toggleInstructions)
document.getElementById("close-button").addEventListener("click", toggleInstructions)

function toggleInstructions() {
    let instructions = document.getElementById('how-to-wrapper');
    console.log("toggling!");
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