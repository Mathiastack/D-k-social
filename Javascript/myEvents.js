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
            tr += '<td><button id="updateBtn" class="attendEvent btn btn-success update-button" data-toggle="modal" data-target="#eventModal" data-key="' + (i + 1) + '"> Update </button></td>';
            tr += '<td><button id="deleteBtn" class="deleteBtn btn btn-success delete-button" data-key="' + (i + 1) + '"> Delete </button></td>';
            tr += '</tr>';
            i + 1;
            myEventTable.append(tr);

        });
        // Denne metode bruges til at slette et event.
        $(".deleteBtn").on('click', function () {

            if (window.confirm("Do you want to delete this event?")) {
                var id = $(this).closest("tr").find("td:eq(0)").text();
                for (var i = 0; i < events.length; i++) {
                    if (id == events[i].idEvent) {
                        //Kalder deleteEvent funktionen
                        SDK.deleteEvent(events[i].idEvent, (err, data) => {
                            console.log("hej");
                            if (err) {
                                throw err;
                            } else {
                                window.alert("The event is now deleted");
                                location.reload();
                            }
                        })

                    }
                }
            }
        });
        // Denne metode bruges til at updatere et event.
        $(".update-button").on('click', function () {
                var id = $(this).closest("tr").find("td:eq(0)").text();
                for (var i = 0; i < events.length; i++) {
                    if (id == events[i].idEvent) {
                        let constructJson = "{\"idEvent\":" + events[i].idEvent + ","
                            + "\"eventName\":\"" + events[i].eventName + "\","
                            + "\"location\":\"" + events[i].location + "\","
                            + "\"price\":" + events[i].price + ","
                            + "\"eventDate\":\"" + events[i].eventDate + "\","
                            + "\"description\":\"" + events[i].description + "\"}";
                        sessionStorage.setItem("chosenEvent", constructJson);

                        $("#editBtn").on('click', function () {
                            const eventName = $("#inputEventName").val();
                            const location = $("#inputLocation").val();
                            const price = $("#inputPrice").val();
                            const eventDate = $("#inputEventDate").val();
                            const description = $("#inputDescription").val();
                            const idEvent = JSON.parse(sessionStorage.getItem("chosenEvent")).idEvent;


                            SDK.updateEvent(idEvent, eventName, location, price, eventDate, description, (err, data) => {
                                if (err && err.xhr.status === 401) {
                                    $(".form-group").addClass("has-error")
                                }
                                else if (err) {
                                    console.log("An error happened");
                                    window.alert("There was en error editing the event");
                                } else {
                                    sessionStorage.removeItem("chosenEvent");
                                    window.location.href = "myEvents.html";

                                }


                            });

                        });
                    }
                }


        });
    })
});





