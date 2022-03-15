const loginForm = document.querySelector(".form-login");
const signupForm = document.querySelector(".form-signup");
const loginText = document.querySelector(".slide-login");
const signupText = document.querySelector(".slide-signup");
const mediaQuery = window.matchMedia('(max-width:670px)');
const mobile = document.querySelector(".wrapper");

if (mediaQuery.matches) {
    mobile.style.width = "50%";
    alert('Media Query Matched!');
}
signupText.style.background = "#C4C4C4";
signupText.style.height = "40px";
signupText.style.borderRadius = "12px";
signupText.style.color = "black";

loginText.addEventListener('click', () => {
    loginForm.style.display = "block";
    loginText.style.background = "#C4C4C4";
    loginText.style.height = "40px";
    loginText.style.color = "black";
    loginText.style.borderRadius = "12px";
    signupText.style.background = "#253B6E";
    signupText.style.color = "white";
    signupForm.style.display = "none";
});
signupText.addEventListener('click', () => {
    loginForm.style.display = "none";
    loginText.style.background = "#253B6E";
    loginText.style.color = "white";
    signupText.style.color = "black";
    signupText.style.height = "40px";
    signupText.style.borderRadius = "12px";
    signupText.style.background = "#C4C4C4";
    signupForm.style.display = "block";
});

