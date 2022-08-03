const db = firestore.firestore()


function getUser(){
    firebase.auth().onAuthStateChanged( (user) => {
        if(user){
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

 window.onload = function (){
     getUser()
 }