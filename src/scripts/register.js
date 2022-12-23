import { createUser } from "./requests.js"
import{verificLogin} from "./login.js"

verificLogin()

const eventRegister = async () => {
    const inputUsername = document.querySelector("#username");
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    const inputAvatar = document.querySelector("#avatar");
    const registerButton = document.querySelector("#registerButton");
    const form = document.querySelector(".form-register")

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {
            name: inputUsername.value,
            email: inputEmail.value,
            password: inputPassword.value,
            avatar_url: inputAvatar.value
        }
        console.log(body)
        await createUser(body)
    })
}
eventRegister();

