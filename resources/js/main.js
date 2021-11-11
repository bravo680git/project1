import {loadLoginForm} from './login.js'
import {loadingApp,renderData} from './app.js'

 
(function mainOperate() {
    start()
    .then(()=>{
        return new Promise(resolve =>{
            loadingApp()
            resolve()
        })
    })
    .then(renderData)
}) ()


function start() {
    let isLogin = sessionStorage.getItem('isLogin')

    return new Promise(resolve => {
        if (isLogin == "true") {
            resolve()
        }
        else { 
            loadLoginForm(resolve)
        }
    })
}