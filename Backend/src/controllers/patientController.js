import bcrypt from 'bcryptjs';
import { response } from 'express';
import PatientServices from '../services/PatientServices'

let postBookAppointment = async (req, res) => {
    try {

        let data = await PatientServices.postBookAppointmentService(req.body)
        return res.status(200).json({
            data: data
        })
    } catch (e) {
        console.log('get all code error', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {

        let data = await PatientServices.postVerifyBookAppointmentService(req.body)
        return res.status(200).json({
            data: data
        })

    } catch (e) {
        {
            console.log('get all code error', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: "Error from server"
            })
        }
    }
}



module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}