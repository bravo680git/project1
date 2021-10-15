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

export function loadLoginForm() {
    Form= document.createElement('div')
    Form.innerHTML=loginForm()
    root.appendChild(Form)
}

// Create Login Form
function loginForm() {
    return `
    <div class="login-box">
        <div class="login-form">
            <form >
                <img class="login-logo" src="../resources/images/logo_sistech.png" alt="Sistech logo">
                <label for="login-logo" class="login-logo-label">Sistrain administraitor log in</label>
                <div class="form-input">
                    <i class="fas fa-user-alt input-icon"></i>
                    <input id="username" class="username" type="text" placeholder="Username">
                    <i class="fas fa-unlock input-icon"></i>
                    <input id="password" class="password" type="password" placeholder="Password">
                </div>
                    <div class="false-warming" id="error"></div>
                    <input class="submit-btn" type="button" value="Log in">
            </form>
        </div>    
    </div>
            `
}
