$(document).ready(() => {
    //nedenfor metode, bruges til at oprette en bruger, som bliver lageret over i vores database.
    $("#createAccount").click(() => {

        const firstName = $("#createFirstName").val();
        const lastName = $("#createLastName").val();
        const email = $("#createEmail").val();
        const password = $("#createPassword").val();
        const verifyPassword = $("#verifyPassword").val();
        // Hvis alle felter ikke bliver udfyldt, bliver brugere mødt med en pop up.
        if (!firstName || !lastName || !email || !password || !verifyPassword) {

            alert("You are missing some information, please try again")
        } else {
            // Tjekker  om de indtaset passwords stemmer over ens.
            if (password.valueOf() === verifyPassword.valueOf()) {
                // Kalder create funktionen.
                SDK.create(firstName, lastName, email, password, verifyPassword, (err, data) => {
                    if (err && err.xhr.status === 400) {
                        console.log("error happened");
                        $(".form-group").addClass("Client fail");
                    } else {
                        // Når brugeren er oprette viderstilles brugeren til login siden.
                        window.alert(firstName + "\t" + "your user has been made");
                        window.location.href = "login.html";

                    }
                });

            } else {
                alert("password doest match")
            }
        }
    });
    $("#btnBack").click(() => {
        window.location.href = "login.html";
    });

});



