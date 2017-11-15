const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, call) => {
        /*
                let headers = {};
                if (options.headers) {
                    Object.keys(options.headers).forEach((h) => {
                        headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
                    });
                }
                */
        let token = {
            "authorization": sessionStorage.getItem("token")
        }
// Denne mode er blevet inspireret af Jesper "javascript-client" Moden laver et ajax kald, der sætter parametrene for kommunikation med
        // serveren
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
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
            if (currentStudent) {
                $(".navbar-right").html(`

            <li><a href="AttendingEvents.html">Attendingevents</a></li>
            <li><a href="Profile.html">Profile</a></li>
            <li><a href = "Events.html" id="#">Events</a></li>
          
          `);
            } else {
                $(".navbar-right").html(`
    
          `);
            }
            $("#clickLogout").click(() => SDK.logout());
            call && call();

        });
    },
    logout: (studentId, call) => {
         SDK.request({
             method: "POST",
             url: "/students/logout",
             data: studentId,
         }, (err, data) => {
             if (err) return call(err);
             call(null, data);

         });

        //Fjerner token og user objekt fra sessionStorage
     /*   sessionStorage.removeItem("token");
        window.location.href = "Login.html";
*/
    },
    create: (firstName, lastName, email, password, verifyPassword, call) => {
        SDK.request({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                verifyPassword: verifyPassword
            },
            method: "POST",
            url: "/register"
        }, (err, data) => {
            if (err) return call(err)
            call(null, data);
        });
    },

    login: (email, password, call) => {
        SDK.request({
                data: {
                    email: email,
                    password: password
                },
                url: "/login",
                method: "POST"
            },
            (err, data) => {
                if (err) return call(err);


// tager alt data der er til token. Det er her den sætter token.
                sessionStorage.setItem("token", data);


                call(null, data);

            });

    }
};



