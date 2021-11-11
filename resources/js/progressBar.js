import {progressBarLevel} from './constants.js'

function progress(width, min,max,value,unit) {
    let barWidth=value/(max-min)*width
    let backColor, color
    let {firstLevel,secondLevel}=progressBarLevel

    if (value/(max-min)<firstLevel) {
        backColor="red"
        color="white"
    }
    else if (value/(max-min)<secondLevel) {
        backColor="green"
        color="white"
    }
    else {
        backColor="yellow"
        color="black"
    }
    
    return `
    <div style="
    position:relative;
    height: 40px;
    width:${width+20}px;
    
    border-radius: 15px;
    ">
    <div style="
        height:30px;
        width:${width}px;
        border-radius: 10px;
        background-color:#00000024;
        box-shadow:1px 1px 4px black;
    ">
    <div style="
        position:absolute;
        line-height:30px;
        height:30px;
        background-color:${backColor};
        width:${barWidth}px;
        border-radius: 10px;
        text-align:center;
        color: ${color};
        font-size: 20px;
    ">
    ${value}${unit}</div>
    </div>
    
    </div>
    `
}

function makeProgressBar(width, min,max,value,parent,unit) {
    let par=document.querySelector(parent)
    let bar=progress(width, min,max,value,unit)
    par.innerHTML=bar
}

export {makeProgressBar}