const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, call) => {

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

    currentStudent: (data) => {
        const  loadStudent = SDK.sessionStorage.getItem(data)
        return loadStudent.currentStudent();

    },


    loadCurrentStudent: (cb) => {
        SDK.request({
            method: "GET",
            url: "/students/profile",
            headers: {
                authorization: SDK.sessionStorage.getItem("token"),
            },
        }, (err, user) => {
            if (err) {
                return cb(err);
            }
            sessionStorage.getItem("User", user);
            cb(null, user);
        });
    },


    logout: (call) => {
         SDK.request({
             method: "POST",
             url: "/students/logout"
         }, (err, data) => {
             if (err) {
                 return call(err);
             }
             sessionStorage.removeItem("token");
             cb(null, data);
         });

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



