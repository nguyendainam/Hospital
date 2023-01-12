import { reject } from 'lodash'
import db from '../models/index'

let createNewSpecialties = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.nameVi
                || !data.nameEn
                || !data.image
                || !data.descriptionMarkdown
                || !data.contentHTML) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required'
                })
            } else {
                await db.Specialty.create({
                    image: data.image,
                    nameVi: data.nameVi,
                    nameEn: data.nameEn,
                    description: data.descriptionMarkdown,
                    contentHTML: data.contentHTML
                })

                resolve({
                    errCode: 0,
                    errMessage: "Create new specialty success!!!"
                })
            }



        } catch (e) {
            reject(e)
        }
    })
}

let getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()
            resolve({
                errCode: 0,
                data
            })


        } catch (e) {
            reject(e)
        }
    })
}

let getIdNameSpecaltyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({
                attributes: {
                    exclude: ['description', 'image', 'contentHTML', 'createdAt', 'updatedAt']


                },
            })
            resolve({
                errCode: 0,
                data
            })

        } catch (e) {
            reject(e)
        }
    })
}


let getDoctorSpecialtyService = (id, localtion) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !localtion) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing data required'
                })
            } else {
                let data = {}
                if (localtion === 'ALL') {
                    data = await db.Doctor_infor.findAll({
                        where: { specialtyId: id },
                        attributes: {
                            exclude: ['priceId', 'paymentId', 'addressClinic', 'nameClinic',
                                'note', 'count', 'createdAt', 'updatedAt'
                            ]


                        },

                    })
                } else {
                    data = await db.Doctor_infor.findAll({
                        where: {
                            specialtyId: id,
                            provinceId: localtion

                        },
                        attributes: {
                            exclude: ['priceId', 'paymentId', 'addressClinic', 'nameClinic',
                                'note', 'count', 'createdAt', 'updatedAt'
                            ]


                        },

                    })




                }


                if (!data) data = {}

                resolve({
                    errCode: 0,
                    errMessage: 'get Doctor success full',
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


let getSpecialtyByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing data required'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: id }
                })
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

let getAllcodeSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({
                attributes: {
                    exclude: ['description', 'contentHTML', 'image', 'createdAt', 'updatedAt']
                }
            })
            resolve({
                errCode: 0,
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let UpdateInformationSpecialtyService = (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataSend.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing data required'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: dataSend.id },
                    raw: false
                })

                if (data) {
                    data.description = dataSend.description
                    data.contentHTML = dataSend.contentHTML
                    data.image = dataSend.image
                    data.nameVi = dataSend.nameVi
                    data.nameEn = dataSend.nameEn
                    await data.save()
                }



            }
            resolve({
                errCode: 0,
                errMessage: 'update success full',
            })

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createNewSpecialties: createNewSpecialties,
    getAllSpecialtyService: getAllSpecialtyService,
    getIdNameSpecaltyService: getIdNameSpecaltyService,
    getDoctorSpecialtyService: getDoctorSpecialtyService,
    getSpecialtyByIdService: getSpecialtyByIdService,
    getAllcodeSpecialtyService: getAllcodeSpecialtyService,
    UpdateInformationSpecialtyService: UpdateInformationSpecialtyService
}