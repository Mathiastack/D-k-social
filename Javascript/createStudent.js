$(document).ready(() => {


    $("#createAccount").click(() => {

        const firstName = $("#createFirstName").val();
        const lastName = $("#createLastName").val();
        const email = $("#createEmail").val();
        const password = $("#createPassword").val();
        const verifyPassword = $("#verifyPassword").val();

        if (!firstName || !lastName || !email || !password || !verifyPassword) {

            alert("You are missing some information, please try again")
        } else {

            if (password.valueOf() === verifyPassword.valueOf()) {

                SDK.create(firstName, lastName, email, password, verifyPassword, (err, data) => {
                    if (err && err.xhr.status === 400) {
                        console.log("error happened");
                        $(".form-group").addClass("Client fail");
                    } else {

                        window.alert(firstName + "\t" + "your user has been made");
                        window.location.href = "./HTML/Login.html";

                    }
                });

            } else {
                alert("password doest match")
            }
        }
    });
    $("#btnBack").click(() => {
        window.location.href = "./HTML/Login.html";
    });
});



