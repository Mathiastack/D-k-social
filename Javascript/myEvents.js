$(document).ready(() => {

    const myEventTable = $("#myEventTable");

    SDK.loadMyEvents((err, data) => {
        if (err) throw err;
        const events = JSON.parse(data);
        $.each(events, function (i, val) {
            var tr = '<tr>';
            tr += '<td>' + events[i].idEvent + '</td>';
            tr += '<td>' + events[i].eventName + '</td>';
            tr += '<td>' + events[i].location + '</td>';
            tr += '<td>' + events[i].price + '</td>';
            tr += '<td>' + events[i].eventDate + '</td>';
            tr += '<td>' + events[i].description + '</td>';
            tr += '<td><button id="updateBtn" class="attendEvent btn btn-success update-button" data-key="' + (i + 1) + '"> Update </button></td>';
            tr += '<td><button id="deleteBtn" class="deleteBtn btn btn-success delete-button" data-key="' + (i + 1) + '"> Delete </button></td>';
            tr += '</tr>';
            i + 1;
            myEventTable.append(tr);

        });


        $(".deleteBtn").on('click', function () {

            if (window.confirm("Do you want to delete this event?")) {
                var id = $(this).closest("tr").find("td:eq(0)").text();
                for (var i = 0; i < events.length; i++) {
                    if (id == events[i].idEvent) {

                        SDK.deleteEvent(events[i].idEvent, (err, data) => {
                            console.log("hej");
                            if (err){
                                throw err;
                                console.log("hej");
                            } else {
                                window.alert("The event is now deleted")

                            }
                        })

                    }
                }
                SDK.deleteEvent((err, data) => {
                });
                location.reload();
            }

        });
    });
});
