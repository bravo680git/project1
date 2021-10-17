import {loadLoginForm,logIn,logInState} from './login.js'
import {loadingApp} from './app.js'
import {vi,en} from './lang.js'


start(en)
    .then(()=>{
        return new Promise(resolve =>{
            handleClickBtn('#login-btn',()=>{
                loadLoginForm(en)
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

function start(lang) {
    return new Promise(resolve => {
        loadingApp(lang)
        resolve(lang)
    })
}

function handleClickBtn(btnInfo,event) {
    let myBtn= document.querySelector(btnInfo)
    myBtn.onclick=event
}