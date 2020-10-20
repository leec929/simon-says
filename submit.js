// referenced https://stackoverflow.com/questions/15595652/focus-next-input-once-reaching-maxlength-value
// but modified it because I know all children are input elements
if(document.getElementById("initial-wrapper")) {
    document.getElementById("first-initial").focus();
    document.getElementById("initial-wrapper").onkeyup = function(event) {
        let target = event.target; // the item inside that was acted upon
        let isAlphaNumeral = ('0' <= event.key && event.key <= '9') || ('A' <= event.key && event.key <= 'Z') || (('a' <= event.key && event.key <= 'z'));
        if(!isAlphaNumeral) {
            event.target.value = ""; // reject non-alphanumeric input
        } else {
            if(target.value.length >= 1 && target.nextElementSibling != null) {
                target.nextElementSibling.focus(); // go to the next input
            } else { // pressed a key but did not fill
                if(event.key === "Backspace" && target.previousElementSibling != null) {
                    target.previousElementSibling.focus(); // go to the previous input if backspace
                }
            }
        }
    }
} else {
    console.log('Did not find the element with id "initial wrapper"');
}

document.getElementById("return-btn").addEventListener("click", function() {location.href="./start.html";})