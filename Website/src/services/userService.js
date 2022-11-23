import axios from "../axios"

const handleLoginApi = (email_input, password_input) => {
    return axios.post('/api/login', {
        email: email_input,
        password: password_input
    })
}

export { handleLoginApi } 