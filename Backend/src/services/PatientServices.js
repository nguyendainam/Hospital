import db from '../models/index'
import _, { reject } from 'lodash';
import SendEmailService from './SendEmailService'
require('dotenv').config()
import { v4 as uuidv4 } from 'uuid';
let UrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/confirm-booking?token=${token}&doctorId=${doctorId}`
    return result
}



let postBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data)
        try {
            if (!data.email || !data.timeType || !data.doctorId || !data.date) {
                resolve({
                    errMessage: 'missing parameter required',
                    errCode: 1
                })
                console.log('errr')

            } else {
                let token = uuidv4()


                await SendEmailService.sendEmail({
                    receiversEmail: data.email,
                    patientName: data.fullName,
                    time: data.datetime,
                    doctorName: data.DoctorName,
                    linkConfirm: UrlEmail(data.doctorId, token),
                    language: data.language
                })


                // create patients
                let user = await db.Patient.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        fullname: data.fullName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        birthDay: data.birthday,
                        roleId: 'R3',
                    }
                })



                if (user && user[0]) {



                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                            timeType: data.timeType,
                            date: data.date,
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token,

                        }
                    })
                }

                // create booking schedule



                resolve({
                    data: user,
                    errCode: 0,
                    errMessage: 'Create User successfull'
                })



            }

        } catch (e) {
            reject(e)
        }
    })
}


let postVerifyBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment Success'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist'
                    })
                }

            }



        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    postBookAppointmentService: postBookAppointmentService,
    postVerifyBookAppointmentService: postVerifyBookAppointmentService
}