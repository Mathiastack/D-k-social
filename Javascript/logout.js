$(document).ready(() => {
    console.log("logout loaded");

    //const studentId = SDK.currentStudent();
    $("#clickLogout").click((e) => {
        e.preventDefault();
        console.log('logout was clicked');
        SDK.logout((err, data) => {
            if (err && err.xhr.status == 401) {
                console.log("error");
            } else {
                console.log(data);

                sessionStorage.removeItem("token");
                window.location.href = "Login.html";
            }
        });
    });
});