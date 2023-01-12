import db from '../models/index'
import _, { includes, reject } from 'lodash';
import SendEmailService from './SendEmailService'
require('dotenv').config()
import { v4 as uuidv4 } from 'uuid';
import bcrypt, { hash } from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);




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


let checkUserEmail = (userEmail) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Patient.findOne({
                where: { email: userEmail }
            })
            if (user) {
                // neu email đúng trả về giá trị cho userEmail
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}



let CreateNewUserPatient = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in use , Please try other Email'
                })
            } else {
                let hashPasswordFromBycrypt = await hashUserPassword(data.password);
                await db.Patient.create({
                    email: data.email,
                    password: hashPasswordFromBycrypt,
                    fullname: data.fullname,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                    gender: data.gender,
                })
                resolve({
                    errCode: 0,
                    errMessage: "Create new User successfull"
                })
            }



        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }


    })
}

let handlePatientLoginService = (data) => {
    console.log(data)
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (!data.email || !data.password) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing data required parameter'
                })
            } else {
                let checkEmail = await checkUserEmail(data.email)

                // console.log('check...', checkEmail)
                if (checkEmail === true) {
                    let user = await db.Patient.findOne({
                        attributes: ['email', 'password', 'fullname', 'gender', 'address', 'id'],
                        where: { email: data.email },
                        raw: true,

                    })

                    if (user) {
                        let check = await bcrypt.compareSync(data.password, user.password)

                        console.log(check)
                        if (check === true) {
                            userData.errCode = 0;
                            userData.errMessage = "Success";
                            delete user.password;
                            userData.user = user
                        } else {
                            userData.errCode = 3;
                            userData.errMessage = "Wrong Password"
                        }
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = `User not found`
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `Your's email isn't exits in your system. Please try other Email`

                }
            }


            resolve(userData)

        } catch (e) {
            reject(e)
        }
    })
}

let getPatientGetScheduleService = (id, date) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !date) {
            resolve({
                errCode: 1,
                errMessage: 'Missing data required'
            })
        } else {
            let data = await db.Booking.findAll({
                where: {
                    patientId: id,
                    date: date
                },
                include: [

                    {
                        model: db.User, as: 'BookingDoctor',
                        attributes: ['email', 'firstName', 'lastName', 'positionId'],
                        include: [
                            {
                                model: db.Allcode, as: 'positionData',
                                attributes: ['valueEn', 'valueVi'],
                            }
                        ],


                    },
                    {
                        model: db.Patient, as: 'PatientData',
                        attributes: ['email', 'fullname', 'address', 'birthDay', 'gender'],
                        include: [
                            {
                                model: db.Allcode, as: 'genderPatient',
                                attributes: ['valueEn', 'valueVi'],

                            }

                        ]
                    },
                    {
                        model: db.Allcode, as: 'timeTypeBooking',
                        attributes: ['valueEn', 'valueVi'],
                    },
                    {
                        model: db.Allcode, as: 'statusBooking',
                        attributes: ['valueEn', 'valueVi'],
                    }
                ],


                raw: true,
                nest: true
            })
            if (!data) data = {}

            resolve({
                errCode: 0,
                data: data
            })
        }
    })
}



module.exports = {
    postBookAppointmentService: postBookAppointmentService,
    postVerifyBookAppointmentService: postVerifyBookAppointmentService,
    CreateNewUserPatient: CreateNewUserPatient,
    handlePatientLoginService: handlePatientLoginService,
    getPatientGetScheduleService: getPatientGetScheduleService
}