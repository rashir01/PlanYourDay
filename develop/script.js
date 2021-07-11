//TODO: get element using jquery
const currentDayEl = document.getElementById("currentDay");
const START_TIME = 8;
const END_TIME = 19;

currentDayEl.textContent = moment().format("dddd, MMM Do");

/* 
    Function determinesTimeState
    purpose: given an input hour, the function will determine where it occurs in relation to the current hour
    input: inputHour is the hour to compare to current hour
    return: string: "past" if the input hour occurs before the current hour
                    "present" if the input hour is the same as the current hour
                    "future" if the input hour is ahead of the current hour
*/
function determineTimeState(inputHour) {
    let currentHour = moment().format("H");
    if (inputHour < currentHour) return "past";
    if (inputHour == currentHour) return "present";
    if (inputHour > currentHour) return "future";
}

function addRow(time) {
    //TODO: create the elements using jQuery
    //create a row element
    let currentHour = moment().format("H");
    let presentState = "";
    /*
    fix bug with pm time showing future
    */
    presentState = determineTimeState(time);

    let hourToDisplay = moment(time, ["H"]).format("h:mm A");

    let rowEl = document.createElement("div");
    rowEl.classList.add("time-block", presentState, "row");

    let hourEl = document.createElement("div");
    hourEl.classList.add("hour","col-2", "col-md-1");
    hourEl.textContent = hourToDisplay;

    let textAreaEl = document.createElement("textarea");
    textAreaEl.value = localStorage.getItem("slot-" + time);
    textAreaEl.classList.add("col");
    

    let buttonEl = document.createElement("button");
    buttonEl.classList.add("saveBtn","col-2",  "col-md-1","fas", "fa-save");
    buttonEl.onclick = function (event) {
        localStorage.setItem("slot-"+time, event.target.previousElementSibling.value )
        console.log(event.target.previousElementSibling.value);
        console.log(event.target);
    };

    rowEl.appendChild(hourEl);
    rowEl.appendChild(textAreaEl);
    rowEl.appendChild(buttonEl);

    $(".container").append(rowEl);
}

for (let i = START_TIME; i < END_TIME; i++) {
    addRow(i)
}
