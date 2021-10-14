import {loadLoginForm,logIn,logInState} from './login.js'
import {loadingApp} from './app.js'

let mystate=false
function start() {
    loadingApp()
    handleClickBtn('#login-btn',()=>{
        loadLoginForm()
        handleClickBtn('.submit-btn',()=>{
            logIn()
        })
    })
}

start()
document.onclick=()=>{
    if (logInState && !mystate) {
        console.log("OK")
        mystate=true
        let btn=document.getElementById('login-btn')
        btn.remove()
    }
}
//Define function

function handleClickBtn(btnInfo,event) {
    let myBtn= document.querySelector(btnInfo)
    myBtn.onclick=event
}