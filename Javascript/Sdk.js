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
    currentStudent: () => {
        const  loadStudent = SDK.sessionStorage.getItem("StudentUser")
        return loadStudent.currentStudent();

    },
    loadCurrentStudent: (cb) => {
        SDK.request({
            method: "GET",
            url: "/students/profile",
            headers: {
                authorization: SDK.sessionStorage.load("token"),
            },
        }, (err, user) => {
            if (err) {
                return cb(err);
            }
            SDK.sessionStorage.getItem("User", user);
            cb(null, user);
        });
    },


    loadNav: (call) => {
        $("#nav-container").load("NavBar.html", () => {
            if (currentStudent) {
            }

        });
    },
    logout: (data, call) => {
        var token = {
            token:sessionStorage.getItem("token")
        }
         SDK.request({
             method: "POST",
             url: "/students/logout",
             data: token},call);
        sessionStorage.removeItem("token")

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

    loadEvents: (call) => {
        SDK.request({
            method: "GET",
            url: "/events",
            headers: {
                authorization: sessionStorage.getItem("token"),
            },
        }, (err, course) => {
            if (err) return call(err);
            call(null, course)
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



