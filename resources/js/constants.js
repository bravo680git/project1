import { vi,en } from "./lang.js"

const cycleTime=60000
const apiServer="https://sampleapiproject.heroku.app"
const language=localStorage.getItem('language')=='vi'?vi:en

const progressBarLevel={
    firstLevel:0.4,
    secondLevel:0.7,
}

export {cycleTime,apiServer,language,progressBarLevel}
