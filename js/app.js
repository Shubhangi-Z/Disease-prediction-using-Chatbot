//--------------------Register user---------------------------------------
const signupform = document.querySelector('.signup');
if (signupform) {
  signupform.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    
    const email = signupform['emails'].value;
    const type = signupform['type_user'].value;
    const password = signupform['passwords'].value;
 
 
    // sign up the user & add firestore data
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        role: type
      });
    }).then(() => {
      window.alert("Please login to continue");
    }).catch(err => {
      signupform.querySelector('.err').innerHTML = err.message;
    });
  });
}
 
 
 
//---------------------------login----------------------------------
const loginform = document.querySelector(".login");
if (loginform) {
  loginform.addEventListener('submit', (e) => {
    e.preventDefault();
 
    const email = loginform['name'].value;
    const password = loginform['password'].value;
    const user = firebase.auth().currentUser;
 
    auth.signInWithEmailAndPassword(email, password).then(cred => {
      console.log(cred.user);
      if (auth.currentUser.emailVerified == true) {
        db.collection('users').doc(user.uid).get().then(doc => {
          console.log(doc.data().role);
 
          const role = doc.data().role
          if (role == 'User') {
            if (typeof (doc.data().first_name) === 'undefined') {
              // first time user login
              if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem("isProfile", "false");
              }
            } else {
              // user login (other than first time)
              if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem("isProfile", "true");
              }
            }
            console.log(sessionStorage.getItem("isProfile"));
            location.replace('userprofile.html');
          } else if (role == 'Doctor') {
            if (typeof (doc.data().first_name) === 'undefined') {
              // first time user login
              if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem("isDocProfile", "false");
              }
            } else {
              // user login (other than first time)
              if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem("isDocProfile", "true");
              }
            }
            location.replace("docprofile.html");
          } else if (role == 'Medical Laboratory') {
            if (typeof (doc.data().first_name) === 'undefined') {
              // first time user login
              if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem("isLabProfile", "false");
              }
            } else {
              // user login (other than first time)
              if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem("isLabProfile", "true");
              }
            }
            console.log(sessionStorage.getItem("isProfile"));
            location.replace("labprofile.html");
          }
        });
      } else {
        location.replace("verify.html");
      }
    }).catch(err => {
      loginform.querySelector('.error').innerHTML = err.message;
    });
  });
}
 
// --------------BAKWASSSS-----------------------------------------------
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    if ((location.pathname == '/userprofile.html') && (sessionStorage.getItem("isProfile") == 'true')) {
      console.log('SUCESSSSSSSSSSSSSS');
      db.collection('users').doc(user.uid).get().then(doc => {
        document.getElementById("first_name").value = doc.data().first_name;
        document.getElementById("last_name").value = doc.data().last_name;
        document.getElementById("phone_no").value = doc.data().phone_no;
        sessionStorage.setItem("name_app", doc.data().first_name + ' ' + doc.data().last_name);
        document.getElementById("gender").value = doc.data().gender;
        document.getElementById("date").value = doc.data().dob;
        document.getElementById("email").value = doc.data().email;
        document.getElementById("preview").src = doc.data().image;
        // to disable form
        var form = document.getElementById("userprofile");
        $('label').addClass('active');
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
          elements[i].disabled = true;
        }
      });
    } else if ((location.pathname == '/useraddress.html') && (sessionStorage.getItem("isProfile") == 'true')) {
      console.log('SUCESSSSSSSSSSSSSS');
      db.collection('users').doc(user.uid).get().then(doc => {
        document.getElementById("house_no").value = doc.data().Address.house_no;
        document.getElementById("street").value = doc.data().Address.street;
        document.getElementById("city").value = doc.data().Address.city;
        document.getElementById("state").value = doc.data().Address.state;
        document.getElementById("country").value = doc.data().Address.country;
        document.getElementById("pincode").value = doc.data().Address.pincode;
        // to disable form
        var form = document.getElementById("useraddress");
        var elements = form.elements;
        $('label').addClass('active');
        for (var i = 0, len = elements.length; i < len; ++i) {
          elements[i].disabled = true;
        }
      });
    } else if ((location.pathname == '/labprofile.html') && (sessionStorage.getItem("isLabProfile") == 'true')) {
      console.log('SUCESSSSSSSSSSSSSS');
      db.collection('users').doc(user.uid).get().then(doc => {
        document.getElementById("first_name").value = doc.data().first_name;
        document.getElementById("last_name").value = doc.data().last_name;
        document.getElementById("phone_no").value = doc.data().phone_no;
        document.getElementById("test").value = doc.data().test;
 
        // to disable form
        var form = document.getElementById("labprofile");
        var elements = form.elements;
        $('label').addClass('active');
        for (var i = 0, len = elements.length; i < len; ++i) {
          elements[i].disabled = true;
        }
      });
    } else if ((location.pathname == '/labaddress.html') && (sessionStorage.getItem("isLabProfile") == 'true')) {
      console.log('SUCESSSSSSSSSSSSSS');
      db.collection('users').doc(user.uid).get().then(doc => {
        document.getElementById("shop_no").value = doc.data().Address.shop_no;
        document.getElementById("street").value = doc.data().Address.street;
        document.getElementById("city").value = doc.data().Address.city;
        document.getElementById("state").value = doc.data().Address.state;
        document.getElementById("country").value = doc.data().Address.country;
        document.getElementById("pincode").value = doc.data().Address.pincode;
        // to disable form
        var form = document.getElementById("labaddress");
        var elements = form.elements;
        $('label').addClass('active');
        for (var i = 0, len = elements.length; i < len; ++i) {
          elements[i].disabled = true;
        }
      });
    } else if ((location.pathname == '/docprofile.html') && (sessionStorage.getItem("isDocProfile") == 'true')) {
      console.log('SUCESSSSSSSSSSSSSS');
      db.collection('users').doc(user.uid).get().then(doc => {
        document.getElementById("first_name").value = doc.data().first_name;
        document.getElementById("last_name").value = doc.data().last_name;
        document.getElementById("phone_no").value = doc.data().phone_no;
        document.getElementById("gender").value = doc.data().gender;
        document.getElementById("email").value = doc.data().email;
        document.getElementById("registeration_id").value = doc.data().registeration_id;
        document.getElementById("services").value = doc.data().services;
        document.getElementById("preview").src = doc.data().image;
        // to disable form
        var form = document.getElementById("docprofile");
        var elements = form.elements;
        $('label').addClass('active');
        for (var i = 0, len = elements.length; i < len; ++i) {
          elements[i].disabled = true;
        }
      });
    } else if ((location.pathname == '/doctoreducation.html') && (sessionStorage.getItem("isDocProfile") == 'true')) {
      console.log('SUCESSSSSSSSSSSSSS');
      const accountList = document.querySelector('#tbl_account_list');
      var user = firebase.auth().currentUser;
 
      function onAddWebsite(doc) {
        let tr = document.createElement('tr');
        let university = document.createElement('td');
        let field = document.createElement('td');
        let year = document.createElement('td');
        let cross = document.createElement('td');
 
        tr.setAttribute('data-id', doc.id);
        university.textContent = doc.data().university;
        field.textContent = doc.data().field;
        year.textContent = doc.data().year;
        cross.textContent = 'Delete';
 
        tr.appendChild(university);
        tr.appendChild(field);
        tr.appendChild(year);
        tr.appendChild(cross);
 
        accountList.appendChild(tr);
 
        cross.addEventListener('click', (e) => {
          e.stopPropagation();
          let id = e.target.parentElement.getAttribute('data-id');
          db.collection('users').doc(user.uid).collection('education').doc(id).delete();
          console.log('delete');
        });
      }
 
      db.collection('users').doc(user.uid).collection('education').orderBy('year').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          console.log(change.doc.data());
          if (change.type == 'added') {
            onAddWebsite(change.doc);
          } else if (change.type == 'removed') {
            let tr = accountList.querySelector('[data-id=' + change.doc.id + ']');
            accountList.removeChild(tr);
          }
        });
      });
 
      // db.collection("users").doc(user.uid).collection("education").orderBy("year").get()
      //   .then(querySnapshot => {
      //     querySnapshot.forEach(doc => {
      //       console.log(doc.data());
      //       onAddWebsite(doc);
      //     });
      //   });
    } else if ((location.pathname == '/onlineappointment.html') && (sessionStorage.getItem("isDocProfile") == 'true')) {
      console.log('SUCESSSSSSSSSSSSSS');
      const docOnlineTable = document.querySelector('#docOnlineTable');
      var user = firebase.auth().currentUser;
 
      function onAddWebsiteOnline(doc) {
        let tr = document.createElement('tr');
        let list = document.createElement('td');
        let starttime = document.createElement('td');
        let endtime = document.createElement('td');
        let cross = document.createElement('td');
 
        tr.setAttribute('data-id', doc.id);
        list.textContent = doc.data().day;
        starttime.textContent = doc.data().starttime;
        endtime.textContent = doc.data().endtime;
        cross.textContent = 'Delete';
 
        tr.appendChild(list);
        tr.appendChild(starttime);
        tr.appendChild(endtime);
        tr.appendChild(cross);
 
        docOnlineTable.appendChild(tr);
 
        cross.addEventListener('click', (e) => {
          e.stopPropagation();
          let id = e.target.parentElement.getAttribute('data-id');
          db.collection('users').doc(user.uid).collection('online appointment').doc(id).delete();
          console.log('delete');
        });
      }
 
      db.collection('users').doc(user.uid).collection('online appointment').orderBy('day').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          console.log(change.doc.data());
          if (change.type == 'added') {
            onAddWebsiteOnline(change.doc);
          } else if (change.type == 'removed') {
            let tr = docOnlineTable.querySelector('[data-id=' + change.doc.id + ']');
            docOnlineTable.removeChild(tr);
          }
        });
      });
    } else if ((location.pathname == '/doctorclinic.html') && (sessionStorage.getItem("isDocProfile") == 'true')) {
      console.log('SUCESSSSSSSSSSSSSS');
      const docclinicTable = document.querySelector('#docClinicTable');
      var user = firebase.auth().currentUser;
 
      function onAddWebsiteClinic(doc) {
        var user = firebase.auth().currentUser;
        let tr = document.createElement('tr');
        let clinic_name = document.createElement('td');
        let phone_no = document.createElement('td');
        let address = document.createElement('td');
        let pincode = document.createElement('td');
        let cross = document.createElement('td');
 
        tr.setAttribute('data-id', doc.id);
        clinic_name.textContent = doc.data().clinic_name;
        phone_no.textContent = doc.data().phone_no;
        const str = doc.data().shop_no + ', ' + doc.data().street + ', ' + doc.data().city + ', ' + doc.data().state + ', ' + doc.data().country;
        address.textContent = str;
        pincode.textContent = doc.data().pincode;
        cross.textContent = 'Delete';
 
        tr.appendChild(clinic_name);
        tr.appendChild(phone_no);
        tr.appendChild(address);
        tr.appendChild(pincode);
        tr.appendChild(cross);
 
        docclinicTable.appendChild(tr);
 
        cross.addEventListener('click', (e) => {
          e.stopPropagation();
          let id = e.target.parentElement.getAttribute('data-id');
          db.collection('users').doc(user.uid).collection('clinic').doc(id).delete();
          console.log('delete');
        });
      }
 
      db.collection('users').doc(user.uid).collection('clinic').orderBy('pincode').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          console.log(change.doc.data());
          if (change.type == 'added') {
            onAddWebsiteClinic(change.doc);
          } else if (change.type == 'removed') {
            let tr = docclinicTable.querySelector('[data-id=' + change.doc.id + ']');
            docclinicTable.removeChild(tr);
          }
        });
      });
    }
  } else {
    console.log('user logged out');
  }
});
 
 
//------------------------ USERPROFILE-------------------------
const userprofile = document.querySelector('#userprofile');
var fileTag = document.getElementById("filetag"),
  preview = document.getElementById("preview");
 
fileTag.addEventListener("change", function () {
  changeImage(this);
});
 
function changeImage(input) {
  const user = firebase.auth().currentUser;
  var reader;
  if (input.files && input.files[0]) {
    reader = new FileReader();
    reader.onload = function (e) {
      preview.setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
    firebase.storage().ref('Image/' + user.uid).put(input.files[0]);
    firebase.storage().ref('Image/' + user.uid).getDownloadURL().then(function (downloadURL) {
      console.log("file available at", downloadURL);
      db.collection('users').doc(user.uid).set({
        image: downloadURL,
      }, {
        merge: true
      })
    })
 
  }
}
 
function userProfile() {
  const user = firebase.auth().currentUser;
  console.log(sessionStorage.getItem("isProfile"));
  db.collection('users').doc(user.uid).set({
    first_name: userprofile.first_name.value,
    last_name: userprofile.last_name.value,
    phone_no: userprofile.phone_no.value,
    gender: userprofile.gender.value,
    dob: userprofile.date.value,
    email: userprofile.email.value,
  }, {
    merge: true
  });
}
 
// ------------------USERADDRESS------------------------------------------------
const useraddress = document.querySelector('#useraddress');
 
function userAddress() {
  const useraddress = document.querySelector('#useraddress');
  const user = firebase.auth().currentUser;
  console.log(sessionStorage.getItem("isProfile"));
  db.collection('users').doc(user.uid).set({
    Address: {
      house_no: useraddress.house_no.value,
      street: useraddress.street.value,
      city: useraddress.city.value,
      state: useraddress.state.value,
      country: useraddress.country.value,
      pincode: useraddress.pincode.value
    }
 
  }, {
    merge: true
  }).then(() => {
    window.alert('Your information has been successfully saved.');
  });
}
 
// -------------------------LAB PROFILE-------------------------------------
const labprofile = document.querySelector('#labprofile');
if (location.pathname == '/labprofile.html') {
  console.log(sessionStorage.getItem("isLabProfile"));
  const selects = document.querySelector("#test");
  const instances = M.FormSelect.init(selects, {});
  const selectOption = document.querySelector("#test");
  var selectedValues;
  selectOption.addEventListener("change", function () {
    const instance = M.FormSelect.getInstance(selectOption);
    selectedValues = instance.getSelectedValues();
    console.log(selectedValues);
  });
}
 
 
function labProfile() {
  const user = firebase.auth().currentUser;
  db.collection('users').doc(user.uid).set({
    first_name: labprofile.first_name.value,
    last_name: labprofile.last_name.value,
    phone_no: labprofile.phone_no.value,
    test: selectedValues,
  }, {
    merge: true
  });
 
}
 
// -------------------LAB ADDRESS---------------------------------
const labaddress = document.querySelector('#labaddress');
 
function labAddress() {
  const user = firebase.auth().currentUser;
  console.log(sessionStorage.getItem("isLabProfile"));
  db.collection('users').doc(user.uid).set({
 
    Address: {
      shop_no: labaddress.shop_no.value,
      street: labaddress.street.value,
      city: labaddress.city.value,
      state: labaddress.state.value,
      country: labaddress.country.value,
      pincode: labaddress.pincode.value
    }
  }, {
    merge: true
  }).then(() => {
    window.alert('Your information has been successfully saved.');
  });
}
// --------------------------EDIT (enable form)--------------------------------------------
var page = location.pathname;
 
function edit() {
  var page = location.pathname;
  var page1 = page.split("/");
  var page2 = page1[1].split(".html");
  var page3 = page2[0];
  let text1 = "#";
  let result = text1.concat(page3);
  console.log(result);
  const editForm = document.querySelector(result);
  var elements = editForm.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = false;
  }
}
// ---------------------------DOC PROFILE------------------------------------------
if (location.pathname == '/docprofile.html') {
 
  const selectsDoc = document.querySelector("#services");
  const instancesDoc = M.FormSelect.init(selectsDoc, {});
  const selectOptionDoc = document.querySelector("#services");
  var selectedValuesDoc;
  selectOptionDoc.addEventListener("change", function () {
    const instance = M.FormSelect.getInstance(selectOptionDoc);
    selectedValuesDoc = instance.getSelectedValues();
    console.log(selectedValuesDoc);
  });
}
var fileTag = document.getElementById("filetag"),
  preview = document.getElementById("preview");
fileTag.addEventListener("change", function () {
  changeImage(this);
});
 
function changeImage(input) {
  const user = firebase.auth().currentUser;
  var reader;
  if (input.files && input.files[0]) {
    reader = new FileReader();
    reader.onload = function (e) {
      preview.setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
    firebase.storage().ref('Image/' + user.uid).put(input.files[0]);
    firebase.storage().ref('Image/' + user.uid).getDownloadURL().then(function (downloadURL) {
      console.log("file available at", downloadURL);
      db.collection('users').doc(user.uid).set({
        image: downloadURL,
      }, {
        merge: true
      })
    })
 
  }
}
 
const docprofile = document.querySelector('#docprofile');
 
function docProfile() {
  const user = firebase.auth().currentUser;
  console.log(sessionStorage.getItem("isDocProfile"));
  db.collection('users').doc(user.uid).set({
    first_name: docprofile.first_name.value,
    last_name: docprofile.last_name.value,
    phone_no: docprofile.phone_no.value,
    gender: docprofile.gender.value,
    email: docprofile.email.value,
    registeration_id: docprofile.registeration_id.value,
    services: selectedValuesDoc
  }, {
    merge: true
  });
}
// --------------------DOCTOR EDUCATION-------------------------------------------
const accountList = document.querySelector('#tbl_account_list');
 
function onAddWebsite(doc) {
  const user = firebase.auth().currentUser;
  let tr = document.createElement('tr');
  let university = document.createElement('td');
  let field = document.createElement('td');
  let year = document.createElement('td');
  let cross = document.createElement('td');
 
  tr.setAttribute('data-id', doc.id);
  university.textContent = doc.data().university;
  field.textContent = doc.data().field;
  year.textContent = doc.data().year;
  cross.textContent = 'Delete';
 
  tr.appendChild(university);
  tr.appendChild(field);
  tr.appendChild(year);
  tr.appendChild(cross);
 
  accountList.appendChild(tr);
 
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('users').doc(user.uid).collection('education').doc(id).delete();
    console.log("delete");
  });
}
 
function docEducation() {
  const user = firebase.auth().currentUser;
  const docedu = document.querySelector('#docedu');
  db.collection('users').doc(user.uid).collection('education').add({
    university: docedu.university.value,
    field: docedu.field.value,
    year: docedu.year.value
  }).then(() => {
    docedu.university.value = '';
    docedu.field.value = '';
    docedu.year.value = '';
    if (sessionStorage.getItem("isDocProfile") == 'true') {
      console.log("ON CLOUD NINE!");
      var rowCount = accountList.rows.length;
      for (var i = rowCount - 1; i > 0; i--) {
        accountList.deleteRow(i);
      }
    }
    db.collection('users').doc(user.uid).collection('education').orderBy('year').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
          onAddWebsite(change.doc);
        } else if (change.type == 'removed') {
          let tr = accountList.querySelector('[data-id=' + change.doc.id + ']');
          accountList.removeChild(tr);
        }
      });
    });
  });
}
 
// -----------------------------ONLINE APPOINTMENT----------------------------------
 
const docOnlineTable = document.querySelector('#docOnlineTable');
 
 
function onAddWebsiteOnline(doc) {
  const user = firebase.auth().currentUser;
  let tr = document.createElement('tr');
  let list = document.createElement('td');
  let starttime = document.createElement('td');
  let endtime = document.createElement('td');
  let cross = document.createElement('td');
 
  tr.setAttribute('data-id', doc.id);
  list.textContent = doc.data().day;
  starttime.textContent = doc.data().starttime;
  endtime.textContent = doc.data().endtime;
  cross.textContent = 'Delete';
 
  tr.appendChild(list);
  tr.appendChild(starttime);
  tr.appendChild(endtime);
  tr.appendChild(cross);
 
  docOnlineTable.appendChild(tr);
 
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('users').doc(user.uid).collection('online appointment').doc(id).delete();
    console.log("delete");
  });
}
 
function docOnline() {
  const user = firebase.auth().currentUser;
  const doconline = document.querySelector('#doconline');
  db.collection('users').doc(user.uid).collection('online appointment').add({
    day: doconline.list.value,
    starttime: doconline.starttime.value,
    endtime: doconline.endtime.value
  }).then(() => {
    doconline.list.value = '';
    doconline.starttime.value = '';
    doconline.endtime.value = '';
    if (sessionStorage.getItem("isDocProfile") == 'true') {
      console.log("ON CLOUD NINE!");
      var rowCount = accountList.rows.length;
      for (var i = rowCount - 1; i > 0; i--) {
        accountList.deleteRow(i);
      }
    }
    db.collection('users').doc(user.uid).collection('online appointment').orderBy('day').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
          onAddWebsiteOnline(change.doc);
        } else if (change.type == 'removed') {
          let tr = docOnlineTable.querySelector('[data-id=' + change.doc.id + ']');
          docOnlineTable.removeChild(tr);
        }
      });
    });
  });
}
 
// ---------------------------DOCTOR CLINIC------------------------------------
 
const docclinicTable = document.querySelector('#docClinicTable');
 
 
function onAddWebsiteClinic(doc) {
  var user = firebase.auth().currentUser;
  let tr = document.createElement('tr');
  let clinic_name = document.createElement('td');
  let phone_no = document.createElement('td');
  let address = document.createElement('td');
  let pincode = document.createElement('td');
  let cross = document.createElement('td');
 
  tr.setAttribute('data-id', doc.id);
  clinic_name.textContent = doc.data().clinic_name;
  phone_no.textContent = doc.data().phone_no;
  const str = doc.data().shop_no + ', ' + doc.data().street + ', ' + doc.data().city + ', ' + doc.data().state + ', ' + doc.data().country;
  address.textContent = str;
  pincode.textContent = doc.data().pincode;
  cross.textContent = 'Delete';
 
  tr.appendChild(clinic_name);
  tr.appendChild(phone_no);
  tr.appendChild(address);
  tr.appendChild(pincode);
  tr.appendChild(cross);
 
  docclinicTable.appendChild(tr);
 
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('users').doc(user.uid).collection('clinic').doc(id).delete();
    console.log("delete");
  });
}
 
function docClinic() {
  const user = firebase.auth().currentUser;
  const docclinic = document.querySelector('#docclinic');
  db.collection('users').doc(user.uid).collection('clinic').add({
    clinic_name: docclinic.clinic_name.value,
    phone_no: docclinic.phone_no.value,
    shop_no: docclinic.shop_no.value,
    street: docclinic.street.value,
    city: docclinic.city.value,
    state: docclinic.state.value,
    country: docclinic.country.value,
    pincode: docclinic.pincode.value,
  }).then(() => {
 
    docclinic.clinic_name.value = '';
    docclinic.phone_no.value = '';
    docclinic.shop_no.value = '';
    docclinic.street.value = '';
    docclinic.city.value = '';
    docclinic.state.value = '';
    docclinic.country.value = '';
    docclinic.pincode.value = '';
 
    if (sessionStorage.getItem("isDocProfile") == 'true') {
      console.log("ON CLOUD NINE!");
      var rowCount = docclinicTable.rows.length;
      for (var i = rowCount - 1; i > 0; i--) {
        docclinicTable.deleteRow(i);
      }
    }
    db.collection('users').doc(user.uid).collection('clinic').orderBy('pincode').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
          onAddWebsiteClinic(change.doc);
        } else if (change.type == 'removed') {
          let tr = docclinicTable.querySelector('[data-id=' + change.doc.id + ']');
          docclinicTable.removeChild(tr);
        }
      });
    });
  });
}
 
console.log(location.pathname);
// console.log(sessionStorage.getItem("isProfile"));
// console.log(sessionStorage.getItem("isLabProfile"));
console.log(sessionStorage.getItem("isDocProfile"));
 
// ----------------------------------------SEARCH DOCTORS---------------------------------------------- 
function sendEmail(fnfn,id) {
  console.log(fnfn);
  console.log(id);
  const user = firebase.auth().currentUser;
  console.log('i am here');
  console.log(user);
  var name_app = sessionStorage.getItem("name_app");
  console.log(name_app);
  db.collection('appointments').add({
    user_id: user.uid,
    doc_id: id,
    username: name_app,
    status: 'pending'
  },{
    merge: true
  });
  Email.send({
      Host: "smtp.gmail.com",
      Username: "sonutestproject@gmail.com",
      Password: "Iliketoeatpizza",
      To: fnfn,
      From: "sonutestproject@gmail.com",
      Subject: "Request for online appointment",
      Body: name_app + " has requested for your appointment. Please fix the timing of appointment by visiting your dashboard",
    })
    .then
      alert("Request for your online appointment has been send successfully.");
}
 
function searchDoc() {
  const searchDoctor = document.querySelector('#searchDoctor');
  const city_name = searchDoctor.city_name.value;
  const doctype = searchDoctor.doctype.value;
  db.collection('users').where("role", "==", "Doctor").where("services", "array-contains", doctype).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      const fn = doc.data().first_name;
      const ln = doc.data().last_name;
      const ser = doc.data().services;
      const img = doc.data().image;
      const id_doctor = doc.id;
      var doc_email = doc.data().email;
      const container = document.getElementById('accordion');
      const card = document.createElement('div');
      card.classList = 'card-body';
      const content = `
        <div class="col s12 l5" id="doctor_info">
          <div class="card horizontal">
            <div class="card-image">
              <img  src=${img} id="preview" class="upload-img" style="width:70%;margin: 5px;">
            </div>
            <div class="card-stacked">
              <div class="card-content" id="${id_doctor}">
                <h6>${fn} ${ln}</h6>
                <h6><b>Services:</b> ${ser}</h6>
              </div>
              <div class="card-action">
              <form method="post">
                <a class="btn" onclick="sendEmail('${doc.data().email}','${id_doctor}')">nAppointment</a>
              </form>  
              </div>
            </div>
          </div>
        </div>
        `;
      container.innerHTML += content;
      db.collection("users").doc(doc.id).collection("clinic").where("city", "==", city_name).get().
      then((snapshot) => {
        snapshot.docs.forEach(doc => {
          const container_clinic = document.getElementById(id_doctor);
          const data = doc.data();
          const content_clinic = `
            <h6><b>Clinic: </b>${data.clinic_name}, ${data.shop_no}, ${data.street}<h6>
            <h6>Contact: ${data.phone_no}</h6>
        `;
          container_clinic.innerHTML += content_clinic;
        });
      });
    });
  });
}

// ---------------------------------display appointment------------------------------------

function appo() {
  const user = firebase.auth().currentUser;
console.log(user)
db.collection('appointments').where("doc_id", "==", "fT02jN2yexQs5nLp6rvC0fyP0Nw1").get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    console.log(doc.data())
      const userName = doc.data().username;
      const status = doc.data().status;
      const container1 = document.getElementById('appoint');
      const card1 = document.createElement('div');
      card1.classList = 'card-body';
      const content = `
      <div class="col s12 m11">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            <p>${userName} has requested for your appointment. Please fix the timing of appointment.</p>
            <p>${status}</p>
            
            <div class="input-field col s12 l3">
              <input type="text" id="date" class="datepicker">
              <label for="date">Date</label>
          </div>
          <div class="input-field col s12 l3">
              <input type="text" class="timepicker" id="starttime">
              <label for="starttime">Start time</label>
          </div>
          <div class="col s12 l2" style="margin-top:2%;">
          <a class="btn white-text btn1" type="submit" id="">Accept</a>
        </div>
        <div class="col s12 l2" style="margin-top:2%;">
        <a class="btn white-text btn1" type="submit" id="">Reject</a>
      </div>
            
          
          </div>
          
        </div>
      </div>
    </div>
        `;
      container1.innerHTML += content;
  });
});
}
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, options);
});


const user = firebase.auth().currentUser;
console.log(user)
if (location.pathname == '/chatbot.html'){
  console.log("Hoiiiii")
  
  
}
