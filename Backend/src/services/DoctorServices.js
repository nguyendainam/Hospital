import db from '../models/index'
require('dotenv').config();
import _ from 'lodash';



let getTopDoctorHomeServices = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                where: {
                    roleId: 'R2'
                },
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },

                    {
                        model: db.Doctor_infor,
                        attributes: {
                            exclude: ['id', 'doctorId'],
                        },
                        include: [

                            { model: db.Specialty, as: 'InforDrSpecialty', attributes: ['nameEn', 'nameVi'] }

                        ],

                    },

                ],
                raw: true,
                nest: true

            })
            resolve({
                errCode: 0,
                data: users

            })
        } catch (error) {
            reject(error)
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {
                    roleId: 'R2'
                },
                attributes: {
                    exclude: ['password', 'image']
                },
            })

            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown
                || !inputData.action
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter form saveDetailInforDoctor'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkDown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })

                    if (doctorMarkDown) {
                        doctorMarkDown.contentHTML = inputData.contentHTML;
                        doctorMarkDown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkDown.description = inputData.description;
                        await doctorMarkDown.save()
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'SAVE INFOR DOCTOR SUCCESS ~~'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


let getDetailDoctorById = (idDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idDoctor) {
                resolve({
                    errCode: 1,
                    errMessage: 'MISSING REQUIRED PARAMETER FROM getDetailDoctorById '
                })

            } else {
                let dataInfor = await db.User.findOne({
                    where: { id: idDoctor },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentMarkdown', 'contentHTML']

                        },

                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] }

                    ],
                    raw: true,
                    nest: true
                })
                if (!dataInfor) dataInfor = {}

                resolve({
                    errCode: 0,
                    data: dataInfor
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let bulkCreateScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // doctorId: selectedDoctor_option.value,
            // date: formatedDate

            if (!data.arrSchedule
                || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let schedule = data.arrSchedule
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = process.env.MAX_NUMBER_PATIENT_SCHEDULE
                        return item
                    })
                }

                // Take data from db 
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                })


                //so sanh data tu db va user gui len
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                })



                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }


                resolve({
                    errCode: 0,
                    errMessage: 'Make schedule successfull '
                })

            }



        } catch (e) {
            reject(e)
        }
    })
}


let getScheduleBydate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },

                    include: [
                        { model: db.Allcode, as: 'TimeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'doctorSchedule', attributes: ['firstName', 'lastName', 'positionId'] }

                    ],


                    raw: true,
                    nest: true




                })
                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}


let postInforCostDoctorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {


            if (!data.doctorId || !data.priceId || !data.provinceId || !data.paymentId || !data.nameClinic || !data.addressClinic) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter form saveDetailInforDoctor'
                })
            } else {
                if (data.actions === 'CREATE') {
                    await db.Doctor_infor.create({
                        doctorId: data.doctorId,
                        clinicId: data.clinicId,
                        specialtyId: data.specialtyId,
                        priceId: data.priceId,
                        provinceId: data.provinceId,
                        paymentId: data.paymentId,
                        nameClinic: data.nameClinic,
                        addressClinic: data.addressClinic,
                        note: data.note
                    })

                } if (data.actions === 'UPDATE') {
                    let checkIdDoctor = await db.Doctor_infor.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false
                    })

                    if (checkIdDoctor) {

                        checkIdDoctor.priceId = data.priceId;
                        checkIdDoctor.provinceId = data.provinceId;
                        checkIdDoctor.paymentId = data.paymentId;
                        checkIdDoctor.nameClinic = data.nameClinic;
                        checkIdDoctor.addressClinic = data.addressClinic;
                        checkIdDoctor.note = data.note;
                        await checkIdDoctor.save()
                    }


                }
            }






        } catch (e) {
            reject(e)
        }
    })
}


let getCostInforDoctorByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing id parameter'
                })
            } else {
                let data = await db.Doctor_infor.findOne({
                    where: { doctorId: inputId },

                    include: [

                        { model: db.Allcode, as: 'PriceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'ProVinceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'PaymenteData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Specialty, as: 'InforDrSpecialty', attributes: ['nameEn', 'nameVi', 'id'] },
                        { model: db.Clinic, as: 'InforDrclinicId', attributes: ['nameEn', 'nameVi', 'id'] }

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




        } catch (e) {
            reject(e)
        }
    })
}



let getProfileDoctorByIdService = (IdInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!IdInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let dataInfor = await db.User.findOne({
                    where: { id: IdInput },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [

                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },

                        { model: db.Markdown, attributes: ['description'] },

                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: ['id', 'doctorId'],
                            },
                            include: [

                                { model: db.Allcode, as: 'PriceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'ProVinceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'PaymenteData', attributes: ['valueEn', 'valueVi'] }

                            ],

                        },

                    ],
                    raw: true,
                    nest: true
                })
                if (!dataInfor) dataInfor = {}

                resolve({
                    errCode: 0,
                    data: dataInfor
                })




            }


        } catch (e) {
            reject(e)
        }
    })

}


module.exports = {
    getTopDoctorHomeServices: getTopDoctorHomeServices,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateScheduleService: bulkCreateScheduleService,
    getScheduleBydate: getScheduleBydate,
    postInforCostDoctorService: postInforCostDoctorService,
    getCostInforDoctorByIdService: getCostInforDoctorByIdService,
    getProfileDoctorByIdService: getProfileDoctorByIdService
}