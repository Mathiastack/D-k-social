$(document).ready(() => {

    const $eventTable = $("#eventTable");

    SDK.loadEvents((call, events) => {
        events = JSON.parse(events);
        events.forEach((event) => {
            const eventHtml = `
                     <tr>
                     
                      <td>${event.location}</td>
                      
                      <td>${event.price}</td>
                      
                      <td>${event.eventDate}</td>
                      
                      <td>${event.description}</td>
                     
                    
                   <td><button type="button" id="attendEvent" class="btn btn-success attend-button" >Attend event</button></td>
                      </tr>
                      `;

            $eventTable.append(eventHtml)

        });

        $(".attend-button").click(function(){

            const eventId = $(this).data("event-id");
            const event = events.find((event) => event.id === eventId);
            window.alert(eventId);
            SDK.Event.addToAttendingEvents(event);



        });

    });

});

    $("#createEvent").click(() => {

        const price = $("#createPrice").val();
        const eventName = $("#createEventName").val();
        const description = $("#createDescription").val();
        const eventDate = $("#createEventDate").val();
        const location = $("#createLocation").val();

        if (!price || !eventName || !description || !eventDate || !location) {
console.log("hej");
            alert("You are missing some information, please try again")
        } else {
            SDK.createEvent(price, eventName, location, description, eventDate, (err, data) => {
                if (err && err.xhr.status === 400) {
                    $(".form-group").addClass("Client fail");
                }
                else if (err) {
                    console.log("error happened")
                } else {
                    window.alert(eventName + "user has been made");
                    window.location.href = "Events.html"
                }
            });
        }

});