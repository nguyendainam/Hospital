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


const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHome = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}


const saveDetailDoctors = (data) => {
    return axios.post(`/api/save_infor-doctors`, data)
}


const getDetailsInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-byid?id=${inputId}`)
}


const saveBulkSchedule = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorbyDay = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-day?doctorId=${doctorId}&date=${date}`,)
}


const postCostInforDoctor = (data) => {
    return axios.post('/api/post-infor-cost-doctor', data)
}

const getDataCostInforDoctor = (doctorId) => {
    return axios.get(`/api/get-infor-cost-doctor-byid?doctorId=${doctorId}`)
}


const getDataProfileDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}


const postPatientAppoiment = (data) => {
    return axios.post('/api/patient-book-Appointment', data)
}


const postVerifyPatientAppoiment = (data) => {
    return axios.post('/api/comfirm-verify-book-Appointment', data)
}

// ===========================SPECIALTY
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-speciaties', data)
}


const getAllSpecialty = () => {
    return axios.get('/api/get-all-speciaties')
}

const getIdNameSpecialty = () => {
    return axios.get('/api/get-id-name-speciaties')
}





// ===========================CLINIC
const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const getIdNameClinic = () => {
    return axios.get('/api/get-id-name-clinic')
}

const getAddressClinic = (id) => {
    return axios.get(`/api/get-address-clinic-by-id?id=${id}`)
}

const getAllClinic = () => {
    return axios.get('/api/get-all-clinic')
}





export {
    handleLoginApi, getAllUsers, createNewUserService,
    deleUserService, editUserService, getAllCodeService,
    getTopDoctorHome, getAllDoctors, saveDetailDoctors,
    getDetailsInforDoctor, saveBulkSchedule, getScheduleDoctorbyDay, postCostInforDoctor,
    getDataCostInforDoctor, getDataProfileDoctor, postPatientAppoiment, postVerifyPatientAppoiment,
    createNewSpecialty, getAllSpecialty, createNewClinic, getIdNameSpecialty, getIdNameClinic, getAddressClinic,
    getAllClinic
} 