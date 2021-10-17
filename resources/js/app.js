
export function loadingApp(lang) {
    let root=document.getElementById('main')
    let myApp=document.createElement('div')
    myApp.innerHTML=app(lang)
    root.appendChild(myApp)
    let openCloseBtn=document.getElementById('open-close-btn')
    let navigation=document.querySelector('.navigation ')
    let content=document.querySelector('.content')

    openCloseBtn.onclick=()=>{
        if (openCloseBtn.classList.contains('open')) {
            openCloseBtn.classList.remove('open')
            openCloseBtn.classList.add('close')
            openCloseBtn.classList.remove('fa-chevron-right')
            openCloseBtn.classList.add('fa-chevron-left')
            navigation.style.marginLeft="0"
            content.style.visibility="hidden"
         }
         else {
            openCloseBtn.classList.remove('close')
            openCloseBtn.classList.add('open')
            openCloseBtn.classList.remove('fa-chevron-left')
            openCloseBtn.classList.add('fa-chevron-right')
            navigation.style.marginLeft="-370px"
            content.style.visibility="visible"
         }
    }
}

function renderData(data) {

}

function app(lang) {

    return `
    <div>
       <div class="header">
        <header>
            <div>
                <img class="logo" src="./resources/images/logo_sistech.png" alt="logo">
            </div>
            <div class="title">
                ${lang.mainTitle}
            </div>
            <div class="register" id="login-btn">
                <div class="icon">
                    <i class="far fa-user-circle"></i>
                </div>
                ${lang.logIn}
            </div>
            <div class="lang-convert">
                <button id="vi">vietnamese</button>
                <button id="en">english</button>
            </div>
            
        </header>
       </div>

       <div class="navigation">
            <ul>
                <li class="selected">Tram bom 1</li>
                <li>Tram bom 2</li>
                <li>Tram bom 3</li>
            </ul>
            <i  id="open-close-btn" class="open fas fa-chevron-right""></i>
       </div>

       <div class="content">
            <div id="location">${lang.loca}
            </div>
            <div id="time">
            ${lang.time}
            </div>
            <div id="length">
            ${lang.len} 
            </div>
            <div id="pressure">
            ${lang.pres} 
            </div>
            <div id="clo-concentration">
            ${lang.cloConcen}
            </div>
            <div id="clo-pour-history">
                ${lang.cloHist}
                <table>
                    <tr id="title">
                        <th>${lang.tableTime}</th>
                        <th>${lang.tableEmp}</th>
                        <th>${lang.tableCloAmount}</th>
                    </tr>
                    <tr id="content">
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                    </tr>
                    <tr id="content">
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                    </tr>
                </table>
                <div id="add-history">
                    <button title="Thêm nhật ký châm Clo"><i class="fas fa-plus"></i></button>
                </div>
            </div>
       </div>
    </div>

    `
}