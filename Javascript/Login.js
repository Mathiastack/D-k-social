$(document).ready(() => {

    $("#clickLogin").click(() => {

        const email = $("#textEmail").val();
        const password = $("#textPassword").val();


        SDK.login(email, password, (err, data) => {
            if (err) {
                return "fejl";
            }
            SDK.loadCurrentStudent((err, data) => {
                if (err) {
                    console.log("error");
                } else {
                    console.log("succes in load");
                    window.location.href = "Events.html";
                }
            });

        });

    });

});
