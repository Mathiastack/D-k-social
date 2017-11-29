$(document).ready(() => {

    const eventTable = $("#eventTable");

    SDK.loadEvents((err, data) => {
        if (err) throw err;
        const events = JSON.parse(data);;
        $.each(events, function (i, call) {
            var tr = '<tr>';
            tr += '<td>' + events[i].idEvent + '</td>';
            tr += '<td>' + events[i].eventName + '</td>';
            tr += '<td>' + events[i].location + '</td>';
            tr += '<td>' + events[i].price + '</td>';
            tr += '<td>' + events[i].eventDate + '</td>';
            tr += '<td>' + events[i].description + '</td>';
            tr += '<td><button id="attendingStudents" class=" btn btn-success attendingStudent-button" data-id="' + (i + 1) + '"> Attending Students </button></td>';
            tr += '<td><button id="attendEvent" class="btn btn-success attend-button" data-id="' + (i + 1) + '"> Attend event </button></td>';
            tr += '</tr>';
            i + 1;
            eventTable.append(tr);
        });

        $(".attend-button").on('click', function () {
            if (window.confirm("Do you want to join this event")) {
                let id = $(this).closest("tr").find("td:eq(0)").text();

                for (let i = 0; i < events.length; i++) {
                    if (id == events[i].idEvent) {

                        SDK.joinEvent(events[i].idEvent, (err, data) => {

                            if (err) {
                                throw err;
                            } else {
                                window.alert("you joined the event \n See your events in attending events");
                            }

                        });
                    }
                }
            }
        });

        $(".seeAttendingStudents").click(function(){

            var idEvent = $(this).data("event-id-see");

            console.log(idEvent);

            SDK.attendingStudents(idEvent, (cb, students) => {
                if(students){
                    students = JSON.parse(students);
                    students.forEach((student) => {
                        console.log(student.firstName);

                        const attendingStudentsHtml = `           
                                                          
                                          <p>${student.firstName} ${student.lastName}</p>
            
                    `;

                        $seeAttendingStudents.append(attendingStudentsHtml)
                    });
                } else {
                    $("#seeAttendingStudents").html("Either no one is attending this event, or there was en error.");
                }



            });


        });

    });




    });

    $("#createEvent").click(() => {


        const eventName = $("#createEventName").val();
        const location = $("#createEventLocation").val();
        const price = $("#createEventPrice").val();
        const eventDate = $("#createEventDate").val();
        const description = $("#createEventDescription").val();

        if (!eventName || !location || !price || !eventDate || !description) {
            alert("You are missing some information, please try again")
        } else {
            SDK.createEvent(eventName, location, price, eventDate, description, (err, data) => {
                if (err && err.xhr.status === 400) {
                    $(".form-group").addClass("Client fail");
                }
                else if (err) {
                    console.log("error happened")
                } else {
                    window.alert(eventName + "Event has been made");
                    window.location.href = "Events.html"
                }
            });
        }

    });
});