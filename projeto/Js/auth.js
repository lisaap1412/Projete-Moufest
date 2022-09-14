const firebaseConfig = {
  apiKey: "AIzaSyBs4UcM-6S991C_yVBgUsqcWqlyt0wSSds",
  authDomain: "fir-aa97d.firebaseapp.com",
  databaseURL: "https://fir-aa97d-default-rtdb.firebaseio.com",
  projectId: "fir-aa97d",
  storageBucket: "fir-aa97d.appspot.com",
  messagingSenderId: "671283771919",
  appId: "1:671283771919:web:91cb18aeea1d5b072f017a",
  measurementId: "G-S9K2WEBBMF"
};
 
firebase.initializeApp(firebaseConfig)

function login() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut()
  }
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      swal
        .fire({
          icon: "success",
          title: "Login realizado com sucesso",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("index.html")
          }, 1000)
        })
    })
    .catch((error) => {
      const errorCode = error.code
      switch (errorCode) {
        case "auth/wrong-password":
          swal.fire({
            icon: "error",
            title: "Senha inválida",
          })
          break
        case "auth/invalid-email":
          swal.fire({
            icon: "error",
            title: "E-mail inválido",
          })
          break
        case "auth/user-not-found":
          swal
            .fire({
              icon: "warning",
              title: "Usuário não encontrado",
              text: "Deseja criar esse usuário?",
              showCancelButton: true,
              cancelButtonText: "Não",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sim",
              confirmButtonColor: "#3085d6",
            })
            .then((result) => {
              if (result.value) {
                signUp(email, password)
              }
            })
          break
        default:
          swal.fire({
            icon: "error",
            title: error.message,
          })
      }
    })
}

function signUp(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      swal
        .fire({ icon: "success", title: "Usuário foi criado com sucesso" })
        .then(() => {
          setTimeout(() => {
            window.location.replace("index.html")
          }, 1000)
        })
    })
    .catch((error) => {
      const errorCode = error.code
      switch (errorCode) {
        case "auth/weak-password":
          swal.fire({
            icon: "error",
            title: "Senha muito fraca",
          })
          break
        default:
          swal.fire({
            icon: "error",
            title: error.message,
          })
      }
    })
}


function logout(){
  firebase.auth().signOut()
}
