window.onload = start;
var cellGrid;
var cellBackground;

function start() {
    puzzleCreate();

    document.addEventListener("mouseup", endBackground);
    //Click Show Solution
    document.getElementById("solve").addEventListener("click", function() {
      for(var i = 0; i < cellGrid.length; i++) {
        cellGrid[i].style.backgroundColor = "";
        }
      }
    );
    //Click Reset
    document.getElementById("reset").addEventListener("click", function () {
      for (var i = 0; i <cellGrid.length; i++) {
        cellGrid[i].style.backgroundColor = "rgb(255,255,255)";
      }
      resetStopWatch();
    }
  );

}//End function start


function puzzleCreate() {
    cellGrid = document.querySelectorAll("table#nonogramCell td");

    for (var i = 0; i < cellGrid.length; i++) {
        cellGrid[i].style.backgroundColor = "rgb(255,255,255)";

        cellGrid[i].onmousedown = changeBackground;
    }
    //Check the puzzle solution
    document.getElementById("nonogramCell").addEventListener("mouseup", function() {
        var check = true;
        for(var i = 0; i < cellGrid.length; i++) {
          if((cellGrid[i].className === "marked" && cellGrid[i].style.backgroundColor !== "rgb(128, 128, 128)")
            || (cellGrid[i].className === "unmarked" && cellGrid[i].style.backgroundColor === "rgb(128, 128, 128)")) {
              check = false;
              break;
          }
        }
        if(check) {
          alert("CONGRATULATION! ! ! YOU SOLVED THE PUZZLE IN " + displayHours + ":" + displayMinutes + ":" + displaySeconds);
          status = "started";
          startStop();
        }
    }
);

    var marked = document.querySelectorAll("table#nonogramCell td.marked");
    var unmarked = document.querySelectorAll("table#nonogramCell td.unmarked");

}

function changeBackground(e) {
  if(e.shiftKey) {
    cellBackground = "rgb(255,255,255)";
  }
  else {
    if (cellBackground == "rgb(255,255,255)") {
      cellBackground = "rgb(128,128,128)";
    }
    else {
      cellBackground = "rgb(128,128,128)";
    }
  }
  e.target.style.backgroundColor = cellBackground;
  for(var i = 0; i < cellGrid.length; i++) {
    cellGrid[i].addEventListener("mouseenter", BG);
  }
}

function BG(e) {
    e.target.style.backgroundColor = cellBackground;
}

function endBackground() {
    for(var i = 0; i < cellGrid.length; i++) {
        cellGrid[i].removeEventListener("mouseenter", BG);
    }

}



// Implement Stop Watch
let seconds = 0;
let minutes = 0;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let interval = null;

let status = "stopped";

function stopWatch(){

    seconds++;
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }
    }

    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }
    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}


function startStop(){

    if(status === "stopped"){

        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";

    }
    else{

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";

    }

}

function resetStopWatch(){

    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start";

}
