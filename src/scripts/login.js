import {login} from "./requests.js"
import{getLocalStorage} from "./localStorage.js"


function verificLogin(){
    const localStorage = getLocalStorage()
    if (localStorage.user){
        window.location.replace('../../index.html')
    }
}
verificLogin()

function eventLogin(){
const form = document.querySelector("#form")
const spreadForm = [...form]
form.addEventListener("submit", async(event)=>{
    event.preventDefault()
    const object = getValues(spreadForm)
    login(object)
})
}
eventLogin()

function getValues(formElements) {
    const object = {}

    formElements.forEach(element => {
        if (element.name && element.value) {
            object[element.id] = element.value
            
        }
    })
    return object
}

export{verificLogin}
