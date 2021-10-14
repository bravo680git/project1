

export function loadingApp() {
    let root=document.getElementById('main')
    let myApp=document.createElement('div')
    myApp.innerHTML=app()
    root.appendChild(myApp)
}

function renderData(data) {

}

function app() {

    return `
    <button id="login-btn">Log in</button>
    `
}