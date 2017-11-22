$(document).ready(() => {

    const $myEventTable = $("#myEventTable");

    SDK.loadMyEvents((call, events) => {
        console.log(events);
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

            $myEventTable.append(eventHtml)

        });
    });
});