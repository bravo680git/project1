import {LoginForm} from './components.js'
import {startOrStopLoadingAnimation} from './appHandleFunction.js'
import { language } from './constants.js'

let loginAPI='https://sampleapiproject.azurewebsites.net/api/auth'
let root =document.querySelector('#main')
let Form

function logIn(callback) {
    let username=Form.querySelector('#username')  
    let password=Form.querySelector('#password')

    checkEmptyValue(username)
    checkEmptyValue(password)

    if (username.value=='' || password.value=='') {
        return
    }
    let account= {
        username:username.value,
        password:password.value
    }

    let options= {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json'
        },
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
root.removeChild(Form)
                callback()
}

function loadLoginForm(callback) {
    Form= document.createElement('div')
    Form.innerHTML=LoginForm(language)
    root.appendChild(Form)
    document.querySelector('.submit-btn').onclick =()=>{
        logIn(callback)
    }

    document.getElementById('username').onkeyup=(event)=>{    
        if (event.key=="Enter") {
            document.getElementById('password').focus()
        }
    }

    document.getElementById('password').onkeyup=(event)=>{
        if (event.key=="Enter") {
            logIn(callback)
        }
    }

    let inputs=document.querySelectorAll('input')
    inputs.forEach(input=>{
        input.onblur=()=>{
            checkEmptyValue(input)
        }
    })
}

function logOut() {
    sessionStorage.removeItem("loginToken")
    sessionStorage.setItem("isLogin","false")
}

function checkEmptyValue(e) {
        if (e.value == '' || e.value == ' ') {
            e.style.border = "2px solid red"
        }
        else {
            e.style.border = "1px solid black"
        }
}

export {logIn,logOut,loadLoginForm}
