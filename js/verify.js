
//Email verification
const loginbut = document.getElementById('loginbtn');
function send_verification() {
    // e.preventDefault();

    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        alert("Verification email is sent on your registered email id.");

        if (auth.currentUser.emailVerified == true) {
            document.getElementById('loginbtn').style.display = 'block';
        }
        else {
            document.getElementById('loginbtn').style.display = 'none';
        }
        document.getElementById('loginbtn').style.display = 'block';
    }).catch(function (error) {
        //An error happend
        console.log("Error : " + error.message);
    });
}


