
function loadLoginForm() {
    document.querySelector('#main').innerHTML=loginForm()
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
                    <input onclick="login()" class="submit-btn" type="button" value="Log in">
            </form>
            <p class="false-warming" id="error"></p>
        </div>    
    </div>
            `
}
loadLoginForm()