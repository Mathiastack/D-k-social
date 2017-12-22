    $(document).ready(() => {


   //Her er min logout metode, her bliver useren logget ud og alt userens sessionstorage bliver ryddet.
    $("#clickLogout").click((e) => {
        e.preventDefault();
        // Kalder logout funktionen.
        SDK.logout((err, data) => {
            if (err && err.xhr.status == 401) {
                console.log("error");
            } else {
                console.log(data);
                // Rydder sessionStorage.
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("student");
                sessionStorage.removeItem("chosenEvent");
                window.location.href = "login.html";
            }
        });
    });
});