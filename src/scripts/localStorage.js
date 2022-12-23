function getLocalStorage() {
    const storage = localStorage.getItem("token-user")
    if (!storage) {
        return []
    }
    return JSON.parse(storage)
}


function setLocalStorage(token) {
    window.localStorage.setItem("token-user", JSON.stringify(token))
}

function clearStorage() {
    window.localStorage.removeItem("token-user")
}

export {
    setLocalStorage,
    clearStorage,
    getLocalStorage,
}
