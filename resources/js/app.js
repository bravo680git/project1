import { logOut } from "./login.js"
import {App} from './components.js'
import {handleCallApiError,handleLogOut,changeLanguage,openClodeNav,startOrStopLoadingAnimation,renderValue} from './appHandleFunction.js'
import {valuesOfStation} from './cloSystemsOfStation.js'
import {renderList,handleChangSelectedStation} from './stationList.js'
import {cycleTime,language,apiServer} from './constants.js'

var loop


function loadingApp() {  
    let root=document.getElementById('main')
    let myApp=document.createElement('div')
    myApp.innerHTML=App(language)
    myApp.style.height="100%"
    root.appendChild(myApp)

    document.getElementById('open-close-btn').onclick=openClodeNav

    changeLanguage()
    
    document.getElementById('logOut-btn').onclick=()=>{
        clearInterval(loop)
        logOut()
        handleLogOut(language)
        document.getElementById('logIn-btn').onclick=()=>{
            location.reload()
        }
        
    }

} 


function renderData() {
    startOrStopLoadingAnimation(true)

    let fetchOption={
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Authorization':`Bearer ${sessionStorage.getItem('loginToken')}`
        }
    }
    fetch(`${apiServer}/stations/list`,fetchOption)
        .then(response=>{
            handleCallApiError(response)
            return response.json()
        })
        .then(data=>{
            renderList(data)
            clearInterval(loop)
            renderValuesOfStation(data[0].stationId)
            renderValuesOfStationLoop(data[0].stationId)
            handleChangSelectedStation()
        }) 
        .catch((error)=>{
            alert(error)
            //logOut()
            //location.reload()
        })       
}

function renderValuesOfStation(stationId) {
    let fetchOption={
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Authorization':`Bearer ${sessionStorage.getItem('loginToken')}`
        }
    }

    fetch(`${apiServer}/stations/` + stationId + "/details",fetchOption)
        .then(response => {
            handleCallApiError(response)
            return response.json()
        })
        .then(data => {
            startOrStopLoadingAnimation(false)
            valuesOfStation(data,stationId,loop)
        })
        .catch((error)=>{
            alert(error)
            //logOut()
            //location.reload()
        }) 
}

function renderValuesOfStationLoop(stationId) {
    clearInterval(loop)
    loop=setInterval(()=>{
        renderValuesOfStation(stationId)
    },cycleTime)
}

export {loadingApp,renderData,renderValuesOfStation,renderValuesOfStationLoop}