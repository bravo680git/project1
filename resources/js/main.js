import {loadLoginForm,logIn} from './login.js'
import {loadingApp} from './app.js'
import {vi,en} from './lang.js'

mainOperate()

export function mainOperate() {
    start()
    .then((lang)=>{
        return new Promise(resolve =>{
            handleClickBtn('.submit-btn',()=>{
                logIn(lang)
                resolve(lang)
            })
        })
    })
    .then((lang)=>{
        return new Promise(resolve =>{
            loadingApp(lang)
        })
    })
}
   
//Define function

function start(lang=en) {
    return new Promise(resolve => {
        loadLoginForm(lang)
        resolve(lang)
    })
}

function handleClickBtn(btnInfo,event) {
    let myBtn= document.querySelector(btnInfo)
    myBtn.onclick=event
}

