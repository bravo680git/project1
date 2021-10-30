import { vi,en } from "./lang.js"
import { logOut } from "./login.js"
import { loadAddForm } from "./addCloPourHis.js"
import {Header,Navigation,SystemValue,CloSystem,Footer} from './components.js'
import {makeProgressBar} from './progressBar.js'

let loop
let cycleTime=10000000
let stationTempId
let language=localStorage.getItem('language')=='vi'?vi:en


export function loadingApp() {  
    let root=document.getElementById('main')
    let myApp=document.createElement('div')
    myApp.innerHTML=App(language)
    myApp.style.height="100%"
    root.appendChild(myApp)

    document.getElementById('open-close-btn').onclick=openClodeNav

    changeLanguage()
    
    document.getElementById('logOut-btn').onclick=()=>{
        logOut()
        handleLogOut(language)
        document.getElementById('logIn-btn').onclick=()=>{
            location.reload()
        }
    }

} 


//Render data to app
export function renderData() {
    startOrStopLoadingAnimation(true)
    fetch('https://water-test-training.herokuapp.com/stations/list')
        .then(response=>response.json())
        .then(data=>{
            startOrStopLoadingAnimation(false)
            renderList(data)
            clearInterval(loop)
            renderValuesOfStation(data[0].stationID,true)
            loop=setInterval(()=>{
                renderValuesOfStation(data[0].stationID,false)
            },cycleTime)
            handleChangSelectedStation()
        })        
}
    //list of stations
function renderList(data) {
    let listBox = document.getElementById('pumpStationList')
    data.map(item => {
        let stattionLi = document.createElement('li')
        stattionLi.id=item.stationID
        stattionLi.innerText = item.stationName
        listBox.appendChild(stattionLi)
    })
    listBox.childNodes[1].classList.add('selected')
    handleChangSelectedStation()
}

function handleChangSelectedStation() {
    let pumpStationList=document.getElementById('pumpStationList').childNodes
    for (let i=0;i<pumpStationList.length;i++) {
        let child=pumpStationList[i]

        child.onclick=(e)=>{
            stationTempId=e.target.id
            document.querySelector('.selected').classList.remove('selected')
            child.classList.add('selected')
            clearInterval(loop)
            renderValuesOfStation(stationTempId,true)   
            loop=setInterval(()=>{
                renderValuesOfStation(stationTempId,false)
            },cycleTime)
            if (screen.width <= 480) {
                openClodeNav()
            }
        }
    }
}

function renderValuesOfStation(stationId,enable) {
    startOrStopLoadingAnimation(true,enable)
    fetch("https://water-test-training.herokuapp.com/stations/" + stationId + "/details")
        .then(resopnse => resopnse.json())
        .then(data => {
            startOrStopLoadingAnimation(false)
            if (document.getElementById('subContent')) {
                document.getElementById('subContent').remove()
            }

            let contentBox = document.getElementById('content')
            let content = document.createElement('div')
            content.id = "subContent"
            content.innerHTML = `
            <div id="location">${language.loca}
            </div>
            <!--
            <div id="time">
                ${language.time}
            </div>
            -->
            `
            contentBox.appendChild(content)

            renderValue("location", data[0].stationAddress)
            renderCloSystems(data[0].processingSystems, stationId)
        })
}
    //clo systems of a station
function renderCloSystems(data,stationId) {
    let content=document.getElementById("subContent")
    data.map((item)=>{
        let systemItem=document.createElement('div')
        systemItem.id="cloSystems"+item.processingSystemID
        systemItem.classList.add('cloSystem')
        systemItem.innerHTML=CloSystem(item,language)
        content.appendChild(systemItem)

        makeProgressBar(250,0,10,item.waterLevel,".levelProgress-"+item.processingSystemID,'m')
        makeProgressBar(250,0,100,item.chlorineConcentration,".cloConcentrationProgress-"+item.processingSystemID,'%')
        makeProgressBar(250,0,100,item.waterPressure,".pressureProgress-"+item.processingSystemID,'pa')
        
        systemItem.querySelector('#showHistory').onclick=()=>{
            renderHistoryTable(item.chlorineInjections,item.processingSystemName,stationId)
            document.getElementById('open-close-btn').style.visibility="hidden"
            clearInterval(loop)
        }
    })
    
}

function renderHistoryTable(data,systemName,stationId) {
    
    if (document.getElementById('subContent')) {
        document.getElementById('subContent').remove()
    }

    let contentBox=document.getElementById('content')
    let systemValuePage=document.createElement('div')
    systemValuePage.id="subContent"
    systemValuePage.innerHTML=SystemValue(language)
    contentBox.appendChild(systemValuePage)

    document.getElementById('add-history').onclick=()=>{
        loadAddForm(language,data[0].processingSystemID)
    }

    document.getElementById('return').onclick=()=>{
        clearInterval(loop)
        renderValuesOfStation(stationId,true)
        loop=setInterval(()=>{
            renderValuesOfStation(stationId,false)
        },cycleTime)
        if (screen.width<=480) {
            setTimeout(()=>{
                document.getElementById('open-close-btn').style.visibility="visible"
            },500)
        } 
    }

    document.getElementById('systemName').innerText=systemName
    let table=document.querySelector('table')

    data.map(rowData=>{
        let tableRow=createRowOfTable(rowData)
        table.appendChild(tableRow)
    })
}

function createRowOfTable(data) {
    let row = document.createElement('tr')
    row.classList.add('tableContent')
    let time=new Date(data.injectionTime)
    row.innerHTML = `
        <th>${time.toUTCString()}</th>
        <th>${data.employeeName}</th>
        <th>${data.chlorineVolume}</th>
        `
    return row
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


//App and handle app event 
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
    document.querySelector('.header').appendChild(newRegisterBtn)
    clearInterval(loop)
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
    let content = document.querySelector('.content')

    window.scrollTo(0, 0)
    if (openCloseBtn.classList.contains('open')) {
        openCloseBtn.classList.remove('open')
        openCloseBtn.classList.add('close')
        openCloseBtn.classList.remove('fa-chevron-right')
        openCloseBtn.classList.add('fa-chevron-left')
        navigation.style.marginLeft = "0"
        content.style.visibility = "hidden"
    }
    else {
        openCloseBtn.classList.remove('close')
        openCloseBtn.classList.add('open')
        openCloseBtn.classList.remove('fa-chevron-left')
        openCloseBtn.classList.add('fa-chevron-right')
        navigation.style.marginLeft = "-600px"
        content.style.visibility = "visible"
    }

}

function startOrStopLoadingAnimation(run, enable = true) {
    if (enable) {
        let loadingAnimation = document.querySelector('.loading')
        if (run) {
            loadingAnimation.style.visibility = "visible"
        }
        else {
            loadingAnimation.style.visibility = "hidden"
        }
    }
}

function App(lang) {

    return `
    <div style="height:100%">
        ${Header(lang)}
        <div class="body">
            ${Navigation()}

            <div class="content" id="content">
            </div>
        </div>
        ${Footer()}
    </div>
    
    `
}