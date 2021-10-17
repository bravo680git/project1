let loginAPI=''
let root =document.querySelector('#main')
let Form
export let logInState=false

export function logIn() {
    fetch(loginAPI)
        .then(response => response.json)
        .then(data =>{
            sessionStorage.setItem("loginToken",data[0])
            root.removeChild(Form)
            logInState=true
        })
        .catch(error => {
            alert(error)
            logInState=true
            root.removeChild(Form)
        })
}

export function loadLoginForm(lang) {
    Form= document.createElement('div')
    Form.innerHTML=loginForm(lang)
    root.appendChild(Form)
}

// Create Login Form
function loginForm(lang) {
    return `
    <div class="login-box">
        <div class="login-form">
            <form >
                <img class="login-logo" src="../resources/images/logo_sistech.png" alt="Sistech logo">
                <div class="login-logo-label">${lang.logIn}</div>
                <div class="form-input">
                    <i class="fas fa-user-alt input-icon"></i>
                    <input id="username" class="username" type="text" placeholder='${lang.username}'>
                    <i class="fas fa-unlock input-icon"></i>
                    <input id="password" class="password" type="password" placeholder='${lang.password}'>
                </div>
                    <div class="false-warming" id="error"></div>
                    <button class="submit-btn" type="button">${lang.logIn}</button>
            </form>
        </div>    
    </div>
            `
}
