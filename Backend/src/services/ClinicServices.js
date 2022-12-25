import { reject } from "lodash";
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
                where: { id: id },
                attributes: {
                    exclude: ['image', 'descriptionHTML', 'createdAt', 'updatedAt', 'description']
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

let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()
            resolve({
                errCode: 0,
                data
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
    getAllClinicService: getAllClinicService
}