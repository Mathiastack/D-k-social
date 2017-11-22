$(document).ready(() => {


   //const studentId = SDK.currentStudent();
    $("#clickLogout").click((e) => {
        e.preventDefault();

        SDK.logout((err, data) => {
            if (err && err.xhr.status == 401) {
                console.log("error");
            } else {
                console.log(data);

                sessionStorage.removeItem("token");
                sessionStorage.removeItem("User");
                window.location.href = "Login.html";
            }
        });
    });
});