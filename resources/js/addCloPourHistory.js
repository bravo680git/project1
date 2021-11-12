import { language,apiServer} from "./constants.js"
import {createRowOfTable} from './cloSystemsOfStation.js'

function saveHistory(data) {
    let option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Authorization':`Bearer ${sessionStorage.getItem('loginToken')}`
        },
        body: JSON.stringify(data)
    }

    fetch(`${apiServer}/chlorineinjections`,option)
    .then((response)=>{
        if (response.status==200 || response.status==300) {
            alert(language.created)
            removeForm()
            let newRow=createRowOfTable(data)
            let table = document.querySelector('table')
            table.insertBefore(newRow,table.firstChild)
        }
        else {
            throw new Error(response.statusText)
        }
    })
    .catch(error=>alert(error))
}

function loadAddForm(processId) {
    let root=document.getElementById('main')
    let myForm=document.createElement('div')
    myForm.id="Form-added"
    myForm.innerHTML=Form(language)
    root.appendChild(myForm)

    document.getElementById('save').onclick=()=>{
        handleSaveData(processId)
    }

    document.getElementById('close-form-btn').onclick=removeForm
   
}

function handleSaveData(processId) {
    let time=getTime()
    let staff=document.getElementById('staff').value.toPascalCase()
    let amount=document.getElementById('amount').value
   
    if (amount<50||amount>1000) {
        alert(language.falseAmount)
    }
    else  if (staff=='' || staff==' '){
        alert(language.emptyValue)
    }
    else {
        let data={
            employeeName:staff,
            injectionTime:time,
            amountOfChlorine :amount,
            processingSystemId:processId,
        }

        let saveConfirm=confirm(`
        ${language.yourData}
            ${language.time}: ${time}
            ${language.tableEmp}: ${staff}
            ${language.cloAmount}: ${amount}
        ${language.saveConfirm}
        `)

        if (saveConfirm) {
            saveHistory(data)
        }
    }
}

function removeForm() {
    let root=document.getElementById('main')
    let myForm=document.getElementById('Form-added')
    root.removeChild(myForm)
}

function getTime() {
    let date = new Date()
    let hour=Number(date.toISOString().slice(11,13))+7
    if (hour<10) {
        hour='0'+hour.toString()
    }
    else {
        hour=hour.toString()
    }
    let localDate=date.toISOString().slice(0,11)+hour+date.toISOString().slice(13,19)

    return localDate
}

function Form(language) {

    return `
    <div class="add-history-form">
        <form action="">
            <div class="title">${language.addFormTitle}</div>
            <div class="staff">
                <label for="staff">${language.tableEmp}</label>
                <input name="staff" id="staff" type="text">
            </div>
            <div class="amount">
                <label for="amount">${language.cloAmount}</label>
                <input name="amount" id="amount" type="text">
            </div>
            <button type="button" id="close-form-btn">&times;</button>
            <button type="button" id="save">${language.save}</button>
        </form>
    </div>
    `
}

String.prototype.toPascalCase = function() {
    return this
      .replace(
        new RegExp(/\s+(.)(\w*)/, 'g'),
        ($1, $2, $3) => ` ${$2.toUpperCase() + $3.toLowerCase()+' '}`
      )
      .replace(new RegExp(/\w/), s => s.toUpperCase())
      .replace(/\s+/g, ' ')
  }

{//  <div class="date">
//                 <label for="date">${language.tableTime}</label>
//                 <input name="date" id="date" type="text">
//                 <button type="button" id="getTimeBtn">${language.getDate}</button>
//             </div> 
}

export {loadAddForm,removeForm}