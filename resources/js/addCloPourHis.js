
export function loadAddForm(lang) {
    let root=document.getElementById('main')
    let myForm=document.createElement('div')
    myForm.id="Form-added"
    myForm.innerHTML=addForm(lang)
    root.appendChild(myForm)

    let closeBtn=document.getElementById('close-form-btn')
    closeBtn.onclick=removeForm
}

export function removeForm() {
    let root=document.getElementById('main')
    let myForm=document.getElementById('Form-added')
    root.removeChild(myForm)
}

function addForm(lang) {
    return `
    <div class="add-history-form">
        <form action="">
            <div class="title">${lang.addFormTitle}</div>
            <div class="date">
                <label for="date">${lang.tableTime}</label>
                <input name="date" id="date" type="text">
                <button type="button">${lang.getDate}</button>
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