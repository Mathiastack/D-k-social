$(document).ready(() => {
// denne metode bruges til at se, hvilke events vi deltager i.
    const myAttendingEventsTable = $("#myAttendingEventsTable")
    SDK.getAttendingEvents((err, data) => {
        if (err) {
            throw err;
        }
        const events = JSON.parse(data);
        $.each(events, function (i, val) {
            var tr = '<tr>';
            tr += '<td>' + events[i].eventName + '</td>';
            tr += '<td>' + events[i].location + '</td>';
            tr += '<td>' + events[i].price + '</td>';
            tr += '<td>' + events[i].eventDate + '</td>';
            tr += '<td>' + events[i].description + '</td>';
            tr += '</tr>';
            i += 1;
            myAttendingEventsTable.append(tr);
        });
    });
});