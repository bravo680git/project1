import {CloSystem,SystemValue,Content} from './components.js'
import { renderValuesOfStationLoop,renderValuesOfStation} from './app.js'
import {makeProgressBar} from './progressBar.js'
import {startOrStopLoadingAnimation,renderValue} from './appHandleFunction.js'
import {language} from './constants.js'

function renderCloSystems(data,stationId,loop) {
    let content=document.getElementById("subContent")
    data.map((item)=>{
        let systemItem=document.createElement('div')
        systemItem.id="cloSystems"+item.processingSystemId
        systemItem.classList.add('cloSystem')
        systemItem.innerHTML=CloSystem(item,language)
        content.appendChild(systemItem)

        makeProgressBar(250,0,10,item.waterLevel,".levelProgress-"+item.processingSystemId,'m')
        makeProgressBar(250,0,100,item.chlorineConcentration,".cloConcentrationProgress-"+item.processingSystemId,'%')
        makeProgressBar(250,0,100,item.waterPressure,".pressureProgress-"+item.processingSystemId,'pa')
        
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

    // document.getElementById('add-history').onclick=()=>{
    //     loadAddForm(language,data[0].processingSystemID)
    // }

    document.getElementById('return').onclick=()=>{
        startOrStopLoadingAnimation(true)
        renderValuesOfStation(stationId)
        renderValuesOfStationLoop(stationId)
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
        table.insertBefore(tableRow,table.firstChild.nextSibling)
    })  
}

function createRowOfTable(data) {
    let row = document.createElement('tr')
    row.classList.add('tableContent')
    let time=new Date(data.injectionTime).toUTCString()
    row.innerHTML = `
        <th>${time.slice(4,25)}</th>
        <th>${data.employeeName}</th>
        <th>${data.amountOfChlorine}</th>
        `
    return row
}

function valuesOfStation(data, stationId,loop) {
    startOrStopLoadingAnimation(false)
    if (document.getElementById('subContent')) {
        document.getElementById('subContent').remove()
    }

    let contentBox = document.getElementById('content')
    let content = document.createElement('div')
    content.id = "subContent"
    content.innerHTML = Content()
    contentBox.appendChild(content)

    renderValue("location", data[0].stationAddress)
    renderCloSystems(data[0].processingSystems, stationId,loop)
}


export {renderCloSystems,valuesOfStation}