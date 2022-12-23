import { readAllPets, readProfile, createAdoption } from"./requests.js"
import { getLocalStorage, clearStorage } from "./localStorage.js"

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
        e.preventDefault()
        window.location.replace('./src/pages/profile.html')
    })
  } else {
    button.innerText = 'Register'
    button.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.replace('./src/pages/register.html')
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
        clearStorage()
        window.location.replace('./src/pages/login.html')
    })
  } else {
    button.innerText = 'Login'
    button.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.replace('./src/pages/login.html')
    })
  }
}
buttonLogout()

const renderCardsHome = async (species) => {
    const cardList = document.querySelector('#card_list')
    cardList.innerHTML = ''
    const loading = document.createElement('img')
    loading.src = './src/imgs/gifcat.gif'
    loading.classList = 'cardlist-img1'
    cardList.append(loading)
    let list = await readAllPets()
    if (species != 'Espécies') {
        list = list.filter(element => element.species === species && element.available_for_adoption === true)
    }

    if (list.length <= 0) {
        cardList.innerHTML = ''
        cardList.insertAdjacentHTML('beforeend', `
        <div class="flex flex-col jus-center al-center">
        <p>infelizmente não temos nenhum pet desta espécie disponivel</p> 
        <img class="cardlist-img2" src="./src/imgs/sadDogIcon.png" alt=""></img>
        </div>
        `)
    } else {
        cardList.innerHTML = ''
        list.forEach(async (element) => {
            const { available_for_adoption } = element
            if (available_for_adoption) {
            const card = await cardCreatorHome(element)
            cardList.appendChild(card)
            }
        }); 
    }

}

renderCardsHome('Espécies')

const cardCreatorHome = async (element) => {
    const token = getLocalStorage()
    const {id, name, bread, species, available_for_adoption, avatar_url, guardian} = element
    
        const card = document.createElement('li')
        card.classList = 'card-home flex flex-col'
        const avatar = document.createElement('img')
        avatar.src = avatar_url
        avatar.alt = name
        avatar.addEventListener('error', (e) => {
            avatar.src = './src/imgs/noimage.png'
        })
        const petName = document.createElement('p')
        petName.innerText = name.substring(0, 10)
        const specie = document.createElement('span')
        specie.innerText = species

        if (token.token) {

            const button = document.createElement('button')
            button.classList = 'button-primary pointer'
            button.innerText = 'Me Adota?'
            card.append(avatar, petName, specie, button)

            button.addEventListener('click', async (e) => {
                e.preventDefault()
                await modalAdopt(id, bread, name, species, avatar_url, guardian)
            })
        } else {
            card.append(avatar, petName, specie)
        }
        return card
    
}

const modalAdopt = async (id, name, bread, species, avatar_url, guardian) => {
   const body = document.querySelector('body')

    const modalBackground = document.createElement('div')
    modalBackground.classList = 'modal-wrapper'

    const modalBox = document.createElement('div')
    modalBox.classList = 'modal-container'

    const divBgOne = document.createElement('div')
    divBgOne.classList = 'modal-background'

    const divBgTwo = document.createElement('div')
    divBgTwo.classList = 'modal-background'
    divBgTwo.id = 'backgroundTwo'

    const closeModalButton = document.createElement('button')
    closeModalButton.classList = 'modal-close'
    closeModalButton.innerText = 'X'

    modalBackground.addEventListener('click', async (e) => {
        const {className} = e.target
        if (className === 'modal-wrapper' || className === 'modal-close') {
            modalBackground.remove()
        }
    })

    const children = document.createElement('div')
    children.classList = 'modal-content1 flex'

   const divImg = document.createElement('div')
    divImg.classList = 'flex al-center jus-center'
    
    const imgModal= document.createElement("img")
    imgModal.classList="img-modal-adoption"

    imgModal.addEventListener('error', (e) => {
        imgModal.src ='./src/imgs/noimage.png'
    })
    imgModal.src=avatar_url
    imgModal.alt="pet avatar"
    
    divImg.append(imgModal)

    const divInfo = document.createElement('div')
    divInfo.classList = 'info-modal-adoption flex flex-col gap18'

    divInfo.insertAdjacentHTML('beforeend', `
        <h2>Nome: ${bread}</h2>
        <p>Raça: ${name}</p>
        <p>Espécie: ${species}</p>
        <p>Tutor: ${guardian.name}</p> 
    `)
   
    const buttonAdopt = document.createElement('button')
    buttonAdopt.classList = "button-primary pointer"
    buttonAdopt.innerText = 'Adotar ❤'

    buttonAdopt.addEventListener('click', async (e) => {
        e.preventDefault()
        const body =    {
            pet_id: `${id}`
        };
        await createAdoption(body)
        renderCardsHome('Espécies')
        modalBackground.remove()
    })

    divInfo.appendChild(buttonAdopt)
    children.append(divImg, divInfo)
    divBgOne.appendChild(closeModalButton)
    modalBox.append(divBgOne, children, divBgTwo)
    modalBackground.appendChild(modalBox)
    body.appendChild(modalBackground)
}


const specieSelector = async () => {
    const list = await readAllPets()
    const speciesList  = [...new Set (list.map(elt => elt.species))].sort()
    
    const select = document.querySelector('#select_home')
    const option = document.createElement('option')
    select.appendChild(option)
    option.innerText = 'Selecionar por Espécies'
    option.value = 'Espécies'
    speciesList.forEach(element => {
        const option = document.createElement('option')
        option.innerText = element
        option.value = element
        select.appendChild(option)
    });
    
    select.addEventListener('change', (e) => {
        e.preventDefault()
        renderCardsHome(select.value)
    })

}
specieSelector()
