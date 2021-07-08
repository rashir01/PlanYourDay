/* 
1. display the day at the top of the calendar -Done
2. display time blocks of 1hr
handle blcok clicks
display save button 
handle save button 
handle refresh
*/

//TODO: get element using jquery
const currentDayEl = document.getElementById("currentDay");

currentDayEl.textContent = moment().format("dddd, MMM Do");

function addRow(time) {
    //TODO: create the elements using jQuery
    //create a row element
    let currentHour = moment().format("h");
    let presentState = "";
    let timePostfix = ":00 AM";
    if(time < currentHour) {
        presentState = "past";
    } else if (time == currentHour) {
        presentState = "present";
    } else {
        presentState = "future";
    }

    if (time > 12) {
        time = time - 12;
        timePostfix = ":00 PM";
    } else if (time == 12) {
        timePostfix = ":00 PM";
    }

    let rowEl = document.createElement("div");
    rowEl.classList.add("time-block", presentState, "row");

    let hourEl = document.createElement("div");
    hourEl.classList.add("hour","col-xl-1");
    hourEl.textContent = time + timePostfix;

    let textAreaEl = document.createElement("textarea");
    textAreaEl.value = localStorage.getItem("slot-" + time);
    textAreaEl.classList.add("col-xl-10");
    

    let buttonEl = document.createElement("button");
    buttonEl.classList.add("saveBtn", "col-xl-1", "fas", "fa-save");
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
    // console.log(i > 12 ? i-12 : i);
}
