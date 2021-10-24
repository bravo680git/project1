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
        border:1px solid black;
        border-radius:10px;
        box-shadow:0px 3px 2px black;
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

{/* <div style="
        position:absolute;
        top: 10px;
        left: 0;
        font-size:16px;
    ">${min}</div>
    <div style="
        position:absolute;
        top: 10px;
        right: 0;
        font-size:16px;
    ">${max}</div>
    </div> */}

export function makeProgressBar(width, min,max,value,parent,unit) {
    let par=document.querySelector(parent)
    let bar=progress(width, min,max,value,unit)
    par.innerHTML=bar
}
