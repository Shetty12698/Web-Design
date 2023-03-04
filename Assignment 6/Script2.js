$(document).ready(() => {
    let name = window.localStorage.getItem("name");
    console.log(name);
    $("#header").append(" " + name);
    $("#number1").keyup((e) => {
      if ($.isNumeric($("#number1").val()) == false) {
        alert("Please enter a number");
        $("#number1").val("");
      }
    });
    $("#number2").keyup((e) => {
      if ($.isNumeric($("#number2").val()) == false) {
        alert("Please enter a number");
        $("#number2").val("");
      }
    });
    $("#add").click((e) => {
      if ($("#number1").val() == "" || $("#number2").val() == "") {
        alert("Please enter both numbers");
        return;
      }
      let num1 = parseInt($("#number1").val());
      let num2 = parseInt($("#number2").val());
      let result = num1 + num2;
      $("#result").val(result);
    });
    $("#subtract").click((e) => {
      if ($("#number1").val() == "" || $("#number2").val() == "") {
        alert("Please enter both numbers");
        return;
      }
      let num1 = parseInt($("#number1").val());
      let num2 = parseInt($("#number2").val());
      let result = num1 - num2;
      $("#result").val(result);
    });
    $("#multiply").click((e) => {
      if ($("#number1").val() == "" || $("#number2").val() == "") {
        alert("Please enter both numbers");
        return;
      }
      let num1 = parseInt($("#number1").val());
      let num2 = parseInt($("#number2").val());
      let result = num1 * num2;
      $("#result").val(result);
    });
    $("#divide").click((e) => {
      if ($("#number1").val() == "" || $("#number2").val() == "") {
        alert("Please enter both numbers");
        return;
      }
      let num1 = parseInt($("#number1").val());
      let num2 = parseInt($("#number2").val());
      let result = num1 / num2;
      $("#result").val(result);
    });
  });
  