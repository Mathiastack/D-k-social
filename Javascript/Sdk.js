const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, call) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }
// Denne mode er blevet inspireret af Jesper "javascript-client" Moden laver et ajax kald, der sætter parametrene for kommunikation med
        // serveren
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                call(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                call({xhr: xhr, status: status, error: errorThrown});
            }
        })
    },

    loadNav: (call) => {
        $("#nav-container").load("NavBar.html", () => {
            if (currentUser) {
                $(".navbar-right").html(`

            <li><a href="AttendingEvents.html" id="clickAttendingEvents">Attendingevents</a></li>
            <li><a href="Profile.html" id="clickProfile">Profile</a></li>
            <li><a href = "Logout.html" id="clickLogout">Logout</a></li>
            <li><a href="Events.html" id="clickEvents">Events</li>
          `);
            } else {
                $(".navbar-right").html(`
            <li><a href="Events"> <span class="sr-only">(current)</span></a></li>
          `);
            }

        });
    }
