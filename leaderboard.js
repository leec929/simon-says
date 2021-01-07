loadBtn = document.getElementById('load-more');
rows = document.getElementsByTagName("tbody")[0].children;
var index = 10;
if(rows.length > 10) {
    for(let i = 10; i < rows.length; i++) {
        rows[i].style.visibility = "collapse";
    }
    loadBtn.addEventListener("click", function() {
        nextIndex = index + 10;
        while(index <= nextIndex && index < rows.length) {
            rows[index].style.visibility = "visible";
            index++;
        }
        if(index == rows.length) {
            loadBtn.style.visibility = "hidden";
        }
    });
} else {
    loadBtn.style.visibility = "hidden";
}