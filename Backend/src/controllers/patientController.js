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


let handleCreateNewUserPatient = async (req, res) => {
    try {
        let message = await PatientServices.CreateNewUserPatient(req.body)
        return res.status(200).json(message)
    } catch (e) {

        console.log('get all code error', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })

    }
}

let handlePatientLogin = async (req, res) => {
    try {
        let data = await PatientServices.handlePatientLoginService(req.body)

        //console.log("data login.......", data)
        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "handlePatientLogin"
        })
    }
}

let getPatientGetSchedule = async (req, res) => {
    try {
        let data = await PatientServices.getPatientGetScheduleService(req.query.patientId, req.query.date)
        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: " err from getPatientGetSchedule"
        })
    }
}

let getCancelSchedule = async (req, res) => {
    try {
        let data = await PatientServices.getCancelScheduleFromPatient(req.query.patientId, req.query.token)
        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: " err from getCancelSchedule"
        })
    }
}


module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    handleCreateNewUserPatient: handleCreateNewUserPatient,
    handlePatientLogin: handlePatientLogin,
    getPatientGetSchedule: getPatientGetSchedule,
    getCancelSchedule: getCancelSchedule
}