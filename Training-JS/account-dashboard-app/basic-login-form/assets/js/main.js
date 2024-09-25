"use strict";

// Định nghĩa các điều kiện
const usernameMinLength = 6;
const usernameMaxLength = 20;
const passwordMinLength = 10;
const passwordMaxLength = 50;
let usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/;
let passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
let loginForm = undefined;
let usernameElemnent = undefined;
let usernameErrorElement = undefined;
let passwordElement = undefined;
let passwordErrorElement = undefined;

function initForm() {
  usernameElemnent = document.getElementById("username");
  usernameErrorElement = document.getElementById("username-error");
  passwordElement = document.getElementById("password");
  passwordErrorElement = document.getElementById("password-error");
  loginForm = {
    username: {
      value: "",
      valid: false,
      errorMessage: "",
    },
    password: {
      value: "",
      valid: false,
      errorMessage: "",
    },
    rememberMe: {
      checked: false,
    },
  };
}


function setUsernameInvalid(message) {
  loginForm.username.valid = false;
  loginForm.username.errorMessage = message;
  usernameErrorElement.innerHTML = message;
  usernameErrorElement.style.display = "block";
}

function setUsernameValid() {
  loginForm.username.valid = true;
  usernameErrorElement.style.display = "none";
}

function validateUsername() {
  var username = document.getElementById("username").value;
  // Kiểm tra required
  if (username.trim() === "") {
    setUsernameInvalid("Username is required");
    validateForm();
    return;
  }

  // Kiểm tra độ dài của username
  if (
    username.length < usernameMinLength ||
    username.length > usernameMaxLength
  ) {
    setUsernameInvalid(
      `Username must be between ${usernameMinLength} and ${usernameMaxLength} characters`
    );
    validateForm();
    return;
  }

  // Kiểm tra định dạng cho username
  // Hiển thị thông báo lỗi nếu username không đúng định dạng
  if (!usernameRegex.test(username)) {
    setUsernameInvalid("Username must contain numbers and alphabet characters");
    validateForm();
    return;
  }
  setUsernameValid();
  validateForm();
}

/////////////////////////      PASSWORD     ///////////////////////////////////////

function setPasswordInvalid(message) {
  loginForm.password.valid = false;
  loginForm.password.errorMessage = message;
  passwordErrorElement.innerHTML = message;
  passwordErrorElement.style.display = "block";
}

function setPasswordValid() {
  loginForm.password.valid = true;
  passwordErrorElement.style.display = "none";
}

function validatePassword() {
  var password = document.getElementById("password").value;
  if (password.trim() === "") {
    setPasswordInvalid("Password is required");
    validateForm();
    return;
  }

  if (    password.length < passwordMinLength ||    password.length > passwordMaxLength  ) 
  {
    setPasswordInvalid(
      `Password must be between ${passwordMinLength} and ${passwordMaxLength} characters`
    );
    validateForm();
    return;
  }
  // Hiển thị thông báo lỗi nếu password không đúng định dạng
  if (!passwordRegex.test(password)) {
    setPasswordInvalid(
      "Password must be a combination of uppercase letters, lowercase letters, numbers, and symbols");
    validateForm();
    return;
  }
  setPasswordValid();
  validateForm();
}

function validateForm() {
  var loginButton = document.getElementById("loginButton");

  if (loginForm.username.valid && loginForm.password.valid) {
    loginButton.disabled = false;
    return;
  }
  loginButton.disabled = true;
}

function login() {
  var usernameValue = usernameElemnent.value;
  var passwordValue = passwordElemnent.value;
  if ((usernameValue === "admin123") && (passwordValue === "Admin@1234")) {
    if (!loginForm.rememberMe.checked) {
      alert("Successfully! Your account will be saved in 30 days.");
      return;
    }
    alert("Successfully!");
    return;
  }
  alert("Username or Password was wrong! Please try again.");
}

// Call initForm method immediately when page is loaded to is it some data for the form
initForm();
