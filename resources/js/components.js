

function Header(lang) {

    return `
    <div class="header"> 
         <div>
             <img class="logo" src="./resources/images/logo_sistech.jpg" alt="logo">
         </div>
         <div class="title">
             ${lang.mainTitle}
         </div>
        <div class="header-btn">
            <div class="register" id="logOut-btn">
                <div class="icon">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
                ${lang.logOut}
            </div>  
            <div class="lang-convert">
                <button id="vi">vietnamese</button>
                <button id="en">english</button>
            </div>
      
        </div>    
    </div>
    `
}

function Footer() {
    return `
    <footer>
        <div class="name">Trung tâm nghiên cứu và đào tạo tự động hóa SISTRAIN</div>
        <div class="follow">
        <div title="website">
            <a href="http://www.sistrain.com" target="blank" >
            <i class="fas fa-globe"></i></a>
        </div>    
        <div title="youtube">
            <a href="https://www.youtube.com/channel/UCZlv_mk1VFnno-I3ciZO-ng"target="blank" >
            <i class="fab fa-youtube-square"></i></a>
        </div>
        <div title="facebook">
            <a href="https://www.facebook.com/SistrainCenter"target="blank" >
            <i class="fab fa-facebook-square"></i></a>
        </div>
        </div>
        <div class="contact">
            <div>
                <i class="fas fa-location-arrow"></i>
                367/2 Hòa Hảo, P.5, Q.10, TP Hồ Chí Minh
            </div>
            <div><i class="fas fa-envelope-square"></i>
            sistrain@sistech.com.vn</div>
            <div><i class="fas fa-phone-square"></i>093 411 18 41</div>
        </div>
        <div class="coppyright">Copyright &copy;2021 by Sistrain software development team</div>
    </footer>
    `
}

function SystemValue(lang) {
    return `
    <div class="return" id="return"><i class="fas fa-chevron-left"></i></div>
    <div id="systemName"></div>
    <div id="cloPourHistory">
        ${lang.cloHist}
        <table>
            <thead>
                <tr class="tableTitle">
                    <th>${lang.tableTime}</th>
                    <th>${lang.tableEmp}</th>
                    <th>${lang.tableCloAmount}</th>
                </tr>
            </thead>
        </table>
    <div id="add-history">
        <button title="Thêm nhật ký châm Clo"><i class="fas fa-plus"></i></button>
    </div>
    `
}

function Navigation() {

    return `
    <div class="navigation">
    <ul id="pumpStationList">
        
    </ul>
    <i  id="open-close-btn" class="open fas fa-chevron-right""></i>
    </div>
    `
}

function CloSystem(data,lang) {
    return `
    <div >
        <div class="title">
            ${data.processingSystemName}
        </div>
        <div class="level">
            ${lang.len}
            <div class="levelProgress-${data.processingSystemId}"></div>
        </div>
        <div class="pressure">
            ${lang.pres}
            <div class="pressureProgress-${data.processingSystemId}"></div>
        </div>
        <div class="clo-concentration">
            ${lang.cloConcen}
            <div class="cloConcentrationProgress-${data.processingSystemId}"></div>
        </div>
        <div class="clo-pour-history" id="showHistory">${lang.cloHist}</div>
    </div>
    `
}

function LoginForm(lang) {
    return `
    <div class="login-box">
        <div class="login-form">
            <form >
                <img class="login-logo" src="../resources/images/logo_sistech.jpg" alt="Sistech logo">
                <div class="login-logo-label">${lang.mainTitle}</div>
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

function App(lang) {

    return `
    <div style="height:100%">
        ${Header(lang)}
        <div class="body clearfix">
            ${Navigation()}

            <div class="content" id="content">
            </div>
        </div>
        ${Footer()}
    </div>
    
    `
}

function Content() {

    return `
    <div id="location">
    <i class="fas fa-map-marker-alt"></i>
    </div>
    `
}

export {App,SystemValue,Navigation,CloSystem,LoginForm,Content}