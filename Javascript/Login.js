$(document).ready(() => {

    $("#clickLogin").click(() => {

        const email = $("#textEmail").val();
        const password = $("#textPassword").val();


        SDK.login(email, password, (err, call) => {
            if (err) {
                return "fejl";
            }

            window.location.href = "Events.html";

        });

    });

});
