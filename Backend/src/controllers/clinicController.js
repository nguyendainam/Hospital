import ClinicService from '../services/ClinicServices'


let createNewClinic = async (req, res) => {
    try {

        let dataclinic = await ClinicService.createNewClinicService(req.body)
        res.status(200).json(dataclinic)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err FROM createnewClinic Controller'
        })
    }

}

let getIdNameClinic = async (req, res) => {
    try {

        let data = await ClinicService.getIdNameClinicService()
        res.status(200).json(data)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from clicnic controller'
        })
    }

}
let getAddressClinicById = async (req, res) => {
    try {

        let data = await ClinicService.getAddressClinicByIdService(req.query.id)
        res.status(200).json(data)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from clicnic controller'
        })
    }
}


let getAllClinic = async (req, res) => {

    try {

        let data = await ClinicService.getAllClinicService()
        res.status(200).json(data)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from clicnic controller'
        })
    }
}


let getDoctorsClinic = async (req, res) => {
    try {
        let data = await ClinicService.getDoctorClinicServices(req.query.idClinic, req.query.specialtyId)
        res.status(200).json(data)

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from getDoctorClinic'
        })
    }
}

module.exports = {
    createNewClinic: createNewClinic,
    getIdNameClinic: getIdNameClinic,
    getAddressClinicById: getAddressClinicById,
    getAllClinic: getAllClinic,
    getDoctorsClinic: getDoctorsClinic
}