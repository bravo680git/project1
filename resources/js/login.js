let loginAPI=''
let root =document.querySelector('#main')
let Form

export function logIn(callback) {
    let username=Form.querySelector('#username').value
    let password=Form.querySelector('#password').value
    let account= {
        username:username,
        password:password
    }
    let options= {
        method: "POST",
        body: JSON.stringify(account)
    }

    fetch(loginAPI,options)
        .then(response => response.json)
        .then(data => {
            sessionStorage.setItem("loginToken", data[0])
            sessionStorage.setItem("isLogin", "true")

            root.removeChild(Form)
            callback()
        })
        .catch(error => {
            console.log(error);
            falseAccountError()
        })
}

export function logOut() {
    sessionStorage.removeItem("loginToken")
    sessionStorage.setItem("isLogin","false")
}

export function loadLoginForm(lang) {
    Form= document.createElement('div')
    Form.innerHTML=loginForm(lang)
    root.appendChild(Form)
}

function falseAccountError() {
    let errorMessage='Username or password wrong!'
    document.getElementById('error').innerText=errorMessage
}

// Create Login Form
function loginForm(lang) {
    return `
    <div class="login-box">
        <div class="login-form">
            <form >
                <img class="login-logo" src="../resources/images/logo_sistech.jpg" alt="Sistech logo">
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
