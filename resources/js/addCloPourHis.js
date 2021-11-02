
export {loadAddForm,removeForm}

function loadAddForm(lang,processId) {
    let root=document.getElementById('main')
    let myForm=document.createElement('div')
    myForm.id="Form-added"
    myForm.innerHTML=addForm(lang)
    root.appendChild(myForm)

    getTime()

    document.getElementById('save').onclick=()=>{
        let time=document.getElementById('date').value 
        let staff=document.getElementById('staff').value
        let amount=document.getElementById('amount').value
        let data={
            employeeName:staff,
            injectionTime:time,
            chlorineVolume:amount,
            chlorineInjectionID:processId
        }

        saveHistory(data)
    }

    let closeBtn=document.getElementById('close-form-btn')
    closeBtn.onclick=removeForm
}

function saveHistory(data) {
    let option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'accept': '*/*'
        },
        
        body: JSON.stringify(data)
    }

    fetch('https://water-test-training.herokuapp.com/chlorineinjections',option)
    .then(()=>{
        alert("Successful!")
    })
    .catch(error=>alert(error))
}

function removeForm() {
    let root=document.getElementById('main')
    let myForm=document.getElementById('Form-added')
    root.removeChild(myForm)
}

function getTime() {
    let time=document.getElementById('date')
    document.getElementById('getTimeBtn').onclick=()=>{
        let date=new Date()
        let isoDate=date.toISOString()
        time.value=isoDate.slice(0,19)
    }

}

function addForm(lang) {
    return `
    <div class="add-history-form">
        <form action="">
            <div class="title">${lang.addFormTitle}</div>
            <div class="date">
                <label for="date">${lang.tableTime}</label>
                <input name="date" id="date" type="text">
                <button type="button" id="getTimeBtn">${lang.getDate}</button>
            </div>
            <div class="staff">
                <label for="staff">${lang.tableEmp}</label>
                <input name="staff" id="staff" type="text">
            </div>
            <div class="amount">
                <label for="amount">${lang.cloAmount}</label>
                <input name="amount" id="amount" type="text">
            </div>
            <button type="button" id="close-form-btn">&times;</button>
            <button type="button" id="save">${lang.save}</button>
        </form>
    </div>
    `
}