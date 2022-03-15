function logout() {
  firebase.auth().signOut();
  sessionStorage.clear();
  location.replace("login.html");
}