

window.onload = function() {
  let container = document.querySelector("#container");
  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);


  let regions = document.getElementsByClassName("item");

  
  for(let i = 0; i < regions.length; i++) {
      // regions[i].style.left = "0px";
      // regions[i].style.top = "0px";
      regions[i].style.left = Math.floor(Math.random() * 1000) + "px";
      regions[i].style.top = Math.floor(Math.random() * 500) + "px";
      regions[i].style.transition = "transform .2s ease-in-out";
  }
  startTimer();
};
//===========================================================
//---> Demo button
//===========================================================
    function showDemo(){
        let regions = document.getElementsByClassName("item");
        for(let i = 0; i < regions.length; i++) {
            //console.log(regions[i]);
          let snapX = parseInt(regions[i].getAttribute("snapX"));
          let snapY = parseInt(regions[i].getAttribute("snapY"));
          let posx = snapX - parseInt(regions[i].style.left, 10);
          let posy = snapY - parseInt(regions[i].style.top, 10);

          console.log(parseInt(regions[i].style.top, 10));

            regions[i].style.transform = "translate3d(" + posx + "px, " + posy + "px, 0)";
          setTimeout(function () {
              regions[i].style.removeProperty("transform");
          }, 3000);  	
        }	
    }
  //===========================================================
  //---> Timer (counter)
  //===========================================================
  var timer = null;
  var timePassed = 0;

  function startTimer() {
    
    if(timer != null) return;

    timer = setInterval(function(){
    let date = new Date(null);
    date.setSeconds(timePassed);

    let time = date.toISOString().substr(11, 8);
      document.getElementById("timePassed").innerHTML = time;
      timePassed++;
    }, 1000);
  }

  //===========================================================
  //---> Drag stuff
  //===========================================================
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
        console.log('Snap shit')
        setTranslate(snapX, snapY, e.target);
        dragEnd(e);
        onSnap(e);
      }

  }

  function onSnap(e) {
      e.target.setAttribute("snapped", "true");
  
      let regions = document.getElementsByClassName("item");
      let allSnapped = true;


      for(let i = 0; i < regions.length; i++) {
          let snapped = regions[i].getAttribute("snapped");
          if(snapped != "true")
          {
              allSnapped = false;
              break;
          }
      }

      console.log("Checking snapped...");
      if(allSnapped == true) {
          console.log("Everything snapped!")

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