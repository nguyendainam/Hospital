import { get, reject } from "lodash";
import db from "../models";

let createNewClinicService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data || !data.address || !data.description
                || !data.descriptionHTML || !data.image
                || !data.nameVi || !data.nameEn || !data.province

            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing require parameter'
                })
            } else {
                let res = await db.Clinic.create({
                    address: data.address,
                    description: data.description,
                    descriptionHTML: data.descriptionHTML,
                    image: data.image,
                    nameVi: data.nameVi,
                    nameEn: data.nameEn,
                    province: data.province
                })
                resolve({
                    errCode: 0,
                    res
                })

            }

        } catch (e) {
            reject(e)
        }
    })


}

let getIdNameClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                attributes: {
                    exclude: ['province', 'image', 'descriptionHTML', 'createdAt', 'updatedAt', 'description']
                }
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



let getAddressClinicByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findOne({
                where: { id: id }
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

let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                attributes: {
                    exclude: ['descriptionHTML', 'createdAt', 'updatedAt', 'description']
                }
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


let getDoctorClinicServices = (ClinicId, specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!ClinicId || !specialtyId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let data = {}
                if (specialtyId === 'ALL') {
                    data = await db.Doctor_infor.findAll({
                        where: { clinicId: ClinicId },
                        attributes: {
                            exclude: ['priceId', 'paymentId', 'addressClinic', 'nameClinic',
                                'note', 'count', 'createdAt', 'updatedAt'
                            ]


                        },
                    })
                }
                else {
                    data = await db.Doctor_infor.findAll({
                        where: {
                            clinicId: ClinicId,
                            specialtyId: specialtyId
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
                    errCode: 1,
                    errMessage: 'get DataDoctor Clinic successfull',
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}


let UpdateInformationClinicService = (dataInput) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!dataInput.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing data required'
                })

            }
            else {

                let data = await db.Clinic.findOne({
                    where: { id: dataInput.id },
                    raw: false
                })

                // console.log(data)
                if (data) {
                    data.address = dataInput.address
                    data.province = dataInput.province
                    data.description = dataInput.description
                    data.descriptionHTML = dataInput.descriptionHTML
                    data.image = dataInput.image
                    data.nameVi = dataInput.nameVi
                    data.nameEn = dataInput.nameEn

                    await data.save()
                }


            }
            resolve({
                errCode: 0,
                errMessage: 'Update success full'
            })

        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createNewClinicService: createNewClinicService,
    getIdNameClinicService: getIdNameClinicService,
    getAddressClinicByIdService: getAddressClinicByIdService,
    getAllClinicService: getAllClinicService,
    getDoctorClinicServices: getDoctorClinicServices,
    UpdateInformationClinicService: UpdateInformationClinicService
}