// document.addEventListener('DOMContentLoaded', function() {
// });

const login = () => {
  const loginName = document.getElementById("login_name");
  const password = document.getElementById("pword_input_1");
  const loginButton = document.getElementById("login");

  loginName.value = "Rick";
  password.value = "admin";
  loginButton.click();
};

const goToLogin = () => {
  window.location.href = './login';
};

const goToWorkout = () => {
  window.location.href = './workouts/new';
};

