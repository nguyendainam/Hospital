import axios from "../axios"

const handleLoginApi = (email_input, password_input) => {
    return axios.post('/api/login', {
        email: email_input,
        password: password_input
    })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)

}

const createNewUserService = (data) => {
    console.log("check data send mysql", data)
    return axios.post('/api/create-new-users', data)
}

const deleUserService = async (userId) => {
    // return axios.delete('/api/delete-users', { id: userId })
    return axios.delete('/api/delete-users', {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputdata) => {
    return axios.put('/api/edit-users', inputdata)
}

export { handleLoginApi, getAllUsers, createNewUserService, deleUserService, editUserService } 