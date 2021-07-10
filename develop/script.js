//TODO: get element using jquery
const currentDayEl = document.getElementById("currentDay");

currentDayEl.textContent = moment().format("dddd, MMM Do");

function addRow(time) {
    //TODO: create the elements using jQuery
    //create a row element
    let currentHour = moment().format("H");
    let presentState = "";
    /*
    fix bug with pm time showing future
    */
    if(time < currentHour) {
        presentState = "past";
    } else if (time == currentHour) {
        presentState = "present";
    } else {
        presentState = "future";
    }

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

for (let i = 8; i < 19; i++) {
    addRow(i)
}
