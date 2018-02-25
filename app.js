function registrar() {
    alert("Diste un click registar");
    var email = document.getElementById('email').value;
    var pass = document.getElementById('contrasena').value;
    console.log(email +" "+ pass);

    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(function(){
        verificar()
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function ingresar() {
    alert("Diste un click en ingresar");
    var emailEnter = document.getElementById('emailEnter').value;
    var passEnter = document.getElementById('contrasenaEnter').value;
    console.log(emailEnter +" "+ passEnter);

    firebase.auth().signInWithEmailAndPassword(emailEnter, passEnter).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Existe este usuario");
            aparece(user);
            console.log(user);
        } else {
          // User is signed out.
          // ...
          console.log("NO existe usuario activo");
          content.innerHTML = `
          <div class="container mt-5">
            <div class="alert alert-danger" role="alert">
                <strong>Oh no!</strong> No has iniciado sesion.
            </div>
          </div>
          `;
        }
    }); 
}

observador();

function aparece(user) {
    var content = document.getElementById('content');
    var user = user;
    if (user.emailVerified) {
        content.innerHTML = `
        <div class="container mt-5">
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
                <p>Usuario validado: ${user.emailVerified}</p>
            </div>
            <button onclick="cerrar()" class="btn btn-danger">Cerrar sesion</button>
        </div>        
        `;   
    }
}

function cerrar() {
    firebase.auth().signOut()
    .then(function(){
        console.log("Saliendo...");
    })
    .catch(function(error){
        console.log(error);
    })
}

function verificar() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
    // Email sent.
    console.log("Correo enviado");
    }).catch(function(error) {
    // An error happened.
        console.log(error);
    });
}