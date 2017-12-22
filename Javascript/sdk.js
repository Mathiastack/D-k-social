const SDK = {
    // URL for serveren
    serverURL: "http://localhost:8080/api",
    // SDK requests
    request: (options, call) => {

        let token = {
            "authorization": sessionStorage.getItem("token")
        }
        // Denne mode er blevet inspireret af Jesper "javascript-client" Moden laver asynkrone kald til serveren.
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(SDK.Encryption.encrypt(JSON.stringify(options.data))),
            success: (data, status, xhr) => {
                call(null, SDK.Encryption.decrypt(data), status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                call({xhr: xhr, status: status, error: errorThrown});
            }
        })
    },

    currentStudent: (data) => {
        const loadStudent = sessionStorage.getItem("Student")
        return loadStudent.currentStudent;
    },
    // denne metode er til, når brugeren skal kunne hans profil.

    student: (call) => {
        SDK.request({
            method: "GET",
            url: "/students/profile"
        }), (err, data) => {

            if (err) return call(err);

        }
        call(null, data);
    },

    loadCurrentStudent: (call) => {
        SDK.request({
            method: "GET",
            url: "/students/profile",
            headers: {
                authorization: sessionStorage.getItem("token"),
            },
        }, (err, student) => {
            if (err) return call(err);
            sessionStorage.setItem("student", student);
            call(null, student);
        });
    },

// Logud
    logout: (call) => {
        SDK.request({
            method: "POST",
            url: "/students/logout"
        }, (err, data) => {
            if (err) {
                return call(err);
            }

            cb(null, data);
        });

    },
    // Opret bruger
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
    // request til at deltage i et event
    joinEvent: (idEvent, call) => {
        SDK.request({
            method: "POST",
            data: {
                idEvent: idEvent,

            },
            url: "/events/join",
            headers: {
                authorization: sessionStorage.getItem("token"),
            },

        }, (err, data) => {
            if (err) {
                return call(err);
            }
            call(null, data);
        });
    },
// request til at loade alle events
    loadEvents: (call) => {
        SDK.request({
            method: "GET",
            url: "/events",
            headers: {
                authorization: sessionStorage.getItem("token"),
            },
        }, (err, event) => {
            if (err) return call(err);
            call(null, event)
        });
    },
    // Request til at oprette event
    createEvent: (eventName, location, price, eventDate, description, call) => {
        SDK.request({
            data: {
                eventName: eventName,
                location: location,
                price: price,
                eventDate: eventDate,
                description: description


            },
            method: "POST",
            url: "/events",
            headers: {
                authorization: sessionStorage.getItem("token")
            },
        }, (err, data) => {
            if (err) {
                console.log("hej");
                return call(err);
            }
            call(null, data);
        });
    },
    // request til at loade alle brugerens events
    loadMyEvents: (call) => {
        SDK.request({
            method: "GET",
            url: "/events/myEvents",
            headers: {
                authorization: sessionStorage.getItem("token"),
            },
        }, (err, event) => {
            if (err) return call(err);
            call(null, event)
        });
    },
    // Request til at slette et event.
    deleteEvent: (idEvent, call) => {
        SDK.request({
            method: "PUT",
            data: {
                idEvent: idEvent,
            },
            url: "/events/" + idEvent + "/delete-event",
            headers: {
                authorization: sessionStorage.getItem("token"),
            }

        }, (err, event) => {
            if (err) {

                return (err)
            }
            call(null, event)


        });
    },
// Request til at hente alle de bruger der deltager i et event.
    getAttendingStudents: (idEvent, call) => {
        SDK.request({
            method: "GET",
            url: "/events/" + idEvent + "/students",
            headers: {
                authorization: sessionStorage.getItem("token"),
            },
        }, (err, event) => {
            if (err) return call(err);
            call(null, event)
        });

    },
    // Request til at hente de events en bruger deltager i.
    getAttendingEvents: (call) => {
        let studentId = JSON.parse(sessionStorage.getItem("student")).idStudent;
        SDK.request({
            method: "GET",
            url: "/students/" + studentId + "/events",
            headers: {
                authorization: sessionStorage.getItem("token"),
            },
        }, (err, event) => {
            if (err) {
                return call(err);
            }
            call(null, event)
        });

    },
    // Request til at updatere et event
    updateEvent: (idEvent, eventName, location, price, eventDate, description, call) => {
        SDK.request({
            data: {
                idEvent: idEvent,
                eventName: eventName,
                location: location,
                price: price,
                eventDate: eventDate,
                description: description,
            },
            method: "put",
            url: "/events/" + idEvent + "/update-event",
            headers: {
                authorization: sessionStorage.getItem("token"),
            },
        }, (err, data) => {
            if (err) {
                return call(err);
            }
            call(null, data);
        });
    },
// Request til at hente brugerens profil oplysninger
    getProfile: (call) => {
        SDK.request({
                method: "GET",
                url: "/students/profile",
                headers: {
                    authorization: sessionStorage.getItem("token")
                }
            },
            call);
    },

// Request til at logge ind.
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
                sessionStorage.setItem("token", JSON.parse(data));


                call(null, data);

            });
    },

    // Encryption er blevet inspiretet til af jesper.
    Encryption: {
        encrypt: (encrypt) => {
            if (encrypt !== undefined && encrypt.length !== 0) {
                const fields = ['J', 'M', 'F'];
                let encrypted = '';
                for (let i = 0; i < encrypt.length; i++) {
                    encrypted += (String.fromCharCode((encrypt.charAt(i)).charCodeAt(0) ^ (fields[i % fields.length]).charCodeAt(0)))
                }
                return encrypted;
            } else {
                return encrypt;
            }
        },
        decrypt: (decrypt) => {
            if (decrypt.length > 0 && decrypt !== undefined) {
                const fields = ['J', 'M', 'F'];
                let decrypted = '';
                for (let i = 0; i < decrypt.length; i++) {
                    decrypted += (String.fromCharCode((decrypt.charAt(i)).charCodeAt(0) ^ (fields[i % fields.length]).charCodeAt(0)))
                }
                return decrypted;
            } else {
                return decrypt;
            }
        }
    },
};



