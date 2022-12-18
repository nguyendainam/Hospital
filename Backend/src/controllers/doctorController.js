import DoctorServices from '../services/DoctorServices'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 10;
    try {
        let doctors = await DoctorServices.getTopDoctorHomeServices(limit)
        return res.status(200).json(doctors)

    } catch (error) {
        console.log("Err from get doctor Controller: ", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server....'
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let doctors = await DoctorServices.getAllDoctors()
        res.status(200).json(doctors)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from getalldoctor from backend'
        })
    }
}


let postInforDoctor = async (req, res) => {
    try {
        let response = await DoctorServices.saveDetailInforDoctor(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from getalldoctor from backend'
        })
    }
}

let getDetailDoctor = async (req, res) => {
    try {
        let infor = await DoctorServices.getDetailDoctorById(req.query.id)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Errcode getDetailDoctor doctorcontroller'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let schedule = await DoctorServices.bulkCreateScheduleService(req.body)
        return res.status(200).json({
            schedule
        })

    } catch (error) {
        console.log('Error From  bulkCreateSchedule doctorController')
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing Data  bulkCreateSchedule '
        })
    }
}

let getScheduleByDay = async (req, res) => {
    try {
        let infor = await DoctorServices.getScheduleBydate(req.query.doctorId, req.query.date)
        return res.status(200).json({
            infor
        })
    } catch (e) {
        console.log('Error From getScheduleByDay')
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing Data  bulkCreateSchedule '
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getDetailDoctor: getDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDay: getScheduleByDay
}