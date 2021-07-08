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

console.log(moment().format("dddd"));