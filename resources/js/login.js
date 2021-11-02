import {LoginForm} from './components.js'
import {vi,en} from './lang.js'
import {startOrStopLoadingAnimation} from './app.js'

let loginAPI='https://sampleapiproject.azurewebsites.net/api/auth'
let root =document.querySelector('#main')
let Form

function logIn(callback) {
    let username=Form.querySelector('#username')  
    let password=Form.querySelector('#password')
    let account= {
        username:username.value,
        password:password.value
    }
    let options= {
        method: 'POST',  
        cache: 'no-cache', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(account)
    }

    startOrStopLoadingAnimation(true)
    fetch(loginAPI,options)
        .then(response => response.json())
        .then(data => {
            startOrStopLoadingAnimation(false)
            if (data.detail) {
                falseAccountError(data.detail)
                password.value=""
            }
            else if (data.title) {
                alert(data.title)
            }
            else {
                sessionStorage.setItem("loginToken", data.token.authToken)
                sessionStorage.setItem("isLogin", "true")
                setTimeout(()=>{
                    logOut()
                    if (localStorage.getItem('language')=='vi') {
                        alert(vi.messageToLogout)
                    }
                    else {
                        alert(en.messageToLogout)
                    }
                    location.reload()
                },3600000)
                root.removeChild(Form)
                callback()
            }
        })
        .catch(error => console.log(error))
}

function logOut() {
    sessionStorage.removeItem("loginToken")
    sessionStorage.setItem("isLogin","false")
}

function loadLoginForm(lang) {
    Form= document.createElement('div')
    Form.innerHTML=LoginForm(lang)
    root.appendChild(Form)
}

function falseAccountError(errorMessage) {
    document.getElementById('error').innerText=errorMessage
}

export {logIn,logOut,loadLoginForm}