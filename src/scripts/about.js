import { getLocalStorage, clearStorage } from "./localStorage.js"
import { readProfile } from "./requests.js";

const profileAvatar = async () => {
    const token = getLocalStorage()
    const profileAvatar = document.querySelector('#profile_avatar')
    const profileAvatarBox = document.querySelector('#profile_avatar_box')
    const { avatar_url } = await readProfile()
    if (token.token) {
        profileAvatar.src = avatar_url
        profileAvatarBox.classList = 'profile-avatar'
    }
}
profileAvatar()

const changeButtonsHeader = () => {
    const token = getLocalStorage()
    const button = document.querySelector('#register')
    if (token.token) {
      button.innerText = 'Perfil'
      button.addEventListener('click', (e) => {
          window.location.replace('./profile.html')
      })
    } else {
      button.innerText = 'Register'
      button.addEventListener('click', (e) => {
          window.location.replace('./register.html')
      })
    }
  }
  changeButtonsHeader()
  
  const buttonLogout = () => {
      const token = getLocalStorage()
    const button = document.querySelector('#login')
    if (token.token) {
      button.innerText = 'Logout'
      button.addEventListener('click', (e) => {
        e.preventDefault()
          clearStorage()
          window.location.replace('./login.html')
      })
    } else {
      button.innerText = 'Login'
      button.addEventListener('click', (e) => {
          e.preventDefault()
          window.location.replace('./login.html')
      })
    }
  }
  buttonLogout()