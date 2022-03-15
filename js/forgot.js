function forgotpass(){
    const email = document.getElementById("email").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset password link sent to your email id")
    })
    .catch((error) => {
        console.log(error.message);
    });
}

function login(){
    window.location.href = 'http://127.0.0.1:5500/login.html';
}

