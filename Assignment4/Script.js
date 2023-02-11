var emailInput = document.getElementById("emailId");
var phoneInput = document.getElementById("phoneNumber");
var zipInput = document.getElementById("zipcode");
var emailSpan = document.getElementById("emailSpan");
var phoneSpan = document.getElementById("phoneSpan");
var zipSpan = document.getElementById("zipSpan");
var title = document.getElementsByName("title");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var streetAddress1 = document.getElementById("streetAddress1");
var streetAddress2 = document.getElementById("streetAddress2");
var city = document.getElementById("city");
var state = document.getElementById("state");
var source = document.getElementsByName("source");
var comments = document.getElementById("comments");
var form = document.getElementById("form");
var rating = document.getElementById("Menu");
var feedbackContent = document.getElementById("feedback-content");
var feedback = document.getElementById("feedback");
var table = document.getElementById("table");
rating.selectedIndex = -1;
emailInput.style.outline = "none";
phoneInput.style.outline = "none";
zipInput.style.outline = "none";
emailSpan.style.display = "none";
phoneSpan.style.display = "none";
zipSpan.style.display = "none";
feedbackContent.style.display = "none";
var isAllValid = false;
var isEmailValid = false;
var isPhoneValid = false;
var isZipValid = false;
var selectedTitle = "";
var selectedSource = [];
var selectedOptions = [];
function checkTitle() {
  title.forEach((item) => {
    if (item.checked) {
      selectedTitle = item.value;
    }
  });
}
function checkSource() {
  source.forEach((item) => {
    if (item.checked) {
      if (!selectedSource.includes(item.value)) {
        selectedSource.push(item.value);
      }
    } else {
      selectedSource = selectedSource.filter((value) => value !== item.value);
    }
  });
}

function checkOptional() {
  document.getElementsByName("optional").forEach((item) => {
    if (item.checked) {
      if (!selectedOptions.includes(item.value)) {
        selectedOptions.push(item.value);
      }
    } else {
      selectedOptions = selectedOptions.filter((value) => value !== item.value);
    }
    if (selectedOptions.length > 0) {
      feedbackContent.style.display = "block";
    } else {
      feedbackContent.style.display = "none";
    }
  });
}

title.forEach((item) => item.addEventListener("click", checkTitle));
source.forEach((item) => item.addEventListener("click", checkSource));
rating.addEventListener("change", (e) => {
  if (e.target.value === "1" || e.target.value === "2") {
    document.getElementById("optional-label").innerHTML =
      "Please tell us how we can improve";
    document.getElementById("label-optional").innerHTML =
      "<div><input type='checkbox' name='optional' value='food'>item</input><input type='checkbox' name='optional' value='service'>ambience</input><div>";
    document
      .getElementsByName("optional")
      .forEach((item) => item.addEventListener("change", checkOptional));
  } else {
    document.getElementById("optional-label").innerHTML =
      "Please tell us how can we improve";
    document.getElementById("label-optional").innerHTML =
      "<div><input type='checkbox' name='optional' value='food'>item</input><input type='checkbox' name='optional' value='service'>ambience</input><div>";
    document
      .getElementsByName("optional")
      .forEach((item) => item.addEventListener("change", checkOptional));
  }
});

function submitForm() {
  table.innerHTML += `
  <tr style="font-size:'500'">
        <th>${selectedTitle}</th>
        <th>${firstName.value}</th>
        <th>${lastName.value}</th>
        <th>${emailInput.value}</th>
        <th>${phoneInput.value}</th>
        <th>${streetAddress1.value}</th>
        <th>${streetAddress2.value ?? ""}</th>
        <th>${city.value}</th>
        <th>${state.value}</th>
        <th>${zipInput.value}</th>
        <th>${selectedSource.join(" ")}</th>
        <th>${comments.value}</th>
        <th>${rating.value}</th>
        <th>${feedback.value}</th>
      </tr>
  
  `;
  selectedTitle = "";
  selectedSource = [];
  selectedOptions = [];
  firstName.value = "";
  lastName.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  streetAddress1.value = "";
  streetAddress2.value = "";
  city.value = "";
  state.value = "";
  zipInput.value = "";
  comments.value = "";
  rating.selectedIndex = -1;
  feedback.value = "";
  feedbackContent.style.display = "none";
  emailInput.style.border = "none";
  phoneInput.style.border = "none";
  zipInput.style.border = "none";

  title.forEach((item) => (item.checked = false));
  source.forEach((item) => (item.checked = false));
  document
    .getElementsByName("optional")
    .forEach((item) => (item.checked = false));
  document.getElementById("optional-label").innerHTML = "";
  document.getElementById("label-optional").innerHTML = "";
}

form.onsubmit = function (e) {
  e.preventDefault();
  if (
    isEmailValid &&
    isPhoneValid &&
    isZipValid &&
    selectedTitle.length > 0 &&
    selectedSource.length > 0 &&
    firstName.value.length > 0 &&
    lastName.value.length > 0 &&
    streetAddress1.value.length > 0 &&
    city.value.length > 0 &&
    state.value.length > 0 &&
    rating.selectedIndex !== -1 &&
    comments.value.length > 0
  ) {
    if (selectedOptions.length > 0) {
      if (feedback.value.length > 0) {
        submitForm();
      } else {
        alert("Please fill out the form correctly");
      }
    } else {
      submitForm();
    }
  } else {
    alert("Please fill out the form correctly");
  }
};

emailInput.addEventListener("input", (e) => {
  var regex = new RegExp("[a-z0-9]+@northeastern.edu");

  if (regex.test(e.target.value)) {
    emailInput.style.border = "2px solid green";
    isEmailValid = true;
    emailSpan.style.display = "none";
  } else {
    emailInput.style.border = "2px solid red";
    isEmailValid = false;
    emailSpan.style.display = "inline";
  }
});

phoneInput.addEventListener("input", (e) => {
  var regex = new RegExp("^[0-9]{10}$");

  if (regex.test(e.target.value)) {
    phoneInput.style.border = "2px solid green";
    isPhoneValid = true;
    phoneSpan.style.display = "none";
  } else {
    phoneInput.style.border = "2px solid red";
    isPhoneValid = false;
    phoneSpan.style.display = "inline";
  }
});

zipInput.addEventListener("input", (e) => {
  var regex = new RegExp("^[0-9]{5}$");

  if (regex.test(e.target.value)) {
    zipInput.style.border = "2px solid green";
    isZipValid = true;
    zipSpan.style.display = "none";
  } else {
    zipInput.style.border = "2px solid red";
    isZipValid = false;
    zipSpan.style.display = "inline";
  }
});


