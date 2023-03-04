let global_name = "";

$(document).ready(() => {
  $("#form").submit((e) => {
    e.preventDefault();
    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let regex = new RegExp("[a-z0-9]+@northeastern.edu");
    let string = new RegExp("^[A-Za-z]");
    if (
      name.length < 1 ||
      !string.test(name) ||
      !regex.test(email) ||
      password.length < 6
    ) {
      if (name.length < 1 || !string.test(name)) {
        if (!$("#name").hasClass("is-invalid")) {
          $("#name").addClass("is-invalid");
          if (name.length < 1) {
            $("#name").after(
              "<span id='name_err' class='error'>Please enter your name</span>"
            );
          } else if (!string.test(name)) {
            $("#name").after(
              "<span id='name_err' class='error'>Please enter a valid name</span>"
            );
          }
        }
      } else {
        $("#name").removeClass("is-invalid");
        $("#name_err").remove();
      }
      console.log(regex.test(email));
      if (!regex.test(email)) {
        if (!$("#email").hasClass("is-invalid")) {
          $("#email").addClass("is-invalid");
          $("#email").after(
            "<span id='email_err' class='error'>Please enter a valid email</span>"
          );
        }
      } else {
        console.log("here");
        $("#email").removeClass("is-invalid");
        $("#email_err").remove();
      }
      if (password.length < 6) {
        if (!$("#password").hasClass("is-invalid")) {
          $("#password").addClass("is-invalid");
          $("#password").after(
            "<span id='password_err' class='error'>Password should me minimum of 6 characters</span>"
          );
        }
      } else {
        $("#password").removeClass("is-invalid");
        $("#password_err").remove();
      }
    } else {
      window.localStorage.setItem("name", name);
      window.location.replace("http://localhost:5500/Calculation.html");
    }
  });
});
