const START_TIME = 8;
const END_TIME = 19;

$("#currentDay").text(moment().format("dddd, MMM Do"));

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
    $(rowEl).prop({
        class: "time-block row " + presentState
    });
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
    $(hourEl).text(hourToDisplay);
    $(hourEl).prop({
        class: "hour col-2 col-md-1"
    });
    
    return hourEl;
}

/*
    Function: createTextAreaElement
    Purpose: creates a text area element that reads from local storage to populate initially and is editable by the user
    input: inputHour is a value that is used to read from local storage. Since the application will have multiple text areas, the current hour is used to distinguish between the elements 
    returns: html tag representing the text area with text set to its corresponding storage value
*/
function createTextAreaElement(inputHour) {
    let textAreaEl = document.createElement("textarea");
    $(textAreaEl).text(localStorage.getItem("slot-" + inputHour + moment().format("DDMMYY")));
    $(textAreaEl).prop({
        class: "col"
    });

    return textAreaEl;
}

/*
    Function: createButtonElement
    Purpose: creates a button element to be attached to the time block row. It adds the necessary classes for the css display. It also has an onclick that saves the sibling text area to the local storage
    input: inputHour the hour this button is associated with 
    return: html tag representing the button
*/
function createButtonElement(inputHour) {
    let buttonEl = document.createElement("button");
    $(buttonEl).prop({
        class: "saveBtn col-2 col-md-1 fas fa-save"
    });
    $(buttonEl).click (function (event) {
        localStorage.setItem("slot-"+ inputHour + moment().format("DDMMYY"), event.target.previousElementSibling.value )
    });
    return buttonEl;
}

/* 
    Function: addRow
    Purpose: adds a time block row to the screen
    input: inputHour the time stamp to display in the row. The input is an integer that will be converted to clock format upon display
    return: none
*/
function addRow(inputHour) {
    //determine if the row should be in the past, present, or future
    let presentState = determineTimeState(inputHour);
    
    //create row with components (hour display, text area, and button)
    let rowEl = createRowDiv(presentState);
    
    //attach the components to the div
    let hourEl = createHourElement(inputHour);
    let textAreaEl = createTextAreaElement(inputHour);
    let buttonEl = createButtonElement(inputHour);

    $(rowEl).append(hourEl, textAreaEl, buttonEl);
    

    //attach the div row to the container
    $(".container").append(rowEl);
}

for (let i = START_TIME; i < END_TIME; i++) {
    addRow(i)
}
