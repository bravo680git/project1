import {renderValuesOfStation,renderValuesOfStationLoop} from './app.js'
import { startOrStopLoadingAnimation,openClodeNav } from './appHandleFunction.js'

let stationTempId

function renderList(data) {
    let listBox = document.getElementById('pumpStationList')
    data.map(item => {
        let stattionLi = document.createElement('li')
        stattionLi.id=item.stationId
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
            startOrStopLoadingAnimation(true)
            renderValuesOfStation(stationTempId)   
            renderValuesOfStationLoop(stationTempId)
            if (screen.width <= 780) {
                openClodeNav()
            }
        }
    }
}

export {renderList,handleChangSelectedStation}