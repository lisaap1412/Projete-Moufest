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
    
const db = firebase.firestore()
let currentUser = {}
let profile = false 

function getUser(){
    firebase.auth().onAuthStateChanged( (user) => {
        if(user){
            currentUser.uid = user.uid
            getUserInfo(user.uid)
            let userlabel = document.getElementById("navbarDropdown")
            userlabel.innerHTML = user.email
        } else {
            swal.fire({
                icon: "success",
                title:"Redirecionando para a tela de Login",
            }).then( () => {  
                setTimeout( () => {
                    Window.location.replace("Login.HTML")
                }, 1000)
            })
        }
    })
}

async function getUserInfo(uid){
    const logUsers = await db.collection("profile").where("uid" , "==", uid).get()
    let userInfo = document.getElementById("userInfo")
    if (logUsers.docs.length == 0){
        userInfo.innerHTML = "Perfil não Registrado"
    } else {
        userInfo.innerHTML = "Perfil Registrado"
        profile = true
        const userData = logUsers.docs[0]
        currentUser.id = userData.id
        currentUser.firstName = userData.data().firstName
        currentUser.lastName = userData.data().lastName
        document.getElementById("inputFirstName").value = currentUser.firstName
        document.getElementById("inputLastName").value = currentUser.lastName
    }
}

async function saveProfile(){
    const firstName = document.getElementById("inputFirstName").value
    const lastName = document.getElementById("inputLastName").value
    if (!profile){
        await db.collection("profile").add({
            uid: currentUser.uid,
            firstName: firstName,
            lastName: lastName,
        })
        getUserInfo()
    } else {
        await db.collection("profile").doc(currentUser.id).update({
            firstName: firstName,
            lastName: lastName,
        })
        .then(() => {
            setTimeout(() => {
              window.location.replace("per.html")
            }, 1000)
          })
    }
}

window.onload = function (){
    getUser()
}