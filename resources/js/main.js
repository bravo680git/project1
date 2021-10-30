import {loadLoginForm,logIn} from './login.js'
import {loadingApp,renderData} from './app.js'
import {vi,en} from './lang.js'

 

(function mainOperate() {
    start()
    .then(()=>{
        return new Promise(resolve =>{
            loadingApp()
            resolve()
        })
    })
    .then(renderData)
}) ()

//Define function
function start(lang = en) {
    let isLogin = sessionStorage.getItem('isLogin')

    return new Promise(resolve => {
        if (isLogin == "true") {
            resolve()
        }
        else {
            loadLoginForm(lang)
            handleClickBtn('.submit-btn', () => {
                logIn(resolve)
            })
        }
    })
}

function handleClickBtn(btnInfo,event) {
    let myBtn= document.querySelector(btnInfo)
    myBtn.onclick=event
}