$(document).ready(() => {

    const studentId = SDK.currentStudent();

    $("#clickLogout").click(() => {

        SDK.logout(studentId, (err, data) => {
            if (err && err.xhr.status == 401) {
                console.log("error");
            } else {
                window.location.href = "Login.html";
                sessionStorage.removeItem("token");
            }
        });
    });
});