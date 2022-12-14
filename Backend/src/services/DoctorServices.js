import db from '../models/index'

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
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
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



module.exports = {
    getTopDoctorHomeServices: getTopDoctorHomeServices,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById
}