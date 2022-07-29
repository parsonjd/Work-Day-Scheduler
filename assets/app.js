let saveAppt = $(".saveBtn")

//Added current date inside the jumbotron
$('#currentDay').text(moment().format("MMM Do YYYY"));


//Each time block has an id of 9-17 and is stored in plannerHour as a number.  plannerHour's relation to the currentHour from moment.js determines if it gets the class of future, present, or past. This will style the textarea either gray, red, or green.
function calendarColor() {
    let currentHour = moment().hours();

    $(".time-block").each(function () {
        let plannerHour = parseInt($(this).attr("id"));

        if (plannerHour > currentHour) {
            $(this).children().eq(1).addClass("future");
        } else if (plannerHour === currentHour) {
            $(this).children().eq(1).addClass("present");
        } else {
            $(this).children().eq(1).addClass("past");
        }
    })
};

//Saves the hour and textarea input into local storage
function saveEvent() {
    let timeSlot = $(this).siblings(".hour").text();
    let event = $(this).siblings(".description").val();
    localStorage.setItem(timeSlot, event);
}

//For each timeslot, the stored calendar events will be retrieved and stored in events variable.  If there is data in that timeslot, it is populated on the calendar
function populateCalendar() {
    $(".hour").each(function () {
        let hour = $(this).text();
        let events = localStorage.getItem(hour);

        if (events !== null) {
            $(this).siblings(".description").val(events);
        }
    })
}

//SaveEvent function is called when one of the time-slot save buttons are clicked
saveAppt.on("click", saveEvent);


//Calls these functions
calendarColor();
populateCalendar();

