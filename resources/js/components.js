

export function Header(lang) {

    return `
    <div class="header">
     <header>
         <div>
             <img class="logo" src="./resources/images/logo_sistech.jpg" alt="logo">
         </div>
         <div class="title">
             ${lang.mainTitle}
         </div>
         <div class="lang-convert">
             <button id="vi">vietnamese</button>
             <button id="en">english</button>
         </div>
         <div class="register" id="logOut-btn">
             <div class="icon">
             <i class="fas fa-sign-out-alt"></i>
             </div>
             ${lang.logOut}
         </div>    
     </header>
    </div>
    `
}

export function SystemValue(lang) {
    return `
    <div class="return" id="return"><i class="fas fa-chevron-left"></i></div>
    <div id="systemName"></div>
    <div id="cloPourHistory">
        ${lang.cloHist}
        <table>
            <tr class="tableTitle">
                <th>${lang.tableTime}</th>
                <th>${lang.tableEmp}</th>
                <th>${lang.tableCloAmount}</th>
            </tr>
        </table>
    <div id="add-history">
        <button title="Thêm nhật ký châm Clo"><i class="fas fa-plus"></i></button>
    </div>
    
    `
}

export function Navigation() {

    return `
    <div class="navigation">
    <ul id="pumpStationList">
        
    </ul>
    <i  id="open-close-btn" class="open fas fa-chevron-right""></i>
    </div>
    `
}

export function CloSystem(data,lang) {
    return `
    <div >
        <div class="title">
            ${data.processingSystemName}
        </div>
        <div class="level">
            ${lang.len}
            <div class="levelProgress-${data.processingSystemID}"></div>
        </div>
        <div class="pressure">
            ${lang.pres}
            <div class="pressureProgress-${data.processingSystemID}"></div>
        </div>
        <div class="clo-concentration">
            ${lang.cloConcen}
            <div class="cloConcentrationProgress-${data.processingSystemID}"></div>
        </div>
        <div class="clo-pour-history" id="showHistory">${lang.cloHist}</div>
    </div>
    `
}