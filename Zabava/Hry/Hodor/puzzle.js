var puzzlesPos = [
    {
        posx : 0,
        posy : 0,
        move : true
    },
    {
        posx : 167,
        posy : 0,
        move : true
    },
    {
        posx : 225,
        posy : 0,
        move : true
    },
    {
        posx : 0,
        posy : 446,
        move : true
    },
    {
        posx : 167,
        posy : 223,
        move : true
    },{
        posx : 334,
        posy : 223,
        move : true
    },
    {
        posx : 167,
        posy : 590,
        move : true
    },
    {
        posx : 334,
        posy : 446,
        move : true
    },
    {
        posx : 410,
        posy : 446,
        move : true
    }
];
var timer = null;
var timePassed = 0;

randomPuzzlePlacement();
setTimer();
let puzzles = document.getElementsByClassName("puzzle");
for(let i = 0; i < puzzles.length; i++) {
    dragElement(i);
}

function dragElement(i) {
    var elmnt = puzzles[i];
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        if(puzzlesPos[i].move) {
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            lock(puzzlesPos[i], elmnt);
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function randomPuzzlePlacement() {
    let puzzles = document.getElementsByClassName("puzzle");
    for(let i = 0; i < puzzles.length; i++) {
        puzzles[i].style.left = Math.floor(Math.random() * 1000)  + "px";
        puzzles[i].style.top = Math.floor(Math.random() * 200) + 144 + "px";
        puzzles[i].style.transition = "transform .2s ease-in-out";
    }
}
function setTimer() {
    if (timer != null) return;
    timer = setInterval(function () {
        let date = new Date(null);
        date.setSeconds(timePassed);
        document.getElementById("time_counter").innerHTML = date.toISOString().substr(11, 8);
        timePassed++;
    }, 1000);
}
function lock(puzzlePos, puzzles){
    let posx = puzzlePos.posx;
    let posy = puzzlePos.posy;

    let x = parseInt(puzzles.style.left, 10);
    let y = parseInt(puzzles.style.top, 10);
    if((posx - 20) < x && x < (posx + 20)
        && (posy - 20) < y && y < (posy + 20)) {
        console.log("LOCK");
        puzzles.style.left = posx;
        puzzles.style.top = posy;
        puzzlePos.move = false;
        alllocked();
    }

}
function alllocked() {
    let win = true;
    let puzzles = document.getElementsByClassName("puzzle");
    for(let i = 0; i < puzzles.length; i++) {
        if (puzzlesPos[i].move !== false) {
            win = false;
            break;
        }
    }
    if(win) {
        alert("You have Won");
        setTimeout(function () {
            clearInterval(timer);
            timer = null;
        }, 100);
    }
}
function autocomplete() {
    let puzzles = document.getElementsByClassName("puzzle");
    for(let i = 0; i < puzzles.length; i++) {
        let x = puzzlesPos[i].posx;
        let y = puzzlesPos[i].posy;
        let posx = x - parseInt(puzzles[i].style.left, 10);
        let posy = y - parseInt(puzzles[i].style.top, 10);
        puzzles[i].style.transform = "translate3d(" + posx + "px, " + posy + "px, 0)";
    }
    alert("You have Lost");
    setTimeout(function () {
        clearInterval(timer);
        timer = null;
    }, 100);
}