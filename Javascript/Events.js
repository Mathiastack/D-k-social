$(document).ready(() => {

    const $eventtabel = $("#eventTable");

    SDK.loadEvents((call, events) => {
        events = JSON.parse(events);
        events.forEach((event) => {
            const eventHtml = `
                     <tr>
                    
                      <td>${event.idEvent}</td>
                      
                      <td>${event.owner}</td>
                    
                      <td>${event.location}</td>
                      
                      <td>${event.price}</td>
                      
                      <td>${event.eventDate}</td>
                      
                      <td>${event.description}</td>
                     
                    
                   <td><button type="button" id="attendEvent" class="btn btn-success attend-button" >Attend event</button></td>
                      </tr>
                      `;

            $eventtabel.append(eventHtml)

        });

        $(".attend-button").click(function(){

            const eventId = $(this).data("event-id");
            const event = events.find((event) => event.id === eventId);
            window.alert(eventId);
            SDK.Event.addToAttendingEvents(event);



        });

    });

});