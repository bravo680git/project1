

function progress(width, min,max,value,unit) {
    let barWidth=value/(max-min)*width
    let backColor, color

    if (value/(max-min)<0.4) {
        backColor="red"
        color="white"
    }
    else if (value/(max-min)<0.7) {
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
        box-shadow:2px 2px 4px black;
    ">
    <div style="
        position:absolute;
        line-height:30px;
        height:29px;
        background-color:${backColor};
        width:${barWidth}px;
        border-radius: 10px;
        text-align:center;
        color: ${color};
        font-size: 20px;
        box-shadow:3px 0px 2px black;
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