import { getLocalStorage } from "./localStorage.js"
import { createPet, deletePetById, deleteProfile, readAllMyPets, readProfile, updatePetById, updateProfile, readAllPets } from "./requests.js"

const verifyPermission = () => {
    const user = getLocalStorage()
    if(user == ""){
        window.location.replace('../../index.html')
    }
}

verifyPermission()

const redirect = () => {
   const btnHome = document.querySelector('#homeBtn')

   const btnLogout = document.querySelector('#logoutBtn')

   btnHome.addEventListener('click', ()=>{
    window.location.replace('../../index.html')
   })

   btnLogout.addEventListener('click', ()=>{
    localStorage.removeItem('token-user')
    window.location.replace('../../index.html')
   })
}

redirect()

const readUserData = async () => {
    const user = await readProfile()

    const image = document.querySelector('.user-img')
    image.addEventListener('error', (e) => {
        image.src = '../imgs/imgnotfound.jpg'
    })
    image.src = user.avatar_url

    const name = document.querySelector('#userName')
    name.innerText = `Nome: ${user.name}`
    
    const email = document.querySelector('#userEmail')
    email.innerText = `Email: ${user.email}`

}

readUserData()

const deleteUserAccount = async () =>{

    const main = document.querySelector('.profile-main')
    const buttonDelete = document.querySelector('#deleteAccountButton')

    buttonDelete.addEventListener('click', ()=>{
        const wrapper = document.createElement('div')
        wrapper.classList = 'modal-wrapper'

        const container = document.createElement('div')
        container.classList = 'modal-container animation-popup'

        const backgroundColorOne = document.createElement('div')
        backgroundColorOne.classList = 'modal-background'

        const closeButton = document.createElement('button')
        closeButton.classList = 'modal-close'
        closeButton.innerText = 'X'
   
        const content = document.createElement('div')
        content.classList = 'modal-content'

        const head = document.createElement('div')
        head.classList = 'modal-header'

        const title = document.createElement('h2')
        title.classList = 'modal-title'
        title.innerText = 'Deseja mesmo deletar sua conta?'

        const divButtons = document.createElement('div')
        divButtons.classList = 'modal-div-buttons'

        const buttonCancel = document.createElement('button')
        buttonCancel.classList = 'pointer button-purple modal-button'
        buttonCancel.innerText = 'Não desejo deletar minha conta'

        const buttonConfirm = document.createElement('button')
        buttonConfirm.classList = 'pointer button-red-delete modal-button-2'
        buttonConfirm.innerText = 'Quero deletar minha conta'

        const backgroundColorTwo = document.createElement('div') 
        backgroundColorTwo.classList = 'modal-background'
        backgroundColorTwo.id = 'backgroundTwo'


        closeButton.addEventListener('click', ()=>{
            container.classList.add('animation-close-modal')
            setTimeout(() => {
                wrapper.remove()
            }, 400);     
        })

        buttonCancel.addEventListener('click', ()=>{
            container.classList.add('animation-close-modal')
            setTimeout(() => {
                wrapper.remove()
            }, 400);     
        })

        buttonConfirm.addEventListener('click', async ()=>{
            await deleteProfile()
            localStorage.removeItem('token-user')
            container.classList.add('animation-close-modal')
            setTimeout(() => {
                wrapper.remove()
                window.location.replace('../../index.html')
            }, 400);     
        })

        head.append(title) 
        divButtons.append(buttonCancel, buttonConfirm)
        content.append(head, divButtons)
        backgroundColorOne.append(closeButton)
        container.append(backgroundColorOne, content, backgroundColorTwo)
        wrapper.append(container)
        main.append(wrapper)
    })
}

deleteUserAccount()

const editUserData = async () => {
    const user = await readProfile()

    const main = document.querySelector('.profile-main')

    const buttonEdit = document.querySelector('#editInfoButton')

    buttonEdit.addEventListener('click', ()=>{
        const wrapper = document.createElement('div')
        wrapper.classList = 'modal-wrapper'

        const container = document.createElement('div')
        container.classList = 'modal-container animation-popup'

        const backgroundColorOne = document.createElement('div')
        backgroundColorOne.classList = 'modal-background'

        const closeButton = document.createElement('button')
        closeButton.classList = 'modal-close'
        closeButton.innerText = 'X'
   
        const content = document.createElement('div')
        content.classList = 'modal-content'

        const head = document.createElement('div')
        head.classList = 'modal-header'

        const title = document.createElement('h2')
        title.classList = 'modal-title'
        title.innerText = 'Atualizar perfil'

        const form = document.createElement('form')
        form.classList = 'modal-form'

        const inputOne = document.createElement('input')
        inputOne.classList = 'modal-input'
        inputOne.value = user.name
        inputOne.id = 'name'

        const inputTwo = document.createElement('input')
        inputTwo.classList = 'modal-input'
        inputTwo.value = user.avatar_url
        inputTwo.id = 'avatar_url'
        
        const formButton = document.createElement('button')
        formButton.classList = 'pointer button-purple modal-button'
        formButton.innerText = 'Atualizar'

        const backgroundColorTwo = document.createElement('div') 
        backgroundColorTwo.classList = 'modal-background'
        backgroundColorTwo.id = 'backgroundTwo'


        closeButton.addEventListener('click', ()=>{
            container.classList.add('animation-close-modal')
            setTimeout(() => {
                wrapper.remove()
            }, 400);     
        })

        form.addEventListener('submit', async(event)=>{
            event.preventDefault()
            const elements = [...form.elements]
            const body = {}
            elements.forEach(elt =>{
                if(elt.tagName == "INPUT"){
                    body[elt.id] = elt.value
                }
            })
            await updateProfile(body)
            readUserData()
            container.classList.add('animation-close-modal')      
            setTimeout(() => {
                wrapper.remove()
            }, 400);  
            setTimeout(() => {
                window.location.reload()
            }, 1400);     
        })

        head.append(title)
        form.append(inputOne, inputTwo, formButton)
        content.append(head, form)
        backgroundColorOne.append(closeButton)
        container.append(backgroundColorOne, content, backgroundColorTwo)
        wrapper.append(container)
        main.append(wrapper)
    })
}

editUserData()

const registerPet = async() => {
    const main = document.querySelector('.profile-main')
    const registerButton = document.querySelector('#newPetButton')
    const fullUl = document.querySelector('#ulFull')
    const list = await readAllPets()

    registerButton.addEventListener('click', ()=>{
        const speciesList  = [...new Set (list.map(elt => elt.species))].sort()
        const wrapper = document.createElement('div')
        wrapper.classList = 'modal-wrapper'

        const container = document.createElement('div')
        container.classList = 'modal-container animation-popup'

        const backgroundColorOne = document.createElement('div')
        backgroundColorOne.classList = 'modal-background'

        const closeButton = document.createElement('button')
        closeButton.classList = 'modal-close'
        closeButton.innerText = 'X'
   

        const content = document.createElement('div')
        content.classList = 'modal-content'

        const head = document.createElement('div')
        head.classList = 'modal-header'

        const title = document.createElement('h2')
        title.classList = 'modal-title'
        title.innerText = 'Cadastrar pet'

        const form = document.createElement('form')
        form.classList = 'modal-form'

        const inputOne = document.createElement('input')
        inputOne.classList = 'modal-input'
        inputOne.placeholder = 'Nome'
        inputOne.id = 'name'

        const inputTwo = document.createElement('input')
        inputTwo.classList = 'modal-input'
        inputTwo.placeholder = 'Raça'
        inputTwo.id = 'bread'

        const inputThree = document.createElement('select')
        inputThree.classList = 'modal-select'
        const optionFixed = document.createElement('option')
        optionFixed.innerText = 'Espécie'
        optionFixed.hidden = true
        optionFixed.classList = 'modal-select'

        inputThree.append(optionFixed)
        speciesList.forEach(species => {
            const option = document.createElement('option')
            option.classList = 'modal-select'
            option.value = species
            option.innerText = species
            inputThree.append(option)
        })
        inputThree.id = 'species'

        const inputFour = document.createElement('input')
        inputFour.classList = 'modal-input'
        inputFour.placeholder = 'Avatar'
        inputFour.id = 'avatar_url'
        
        const formButton = document.createElement('button')
        formButton.classList = 'pointer button-purple modal-button'
        formButton.innerText = 'Cadastrar'

        const backgroundColorTwo = document.createElement('div') 
        backgroundColorTwo.classList = 'modal-background'
        backgroundColorTwo.id = 'backgroundTwo'


        closeButton.addEventListener('click', ()=>{
            container.classList.add('animation-close-modal')
            setTimeout(() => {
                wrapper.remove()
            }, 400);     
        })

        form.addEventListener('submit', async(event)=>{
            event.preventDefault()
            fullUl.innerHTML = ''
            const elements = [...form.elements]
            const body = {}
            elements.forEach(elt =>{
                if(elt.tagName == "INPUT"){
                    body[elt.id] = elt.value
                }else if(elt.tagName == "SELECT"){
                    body['species'] = elt.value
                }
            })   
            await createPet(body)
            renderPetList()
            container.classList.add('animation-close-modal')
            setTimeout(() => {
                wrapper.remove()
            }, 400);     
        })

        head.append(title)
        form.append(inputOne, inputTwo, inputThree, inputFour, formButton)
        content.append(head, form)
        backgroundColorOne.append(closeButton)
        container.append(backgroundColorOne, content, backgroundColorTwo)
        wrapper.append(container)
        main.append(wrapper)
    })
}

registerPet()


const renderPetList = async () => {
    const petList = await readAllMyPets()
    const list = await readAllPets()
    const main = document.querySelector('.profile-main')
    const fullUl = document.querySelector('#ulFull')
    const speciesList  = [...new Set (list.map(elt => elt.species))].sort()
    if(petList != ""){
        petList.forEach(pet => {
            const li = document.createElement('li')
            li.classList = 'card-full flex animation-card'
    
            const liContainerImg = document.createElement('div')
            liContainerImg.classList = 'card-img-container'
            
    
            const liImg = document.createElement('img')
            liImg.classList = 'pet-img'
            liImg.addEventListener('error', (e) => {
                liImg.src = '../imgs/noimage.png'
            })
            liImg.src = pet.avatar_url
    
            const liDescription= document.createElement('div')
            liDescription.classList = 'card-description flex flex-col'
    
            const liName = document.createElement('p')
            liName.classList = 'data-paragraph'
            liName.innerText = `Nome: ${pet.name}`
    
            const liBread = document.createElement('p')
            liBread.classList = 'data-paragraph'
            liBread.innerText = `Raça: ${pet.bread}`
    
            const liSpecies = document.createElement('p')
            liSpecies.classList = 'data-paragraph'
            liSpecies.innerText = `Espécie: ${pet.species}`

            const liDiv = document.createElement('div')
            liDiv.classList = 'div-buttons-description'
    
            const buttonEdit = document.createElement('button')
            buttonEdit.classList = 'button-purple pet-card-profile-button-edit pointer'
            buttonEdit.innerText = 'Atualizar'
    
            const buttonAdopt = document.createElement('button')
            buttonAdopt.classList = 'button-red-delete pet-card-profile-button-delete pointer'
    
            const liAdoptable = document.createElement('p')
            liAdoptable.classList = 'data-paragraph'
    
            if(pet.available_for_adoption == true){
                liAdoptable.innerText = 'Adotável: Sim'
                buttonAdopt.innerText = 'Deletar'
            }else{
                liAdoptable.innerText = 'Adotável: Não'
                buttonAdopt.innerText = 'Doar'
            }

            buttonEdit.addEventListener('click', ()=>{
                const wrapper = document.createElement('div')
                wrapper.classList = 'modal-wrapper'
        
                const container = document.createElement('div')
                container.classList = 'modal-container animation-popup'
        
                const backgroundColorOne = document.createElement('div')
                backgroundColorOne.classList = 'modal-background'
        
                const closeButton = document.createElement('button')
                closeButton.classList = 'modal-close'
                closeButton.innerText = 'X'
           
                const content = document.createElement('div')
                content.classList = 'modal-content'
        
                const head = document.createElement('div')
                head.classList = 'modal-header'
        
                const title = document.createElement('h2')
                title.classList = 'modal-title'
                title.innerText = 'Atualizar pet'
        
                const form = document.createElement('form')
                form.classList = 'modal-form'
        
                const inputOne = document.createElement('input')
                inputOne.classList = 'modal-input'
                inputOne.value = pet.name
                inputOne.id = 'name'
        
                const inputTwo = document.createElement('input')
                inputTwo.classList = 'modal-input'
                inputTwo.value = pet.bread
                inputTwo.id = 'bread'
        
                const inputThree = document.createElement('select')
                inputThree.classList = 'modal-select'

                speciesList.forEach(species => {
                    const option = document.createElement('option')
                    option.classList = 'modal-select'
                    option.value = species
                    option.innerText = species
                    inputThree.append(option)
                })
                inputThree.id = 'species'
        
                const inputFour = document.createElement('input')
                inputFour.classList = 'modal-input'
                inputFour.value = pet.avatar_url
                inputFour.id = 'avatar_url'
                
                const formButton = document.createElement('button')
                formButton.classList = 'pointer button-purple modal-button'
                formButton.innerText = 'Atualizar'
        
                const backgroundColorTwo = document.createElement('div') 
                backgroundColorTwo.classList = 'modal-background'
                backgroundColorTwo.id = 'backgroundTwo'
        
        
                closeButton.addEventListener('click', ()=>{
                    container.classList.add('animation-close-modal')
                    setTimeout(() => {
                        wrapper.remove()
                    }, 400);        
                })
        
                form.addEventListener('submit', async(event)=>{
                    event.preventDefault()
                    fullUl.innerHTML = ''
                    const elements = [...form.elements]              
                    const body = {}   
                    elements.forEach(elt =>{
                        if(elt.tagName == 'INPUT'){
                            body[elt.id] = elt.value
                        }else if(elt.tagName == 'SELECT'){
                            body['species'] = elt.value
                        }
                    })      
                    await updatePetById(body, pet.id)
                    renderPetList()
                    container.classList.add('animation-close-modal')
                    setTimeout(() => {
                        wrapper.remove()
                    }, 400);     
                })
    
                head.append(title)
                form.append(inputOne, inputTwo, inputThree, inputFour, formButton)
                content.append(head, form)
                backgroundColorOne.append(closeButton)
                container.append(backgroundColorOne, content, backgroundColorTwo)
                wrapper.append(container)
                main.append(wrapper)
            })
    
            buttonAdopt.addEventListener('click', ()=>{
                const wrapper = document.createElement('div')
                wrapper.classList = 'modal-wrapper'
        
                const container = document.createElement('div')
                container.classList = 'modal-container animation-popup'
        
                const backgroundColorOne = document.createElement('div')
                backgroundColorOne.classList = 'modal-background'
        
                const closeButton = document.createElement('button')
                closeButton.classList = 'modal-close'
                closeButton.innerText = 'X'
           
                const content = document.createElement('div')
                content.classList = 'modal-content'
        
                const head = document.createElement('div')
                head.classList = 'modal-header'
        
                const title = document.createElement('h2')
                title.classList = 'modal-title'
                title.innerText = 'Deseja mesmo deletar sua conta?'
        
                const divButtons = document.createElement('div')
                divButtons.classList = 'modal-div-buttons'
        
                const buttonCancel = document.createElement('button')
                buttonCancel.classList = 'pointer button-purple modal-button'
                buttonCancel.innerText = `Não desejo ${buttonAdopt.innerText.toLowerCase()} meu pet`
        
                const buttonConfirm = document.createElement('button')
                buttonConfirm.classList = 'pointer button-red-delete modal-button-2'
                buttonConfirm.innerText =  `Quero ${buttonAdopt.innerText.toLowerCase()} meu pet`
        
                const backgroundColorTwo = document.createElement('div') 
                backgroundColorTwo.classList = 'modal-background'
                backgroundColorTwo.id = 'backgroundTwo'
        
        
                closeButton.addEventListener('click', ()=>{
                    wrapper.remove()
                })
        
                buttonCancel.addEventListener('click', ()=>{
                    wrapper.remove()
                })
        
                buttonConfirm.addEventListener('click', async ()=>{
                    fullUl.innerHTML = ''
                    await deletePetById(pet.id) 
                    renderPetList()
                    container.classList.add('animation-close-modal')
                    setTimeout(() => {
                        wrapper.remove()
                    }, 400);     
                })
        
                head.append(title) 
                divButtons.append(buttonCancel, buttonConfirm)
                content.append(head, divButtons)
                backgroundColorOne.append(closeButton)
                container.append(backgroundColorOne, content, backgroundColorTwo)
                wrapper.append(container)
                main.append(wrapper)
            })
            
            liDiv.append(buttonEdit, buttonAdopt)
            liDescription.append(liName, liBread, liSpecies, liAdoptable, liDiv)
            liContainerImg.append(liImg)
            li.append(liContainerImg, liDescription)
            fullUl.append(li)
        })
    }else{
        const li = document.createElement('li')
        li.classList = 'empty-list flex flex-col al-center animation-card'

        const title = document.createElement('h2')
        title.classList = 'empty-list-item'
        title.innerText = 'Você ainda não tem pets registrados'

        const img = document.createElement('img')
        img.classList = 'dogIcon'
        img.src = '../imgs/sadDogIcon.png'

        li.append(title, img)
        fullUl.append(li)
    }
}

renderPetList()