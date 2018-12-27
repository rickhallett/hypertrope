document.addEventListener('DOMContentLoaded', function() {
    const createFlashAlert = (msg, node) => {
        let alert = document.createElement('div');
        alert.id = 'login-name-alert';
        alert.classList.add('alert', '_warning', '_shadow');
        alert.innerText = msg;
        alert.style.height = '40px';
        alert.style.padding = '10px';
        node.insertAdjacentElement('afterbegin', alert);
    }

    const getElementValueAndTrim = (id) => document.getElementById(id).value.trim().toLowerCase();
    const passwordBlank = (password) => password === "";
    const passwordsMatch = (password1, password2) => password1 === password2;

    const loginButton = document.getElementById('login');

    loginButton.addEventListener('click', function(event) {
        const loginFieldset = document.getElementById('login-fieldset');
        const loginName = getElementValueAndTrim('login_name');
        if(loginName === "") {
            event.preventDefault();
            createFlashAlert('You must provide a login username', loginFieldset);
            $('#login-name-alert').fadeOut(3500);
        }
    });

    const registerButton = document.getElementById('register-button');

    registerButton.addEventListener('click', function(event) {

        const registerFieldset = document.getElementById('register-fieldset');
        const registerName = getElementValueAndTrim('register-name');
        const password = getElementValueAndTrim('pword_input_2');
        const passwordConfirm = getElementValueAndTrim('pword_input_3');

        if(registerName === "") {
            event.preventDefault();
            createFlashAlert('You must provide a register username', registerFieldset);
            $('#login-name-alert').fadeOut(3500);
            return;
        }

        if(passwordBlank(password) || passwordBlank(passwordConfirm)) {
            event.preventDefault()
            createFlashAlert('You must provide both passwords', registerFieldset);
            $('#login-name-alert').fadeOut(3500);
            return;
        }

        if(!passwordsMatch(password, passwordConfirm)) {
            event.preventDefault();
            createFlashAlert('Your passwords must match', registerFieldset);
            $('#login-name-alert').fadeOut(3500);
            return;
        }
    });

});

const toggleHide = (id1, id2 = null) => {
    let el = document.getElementById(id1);
    if (el.type === "password") {
      el.type = "text";
    } else {
      el.type = "password";
    }

    if(id2) {
        let el = document.getElementById(id2);
        if (el.type === "password") {
        el.type = "text";
        } else {
        el.type = "password";
        }
    }
}

