$(document).ready(() => {
//her er vores login metode, den bliver brugt når useren skal logge ind.
    $("#clickLogin").click(() => {

        const email = $("#textEmail").val();
        const password = $("#textPassword").val();


        SDK.login(email, password, (err, data) => {
            if (err) {
                return "fejl";
            }
            SDK.loadCurrentStudent((err, data) => {
                if (err) {
                } else {
                    console.log("succes in load");
                    window.location.href = "events.html";
                }
            });

        });

    });

});
