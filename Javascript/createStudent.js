$(document).ready(() => {

    $("#createAccount").click(() => {

        const firstName = $("#createFirstName").val();
        const lastName = $("#createLastName").val();
        const email = $("#createEmail").val();
        const password = $("#createPass").val();
        const verifyPassword = $("#verifyPass").val();

        if (!firstName || !lastName || !email || !password || !verifyPassword) {
            console.log(firstName)
            console.log(lastName)
            console.log(email)
            console.log(password)
            console.log(verifyPassword)
            alert("You are missing som elements")
        } else {
            if (password.valueOf() === verifyPassword.valueOf()) {
                SDK.create(firstName, lastName, email, password, verifyPassword, (err, data) => {
                    if (err && err.xhr.status === 400) {
                        console.log("FIND PÅ NOGET");
                    }
                    else if (err) {
                        console.log("error happened")
                    } else {
                        window.alert("Your do now have a user")
                        window.location.href = "Login.html";
                    }
                });
            }else{
                alert("password dosent match")

                    }
                }

                });
            });



