import {loadLoginForm,logIn,logInState} from './login.js'
import {loadingApp} from './app.js'

let mystate=false

function start() {
    return new Promise(resolve => {
        loadingApp()
        resolve()
    })
}
start()
    .then(()=>{
        return new Promise(resolve =>{
            handleClickBtn('#login-btn',()=>{
                loadLoginForm()
                resolve()
                })
        })
    })
    .then(()=>{
        return new Promise(resolve =>{
            handleClickBtn('.submit-btn',()=>{
                logIn()
                resolve()
            })
        })
    })
    .then(()=>{
        return new Promise(resolve=>{
            document.getElementById('login-btn').remove()
            resolve()
        })
    })
//Define function

function handleClickBtn(btnInfo,event) {
    let myBtn= document.querySelector(btnInfo)
    myBtn.onclick=event
}