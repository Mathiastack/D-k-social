$(document).ready(() => {

    const eventTable = $("#eventTable");
    // Denne metode bliver brugt, når vi skal loade alle vores events ind i vores tabel.
    SDK.loadEvents((err, data) => {
        if (err) throw err;
        const events = JSON.parse(data);
        ;
        //Opretter en række for hvert event, og tilføjer informationen til rækken.
        $.each(events, function (i, call) {
            var tr = '<tr>';
            tr += '<td>' + events[i].idEvent + '</td>';
            tr += '<td>' + events[i].eventName + '</td>';
            tr += '<td>' + events[i].location + '</td>';
            tr += '<td>' + events[i].price + '</td>';
            tr += '<td>' + events[i].eventDate + '</td>';
            tr += '<td>' + events[i].description + '</td>';
            tr += '<td><button id="attendingStudents" class=" btn btn-success attendingStudentBtn"  data-toggle="modal" data-target="#attendingStudentModal" data-key="' + (i + 1) + '"> Attending Students </button></td>';
            tr += '<td><button id="attendEvent" class="btn btn-success attend-button" data-id="' + (i + 1) + '"> Attend event </button></td>';
            tr += '</tr>';
            i + 1;
            eventTable.append(tr);
        });
        //attend-button bliver brugt, når en user gerne vil tilmelde sig til et evenet. Hvor jeg har brugt en jQuery selecter: eq.
        $(".attend-button").on('click', function () {
            // jQuery selecter :eq
            let id = $(this).closest("tr").find("td:eq(0)").text();

            for (let i = 0; i < events.length; i++) {
                if (id == events[i].idEvent) {
                    // Kalder joinevent funktionen.
                    SDK.joinEvent(events[i].idEvent, (err, data) => {

                        if (err) {
                            throw err;
                        } else {
                            window.alert("you joined the event \n See your events in attending events");
                        }

                    });
                }
            }

        });
        // Denne metode giver brugeren muligheden for at se hvem der deltager.
        $(".attendingStudentBtn").on('click', function () {
            // Her kigges der efter den knap brugeren trykket på i tabellen.
            let name = $(this).closest("tr").find("td:eq(0)").text();
            // Kigger alle knapper igennem, indtil den finder knap brugeren trykket på.
            for (let i = 0; i < events.length; i++) {
                if (name == events[i].idEvent) {
                    // Kalder get attendingstudents funktionen.
                    SDK.getAttendingStudents(events[i].idEvent, (call, students) => {

                        const loadAttendingStudents = $("#loadAttendingStudents");
                        if (students) {
                            students = JSON.parse(students);
                            students.forEach((student) => {
                                let tr = '<tr>';
                                tr += '<td>' + student.firstName + '</td>';
                                tr += '<td>' + student.lastName + '</td>';
                                tr += '<td>' + student.email + '</td>';
                                loadAttendingStudents.append(tr);
                            });
                        } else {
                            window.alert("There are no attending students");
                        }
                    });
                }
            }
            // denne metode lukker min modal
            $(".close").on('click', function () {
                $("#attendingStudentBtn").modal('hide');
                $("#loadAttendingStudents").empty();
            });
            // denne metode sletter indeholdet i modalen.
            $('#clearModal').on('click', function () {
                $("#attendingStudentBtn").modal('hide');
                $("#loadAttendingStudents").empty();
            });
        });

        // denne metoder bliver brugt, når der skal laves et event, opbygningen af metoden minder meget om opret bruger.
        $("#createEvent").click(() => {


            const eventName = $("#createEventName").val();
            const location = $("#createEventLocation").val();
            const price = $("#createEventPrice").val();
            const eventDate = $("#createEventDate").val();
            const description = $("#createEventDescription").val();
// Hvis alle felter ikke er udfyldt vil brugeren blive mødt af en pop op.
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
                        window.location.href = "events.html"
                    }
                });


            }
        });

    });
});

















