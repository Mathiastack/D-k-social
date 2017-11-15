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
                        $(".form-group").addClass("Client fail");
                    }
                    else if (err) {
                        console.log("error happened")
                    } else {
                        window.alert("Your do now have a user");
                        window.location.href = "Login.html";
                    }
                });
            }else{
                alert("password doesnt match")

            }
        }

    });
});



