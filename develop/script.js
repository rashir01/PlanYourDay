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

/*
    Function createRowDiv
    purpose: creates a div to be used as a row to which the time, text area, and button will attach
    input: presentState is a string that will be added to the class list of the row. It will determine the css formatting for the row
    return: htmlDivElement representing the row
*/
function createRowDiv(presentState) {
    let rowEl = document.createElement("div");
    rowEl.classList.add("time-block", presentState, "row");
    return rowEl;
}

/*
    Function: createHourElement
    purpose: creates a div element that represents the hour. The hour is formatted eg 9 => 9:00 AM and 17 => 5:00 PM
    input: the hour to show in the textContent of the div
    return: htmlDivElement representing the the hour div with the required classes attched
*/
function createHourElement(inputHour) {
    let hourToDisplay = moment(inputHour, ["H"]).format("h:mm A");
    let hourEl = document.createElement("div");
    hourEl.classList.add("hour","col-2", "col-md-1");
    hourEl.textContent = hourToDisplay;
    return hourEl;
}

/*
    Function: createTextAreaElement
    Purpose: creates a text area element that reads from local storage to populate initially and is editable by the user
    input: inputHour is a value that is used to read from local storage. Since the application will have multiple text areas, the current hour is used to distinguish between the elements 
    returns: htmlElement representing the text area
*/
function createTextAreaElement(inputHour) {
    let textAreaEl = document.createElement("textarea");
    textAreaEl.value = localStorage.getItem("slot-" + inputHour);
    textAreaEl.classList.add("col");
    console.log(textAreaEl);
    return textAreaEl;
}

function addRow(inputHour) {
    let presentState = determineTimeState(inputHour);
    //create row with components (hour display, text area, and button)
    let rowEl = createRowDiv(presentState);
    let hourEl = createHourElement(inputHour);
    let textAreaEl = createTextAreaElement(inputHour);
    
    let buttonEl = document.createElement("button");
    buttonEl.classList.add("saveBtn","col-2",  "col-md-1","fas", "fa-save");
    buttonEl.onclick = function (event) {
        localStorage.setItem("slot-"+inputHour, event.target.previousElementSibling.value )

    };


    rowEl.appendChild(hourEl);
    rowEl.appendChild(textAreaEl);
    rowEl.appendChild(buttonEl);

    $(".container").append(rowEl);
}

for (let i = START_TIME; i < END_TIME; i++) {
    addRow(i)
}
