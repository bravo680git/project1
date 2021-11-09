import {LoginForm} from './components.js'
import {startOrStopLoadingAnimation} from './appHandleFunction.js'

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
                document.getElementById('error').innerText=data.detail
                password.value=""
            }
            else if (data.title) {
                alert(data.title)
            }
            else {
                sessionStorage.setItem("loginToken", data.token.authToken)
                sessionStorage.setItem("isLogin", "true")
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

export {logIn,logOut,loadLoginForm}