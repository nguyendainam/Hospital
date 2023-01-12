import axios from "../axios"

let getInforDoctor = (email) => {
    return axios.get(`/api/doctor-getinfor-email?email=${email}`)
}

let deleteSchedule = async (data) => {
    return await axios.post(`/api/doctor-delete-schedule`, data)
}


let getlistPatientforDr = async (doctorId, date) => {
    return await axios.get(`/api/doctor-get-list-patien?doctorId=${doctorId}&date=${date}`)
}
const PostsendPemery = (data) => {
    return axios.post(`/api/doctor-send-remedy`, data)
}

export {
    getInforDoctor, deleteSchedule, getlistPatientforDr, PostsendPemery

} 