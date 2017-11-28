$(document).ready(() => {

    SDK.attendEvent((call, events) => {
        events = JSON.parse(events);
        events.forEach((event) => {
            const eventHtml = `
                     <tr>
                     <td class="idEvent">${event.idEvent}</td>
                     
                     <td>${event.eventName}</td>
                     
                      <td>${event.location}</td>
                      
                      <td>${event.price}</td>
                      
                      <td>${event.eventDate}</td>
                      
                      <td>${event.description}</td>
                  
                    
                
                      `;

        });
    });
});
