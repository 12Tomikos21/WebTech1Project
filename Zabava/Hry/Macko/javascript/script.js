var time = null;
var passed_time = 0;

function startTimer() {
    if(time != null) return;
    time = setInterval(function(){
        let date = new Date(null);
        date.setSeconds(passed_time);
        let time = date.toISOString().substr(11, 8);

        document.getElementById("passed_time").innerHTML = time;

        passed_time++;
    }, 1000);
}


function drag(e) {
    if (active) {
        if (e.type === "touchmove") {
            e.preventDefault();

            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
        snapCheck(e, activeItem.currentX, activeItem.currentY, 20);

    }
}
function dragEnd(e) {
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
    }

    active = false;
    activeItem = null;
}
function snapCheck(e, xPos, yPos, tolerance) {
    let snapX = parseInt(e.target.getAttribute("snapX"));
    let snapY = parseInt(e.target.getAttribute("snapY"));
    if((snapX-tolerance) < xPos && xPos < (snapX+tolerance) && (snapY-tolerance) < yPos && yPos < (snapY+tolerance)) {
        setTranslate(snapX, snapY, e.target);
        dragEnd(e);
        onSnap(e);
    }

}

var activeItem = null;
var active = false;

var ctx = document.createElement("canvas").getContext("2d");


function dragStart(e) {
    if (e.target !== e.currentTarget) {
        if(e.target.getAttribute("snapped") == "true") return;
        active = true;

        // this is the item we are interacting with
        activeItem = e.target;

        if (activeItem !== null) {
            if (!activeItem.xOffset) {
                activeItem.xOffset = 0;
            }
            if (!activeItem.yOffset) {
                activeItem.yOffset = 0;
            }
            if (e.type === "touchstart") {
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            } else {
                console.log("doing something!");
                activeItem.xOffset = 0;
                activeItem.yOffset = 0;
                activeItem.initialX = e.clientX - activeItem.xOffset - parseInt(e.target.style.left, 10);
                activeItem.initialY = e.clientY - activeItem.yOffset - parseInt(e.target.style.top, 10);
            }
        }
    }
}



function onSnap(e) {
    e.target.setAttribute("snapped", "true");
    let state = document.getElementsByClassName("state");
    let allSnapped = true;

    for(let i = 0; i < state.length; i++) {
        let snapped = state[i].getAttribute("snapped");
        if(snapped != "true") {
            allSnapped = false;
            break;
        }
    }
    if(allSnapped == true) {
        setTimeout(function () {
            alert("win!");
            clearInterval(timer);
            timer = null;
        }, 100);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.left = xPos + "px";
    el.style.top = yPos + "px";
}


function run_demo(){
    let state = document.getElementsByClassName("state");

    for(let i = 0; i < state.length; i++) {
        let snapX = parseInt(state[i].getAttribute("snapX"));
        let snapY = parseInt(state[i].getAttribute("snapY"));
        let posx = snapX - parseInt(state[i].style.left, 10);
        let posy = snapY - parseInt(state[i].style.top, 10);
        state[i].style.transform = "translate3d(" + posx + "px, " + posy + "px, 0)";
        setTimeout(function () {
            state[i].style.removeProperty("transform");
        }, 3000);
    }
}


window.onload = function() {
    let wrapper = document.querySelector("#wrapper");
    wrapper.addEventListener("touchstart", dragStart, false);
    wrapper.addEventListener("touchend", dragEnd, false);
    wrapper.addEventListener("touchmove", drag, false);

    wrapper.addEventListener("mousedown", dragStart, false);
    wrapper.addEventListener("mouseup", dragEnd, false);
    wrapper.addEventListener("mousemove", drag, false);


    let state = document.getElementsByClassName("state");


    for(let i = 0; i < state.length; i++) {
        state[i].style.left = Math.floor(Math.random() * 1500) + "px";
        state[i].style.top = Math.floor(Math.random() * 700) + "px";
        state[i].style.transition = "transform .2s ease-in-out";
    }
    startTimer();
};