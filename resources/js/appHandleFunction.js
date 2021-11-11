import {language} from './constants.js'

function handleCallApiError(response) {
    switch (response.status) {
        case 200:
        case 300:
            break
        case 401:
            logOut()
            throw new Error(language.messageToLogout)
        default:
            throw new Error(response.statusText)
    }
}

function handleLogOut(lang) {
    document.querySelector('.navigation').remove()
    document.querySelector('.content').remove()
    document.querySelector('#logOut-btn').remove()
    document.querySelector('.lang-convert').remove()

    let newRegisterBtn = document.createElement('div')
    newRegisterBtn.classList.add('register')
    newRegisterBtn.id = "logIn-btn"
    newRegisterBtn.innerHTML = `
                <div class="icon">
                    <i class="fas fa-sign-in-alt"></i>
                </div>
                ${lang.logIn}
        `
    document.querySelector('.header-btn').appendChild(newRegisterBtn)
}

function changeLanguage() {
    document.getElementById('vi').onclick=()=>{
        localStorage.setItem('language','vi')
        location.reload()
    }

    document.getElementById('en').onclick=()=>{
        localStorage.setItem('language','en')  
        location.reload()
    }
    
}

function openClodeNav() {
    let openCloseBtn=document.getElementById('open-close-btn')
    let navigation = document.querySelector('.navigation ')

    window.scrollTo(0, 0)
    if (openCloseBtn.classList.contains('open')) {
        openCloseBtn.classList.remove('open')
        openCloseBtn.classList.add('close')
        openCloseBtn.classList.remove('fa-chevron-right')
        openCloseBtn.classList.add('fa-chevron-left')
        navigation.style.visibility = "visible"
        document.body.style.overflow="hidden"
    }
    else {
        openCloseBtn.classList.remove('close')
        openCloseBtn.classList.add('open')
        openCloseBtn.classList.remove('fa-chevron-left')
        openCloseBtn.classList.add('fa-chevron-right')
        navigation.style.visibility = "hidden"
        document.body.style.overflow="scroll"
    }

}

function startOrStopLoadingAnimation(run) {
    let loadingAnimation = document.querySelector('.loading')
    if (run) {
        loadingAnimation.style.visibility = "visible"
    }
    else {
        loadingAnimation.style.visibility = "hidden"
    }
}

function renderValue(itemId,data) {
    let renderItem=document.createElement('span')
    renderItem.innerText=data

    let itemBox=document.getElementById(itemId)
    if (itemBox.childNodes[1]) {
        itemBox.removeChild(itemBox.lastChild)
    }
    itemBox.appendChild(renderItem)
}


export {handleCallApiError,handleLogOut,changeLanguage,openClodeNav,startOrStopLoadingAnimation,renderValue}