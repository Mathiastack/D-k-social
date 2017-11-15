$(document).ready(() => {

    $("#clickLogout").click(() => {
        SDK.logout(studentId, (err, data) => {
            if (err && err.xhr.status == 401) {
                $(".form-group").addClass("has-error");
            } else {
                window.location.href = "Login.html";
              sessionStorage.removeItem("token")
            }
        })
    });
}